'use strict';

var _Logo = require('./components/Logo');

var _Logo2 = _interopRequireDefault(_Logo);

var _Info = require('./components/Info');

var _Info2 = _interopRequireDefault(_Info);

var _BookTable = require('./components/BookTable');

var _BookTable2 = _interopRequireDefault(_BookTable);

var _Log = require('./components/Log');

var _Log2 = _interopRequireDefault(_Log);

var _ShoppingCart = require('./components/ShoppingCart');

var _ShoppingCart2 = _interopRequireDefault(_ShoppingCart);

var _UserInfo = require('./components/UserInfo');

var _UserInfo2 = _interopRequireDefault(_UserInfo);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

var _os = require('os');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var category = localStorage.getItem('category');
var headers = localStorage.getItem('headers');
var data = localStorage.getItem('data');

if (!headers) {
  category = ['Poem', 'Fiction', 'Story'];
  headers = ['title', 'auther', 'price', 'publish', '        '];
  data = [{ category: "Poem", title: "Ice Rain", auther: "Alan", price: 21, publish: 2001, choice: "Add" }, { category: "Poem", title: "Homeland", auther: "Mimi", price: 44, publish: 2011, choice: "Add" }, { category: "Fiction", title: "Cut me off", auther: "Alan", price: 92, publish: 2008, choice: "Add" }, { category: "Story", title: "Grind me down", auther: "BBan", price: 67, publish: 2000, choice: "Add" }, { category: "Poem", title: "Green", auther: "BBan", price: 17, publish: 2011, choice: "Add" }];
}

_reactDom2.default.render(_react2.default.createElement(
  'div',
  { className: 'layout' },
  _react2.default.createElement(
    'div',
    { className: 'header' },
    _react2.default.createElement(_Logo2.default, null),
    _react2.default.createElement(_Info2.default, null)
  ),
  _react2.default.createElement(
    'div',
    { className: 'content' },
    _react2.default.createElement(_BookTable2.default, { category: category, headers: headers, initialData: data }),
    _react2.default.createElement(_ShoppingCart2.default, null),
    _react2.default.createElement(_UserInfo2.default, null),
    _react2.default.createElement(_Log2.default, null)
  )
), document.getElementById('app'));