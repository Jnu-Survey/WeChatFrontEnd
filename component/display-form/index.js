var t = require("../../@babel/runtime/helpers/interopRequireWildcard"), e = require("../../@babel/runtime/helpers/defineProperty"), o = t(require("../../utils/apis/form")), a = t(require("../../utils/apis/published-form")), n = t(require("../../pages/entry-fields")), i = t(require("../../utils/regexp_collect")), s = t(require("../../utils/util")), r = require("../../utils/storage"), c = require("../../utils/storage-events");
const app = getApp();

Component({
    properties: {
        token: {
            type: String,
            value: null,
            // observer: "_tokenChange"
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
        formId:{
            type: String,
            value: null,
        },
        collectWechatInfo: {
            type: Boolean,
            value: !0
        },
        submitButton: {
            type: Boolean,
            value: !1
        },
        submitText: {
            type: String,
            value: '提交'
        }
    },
    data: {
        cooldowns: {},
        codeCountDowns: {},
        mobiles: {},
        countDownTimers: {},
        isFullScreen: !1,
        submitData: null,
        submitFormId: null,
        apiServer:app.globalData.apiServer
    },
    onLoad:function() {
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
            })
            s.processFormFields(this.properties.form.fields), e.setData({
                form: this.properties.form
            })
            wx.hideLoading();
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
        // _tokenChange: function(t) {
        //     // t为更新后的token
        //     null != t && "" !== t && this.fetchForm(t);
        // },
        _formSubmit: function(t) {
            if(this.properties.share) {
                wx.showModal({
                    content: "预览表单中不能提交数据",
                    showCancel: !1
                })
            }
            else {
                this.setData({
                    submitData: t.detail.value,
                    submitFormId: this.properties.formId
                });
                let form = {
                    name:this.properties.form.name,
                    description:this.properties.form.description,
                    fields:{}
                }
                let typeKeys = []
                let arr = [];
                for (let key in this.data.submitData) {
                    typeKeys.push(key.split('-')[0])
                    arr.push({[key.split('-')[0]]:this.data.submitData[key]})
                }
                let typeObj = {};
                let newFields = {};
                arr.map((item,index)=>{
                    if (typeKeys[index] in typeObj) {
                        typeObj[typeKeys[index]]++;
                    } else {
                        typeObj[typeKeys[index]] = 0;
                    }
                    let newKey = typeKeys[index]+ '-' + typeObj[typeKeys[index]]
                    let oldKey = typeKeys[index]
                    newFields[newKey] = item[oldKey]
                })
                form.fields = newFields
                // 提交参与者的填写数据
                if(this.properties.submitText==='提交') {
                    wx.request({
                        url: this.data.apiServer + '/order/commit',
                        method:"POST",
                        data:{
                            token:this.properties.token,
                            order:this.data.submitFormId,
                            form:JSON.stringify(form),
                        },
                        header: {
                            'content-type': 'application/x-www-form-urlencoded'
                        },
                        success:(res)=>{
                            // 成功提交
                            if(res.data.errno===0) {
                                wx.showToast({
                                    title: "表单提交成功！",
                                    icon: "success",
                                    duration:3000
                                })
                            }
                            else {
                                console.log("表单提交失败!\n",err)
                                wx.showToast({
                                    title: res.data.errmsg,
                                    icon: "none",
                                    duration:3000
                                })
                            }
                        },
                        fail:(err)=>{
                            console.log("表单提交失败!\n",err)
                            wx.showToast({
                                title: "表单提交失败！",
                                icon: "error",
                                duration:3000
                            })
                        }
                    })
                }
                // 提交制作者添加的数据
                else {
                    wx.request({
                        url: this.data.apiServer + '/manage/commit',
                        method:"POST",
                        data:{
                            token:this.properties.token,
                            order:this.data.submitFormId,
                            form:JSON.stringify(form),
                        },
                        header: {
                            'content-type': 'application/x-www-form-urlencoded'
                        },
                        success:(res)=>{
                            if(res.data.errno!==0) {
                                wx.showToast({
                                    title: res.data.errmsg,
                                    icon: 'none',
                                    duration:3000
                                })
                                setTimeout(()=>{
                                    wx.navigateBack({
                                        delta: 1
                                    });
                                },800)
                            }
                            else {
                                wx.showToast({
                                    title: "添加数据成功！",
                                    icon: "success"
                                })
                                setTimeout(()=>{
                                    wx.navigateBack({
                                        delta: 1
                                    });
                                },800)
                            }
                        },
                        fail:(err)=>{
                            console.log("添加数据失败!\n",err)
                            wx.showToast({
                                title: "添加数据失败！",
                                icon: "error"
                            })
                        }
                    })
                }
            }
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
        timeChange: function(t) {
            n.timeChange(this, t);
        },
        locationChange: function(t) {
            n.locationChange(this, t);
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
        checkValidations: function(t) {
            if(t.currentTarget.dataset.validations[0]==="presence" && t.detail.value==="") {
                wx.showToast({
                  title: t.currentTarget.dataset.title + '输入不能为空！',
                  icon:'none',
                  duration:5000
                })
            }
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