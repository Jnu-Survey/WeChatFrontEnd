Object.defineProperty(exports, "__esModule", {
    value: !0
}), exports.GeoLocation = void 0;

var e = require("../../@babel/runtime/helpers/classCallCheck"), r = require("../../@babel/runtime/helpers/createClass"), t = require("../../@babel/runtime/helpers/inherits"), i = require("../../@babel/runtime/helpers/createSuper"), a = require("./base").Base, u = function(u) {
    t(l, a);
    var s = i(l);
    function l() {
        return e(this, l), s.apply(this, arguments);
    }
    return r(l, [ {
        key: "formatToString",
        value: function(e) {
            var r = e[this.field.api_code];
            return r && r.latitude && r.longitude ? r.address || "纬度:" + r.latitude + "; 经度:" + r.longitude : "";
        }
    } ]), l;
}();

exports.GeoLocation = u;