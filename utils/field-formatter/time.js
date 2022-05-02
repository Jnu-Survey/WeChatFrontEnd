Object.defineProperty(exports, "__esModule", {
    value: !0
}), exports.Time = void 0;

var e = require("../../@babel/runtime/helpers/classCallCheck"), r = require("../../@babel/runtime/helpers/createClass"), t = require("../../@babel/runtime/helpers/inherits"), n = require("../../@babel/runtime/helpers/createSuper"), a = require("./base").Base, i = function(i) {
    t(c, a);
    var u = n(c);
    function c() {
        var r;
        e(this, c);
        for (var t = arguments.length, n = new Array(t), a = 0; a < t; a++) n[a] = arguments[a];
        return (r = u.call.apply(u, [ this ].concat(n))).pad = function(e) {
            return e < 10 ? "0".concat(e) : e;
        }, r;
    }
    return r(c, [ {
        key: "formatToString",
        value: function(e) {
            var r = e[this.field.api_code];
            if (r) {
                var t = Number.isInteger(r.hour) ? this.pad(r.hour) : "", n = Number.isInteger(r.minute) ? ":".concat(this.pad(r.minute)) : "", a = Number.isInteger(r.second) ? ":".concat(this.pad(r.second)) : "";
                return "".concat(t).concat(n).concat(a);
            }
            return "";
        }
    } ]), c;
}();

exports.Time = i;