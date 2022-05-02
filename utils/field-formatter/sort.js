Object.defineProperty(exports, "__esModule", {
    value: !0
}), exports.Sort = void 0;

var e = require("../../@babel/runtime/helpers/classCallCheck"), r = require("../../@babel/runtime/helpers/createClass"), t = require("../../@babel/runtime/helpers/inherits"), n = require("../../@babel/runtime/helpers/createSuper"), i = require("./base").Base, u = function(u) {
    t(o, i);
    var a = n(o);
    function o() {
        return e(this, o), a.apply(this, arguments);
    }
    return r(o, [ {
        key: "formatToString",
        value: function(e) {
            var r = this, t = e[this.field.api_code].sort(function(e, r) {
                return e.rank - r.rank;
            }).map(function(e) {
                return r.field.choices.find(function(r) {
                    return r.value === e.choice;
                }).name;
            });
            return null === t ? "" : t;
        }
    }, {
        key: "format",
        value: function(e) {
            var r = this;
            return e[this.field.api_code].sort(function(e, r) {
                return e.rank - r.rank;
            }).map(function(e) {
                return r.field.choices.find(function(r) {
                    return r.value === e.choice;
                }).name;
            }) || [];
        }
    } ]), o;
}();

exports.Sort = u;