// app.js
App({
    globalData: {
        currentEditField: null,
        currentEditFieldIndex: void 0,
        proInfoWindow:false,                                 // 全局幕布
        // 以下需要开发者自行配置
        apiServer:'',             // 请求后端服务器地址
        imgServer:'',             // cdn图片服务器网址（建议把图片放在这里）
        imgIconServer:'',             // cdn图片icon文件夹服务器网址（建议把icon放在这个文件夹下）
        qiniupRequest:'',             // 七牛云地区上传地址（华东、华南等地区不同地址）
        qiniupDomain:'',             // 七牛云空间域名
        wsServer:''                 //websocket服务器地址
    },
    onLaunch() {
    }
  })
  require("./assets/lib/pubsub")