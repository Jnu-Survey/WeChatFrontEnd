var e = require("../@babel/runtime/helpers/defineProperty"), t = require("../utils/storage"), a = require("../utils/storage-events"), i = getApp();

function n(e, t) {
    return e.filter(function(e) {
        return t === e.api_code;
    })[0];
}

function r(e, t, a) {
    var i = e.data.form.fields, r = n(i, t.currentTarget.dataset.apiCode || t.target.id.slice(6)), o = i.indexOf(r);
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
    dropDownChange: function(e, t) {
        r(e, t, function(e) {
            e.choices;
            var a = parseInt(t.detail.value, 10);
            e.choiceIndex = a;
        });
    },
    getCurrentLocation: function(e, t) {
        var a = t.currentTarget.dataset.apiCode, i = e.data.form.fields, r = n(i, a), o = i.indexOf(r);
        r.localizable_on_mobile ? wx.chooseLocation({
            success: function(t) {
                r.value = {
                    latitude: t.latitude,
                    longitude: t.longitude,
                    address: t.address.indexOf(t.name) < 0 ? t.address + t.name : t.address
                };
                var a = {};
                a["form.fields[" + o + "]"] = r, e.setData(a);
            }
        }) : wx.getLocation({
            type: "gcj02",
            success: function(t) {
                r.value = {
                    latitude: t.latitude,
                    longitude: t.longitude
                };
                var a = {};
                a["form.fields[" + o + "]"] = r, e.setData(a);
            }
        });
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
    chooseImage: function(e, t, a) {
        var i = t.currentTarget.dataset.apiCode, r = e.data.form.fields, o = n(r, i);
        o.files = o.files || [];
        var s = o.max_file_quantity - o.files.length;
        if (!(s <= 0)) {
            var f = e.data.form.token, u = r.indexOf(o);
            wx.chooseImage({
                count: s,
                sizeType: [ "original" ],
                success: function(t) {
                    var i = t.tempFilePaths.map(function(e) {
                        return {
                            path: e
                        };
                    });
                    if (o.files = o.files.concat(i), (n = {})["form.fields[" + u + "]"] = o, e.setData(n), 
                    a) {
                        i.forEach(function(e) {
                            e.attachment_id = "preview";
                        }), (n = {})["form.fields[" + u + "].files"] = o.files, e.setData(n);
                    } else {
                        var n, r = (e.data.form.processing || 0) + i.length;
                        (n = {})["form.fields[" + u + "].processing"] = i.length, n["form.processing"] = r, 
                        e.setData(n), c(e, i, f, o, u);
                    }
                }
            });
        }
    },
    previewImage: function(e, t) {
        var a = n(e.data.form.fields, t.currentTarget.dataset.apiCode).files.map(function(e) {
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