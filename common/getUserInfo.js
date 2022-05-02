async function getInfo(){
    let promise = new Promise((resolve,reject)=>{
        // 从本地缓存中获取用户基本信息
        wx.getStorage({
            key: "userInfo",
            encrypt: true, // 若开启加密存储，setStorage 和 getStorage 需要同时声明 encrypt 的值为 true
            success:(res) =>{
                // 用户信息存在
                if(res.data) {
                    resolve(res.data);
                };
            },
            // 用户信息不存在
            fail() {
                console.log("本地缓存检索不到用户信息");
            }
        })
    })
    return await promise;
}

module.exports = {
    getInfo
}
