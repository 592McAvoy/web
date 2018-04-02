"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _event = require("./event");

var _event2 = _interopRequireDefault(_event);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var ShoppingCart = function (_React$Component) {
    _inherits(ShoppingCart, _React$Component);

    function ShoppingCart(props) {
        _classCallCheck(this, ShoppingCart);

        var _this = _possibleConstructorReturn(this, (ShoppingCart.__proto__ || Object.getPrototypeOf(ShoppingCart)).call(this, props));

        _this.totalCost = _this.totalCost.bind(_this);
        _this.icrNum = _this.icrNum.bind(_this);
        _this.dcrNum = _this.dcrNum.bind(_this);
        _this.generateOrder = _this.generateOrder.bind(_this);

        _this.state = {
            load: false,
            list: [],
            record: new Array(10)
        };
        return _this;
    }

    _createClass(ShoppingCart, [{
        key: "componentDidMount",
        value: function componentDidMount() {
            var _this2 = this;

            this.eventEmitter = _event2.default.addListener("Page", function (msg) {
                if (msg != "Shopping") {
                    _this2.setState({ load: false });
                } else {
                    _this2.setState({ load: true });
                }
            });
            this.eventEmitter2 = _event2.default.addListener("Add", function (item) {
                var list = _this2.state.list;
                var idx = list.indexOf(item);
                var record = _this2.state.record;
                if (idx > -1) {
                    if (record[idx] >= list[idx].stock) {
                        alert("stock shortage!");
                    } else {
                        record[idx] += 1;
                    }
                } else {
                    list.push(item);
                    record[list.indexOf(item)] = 1;
                }

                _this2.setState({ record: record });
                _this2.setState({ list: list });
            });
        }
    }, {
        key: "componentWillUnmount",
        value: function componentWillUnmount() {
            _event2.default.removeListener(this.eventEmitter);
            _event2.default.removeListener(this.eventEmitter2);
        }
    }, {
        key: "totalCost",
        value: function totalCost() {
            var record = this.state.record;
            var list = this.state.list;
            var len = list.length;
            var sum = 0;
            for (var i = 0; i < len; i++) {
                sum += record[i] * list[i].price;
            }
            return sum;
        }
    }, {
        key: "icrNum",
        value: function icrNum(e) {
            var idx = parseInt(e.target.dataset.row, 10);
            var record = this.state.record;
            var list = this.state.list;
            record[idx] += 1;
            if (record[idx] > list[idx].stock) {
                alert("stock shortage!");
                return;
            }
            this.setState({ record: record });
        }
    }, {
        key: "dcrNum",
        value: function dcrNum(e) {
            var idx = parseInt(e.target.dataset.row, 10);
            var record = this.state.record;
            var list = this.state.list;
            if (record[idx] > 1) {
                record[idx] -= 1;
            } else {
                record.splice(idx, 1);
                list.splice(idx, 1);
            }
            this.setState({
                record: record,
                list: list
            });
        }
    }, {
        key: "generateOrder",
        value: function generateOrder(e) {
            var sum = this.totalCost();
            if (sum <= 0) {
                return;
            }
            var date = new Date();
            var content = [];

            var record = this.state.record;
            var list = this.state.list;
            var len = list.length;
            for (var i = 0; i < len; i++) {
                var item = Object();
                item.title = list[i].title;
                item.auther = list[i].auther;
                item.price = list[i].price;
                item.amount = record[i];
                item.cost = list[i].price * record[i];
                content.push(item);
            }

            var order = Object();
            order.time = date;
            order.totalCost = sum;
            order.content = content;

            var co = function co(order) {
                _event2.default.emit("Order", order);
            };
            co(order);
        }
    }, {
        key: "renderList",
        value: function renderList() {
            var _this3 = this;

            return _react2.default.createElement(
                "div",
                null,
                _react2.default.createElement(
                    "table",
                    null,
                    _react2.default.createElement(
                        "thead",
                        null,
                        _react2.default.createElement(
                            "tr",
                            null,
                            _react2.default.createElement(
                                "th",
                                null,
                                "title"
                            ),
                            _react2.default.createElement(
                                "th",
                                null,
                                "price"
                            ),
                            _react2.default.createElement(
                                "th",
                                null,
                                "amount"
                            )
                        )
                    ),
                    _react2.default.createElement(
                        "tbody",
                        null,
                        this.state.list.map(function (row, idx) {
                            return _react2.default.createElement(
                                "tr",
                                { key: idx },
                                _react2.default.createElement(
                                    "td",
                                    null,
                                    row.title
                                ),
                                _react2.default.createElement(
                                    "td",
                                    null,
                                    "$",
                                    row.price
                                ),
                                _react2.default.createElement(
                                    "td",
                                    null,
                                    _this3.state.record[idx]
                                ),
                                _react2.default.createElement(
                                    "td",
                                    null,
                                    _react2.default.createElement(
                                        "button",
                                        { "data-row": idx, onClick: _this3.icrNum },
                                        "+"
                                    ),
                                    _react2.default.createElement(
                                        "button",
                                        { "data-row": idx, onClick: _this3.dcrNum },
                                        "-"
                                    )
                                )
                            );
                        }, this)
                    )
                ),
                _react2.default.createElement(
                    "p",
                    null,
                    "Total Cost:",
                    "     $",
                    this.totalCost()
                ),
                _react2.default.createElement("br", null),
                _react2.default.createElement(
                    "button",
                    { id: "bb", onClick: this.generateOrder },
                    "->Gengerate Order"
                )
            );
        }
    }, {
        key: "render",
        value: function render() {
            if (!this.state.load) {
                return _react2.default.createElement("div", null);
            }
            var buyList = this.renderList();
            return _react2.default.createElement(
                "div",
                { className: "ShoppingCart" },
                _react2.default.createElement(
                    "h1",
                    null,
                    "Your Shopping Cart"
                ),
                buyList
            );
        }
    }]);

    return ShoppingCart;
}(_react2.default.Component);

exports.default = ShoppingCart;