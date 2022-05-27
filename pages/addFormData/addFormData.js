// pages/addFormData/addFormData.js
const getToken = require('../../common/getToken')
const app = getApp();
Page({

    /**
     * 页面的初始数据
     */
    data: {
        formID:'',
        form:{},
        token:'',
        apiServer:app.globalData.apiServer
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad(options) {
        getToken.checkToken().then(Token=>{
            this.setData({
                token:Token,
                formID:options.formID,
            })
            wx.request({
              url: this.data.apiServer + '/my_form/detailDone',
              data:{
                  token:this.data.token,
                  order:this.data.formID
              },
              success:(res)=>{
                for(let i=0;i<5;i++) {
                    res.data.data = res.data.data.replaceAll('-'+i,'')
                }
                this.setData({
                    form:JSON.parse(res.data.data)
                })
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