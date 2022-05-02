var e = require("../@babel/runtime/helpers/typeof");

!function(n) {
    if ("object" == ("undefined" == typeof exports ? "undefined" : e(exports)) && "undefined" != typeof module) module.exports = n(); else if ("function" == typeof define && define.amd) define([], n); else {
        ("undefined" != typeof window ? window : "undefined" != typeof global ? global : "undefined" != typeof self ? self : this).pingpp = n();
    }
}(function() {
    return function e(n, t, a) {
        function r(o, l) {
            if (!t[o]) {
                if (!n[o]) {
                    var c = "function" == typeof require && require;
                    if (!l && c) return c(o, !0);
                    if (i) return i(o, !0);
                    var s = new Error("Cannot find module '" + o + "'");
                    throw s.code = "MODULE_NOT_FOUND", s;
                }
                var d = t[o] = {
                    exports: {}
                };
                n[o][0].call(d.exports, function(e) {
                    var t = n[o][1][e];
                    return r(t || e);
                }, d, d.exports, e, n, t, a);
            }
            return t[o].exports;
        }
        for (var i = "function" == typeof require && require, o = 0; o < a.length; o++) r(a[o]);
        return r;
    }({
        1: [ function(e, n, t) {
            var a = e("./payment_elements.js");
            n.exports = {
                userCallback: void 0,
                innerCallback: function(e, n) {
                    "function" == typeof this.userCallback && (void 0 === n && (n = this.error()), this.userCallback(e, n), 
                    this.userCallback = void 0, a.clear());
                },
                error: function(e, n) {
                    return {
                        msg: e = void 0 === e ? "" : e,
                        extra: n = void 0 === n ? "" : n
                    };
                }
            };
        }, {
            "./payment_elements.js": 23
        } ],
        2: [ function(e, n, t) {
            var a = e("../utils"), r = {}.hasOwnProperty;
            n.exports = {
                ALIPAY_PC_DIRECT_URL: "https://mapi.alipay.com/gateway.do",
                handleCharge: function(e) {
                    var n = e.channel, t = e.credential[n], i = this.ALIPAY_PC_DIRECT_URL;
                    r.call(t, "channel_url") && (i = t.channel_url), r.call(t, "_input_charset") || (t._input_charset = "utf-8");
                    var o = a.stringifyData(t, n, !0);
                    a.redirectTo(i + "?" + o);
                }
            };
        }, {
            "../utils": 26
        } ],
        3: [ function(e, n, t) {
            var a = e("../utils"), r = e("../mods"), i = {}.hasOwnProperty;
            n.exports = {
                ALIPAY_WAP_URL_OLD: "https://wappaygw.alipay.com/service/rest.htm",
                ALIPAY_WAP_URL: "https://mapi.alipay.com/gateway.do",
                handleCharge: function(e) {
                    var n = e.channel, t = e.credential[n], o = this.ALIPAY_WAP_URL;
                    i.call(t, "req_data") ? o = this.ALIPAY_WAP_URL_OLD : i.call(t, "channel_url") && (o = t.channel_url), 
                    i.call(t, "_input_charset") || (i.call(t, "service") && "alipay.wap.create.direct.pay.by.user" === t.service || i.call(t, "req_data")) && (t._input_charset = "utf-8");
                    var l = o + "?" + a.stringifyData(t, n, !0), c = r.getExtraModule("ap");
                    a.inWeixin() && void 0 !== c ? c.pay(l) : a.redirectTo(l);
                }
            };
        }, {
            "../mods": 22,
            "../utils": 26
        } ],
        4: [ function(e, n, t) {
            var a = e("../utils"), r = e("../callbacks"), i = {}.hasOwnProperty;
            n.exports = {
                handleCharge: function(e) {
                    var n = e.channel, t = e.credential[n];
                    return i.call(t, "url") ? void a.redirectTo(t.url + "?" + a.stringifyData(t, n)) : void r.innerCallback("fail", r.error("invalid_credential", "missing_field:url"));
                }
            };
        }, {
            "../callbacks": 1,
            "../utils": 26
        } ],
        5: [ function(e, n, t) {
            var a = e("../../utils"), r = e("../../callbacks"), i = {}.hasOwnProperty;
            n.exports = {
                handleCharge: function(e) {
                    var n, t = e.credential[e.channel];
                    if ("string" == typeof t) n = t; else {
                        if (!i.call(t, "url")) return void r.innerCallback("fail", r.error("invalid_credential", "credential format is incorrect"));
                        n = t.url;
                    }
                    a.redirectTo(n);
                }
            };
        }, {
            "../../callbacks": 1,
            "../../utils": 26
        } ],
        6: [ function(e, n, t) {
            var a = e("../utils");
            n.exports = {
                CP_B2B_URL: "https://payment.chinapay.com/CTITS/service/rest/page/nref/000000000017/0/0/0/0/0",
                handleCharge: function(e) {
                    var n = e.credential[e.channel];
                    a.formSubmit(this.CP_B2B_URL, "post", n);
                }
            };
        }, {
            "../utils": 26
        } ],
        7: [ function(e, n, t) {
            var a = e("../../stash"), r = {}.hasOwnProperty;
            !function() {
                var e = {}, t = {
                    PADCHAR: "=",
                    ALPHA: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/",
                    makeDOMException: function() {
                        try {
                            return new DOMException(DOMException.INVALID_CHARACTER_ERR);
                        } catch (n) {
                            var e = new Error("DOM Exception 5");
                            return e.code = e.number = 5, e.name = e.description = "INVALID_CHARACTER_ERR", 
                            e.toString = function() {
                                return "Error: " + e.name + ": " + e.message;
                            }, e;
                        }
                    },
                    getbyte64: function(e, n) {
                        var a = t.ALPHA.indexOf(e.charAt(n));
                        if (-1 === a) throw t.makeDOMException();
                        return a;
                    },
                    decode: function(e) {
                        e = "" + e;
                        var n, a, r, i = t.getbyte64, o = e.length;
                        if (0 === o) return e;
                        if (o % 4 != 0) throw t.makeDOMException();
                        n = 0, e.charAt(o - 1) === t.PADCHAR && (n = 1, e.charAt(o - 2) === t.PADCHAR && (n = 2), 
                        o -= 4);
                        var l = [];
                        for (a = 0; a < o; a += 4) r = i(e, a) << 18 | i(e, a + 1) << 12 | i(e, a + 2) << 6 | i(e, a + 3), 
                        l.push(String.fromCharCode(r >> 16, r >> 8 & 255, 255 & r));
                        switch (n) {
                          case 1:
                            r = i(e, a) << 18 | i(e, a + 1) << 12 | i(e, a + 2) << 6, l.push(String.fromCharCode(r >> 16, r >> 8 & 255));
                            break;

                          case 2:
                            r = i(e, a) << 18 | i(e, a + 1) << 12, l.push(String.fromCharCode(r >> 16));
                        }
                        return l.join("");
                    },
                    getbyte: function(e, n) {
                        var a = e.charCodeAt(n);
                        if (a > 255) throw t.makeDOMException();
                        return a;
                    },
                    encode: function(e) {
                        if (1 !== arguments.length) throw new SyntaxError("Not enough arguments");
                        var n, a, r = t.PADCHAR, i = t.ALPHA, o = t.getbyte, l = [], c = (e = "" + e).length - e.length % 3;
                        if (0 === e.length) return e;
                        for (n = 0; n < c; n += 3) a = o(e, n) << 16 | o(e, n + 1) << 8 | o(e, n + 2), l.push(i.charAt(a >> 18)), 
                        l.push(i.charAt(a >> 12 & 63)), l.push(i.charAt(a >> 6 & 63)), l.push(i.charAt(63 & a));
                        switch (e.length - c) {
                          case 1:
                            a = o(e, n) << 16, l.push(i.charAt(a >> 18) + i.charAt(a >> 12 & 63) + r + r);
                            break;

                          case 2:
                            a = o(e, n) << 16 | o(e, n + 1) << 8, l.push(i.charAt(a >> 18) + i.charAt(a >> 12 & 63) + i.charAt(a >> 6 & 63) + r);
                        }
                        return l.join("");
                    }
                };
                e.url = "pay.htm", e.pay = function(n) {
                    var i = encodeURIComponent(t.encode(n));
                    r.call(a, "APURL") && (e.url = a.APURL), location.href = e.url + "?goto=" + i;
                }, e.decode = function(e) {
                    return t.decode(decodeURIComponent(e));
                }, n.exports = e;
            }();
        }, {
            "../../stash": 24
        } ],
        8: [ function(e, n, t) {
            var a = e("./commons/redirect_base");
            n.exports = {
                handleCharge: function(e) {
                    a.handleCharge(e);
                }
            };
        }, {
            "./commons/redirect_base": 5
        } ],
        9: [ function(e, n, t) {
            arguments[4][8][0].apply(t, arguments);
        }, {
            "./commons/redirect_base": 5,
            dup: 8
        } ],
        10: [ function(e, n, t) {
            var a = e("../utils"), r = {}.hasOwnProperty;
            n.exports = {
                JDPAY_WAP_URL_OLD: "https://m.jdpay.com/wepay/web/pay",
                JDPAY_H5_URL: "https://h5pay.jd.com/jdpay/saveOrder",
                JDPAY_PC_URL: "https://wepay.jd.com/jdpay/saveOrder",
                handleCharge: function(e) {
                    var n = e.credential[e.channel], t = this.JDPAY_H5_URL;
                    r.call(n, "channelUrl") ? (t = n.channelUrl, delete n.channelUrl) : r.call(n, "merchantRemark") && (t = this.JDPAY_WAP_URL_OLD), 
                    a.formSubmit(t, "post", n);
                }
            };
        }, {
            "../utils": 26
        } ],
        11: [ function(e, n, t) {
            var a = e("../callbacks"), r = e("../utils"), i = e("../stash"), o = {}.hasOwnProperty;
            n.exports = {
                SRC_URL: "http://pub.idqqimg.com/qqmobile/qqapi.js?_bid=152",
                ID: "mqq_api",
                handleCharge: function(e) {
                    var n = e.credential[e.channel];
                    return o.call(n, "token_id") ? (i.tokenId = n.token_id, void r.loadUrlJs(this.ID, this.SRC_URL, this.callpay)) : void a.innerCallback("fail", a.error("invalid_credential", "missing_token_id"));
                },
                callpay: function() {
                    if ("undefined" != typeof mqq) {
                        if (0 == mqq.QQVersion) return a.innerCallback("fail", "Not in the QQ client"), 
                        void delete i.tokenId;
                        mqq.tenpay.pay({
                            tokenId: i.tokenId
                        }, a.userCallback);
                    } else a.innerCallback("fail", "network_err");
                    delete i.tokenId;
                }
            };
        }, {
            "../callbacks": 1,
            "../stash": 24,
            "../utils": 26
        } ],
        12: [ function(e, n, t) {
            var a = e("../utils");
            n.exports = {
                UPACP_PC_URL: "https://gateway.95516.com/gateway/api/frontTransReq.do",
                handleCharge: function(e) {
                    var n = e.credential[e.channel];
                    a.formSubmit(this.UPACP_PC_URL, "post", n);
                }
            };
        }, {
            "../utils": 26
        } ],
        13: [ function(e, n, t) {
            var a = e("../utils");
            n.exports = {
                UPACP_WAP_URL: "https://gateway.95516.com/gateway/api/frontTransReq.do",
                handleCharge: function(e) {
                    var n = e.credential[e.channel];
                    a.formSubmit(this.UPACP_WAP_URL, "post", n);
                }
            };
        }, {
            "../utils": 26
        } ],
        14: [ function(e, n, t) {
            var a = e("../stash"), r = e("../callbacks"), i = {}.hasOwnProperty;
            n.exports = {
                handleCharge: function(e) {
                    for (var n = e.credential[e.channel], t = [ "appId", "timeStamp", "nonceStr", "package", "signType", "paySign" ], o = 0; o < t.length; o++) if (!i.call(n, t[o])) return void r.innerCallback("fail", r.error("invalid_credential", "missing_field_" + t[o]));
                    a.jsApiParameters = n, this.callpay();
                },
                wxLiteEnabled: function() {
                    return "undefined" != typeof wx && wx.requestPayment;
                },
                callpay: function() {
                    if (this.wxLiteEnabled()) {
                        var e = a.jsApiParameters;
                        delete e.appId, e.complete = function(e) {
                            "requestPayment:ok" === e.errMsg && r.innerCallback("success"), "requestPayment:cancel" === e.errMsg && r.innerCallback("cancel", r.error("用户取消支付")), 
                            "undefined" !== e.err_code && "undefined" !== e.err_desc && r.innerCallback("fail", r.error(e.err_desc, e));
                        }, wx.requestPayment(e);
                    } else console.log("请在微信小程序中打开");
                },
                runTestMode: function(e) {
                    wx.showModal({
                        title: "提示",
                        content: '因 "微信小程序" 限制 域名的原因 暂不支持 模拟付款 请使用 livekey 获取 charge 进行支付'
                    });
                }
            };
        }, {
            "../callbacks": 1,
            "../stash": 24
        } ],
        15: [ function(e, n, t) {
            var a = e("../callbacks"), r = e("../utils"), i = e("../stash"), o = e("../mods"), l = {}.hasOwnProperty;
            n.exports = {
                PINGPP_NOTIFY_URL_BASE: "https://api.pingxx.com/notify",
                handleCharge: function(e) {
                    for (var n = e.credential[e.channel], t = [ "appId", "timeStamp", "nonceStr", "package", "signType", "paySign" ], r = 0; r < t.length; r++) if (!l.call(n, t[r])) return void a.innerCallback("fail", a.error("invalid_credential", "missing_field_" + t[r]));
                    i.jsApiParameters = n, this.callpay();
                },
                callpay: function() {
                    var e = this, n = o.getExtraModule("wx_jssdk");
                    if (void 0 !== n && n.jssdkEnabled()) n.callpay(); else if ("undefined" == typeof WeixinJSBridge) {
                        var t = function() {
                            e.jsApiCall();
                        };
                        document.addEventListener ? document.addEventListener("WeixinJSBridgeReady", t, !1) : document.attachEvent && (document.attachEvent("WeixinJSBridgeReady", t), 
                        document.attachEvent("onWeixinJSBridgeReady", t));
                    } else this.jsApiCall();
                },
                jsApiCall: function() {
                    l.call(i, "jsApiParameters") && WeixinJSBridge.invoke("getBrandWCPayRequest", i.jsApiParameters, function(e) {
                        delete i.jsApiParameters, "get_brand_wcpay_request:ok" == e.err_msg ? a.innerCallback("success") : "get_brand_wcpay_request:cancel" == e.err_msg ? a.innerCallback("cancel") : a.innerCallback("fail", a.error("wx_result_fail", e.err_msg));
                    });
                },
                runTestMode: function(e) {
                    if (confirm("模拟付款？")) {
                        var n = (null === e.or_id ? "" : "/orders/" + e.or_id) + "/charges/" + e.id;
                        r.request(this.PINGPP_NOTIFY_URL_BASE + n + "?livemode=false", "GET", null, function(e, n) {
                            if (n >= 200 && n < 400 && "success" == e) a.innerCallback("success"); else {
                                var t = "http_code:" + n + ";response:" + e;
                                a.innerCallback("fail", a.error("testmode_notify_fail", t));
                            }
                        }, function() {
                            a.innerCallback("fail", a.error("network_err"));
                        });
                    }
                }
            };
        }, {
            "../callbacks": 1,
            "../mods": 22,
            "../stash": 24,
            "../utils": 26
        } ],
        16: [ function(n, t, a) {
            var r = n("../utils"), i = n("../callbacks"), o = {}.hasOwnProperty;
            t.exports = {
                handleCharge: function(n) {
                    var t = n.credential[n.channel];
                    "string" == typeof t ? r.redirectTo(t) : "object" == e(t) && o.call(t, "url") ? r.redirectTo(t.url) : i.innerCallback("fail", i.error("invalid_credential", "credential 格式不正确"));
                }
            };
        }, {
            "../callbacks": 1,
            "../utils": 26
        } ],
        17: [ function(e, n, t) {
            var a = e("../utils"), r = e("../callbacks"), i = {}.hasOwnProperty;
            n.exports = {
                YEEPAY_WAP_URL: "https://ok.yeepay.com/paymobile/api/pay/request",
                YEEPAY_WAP_TEST_URL: "http://mobiletest.yeepay.com/paymobile/api/pay/request",
                handleCharge: function(e) {
                    for (var n = e.channel, t = e.credential[n], o = [ "merchantaccount", "encryptkey", "data" ], l = 0; l < o.length; l++) if (!i.call(t, o[l])) return void r.innerCallback("fail", r.error("invalid_credential", "missing_field_" + o[l]));
                    var c;
                    c = i.call(t, "mode") && "test" == t.mode ? this.YEEPAY_WAP_TEST_URL : this.YEEPAY_WAP_URL, 
                    a.redirectTo(c + "?" + a.stringifyData(t, n, !0));
                }
            };
        }, {
            "../callbacks": 1,
            "../utils": 26
        } ],
        18: [ function(e, n, t) {
            var a = e("./utils"), r = e("./stash"), i = e("./libs/md5"), o = {
                seperator: "###",
                limit: 1,
                report_url: "https://statistics.pingxx.com/one_stats",
                timeout: 100
            }, l = function(e, n) {
                var t = new RegExp("(^|&)" + n + "=([^&]*)(&|$)", "i"), a = e.substr(0).match(t);
                return null !== a ? unescape(a[2]) : null;
            };
            o.store = function(e) {
                if ("undefined" != typeof localStorage && null !== localStorage) {
                    var n = {};
                    n.app_id = e.app_id || r.app_id || "app_not_defined", n.ch_id = e.ch_id || "", n.channel = e.channel || "", 
                    n.type = e.type || "", n.user_agent = navigator.userAgent, n.host = window.location.host, 
                    n.time = new Date().getTime(), n.puid = r.puid;
                    var t = "app_id=" + n.app_id + "&channel=" + n.channel + "&ch_id=" + n.ch_id + "&host=" + n.host + "&time=" + n.time + "&type=" + n.type + "&user_agent=" + n.user_agent + "&puid=" + n.puid, a = t;
                    null !== localStorage.getItem("PPP_ONE_STATS") && 0 !== localStorage.getItem("PPP_ONE_STATS").length && (a = localStorage.getItem("PPP_ONE_STATS") + this.seperator + t);
                    try {
                        localStorage.setItem("PPP_ONE_STATS", a);
                    } catch (e) {}
                }
            }, o.send = function() {
                if ("undefined" != typeof localStorage && null !== localStorage) {
                    var e = this, n = localStorage.getItem("PPP_ONE_STATS");
                    if (!(null === n || n.split(e.seperator).length < e.limit)) try {
                        for (var t = [], r = n.split(e.seperator), o = i(r.join("&")), c = 0; c < r.length; c++) t.push({
                            app_id: l(r[c], "app_id"),
                            channel: l(r[c], "channel"),
                            ch_id: l(r[c], "ch_id"),
                            host: l(r[c], "host"),
                            time: l(r[c], "time"),
                            type: l(r[c], "type"),
                            user_agent: l(r[c], "user_agent"),
                            puid: l(r[c], "puid")
                        });
                        a.request(e.report_url, "POST", t, function(e, n) {
                            200 == n && localStorage.removeItem("PPP_ONE_STATS");
                        }, void 0, {
                            "X-Pingpp-Report-Token": o
                        });
                    } catch (e) {}
                }
            }, o.report = function(e) {
                var n = this;
                n.store(e), setTimeout(function() {
                    n.send();
                }, n.timeout);
            }, n.exports = o;
        }, {
            "./libs/md5": 20,
            "./stash": 24,
            "./utils": 26
        } ],
        19: [ function(e, n, t) {
            var a = e("./stash"), r = e("./utils"), i = e("./collection");
            n.exports = {
                SRC_URL: "https://cookie.pingxx.com",
                init: function() {
                    var e = this;
                    r.documentReady(function() {
                        e.initPuid();
                    });
                },
                initPuid: function() {
                    if ("undefined" != typeof window && "undefined" != typeof localStorage) {
                        var e = localStorage.getItem("pingpp_uid");
                        if (null === e) {
                            e = r.randomString();
                            try {
                                localStorage.setItem("pingpp_uid", e);
                            } catch (e) {}
                        }
                        if (a.puid = e, !document.getElementById("p_analyse_iframe")) {
                            var n = document.createElement("iframe");
                            n.id = "p_analyse_iframe", n.src = this.SRC_URL + "/?puid=" + e, n.style.display = "none", 
                            document.body.appendChild(n);
                        }
                        setTimeout(function() {
                            i.send();
                        }, 0);
                    }
                }
            };
        }, {
            "./collection": 18,
            "./stash": 24,
            "./utils": 26
        } ],
        20: [ function(e, n, t) {
            !function() {
                function e(e, n) {
                    var t = (65535 & e) + (65535 & n);
                    return (e >> 16) + (n >> 16) + (t >> 16) << 16 | 65535 & t;
                }
                function t(n, t, a, r, i, o) {
                    return e(function(e, n) {
                        return e << n | e >>> 32 - n;
                    }(e(e(t, n), e(r, o)), i), a);
                }
                function a(e, n, a, r, i, o, l) {
                    return t(n & a | ~n & r, e, n, i, o, l);
                }
                function r(e, n, a, r, i, o, l) {
                    return t(n & r | a & ~r, e, n, i, o, l);
                }
                function i(e, n, a, r, i, o, l) {
                    return t(n ^ a ^ r, e, n, i, o, l);
                }
                function o(e, n, a, r, i, o, l) {
                    return t(a ^ (n | ~r), e, n, i, o, l);
                }
                function l(n, t) {
                    n[t >> 5] |= 128 << t % 32, n[14 + (t + 64 >>> 9 << 4)] = t;
                    var l, c, s, d, u, p = 1732584193, f = -271733879, h = -1732584194, _ = 271733878;
                    for (l = 0; l < n.length; l += 16) c = p, s = f, d = h, u = _, p = a(p, f, h, _, n[l], 7, -680876936), 
                    _ = a(_, p, f, h, n[l + 1], 12, -389564586), h = a(h, _, p, f, n[l + 2], 17, 606105819), 
                    f = a(f, h, _, p, n[l + 3], 22, -1044525330), p = a(p, f, h, _, n[l + 4], 7, -176418897), 
                    _ = a(_, p, f, h, n[l + 5], 12, 1200080426), h = a(h, _, p, f, n[l + 6], 17, -1473231341), 
                    f = a(f, h, _, p, n[l + 7], 22, -45705983), p = a(p, f, h, _, n[l + 8], 7, 1770035416), 
                    _ = a(_, p, f, h, n[l + 9], 12, -1958414417), h = a(h, _, p, f, n[l + 10], 17, -42063), 
                    f = a(f, h, _, p, n[l + 11], 22, -1990404162), p = a(p, f, h, _, n[l + 12], 7, 1804603682), 
                    _ = a(_, p, f, h, n[l + 13], 12, -40341101), h = a(h, _, p, f, n[l + 14], 17, -1502002290), 
                    p = r(p, f = a(f, h, _, p, n[l + 15], 22, 1236535329), h, _, n[l + 1], 5, -165796510), 
                    _ = r(_, p, f, h, n[l + 6], 9, -1069501632), h = r(h, _, p, f, n[l + 11], 14, 643717713), 
                    f = r(f, h, _, p, n[l], 20, -373897302), p = r(p, f, h, _, n[l + 5], 5, -701558691), 
                    _ = r(_, p, f, h, n[l + 10], 9, 38016083), h = r(h, _, p, f, n[l + 15], 14, -660478335), 
                    f = r(f, h, _, p, n[l + 4], 20, -405537848), p = r(p, f, h, _, n[l + 9], 5, 568446438), 
                    _ = r(_, p, f, h, n[l + 14], 9, -1019803690), h = r(h, _, p, f, n[l + 3], 14, -187363961), 
                    f = r(f, h, _, p, n[l + 8], 20, 1163531501), p = r(p, f, h, _, n[l + 13], 5, -1444681467), 
                    _ = r(_, p, f, h, n[l + 2], 9, -51403784), h = r(h, _, p, f, n[l + 7], 14, 1735328473), 
                    p = i(p, f = r(f, h, _, p, n[l + 12], 20, -1926607734), h, _, n[l + 5], 4, -378558), 
                    _ = i(_, p, f, h, n[l + 8], 11, -2022574463), h = i(h, _, p, f, n[l + 11], 16, 1839030562), 
                    f = i(f, h, _, p, n[l + 14], 23, -35309556), p = i(p, f, h, _, n[l + 1], 4, -1530992060), 
                    _ = i(_, p, f, h, n[l + 4], 11, 1272893353), h = i(h, _, p, f, n[l + 7], 16, -155497632), 
                    f = i(f, h, _, p, n[l + 10], 23, -1094730640), p = i(p, f, h, _, n[l + 13], 4, 681279174), 
                    _ = i(_, p, f, h, n[l], 11, -358537222), h = i(h, _, p, f, n[l + 3], 16, -722521979), 
                    f = i(f, h, _, p, n[l + 6], 23, 76029189), p = i(p, f, h, _, n[l + 9], 4, -640364487), 
                    _ = i(_, p, f, h, n[l + 12], 11, -421815835), h = i(h, _, p, f, n[l + 15], 16, 530742520), 
                    p = o(p, f = i(f, h, _, p, n[l + 2], 23, -995338651), h, _, n[l], 6, -198630844), 
                    _ = o(_, p, f, h, n[l + 7], 10, 1126891415), h = o(h, _, p, f, n[l + 14], 15, -1416354905), 
                    f = o(f, h, _, p, n[l + 5], 21, -57434055), p = o(p, f, h, _, n[l + 12], 6, 1700485571), 
                    _ = o(_, p, f, h, n[l + 3], 10, -1894986606), h = o(h, _, p, f, n[l + 10], 15, -1051523), 
                    f = o(f, h, _, p, n[l + 1], 21, -2054922799), p = o(p, f, h, _, n[l + 8], 6, 1873313359), 
                    _ = o(_, p, f, h, n[l + 15], 10, -30611744), h = o(h, _, p, f, n[l + 6], 15, -1560198380), 
                    f = o(f, h, _, p, n[l + 13], 21, 1309151649), p = o(p, f, h, _, n[l + 4], 6, -145523070), 
                    _ = o(_, p, f, h, n[l + 11], 10, -1120210379), h = o(h, _, p, f, n[l + 2], 15, 718787259), 
                    f = o(f, h, _, p, n[l + 9], 21, -343485551), p = e(p, c), f = e(f, s), h = e(h, d), 
                    _ = e(_, u);
                    return [ p, f, h, _ ];
                }
                function c(e) {
                    var n, t = "";
                    for (n = 0; n < 32 * e.length; n += 8) t += String.fromCharCode(e[n >> 5] >>> n % 32 & 255);
                    return t;
                }
                function s(e) {
                    var n, t = [];
                    for (t[(e.length >> 2) - 1] = void 0, n = 0; n < t.length; n += 1) t[n] = 0;
                    for (n = 0; n < 8 * e.length; n += 8) t[n >> 5] |= (255 & e.charCodeAt(n / 8)) << n % 32;
                    return t;
                }
                function d(e) {
                    var n, t, a = "0123456789abcdef", r = "";
                    for (t = 0; t < e.length; t += 1) n = e.charCodeAt(t), r += a.charAt(n >>> 4 & 15) + a.charAt(15 & n);
                    return r;
                }
                function u(e) {
                    return unescape(encodeURIComponent(e));
                }
                function p(e) {
                    return function(e) {
                        return c(l(s(e), 8 * e.length));
                    }(u(e));
                }
                function f(e, n) {
                    return function(e, n) {
                        var t, a, r = s(e), i = [], o = [];
                        for (i[15] = o[15] = void 0, r.length > 16 && (r = l(r, 8 * e.length)), t = 0; t < 16; t += 1) i[t] = 909522486 ^ r[t], 
                        o[t] = 1549556828 ^ r[t];
                        return a = l(i.concat(s(n)), 512 + 8 * n.length), c(l(o.concat(a), 640));
                    }(u(e), u(n));
                }
                n.exports = function(e, n, t) {
                    return n ? t ? f(n, e) : function(e, n) {
                        return d(f(e, n));
                    }(n, e) : t ? p(e) : function(e) {
                        return d(p(e));
                    }(e);
                };
            }();
        }, {} ],
        21: [ function(n, t, a) {
            var r = n("./version").v, i = n("./testmode"), o = n("./callbacks"), l = n("./mods"), c = n("./stash"), s = n("./collection"), d = n("./payment_elements"), u = {}.hasOwnProperty, p = function() {
                n("./init").init();
            };
            p.prototype = {
                version: r,
                createPayment: function(n, t, a, r) {
                    if ("function" == typeof t && (o.userCallback = t), d.init(n), u.call(d, "id")) if (u.call(d, "channel")) {
                        u.call(d, "app") && ("string" == typeof d.app ? c.app_id = d.app : "object" == e(d.app) && "string" == typeof d.app.id && (c.app_id = d.app.id)), 
                        s.report({
                            type: "pure_sdk_click",
                            channel: d.channel,
                            ch_id: d.id
                        });
                        var p = d.channel;
                        if (u.call(d, "credential")) if (d.credential) if (u.call(d.credential, p)) {
                            if (u.call(d, "livemode")) {
                                var f = l.getChannelModule(p);
                                return void 0 === f ? (console.error('channel module "' + p + '" is undefined'), 
                                void o.innerCallback("fail", o.error("invalid_channel", 'channel module "' + p + '" is undefined'))) : !1 === d.livemode ? void (u.call(f, "runTestMode") ? f.runTestMode(d) : i.runTestMode(d)) : (void 0 !== a && (c.signature = a), 
                                "boolean" == typeof r && (c.debug = r), void f.handleCharge(d));
                            }
                            o.innerCallback("fail", o.error("invalid_charge", "no_livemode_field"));
                        } else o.innerCallback("fail", o.error("invalid_credential", "credential_is_incorrect")); else o.innerCallback("fail", o.error("invalid_credential", "credential_is_undefined")); else o.innerCallback("fail", o.error("invalid_charge", "no_credential"));
                    } else o.innerCallback("fail", o.error("invalid_charge", "no_channel")); else o.innerCallback("fail", o.error("invalid_charge", "no_charge_id"));
                },
                setAPURL: function(e) {
                    c.APURL = e;
                }
            }, t.exports = new p();
        }, {
            "./callbacks": 1,
            "./collection": 18,
            "./init": 19,
            "./mods": 22,
            "./payment_elements": 23,
            "./stash": 24,
            "./testmode": 25,
            "./version": 27
        } ],
        22: [ function(e, n, t) {
            var a = {}.hasOwnProperty, r = {};
            n.exports = r, r.channels = {
                alipay_pc_direct: e("./channels/alipay_pc_direct"),
                alipay_wap: e("./channels/alipay_wap"),
                bfb_wap: e("./channels/bfb_wap"),
                cp_b2b: e("./channels/cp_b2b"),
                fqlpay_qr: e("./channels/fqlpay_qr"),
                fqlpay_wap: e("./channels/fqlpay_wap"),
                jdpay_wap: e("./channels/jdpay_wap"),
                qpay_pub: e("./channels/qpay_pub"),
                upacp_pc: e("./channels/upacp_pc"),
                upacp_wap: e("./channels/upacp_wap"),
                wx_lite: e("./channels/wx_lite"),
                wx_pub: e("./channels/wx_pub"),
                wx_wap: e("./channels/wx_wap"),
                yeepay_wap: e("./channels/yeepay_wap")
            }, r.extras = {
                ap: e("./channels/extras/ap")
            }, r.getChannelModule = function(e) {
                if (a.call(r.channels, e)) return r.channels[e];
            }, r.getExtraModule = function(e) {
                if (a.call(r.extras, e)) return r.extras[e];
            };
        }, {
            "./channels/alipay_pc_direct": 2,
            "./channels/alipay_wap": 3,
            "./channels/bfb_wap": 4,
            "./channels/cp_b2b": 6,
            "./channels/extras/ap": 7,
            "./channels/fqlpay_qr": 8,
            "./channels/fqlpay_wap": 9,
            "./channels/jdpay_wap": 10,
            "./channels/qpay_pub": 11,
            "./channels/upacp_pc": 12,
            "./channels/upacp_wap": 13,
            "./channels/wx_lite": 14,
            "./channels/wx_pub": 15,
            "./channels/wx_wap": 16,
            "./channels/yeepay_wap": 17
        } ],
        23: [ function(e, n, t) {
            var a = e("./callbacks"), r = {}.hasOwnProperty;
            n.exports = {
                id: null,
                or_id: null,
                channel: null,
                app: null,
                credential: {},
                extra: null,
                livemode: null,
                order_no: null,
                time_expire: null,
                init: function(e) {
                    var n;
                    if ("string" == typeof e) try {
                        n = JSON.parse(e);
                    } catch (e) {
                        return void a.innerCallback("fail", a.error("json_decode_fail", e));
                    } else n = e;
                    if (void 0 !== n) {
                        if (r.call(n, "object") && "order" == n.object) {
                            n.or_id = n.id, n.id = n.charge, n.order_no = n.merchant_order_no;
                            var t = n.charge_essentials;
                            n.channel = t.channel, n.credential = t.credential, n.extra = t.extra;
                        }
                        for (var i in this) r.call(n, i) && (this[i] = n[i]);
                        return this;
                    }
                    a.innerCallback("fail", a.error("json_decode_fail"));
                },
                clear: function() {
                    for (var e in this) "function" != typeof this[e] && (this[e] = null);
                }
            };
        }, {
            "./callbacks": 1
        } ],
        24: [ function(e, n, t) {
            n.exports = {};
        }, {} ],
        25: [ function(e, n, t) {
            var a = e("./utils"), r = {}.hasOwnProperty;
            n.exports = {
                PINGPP_MOCK_URL: "http://sissi.pingxx.com/mock.php",
                runTestMode: function(e) {
                    var n = {
                        ch_id: e.id,
                        scheme: "http",
                        channel: e.channel
                    };
                    r.call(e, "or_id") && null !== e.or_id && (n.or_id = e.or_id), r.call(e, "order_no") ? n.order_no = e.order_no : r.call(e, "orderNo") && (n.order_no = e.orderNo), 
                    r.call(e, "time_expire") ? n.time_expire = e.time_expire : r.call(e, "timeExpire") && (n.time_expire = e.timeExpire), 
                    r.call(e, "extra") && (n.extra = encodeURIComponent(JSON.stringify(e.extra))), a.redirectTo(this.PINGPP_MOCK_URL + "?" + a.stringifyData(n));
                }
            };
        }, {
            "./utils": 26
        } ],
        26: [ function(n, t, a) {
            var r = {}.hasOwnProperty, i = t.exports = {
                stringifyData: function(e, n, t) {
                    void 0 === t && (t = !1);
                    var a = [];
                    for (var i in e) r.call(e, i) && "function" != typeof e[i] && ("bfb_wap" == n && "url" == i || "yeepay_wap" == n && "mode" == i || "channel_url" != i && a.push(i + "=" + (t ? encodeURIComponent(e[i]) : e[i])));
                    return a.join("&");
                },
                request: function(n, t, a, o, l, c) {
                    if ("undefined" != typeof XMLHttpRequest) {
                        var s = new XMLHttpRequest();
                        if (void 0 !== s.timeout && (s.timeout = 6e3), "GET" === (t = t.toUpperCase()) && "object" == e(a) && a && (n += "?" + i.stringifyData(a, "", !0)), 
                        s.open(t, n, !0), void 0 !== c) for (var d in c) r.call(c, d) && s.setRequestHeader(d, c[d]);
                        "POST" === t ? (s.setRequestHeader("Content-type", "application/json; charset=utf-8"), 
                        s.send(JSON.stringify(a))) : s.send(), void 0 === o && (o = function() {}), void 0 === l && (l = function() {}), 
                        s.onreadystatechange = function() {
                            4 == s.readyState && o(s.responseText, s.status, s);
                        }, s.onerror = function(e) {
                            l(s, 0, e);
                        };
                    } else console.log("Function XMLHttpRequest is undefined.");
                },
                formSubmit: function(e, n, t) {
                    if ("undefined" != typeof window) {
                        var a = document.createElement("form");
                        for (var i in a.setAttribute("method", n), a.setAttribute("action", e), t) if (r.call(t, i)) {
                            var o = document.createElement("input");
                            o.setAttribute("type", "hidden"), o.setAttribute("name", i), o.setAttribute("value", t[i]), 
                            a.appendChild(o);
                        }
                        document.body.appendChild(a), a.submit();
                    } else console.log("Not a browser, form submit url: " + e);
                },
                randomString: function(e) {
                    void 0 === e && (e = 32);
                    for (var n = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789", t = n.length, a = "", r = 0; r < e; r++) a += n.charAt(Math.floor(Math.random() * t));
                    return a;
                },
                redirectTo: function(e) {
                    return "undefined" == typeof window ? void console.log("Not a browser, redirect url: " + e) : void (window.location.href = e);
                },
                inWeixin: function() {
                    return "undefined" != typeof navigator && -1 !== navigator.userAgent.toLowerCase().indexOf("micromessenger");
                },
                documentReady: function(e) {
                    return "undefined" == typeof document ? void e() : void ("loading" != document.readyState ? e() : document.addEventListener("DOMContentLoaded", e));
                },
                loadUrlJs: function(e, n, t) {
                    var a = document.getElementsByTagName("head")[0], r = null;
                    null == document.getElementById(e) ? ((r = document.createElement("script")).setAttribute("type", "text/javascript"), 
                    r.setAttribute("src", n), r.setAttribute("id", e), r.async = !0, null != t && (r.onload = r.onreadystatechange = function() {
                        return !r.ready && void (r.readyState && "loaded" != r.readyState && "complete" != r.readyState || (r.ready = !0, 
                        t()));
                    }), a.appendChild(r)) : null != t && t();
                }
            };
        }, {} ],
        27: [ function(e, n, t) {
            n.exports = {
                v: "2.1.7"
            };
        }, {} ]
    }, {}, [ 21 ])(21);
});