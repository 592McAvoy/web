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

var Log = function (_React$Component) {
    _inherits(Log, _React$Component);

    function Log(props) {
        _classCallCheck(this, Log);

        var _this = _possibleConstructorReturn(this, (Log.__proto__ || Object.getPrototypeOf(Log)).call(this, props));

        _this.handleLog = _this.handleLog.bind(_this);
        _this.handleLogOut = _this.handleLogOut.bind(_this);
        _this.handleRegister = _this.handleRegister.bind(_this);
        _this.changePassword = _this.changePassword.bind(_this);
        _this.changeUsr = _this.changeUsr.bind(_this);
        _this.changeEmailAddr = _this.changeEmailAddr.bind(_this);
        _this.changePhoneNum = _this.changePhoneNum.bind(_this);

        _this.state = {
            load: false,
            logIn: false,
            register: false,
            userName: "my friend",
            password: "",
            phoneNum: "",
            emailAddr: ""
        };
        return _this;
    }

    _createClass(Log, [{
        key: "componentDidMount",
        value: function componentDidMount() {
            var _this2 = this;

            this.eventEmitter = _event2.default.addListener("Page", function (msg) {
                if (msg != "Log") {
                    _this2.setState({ load: false });
                } else {
                    _this2.setState({ load: true });
                }
            });
        }
    }, {
        key: "componentWillUnmount",
        value: function componentWillUnmount() {
            _event2.default.removeListener(this.eventEmitter);
        }
    }, {
        key: "handleLog",
        value: function handleLog(e) {
            e.preventDefault();
            this.setState({ logIn: true });

            var cb = function cb(msg) {
                _event2.default.emit("Log", msg);
            };
            cb("Log in");
            alert("Welcome " + this.state.userName);

            var ca = function ca(msg) {
                _event2.default.emit("Page", msg);
            };
            ca("Homepage");

            var cn = function cn(msg) {
                _event2.default.emit("User", msg);
            };
            cn(this.state.userName);
        }
    }, {
        key: "handleRegister",
        value: function handleRegister(e) {
            this.setState({ register: true });
        }
    }, {
        key: "handleLogOut",
        value: function handleLogOut(e) {
            this.setState({
                logIn: false,
                register: false
            });
            var cb = function cb(msg) {
                _event2.default.emit("Log", msg);
            };
            cb("Log out");
        }
    }, {
        key: "changePassword",
        value: function changePassword(e) {
            this.setState({ password: e.target.value });
        }
    }, {
        key: "changeUsr",
        value: function changeUsr(e) {
            this.setState({ userName: e.target.value });
        }
    }, {
        key: "changePhoneNum",
        value: function changePhoneNum(e) {
            this.setState({ phoneNum: e.target.value });
        }
    }, {
        key: "changeEmailAddr",
        value: function changeEmailAddr(e) {
            this.setState({ emailAddr: e.target.value });
        }
    }, {
        key: "renderLog",
        value: function renderLog() {
            if (this.state.logIn) {
                return _react2.default.createElement(
                    "div",
                    null,
                    _react2.default.createElement(
                        "p",
                        null,
                        "Welcome",
                        " ",
                        this.state.userName,
                        "!"
                    ),
                    _react2.default.createElement(
                        "button",
                        { onClick: this.handleLogOut },
                        " Log out"
                    )
                );
            }
            if (this.state.register) {
                return _react2.default.createElement(
                    "div",
                    null,
                    _react2.default.createElement(
                        "form",
                        { id: "f1", onSubmit: this.handleLog },
                        _react2.default.createElement(
                            "label",
                            null,
                            "UserName:",
                            _react2.default.createElement("input", { type: "text", value: this.state.userName,
                                onChange: this.changeUsr, placeholder: "..." })
                        ),
                        _react2.default.createElement("br", null),
                        _react2.default.createElement(
                            "label",
                            null,
                            "Password:",
                            _react2.default.createElement("input", { type: "text", value: this.state.password,
                                onChange: this.changePassword, placeholder: "..." })
                        ),
                        _react2.default.createElement("br", null),
                        _react2.default.createElement(
                            "label",
                            null,
                            "PhoneNumber:",
                            _react2.default.createElement("input", { type: "text", value: this.state.phoneNum,
                                onChange: this.changePhoneNum, placeholder: "..." })
                        ),
                        _react2.default.createElement("br", null),
                        _react2.default.createElement(
                            "label",
                            null,
                            "EmailAddr:",
                            _react2.default.createElement("input", { type: "text", value: this.state.emailAddr,
                                onChange: this.changeEmailAddr, placeholder: "..." })
                        ),
                        _react2.default.createElement("br", null),
                        _react2.default.createElement("input", { type: "submit", value: "Register" })
                    )
                );
            }
            return _react2.default.createElement(
                "div",
                null,
                _react2.default.createElement(
                    "p",
                    null,
                    "New user please",
                    _react2.default.createElement(
                        "button",
                        { onClick: this.handleRegister },
                        " click here"
                    ),
                    "to register"
                ),
                _react2.default.createElement(
                    "form",
                    { onSubmit: this.handleLog },
                    _react2.default.createElement(
                        "label",
                        null,
                        "UserName:",
                        _react2.default.createElement("input", { type: "text", value: this.state.userName,
                            onChange: this.changeUsr, placeholder: "..." })
                    ),
                    _react2.default.createElement("br", null),
                    _react2.default.createElement(
                        "label",
                        null,
                        "Password:",
                        _react2.default.createElement("input", { type: "text", value: this.state.password,
                            onChange: this.changePassword, placeholder: "..." })
                    ),
                    _react2.default.createElement("br", null),
                    _react2.default.createElement("input", { type: "submit", value: "Log In" })
                )
            );
        }
    }, {
        key: "render",
        value: function render() {
            if (!this.state.load) {
                return _react2.default.createElement("div", null);
            }
            var log = this.renderLog();
            return _react2.default.createElement(
                "div",
                { className: "Log" },
                log
            );
        }
    }]);

    return Log;
}(_react2.default.Component);

exports.default = Log;