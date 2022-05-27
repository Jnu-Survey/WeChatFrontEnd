// pages/create-form/create-form.js
var e = require("../../../../@babel/runtime/helpers/interopRequireWildcard"), a = e(require("../../../../utils/util")), t = (require("../../../../animations/index"), 
e(require("../../../../utils/apis/form"))), i = require("../../../../utils/apis/templates"),s = require("../../../../utils/storage"), n = require("../../../../utils/storage-events"), r = getApp();
const getToken = require('../../../../common/getToken')
Page({

    /**
     * 页面的初始数据
     */
    data: {
        showFields: !1,
        form: {
            name: "",
            fields: [],
            description: ""
        },
        formID:'',   //创建订单ID编号
        pcMode: !1,
        timer:'',    //定时器
        status:0,   //当前表单状态，0：创建新表单，1：打开正在进行中，2：打开完成表单
    },

    // 表单标题input改变时触发
    nameChange: function(e) {
        this.setData({
            "form.name": e.detail.value
        });
    },

    // 表单描述input改变时触发
    tipsChange:function(e) {
        this.setData({
            "form.description": e.detail.value
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
            delete t.migrateToFields;
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
        let n = e.detail.value
        if(n.name==='') {
            wx.showToast({
              title: '表单标题不能为空!',
              duration:3000
            })
            return;
        }
        // 在当前页面显示导航条加载动画
        wx.showNavigationBarLoading()
        wx.showToast({
            title: "保存中...",
            icon: "loading",
            duration: 10000,
            mask: !0
        });
        if(n.description==='') {
            n.description="感谢你能抽出几分钟时间填写以下内容，现在我们马上开始吧！";
        }
        let previewForm = {
            name: n.name,
            description: n.description,
            fields: s
        }
        let typeObj = {};
        let fields = this.deepCopy(s);
        fields.map((item) => {
            if (item.type in typeObj) {
                typeObj[item.type]++;
            } else {
                typeObj[item.type] = 0;
            }
            item.type += '-' + typeObj[item.type];
        })
        let d = {
            name: n.name,
            description: n.description,
            fields: fields
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
                    form:JSON.stringify(d),
                    name:d.name,
                    description:d.description
                },
                header: {
                    'content-type': 'application/x-www-form-urlencoded'
                },
                success:(res)=>{
                    // 成功自动保存
                    wx.showToast({
                        title: "保存表单成功！",
                        icon: "success"
                    })
                    clearInterval(this.data.timer);
                    this.setData({
                        timer:''
                    })
                    wx.navigateTo({
                        url: "/pages/createForm/pages/preview/preview",
                        success:function(res) {
                            res.eventChannel.emit('sendCreatedForm',{formID:i.data.formID,form:previewForm})
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
                    console.log("获取表单编号失败！")
                    wx.hideLoading()
                    wx.showToast({
                        title: "请求页面失败！",
                        icon: "error"
                    })
                    setTimeout(()=>{wx.navigateBack({delta:1})},1500)
                }
            })
        }).catch(error=>{
            //返回token失败
            console.log("获取token失败！")
            wx.hideLoading()
            wx.showToast({
                title: "请求页面失败！",
                icon: "error"
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

    // 深拷贝
    deepCopy:function(obj){
        //判断是否是简单数据类型
        let result = obj;
        if(typeof obj == "object"){
            //复杂数据类型
            result = obj.constructor === Array ? [] : {};
            for(let i in obj){
                result[i] = typeof obj[i] == "object" ? this.deepCopy(obj[i]) : obj[i];
            }
        }else {
            //简单数据类型 直接赋值
            result = obj;
        }
        return result;
    },

    // 暂时保存表单数据
    tempSave:function(e) {
        let form = {
            formTitle:'',
            formTip:'',
            itemList:[]
        };
        form.formTitle = this.data.form.name;
        form.formTip = this.data.form.description;
        form.itemList = this.deepCopy(this.data.form.fields);
        let typeObj = {};
        form.itemList.map((item) => {
            if(item.type.indexOf('-')!==-1) {
                item.type = item.type.slice(0,-2);
            }
            if (item.type in typeObj) {
                typeObj[item.type]++;
            } else {
                typeObj[item.type] = 0;
            }
            item.type += '-' + typeObj[item.type];
        })
        getToken.checkToken().then(Token=>{
            // 成功获取token
            wx.request({
                url: 'https://api.hengyimonster.top/form/tempUpdate',
                method:"POST",
                data:{
                    token:Token,
                    order:this.data.formID,
                    form:JSON.stringify(form),
                },
                header: {
                    'content-type': 'application/x-www-form-urlencoded'
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
        if(this.data.status===0 || this.data.status===1) {
            this.setData({
                timer:setInterval(this.tempSave,60000)
            })
        }
        // 接受正在进行中表单参数
        let eventChannel = this.getOpenerEventChannel();
        let formID = '';
        let form = {};
        eventChannel.on('sendDoingForm',(data)=>{
            formID = data.formID;
            form = data.form;
            this.setData({
                form:form,
                formID:formID,
                status:1
            })
        })
        eventChannel.on('openDoneForm',(data)=>{
            formID = data.formID;
            form = data.form;
            this.setData({
                formID:formID,
                form:form,
                status:2
            })
        })
        if(!this.data.status) {
            // 获取创建订单编号
            this.fetchForm();
        }
    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function () {
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