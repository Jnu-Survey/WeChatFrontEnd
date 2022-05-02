Object.defineProperty(exports, "__esModule", {
    value: !0
}), exports.ParagraphText = void 0;

var e = require("../../@babel/runtime/helpers/classCallCheck"), r = require("../../@babel/runtime/helpers/createClass"), t = require("../../@babel/runtime/helpers/inherits"), a = require("../../@babel/runtime/helpers/createSuper"), i = require("./base").Base, s = function(s) {
    t(l, i);
    var u = a(l);
    function l() {
        return e(this, l), u.apply(this, arguments);
    }
    return r(l, [ {
        key: "formatToString",
        value: function(e) {
            var r = e[this.field.api_code];
            return r ? r.replace(/\n+/, "\n") : "";
        }
    } ]), l;
}();

exports.ParagraphText = s;