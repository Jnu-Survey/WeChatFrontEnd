var e = require("./storage"), o = require("./storage-events"), t = getApp();

function n(n) {
    var i = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : "GET", a = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : {}, r = arguments.length > 3 && void 0 !== arguments[3] ? arguments[3] : null, u = arguments.length > 4 && void 0 !== arguments[4] ? arguments[4] : null, l = arguments.length > 5 && void 0 !== arguments[5] ? arguments[5] : null, c = arguments.length > 6 && void 0 !== arguments[6] ? arguments[6] : null;
    wx.request({
        url: getApp().config.baseUrl + n,
        header: {
            gdsession: (0, e.getStorage)(o.GD_SESSEION),
            Authorization: (0, e.getStorage)(o.TOKEN)
        },
        method: i || "GET",
        data: a || {},
        success: function(e) {
            var o = 1500;
            if (401 === e.statusCode) t.PubSub.publish("gd.fetch.error"), wx.showModal({
                title: "提示",
                content: e.data.errors && e.data.errors.join("，"),
                confirmText: "重新登录",
                showCancel: !1,
                success: function(e) {
                    e.confirm && (wx.removeStorage({
                        key: "signupData"
                    }), wx.removeStorage({
                        key: "loginFinished"
                    }), wx.redirectTo({
                        url: "/pages/welcome/show"
                    }));
                }
            }); else if (e.statusCode >= 400) {
                var n = null;
                if (404 === e.statusCode && (n = "你访问的资源不存在"), 429 === e.statusCode && (n = "服务器忙，请稍后重试"), 
                403 === e.statusCode && (o = 4e3, n = e.data.errors && e.data.errors.join("，"), 
                "form_forbidden" !== e.data.status_code && s()), wx.hideLoading(), wx.hideToast(), 
                c && (n = c(n || e.data.errors && e.data.errors.join("，"))), l) return void l.call(this, e);
                wx.showToast({
                    title: n || e.data.errors && e.data.errors.join("，"),
                    icon: "none",
                    duration: o
                });
            } else r && r.call(this, e);
        },
        complete: function(e) {
            u && u.call(this, e);
        },
        fail: function(e) {
            console.log("wx request fail");
        }
    });
}

function s() {
    wx.removeStorage({
        key: "signupData"
    }), wx.removeStorage({
        key: "loginFinished"
    }), wx.navigateTo({
        url: "/pages/welcome/show"
    });
}

function i(n) {
    t.globalData.refrechingSession || (t.globalData.refrechingSession = !0, wx.showToast({
        title: "加载中...",
        icon: "loading",
        duration: 1e4,
        mask: !0
    }), wx.login({
        success: function(s) {
            wx.request({
                url: t.config.baseUrl + "v2/weixin_app/session_keys",
                data: {
                    code: s.code
                },
                complete: function(s) {
                    t.globalData.refrechingSession = !1, wx.hideToast(), s.statusCode >= 400 || "request:ok" !== s.errMsg ? wx.showToast({
                        title: "登录失败" + s.errMsg
                    }) : ((0, e.setStorage)(o.OPENID, s.data.openid), (0, e.setStorage)(o.GD_SESSEION, s.data.gd_session), 
                    n && n.call(this, s));
                }
            });
        }
    }));
}

module.exports = {
    verify: function(t, n) {
        wx.checkSession({
            success: function() {
                0 !== (0, e.getStorage)(o.GD_SESSEION).length && (0, e.getStorage)(o.LONGIN_FINISHED) ? t.call() : i(n);
            },
            fail: function(e) {
                i(n);
            }
        });
    },
    fetch: i,
    getExistedUserInfo: function(e, o, t) {
        n("v2/weixin_app/signup", "POST", e, o, t);
    },
    signUp: function(e, o) {
        wx.showToast({
            title: "登录中...",
            icon: "loading",
            duration: 1e4,
            mask: !0
        }), n("v2/weixin_app/signup/new", "GET", e, function(e) {
            o && o.call(this, e);
        }, function(e) {
            wx.hideToast();
        });
    },
    signIn: function(e, o) {
        n("v2/weixin_app/signin", "POST", e, o);
    },
    isSignUp: function(e) {
        n("v2/weixin_app/signup/new", "GET", null, function(o) {
            e && e.call(this, o);
        });
    },
    request: n,
    requestThen: function(n) {
        var s = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : "GET", i = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : {};
        return new Promise(function(a, r) {
            wx.request({
                url: getApp().config.baseUrl + n,
                header: {
                    gdsession: (0, e.getStorage)(o.GD_SESSEION),
                    Authorization: (0, e.getStorage)(o.TOKEN)
                },
                method: s || "GET",
                data: i || {},
                success: function(e) {
                    if (401 === e.statusCode) t.PubSub.publish("gd.fetch.error"), wx.showModal({
                        title: "登录过期",
                        confirmText: "重新登录",
                        showCancel: !1,
                        success: function(e) {
                            e.confirm && (wx.removeStorage({
                                key: "signupData"
                            }), wx.removeStorage({
                                key: "loginFinished"
                            }), wx.navigateTo({
                                url: "/pages/welcome/show"
                            }));
                        }
                    }); else if (e.statusCode >= 400) {
                        var o = null;
                        404 === e.statusCode && (o = "你访问的资源不存在"), wx.hideLoading(), wx.hideToast(), wx.showToast({
                            title: o || e.data.errors && e.data.errors.join("，"),
                            icon: "none",
                            duration: 1500,
                            success: function() {
                                r(e);
                            }
                        });
                    } else a(e);
                },
                fail: function(e) {
                    r(e);
                }
            });
        });
    },
    requestTemplateApi: function(n) {
        var s = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : "GET", i = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : {};
        return new Promise(function(a, r) {
            wx.request({
                url: getApp().config.rubickDomain + n,
                header: {
                    gdsession: (0, e.getStorage)(o.GD_SESSEION),
                    Authorization: (0, e.getStorage)(o.TOKEN)
                },
                method: s,
                data: i || {},
                success: function(e) {
                    if (401 === e.statusCode) t.PubSub.publish("gd.fetch.error"), wx.showModal({
                        title: "登录过期",
                        confirmText: "重新登录",
                        showCancel: !1,
                        success: function(e) {
                            e.confirm && (wx.removeStorage({
                                key: "signupData"
                            }), wx.removeStorage({
                                key: "loginFinished"
                            }), wx.navigateTo({
                                url: "/pages/welcome/show"
                            }));
                        }
                    }); else if (e.statusCode >= 400) {
                        var o = null;
                        404 === e.statusCode && (o = "你访问的资源不存在"), wx.hideLoading(), wx.hideToast(), wx.showToast({
                            title: o || e.data.errors && e.data.errors.join("，"),
                            icon: "none",
                            duration: 1500,
                            success: function() {
                                r(e);
                            }
                        });
                    } else a(e);
                },
                fail: function(e) {
                    r(e);
                }
            });
        });
    }
};