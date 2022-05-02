Object.defineProperty(exports, "__esModule", {
    value: !0
}), exports.DropDown = void 0;

var e = require("../../@babel/runtime/helpers/classCallCheck"), r = require("../../@babel/runtime/helpers/createClass"), t = require("../../@babel/runtime/helpers/inherits"), i = require("../../@babel/runtime/helpers/createSuper"), n = require("./base").Base, u = function(u) {
    t(s, n);
    var l = i(s);
    function s() {
        return e(this, s), l.apply(this, arguments);
    }
    return r(s, [ {
        key: "selectedChoice",
        value: function(e) {
            var r = this, t = this.field.choices.filter(function(t) {
                return t.value == e[r.field.api_code];
            });
            return t.length ? t[0] : null;
        }
    }, {
        key: "formatToString",
        value: function(e) {
            var r = this.selectedChoice(e);
            return r ? r.name : "";
        }
    } ]), s;
}();

exports.DropDown = u;