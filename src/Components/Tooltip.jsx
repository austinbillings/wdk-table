import React from 'react';
import PropTypes from 'prop-types';

import { EventsFactory } from '../Utils/Events';

class Tooltip extends React.Component {
  constructor (props) {
    super(props);

    this.state = {
      isFocus: false,
      isHovered: false,
    };

    this.showTooltip = this.showTooltip.bind(this);
    this.hideTooltip = this.hideTooltip.bind(this);

    this.getHideDelay = this.getHideDelay.bind(this);
    this.getShowDelay = this.getShowDelay.bind(this);

    this.engageTooltip = this.engageTooltip.bind(this);
    this.disengageTooltip = this.disengageTooltip.bind(this);

    this.renderTooltipBox = this.renderTooltipBox.bind(this);
    this.componentDidMount = this.componentDidMount.bind(this);
  }

  static getOffset (node) {
    return node.getBoundingClientRect();
  }

  getShowDelay () {
    const { showDelay } = this.props;
    return typeof showDelay === 'number'
      ? showDelay
      : 250;
  }

  componentDidMount () {
    const { addModal, removeModal } = this.context;
    if (
      typeof addModal !== 'function'
      || typeof removeModal !== 'function'
    ) {
      throw new Error(`
        Tooltip Error: No "addModal" or "removeModal" detected in context.
        Please use a <ModalBoundary> in your element tree to catch modals.
      `);
    }
    if (!this.el) {
      console.error(`
        Tooltip Error: Can't setup focusIn/focusOut events.
        Element ref could not be found; was render interrupted?
      `);
    } else {
      this.events = new EventsFactory(this.el);
      this.events.use({
        focusIn: () => this.setState({ isFocus: true }),
        keypress: () => this.setState({ isFocus: true }),
        focusOut: () => this.setState({ isFocus: false }),
        mouseEnter: () => this.setState({ isHovered: true }),
        mouseLeave: () => this.setState({ isHovered: false })
      });
    }
  }

  componentWillUnmount () {
    if (this.events) this.events.clearAll();
  }

  getHideDelay () {
    let { hideDelay } = this.props;
    return typeof hideDelay === 'number'
      ? hideDelay
      : 500;
  }

  showTooltip () {
    if (this.id) return;
    const { addModal } = this.context;
    this.id = addModal({ render: () => this.renderTooltipBox() });
    if (this.hideTimeout) clearTimeout(this.hideTimeout);
  }

  engageTooltip () {
    const { fadeOut } = this.props;
    const showDelay = this.getShowDelay();

    if (this.isDisengaged && fadeOut) {
      this.isDisengaged = false;
    }

    this.showTimeout = setTimeout(() => {
      this.showTooltip();
      if (this.hideTimeout) clearTimeout(this.hideTimeout);
    }, showDelay);
  }

  disengageTooltip () {
    const { fadeOut } = this.props;
    const { triggerModalRefresh } = this.context;
    const hideDelay = this.getHideDelay();

    if (!this.isDisengaged && fadeOut) {
      this.isDisengaged = true;
      triggerModalRefresh();
    }

    if (this.showTimeout) clearTimeout(this.showTimeout);
    this.hideTimeout = setTimeout(this.hideTooltip, hideDelay);
  }

  hideTooltip () {
    if (!this.id || this.state.isFocus || this.state.isHovered) return;
    const { removeModal } = this.context;
    removeModal(this.id);
    this.id = null;
  }

  getCornerClass () {
    const { corner } = this.props;
    if (typeof corner !== 'string' || !corner.length) return 'no-corner';
    return corner.split(' ').filter(s => s).join('-');
  }

  renderTooltipBox () {
    const { isDisengaged } = this;
    const { content, position, style, renderHtml } = this.props;
    const { top, left, right } = position ? position : { top: 0, left: 0, right: 0 };
    const cornerClass = this.getCornerClass();
    const opacity = isDisengaged ? 0.05 : 1;
    const boxStyle = Object.assign({}, {
      top,
      left,
      right,
      zIndex: 1000000,
      display: 'block',
      position: 'absolute',
      pointerEvents: 'auto',
      transition: 'opacity 0.7s',
      opacity,
    }, style && Object.keys(style).length ? style : {});

    return (
      <div
        style={boxStyle}
        className={'Tooltip-Content ' + cornerClass + (isDisengaged ? ' Tooltip-Content--Disengaged' : '')}
        onMouseEnter={this.engageTooltip}
        onMouseLeave={this.disengageTooltip}>
        {renderHtml ? <div dangerouslySetInnerHTML={{ __html: content }} /> : content}
      </div>
    );
  }

  render () {
    const { isFocus, isHovered, isDisengaged } = this.state;
    if (this.el && (isFocus || isHovered)) this.engageTooltip();
    else this.disengageTooltip();

    const { children, className } = this.props;
    const fullClassName = 'Tooltip'
      + (isDisengaged ? ' Tooltip--Disengaged' : '')
      + (className ? ' ' + className : '');
    return (
      <div
        tabIndex={0}
        className={fullClassName}
        ref={(el) => this.el = el}>
        {children}
      </div>
    )
  }
};

Tooltip.propTypes = {
  hideDelay: PropTypes.number,
  children: PropTypes.node,
  className: PropTypes.string,
  content: PropTypes.node,
  corner: PropTypes.string,
  fadeOut: PropTypes.boolean,
  position: PropTypes.object
};

Tooltip.contextTypes = {
  addModal: PropTypes.func,
  removeModal: PropTypes.func,
  triggerModalRefresh: PropTypes.func
};

export default Tooltip;
