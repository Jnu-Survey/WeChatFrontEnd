// pages/recordDetails/recordDetails.js
const getToken = require('../../common/getToken')
const app = getApp();
Page({

    /**
     * 页面的初始数据
     */
    data: {
        formId:'',
        token:'',
        imgIconServer:app.globalData.imgIconServer,
        apiServer:app.globalData.apiServer
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad(options) {
        getToken.checkToken().then(Token=>{
            this.setData({
                formId:options.formId,
                token:Token
            })
        }).catch(error=>{
            //返回token失败
            console.log(error);
        })
    },

    // 复制表单
    copyForm:function() {
        wx.request({
          url: this.data.apiServer+'/manage/copyForm',
          data:{
              token:this.data.token,
              order:this.data.formId
          },
          success:(res)=>{
            wx.showToast({
                title: '复制表单成功！请返回我的表单查看',
                icon:'none',
                duration:3000
              })
          }
        })
    },

    // 删除表单
    deleteForm:function() {
        wx.request({
          url: this.data.apiServer + '/manage/deleteForm',
          data:{
              token:this.data.token,
              order:this.data.formId
          },
          success:(res)=>{
              wx.showToast({
                title: '删除表单成功！',
              })

          }
        })
    },

    // 发布表单模板
    shareModule:function() {
        wx.request({
            url: this.data.apiServer + '/manage/shareTemplate',
            data:{
                token:this.data.token,
                order:this.data.formId
            },
            success:(res)=>{
                wx.setClipboardData({
                    data: res.data.data,//需要复制到剪切板的内容
                    success: function (res) {//成功回调函数
                        wx.hideToast()
                        wx.showToast({
                            title: '发布表单模板成功！分享码已复制到剪切板',
                            icon:'none',
                            duration:3000
                        })
                    }
                })
            }
        })
    },

    // 开启或者关闭数据收集
    collectOrNot:function() {
        wx.request({
            url: this.data.apiServer + '/manage/switch',
            data:{
                token:this.data.token,
                order:this.data.formId
            },
            success:(res)=>{
                if(res.data.data==='修改状态为：恢复接受新的提交') {
                    wx.showToast({
                        title: '恢复收集数据！',
                    })
                }
                else {
                    wx.showToast({
                        title: '关闭收集数据！',
                    })
                }
            }
        })
    },

    // 分享表单
    shareForm(e) {
        wx.navigateTo({
            url: '/pages/share/share?formID='.concat(this.data.formId),
            fail(err) {
                console.log("进入分享表单页面失败",err)
            }
        })
    },

    // 查看数据
    dataView(e) {
        wx.navigateTo({
            url: '/pages/dataView/dataView?formID='.concat(this.data.formId),
            fail(err) {
                console.log("进入查看数据页面失败",err)
            }
        })
    },

    // 查看报表
    reportView(e) {
        wx.navigateTo({
            url: '/pages/dataReport/dataReport?formID='.concat(this.data.formId),
            fail(err) {
                console.log("进入查看报表页面失败",err)
            }
        })
    },

    // 添加数据
    addFormData(e) {
        wx.navigateTo({
            url: '/pages/addFormData/addFormData?formID='.concat(this.data.formId),
            fail(err) {
                console.log("进入添加数据页面失败",err)
            }
        })
    },

    // 打开表单
    openForm(e) {
        let that = this;
        wx.request({
            url: this.data.apiServer + '/my_form/detailDone',
            method:'GET',
            data:{
                token:this.data.token,
                order:this.data.formId
            },
            success:(res)=>{
                let form = JSON.parse(res.data.data)
                form.fields.map((item) => {
                    if(item.type.indexOf('-')!==-1) {
                        item.type = item.type.slice(0,item.type.indexOf('-'));
                    }
                })
                wx.navigateTo({
                    url: "/pages/create-form/create-form?formID=" + that.data.formId +'&form=' + JSON.stringify(form) + '&status=' + 2,
                    fail:(err)=>{
                        console.log("查看表单失败")
                    }
                });
            }
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