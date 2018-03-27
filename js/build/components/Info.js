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

var Info = function (_React$Component) {
    _inherits(Info, _React$Component);

    function Info(props) {
        _classCallCheck(this, Info);

        var _this = _possibleConstructorReturn(this, (Info.__proto__ || Object.getPrototypeOf(Info)).call(this, props));

        _this.state = {
            isLog: false
        };
        return _this;
    }

    _createClass(Info, [{
        key: "componentDidMount",
        value: function componentDidMount() {
            var _this2 = this;

            this.eventEmitter = _event2.default.addListener("Log", function (msg) {
                if (msg == "Log in") {
                    _this2.setState({ isLog: true });
                } else if (msg == "Log out") {
                    _this2.setState({ isLog: false });
                }
            });
        }
    }, {
        key: "componentWillUnmount",
        value: function componentWillUnmount() {
            _event2.default.removeListener(this.eventEmitter);
        }
    }, {
        key: "render",
        value: function render() {
            var cb = function cb(msg) {
                return function () {
                    _event2.default.emit("Page", msg);
                };
            };
            if (this.state.isLog) {
                return _react2.default.createElement(
                    "div",
                    { className: "Info" },
                    _react2.default.createElement(
                        "a",
                        { href: "#", onClick: cb("Homepage") },
                        "Homepage"
                    ),
                    _react2.default.createElement(
                        "a",
                        { href: "#", onClick: cb("Shopping") },
                        "Shopping Cart"
                    ),
                    _react2.default.createElement(
                        "a",
                        { href: "#", onClick: cb("User") },
                        "UserInfo"
                    ),
                    _react2.default.createElement(
                        "a",
                        { href: "#", onClick: cb("Log") },
                        "Log out"
                    )
                );
            } else {
                return _react2.default.createElement(
                    "div",
                    { className: "Info" },
                    _react2.default.createElement(
                        "a",
                        { href: "#", onClick: cb("Homepage") },
                        "Homepage"
                    ),
                    _react2.default.createElement(
                        "a",
                        { href: "#", onClick: cb("Log") },
                        "Log in"
                    )
                );
            }
        }
    }]);

    return Info;
}(_react2.default.Component);

exports.default = Info;