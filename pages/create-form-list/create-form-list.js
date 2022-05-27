// pages/create-form-list/create-form-list.js
const getToken = require('../../common/getToken')
const app = getApp();
Page({

    /**
     * 页面的初始数据
     */
    data: {
        hiddenmodalput:true,   //可以通过hidden是否掩藏弹出框的属性，来指定那个弹出框
        shareCode:'',     //用户输入的分享码
        token:'',
        shareFormList:[],    //共享表单列表
        apiServer:app.globalData.apiServer,
        imgServer:app.globalData.imgServer
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
            url: '/pages/create-form/create-form',
            fail(err) {
                console.log("进入创建表单详情页面失败！",err);
            }
        })
    },

    // 选择使用场景
    createScene:function(e) {
        let form = {};
        if(e.currentTarget.dataset.type==='survey') {
            form = {
                name:'请输入问卷标题',
                description:'请输入问卷描述，如“非常感谢你能够参加问卷调查，期待你的看法与意见。现在我们就马上开始吧！”',
                fields:[{"type":"single_choice","title":"由填表者输入","notes":"","typeName":"单项选择","supportChoices":true,"choices":[{"value":"选项1"},{"value":"选项2"},{"value":"选项3"}],"validations":[]}]
            }
        }
        else if(e.currentTarget.dataset.type==='registry') {
            form = {
                name:'请输入报名标题',
                description:'请输入报名描述，如“感谢你参加本场活动，现在马上开始报名吧！”',
                fields:[{"type":"name","title":"由填表者输入","notes":"","typeName":"姓名","supportChoices":false,"validations":[]}]
            }
        }
        else {
            form = {
                name:'请输入投票标题',
                description:'请输入报名描述，如“请你为心仪的选项投出宝贵的一票”',
                fields:[{"type":"single_choice","title":"由填表者输入","notes":"","typeName":"单项选择","supportChoices":true,"choices":[{"value":"选项1"},{"value":"选项2"},{"value":"选项3"}],"validations":[]}]
            }
        }
        wx.navigateTo({
            url: '/pages/create-form/create-form?form='.concat(JSON.stringify(form)).concat("&type=").concat(e.currentTarget.dataset.type),
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
          url: this.data.apiServer + '/form/getFormId',
          data:{
              token:this.data.token
          },
          success:(res)=>{
              if(res.data.errno!==0) {
                wx.showToast({
                    title: res.data.errmsg,
                    icon:'none'
                })
                return
              }
              let formID = res.data.data.randomId;
              let formData = this.data.shareFormList[e.currentTarget.dataset.index];
              wx.navigateTo({
                  url: '/pages/shareFormDetails/shareFormDetails?formID='.concat(formID).concat('&formData=').concat(JSON.stringify(formData))
              })
          }
        })
    },

    // 获取用户输入
    getUserInput:function(e){
        if(e.detail.value) {
            this.setData({
                shareCode:e.detail.value
            })
        }
    },
    //取消按钮
    cancel: function(){
        this.setData({
            hiddenmodalput: true
        });
    },
    //确认
    confirm: function(res){
        if(!this.data.shareCode) {
            wx.showToast({
              title: '分享码不能为空',
              icon:'error'
            })
        }
        else {
            this.setData({
                hiddenmodalput: true
            })
            // 根据分享码导入表单
            wx.request({
              url: this.data.apiServer + '/manage/getShareTemplate',
              data:{
                  token:this.data.token,
                  order:this.data.shareCode
              },
              success:(res)=> {
                  if(res.data.errno!==0) {
                      wx.showToast({
                        title: res.data.errmsg,
                        icon:'error'
                      })
                  }
                  else {
                    let shareForm = JSON.parse(res.data.data.json_info)
                    this.setData({
                      shareFormList:this.data.shareFormList.concat(shareForm)
                    })
                    wx.showToast({
                        title: '导入表单成功！',
                        icon:'success'
                    })
                  }
              }
            })
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