Object.defineProperty(exports, "__esModule", {
    value: !0
}), exports.getCurrentPageUrlWithQuery = exports.getCurrentPageUrl = exports.getCurrentPage = void 0;

var e = require("./queryString"), r = function() {
    var e = getCurrentPages();
    return e[e.length - 1];
};

exports.getCurrentPage = r;

exports.getCurrentPageUrl = function() {
    return r().route;
};

exports.getCurrentPageUrlWithQuery = function() {
    var t = r(), u = t.route, n = t.options;
    return (0, e.stringifyUrl)(u, n);
};