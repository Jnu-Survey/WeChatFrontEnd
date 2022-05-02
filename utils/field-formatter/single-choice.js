Object.defineProperty(exports, "__esModule", {
    value: !0
}), exports.SingleChoice = void 0;

var e = require("../../@babel/runtime/helpers/classCallCheck"), r = require("../../@babel/runtime/helpers/createClass"), i = require("../../@babel/runtime/helpers/inherits"), t = require("../../@babel/runtime/helpers/createSuper"), l = require("./drop-down").DropDown, n = function(n) {
    i(a, l);
    var u = t(a);
    function a() {
        return e(this, a), u.apply(this, arguments);
    }
    return r(a, [ {
        key: "format",
        value: function(e) {
            var r = this.selectedChoice(e);
            return r ? {
                name: r.name,
                imageUrl: r.image_url
            } : {};
        }
    } ]), a;
}();

exports.SingleChoice = n;