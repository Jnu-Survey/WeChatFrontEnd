var e = require("../storage"), n = require("../storage-events"), r = require("../session"), t = require("../apis/env").env;

function i() {
    return new Promise(function(e, n) {
        r.request("v2/me", "GET", {}, e, n);
    });
}

var o = function() {
    return new Promise(function(e, n) {
        i().then(function(n) {
            n.data && (n.data.mobile || e(!1), e(!0)), e(!1);
        });
    });
};

module.exports = {
    me: i,
    userIdentity: function() {
        return new Promise(function(e) {
            r.request("v2/user_identity", "GET", {}, e);
        });
    },
    stats: function() {
        return new Promise(function(e) {
            r.request("v2/user_stats", "GET", {}, e);
        });
    },
    sendVerificationCode: function(e, n) {
        return new Promise(function(t, i) {
            r.request("v2/weixin_app/mobile_number_verify", "POST", {
                mobile_number: e
            }, t, n, i);
        });
    },
    bindMobile: function(e, n, t, i, o) {
        r.request("v2/weixin_app/mobile_number", "POST", {
            mobile_number: e,
            verification_code: n
        }, t, i, o);
    },
    isBindMobile: function(r) {
        return new Promise(function(i, u) {
            var a = (0, e.getStorage)(n.TOKEN);
            wx.request({
                url: "".concat(t.goldendataDomain, "graphql"),
                method: "POST",
                header: {
                    Authorization: a
                },
                data: {
                    query: 'query{showFeature(key: "in_real_name_auth_whitelist")}'
                },
                success: function(e) {
                    var n, t;
                    (null == e || null === (n = e.data) || void 0 === n || null === (t = n.data) || void 0 === t ? void 0 : t.showFeature) ? (i(), 
                    r && wx.navigateTo({
                        url: r
                    })) : o().then(function(e) {
                        e ? (i(), r && wx.navigateTo({
                            url: r
                        })) : (u(), wx.showModal({
                            title: "未绑定手机号",
                            content: "由于工信部的相关法律法规，未绑定手机号的用户，暂不允许查看/发布表单",
                            confirmText: "绑定",
                            success: function(e) {
                                e.confirm && wx.navigateTo({
                                    url: "/pages/subscriptions/bindphone"
                                });
                            }
                        }));
                    });
                }
            });
        });
    },
    newEntryNotifications: function(e, n, t) {
        r.request("v2/new_entry_notifications", "GET", {}, e, n, t);
    },
    syncUserFromStroage: function(r) {
        var t = (0, e.getStorage)(n.GD_USERINFO);
        t && r.setData({
            gdUserInfo: t
        });
    },
    compareLocation: function(e, n, t, i) {
        r.request("v2/location_compare", "POST", e, n, t, i);
    },
    bindWechatMobileNumber: function(e) {
        return r.requestThen("/v2/weixin_app/bind_wechat_mobile_numbers", "POST", e);
    },
    hasMobile: o,
    getCooperators: function() {
        return r.requestThen("v2/billing_account/users");
    },
    getBanners: function() {
        return r.requestThen("v2/mobile_banners?platform=5e46461b8fc1248e3a25a119", "GET");
    },
    referral: function(e) {
        return new Promise(function(n) {
            r.request("v2/referrer?referrer_id=" + e, "GET", {}, n);
        });
    },
    updateReferrerRedDot: function() {
        return new Promise(function(e) {
            r.request("v2/referrer", "PUT", {}, e);
        });
    }
};