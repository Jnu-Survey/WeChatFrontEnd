var t = require("../../@babel/runtime/helpers/interopRequireWildcard"), e = require("../../@babel/runtime/helpers/defineProperty"), o = t(require("../../utils/apis/form")), a = t(require("../../utils/apis/published-form")), n = t(require("../../pages/entry-fields")), i = t(require("../../utils/regexp_collect")), s = t(require("../../utils/util")), r = require("../../utils/storage"), c = require("../../utils/storage-events");

Component({
    properties: {
        token: {
            type: String,
            value: null,
            observer: "_tokenChange"
        },
        share: {
            type: Boolean,
            value: !0
        },
        submiting: {
            type: Boolean,
            value: !1
        },
        form: {
            type: Object,
            value: null
        },
        collectWechatInfo: {
            type: Boolean,
            value: !0
        }
    },
    data: {
        cooldowns: {},
        codeCountDowns: {},
        mobiles: {},
        countDownTimers: {},
        isFullScreen: !1,
        submitData: null,
        submitFormId: null
    },
    attached: function() {
        var t = this;
        s.isFullScreen().then(function(e) {
            t.setData({
                isFullScreen: e
            });
        }), s.isIOS(this);
    },
    methods: {
        fetchForm: function(t) {
            var e = this;
            wx.showLoading({
                title: "Loading",
                mask: !0
            }), a.show(t, function(t) {
                s.processFormFields(t.data.fields), e.setData({
                    form: t.data
                }), wx.hideLoading();
            }, function(t) {
                console.log(t), wx.hideLoading(), wx.showToast({
                    title: "请求失败",
                    icon: "none"
                }), wx.navigateBack({
                    delta: 1
                });
            });
        },
        _getUserInfoAndSubmit: function(t) {
            if (this.data.form && !(this.data.share || this.data.form.processing > 0 || ("getUserInfo:ok" === t.detail.errMsg && (0, 
            r.setStorage)(c.USERINFO, t.detail.userInfo), this.data.submiting))) {
                var e = n.processFormData(this.data.submitData);
                n.updateWeixinFields(e), e.x_submit_form_id = this.data.submitFormId;
                var o = {
                    token: this.data.form.token,
                    formData: e
                };
                this.data.form.public_report_url && (o.public_report_url = this.data.form.public_report_url), 
                this.setData({
                    submiting: !0
                }), this.triggerEvent("subInfo", o);
            }
        },
        _tokenChange: function(t) {
            null != t && "" !== t && this.fetchForm(t);
        },
        _formSubmit: function(t) {
            this.data.share ? wx.showModal({
                content: "预览表单中不能提交数据",
                showCancel: !1
            }) : this.setData({
                submitData: t.detail.value,
                submitFormId: t.detail.formId
            });
        },
        radioClick: function(t) {
            n.radioClick(this, t);
        },
        radioChange: function(t) {
            n.radioChange(this, t);
        },
        checkboxChange: function(t) {
            n.checkboxChange(this, t);
        },
        dateChange: function(t) {
            n.dateChange(this, t);
        },
        dropDownChange: function(t) {
            n.dropDownChange(this, t);
        },
        getCurrentLocation: function(t) {
            n.getCurrentLocation(this, t);
        },
        chooseImage: function(t) {
            n.chooseImage(this, t);
        },
        previewImage: function(t) {
            n.previewImage(this, t);
        },
        removeImage: function(t) {
            n.removeImage(this, t);
        },
        doRemoveImage: function(t) {
            n.doRemoveImage(this, t);
        },
        revealRemove: function(t) {
            n.revealRemove(this, t);
        },
        ratingChange: function(t) {
            n.ratingChange(this, t);
        },
        getNewCode: function(t) {
            var a = this;
            if (!this.data.share) {
                var n = t.target.dataset.apiCode, s = t.target.dataset.mobile;
                if (!i.mobile.test(s)) return wx.showModal({
                    title: "错误",
                    content: "手机格式错误，请输入正确的手机号码。",
                    showCancel: !1
                }), !1;
                wx.showLoading({
                    title: "发送中",
                    mask: !0
                }), o.sendFieldVerification(this.data.form.token, n, s, function(t) {
                    var o;
                    wx.hideLoading(), wx.showToast({
                        title: "发送成功",
                        icon: "none"
                    }), clearInterval(a.data.countDownTimers[n]);
                    var i = a.freshCode(n);
                    a.setData((e(o = {}, "cooldowns.".concat(n), !0), e(o, "codeCountDowns.".concat(n), 60), 
                    e(o, "countDownTimers.".concat(n), i), o));
                }, function(t) {
                    if (t.data.remained) {
                        var o;
                        clearInterval(a.data.countDownTimers[n]);
                        var i = a.freshCode(n);
                        a.setData((e(o = {}, "cooldowns.".concat(n), !0), e(o, "codeCountDowns.".concat(n), t.data.remained), 
                        e(o, "countDownTimers.".concat(n), i), o));
                    }
                });
            }
        },
        freshCode: function(t) {
            var o = this;
            return setInterval(function() {
                var a, n;
                o.data.codeCountDowns[t] <= 1 ? (o.setData((e(a = {}, "codeCountDowns.".concat(t), 0), 
                e(a, "cooldowns.".concat(t), !1), a)), o.resetCode(t)) : o.setData((e(n = {}, "cooldowns.".concat(t), !0), 
                e(n, "codeCountDowns.".concat(t), o.data.codeCountDowns[t] - 1), n));
            }, 1e3);
        },
        resetCode: function(t) {
            var o;
            this.setData((e(o = {}, "cooldowns.".concat(t), !1), e(o, "codeCountDowns.".concat(t), 0), 
            o)), clearInterval(this.data.countDownTimers[t]);
        },
        saveMobile: function(t) {
            var o = t.detail.value, a = t.target.dataset.apiCode;
            this.setData(e({}, "mobiles.".concat(a), o));
        }
    }
});