require("./util");

var e = require("./storage"), t = require("./storage-events"), a = require("./apis/user"), o = {};

module.exports = {
    shouldNotice: function() {
        var n = this;
        a.me().then(function(a) {
            var s = a.data;
            if (s) {
                o.plan = s.plan && s.plan.name;
                var r = (0, e.getStorage)(t.LAST_NOTICE_TIME), i = new Date(Date.now()).toDateString();
                if (r !== i) {
                    (0, e.setStorage)(t.LAST_NOTICE_TIME, i);
                    var l = s.billing_account.current_monthly_usage.entry_quota, u = l.total_quota - l.consumed_quota;
                    "免费版" !== o.plan && "Free" !== o.plan || u <= 0 && n.setData({
                        showModal: !0,
                        noteTitle: "数据余量不足提醒",
                        noteMsg: "你的免费数据用量已经超出".concat(5e4, "条，所有表单都不能再添加数据了，可以升级套餐提升至10万条每月")
                    });
                    var c = new Date(s.plan.end_date);
                    Date.now() > Date.parse(c) - 864e6 && n.setData({
                        showModal: !0,
                        noteTitle: "套餐到期提醒",
                        noteMsg: "糟糕！套餐周期不足10天了，到期后就只有".concat(5e4, "条数据量咯"),
                        btnText: "续订套餐"
                    });
                }
            }
        });
    },
    closeModal: function() {
        this.setData({
            showModal: !1
        });
    },
    purchase: function() {
        this.setData({
            showModal: !1
        }), wx.navigateTo({
            url: "/pages/subscriptions/show?enable_plan_pro=true"
        });
    }
};