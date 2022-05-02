Object.defineProperty(exports, "__esModule", {
    value: !0
}), exports.setStorage = exports.removeStorage = exports.getStorage = void 0;

exports.getStorage = function(e) {
    return wx.getStorageSync(e);
};

exports.setStorage = function(e, t) {
    return wx.setStorageSync(e, t);
};

exports.removeStorage = function(e) {
    return wx.removeStorageSync(e);
};