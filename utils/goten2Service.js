var e = require("../@babel/runtime/helpers/interopRequireWildcard");

Object.defineProperty(exports, "__esModule", {
    value: !0
}), exports.getDecodeUrlWithToken = exports.generateUrlWithToken = exports.generateGoten2Url = void 0;

var t = e(require("./apis/env")), o = require("./storage"), n = require("./storage-events");

exports.generateGoten2Url = function(e) {
    var r = t.env.goten2HostDomain + e, c = (0, o.getStorage)(n.TOKEN);
    return encodeURIComponent("".concat(r, "?token=").concat(c, "&host=miniapp&timestamp=").concat(Date.now()));
};

exports.generateUrlWithToken = function(e, t) {
    var r = (0, o.getStorage)(n.TOKEN), c = "";
    if (t) for (var a in t) c += "&".concat(a, "=").concat(t[a]);
    return console.log("".concat(e, "?m_t=").concat(r).concat(c)), encodeURIComponent("".concat(e, "?m_t=").concat(r).concat(c));
};

exports.getDecodeUrlWithToken = function(e) {
    var t = (0, o.getStorage)(n.TOKEN);
    return "".concat(e, "?m_t=").concat(t);
};