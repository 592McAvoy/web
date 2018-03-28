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

var BookTable = function (_React$Component) {
    _inherits(BookTable, _React$Component);

    function BookTable(props) {
        _classCallCheck(this, BookTable);

        var _this = _possibleConstructorReturn(this, (BookTable.__proto__ || Object.getPrototypeOf(BookTable)).call(this, props));

        _this.changeCategory = _this.changeCategory.bind(_this);
        _this.handleChange = _this.handleChange.bind(_this);
        _this.handleSubmit = _this.handleSubmit.bind(_this);
        _this.handleSeniorSearch = _this.handleSeniorSearch.bind(_this);
        _this.changeSelectIdx = _this.changeSelectIdx.bind(_this);
        _this.changeLow = _this.changeLow.bind(_this);
        _this.changeHigh = _this.changeHigh.bind(_this);
        _this.handleSelect = _this.handleSelect.bind(_this);
        _this.clearSelect = _this.clearSelect.bind(_this);
        _this.handleSort = _this.handleSort.bind(_this);
        _this.addItem = _this.addItem.bind(_this);

        _this.state = {
            load: true,
            data: _this.props.initialData,
            preData: null,
            category: "Poem",
            searchIdx: "",
            seniorSearch: false,
            selectIdx: "price",
            low: 0,
            high: 9999,
            sortIdx: null,
            descending: false
        };
        return _this;
    }

    _createClass(BookTable, [{
        key: "componentDidMount",
        value: function componentDidMount() {
            var _this2 = this;

            this.eventEmitter = _event2.default.addListener("Page", function (msg) {
                if (msg != "Homepage") {
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
        key: "changeCategory",
        value: function changeCategory(e) {
            var newCate = e.target.firstChild.data; //.firstChild是一个文本节点，要获取里面的文本内容要用.data
            this.setState({ category: newCate });
        }
    }, {
        key: "renderCategory",
        value: function renderCategory() {
            return _react2.default.createElement(
                "div",
                { className: "Category" },
                _react2.default.createElement(
                    "ul",
                    { onClick: this.changeCategory },
                    this.props.category.map(function (item, idx) {
                        return _react2.default.createElement(
                            "li",
                            { key: idx },
                            item
                        );
                    }, this)
                )
            );
        }
    }, {
        key: "handleChange",
        value: function handleChange(e) {
            var newIdx = e.target.value;
            this.setState({ searchIdx: newIdx });
        }
    }, {
        key: "handleSeniorSearch",
        value: function handleSeniorSearch(e) {
            /*if(this.state.preData == null){
                return;
            }
            this.setState({
                data:this.state.preData,
                searchIdx:"",
                preData:null
            })*/
            var s = !this.state.seniorSearch;
            this.setState({
                seniorSearch: s
            });
        }
    }, {
        key: "handleSubmit",
        value: function handleSubmit(e) {
            e.preventDefault();
            if (this.state.preData == null) {
                this.state.preData = this.state.data;
            }
            var oldData = this.state.preData;
            var searchData = oldData.filter(function (row) {
                var idx = this.state.searchIdx;
                return row.title.indexOf(idx) > -1 || row.auther.indexOf(idx) > -1;
            }, this);
            this.setState({ data: searchData });
        }
    }, {
        key: "changeSelectIdx",
        value: function changeSelectIdx(e) {
            this.setState({ selectIdx: e.target.value });
        }
    }, {
        key: "changeLow",
        value: function changeLow(e) {
            this.setState({ low: e.target.value });
        }
    }, {
        key: "changeHigh",
        value: function changeHigh(e) {
            this.setState({ high: e.target.value });
        }
    }, {
        key: "handleSelect",
        value: function handleSelect(e) {
            e.preventDefault();
            if (this.state.preData == null) {
                this.state.preData = this.state.data;
            }
            var oldData = this.state.preData;
            var selectData = null;
            var idx = this.state.selectIdx;
            var low = Number(this.state.low);
            var high = Number(this.state.high);

            if (idx === "price") {
                selectData = oldData.filter(function (row) {
                    return low <= Number(row.price) && Number(row.price) <= high;
                }, this);
            } else {
                selectData = oldData.filter(function (row) {
                    return low <= Number(row.publish) && Number(row.publish) <= high;
                }, this);
            }
            this.setState({ data: selectData });
        }
    }, {
        key: "clearSelect",
        value: function clearSelect(e) {
            if (this.state.preData == null) {
                return;
            }
            this.setState({
                low: 0,
                high: 9999,
                data: this.state.preData,
                preData: null
            });
        }
    }, {
        key: "renderSeniorSearch",
        value: function renderSeniorSearch() {
            if (this.state.seniorSearch) {
                return _react2.default.createElement(
                    "form",
                    { id: "f2", onSubmit: this.handleSelect },
                    _react2.default.createElement(
                        "select",
                        { value: this.state.selectIdx, onChange: this.changeSelectIdx },
                        _react2.default.createElement(
                            "option",
                            { value: "price" },
                            "Price"
                        ),
                        _react2.default.createElement(
                            "option",
                            { value: "publish" },
                            "Publish"
                        )
                    ),
                    _react2.default.createElement("input", { id: "min", type: "text", placeholder: "..", value: this.state.low,
                        onChange: this.changeLow }),
                    _react2.default.createElement(
                        "label",
                        null,
                        "~"
                    ),
                    _react2.default.createElement("input", { id: "max", type: "text", placeholder: "..", value: this.state.high,
                        onChange: this.changeHigh }),
                    _react2.default.createElement("input", { type: "submit", value: "OK" }),
                    _react2.default.createElement(
                        "button",
                        { onClick: this.clearSelect },
                        "Clear"
                    )
                );
            } else {
                return _react2.default.createElement("span", null);
            }
        }
    }, {
        key: "renderSearch",
        value: function renderSearch() {
            var senior = this.renderSeniorSearch();
            return _react2.default.createElement(
                "div",
                { className: "searchTool" },
                _react2.default.createElement(
                    "form",
                    { id: "f1", onSubmit: this.handleSubmit },
                    _react2.default.createElement("input", { id: "i1", type: "text", placeholder: "...", value: this.state.searchIdx,
                        onChange: this.handleChange }),
                    _react2.default.createElement("input", { id: "i2", type: "submit", value: "Search" }),
                    _react2.default.createElement(
                        "button",
                        { onClick: this.handleSeniorSearch },
                        this.state.seniorSearch ? "/\\" : "\\/"
                    )
                ),
                senior
            );
        }
    }, {
        key: "handleSort",
        value: function handleSort(e) {
            var idx = e.target.cellIndex;
            var attr = this.props.headers[idx];
            var desc = this.state.descending;
            var oldData = this.state.data;
            var sortData = oldData.sort(function (a, b) {
                return desc ? a[attr] < b[attr] : a[attr] > b[attr];
            }, this);
            desc = !desc;
            this.setState({
                data: sortData,
                descending: desc,
                sortIdx: idx
            });
        }
    }, {
        key: "addItem",
        value: function addItem(e) {
            var idx = parseInt(e.target.dataset.row, 10);
            var data = this.state.data;
            var item = data[idx];
            var cb = function cb(item) {
                _event2.default.emit("Add", item);
            };
            cb(item);
        }
    }, {
        key: "renderTable",
        value: function renderTable() {
            return _react2.default.createElement(
                "table",
                null,
                _react2.default.createElement(
                    "thead",
                    { onClick: this.handleSort },
                    _react2.default.createElement(
                        "tr",
                        null,
                        this.props.headers.map(function (header, idx) {
                            var temp = "";
                            if (this.state.sortIdx == idx) {
                                temp += this.state.descending ? " \u2191" : " \u2193";
                            }
                            return _react2.default.createElement(
                                "th",
                                { key: idx },
                                header,
                                temp
                            );
                        }, this)
                    )
                ),
                _react2.default.createElement(
                    "tbody",
                    null,
                    this.state.data.map(function (row, idx) {
                        if (this.state.category != row.category) {
                            return;
                        }
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
                                row.auther
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
                                row.publish
                            ),
                            _react2.default.createElement(
                                "td",
                                null,
                                _react2.default.createElement(
                                    "a",
                                    { "data-row": idx, href: "#", onClick: this.addItem },
                                    "Add"
                                )
                            )
                        );
                    }, this)
                )
            );
        }
    }, {
        key: "render",
        value: function render() {
            if (!this.state.load) {
                return _react2.default.createElement("div", null);
            }
            var cate = this.renderCategory();
            var table = this.renderTable();
            var search = this.renderSearch();
            return _react2.default.createElement(
                "div",
                { className: "BookTable" },
                cate,
                search,
                table
            );
        }
    }]);

    return BookTable;
}(_react2.default.Component);

exports.default = BookTable;