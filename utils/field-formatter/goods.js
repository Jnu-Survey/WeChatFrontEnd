Object.defineProperty(exports, "__esModule", {
    value: !0
}), exports.Goods = void 0;

var e = require("../../@babel/runtime/helpers/classCallCheck"), r = require("../../@babel/runtime/helpers/createClass"), i = require("../../@babel/runtime/helpers/inherits"), s = require("../../@babel/runtime/helpers/createSuper"), t = require("./basic-goods").BasicGoods, a = function(a) {
    i(o, t);
    var u = s(o);
    function o() {
        return e(this, o), u.apply(this, arguments);
    }
    return r(o, [ {
        key: "goodsImages",
        value: function(e) {
            var r = this, i = e[this.field.api_code];
            return this.itemsMap = this.itemsMap || this.buildItemsMap(this.field.goods_items), 
            i ? i.map(function(e) {
                return r.itemsMap[e.item].image_url;
            }) : [];
        }
    } ]), o;
}();

exports.Goods = a;