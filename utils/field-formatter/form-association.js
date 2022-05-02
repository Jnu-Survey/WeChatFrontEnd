Object.defineProperty(exports, "__esModule", {
    value: !0
}), exports.FormAssociation = void 0;

var e = require("../../@babel/runtime/helpers/classCallCheck"), r = require("../../@babel/runtime/helpers/createClass"), i = require("../../@babel/runtime/helpers/inherits"), t = require("../../@babel/runtime/helpers/createSuper"), s = require("./base").Base, a = function(a) {
    i(u, s);
    var n = t(u);
    function u() {
        return e(this, u), n.apply(this, arguments);
    }
    return r(u, [ {
        key: "formatToString",
        value: function(e) {
            var r = e[this.field.api_code];
            return r && r.name ? r.name : "";
        }
    } ]), u;
}();

exports.FormAssociation = a;