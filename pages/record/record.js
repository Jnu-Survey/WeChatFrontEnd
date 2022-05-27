// pages/record/record.js
const checkWebp = require('../../common/detectWebp');
const getToken = require('../../common/getToken')
const app = getApp();
Page({
    /**
     * 页面的初始数据
     */
    data: {
        tabs: [ "我填的表", "填我的表" ],
        activeIndex: 0,
        suitWebp:false,
        collectedEntryList: [],
        participatedForms: [],
        token:'',
        pageNum:1,
        validText:'设置无效',
        wsConnect:false,
        timeInterval:null,
        apiServer:app.globalData.apiServer,
        wsServer:app.globalData.wsServer,
        imgServer:app.globalData.imgServer,
        proInfoWindow:app.globalData.proInfoWindow
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

    // 设置该数据无效
    setInvalid(e) {
        if(this.data.validText==='设置无效') {
            wx.showModal({
                title: '确认',
                content: '确认将该数据设为无效吗？',
                success (res) {
                    if(res.confirm) {
                        wx.showLoading()
                        wx.request({
                            url: this.data.apiServer + '/manage/doInvalid',
                            data:{
                                token:this.data.token,
                                order:this.data.collectedEntryList[e.currentTarget.dataset.index].order_id,
                                from_uid:this.data.collectedEntryList[e.currentTarget.dataset.index].aim_uid,
                            },
                            success:(res)=>{
                                wx.hideLoading()
                                this.setData({
                                    validText:'数据已失效'
                                })
                                thiswx.showToast({
                                  title: '数据已失效',
                                })
                            }
                          })
                    }
                    else {
                        wx.showToast({
                          title: '已取消！',
                          icon:'error',
                          duration:3000
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
        this.setData({
            proInfoWindow:app.globalData.proInfoWindow
        })
        let that = this;
        getToken.checkToken().then(data=>{
            this.setData({
                token:data
            })
            // 请求我填的表记录
            wx.request({
              url: this.data.apiServer + '/turn/fromMyselfDone',
              data:{
                  token:this.data.token,
                  page:1
              },
              success:(res)=>{
                if(res.data.errno!==0) {
                    wx.showToast({
                      title: res.data.errmsg,
                      icon:'none',
                      duration:3000
                    })
                    if(res.data.errmsg==='Token已经过期') {
                        wx.clearStorage()
                        // 重新获取用户信息
                        getToken.userRequest().then(Token=>{
                            this.setData({
                                token:Token
                            })
                            this.onLoad()
                        })
                    }
                }
                else if(res.data.data.infos) {
                    this.setData({
                        participatedForms:res.data.data.infos
                      })
                }
              }
            })
            // 请求别人填我的表的记录
            // 连接WebSocket 
            wx.connectSocket({
                url: this.data.wsServer + '/turn/toMyselfDone?token=' + this.data.token + "&page=" + this.data.pageNum,
                header:{ 
                    'content-type': 'application/json'
                },
                method:"GET",
            })
            wx.onSocketOpen((res) => {
                console.log('WebSocket 成功连接', res)
                that.setData({
                    wsConnect:true
                })
                wx.onSocketMessage(function(res) {
                    console.log("接收到服务器内容",res)
                    if(JSON.parse(res.data) && JSON.parse(JSON.parse(res.data))!==null) {
                        let arr = that.data.collectedEntryList;
                        if(Object.prototype.toString.call(JSON.parse(JSON.parse(res.data)))==='[object Object]') {
                            arr.unshift(JSON.parse(JSON.parse(res.data)))
                        }
                        else {
                            arr = arr.concat(JSON.parse(JSON.parse(res.data)))
                        }
                        // 获取到别人填写我的表的记录
                        that.setData({
                            collectedEntryList:arr,
                            pageNum:Math.floor(arr.length/10)+1
                        })
                    }
                })
                this.data.timeInterval = setInterval(()=>{
                    wx.sendSocketMessage({
                        // 心跳发送的信息应由前后端商量后决定
                        data: JSON.stringify({
                          "msg_type": 'ping'
                        }),
                        success(res) {
                          console.log("发送心跳成功",res);
                        },
                        fail(err) {
                          console.log("发送心跳失败",err)
                        }
                      });
                },5000)
            })
            wx.onSocketClose((result) => {
                console.log("websocket 已自动断开！",result)
            })
            // 连接失败
            wx.onSocketError((err) => {
                console.log('websocket连接失败', err);
            })
        }).catch(error=>{
            //返回token失败
            console.log(error);
        })
    },

    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide: function () {
        if(this.data.wsConnect) {
            clearInterval(this.data.timeInterval);
            wx.closeSocket({
              success:(res)=>{
                console.log('WebSocket 已关闭！')
                this.setData({
                    wsConnect:false,
                    timeInterval:null
                })
              }
            })
        }
    },

    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload: function () {
        if(this.data.wsConnect) {
            clearInterval(this.data.timeInterval);
            wx.closeSocket({
              success:(res)=>{
                console.log('WebSocket 已关闭！')
                this.setData({
                    wsConnect:false,
                    timeInterval:null
                })
              }
            })
        }
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