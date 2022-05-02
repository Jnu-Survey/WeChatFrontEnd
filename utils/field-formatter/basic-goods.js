Object.defineProperty(exports, "__esModule", {
    value: !0
}), exports.BasicGoods = void 0;

var e = require("../../@babel/runtime/helpers/defineProperty"), i = require("../../@babel/runtime/helpers/objectSpread2"), r = require("../../@babel/runtime/helpers/classCallCheck"), t = require("../../@babel/runtime/helpers/createClass"), n = require("../../@babel/runtime/helpers/inherits"), s = require("../../@babel/runtime/helpers/createSuper"), u = require("./base").Base, a = function(a) {
    n(l, u);
    var o = s(l);
    function l() {
        return r(this, l), o.apply(this, arguments);
    }
    return t(l, [ {
        key: "buildItemsMap",
        value: function(r) {
            var t = this;
            return r.reduce(function(r, n) {
                return i(i({}, r), {}, e({}, n.api_code, {
                    name: n.name,
                    image_url: n.image_url,
                    dimensions: t.buildDimensionsMap(n)
                }));
            }, {});
        }
    }, {
        key: "buildDimensionsMap",
        value: function(r) {
            return (r.dimensions || []).reduce(function(r, t) {
                return i(i({}, r), {}, e({}, t.api_code, {
                    label: t.label,
                    options: t.options.reduce(function(r, t) {
                        return i(i({}, r), {}, e({}, t.value, t.label));
                    }, {})
                }));
            }, {});
        }
    }, {
        key: "formatToString",
        value: function(e) {
            var i = this, r = e[this.field.api_code];
            return this.itemsMap = this.itemsMap || this.buildItemsMap(this.field.goods_items), 
            r ? r.filter(function(e) {
                return i.itemsMap[e.item];
            }).map(function(e) {
                var r = i.itemsMap[e.item], t = r.name;
                return e.spec && (t += "(".concat(Object.keys(e.spec).map(function(i) {
                    return r.dimensions[i].options[e.spec[i]];
                }).join("、"), ")")), "".concat(t, ": ").concat(e.number);
            }) : "";
        }
    } ]), l;
}();

exports.BasicGoods = a;