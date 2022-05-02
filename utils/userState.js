var e = require("../@babel/runtime/helpers/interopRequireWildcard");

Object.defineProperty(exports, "__esModule", {
    value: !0
}), exports.setStorageUserInfo = exports.setRoleList = exports.setCurrentUserInfo = exports.navigateMiniProgram = exports.isFakeEmail = exports.isAdvancePlan = exports.invokeUserInfo = exports.invokeRoleList = exports.hasTouchLowData = exports.getUserPermission = exports.getCurrentUserInfo = exports.allPlans = void 0;

var t = e(require("./apis/user")), r = e(require("./util")), o = require("./storage"), a = require("./storage-events");

require("../core/queryString");

exports.invokeUserInfo = function(e) {
    var s = arguments.length > 1 && void 0 !== arguments[1] && arguments[1];
    return new Promise(function(i, u) {
        var f = (0, o.getStorage)(a.GD_USERINFO);
        if (f && n(f.email) && (f.email = ""), f && !s) return e && e.setData({
            userInfo: f,
            isOrg: !!f.plan.org_plan
        }), void i(f);
        wx.showLoading({
            mask: !0
        }), t.me().then(function(t) {
            if (wx.hideLoading(), t.statusCode > 300) return u ? void u(t) : void wx.showToast({
                title: "获取用户信息失败",
                icon: "none"
            });
            n(t.data.email) && (t.data.email = ""), r.updateGdUserInfo(t.data), e && e.setData({
                userInfo: t.data,
                isOrg: !!t.data.plan.org_plan
            }), i(t.data);
        }, function() {
            wx.hideLoading();
        });
    });
};

exports.invokeRoleList = function(e) {
    var t = (0, o.getStorage)(a.ROLE_LIST);
    return e.setData({
        roleList: t
    }), Promise.resolve(t);
};

exports.setStorageUserInfo = function(e) {
    if (Array.isArray(e)) (0, o.setStorage)(a.GD_USERINFO, e[0]), (0, o.setStorage)(a.TOKEN, e[0].token), 
    (0, o.setStorage)(a.ROLE_LIST, e); else {
        if ("string" == typeof e) return;
        (0, o.setStorage)(a.GD_USERINFO, e), e.token && (0, o.setStorage)(a.TOKEN, e.token), 
        (0, o.setStorage)(a.ROLE_LIST, [ e ]);
    }
};

exports.setCurrentUserInfo = function(e) {
    (0, o.setStorage)(a.GD_USERINFO, e), (0, o.setStorage)(a.TOKEN, e.token);
};

exports.getCurrentUserInfo = function() {
    return (0, o.getStorage)(a.GD_USERINFO);
};

exports.setRoleList = function(e) {
    (0, o.setStorage)(a.ROLE_LIST, e);
};

exports.getUserPermission = function(e) {
    var t;
    return null !== (t = {
        worker: "企业协作成员",
        admin: "企业管理员",
        owner: "企业拥有者"
    }[e]) && void 0 !== t ? t : "";
};

exports.hasTouchLowData = function(e) {
    return e.entry_quota.total_quota - e.entry_quota.consumed_quota < 0 || (e.storage_quota.total_quota - e.storage_quota.consumed_quota < 0 || (e.sms.total_quota - e.sms.consumed_quota < 0 || e.active_mail.total_quota - e.active_mail.consumed_quota < 0));
};

var n = function(e) {
    return [ "fakegdsite", "fakegdweixinapp", "fakegdmobileapp" ].some(function(t) {
        return e.indexOf(t) > -1;
    });
};

exports.isFakeEmail = n;

var s = function() {
    return [ "free", "pro2", "ent2", "e10", "e20", "e30" ];
};

exports.allPlans = s;

exports.isAdvancePlan = function(e, t) {
    return [ "free", "pro2", "ent2", "e10", "e20", "e30" ].indexOf(t) >= [ "free", "pro2", "ent2", "e10", "e20", "e30" ].indexOf(e);
};

exports.navigateMiniProgram = function(e) {
    wx.navigateToMiniProgram({
        appId: "wxb582778073a9f01a",
        path: e,
        fail: function(e) {
            console.error(e);
        }
    });
};