var e = require("../@babel/runtime/helpers/defineProperty"), t = require("../utils/storage"), a = require("../utils/storage-events"), i = getApp();
const getToken = require('../common/getToken');

function n(e, t ,l) {
    return e.filter(function(e) {
        return t === e.type && l === e.title;
    })[0];
}

function r(e, t, a) {
    var i = e.data.form.fields, r = n(i, t.target.dataset.apiCode || t.target.id.slice(6), t.currentTarget.dataset.title), o = i.indexOf(r);
    a.call(e, r);
    var c = {};
    c["form.fields[" + o + "]"] = r, e.setData(c);
}

function o(e, n, r, o, c) {
    var s = n.files.indexOf(o), f = [ Date.parse(new Date()), Math.ceil(1e3 * Math.random()), s ].join("_");
    wx.uploadFile({
        url: i.config.qiniuUploadURL,
        filePath: o.path,
        name: "file",
        formData: {
            token: r,
            "x:field_api_code": n.api_code,
            "x:timestamp_with_random_number": f
        },
        success: function(n) {
            var r = n.data, o = JSON.parse(r);
            !function(e, n, r) {
                wx.request({
                    url: i.config.baseUrl + "v2/forms/" + e + "/qiniu_entry_callbacks",
                    method: "POST",
                    header: {
                        gdsession: (0, t.getStorage)(a.GD_SESSEION),
                        Authorization: (0, t.getStorage)(a.TOKEN)
                    },
                    data: n,
                    success: function(e) {
                        r && r(e.data);
                    },
                    fail: function(e) {
                        console.error(e);
                    }
                });
            }(e, o, function(e) {
                c && c(s, e);
            });
        },
        fail: function(e) {
            console.error("error: " + JSON.stringify(e));
        }
    });
}

function c(e, n, r, s, f) {
    var u = n[0];
    !function(e, n) {
        wx.request({
            url: i.config.baseUrl + "v2/forms/" + e + "/qiniu_entry_tokens",
            method: "POST",
            header: {
                gdsession: (0, t.getStorage)(a.GD_SESSEION),
                Authorization: (0, t.getStorage)(a.TOKEN)
            },
            success: function(e) {
                var t = e.data.token;
                n && n(t);
            },
            fail: function(e) {
                console.error(e);
            }
        });
    }(r, function(t) {
        o(r, s, t, u, function(t, a) {
            u.attachment_id = a.attachment_id;
            var i = {};
            i["form.fields[" + f + "].files[" + t + "]"] = u, i["form.fields[" + f + "].processing"] = s.processing - 1, 
            i["form.processing"] = e.data.form.processing - 1, e.setData(i), n.length > 1 && c(e, n.slice(1, n.length), r, s, f);
        });
    });
}

module.exports = {
    radioClick: function(t, a) {
        var i = function(e) {
            return e.api_code === r;
        }, n = a.currentTarget.dataset.item, r = a.currentTarget.dataset.apiCode, o = t.data.form.fields.find(i), c = t.data.form.fields.findIndex(i);
        if (n && o) {
            var s = o.choices.find(function(e) {
                return e.value === n.value;
            });
            s.selected && (s.selected = !1);
            var f = "form.fields[".concat(c, "]");
            t.setData(e({}, "".concat(f), o));
        }
    },
    radioChange: function(e, t) {
        r(e, t, function(e) {
            e.choices.forEach(function(e, a) {
                e.selected = t.detail.value == (e.value || a);
            });
        });
    },
    checkboxChange: function(e, t) {
        e.data.form.fields.map((item)=>{
            if(item.type+' '+item.title===t.target.id) {
                r(e, t, function(e) {
                    item.choices.forEach(function(item, a) {
                        e.selected = t.detail.value;
                    });
                });
            }
        })
        r(e, t, function(e) {
            e.choices.forEach(function(e, a) {
                e.selected = t.detail.value.indexOf(e.value || "" + a) >= 0;
            });
        });
    },
    dateChange: function(e, t) {
        r(e, t, function(e) {
            e.value = t.detail.value;
        });
    },
    timeChange: function(e, t) {
        r(e, t, function(e) {
            e.value = t.detail.value;
        });
    },
    locationChange: function(e, t) {
        r(e, t, function(e) {
            e.value = t.detail.value;
        });
    },
    dropDownChange: function(e, t) {
        r(e, t, function(e) {
            e.choices;
            e.choiceIndex = parseInt(t.detail.value, 10);
        });
    },
    getCurrentLocation: function(e, t) {
        var a = t.currentTarget.dataset.apiCode, l = t.currentTarget.dataset.title, i = e.data.form.fields, r = n(i, a, l), o = i.indexOf(r); 
        wx.getSetting({
            success: (res) => {
              // res.authSetting['scope.userLocation'] == undefined    表示 初始化进入该页面
              // res.authSetting['scope.userLocation'] == false    表示 非初始化进入该页面,且未授权
              // res.authSetting['scope.userLocation'] == true    表示 地理位置授权
              if (res.authSetting['scope.userLocation'] == undefined || res.authSetting['scope.userLocation'] == false) {
                wx.showModal({
                  title: '请求授权当前位置',
                  content: '需要获取您的地理位置，请确认授权',
                  success: function (res) {
                    if (res.cancel) {
                      wx.showToast({
                        title: '拒绝授权',
                        icon: 'none',
                        duration: 1000
                      })
                    } else if (res.confirm) {
                      wx.openSetting({
                        success: function (dataAu) {
                          if (dataAu.authSetting["scope.userLocation"] == true) {
                            wx.showToast({
                              title: '授权成功',
                              icon: 'success',
                              duration: 1000
                            })
                            //再次授权
                            wx.chooseLocation({
                                success: function(t) {
                                    r.value = {
                                        latitude: t.latitude,
                                        longitude: t.longitude,
                                        address: t.address.indexOf(t.name) < 0 ? t.address + t.name : t.address
                                    };
                                    var a = {};
                                    a["form.fields[" + o + "]"] = r, e.setData(a);
                                    
                                },
                                fail:(err)=>{
                                    console.log("chooseLocation",err)
                                }
                            })
                          } else {
                            wx.showToast({
                              title: '授权失败',
                              icon: 'none',
                              duration: 1000
                            })
                          }
                        }
                      })
                    }
                  }
                })
              }
              else {
                wx.chooseLocation({
                    success: function(t) {
                        r.value = {
                            latitude: t.latitude,
                            longitude: t.longitude,
                            address: t.address.indexOf(t.name) < 0 ? t.address + t.name : t.address
                        };
                        var a = {};
                        a["form.fields[" + o + "]"] = r, e.setData(a);
                        
                    },
                    fail:(err)=>{
                        console.log("chooseLocation",err)
                    }
                })
              }
            }
          })
    },
    processFormData: function(e) {
        var t = {}, a = /^([^\[]+)\[(\w*)\]$/;
        for (var i in e) {
            var n = i.match(a);
            if (n) {
                var r = n[1], o = n[2];
                o ? (t[r] = t[r] || {}, t[r][o] = e[i]) : (t[r] = t[r] || [], t[r].push(e[i]));
            } else t[i] = e[i];
        }
        return t;
    },
    updateWeixinFields: function(e) {
        var i = (0, t.getStorage)(a.USERINFO), n = (0, t.getStorage)(a.OPENID);
        if (i && n) {
            e.x_field_weixin_openid = n, e.x_field_weixin_nickname = i.nickName, e.x_field_weixin_gender = [ "未知", "男", "女" ][i.gender], 
            e.x_field_weixin_country = i.country, e.x_field_weixin_province_city = {
                province: i.province,
                city: i.city
            }, e.x_field_weixin_headimgurl = i.avatarUrl;
        }
    },
    // 上传图片
    upLoadQiniup:function(token,filePath) {
        return new Promise((resolve,reject)=>{
            // 请求上传凭证
            wx.request({
                url: i.globalData.apiServer + '/person/getUpToken',
                data:{
                    token:token,
                    file_name:filePath
                },
                success:(res)=>{
                    wx.uploadFile({
                        url: i.globalData.qiniupRequest, //华东地区上传地址
                        filePath: filePath,
                        name: 'file',
                        formData:{
                            token: res.data.data.token,//刚刚获取的上传凭证
                            key: res.data.data.file_name//这里是为文件设置上传后的文件名
                        },
                        success: function(r){
                            var data = r.data;//七牛会返回一个包含hash值和key的JSON字符串
                            if(typeof data==='string') data = JSON.parse(data.trim());//解压缩
                            //拼接上你的七牛云空间域名
                            let img = i.globalData.qiniupDomain + '/' + data.key
                            resolve(img);
                        },
                        fail:function(err) {
                            console.log(err)
                            reject(err)
                        } 
                    })
                },
                fail:(err)=>{
                    console.log("获取凭证失败！",err)
                }
            })
        })
    },
    // 选择图片
    chooseImage: function(e, t, a) {
        let i = t.currentTarget.dataset.apiCode, l = t.currentTarget.dataset.title, r = e.data.form.fields;
        let o = n(r, i, l),u = r.indexOf(o);
        o.files = o.files || [];
        let that = this;
        wx.chooseImage({
            sizeType: [ "original","compressed" ],
            sourceType:["album","camera"],
            success: function (res) {
                let token = '';
                // 请求后端token
                getToken.checkToken().then(Token=>{
                    token = Token;
                    let filePath = res.tempFilePaths[0];
                    let filePathList = res.tempFilePaths;
                    let file_length = res.tempFilePaths.length;
                    let s = o.max_file_quantity - o.files.length - file_length; 
                    if(s>=0) {
                        // 将选择的图片上传服务器
                        let result = [];
                        wx.showLoading();
                        (async ()=>{
                            for(var j = 0; j < file_length; j++){
                                filePath = filePathList[j];
                                // 获取到图片链接
                                const imgPath = await that.upLoadQiniup(token,filePath);
                                result.push(imgPath);
                            }
                            o.files = result;
                            var a = {};
                            a["form.fields[" + u + "]"] = o, e.setData(a);
                            wx.hideLoading()
                        })();
                    }
                    else {
                        wx.showToast({
                          title: '最大上传文件数量为' + o.max_file_quantity,
                          icon:'none',
                          duration:3000
                        })
                    }
                }).catch(error=>{
                    //返回token失败
                    console.log(error);
                })
            }
          }
        )
    },
    previewImage: function(e, t) {
        var a = n(e.data.form.fields, t.currentTarget.dataset.apiCode,t.currentTarget.dataset.title).files.map(function(e) {
            return e.path;
        });
        wx.previewImage({
            current: t.currentTarget.dataset.src,
            urls: a
        });
    },
    entryAttachmentPreviewUrl: function(e) {
        var t = e.split("?");
        return t[0] + "@enlarge?" + t[1];
    },
    removeImage: function(e, t) {
        r(e, t, function(e) {
            e.removingImage = !0;
        });
    },
    doRemoveImage: function(e, t) {
        r(e, t, function(e) {
            var a = e.files.slice();
            a.splice(t.currentTarget.dataset.fileIndex, 1), e.files = a;
        });
    },
    revealRemove: function(e, t) {
        r(e, t, function(e) {
            e.removingImage = null;
        });
    },
    ratingChange: function(e, t) {
        var a = 0, i = e.data.form.fields.filter(function(e, i) {
            return e.api_code === t.currentTarget.dataset.field && (a = i), e.api_code === t.currentTarget.dataset.field;
        })[0];
        (i = Object.assign({}, i)).value === t.currentTarget.dataset.no ? i.value = "" : i.value = t.currentTarget.dataset.no;
        var n = {};
        n["form.fields[" + a + "]"] = i, e.setData(n);
    }
};