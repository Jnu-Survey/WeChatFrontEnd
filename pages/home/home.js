// pages/home/home.js
var checkWebp = require('../../common/detectWebp')
Page({
    /**
     * 页面的初始数据
     */
    data: {
        swiperItem:2,
        buttonTip:'',
        clickHide:true,
        buttonTipShow:false
    },

    checkToken(){
        // 获取用户基本信息
        wx.getUserProfile({
            desc: '展示用户信息', // 声明获取用户个人信息后的用途，后续会展示在弹窗中，请谨慎填写
            success:(info)=>{
                // 获取登录凭证
                wx.login({
                    success (res) {
                      if (res.code) {
                        //发起网络请求
                        wx.request({
                            url: 'https://api.hengyimonster.top/login/dealLogin',
                            method:"POST",
                            header: { 
                                'content-type': 'application/json' 
                            }, 
                            data:{
                                avatarUrl:info.userInfo.avatarUrl,
                                city:info.userInfo.city,
                                code:res.code,
                                country:info.userInfo.country,
                                gender:info.userInfo.gender,  //性别 0：未知、1：男、2：女
                                nickName:info.userInfo.nickName,
                                province:info.userInfo.province
                            },
                            success:(res)=>{
                                console.log(res)
                            },
                            fail(err){
                                console.log("网络请求失败！",err)
                            }
                          })
                      } else {
                        console.log('获取登陆凭证失败' + res.errMsg)
                      }
                    }
                  })
            }
          })
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        let that=this;
        wx.request({
            url: 'https://api.hengyimonster.top/home/swiperItem',
            success:(res)=>{
                let result=res.data.data
                if(!checkWebp.detectWebp()) {
                    result.forEach((item,index,arr)=>{
                        result[index].img='https://wc.hengyimonster.top/home/'+result[index].img+".webp";
                    })
                }
                else {
                    result.forEach((item,index,arr)=>{
                        result[index].img='https://wc.hengyimonster.top/home/'+result[index].img+".png";
                    })
                }
                that.setData({
                    swiperItem:result,
                    clickHide:false
                })
            }
          })

        wx.request({
            url: 'https://api.hengyimonster.top/home/buttonTitle',
            success:(res)=>{
                this.setData({
                    buttonTip:res.data.data,
                    buttonTipShow:true
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