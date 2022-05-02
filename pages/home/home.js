// pages/home/home.js
const checkWebp = require('../../common/detectWebp');
const getToken = require('../../common/getToken')
Page({
    /**
     * 页面的初始数据
     */
    data: {
        swiperItem:[
            "https://img.hengyimonster.top/img/swapping_bg1.png",
            "https://img.hengyimonster.top/img/swapping_bg2.png",
            "https://img.hengyimonster.top/img/swapping_bg3.png",
        ],
        buttonTip:'',
        clickHide:true,
        buttonTipShow:false,
        goToModule:false
    },


    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        let that=this;
        wx.request({
            url: 'https://api.hengyimonster.top/home/swiperItem',
            success:(res)=>{
                let result=res.data.data;
                console.log("result",result)
                // if(!checkWebp.detectWebp()) {
                //     result.forEach((item,index,arr)=>{
                //         result[index].img="https://img.hengyimonster.top/img/"+result[index].img+".webp";
                //     })
                // }
                // else {
                //     result.forEach((item,index,arr)=>{
                //         result[index].img="https://img.hengyimonster.top/img/"+result[index].img+".png";
                //     })
                // }
                // that.setData({
                //     swiperItem:result,
                //     clickHide:false,
                //     goToModule:true
                // })
            }
          })
    },

    //提取token进入页面
     judgeToken() {
        getToken.checkToken().then(data=>{
            // 带着token进入选择的页面:data就是返回的token
            wx.navigateTo({
                url: '/pages/create-form-list/create-form-list',
                fail(err) {
                    console.log("进入创建表单页面失败！",err);
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