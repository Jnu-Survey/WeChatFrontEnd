var t = require("../../../../@babel/runtime/helpers/interopRequireDefault"), e = require("../../../../utils/storage"), a = require("../../../../utils/storage-events"), o = t(require("../../../../utils/upgradeNotification")), i = require("../../../../utils/apis/user"), n = require("../../../../utils/apis/form"), r = require("../../../../utils/apis/env"), s = getApp();
const getToken = require('../../../../common/getToken')

Page({
    data: {
        form: {name:'表单标题',description:'简单描述'},
        token:'',
        formToken: "",
        animationData: null,
        backdropAnimationData: null,
        qrCodeImg: null,
        qrCodeImgUrl: void 0,
    },
    onLoad: function(options) { 
        let formID = options.formID;
        getToken.checkToken().then(Token=>{
            // 成功获取token
            this.setData({
                token:Token
            })
            // 请求表单的分享二维码
            wx.request({
                url:'https://api.hengyimonster.top/manage/shareCode',
                method:'GET',
                data:{
                    token:this.data.token,
                    order:formID
                },
                success:(res)=> {
                    console.log("res",res)
                    this.getBase64ImageUrl(res.data.data.base64_image);
                }
            })
        }).catch(error=>{
            //返回token失败
            console.log("获取token失败！")
            wx.showToast({
                title: "获取token失败！",
                icon: "error"
            })
            wx.navigateBack({
                delta: 1
            });
        })
    },
    //把base64转换成图片
    getBase64ImageUrl: function (base64Url) {
        /// 获取到base64Data
        var base64ImgUrl = base64Url.replace(/[\r\n]/g, '') // 将回车换行换为空字符''
        this.setData({
            qrCodeImg:base64ImgUrl
        })
    },
    // 点击“邀请好友填写”按钮转发
    onShareAppMessage: function() {
        return {
            title: this.data.form.name,  //转发标题
            path: "/pages/show/show",   // 转发路径
            imageUrl:"../../assets/image/logo.png"  //转发显示的图片
        };
    },
    openPublishedForm: function() {
        var t = "/pages/forms/publish?token=".concat(this.data.formToken);
        i.isBindMobile(t);
    },
    goToIndex: function() {
        wx.reLaunch({
            url: "/pages/template-home/index"
        });
    },
    // 将二维码图片保存本地
    saveQrCode: function() {
        wx.showLoading({
            mask: !0,
            title: "保存中..."
        })
        let imgSrc = this.data.qrCodeImg.replace('data:image/png;base64,',''); // base64编码
        let file = wx.getFileSystemManager(); // 获取文件管理器对象
        let number = Math.random();
        // 用于写文件
        file.writeFile({
          filePath: wx.env.USER_DATA_PATH + '/pic' + number + '.png', // 表示生成一个临时文件名
          data: imgSrc,  // 要写入的文本或二进制数据
          encoding: 'base64',  //指定写入文件的字符编码
          success: res => {
            // 保存图片到手机
            wx.saveImageToPhotosAlbum({
              filePath: wx.env.USER_DATA_PATH + '/pic' + number + '.png',
              success: function (res) {
                wx.hideLoading();
                wx.showToast({
                  title: '已保存到相册',
                })
              },
              fail: function (err) {
                wx.hideLoading();
                wx.showToast({
                    title: '保存二维码失败',
                  })
              }
            })
          }, fail: err => {
            console.log(err)
          }
        })
    },
    preview: function() {
        var t = "/pages/forms/publish?token=".concat(this.data.formToken, "&showShare=", !0);
        wx.navigateTo({
            url: t
        });
    },
    copyFormUrl: function() {
        var t = "我创建了一个表单「".concat(this.data.form.name, "」，快来点击链接填写吧\r\n").concat(r.env.publishPageBaseURL).concat(this.data.formToken);
        wx.setClipboardData({
            data: t,
            success: function() {
                wx.showToast({
                    title: "复制成功"
                });
            }
        });
    },
    // 关闭分享表单页面
    closeActionSheet: function() {
        this.setData({
            shareModalVisible: !1
        });
    }
});