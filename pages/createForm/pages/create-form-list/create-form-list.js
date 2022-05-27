// pages/create-form-list/create-form-list.js
const getToken = require('../../../../common/getToken')
Page({

    /**
     * 页面的初始数据
     */
    data: {
        hiddenmodalput:true,   //可以通过hidden是否掩藏弹出框的属性，来指定那个弹出框
        shareCode:'',     //用户输入的分享码
        token:'',
        shareFormList:[],    //共享表单列表
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        getToken.checkToken().then(data=>{
            this.setData({
                token:data
            })
        }).catch(error=>{
            //返回token失败
            console.log(error);
        })
    },

    // 创建空白表单
    openScene: function() {
        wx.navigateTo({
            url: '/pages/createForm/pages/create-form/create-form',
            fail(err) {
                console.log("进入创建表单详情页面失败！",err);
            }
        })
    },

    // 导入表单
    importForm: function() {
        this.modalinput()
    },

    //点击按钮指定hiddenmodalput弹出框
    modalinput:function(){
        this.setData({
            hiddenmodalput: !this.data.hiddenmodalput
        })
    },

    // 跳转到查看分享表单页面
    openShareForm(e) {
        // 在打开之前需要申请改表单的formID
        wx.request({
          url: 'https://api.hengyimonster.top/form/getFormId',
          data:{
              token:this.data.token
          },
          success:(res)=>{
              let formID = res.data.data.randomId;
              let formData = this.data.shareFormList[e.currentTarget.dataset.index];
              wx.navigateTo({
                  url: '/pages/createForm/pages/shareFormDetails/shareFormDetails?formID='.concat(formID).concat('&formData=').concat(JSON.stringify(formData))
              })
          }
        })
    },

    // 获取用户输入
    getUserInput:function(e){
        this.setData({
            shareCode:e.detail.value
        })
    },
    //取消按钮
    cancel: function(){
        this.setData({
            hiddenmodalput: true
        });
    },
    //确认
    confirm: function(res){
        this.setData({
            hiddenmodalput: true
        })
        // 根据分享码导入表单
        wx.request({
          url: 'https://api.hengyimonster.top/manage/getShareTemplate',
          data:{
              token:this.data.token,
              order:this.data.shareCode
          },
          success:(res)=> {
              let shareForm = JSON.parse(res.data.data.json_info)
              this.setData({
                shareFormList:this.data.shareFormList.concat(shareForm)
              })
          }
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