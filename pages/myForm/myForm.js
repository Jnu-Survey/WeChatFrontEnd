// pages/myForm/myForm.js
const getToken = require('../../common/getToken')
const checkWebp = require('../../common/detectWebp');
const app = getApp();
import { throttle } from './util'
Page({
    /**
     * 页面的初始数据
     */
    data: {
        token:'',
        doingForm:[],//正在制作的表单列表
        doneForm: [],       // 制作完成的表单列表
        suitWebp:false,
        imgIconServer:app.globalData.imgIconServer,
        apiServer:app.globalData.apiServer,
        imgServer:app.globalData.imgServer,
        proInfoWindow:app.globalData.proInfoWindow,
        visualIndex: [0],          //  展示区域
        pageHeight: [],
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad(options) {
        this.index = 0;
        this.currentIndex = 0;           // 当前页数 pageNum
        this.pageHeight = [];            // 每屏高度存储
        this.alldoneForm = [];               // 获取到的所有数据
        this.systemHeight = 0;           // 屏幕高度
        this.visualIndex = [];           // 存储可视区域pageNum
    },

    // 获取屏幕高度
    getSystemInfo () {
    wx.getSystemInfo({
        success: (res) => {
        this.systemHeight = res.windowHeight;
        }
    })
    },

  // 获取每屏高度
    getPageHeight () {
        let that = this;
        let currentIndex = this.currentIndex;
        let query = wx.createSelectorQuery();
        query.select(`#item${currentIndex}`).boundingClientRect()
        query.exec(function (res) {
            that.pageHeight[currentIndex] = res[0].height;
            that.setData({
                pageHeight: that.pageHeight
            })
        })
    },

  // 滚动距离计算
    onPageScroll: throttle(function (e) {
        let pageScrollTop = e[0].scrollTop;
        let that = this;
        // 滚动计算现在处于哪一个分页的屏
        let scrollTop = 0;
        let currentIndex = this.currentIndex;
        for (var i = 0; i < this.pageHeight.length; i++) {
        scrollTop = scrollTop + this.pageHeight[i];
        if (scrollTop > pageScrollTop + this.systemHeight - 50) {
            this.currentIndex = i;
            this.visualIndex = [i - 1, i, i + 1];
            that.setData({
            visualIndex: this.visualIndex
            })
            break;
        }
        }
    }, 200),

      /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom() {        
        this.currentIndex++;            // 触底+1
        wx.showLoading({
          title: '正在加载中'
        })
        // 请求当前页表单
        wx.request({
            url: this.data.apiServer + '/my_form/formDone',
            method:'GET',
            data:{
                token:this.data.token,
                page:this.currentIndex+1
            },
            success:(res)=>{
                if(res.data.data.info) {
                    this.setData({
                        [`doneForm[${this.currentIndex}]`]: res.data.data.info
                      }, () => {
                        this.getPageHeight();
                        wx.hideLoading();
                        // 预请求下一页表单
                        wx.request({
                            url: this.data.apiServer + '/my_form/formDone',
                            method:'GET',
                            data:{
                                token:this.data.token,
                                page:this.currentIndex+2
                            },
                            success:(res)=>{
                                if(res.data.data.info) {
                                    this.setData({
                                        [`doneForm[${this.currentIndex+1}]`]: res.data.data.info
                                      }, () => {
                                        this.getPageHeight();
                                      })
                                }
                                else if(res.data.data.msg==='没查到相关记录') {
                                    wx.hideLoading();
                                        wx.showToast({
                                            title: '无更多表单!',
                                            icon:'error',
                                            duration:4000
                                        })
                                }
                            },
                            fail:(err)=>{
                                console.log("onReachBottom预请求表单失败！",err)
                            }
                        })
                      })
                }
                else if(res.data.data.msg==='没查到相关记录') {
                    wx.hideLoading();
                    wx.showToast({
                      title: '无更多表单!',
                      icon:'error',
                      duration:3000
                    })
                }
            },
            fail:(err)=>{
                console.log("请求当前页表单失败",err)
            }
        })
    },

    // 请求制作完成的所有表单
    fetchDoneForm(){
        wx.request({
            url: this.data.apiServer + '/my_form/formDone',
            method:'GET',
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
                            this.fetchDoneForm();
                        })
                    }
                }
                else {
                    this.setData({
                        'doneForm[0]':res.data.data.info
                    })
                    this.getPageHeight();
                    this.getSystemInfo();
                    let list = []
                    wx.request({
                        url: this.data.apiServer + '/my_form/formDone',
                        method:'GET',
                        data:{
                            token:this.data.token,
                            page:2
                        },
                        success:(res)=>{
                            if(res.data.data.info) {
                                this.setData({
                                    'doneForm[1]': res.data.data.info
                                  }, () => {
                                    this.getPageHeight();
                                  })
                            }
                        },
                        fail:(err)=>{
                            console.log("fetchDoneForm预请求表单失败！",err)
                        }
                    })
                }
                console.log("制作完成表单",res)
                wx.stopPullDownRefresh();
            }
        })
    },


    // 获取正在制作的表单
    getDoing:function() {
        wx.request({
            url: this.data.apiServer + '/my_form/formDoing',
            method:'GET',
            data:{
                token:this.data.token
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
                            this.getDoing();
                        })
                    }
                }
                else {
                    this.setData({
                        doingForm:res.data.data.info
                    })
                }
                console.log("正在进行中的表单",res)
                wx.stopPullDownRefresh();
            }
        })
    },
    
    checkWebpImg() {
        this.setData({
            suitWebp:checkWebp.detectWebp()
        })
    },

    // 打开表单
    openForm(e) {
        let formData = this.data.doingForm[e.currentTarget.dataset.index];
        wx.request({
          url: this.data.apiServer + '/my_form/detailDoing',
          method:'GET',
          data:{
              token:this.data.token,
              order:formData.FormId
          },
          success:(res)=>{
              let form = JSON.parse(res.data.data)
              form.fields.map((item) => {
                    if(item.type.indexOf('-')!==-1) {
                        return item.type = item.type.slice(0,item.type.indexOf('-'));
                    }
            })
              wx.navigateTo({
                    url: "/pages/create-form/create-form?formID=" + formData.FormId +'&form=' + JSON.stringify(form) + '&status=' + 1,
                    fail:(err)=>{
                        console.log("查看表单失败")
                    }
                });
          }
        })
    },

    // 跳转到查看数据页面
    dataView(e) {
        let formData = this.data.doneForm[e.currentTarget.dataset.pageNum][e.currentTarget.dataset.index];
        wx.navigateTo({
            url: '/pages/recordDetails/recordDetails?formId='.concat(formData.FormId)
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
        getToken.checkToken().then(Token=>{
            this.setData({
                token:Token
            })
            this.fetchDoneForm()
            this.getDoing()
        }).catch(error=>{
            //返回token失败
            console.log(error);
        })
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
        this.fetchDoneForm()
        this.getDoing()
    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage() {

    }
})