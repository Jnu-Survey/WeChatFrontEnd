Object.defineProperty(exports, "__esModule", {
    value: !0
}), exports.navigateToPageWithAuth = exports.navigateToPage = void 0, require("../@babel/runtime/helpers/Arrayincludes");

var e = require("../@babel/runtime/helpers/slicedToArray"), r = require("./queryString"), i = require("./auth"), t = require("./routeMap"), a = [ "/pages/template-home/index", "/pages/index/index", "/pages/create-template/index", "/pages/entries/index", "/pages/profile/show" ], n = function(i) {
    var t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {}, n = arguments.length > 2 ? arguments[2] : void 0, o = (0, 
    r.parseUrl)(i), s = e(o, 2), g = s[0], l = s[1], u = Object.assign(l, t), p = (0, 
    r.stringifyUrl)(g, u);
    a.includes(g) ? wx.switchTab({
        url: p
    }) : n ? wx.redirectTo({
        url: p
    }) : wx.navigateTo({
        url: p
    });
};

exports.navigateToPage = n;

exports.navigateToPageWithAuth = function(e) {
    var a = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {};
    if ((0, i.isLogin)()) n(e, a); else {
        var o = encodeURIComponent((0, r.stringifyUrl)(e, a));
        n(t.PAGE_LOGIN_URL, {
            _from: o
        }, !0);
    }
};