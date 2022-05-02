// pages/create-form/create-form.js
var e = require("../../@babel/runtime/helpers/interopRequireWildcard"), a = e(require("../../utils/util")), t = (require("../../animations/index"), 
e(require("../../utils/apis/form"))), i = require("../../utils/apis/templates"),s = require("../../utils/storage"), n = require("../../utils/storage-events"), r = getApp();
const getToken = require('../../common/getToken')
Page({

    /**
     * 页面的初始数据
     */
    data: {
        showFields: !1,
        form: {
            name: "未命名表单",
            fields: [],
            description: ""
        },
        formID:'123',   //创建订单ID编号
        pcMode: !1,
        timer:''    //定时器
    },

    // 表单input获取焦点时触发
    nameChange: function(e) {
        this.setData({
            "form.name": e.detail.value
        });
    },

    // 点击增加模板
    addField: function() {
        this.setData({
            showFields: !0
        });
    },

    // 改变面板状态
    onFieldsBack: function(e) {
        this.setData({
            showFields: e.detail
        });
    },

    // 选择模板
    onSelectField: function(e) {
        let a = e.detail, t = this.data.form.fields.slice();
        t.push(a);
        var i = {
            field: a,
            index: t.length - 1
        };
        this.editField(i);
    },
    
    // 编辑模板
    onEditField: function(e) {
        this.editField(e.detail);
    },

    editField: function(e) {
        r.globalData.currentEditField = e.field, r.globalData.currentEditFieldIndex = e.index, 
        "mobile" === r.globalData.currentEditField.type && (r.globalData.currentFormSMSSignature = this.data.form.sms_signature), 
        wx.navigateTo({
            url: "../field/field?".concat(this.data.pcMode)
        });
    },

    // 提交表单函数
    formsubmit: function(e) {
        var i = this, o = this.data.formID, s = this.data.form.fields.map(function(e) {
            var t = Object.assign({}, e);
            if (t.validations) {
                var i = t.validations;
                for (var o in t.validations = [], i) 
                a.validationsMap(o) && i[o] && t.validations.push(a.validationsMap(o));
            }
            return t.choices && (t.choices = t.choices.map(function(e) {
                return {
                    api_code: e.value,
                    value: e.name
                };
            })), t;
        });
        // 在当前页面显示导航条加载动画
        wx.showNavigationBarLoading()
        wx.showToast({
            title: "保存中...",
            icon: "loading",
            duration: 10000,
            mask: !0
        });
        let n = e.detail.value
        if(n.description==='') {
            n.description="感谢你能抽出几分钟时间填写以下内容，现在我们马上开始吧！";
        }
        let d = {
            name: n.name,
            description: n.description,
            fields: s
        };
        if (this.data.form.sms_signature && (d.form.sms_signature = this.data.form.sms_signature), d.form_update_formid = o, this.data.isCreate) {
            var l = this.data.form.header_image;
            l && (d.form.header_image = "template", d.form.header_image = l), t.create(d, function(e) {
                i.updateFormCallBack(e.data.token), i.setData({
                    isCreate: !1,
                    "form.token": e.data.token
                });
            }, null, function(e) {
                console.log("err", e), wx.showModal({
                    title: "表单标题不能为空",
                    showCancel: !1
                });
            });
        } else {
            var u = function(e) {
                console.log("err", e), wx.showModal({
                    title: "表单标题不能为空",
                    showCancel: !1
                });
            };
            wx.hideToast()
            wx.hideNavigationBarLoading()
            getToken.checkToken().then(Token=>{
                // 成功获取token
                wx.request({
                    url: 'https://api.hengyimonster.top/form/formDone',
                    method:"POST",
                    data:{
                        token:Token,
                        order:this.data.formID,
                        form:JSON.stringify(this.data.form)
                    },
                    success:(res)=>{
                        // 成功自动保存
                        console.log("res",res)
                        wx.showToast({
                            title: "保存表单成功！",
                            icon: "success"
                        })
                        clearInterval(this.data.timer);
                        this.setData({
                            timer:''
                        })
                        wx.navigateTo({
                            url: "/pages/preview/preview",
                            success:function(res) {
                                res.eventChannel.emit('sendCreatedForm',{formID:i.data.formID,form:d})
                            }
                        });
                    },
                    fail:(err)=>{
                        console.log("保存表单失败!\n",err)
                        wx.showToast({
                            title: "保存表单失败！",
                            icon: "error"
                        })
                    }
                })
            }).catch(error=>{
                //返回token失败
                wx.showToast({
                    title: "获取token失败！提交表单失败！",
                    icon: "none"
                })
            })
        }
    },

    // 函数传入参数为token
    fetchForm: function(e) {
        var a = this;
        wx.showLoading({
            title: "加载中",
            mask: !0
        })
        getToken.checkToken().then(Token=>{
            // 成功获取token
            wx.request({
                url: 'https://api.hengyimonster.top/form/getFormId',
                method:"GET",
                data:{
                    token:Token
                },
                success:(res)=>{
                    // 成功获取表单编号
                    a.setData({
                        formID: res.data.data.randomId
                    })
                    wx.hideLoading();
                },
                fail:(err)=>{
                    console.log("获取表单失败!\n",err)
                }
            })
        }).catch(error=>{
            //返回token失败
            wx.hideLoading()
            wx.showToast({
                title: "获取token失败！请求页面失败！",
                icon: "none"
            })
            wx.navigateBack({
                delta: 1
            });
        })
    },

    // 接受事件订阅函数
    subscribeEvents: function() {
        var e = this;
        r.PubSub.unsubscribe("gd_field_edit"),r.PubSub.subscribe("gd_field_edit", function(a, t) {
            var i = (0, s.getStorage)(n.GD_USERINFO);
            if (e.setData({
                showFields: !1
            }), t.field && r.globalData.currentEditFieldIndex > -1) {
                var o = e.data.form.fields.slice();
                o[r.globalData.currentEditFieldIndex] = t.field;
                var d = {
                    "form.fields": o
                };
                t.sms_signature && (d["form.sms_signature"] = t.sms_signature), t.field.sms_verification && "free" === i.plan.code && "mobile" === t.field.type && e.setData({
                    showMobileUpgradeModal: !0
                }), e.setData(d), r.globalData.currentEditField = null, r.globalData.currentEditFieldIndex = void 0;
            }
        }), r.PubSub.unsubscribe("gd.field.delete"), r.PubSub.subscribe("gd.field.delete", function() {
            var a = e.data.form.fields.slice();
            a.splice(r.globalData.currentEditFieldIndex, 1), e.setData({
                "form.fields": a
            }), r.globalData.currentEditField = null, r.globalData.currentEditFieldIndex = void 0;
        });
    },

    // 暂时保存表单数据
    tempSave:function(e) {
        getToken.checkToken().then(Token=>{
            // 成功获取token
            wx.request({
                url: 'https://api.hengyimonster.top/form/tempUpdate',
                method:"POST",
                data:{
                    token:Token,
                    order:this.data.formID,
                    form:JSON.stringify(this.data.form)
                },
                success:(res)=>{
                    // 成功自动保存
                    console.log("res",res)
                    wx.showToast({
                        title: "自动保存成功！",
                        icon: "success"
                    })
                },
                fail:(err)=>{
                    console.log("自动保存失败!\n",err)
                    wx.showToast({
                        title: "自动保存失败！",
                        icon: "error"
                    })
                }
            })
        }).catch(error=>{
            //返回token失败
            wx.showToast({
                title: "获取token失败！自动保存失败！",
                icon: "none"
            })
        })
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        // 接受事件订阅函数
        this.subscribeEvents();
        this.setData({
            timer:setInterval(this.tempSave,300000)
        })
    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function () {
        // 获取创建订单编号
        // this.fetchForm();
    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function () {
    },

    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide: function () {
    },

    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload: function () {
        clearInterval(this.data.timer)
        this.setData({
            timer:''
        })
    },

    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh: function () {

    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom: function () {

    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function () {

    }
})