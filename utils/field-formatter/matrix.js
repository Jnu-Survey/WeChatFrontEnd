Object.defineProperty(exports, "__esModule", {
    value: !0
}), exports.Matrix = void 0;

var e = require("../../@babel/runtime/helpers/defineProperty"), t = require("../../@babel/runtime/helpers/objectSpread2"), r = require("../../@babel/runtime/helpers/classCallCheck"), i = require("../../@babel/runtime/helpers/createClass"), n = require("../../@babel/runtime/helpers/inherits"), a = require("../../@babel/runtime/helpers/createSuper"), s = require("./base").Base, u = function(u) {
    n(p, s);
    var o = a(p);
    function p() {
        return r(this, p), o.apply(this, arguments);
    }
    return i(p, [ {
        key: "formatToString",
        value: function(r) {
            var i = this, n = r[this.field.api_code];
            return this.statementMap = this.statementMap || this.arrayToMap(this.field.statements), 
            this.dimensionMap = this.dimensionMap || this.field.dimensions.reduce(function(r, i) {
                return t(t({}, r), {}, e({}, i.value, i.name));
            }, {}), n ? n.map(function(e) {
                var t = i.statementMap[e.statement], r = Object.keys(e.dimensions).map(function(t) {
                    return "".concat(i.dimensionMap[t], ": ").concat(e.dimensions[t]);
                });
                return "".concat(t, ": (").concat(r.join(", "), ")");
            }) : [];
        }
    } ]), p;
}();

exports.Matrix = u;