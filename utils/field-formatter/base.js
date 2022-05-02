Object.defineProperty(exports, "__esModule", {
    value: !0
}), exports.Base = void 0;

var e = require("../../@babel/runtime/helpers/defineProperty"), r = require("../../@babel/runtime/helpers/objectSpread2"), t = require("../../@babel/runtime/helpers/classCallCheck"), i = require("../../@babel/runtime/helpers/createClass"), u = function() {
    function u(e) {
        t(this, u), this.field = e;
    }
    return i(u, [ {
        key: "formatToString",
        value: function(e) {
            return e[this.field.api_code];
        }
    }, {
        key: "format",
        value: function(e) {
            return this.formatToString(e);
        }
    }, {
        key: "arrayToMap",
        value: function(t) {
            return t.reduce(function(t, i) {
                return r(r({}, t), {}, e({}, i.value, i.name));
            }, {});
        }
    } ]), u;
}();

exports.Base = u;