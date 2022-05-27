// pages/account/account.js
const getUserInfo = require('../../common/getUserInfo');
const getToken = require('../../common/getToken')
const app = getApp();
Page({
    /**
     * 页面的初始数据
     */
    data: {
        userInfo: {},
        doingForm:[],//正在进行的表单列表
        current:0,//正在进行中轮播图index
        formNum:0,//表单数量
        dataNum:0,//数据量
        token:'',//用户token
        imgIconServer:app.globalData.imgIconServer,
        apiServer:app.globalData.apiServer,
        imgServer:app.globalData.imgServer,
        proInfoWindow:app.globalData.proInfoWindow
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        this.setData({
            proInfoWindow:app.globalData.proInfoWindow
        })
    },

    // 改变轮播图index值
    swiperChange(e) {
        this.setData({
            current:e.detail.current
        })
    },

    // 进入我的表单页面
    goMyForm() {
        wx.navigateTo({
            url: '/pages/myForm/myForm',
            fail(err) {
                console.log("进入我的表单页面失败！",err);
            }
        })
    },

    // 进入创建表单页面
    goCreate() {
        wx.navigateTo({
            url: '/pages/create-form-list/create-form-list',
            fail(err) {
                console.log("进入创建表单页面失败！",err);
            }
        })
    },

    goLogging() {
        wx.navigateTo({
            url: '/pages/logging/logging',
            fail(err) {
                console.log("进入日志页面失败！",err);
            }
        })
    },

    // 进入团队介绍页面
    goTeam() {
        wx.navigateTo({
            url: '/pages/teamInfo/teamInfo',
            fail(err) {
                console.log("进入团队介绍页面失败！",err);
            }
        })
    },

    // 进入提交反馈页面
    goFeedBack() {
        wx.navigateTo({
            url: '/pages/feedBack/feedBack',
            fail(err) {
                console.log("进入提交反馈页面失败！",err);
            }
        })
    },

    // 进入使用说明页面
    goUsage() {
        wx.navigateTo({
            url: '/pages/usage/usage',
            fail(err) {
                console.log("进入使用说明页面失败！",err);
            }
        })
    },

    // 继续编辑正在进行中的表单
    continueEdit(e) {
        let formData = this.data.doingForm[this.data.current];
        // 请求这个表单的数据
        wx.request({
            url: this.data.apiServer + '/my_form/detailDoing',
            method:"GET",
            data:{
                token:this.data.token,
                order:formData.id
            },
            success:(res)=>{
                // 成功获取指定的正在进行的表单
                let form = JSON.parse(res.data.data);
                form.fields.map((item) => {
                    if(item.type.indexOf('-')!==-1) {
                        item.type = item.type.slice(0,item.type.indexOf('-'));
                    }
                })
                // 进入编辑页面
                wx.navigateTo({
                    url: "/pages/create-form/create-form?formID=" + formData.id +'&form=' + JSON.stringify(form) + '&status=' + 1,
                    fail:(err)=>{
                        console.log("查看表单失败")
                    }
                });
            },
            fail:(err)=>{
                console.log("获取指定的正在进行的表单失败!\n",err)
            }
        })
    },

    judgeToken() {
        let t = this;
        getToken.checkToken().then(Token=>{
            this.setData({
                token:Token
            })
            getUserInfo.getInfo().then((data)=>{
                t.setData({
                    userInfo:data
                })
                }).catch((error)=>{
                    console.log(error);
                })
        }).catch(error=>{
            //返回token失败
            console.log(error);
        })
    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function () {

    },

    // 获取表单数量
    getNum:function() {
        wx.request({
            url: this.data.apiServer + '/person/getCountData',
            method:'GET',
            data:{
                token:this.data.token,
            },
            success:(res)=>{
                if(res.data.errno!==0) {
                    wx.showToast({
                      title: res.data.errmsg,
                      icon:'none',
                      duration:3000
                    })
                }
                else {
                    this.setData({
                        formNum:res.data.data.i_do_how_many,
                        dataNum:res.data.data.i_get_how_many
                    })
                }
                wx.stopPullDownRefresh();
            }
        })
    },

    // 获取正在制作的表单
    getDoing:function() {
        wx.request({
            url: this.data.apiServer + '/person/getPersonSwapping',
            method:'GET',
            data:{
                token:this.data.token,
            },
            success:(res)=>{
                if(res.data.errno!==0) {
                    wx.showToast({
                      title: res.data.errmsg,
                      icon:'none',
                      duration:3000
                    })
                    if(res.data.errmsg==='Token已经过期') {
                        wx.clearStorage()
                        // 重新获取用户信息
                        getToken.userRequest().then(Token=>{
                            this.setData({
                                token:Token
                            })
                            this.getDoing();
                        })
                    }
                }
                else {
                    this.setData({
                        doingForm:res.data.data,
                    })
                }
                console.log("正在进行中的表单",res)
                wx.stopPullDownRefresh();
            }
        })
    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function () {
        getToken.checkToken().then(Token=>{
            this.setData({
                token:Token
            })
            getUserInfo.getInfo().then((data)=>{
                this.setData({
                    userInfo:data
                })
            }).catch((error)=>{
                // 返回用户信息失败
                console.log(error);
            })
            this.getDoing();
            this.getNum();
        }).catch(error=>{
            //返回token失败
            console.log(error);
        })
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

    },

    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh: function () {
        this.getDoing();
        this.getNum();
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