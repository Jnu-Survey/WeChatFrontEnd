const app = getApp();
// 重新获取用户信息请求token
async function userRequest() {
    let promise = new Promise((resolve,reject)=>{
        app.globalData.proInfoWindow = true;
        // 重新获取用户信息
        wx.showModal({
            title: '请求用户信息',
            content: '暨数据请求获取您的用户信息以用于后续的流程',
            success (res) {
                if (res.confirm) {
                    // 获取用户基本信息
                    wx.getUserProfile({
                        desc: '展示用户信息', // 声明获取用户个人信息后的用途，后续会展示在弹窗中，请谨慎填写
                        success:(info)=>{
                            let UserInfo=info.userInfo;
                            //本地存储用户信息
                            wx.setStorage({
                                key: "userInfo",
                                data: UserInfo,
                                encrypt: true, // 开启加密存储
                                fail(err) {
                                    reject("用户信息缓存本地失败！",err);
                                }
                            })
                            // 获取登录凭证
                            wx.login({
                                success (res) {
                                    if (res.code) {
                                        // 发起网络请求
                                        wx.request({
                                            url: app.globalData.apiServer + '/login/dealLogin',
                                            method:"POST",
                                            data:{
                                                avatarUrl:UserInfo.avatarUrl,
                                                city:UserInfo.city,
                                                code:res.code,
                                                country:UserInfo.country,
                                                gender:UserInfo.gender,  //性别 0：未知、1：男、2：女
                                                nickName:UserInfo.nickName,
                                                province:UserInfo.province
                                            },
                                            success:(res)=>{
                                                if(res.data.errno!==0) {
                                                    wx.showToast({
                                                        title: res.data.errmsg,
                                                        icon:'none',
                                                        duration:5000
                                                    })
                                                }
                                                // 开启加密存储
                                                else if(res.data.data.token) {
                                                    wx.setStorage({
                                                        key: "token",
                                                        data: res.data.data.token,
                                                        encrypt: false, // 开启加密存储
                                                        fail(err) {
                                                            reject("token缓存本地失败！",err);
                                                        }
                                                    })
                                                    let Token = res.data.data.token;
                                                    resolve(Token);
                                                }
                                                else {
                                                    reject("获取token失败！");
                                                }
                                            },
                                            fail(err){
                                                reject("网络请求失败！",err);
                                            }
                                            })
                                    } 
                                    else {
                                        reject('获取登陆凭证失败' + res.errMsg);
                                    }
                                }
                            })
                        },
                        fail:(err)=>{
                            console.log("err",err)
                        }
                    })
                } 
                else if (res.cancel) {
                    wx.showToast({
                        title: '已取消',
                        icon:'error'
                    })
                }
                app.globalData.proInfoWindow = false;
            }
        })
    })
    return await promise;
}
// 从localStorage获取token
async function checkToken(){
    let Token='';
    let UserInfo={};
    let promise = new Promise((resolve,reject)=>{
        // 判断用户token是否存在，存在则返回token，不存在则申请token保存本地后返回token
        wx.getStorage({
            key: "token",
            encrypt: false, // 若开启加密存储，setStorage 和 getStorage 需要同时声明 encrypt 的值为 true
            success:(res) =>{
                // token字段不为空
                if(res.data) {
                    Token = res.data;
                    resolve(Token);
                }
                // token字符串为空
                else {
                    console.log("token字符串为空")
                    userRequest().then(res=>{
                        if(res) {
                            resolve(res);
                        }
                        else {
                            reject("重新获取token失败！")
                        }
                    })
                }
            },
            // 获取本地缓存失败
            fail() {
                userRequest().then(res=>{
                    if(res) {
                        resolve(res);
                    }
                    else {
                        reject("重新获取token失败！")
                    }
                })
            }
        })
    })
    return await promise;
}

module.exports = {
    checkToken,
    userRequest
}
