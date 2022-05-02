Object.defineProperty(exports, "__esModule", {
    value: !0
}), exports.acceptFormInvitation = function(r, t, o) {
    return e.requestThen("v2/forms/".concat(r, "/verify_cooperator_token"), "post", {
        user_id: t,
        cooperator_token: o,
        role: "manager"
    });
}, exports.addCooperator = function(r) {
    var t = r.role, o = r.form_token, s = r.user_id;
    return e.requestThen("v2/forms/" + o + "/cooperators", "POST", {
        role: t,
        user_id: s
    });
}, exports.changeFormAndFieldsTitle = function(r, t) {
    return e.requestThen("v2/forms/".concat(r, "/form_structures"), "PUT", t);
}, exports.copyFormThen = function(r) {
    return e.requestThen("v2/forms/" + r + "/copy", "POST");
}, exports.create = function(r, t, o, s) {
    e.request("v2/forms", "POST", r, t, o, s);
}, exports.deleteCooperator = function(r) {
    var t = r.form_token, o = r.user_id;
    return e.requestThen("v2/forms/" + t + "/cooperators/" + o, "DELETE");
}, exports.deleteForm = function(r) {
    return e.requestThen("v2/form_covers/".concat(r), "DELETE");
}, exports.destroy = function(r, t) {
    e.request("v2/forms/" + r, "DELETE", {}, t);
}, exports.editCooperator = function(r) {
    var t = r.role, o = r.form_token, s = r.user_id;
    return e.requestThen("v2/forms/" + o + "/cooperators/" + s, "PUT", {
        role: t
    });
}, exports.fetchNextPage = function(r, t, o) {
    e.request(r.replace(getApp().config.baseUrl, ""), "GET", t, null, o);
}, exports.formStats = function(r) {
    e.request("v2/form_stats", "GET", {}, r);
}, exports.formStatus = function(r, t) {
    e.request("v2/forms/" + r + "/status", "GET", {}, t);
}, exports.getAccessToken = function(r, t) {
    e.request("v2/jwt_oauth/new", "GET", {}, null, r, null, t);
}, exports.getCooperatorToken = function(r) {
    var t = r.token, o = r.role;
    return e.requestThen("v2/forms/" + t + "/cooperator_token", "POST", {
        role: o
    });
}, exports.getEditorUrl = function(r, t, o) {
    var s = r ? "v2/forms/".concat(r, "/edit") : "v2/forms/new";
    e.request(s, "GET", {}, null, t, null, o);
}, exports.getFormCloseStatus = function(r, t, o) {
    e.request("v2/forms/" + r + "/manually_close_rule", "GET", null, t, null, o);
}, exports.getFormReports = function(r, t) {
    e.request("v2/forms/" + r + "/reports", "GET", {}, t);
}, exports.getPosters = function(r, t, o, s) {
    e.request("v2/forms/" + r + "/posters", "GET", {}, t, o, s);
}, exports.getShareQrcode = function(r, t, o, s) {
    e.request("v2/forms/" + r + "/weixin_share_qrcode", "POST", {
        prefix: "mq"
    }, t, o, s);
}, exports.list = function(r, t) {
    e.request("v2/forms", "GET", r, null, t);
}, exports.listThen = function(r) {
    return e.requestThen("v2/form_covers", "GET", r);
}, exports.postSelectedPoster = function(r, t, o, s, n) {
    e.request("v2/forms/" + r + "/posters", "POST", t, o, s, n);
}, exports.qrcode = function(r, t, o, s) {
    e.request("v2/forms/" + r + "/weixin_share_card", "POST", {
        prefix: "mq"
    }, t, o, s);
}, exports.qrcodeThen = function(r) {
    return e.requestThen("v2/forms/" + r + "/weixin_share_card", "POST", {
        prefix: "mq"
    });
}, exports.searchCooperator = function(r) {
    var t = r.token, o = r.keywords;
    return e.requestThen("v2/forms/" + t + "/cooperator_search?q=" + o, "GET");
}, exports.sendFieldVerification = function(r, t, o, s, n) {
    e.request("v2/field_verifications", "POST", {
        field_verification: {
            field_api_code: t,
            mobile: o
        },
        form_id: r
    }, s, null, n);
}, exports.sendWechatNotificationSample = function(r) {
    return e.requestThen("v2/forms/".concat(r, "/notification_samples"), "post", null);
}, exports.show = function(r, t, o) {
    e.request("v2/forms/" + r, "GET", {}, null, t, null, o);
}, exports.showThen = function(r) {
    return e.requestThen("v2/forms/" + r, "GET", {});
}, exports.switchFormCopyStatus = function(r, t, o, s) {
    e.request("v2/forms/" + r + "/replicable_status", "PUT", null, t, o, s);
}, exports.switchFormPublicReportStatus = function(r, t, o, s) {
    e.request("v2/forms/" + r + "/public_result_report", "PUT", null, t, o, s);
}, exports.switchFormStatus = function(r, t, o, s, n) {
    e.request("v2/forms/" + r + "/manually_close_rule", t, o, s, null, n);
}, exports.update = function(r, t, o, s, n) {
    e.request("v2/forms/" + r, "PUT", t, o, s, n);
}, exports.updateNotification = function(r, t) {
    return e.requestThen("v2/forms/".concat(r, "/notifications"), "put", {
        user_form_setting: {
            weixin_notification: t
        }
    });
}, exports.weixin_notification = function(r) {
    return e.requestThen("v2/forms/".concat(r, "/notifications"), "get");
};

var e = require("../session");