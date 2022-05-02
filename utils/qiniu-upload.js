var e = getApp(), n = require("session");

module.exports = {
    doUpload: function(i, t, a, o) {
        var r = [ Date.parse(new Date()), Math.ceil(1e3 * Math.random()) ].join("_");
        wx.uploadFile({
            url: e.config.qiniuUploadURL,
            filePath: a,
            name: "file",
            formData: {
                token: t,
                "x:timestamp_with_random_number": r
            },
            success: function(e) {
                var t = e.data, a = JSON.parse(t);
                a.form_token = i, function(e, i) {
                    n.request("v2/weixin_app/qiniu_callbacks", "POST", e, function(e) {
                        i && i(e.data);
                    });
                }(a, function(e) {
                    o && o(e);
                });
            },
            fail: function(e) {
                console.error("error: " + JSON.stringify(e));
            }
        });
    },
    getQiniuToken: function(e, i) {
        n.request("v2/weixin_app/qiniu_tokens", "POST", {
            prefix: e
        }, function(e) {
            var n = e.data.token;
            i && i(n);
        });
    }
};