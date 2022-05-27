// pages/dataView/dataView.js
const getToken = require('../../common/getToken')
const app = getApp();
Page({

    /**
     * 页面的初始数据
     */
    data: {
        header:[],
        body:[],
        apiServer:app.globalData.apiServer,
        imgIconServer:app.globalData.imgIconServer,
        imgServer:app.globalData.imgServer
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad(options) {
        getToken.checkToken().then(Token=>{
            wx.request({
              url: this.data.apiServer + '/manage/getAllDoneInfo',
              data:{
                  token:Token,
                  order:options.formID
              },
              success:(res)=>{
                  if(res.data.data.header && res.data.data.body) {
                    this.setData({
                        header:res.data.data.header,
                        body:res.data.data.body
                    })
                    wx.showToast({
                        title: '当表单数据过多时可以横向滑动查看',
                        icon:'none',
                        duration:3000
                      })
                  }
              }
            })
        }).catch(error=>{
            //返回token失败
            console.log(error);
        })
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