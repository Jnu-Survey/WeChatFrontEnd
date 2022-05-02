var n = require("../../@babel/runtime/helpers/typeof"), r = getApp();

!function(r, t) {
    "function" == typeof define && define.amd ? define([ "exports" ], t) : "object" === ("undefined" == typeof exports ? "undefined" : n(exports)) && t(exports);
    var e = {};
    r.PubSub = e, t(e);
}("object" === n(r) && r || void 0, function(n) {
    var r = {}, t = -1;
    function e(n) {
        var r;
        for (r in n) if (n.hasOwnProperty(r)) return !0;
        return !1;
    }
    function i(n, r, t) {
        try {
            n(r, t);
        } catch (n) {
            setTimeout(function(n) {
                return function() {
                    throw n;
                };
            }(n), 0);
        }
    }
    function o(n, r, t) {
        n(r, t);
    }
    function f(n, t, e, f) {
        var u, s = r[t], c = f ? o : i;
        if (r.hasOwnProperty(t)) for (u in s) s.hasOwnProperty(u) && c(s[u], n, e);
    }
    function u(n, t, i, o) {
        var u = function(n, r, t) {
            return function() {
                var e = String(n), i = e.lastIndexOf(".");
                for (f(n, n, r, t); -1 !== i; ) i = (e = e.substr(0, i)).lastIndexOf("."), f(n, e, r, t);
            };
        }(n, t, o);
        return !!function(n) {
            for (var t = String(n), i = Boolean(r.hasOwnProperty(t) && e(r[t])), o = t.lastIndexOf("."); !i && -1 !== o; ) o = (t = t.substr(0, o)).lastIndexOf("."), 
            i = Boolean(r.hasOwnProperty(t) && e(r[t]));
            return i;
        }(n) && (!0 === i ? u() : setTimeout(u, 0), !0);
    }
    n.publish = function(r, t) {
        return u(r, t, !1, n.immediateExceptions);
    }, n.publishSync = function(r, t) {
        return u(r, t, !0, n.immediateExceptions);
    }, n.subscribe = function(n, e) {
        if ("function" != typeof e) return !1;
        r.hasOwnProperty(n) || (r[n] = {});
        var i = "uid_" + String(++t);
        return r[n][i] = e, i;
    }, n.clearAllSubscriptions = function() {
        r = {};
    }, n.clearSubscriptions = function(n) {
        var t;
        for (t in r) r.hasOwnProperty(t) && 0 === t.indexOf(n) && delete r[t];
    }, n.unsubscribe = function(t) {
        var e, i, o, f = "string" == typeof t && r.hasOwnProperty(t), u = !f && "string" == typeof t, s = "function" == typeof t, c = !1;
        if (!f) {
            for (e in r) if (r.hasOwnProperty(e)) {
                if (i = r[e], u && i[t]) {
                    delete i[t], c = t;
                    break;
                }
                if (s) for (o in i) i.hasOwnProperty(o) && i[o] === t && (delete i[o], c = !0);
            }
            return c;
        }
        n.clearSubscriptions(t);
    };
});