// pages/feedback/feedback.js
const getToken = require('../../common/getToken')
const app = getApp();
Page({

    /**
     * 页面的初始数据
     */
    data: {
        token:'',
        apiServer:app.globalData.apiServer
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad(options) {
        getToken.checkToken().then(Token=>{
            this.data.token = Token;
        }).catch(error=>{
            //返回token失败
            console.log(error);
        })
    },

    checkEmail(e){
        console.log(e.detail.value)
        let addressReg = /^[A-Za-z0-9-_\u4e00-\u9fa5]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/;
        if(!addressReg.test(e.detail.value)) {
            wx.showToast({
                title: '邮箱格式不正确',
                icon:'error',
                duration:2000
              })
        }
    },

    submitFeedBack(e) {
        if(!e.detail.value.email) {
            wx.showToast({
              title: '邮箱不能为空！',
              icon:'error',
              duration:2000
            })
            return
        }
        else if(!e.detail.value.info) {
            wx.showToast({
                title: '主题不能为空！',
                icon:'error',
                duration:2000
              })
            return
        }
        else if(!e.detail.value.title) {
            wx.showToast({
                title: '反馈不能为空！',
                icon:'error',
                duration:2000
              })
            return
        }
        else {
            let addressReg = /^[A-Za-z0-9-_\u4e00-\u9fa5]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/;
            if(addressReg.test(e.detail.value.email)) {
                wx.request({
                    url: this.data.apiServer + '/person/noticeEmail',
                    data:{
                        token:this.data.token,
                        email:e.detail.value.email,
                        info:e.detail.value.info,
                        title:e.detail.value.title
                    },
                    success:(res)=>{
                        if(res.data.errmsg) {
                            wx.showToast({
                                title: res.data.errmsg,
                                icon: 'none',
                                duration:3000
                            })
                        }
                        else {
                            wx.showToast({
                                title: res.data.data,
                                icon:'none',
                                duration:3000
                            })
                        }
                    }
                  })
            }
            else {
                wx.showToast({
                    title: '邮箱格式不正确',
                    icon:'error'
                  })
            }
        }
    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady() {

    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow() {

    },

    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide() {

    },

    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload() {

    },

    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh() {

    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom() {

    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage() {

    }
})