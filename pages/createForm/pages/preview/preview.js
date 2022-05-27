var t = require("../../../shared"), e = require("../../../../utils/apis/templates"), a = (getApp(), 
require("../../../../utils/util")), o = require("../../../../utils/apis/form"), i = require("../../../../utils/apis/user"), n = require("../../../../utils/apis/env");

Page({
    data: {
        token: null,
        isFullScreen: !1,
        form: null,
        formID:'',
        qrCodeImg: null,
        roundQrcodeImg: null,
        shareModalVisible: !1
    },
    onLoad: function(n) {
        let eventChannel = this.getOpenerEventChannel();
        eventChannel.on('sendCreatedForm',(data)=>{
            let formID = data.formID;
            let form = data.form;
            this.setData({
                form: form,
                formID:formID
            });
        })
        console.log("preview中的form",this.data.form)
        wx.setNavigationBarTitle({
            title: "模板创建"
        });
        var s = this, r = n.template_id, l = n.form_token;
        r && (0, e.fetchTemplate)({
            template_id: r,
            successCallback: function(e) {
                var a = (0, t.formatTpl)(e.data);
                s.setData({
                    form: a
                });
                wx.setNavigationBarTitle({
                    title: "模板创建"
                });
            }
        }), l && (i.syncUserFromStroage(this), this.setData({
            token: l
        }), o.show(l, function(t) {
            s.setData({
                form: t.data
            }), o.getShareQrcode(l, function(t) {
                s.setData({
                    roundQrcodeImg: t.data.file.url
                });
            }, function(t) {}), o.qrcodeThen(l).then(function(t) {
                var e = t.data.file.url;
                wx.downloadFile({
                    url: e,
                    success: function(t) {
                        wx.hideLoading(), s.setData({
                            qrCodeImg: t.tempFilePath
                        });
                    },
                    fail: function(t) {
                        wx.hideLoading(), wx.showModal({
                            title: "错误",
                            content: "下载二维码失败",
                            showCancel: !1
                        });
                    }
                });
            }).catch(function(t) {});
        })), a.isFullScreen().then(function(t) {
            s.setData({
                isFullScreen: t
            });
        });
    },
    showShareModal: function() {
        this.setData({
            shareModalVisible: !0
        });
    },
    pauseShare: function() {
        a.alert(this.data.gdUserInfo.toggles.enable_wx_form_share.desc);
    },
    onShareAppMessage: function() {
        var t = this;
        if (this.data.form && !this.options.template_id) return {
            title: this.data.form.name,
            path: "/pages/forms/publish?token=" + this.data.form.token,
            success: function(e) {
                upgradeNotification.shouldNotice.call(t);
            }
        };
    },
    copyFormUrl: function() {
        var t = "我创建了一个表单「".concat(this.data.form.name, "」，快来点击链接填写吧\r\n").concat(n.env.publishPageBaseURL).concat(this.data.token);
        wx.setClipboardData({
            data: t,
            success: function() {
                wx.showToast({
                    title: "复制成功"
                });
            }
        });
    },
    saveQrCode: function() {
        if (this.data.qrCodeImg) {
            wx.saveImageToPhotosAlbum({
                filePath: this.data.qrCodeImg,
                success: function(t) {
                    wx.hideLoading(), wx.showToast({
                        title: "填表码已保存到系统相册，请将填表码发送给微信好友，或在朋友圈发布。",
                        icon: "none"
                    });
                },
                fail: function(t) {
                    wx.hideLoading(), wx.showModal({
                        title: "错误",
                        content: "保存二维码失败",
                        showCancel: !1
                    });
                }
            });
        }
    },
    backEdit: function() {
        wx.navigateBack({
            detal: 1
        });
    },
    goHome: function() {
        wx.switchTab({
            url: "/pages/template-home/index"
        });
    },
    goShare: function() {
        wx.navigateTo({
            url: "/pages/createForm/pages/share/share?formID=".concat(this.data.formID)
        });
    },
    createForm: function() {
        wx.navigateTo({
            url: "/pages/forms/create/create?template_id=".concat(this.data.form.id)
        });
    },
    // 关闭分享表单页面
    closeActionSheet: function() {
        this.setData({
            shareModalVisible: !1
        });
    }
});