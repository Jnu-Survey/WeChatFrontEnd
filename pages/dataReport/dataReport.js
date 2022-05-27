// pages/dataReport/dataReport.js
const wxCharts = require('../../utils/wxcharts');
const getToken = require('../../common/getToken')
const app = getApp();
Page({

    /**
     * 页面的初始数据
     */
    data: {
        token:'',
        imageWidth:0,
        dataList:[],
        apiServer:app.globalData.apiServer,
        imgServer:app.globalData.imgServer
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad(options) {
        getToken.checkToken().then(Token=>{
            this.setData({
                token:Token
            })
            wx.request({
                url: this.data.apiServer + '/manage/getAnalyzeData',
                data:{
                    token:this.data.token,
                    order:options.formID
                },
                success:(res)=>{
                    if(res.data.data) {
                        this.setData({
                            dataList:res.data.data
                        })
                        this.data.dataList.map((item)=>{
                            let c = [],d = [];
                            item.Data.map((i)=>{
                                c.push(i.Name);
                                d.push(i.Num)
                            })
                            new wxCharts({
                                canvasId: item.Kind,
                                type: 'column',
                                categories: c,
                                series: [{
                                    name: item.Title,
                                    data: d
                                }],
                                yAxis: {
                                    format: function (val) {
                                        return val + '项';
                                    },
                                    // max:5,
                                    min:0
                                },
                                width: 350,
                                height: 250
                            });
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