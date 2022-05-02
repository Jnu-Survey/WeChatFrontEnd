Object.defineProperty(exports, "__esModule", {
    value: !0
}), exports.Address = void 0;

var e = require("../../@babel/runtime/helpers/classCallCheck"), r = require("../../@babel/runtime/helpers/createClass"), t = require("../../@babel/runtime/helpers/inherits"), i = require("../../@babel/runtime/helpers/createSuper"), s = require("./base").Base, a = function(a) {
    t(n, s);
    var c = i(n);
    function n() {
        return e(this, n), c.apply(this, arguments);
    }
    return r(n, [ {
        key: "formatToString",
        value: function(e) {
            var r = e[this.field.api_code];
            return r ? "".concat(r.province || "", " ").concat(r.city || "", " ").concat(r.district || "", " ").concat(r.street || "") : "";
        }
    } ]), n;
}();

exports.Address = a;