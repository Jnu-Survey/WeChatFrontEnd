Object.defineProperty(exports, "__esModule", {
    value: !0
}), exports.mustLogin = exports.isLogin = void 0;

var e = require("../utils/storage"), r = require("../utils/storage-events"), t = require("./route"), i = require("./navigate"), o = require("./routeMap"), u = function() {
    return !!(0, e.getStorage)(r.GD_USERINFO);
};

exports.isLogin = u;

exports.mustLogin = function(e, r) {
    if (u()) e && e(); else {
        r && r();
        var s = encodeURIComponent("/" + (0, t.getCurrentPageUrlWithQuery)());
        (0, i.navigateToPage)(o.PAGE_LOGIN_URL, {
            redirect_url: s
        }, !0);
    }
};