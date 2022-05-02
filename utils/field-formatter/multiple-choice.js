Object.defineProperty(exports, "__esModule", {
    value: !0
}), exports.MultipleChoice = void 0;

var e = require("../../@babel/runtime/helpers/classCallCheck"), r = require("../../@babel/runtime/helpers/createClass"), t = require("../../@babel/runtime/helpers/inherits"), i = require("../../@babel/runtime/helpers/createSuper"), n = require("./base").Base, u = function(u) {
    t(a, n);
    var l = i(a);
    function a() {
        return e(this, a), l.apply(this, arguments);
    }
    return r(a, [ {
        key: "formatSelectedChoices",
        value: function(e, r) {
            var t = this, i = this.field.choices.filter(function(r) {
                return e[t.field.api_code].indexOf(r.value) >= 0;
            });
            return i.length ? i.map(r) : null;
        }
    }, {
        key: "formatToString",
        value: function(e) {
            var r = this.formatSelectedChoices(e, function(e) {
                return e.name;
            });
            return null === r ? "" : r.join(", ");
        }
    }, {
        key: "format",
        value: function(e) {
            return this.formatSelectedChoices(e, function(e) {
                return {
                    name: e.name,
                    imageUrl: e.image_url
                };
            }) || [];
        }
    } ]), a;
}();

exports.MultipleChoice = u;