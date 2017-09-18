import React from 'react';

import Templates from 'Mesa/Templates';

class DataCell extends React.PureComponent {
  constructor (props) {
    super(props);
  }

  renderContent () {
    const { column, row, state } = this.props;
    const { key } = column;

    if ('renderCell' in column) return column.renderCell(key, row[key], row);

    switch (column.type) {
      case 'html':
        if (state.options.inline) return Templates.cell(column, row);
        return Templates.htmlCell(column, row);
      case 'text':
      default:
        return Templates.cell(column, row);
    };
  }

  render () {
    let { column, row, state } = this.props;
    let { style, width } = column;
    let { options } = state;
    let content = this.renderContent();
    let whiteSpace = options.inline !== true || !options.inline.enabled ? {} : {
      textOverflow: 'ellipsis',
      overflow: 'hidden',
      maxWidth: options.inlineMaxWidth || '400px',
      maxHeight: options.inlineMaxHeight || '2em',
    };
    width = (typeof width === 'number')
      ? width + 'px'
      : (typeof width === 'string')
        ? width
        : null;
    const cellStyle = Object.assign({}, style, (width ? { width } : {}), whiteSpace);

    return column.hidden ? null : (
      <td key={column.key} style={cellStyle}>
        {content}
      </td>
    );
  }
};

export default DataCell;
