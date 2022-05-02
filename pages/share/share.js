var t = require("../../@babel/runtime/helpers/interopRequireDefault"), e = require("../../utils/storage"), a = require("../../utils/storage-events"), o = t(require("../../utils/upgradeNotification")), i = require("../../utils/apis/user"), n = require("../../utils/apis/form"), r = require("../../utils/apis/env"), s = getApp();

Page({
    data: {
        form: null,
        formToken: "",
        animationData: null,
        backdropAnimationData: null,
        qrCodeImg: null,
        qrCodeImgUrl: void 0,
        showModalStatus: !1,
        publishPageBaseURL: s.config.publishPageBaseURL
    },
    onLoad: function(t) {
        var e = this;
        this.setData({
            formToken: t.formToken
        }), n.show(t.formToken, function(t) {
            200 === t.statusCode && e.setData({
                form: t.data
            }), 403 === t.statusCode && e.setData({
                formFrozen: !0,
                formFrozenErrorMsg: t.data.errors.join("，")
            });
        }), this.fetchShareCard();
    },
    onShareAppMessage: function() {
        return {
            title: this.data.form.name,
            desc: this.data.form.description,
            path: "/pages/forms/publish?token=" + this.data.form.token,
            imageUrl: "/assets/imgs/share-form-pic.png"
        };
    },
    fetchShareCard: function() {
        var t = this;
        if (this.data.qrCodeImgUrl) return this.data.qrCodeImgUrl;
        n.qrcode(this.data.formToken, null, function(e) {
            var a = e.data && e.data.file && e.data.file.url;
            return t.setData({
                qrCodeImgUrl: a
            }), a;
        }, function(t) {
            wx.showModal({
                title: "提示",
                content: "显示填表码失败"
            });
        });
    },
    openPublishedForm: function() {
        var t = "/pages/forms/publish?token=".concat(this.data.formToken);
        i.isBindMobile(t);
    },
    goToIndex: function() {
        wx.reLaunch({
            url: "/pages/template-home/index"
        });
    },
    requestQrcode: function() {
        var t = this;
        return wx.showLoading({
            mask: !0,
            title: "填表码生成中"
        }), new Promise(function(e, a) {
            n.qrcode(t.data.formToken, function(o) {
                var i = o.data.file.url;
                t.setData({
                    qrCodeImgUrl: i
                }), wx.downloadFile({
                    url: i,
                    success: function(a) {
                        t.setData({
                            qrCodeImg: a.tempFilePath
                        }), e();
                    },
                    fail: function(t) {
                        wx.hideLoading(), wx.showModal({
                            title: "错误",
                            content: "下载二维码失败",
                            showCancel: !1
                        }), a();
                    }
                });
            }, function(t) {
                wx.hideLoading();
            });
        });
    },
    saveQrCode: function() {
        var t = this, i = this;
        wx.showLoading({
            mask: !0,
            title: "保存中..."
        }), this.requestQrcode().then(function() {
            wx.saveImageToPhotosAlbum({
                filePath: t.data.qrCodeImg,
                success: function(t) {
                    wx.hideLoading(), wx.showToast({
                        title: "已保存到相册，请发送给微信好友或在朋友圈发布。",
                        icon: "none"
                    }), (0, e.getStorage)(a.GD_SESSEION) && o.default.shouldNotice.call(i);
                },
                fail: function(t) {
                    console.log("save qrcode err", t), wx.showModal({
                        title: "错误",
                        content: "保存二维码失败",
                        showCancel: !1
                    });
                }
            });
        });
    },
    closeShareActionSheet: function() {
        this.setData({
            showModalStatus: !1
        });
    },
    preview: function() {
        var t = "/pages/forms/publish?token=".concat(this.data.formToken, "&showShare=", !0);
        wx.navigateTo({
            url: t
        });
    },
    copyFormUrl: function() {
        var t = "我创建了一个表单「".concat(this.data.form.name, "」，快来点击链接填写吧\r\n").concat(r.env.publishPageBaseURL).concat(this.data.formToken);
        wx.setClipboardData({
            data: t,
            success: function() {
                wx.showToast({
                    title: "复制成功"
                });
            }
        });
    }
});