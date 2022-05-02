Object.defineProperty(exports, "__esModule", {
    value: !0
}), exports.Mobile = void 0;

var e = require("../../@babel/runtime/helpers/classCallCheck"), r = require("../../@babel/runtime/helpers/createClass"), i = require("../../@babel/runtime/helpers/inherits"), t = require("../../@babel/runtime/helpers/createSuper"), u = require("./base").Base, l = function(l) {
    i(a, u);
    var s = t(a);
    function a() {
        return e(this, a), s.apply(this, arguments);
    }
    return r(a, [ {
        key: "formatToString",
        value: function(e) {
            return e[this.field.api_code].value;
        }
    } ]), a;
}();

exports.Mobile = l;