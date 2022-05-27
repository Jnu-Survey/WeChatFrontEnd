// pages/home/home.js
const checkWebp = require('../../common/detectWebp');
const getToken = require('../../common/getToken')
const app = getApp();
Page({
    /**
     * 页面的初始数据
     */
    data: {
        swiperItem:[],
        quickStartImg:'',
        myFormImg:'',
        margin:'',//轮播图上下margin
        apiServer:app.globalData.apiServer,
        proInfoWindow:app.globalData.proInfoWindow
    },


    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        this.swiperJump = [];
        this.buttonJump = [];
        // 动态设置首页的布局
        wx.getSystemInfo({
            success: (res) => {
                // 获取可使用窗口高度
                let clientHeight = res.windowHeight;
                let buttonHeight = 0;
                var query = wx.createSelectorQuery();
                query.select('.formEntry').boundingClientRect(function (rect) {
                    let clientHeight = rect.height;
                    let clientWidth = rect.width;
                    let ratio = clientWidth / 750;
                    buttonHeight = clientHeight * ratio;
                }).exec();
                // 设置margin
                this.setData({
                    margin: Math.floor((clientHeight-415-buttonHeight)/5) + 'rpx'
                });
            }
        });
        let that=this;
        wx.request({
            url: this.data.apiServer + '/home/swiperItem',
            success:(res)=>{
                let swiper = res.data.data.swapping;
                let quickStart = res.data.data.button[0];
                this.buttonJump[0] = res.data.data.button[0].jump;
                let myForm = res.data.data.button[1];
                this.buttonJump[1] = res.data.data.button[1].jump;
                if(!checkWebp.detectWebp()) {
                    swiper.forEach((item,index,arr)=>{
                        swiper[index].img = "https://img.hengyimonster.top"+swiper[index].img+".webp";
                        this.swiperJump.push(swiper[index].jump)
                    })
                    quickStart = "https://img.hengyimonster.top"+quickStart.img+".webp";
                    myForm = "https://img.hengyimonster.top"+myForm.img+".webp";
                }
                else {
                    swiper.forEach((item,index,arr)=>{
                        swiper[index].img="https://img.hengyimonster.top"+swiper[index].img+".png";
                        this.swiperJump.push(swiper[index].jump)
                    })
                    quickStart = "https://img.hengyimonster.top"+quickStart.img+".png";
                    myForm = "https://img.hengyimonster.top"+myForm.img+".png";
                }
                that.setData({
                    swiperItem:swiper,
                    quickStartImg:quickStart,
                    myFormImg:myForm
                })
            }
          })
    },

    //提取token进入页面
    goCreate() {
        getToken.checkToken().then(data=>{
            // 带着token进入选择的页面:data就是返回的token
            wx.navigateTo({
                url: this.buttonJump[0],
                fail(err) {
                    console.log("进入创建表单页面失败！",err);
                }
            })
        }).catch(error=>{
            //返回token失败
            console.log(error);
        })
    },

    // 进入我的表单页面
    goMyForm() {
        wx.navigateTo({
            url: this.buttonJump[1],
            fail(err) {
                console.log("进入我的表单页面失败！",err);
            }
        })
    },

    // 打开模板
    createScene:function(e) {
        let form = {};
        if(e.currentTarget.dataset.index===0) {
            form = {
                "name":"活动报名",
                "description":"请在此添加活动主题、活动时间和活动地址",
                "fields":[{"type":"name","title":"你的姓名","notes":"","typeName":"姓名","supportChoices":false,"validations":["presence"]},{"type":"phone","title":"你的手机","notes":"该手机号码用于活动当日签到使用","typeName":"电话","supportChoices":false,"validations":["presence"]},{"type":"multiple_choice","title":"本次活动你最感兴趣的部分是？","notes":"可多选","typeName":"多项选择","supportChoices":true,"choices":[{"value":"业内专业信息的宣讲"},{"value":"嘉宾的内容分享"},{"value":"结识更多的朋友"},{"value":"其他"}],"validations":[]},{"type":"single_choice","title":"您是通过什么渠道了解到活动信息的？","notes":"","typeName":"单项选择","supportChoices":true,"choices":[{"value":"朋友介绍"},{"value":"微信朋友圈"},{"value":"微博"},{"value":"宣传广告"},{"value":"其他"}],"validations":[]}]
            }
        }
        else if(e.currentTarget.dataset.index===1) {
            form = {
                "name":"疫情防控调查问卷",
                "description":"请在此输入调查背景和目的",
                "fields":[{"type":"name","title":"学生姓名","notes":"","typeName":"姓名","supportChoices":false,"validations":["presence"]},{"type":"phone","title":"家长电话号码","notes":"","typeName":"电话","supportChoices":false,"validations":["presence"]},{"type":"detail_location","title":"常住地址","notes":"","typeName":"位置","supportChoices":false,"validations":["presence"]},{"type":"multiple_choice","title":"上课时间段","notes":"可多选","typeName":"多项选择","supportChoices":true,"choices":[{"value":"周一"},{"value":"周二"},{"value":"周三"},{"value":"周四"},{"value":"周五"}],"validations":["presence"]},{"type":"single_choice","title":"是否收到7天3检要求？","notes":"","typeName":"单项选择","supportChoices":true,"choices":[{"value":"否"},{"value":"是"}],"validations":["presence"]},{"type":"attachment","title":"请上传健康码","notes":"","typeName":"上传文件","supportChoices":false,"max_file_quantity":1,"validations":["presence"]}]
            }
        }
        else if(e.currentTarget.dataset.index===2) {
            form = {
                "name":"创作类 | 优秀作文投票",
                "description":"请选出你心目中的优秀作文",
                "fields":[{"type":"single_choice","title":"优秀作文","notes":"只能投一票哦","typeName":"单项选择","supportChoices":true,"choices":[{"api_code":"天堂，在人间","value":"天堂，在人间"},{"api_code":"点亮万家灯火","value":"点亮万家灯火"},{"api_code":"智慧的境界","value":"智慧的境界"},{"api_code":"人生的变数","value":"人生的变数"}],"validations":["presence"]}]
            }
        }
        if(e.currentTarget.dataset.index===0 || e.currentTarget.dataset.index===1 || e.currentTarget.dataset.index===2) {
            wx.navigateTo({
                url: this.swiperJump[0]+'?form='.concat(JSON.stringify(form)),
                fail(err) {
                    console.log("进入模板详情页面失败！",err);
                }
            })
        }
        else if(e.currentTarget.dataset.index===3) {
            wx.navigateTo({
                url: this.swiperJump[3],
                fail(err) {
                    console.log("进入团队介绍页面失败！",err);
                }
            })
        }
        else if(e.currentTarget.dataset.index===4) {
            wx.navigateTo({
                url: this.swiperJump[4],
                fail(err) {
                    console.log("进入更新日志页面失败！",err);
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