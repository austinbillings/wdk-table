import React from 'react';
import PropTypes from 'prop-types';
class Tooltip extends React.Component {
  constructor (props) {
    super(props);
    this.state = { showText: false }
    this.showTooltip = this.showTooltip.bind(this);
    this.hideTooltip = this.hideTooltip.bind(this);
    this.renderTextBox = this.renderTextBox.bind(this);
    this.componentDidMount = this.componentDidMount.bind(this);
  }

  static getOffset (node) {
    let top = 0;
    let left = 0;
    let height = node.offsetHeight;
    let width = node.offsetWidth;

    do {
      top += node.offsetTop || 0;
      left += node.offsetLeft || 0;
      node = node.offsetParent;
    } while (node);
    return { top, left, height, width };
  }

  componentDidMount () {
    const { addModal, removeModal } = this.context;
    if (typeof addModal !== 'function' || typeof removeModal !== 'function') {
      throw new Error(`
        Tooltip Error: No "addModal" or "removeModal" detected in context.
        Please use a <ModalBoundary> in your element tree to catch modals.
      `);
    }
  }

  showTooltip () {
    const showText = true;
    const textBox = { render: this.renderTextBox };
    this.context.addModal(textBox);
  }

  hideTooltip () {
    const showText = false;
    const textBox = { render: this.renderTextBox };
    this.context.removeModal(textBox);
  }

  renderTextBox () {
    const { text, position } = this.props;
    let { top, left } = position ? position : { top: 0, left: 0 };
    top = (typeof top === 'number' ? top : 0);
    console.log('top is...', top);


    const textStyle = {
      top,
      left,
      display: 'block',
      position: 'absolute',
      zIndex: 1000000
    };

    return (
      <div
        style={textStyle}
        className="Tooltip-Text">
        {text}
      </div>
    );
  }

  render () {
    const { children } = this.props;
    const className = 'Tooltip' + (this.props.className ? ' ' + this.props.className : '');
    return (
      <div
        className={className}
        onMouseEnter={this.showTooltip}
        onMouseLeave={this.hideTooltip}>
        {children}
      </div>
    )
  }
};

Tooltip.contextTypes = {
  addModal: PropTypes.func,
  removeModal: PropTypes.func
};

export default Tooltip;
