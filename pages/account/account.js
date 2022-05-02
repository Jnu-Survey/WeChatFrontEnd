// pages/account/account.js
const getUserInfo = require('../../common/getUserInfo');
const getToken = require('../../common/getToken')
Page({

    /**
     * 页面的初始数据
     */
    data: {
        userInfo: {},
        doingForm:[],//正在进行的表单列表
        formNum:0,//表单数量
        dataNum:0,//数据量
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        getUserInfo.getInfo().then((data)=>{
            this.setData({
                userInfo:data
            })
        }).catch((error)=>{
            console.log(error);
        })
    },

    judgeToken() {
        let t = this;
        getToken.checkToken().then(data=>{
            getUserInfo.getInfo().then((data)=>{
                t.setData({
                    userInfo:data
                })
                }).catch((error)=>{
                    console.log(error);
                })
            // // 带着token进入选择的页面:data就是返回的token
            // wx.navigateTo({
            //     url: '/pages/create-form-list/create-form-list',
            //     fail(err) {
            //         console.log("进入创建表单页面失败！",err);
            //     }
            // })
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