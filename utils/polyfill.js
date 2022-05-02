module.exports = function(r) {
    if (null == r) throw new TypeError("Cannot convert undefined or null to object");
    for (var n = Object(r), e = 1; e < arguments.length; e++) {
        var o = arguments[e];
        if (null != o) for (var t in o) o.hasOwnProperty(t) && (n[t] = o[t]);
    }
    return n;
};