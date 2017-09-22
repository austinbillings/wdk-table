'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _Defaults = require('../Defaults');

var _Defaults2 = _interopRequireDefault(_Defaults);

var _Utils = require('../Utils/Utils');

var _Utils2 = _interopRequireDefault(_Utils);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var OverScroll = function (_React$Component) {
  _inherits(OverScroll, _React$Component);

  function OverScroll(props) {
    _classCallCheck(this, OverScroll);

    return _possibleConstructorReturn(this, (OverScroll.__proto__ || Object.getPrototypeOf(OverScroll)).call(this, props));
  }

  _createClass(OverScroll, [{
    key: 'render',
    value: function render() {
      var _props = this.props,
          className = _props.className,
          height = _props.height;

      className = 'OverScroll' + (className ? ' ' + className : '');
      height = typeof height === 'number' ? height + 'px' : 'none';

      var style = {
        maxHeight: height,
        overflowY: 'auto'
      };

      return _react2.default.createElement(
        'div',
        { className: className },
        _react2.default.createElement(
          'div',
          { className: 'OverScroll-Inner', style: style },
          this.props.children
        )
      );
    }
  }]);

  return OverScroll;
}(_react2.default.Component);

;

exports.default = OverScroll;