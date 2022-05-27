// pages/field/field.js
var t = require("../../../../@babel/runtime/helpers/defineProperty"), e = require("./field-types"), i = getApp(), a = require("../../../../utils/util");

function s(t) {
    return 0 === t.length;
}

Page({
    data: {
        field: null,
        typeIndex: void 0,
        required: !1,
        storedData: {
            choices: []
        },
        sms_signature: void 0,
        pcMode: !1
    },
    _supportChoices: function() {
        return [ "single_choice", "multiple_choice", "drop_down", "rating" ].indexOf(this.data.field.type) >= 0;
    },
    onLoad: function(t) {
        var s = this;
        if (a.isFullScreen().then(function(t) {
            s.setData({
                isFullScreen: t
            });
        }), a.isIOS(this), "true" === t.pcMode) {
            this.setData({
                pcMode: !0
            });
            var n = i.globalData.currentEditField;
            return n.typeName = e.mapping[n.type].name, this.setData({
                field: n
            }), void wx.setNavigationBarTitle({
                title: n.typeName
            });
        }
        i.globalData.currentFormSMSSignature && this.setData({
            sms_signature: i.globalData.currentFormSMSSignature
        });
        var d = i.globalData.currentEditField, l = d.type, r = e.mapping[l];
        if (d.typeName = r.name, wx.setNavigationBarTitle({
            title: d.typeName
        }), d.api_code ? r.migrateToFields && (d.migrateToFields = r.migrateToFields.map(function(t) {
            return e.mapping[t];
        }), d.migrateToFields.unshift(r)) : d.migrateToFields = e.types, this.setData({
            field: d,
            required: d.validations && d.validations.required || !1
        }), this.setDefault(), d.migrateToFields) {
            var o = d.migrateToFields.map(function(t) {
                return t.type;
            }).indexOf(l);
            this.setData({
                typeIndex: o
            });
        }
    },
    setDefault: function() {
        var t = this._supportChoices(), e = {
            "field.supportChoices": t
        };
        // 设置默认选项值
        if (t && !this.data.field.choices) {
            var i = [];
            "rating" === this.data.field.type ? (e["field.rating_max"] = 5, i = Array.apply(null, Array(5)).map(function(t, e) {
                return {
                    name: e + 1
                };
            })) : i = [ 1, 2, 3 ].map(function(t) {
                return {
                    name: "选项" + t
                };
            }), e["field.choices"] = i;
        }
        "geo_location" === this.data.field.type && void 0 === this.data.field.localizable_on_mobile && (e["field.localizable_on_mobile"] = !0), 
        "attachment" === this.data.field.type && void 0 === this.data.field.max_file_quantity && (e["field.max_file_quantity"] = 1), 
        "multi_picture" === this.data.field.type && void 0 === this.data.field.max_pic_quantity && (e["field.max_pic_quantity"] = 1), 
        this.setData(e);
    },
    addOption: function() {
        var t = this.data.field.choices ? this.data.field.choices.slice() : [];
        t.push({
            name: "其他选项"
        }), this.setData({
            "field.choices": t
        }), this.storedOptions();
    },
    delOption: function(t) {
        var e = t.currentTarget.dataset.index, i = this.data.field.choices ? this.data.field.choices.slice() : [];
        i.splice(e, 1), this.setData({
            "field.choices": i
        }), this.storedOptions();
    },
    updateField: function(t) {
        var e = t.detail.value, i = {};
        i["field." + t.currentTarget.id] = e, this.setData(i);
    },
    updateFieldAttrs: function(t) {
        var e = t.detail.value, i = {};
        i[t.currentTarget.id] = e, this.setData(i);
    },
    bindTypeChange: function(t) {
        var i = parseInt(t.detail.value, 10), a = this.data.field.migrateToFields[i].type, s = this.data.field.type, n = this.data.field.label;
        n === e.mapping[s].name && (n = e.mapping[a].name), t.detail.value = a, this.setData({
            typeIndex: i,
            "field.type": a,
            "field.typeName": e.mapping[a].name,
            "field.label": n
        }), this.updateField(t), this.setDefault();
    },
    bindOptionsChange: function(t) {
        var e = t.detail.value;
        if(e) {
            this.setData({
                ["field.choices["+t.currentTarget.dataset.index+"].name"]:e
            })
        }
    },
    storedOptions: function() {
        this.setData({
            "storedData.choices": this.data.field.choices
        });
    },
    bindInputFocus: function(e) {
        var i = e.currentTarget.dataset.index, a = e.detail.value;
        this.storedOptions(), "选项" === a.substring(0, 2) && this.setData(t({}, "field.choices.[".concat(i, "].name"), ""));
    },
    bindInputBlur: function(e) {
        var i = e.currentTarget.dataset.index, a = e.detail.value;
        "" === a ? this.setData(t({}, "field.choices.[".concat(i, "].name"), this.data.storedData.choices[i].name)) : this.setData(t({}, "field.choices.[".concat(i, "].name"), a));
    },
    bindSwitchChange: function(t) {
        var e = {};
        e["field." + t.currentTarget.id] = t.detail.value, this.setData(e);
    },
    bindMaxFileQuantityChange: function(t) {
        var e = {};
        e["field." + t.currentTarget.id] = parseInt(t.detail.value, 10) + 1, this.setData(e);
    },
    bindMaxPictureQuantityChange:function(t) {
        var e = {};
        e["field." + t.currentTarget.id] = parseInt(t.detail.value, 10) + 1, this.setData(e);
    },
    bindRequiredChange: function(t) {
        this.setData({
            required: t.detail.value
        });
    },
    // 删除字段
    delField: function() {
        wx.showModal({
            title: "提示",
            content: "删除字段将和数据一起删除，并且不可恢复",
            success: function(t) {
                t.confirm && (i.PubSub.publish("gd.field.delete"), wx.navigateBack({
                    delta: 1
                }));
            }
        });
    },
    saveField: function() {
        let t = this.checkFieldErrors();
        if(t) {
            var e = {};
            for (var s in this.data) a.checkValidationExist(s) && (e[s] = this.data[s]);
            var n = this.data.field;
            n.validations = e, this.setData({
                field: n
            }), 
            i.PubSub.publish("gd_field_edit", {
                field: n,
                sms_signature: this.data.sms_signature
            }),
            wx.navigateBack({
                delta: 1
            });
        }
    },
    checkFieldErrors: function() {
        if(this.data.field.label.trim()===this.data.field.typeName) {
            wx.showModal({
                title: "提示",
                content: "请自定义题目名称！"
            })
            return false
        }
        return true;
    }
});