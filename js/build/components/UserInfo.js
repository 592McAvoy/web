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

var UserInfo = function (_React$Component) {
    _inherits(UserInfo, _React$Component);

    function UserInfo(props) {
        _classCallCheck(this, UserInfo);

        var _this = _possibleConstructorReturn(this, (UserInfo.__proto__ || Object.getPrototypeOf(UserInfo)).call(this, props));

        _this.changeEdit = _this.changeEdit.bind(_this);
        _this.changeIntro = _this.changeIntro.bind(_this);
        _this.submitIntro = _this.submitIntro.bind(_this);

        _this.state = {
            load: false,
            name: "",
            introduction: "",
            edit: false
        };
        return _this;
    }

    _createClass(UserInfo, [{
        key: "componentDidMount",
        value: function componentDidMount() {
            var _this2 = this;

            this.eventEmitter = _event2.default.addListener("Page", function (msg) {
                if (msg != "User") {
                    _this2.setState({ load: false });
                } else {
                    _this2.setState({ load: true });
                }
            });
            this.eventEmitter1 = _event2.default.addListener("User", function (name) {
                _this2.setState({ name: name });
            });
        }
    }, {
        key: "componentWillUnmount",
        value: function componentWillUnmount() {
            _event2.default.removeListener(this.eventEmitter);
            _event2.default.removeListener(this.eventEmitter1);
        }
    }, {
        key: "changeIntro",
        value: function changeIntro(e) {
            this.setState({ introduction: e.target.value });
        }
    }, {
        key: "submitIntro",
        value: function submitIntro(e) {
            e.preventDefault();
            this.setState({ edit: false });
        }
    }, {
        key: "renderIntro",
        value: function renderIntro() {
            if (this.state.edit) {
                return _react2.default.createElement(
                    "form",
                    { onSubmit: this.submitIntro },
                    _react2.default.createElement(
                        "label",
                        null,
                        "Introduction:",
                        '        ',
                        _react2.default.createElement("input", { type: "text", value: this.state.introduction,
                            onChange: this.changeIntro })
                    )
                );
            } else {
                return _react2.default.createElement(
                    "p",
                    null,
                    "Introduction:",
                    '        ',
                    this.state.introduction
                );
            }
        }
    }, {
        key: "changeEdit",
        value: function changeEdit(e) {
            var edit = this.state.edit;
            this.setState({ edit: !edit });
        }
    }, {
        key: "renderInfo",
        value: function renderInfo() {
            var intro = this.renderIntro();
            return _react2.default.createElement(
                "div",
                { className: "usrInfo" },
                _react2.default.createElement(
                    "h1",
                    null,
                    "Personal Homepage"
                ),
                _react2.default.createElement("div", { id: "icon" }),
                _react2.default.createElement(
                    "p",
                    null,
                    "UserName:",
                    '      ',
                    this.state.name
                ),
                _react2.default.createElement(
                    "div",
                    { onDoubleClick: this.changeEdit },
                    intro
                )
            );
        }
    }, {
        key: "renderOrder",
        value: function renderOrder() {}
    }, {
        key: "render",
        value: function render() {
            if (!this.state.load) {
                return _react2.default.createElement("div", null);
            }
            var info = this.renderInfo();
            return _react2.default.createElement(
                "div",
                { className: "UserInfo" },
                info
            );
        }
    }]);

    return UserInfo;
}(_react2.default.Component);

exports.default = UserInfo;