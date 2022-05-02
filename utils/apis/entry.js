var e = require("../session");

module.exports = {
    create: function(t, r, n, i) {
        e.request("v2/f/" + t, "POST", r, n, i);
    },
    update: function(t, r, n, i, s) {
        e.request("v2/forms/" + t + "/entries/" + r, "PUT", n, i, s);
    },
    destroy: function(t, r, n) {
        e.request("v2/forms/" + t + "/entries/" + r, "DELETE", {}, n);
    },
    show: function(t, r, n) {
        e.request("v2/forms/" + t + "/entries/" + r, "GET", {}, n);
    },
    list: function(t, r, n, i) {
        var s = "v2/forms/" + t + "/entries", o = [];
        for (var c in r) o.push(c + "=" + r[c]);
        o.length > 0 && (s = s + "?" + o.join("&")), e.request(s, "GET", {}, n, i);
    },
    getVerifyEntry: function(t, r, n, i) {
        var s = "v2/forms/".concat(t, "/entries/").concat(r, "?fetch_verification_code_app_fields=true");
        e.request(s, "GET", {}, n, null, i);
    },
    verifyData: function(t, r, n, i) {
        var s = "v2/weixin_app/forms/".concat(t, "/entries/").concat(r, "/gen_code_verification");
        e.request(s, "PUT", {
            gen_code: n
        }, i);
    }
};