async function checkToken(){
    let Token='';
    let UserInfo={};
    let promise = new Promise((resolve,reject)=>{
        // 判断用户token是否存在，存在则返回token，不存在则申请token保存本地后返回token
        wx.getStorage({
            key: "token",
            encrypt: true, // 若开启加密存储，setStorage 和 getStorage 需要同时声明 encrypt 的值为 true
            success:(res) =>{
                // token存在
                if(res.data) {
                    Token = res.data;
                    resolve(Token);
                }
                // token字符串为空
                else {
                    // 获取用户基本信息
                    wx.getUserProfile({
                        desc: '展示用户信息', // 声明获取用户个人信息后的用途，后续会展示在弹窗中，请谨慎填写
                        success:(info)=>{
                            UserInfo=info.userInfo;
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
                                            url: 'https://api.hengyimonster.top/login/dealLogin',
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
                                                // 开启加密存储
                                                if(res.data.data.token) {
                                                    wx.setStorage({
                                                        key: "token",
                                                        data: res.data.data.token,
                                                        encrypt: true, // 开启加密存储
                                                        fail(err) {
                                                            reject("token缓存本地失败！",err);
                                                        }
                                                    })
                                                    Token = res.data.data.token;
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
                        }
                    })
                }
            },
            // token不存在
            fail() {
                // 获取用户基本信息
                wx.getUserProfile({
                    desc: '展示用户信息', // 声明获取用户个人信息后的用途，后续会展示在弹窗中，请谨慎填写
                    success:(info)=>{
                        UserInfo=info.userInfo;
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
                                        url: 'https://api.hengyimonster.top/login/dealLogin',
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
                                            // 开启加密存储
                                            if(res.data.data.token) {
                                                wx.setStorage({
                                                    key: "token",
                                                    data: res.data.data.token,
                                                    encrypt: true, // 开启加密存储
                                                    fail(err) {
                                                        reject("token缓存本地失败！",err);
                                                    }
                                                })
                                                Token = res.data.data.token;
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
                    }
                })
            }
        })
    })
    return await promise;
}

module.exports = {
    checkToken
}
