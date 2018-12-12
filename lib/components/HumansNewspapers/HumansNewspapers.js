'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _data = require('./data');

var _data2 = _interopRequireDefault(_data);

require('./HumansNewspapers.css');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var importAll = function importAll(require) {
  return require.keys().reduce(function (acc, next) {
    acc[next.replace("./", "")] = require(next);
    return acc;
  }, {});
};

var images = importAll(require.context("./img", false, /\.(png|jpe?g|svg)$/));

var HumansNewspapers = function (_React$Component) {
  _inherits(HumansNewspapers, _React$Component);

  function HumansNewspapers(props) {
    _classCallCheck(this, HumansNewspapers);

    var _this = _possibleConstructorReturn(this, (HumansNewspapers.__proto__ || Object.getPrototypeOf(HumansNewspapers)).call(this, props));

    _this.canClick = true;

    _this.generateStyles = function (width) {
      return '\n    @keyframes newspaperShowFromLeft {\n      0% {margin-left:-' + width + '%;opacity:0}\n      100% {margin-left:0;opacity:1}\n    }\n    @keyframes newspaperHideFromRight {\n      0% {margin-right:0;opacity:1}\n      100% {margin-right:-' + width + '%;opacity:0}\n    }\n    @keyframes newspaperShowFromRight {\n      0% {margin-right:-' + width + '%;opacity:0}\n      100% {margin-right:0;opacity:1}\n    }\n    @keyframes newspaperHideFromLeft {\n      0% {margin-left:0;opacity:1}\n      100% {margin-left:-' + width + '%;opacity:0}\n    }\n  ';
    };

    _this.reRender = function (prevState, nextState) {
      var main = nextState.main,
          wrapper = nextState.wrapper,
          styles = nextState.styles,
          max = nextState.max,
          width = nextState.width,
          current = nextState.current;

      var content = wrapper.querySelector('.humans-newspapers-layout-content');

      if (prevState.max !== nextState.max) {
        var _template = '';
        for (var i = current; i < current + max; i++) {
          var element = _data2.default[i];
          _template += '\n        <div class="humans-newspapers-layout-newspapers-id" style="width: ' + width + '%">\n          <a target=\'_blank\' style="background-image:url(' + images[element.image] + ')" title="' + element.title + '" href="' + element.url + '"></a>\n        </div>';
        }

        content.innerHTML = _template;
        main.querySelector('#humans-newspapers-layout-styles').innerHTML = styles;
      }
    };

    _this.resize = function (e) {
      var _this$state = _this.state,
          wrapper = _this$state.wrapper,
          current = _this$state.current;

      var width = wrapper.offsetWidth;
      var max = Math.round(width / 170);
      var elementWidth = 100 / max;
      var prevState = _this.state;
      _this.setState({
        width: elementWidth,
        max: max,
        current: 0,
        last: max - 1,
        styles: _this.generateStyles(elementWidth)
      }, function () {
        _this.reRender(prevState, _this.state);
      });
    };

    _this.createElement = function (element, className) {
      var width = _this.state.width;

      var newElement = document.createElement('div');
      newElement.className = 'humans-newspapers-layout-newspapers-id ' + className;
      newElement.style.width = width + '%';
      newElement.innerHTML = '<a target=\'_blank\' style="background-image:url(' + images[element.image] + ')" title="' + element.title + '" href="' + element.url + '"></a>';
      return newElement;
    };

    _this.toLeft = function () {
      var _this$state2 = _this.state,
          wrapper = _this$state2.wrapper,
          current = _this$state2.current,
          max = _this$state2.max,
          items = _this$state2.items,
          last = _this$state2.last;


      if (_this.canClick) {

        _this.canClick = false;

        current = current > 0 ? current - 1 : _data2.default.length - 1;
        last = last - 1 >= 0 ? last - 1 : max - 1;
        items.pop();
        var show = [].concat(_data2.default[current], items);

        var lastElement = wrapper.querySelector('.humans-newspapers-layout-content .humans-newspapers-layout-newspapers-id:last-child');
        var firstElement = wrapper.querySelector('.humans-newspapers-layout-content .humans-newspapers-layout-newspapers-id:first-child');

        var element = _this.createElement(_data2.default[current], 'show-left');

        wrapper.querySelector('.humans-newspapers-layout-content').insertBefore(element, firstElement);
        lastElement.classList.add('hide-right');

        setTimeout(function () {
          element.classList.remove('hide-left');
          element.classList.remove('show-left');
          lastElement.remove();
          _this.setState({
            current: current,
            last: last,
            items: show
          });
          _this.canClick = true;
        }, 200);
      }
    };

    _this.toRight = function () {
      var _this$state3 = _this.state,
          wrapper = _this$state3.wrapper,
          current = _this$state3.current,
          last = _this$state3.last,
          items = _this$state3.items;


      if (_this.canClick) {

        _this.canClick = false;

        current = current + 1 < _data2.default.length - 1 ? current + 1 : 0;
        last = last + 1 <= _data2.default.length - 1 ? last + 1 : 0;
        items.shift();
        var show = [].concat(items, _data2.default[last]);

        var first = wrapper.querySelector('.humans-newspapers-layout-content .humans-newspapers-layout-newspapers-id:first-child');
        var element = _this.createElement(_data2.default[last], 'show-right');

        wrapper.querySelector('.humans-newspapers-layout-content').appendChild(element);
        first.classList.add('hide-left');

        setTimeout(function () {
          element.classList.remove('show-right');
          element.classList.remove('hide-right');
          first.remove();
          _this.setState({
            current: current,
            last: last,
            items: show
          });
          _this.canClick = true;
        }, 200);
      }
    };

    _this.state = {
      width: 0,
      items: [],
      current: 0,
      max: 0
    };
    return _this;
  }

  _createClass(HumansNewspapers, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      var main = document.querySelector('.humans-newspapers-layout');
      var wrapper = main.querySelector('.humans-newspapers-layout-wrapper');
      var width = wrapper.offsetWidth;
      var max = Math.round(width / 170);
      var show = _data2.default.slice(0, max);
      var elementWidth = 100 / max;
      this.setState({
        width: elementWidth,
        items: show,
        max: max,
        main: main,
        wrapper: wrapper,
        last: max - 1,
        styles: this.generateStyles(elementWidth)
      });

      window.addEventListener('resize', this.resize);
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      window.removeEventListener('resize', this.resize);
    }
  }, {
    key: 'shouldComponentUpdate',
    value: function shouldComponentUpdate(nextProps, nextState) {
      if (this.state.max > 0) return false;
      return true;
    }
  }, {
    key: 'render',
    value: function render() {
      var _this2 = this;

      var _state = this.state,
          items = _state.items,
          styles = _state.styles;


      return _react2.default.createElement(
        'div',
        { className: 'humans-newspapers-layout' },
        _react2.default.createElement(
          'style',
          { id: 'humans-newspapers-layout-styles' },
          styles
        ),
        _react2.default.createElement(
          'div',
          { className: 'humans-newspapers-layout-newspapers' },
          _react2.default.createElement(
            'div',
            { className: 'humans-newspapers-layout-arrow humans-newspapers-layout-arrow-toleft', onClick: this.toLeft },
            _react2.default.createElement(
              'svg',
              { width: '13', height: '28', fill: 'none' },
              _react2.default.createElement('path', { fillRule: 'evenodd', clipRule: 'evenodd', d: 'M13 0H11L0 14L11 28H13L2 14L13 0Z', fill: '#FF585D' })
            )
          ),
          _react2.default.createElement(
            'div',
            { className: 'humans-newspapers-layout-wrapper' },
            _react2.default.createElement(
              'div',
              { className: 'humans-newspapers-layout-content' },
              items.length && items.map(function (item, index) {
                return _react2.default.createElement(
                  'div',
                  { key: item.image, className: 'humans-newspapers-layout-newspapers-id', style: { 'width': _this2.state.width + '%' } },
                  _react2.default.createElement('a', { target: '_blank', style: { 'backgroundImage': 'url(' + images[item.image] + ')' }, title: item.title, href: item.url })
                );
              })
            )
          ),
          _react2.default.createElement(
            'div',
            { className: 'humans-newspapers-layout-arrow humans-newspapers-layout-arrow-toright', onClick: this.toRight },
            _react2.default.createElement(
              'svg',
              { width: '13', height: '28', viewBox: '0 0 13 28', fill: 'none' },
              _react2.default.createElement('path', { fillRule: 'evenodd', clipRule: 'evenodd', d: 'M13 0H11L0 14L11 28H13L2 14L13 0Z', transform: 'translate(13) scale(-1 1)', fill: '#FF585D' })
            )
          )
        )
      );
    }
  }]);

  return HumansNewspapers;
}(_react2.default.Component);

exports.default = HumansNewspapers;