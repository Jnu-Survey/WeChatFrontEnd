// pages/show/show.js
const getToken = require('../../common/getToken')
const app = getApp();

Page({
    data: {
        token:'',  //填写者的token
        isFullScreen: !1,
        formId:'',
        form:{},
        apiServer:app.globalData.apiServer
    },
    onLoad: function(options) {
        getToken.checkToken().then(Token=>{
            if(Token) {
                this.setData({
                    token:Token,
                    formId:options.scene
                })
                wx.showLoading({
                    title: '正在获取表单内容...',
                })
                this.getForm(options.scene);
            }
        }).catch(error=>{
            //返回token失败
            console.log(error);
        })
    },
    // 根据表单号获取表单内容
    getForm: function(formId) {
        let that = this;
        wx.request({
          url: this.data.apiServer + '/order/wantFill',
          method:'GET',
          data:{
              token:this.data.token,
              order:formId
          },
          success:(res) => {
              if(res.data.errno!==0) {
                  wx.showToast({
                    title: res.data.errmsg,
                    icon:'none',
                    duration:5000
                  })
                  if(res.data.errmsg==='Token已经过期') {
                    wx.clearStorage()
                    // 重新获取用户信息
                    getToken.userRequest().then(Token=>{
                        that.setData({
                            token:Token
                        })
                        that.getForm(formId)
                    })
                }
              }
              else if(res.data.data.flag===2) {
                wx.showToast({
                    title: "您已填写过该表单！",
                    icon:'none',
                    duration:5000
                  })
              }
              else {
                let form = JSON.parse(res.data.data.json_msg)
                for(let i=0;i<5;i++) {
                    form.fields.map((item)=>{
                        item.type = item.type.replaceAll('-'+i,'')
                    })
                }
                this.setData({
                    form:form
                })
            }
                wx.hideLoading()
          }
        })
    }
});