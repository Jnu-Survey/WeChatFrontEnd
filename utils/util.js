var e = require("../@babel/runtime/helpers/interopRequireDefault"), t = require("../@babel/runtime/helpers/interopRequireWildcard");

Object.defineProperty(exports, "__esModule", {
    value: !0
}), exports.alert = function(e) {
    wx.showModal({
        title: "",
        content: e,
        showCancel: !1
    });
}, exports.bindSystemInfo = function(e) {
    var t = wx.getSystemInfoSync();
    e.setData({
        wxSystemInfo: t
    });
}, exports.checkValidationExist = function(e) {
    return m.every(function(t) {
        return t == e;
    });
}, exports.debounce = exports.clearUserStorage = void 0, exports.extractNextPage = function(e) {
    if (!e.Link) return null;
    var t = e.Link.split(",").find(function(e) {
        return e.match(/.*rel=.next./);
    });
    if (!t) return null;
    var r = t.match(/<(.*)>/);
    return r ? r[1] : null;
}, exports.formatTime = function(e) {
    var t = e.getFullYear(), r = e.getMonth() + 1, n = e.getDate(), o = e.getHours(), i = e.getMinutes(), a = e.getSeconds();
    return [ t, r, n ].map(d).join("-") + " " + [ o, i, a ].map(d).join(":");
}, exports.getLinkFrom = function(e, t) {
    var r = e.link || e.Link || "";
    if (!r) return "";
    var n = r.split(/,\s*</).filter(function(e) {
        return new RegExp('rel="'.concat(t, '"')).test(e);
    }).pop();
    if (!n) return "";
    return n.split(";")[0].replace(/[<>]/g, "");
}, exports.gotoEditor = function(e, t) {
    g().then(function(r) {
        r ? (wx.showLoading(), n.getEditorUrl(e || !1, function(e) {
            wx.hideLoading(), (0, s.navigateToPage)("/pages/web-view/webview", {
                url: encodeURIComponent(t ? "".concat(e.data.url, "&scene=").concat(t) : e.data.url)
            });
        })) : (0, s.navigateToPage)("/pages/forms/create/create", e ? {
            token: e,
            isEdit: !0
        } : {});
    });
}, exports.gotoEditor4NewLogin = function(e, t) {
    g().then(function(r) {
        r ? n.getEditorUrl(e || !1, function(e) {
            var r = encodeURIComponent(t ? "".concat(e.data.url, "&scene=").concat(t) : e.data.url);
            (0, s.navigateToPage)(u.PAGE_HTML5_URL, {
                redirect_url: r
            });
        }) : (0, s.navigateToPageWithAuth)("/pages/forms/create/create", e ? {
            token: e,
            isEdit: !0
        } : {});
    });
}, exports.hasAnyForm = function(e) {
    var t = !!e.cooperated_forms_count || !!e.created_forms_count;
    return (0, o.setStorage)(i.ISNEW, !t), t;
}, exports.humanDate = function(e) {
    var t = x(e);
    if (x(new Date()) == t) return "今天";
    return x(new Date(new Date().setDate(new Date().getDate() - 1))) == t ? "昨天" : t;
}, exports.isEmptyObj = function(e) {
    if ("{}" === JSON.stringify(e)) return !0;
    return !1;
}, exports.isEnableEditor = g, exports.isFullScreen = function() {
    return new Promise(function(e, t) {
        wx.getSystemInfo({
            success: function(t) {
                t.model.includes("iPhone X") ? e(!0) : e(!1);
            }
        });
    });
}, exports.isIOS = void 0, exports.isManager = function(e, t) {
    !e || [ "manager" ].indexOf(e) > -1 ? t && t() : wx.showToast({
        title: "无操作权限",
        icon: "none"
    });
}, exports.isValidCodeVerifyUrl = exports.isMobileEditor = void 0, exports.navigateByUser = function(e) {
    wx.switchTab({
        url: "/pages/template-home/index"
    });
}, exports.navigateWithUser = exports.navigateWithAuth = exports.navigateUserWelfarePage = void 0, 
exports.overQuota = v, exports.parseQueryUrl = void 0, exports.processFormFields = function(e) {
    e.forEach(function(e) {
        e.notes && (e.notes = (e.notes || "").replace(/<(?:.|\n)*?>/gm, "")), "drop_down" === e.type && e.choices.unshift({
            name: "请选择",
            value: void 0,
            hidden: !1
        });
    });
}, exports.purchaseToggle = exports.promisify = void 0, exports.quotaNotEnoughFullMsg = function(e, t) {
    var r = "ent2" === t.code ? "请前往网页版充值！" : "请立即升级！", n = v(e, "entry"), o = v(e, "storage"), i = "";
    n && !o ? i = "当前数据提交量已用完，所有表单已停止收集，为避免你的业务受到影响，" + r : !n && o ? i = "当前文件上传量已用完，表单附件将无法上传，为避免你的业务受到影响，" + r : n && o && (i = "数据提交量、文件上传量已用完，为避免你的业务受到影响，" + r);
    return i;
}, exports.quotaNotEnoughMsg = function(e, t) {
    var r = "ent2" === t.code ? "请前往网页版充值！" : "请升级！", n = v(e, "entry"), o = v(e, "storage"), i = "";
    n && !o ? i = "本月你的数据已超过免费用量，升级后即可查看超出部分的数据，" + r : !n && o ? i = "文件上传量已用完，附件无法上传，" + r : n && o && (i = "数据提交量、文件上传量已用完，" + r);
    return i;
}, exports.subscribeMessage = exports.subString = exports.splitString = exports.shuffle = exports.randomFromArray = void 0, 
exports.syncUserInfo = function(e, t) {
    if (!e) return;
    for (var r in f) e[r] = t[f[r]];
    (0, o.setStorage)(i.USERINFO, e);
}, exports.updateGdUserInfo = function(e) {
    e && (0, o.setStorage)(i.GD_USERINFO, e);
    return Promise.resolve();
}, exports.validationsMap = function(e) {
    if (h[e]) return h[e];
    return null;
}, require("../@babel/runtime/helpers/Arrayincludes");

var r = require("../@babel/runtime/helpers/slicedToArray"), n = t(require("./../utils/apis/form")), o = require("./storage"), i = require("./storage-events"), a = require("./userState"), s = require("../core/navigate"), u = require("../core/routeMap"), c = require("../core/queryString"), p = e(require("./apis/env")), l = require("../utils/userState"), f = {
    nickName: "nickname",
    avatarUrl: "avatar"
};

function g() {
    return new Promise(function(e, t) {
        (0, a.invokeUserInfo)().then(function(t) {
            e(t.toggles && t.toggles.enable_fe_form_design);
        }).catch(function() {
            e(!1);
        });
    });
}

function d(e) {
    return (e = e.toString())[1] ? e : "0" + e;
}

function x(e) {
    var t = e.getMonth() + 1, r = e.getDate();
    return [ e.getFullYear(), (t > 9 ? "" : "0") + t, (r > 9 ? "" : "0") + r ].join("-");
}

function v(e, t) {
    var r = e[t];
    return r.usage >= r.total;
}

var m = [ "required" ], h = {
    required: "presence"
};

exports.isIOS = function(e) {
    var t = wx.getSystemInfoSync();
    e.setData({
        isIOS: "ios" === t.platform
    });
};

exports.debounce = function(e, t) {
    var r, n = t || 1e3;
    return function() {
        clearTimeout(r);
        var t = this, o = arguments;
        r = setTimeout(function() {
            e.apply(t, o);
        }, n);
    };
};

exports.subString = function(e, t) {
    return e ? e.length < t ? e : e.substring(0, t) + "..." : "";
};

exports.purchaseToggle = function() {
    return "ios" !== wx.getSystemInfoSync().platform;
};

exports.promisify = function(e) {
    return function(t) {
        for (var r = arguments.length, n = new Array(r > 1 ? r - 1 : 0), o = 1; o < r; o++) n[o - 1] = arguments[o];
        return new Promise(function(r, o) {
            e.apply(void 0, [ Object.assign({}, t, {
                success: r,
                fail: o
            }) ].concat(n));
        });
    };
};

exports.randomFromArray = function(e) {
    return e && e[Math.floor(Math.random() * e.length)];
};

exports.shuffle = function(e) {
    for (var t, r, n = e.length; 0 !== n; ) r = Math.floor(Math.random() * n), t = e[n -= 1], 
    e[n] = e[r], e[r] = t;
    return e;
};

exports.parseQueryUrl = function(e) {
    for (var t = e.slice(e.indexOf("?") + 1), n = t ? t.split("&") : [], o = {}, i = 0; i < n.length; ++i) {
        var a = n[i].split("="), s = r(a, 2), u = s[0], c = s[1];
        o[u] = o[u] || decodeURIComponent(c);
    }
    return o;
};

var w = function(e) {
    return e.indexOf("mobile/forms") > -1;
};

exports.isMobileEditor = w;

var S = [ "/pages/index/index", "/pages/create-template/index", "/pages/entries/index", "/pages/profile/show" ], b = [ "/pages/template-home/index", "/pages/index/index", "/pages/create-template/index", "/pages/entries/index", "/pages/profile/show" ], y = function(e, t) {
    if (e = e || "/pages/template-home/index", b.includes(e)) wx.switchTab({
        url: e
    }); else {
        if (e && e.indexOf("/pages/web-view/webview") > -1 && t) {
            t = decodeURIComponent(t).split("?")[0];
            var r = (0, o.getStorage)(i.TOKEN);
            if (w(t)) return void n.getAccessToken(function(n) {
                r = n.data.t, e = e + "?url=" + encodeURIComponent("".concat(t, "?t=").concat(r)), 
                wx.navigateTo({
                    url: e
                });
            });
            e = e + "?url=" + encodeURIComponent(t + "?m_t=" + r);
        }
        wx.navigateTo({
            url: e
        });
    }
};

exports.navigateWithUser = y;

exports.navigateWithAuth = function(e, t) {
    S.includes(e) && !(0, o.getStorage)(i.TOKEN) ? (t = t ? "&webview=".concat(t) : "", 
    wx.reLaunch({
        url: "/pages/welcome/show?redirectUrl=".concat(e).concat(t)
    })) : y(e);
};

exports.splitString = function(e, t) {
    return e.replace(new RegExp("".concat(t), "g"), "%%".concat(t, "%%")).split("%%");
};

exports.isValidCodeVerifyUrl = function(e) {
    return e.startsWith("".concat(p.default.env.goldendataDomain, "miniapp/verification_code"));
};

exports.navigateUserWelfarePage = function() {
    var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {}, t = "".concat(p.default.env.templatesCenterUrl, "user_welfare");
    if (!e.user) {
        var r = (0, l.getCurrentUserInfo)();
        r.persuade_to_stay && (e.user = "old");
    }
    var n = (0, c.stringifyUrl)(t, e), o = (0, c.stringifyUrl)(u.PAGE_HTML5_URL, {
        redirect_url: encodeURIComponent(n),
        auth: "v2"
    });
    (0, s.navigateToPageWithAuth)(o);
};

exports.subscribeMessage = function(e) {
    var t = getApp();
    wx.getSetting({
        withSubscriptions: !0,
        success: function(r) {
            r.subscriptionsSetting.mainSwitch ? wx.requestSubscribeMessage({
                tmplIds: t.config.subscribeMessageIds,
                success: function() {
                    e(!0);
                },
                fail: function() {
                    e();
                }
            }) : (wx.showToast({
                title: "订阅消息未开启, 请在小程序设置页面打开消息通知！",
                duration: 3e3,
                icon: "none"
            }), e(!1));
        },
        fail: function() {
            e();
        }
    });
};

exports.clearUserStorage = function() {
    var e = (0, o.getStorage)(i.READ_AGREEMENT);
    wx.clearStorageSync(), e && (0, o.setStorage)(i.READ_AGREEMENT, !0);
};