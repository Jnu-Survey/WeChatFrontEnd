// pages/record/record.js
const checkWebp = require('../../common/detectWebp');
Page({
    /**
     * 页面的初始数据
     */
    data: {
        tabs: [ "我填的表", "填我的表" ],
        activeIndex: 0,
        suitWebp:false,
        participatedNextPage: "",
        collectedEntryList: [],
        participatedForms: [],
        isParticipatedFormsLoading: !1
    },

    // 导航栏点击
    tabClick: function(t) {
        this.setData({
            sliderOffset: t.currentTarget.offsetLeft,
            activeIndex: parseInt(t.currentTarget.id, 10)
        });
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {

    },

    checkWebpImg() {
        this.setData({
            suitWebp:checkWebp.detectWebp()
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