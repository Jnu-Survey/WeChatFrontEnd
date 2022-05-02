var t = require("../../utils/util"), e = require("../../utils/storage");

Component({
    options: {},
    properties: {
        text: {
            type: String,
            value: ""
        },
        top: {
            type: null | Number,
            value: null
        },
        storageKey: {
            type: String,
            value: ""
        }
    },
    data: {
        showPopover: !0
    },
    lifetimes: {
        attached: function() {
            var o;
            if ((0, e.getStorage)("".concat(this.data.storageKey, "_collect"))) this.setData({
                showPopover: !1
            }); else {
                (0, t.bindSystemInfo)(this);
                var a = 0;
                a = -1 !== this.data.wxSystemInfo.model.indexOf("iPhone") ? 44 : 48;
                var s = this.data.wxSystemInfo.statusBarHeight, i = wx.getMenuButtonBoundingClientRect();
                this.setData({
                    popoverRight: i.right,
                    popoverTop: null !== (o = this.data.top) && void 0 !== o ? o : a + s
                });
            }
        }
    },
    methods: {
        closePopover: function() {
            this.setData({
                showPopover: !1
            }), (0, e.setStorage)("".concat(this.data.storageKey, "_collect"), !0);
        }
    }
});