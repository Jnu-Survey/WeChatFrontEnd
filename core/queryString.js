Object.defineProperty(exports, "__esModule", {
    value: !0
}), exports.stringifyUrl = exports.stringifyQuery = exports.parseUrl = exports.parseQueryString = void 0;

var r = require("../@babel/runtime/helpers/slicedToArray"), e = require("../@babel/runtime/helpers/toArray"), t = function(r) {
    return r ? r.split("&").reduce(function(r, t) {
        var n = t.split("="), i = e(n), s = i[0], o = i.slice(1);
        return r[s] = o.join("="), r;
    }, {}) : {};
};

exports.parseQueryString = t;

var n = function(r) {
    var n = r.split("?"), i = e(n), s = i[0], o = i.slice(1);
    return [ s, t(o.join("?")) ];
};

exports.parseUrl = n;

var i = function(r) {
    return Object.keys(r).map(function(e) {
        return "".concat(e, "=").concat(String(r[e]));
    }).join("&");
};

exports.stringifyQuery = i;

exports.stringifyUrl = function(e, t) {
    var s = n(e), o = r(s, 2), c = o[0], u = o[1], a = Object.assign(u, t), p = i(a);
    return "".concat(c).concat(p && "?".concat(p));
};