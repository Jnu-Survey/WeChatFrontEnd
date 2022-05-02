Object.defineProperty(exports, "__esModule", {
    value: !0
}), exports.fadeOut = exports.fadeIn = void 0;

var t = require("../@babel/runtime/helpers/defineProperty"), e = function() {
    var t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : 300, e = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : "ease";
    return wx.createAnimation({
        duration: t,
        timingFunction: e
    });
};

exports.fadeIn = function(o, a) {
    var i = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : "animationData", n = arguments.length > 3 && void 0 !== arguments[3] ? arguments[3] : 0, r = e(n).opacity(0).step();
    o.setData(t({}, i, r.export())), setTimeout(function() {
        o.setData(t({}, i, r.opacity(1).step().export()));
    }, a);
};

exports.fadeOut = function(o, a) {
    var i = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : "animationData", n = arguments.length > 3 && void 0 !== arguments[3] ? arguments[3] : 0, r = e(n).opacity(1).step();
    o.setData(t({}, i, r.export())), setTimeout(function() {
        o.setData(t({}, i, r.opacity(0).step().export()));
    }, a);
};