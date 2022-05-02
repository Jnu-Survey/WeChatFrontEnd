Object.defineProperty(exports, "__esModule", {
    value: !0
}), exports.CascadeDropDown = void 0;

var e = require("../../@babel/runtime/helpers/defineProperty"), r = require("../../@babel/runtime/helpers/objectSpread2"), a = require("../../@babel/runtime/helpers/classCallCheck"), t = require("../../@babel/runtime/helpers/createClass"), i = require("../../@babel/runtime/helpers/inherits"), s = require("../../@babel/runtime/helpers/createSuper"), n = require("./base").Base, u = function(u) {
    i(c, n);
    var l = s(c);
    function c() {
        return a(this, c), l.apply(this, arguments);
    }
    return t(c, [ {
        key: "translateToMap",
        value: function(a) {
            var t = this;
            return a.reduce(function(a, i) {
                var s = i.sub_choices ? {
                    subChoices: t.translateToMap(i.sub_choices)
                } : {};
                return r(r({}, a), {}, e({}, i.value, r({
                    name: i.name
                }, s)));
            }, {});
        }
    }, {
        key: "formatToString",
        value: function(e) {
            var r = e[this.field.api_code];
            if (this.choicesMap = this.choicesMap || this.translateToMap(this.field.choices), 
            r && r.level_1 && r.level_2) {
                var a = this.choicesMap[r.level_1];
                return a ? "".concat(a.name, "-").concat(a.subChoices[r.level_2].name) : "";
            }
            return "";
        }
    } ]), c;
}();

exports.CascadeDropDown = u;