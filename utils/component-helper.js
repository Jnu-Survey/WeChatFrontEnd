module.exports = {
    previewSingleImage: function(e) {
        wx.previewImage({
            current: e,
            urls: [ e ]
        });
    }
};