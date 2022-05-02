Object.defineProperty(exports, "__esModule", {
    value: !0
}), exports.toggleOut = exports.toggleIn = void 0;

var t = require("../@babel/runtime/helpers/defineProperty"), e = function() {
    var t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : 300, e = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : "ease";
    return wx.createAnimation({
        duration: t,
        timingFunction: e
    });
};

exports.toggleIn = function(a, o, n) {
    var r = arguments.length > 3 && void 0 !== arguments[3] ? arguments[3] : "animationData", i = e(0).opacity(0).step();
    a.setData(t({}, r, i.export())), i = e(o).translateY(n).step(), a.setData(t({}, r, i.export())), 
    setTimeout(function() {
        a.setData(t({}, r, i.opacity(1).translateY(0).step().export()));
    }, o);
};

exports.toggleOut = function(a, o, n) {
    var r = arguments.length > 3 && void 0 !== arguments[3] ? arguments[3] : "animationData", i = e(0).opacity(1).step();
    a.setData(t({}, r, i.export())), i = e(o).translateY(0).step(), a.setData(t({}, r, i.export())), 
    setTimeout(function() {
        a.setData(t({}, r, i.opacity(1).translateY(n).step().export()));
    }, o);
};