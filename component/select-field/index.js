var e = require("../../@babel/runtime/helpers/interopRequireWildcard"), t = require("../../animations/index"), i = e(require("../../utils/util"));

Component({
    properties: {
        showFields: {
            type: Boolean,
            value: !1,
            observer: "_fieldsChange"
        }
    },
    data: {
        tagList:[
            "通用题目",
            "联系信息",
            "分页",
            "描述"
        ],
        commomFields: [ {
            label: "单行文字",
            type: "single_line_text",
            icon: "../../assets/image/singleText.png"
        }, {
            label: "多行文字",
            type: "paragraph_text",
            icon: "../../assets/image/multiText.png"
        }, {
            label: "单项选择",
            type: "single_choice",
            icon: "../../assets/image/singleChoice.png"
        }, {
            label: "多项选择",
            type: "multiple_choice",
            icon: "../../assets/image/multiChoice.png"
        }, {
            label: "图片多选",
            type: "multi_picture",
            icon: "../../assets/image/multiImg.png"
        },
        {
            label: "单级下拉框",
            type: "drop_down",
            icon: "../../assets/image/singleSelect.png"
        },{
            label: "二级下拉框",
            type: "cascade_drop_down",
            icon: "../../assets/image/multiSelect.png"
        },{
            label: "时间",
            type: "time",
            icon: "../../assets/image/time.png"
        },
        {
            label: "地理位置",
            type: "geo_location",
            icon: "../../assets/image/lication.png"
        },{
            label: "上传文件",
            type: "attachment",
            icon: "../../assets/image/upload.png"
        },{
            label: "网址",
            type: "link",
            icon: "../../assets/image/website.png"
        },
         {
            label: "日期",
            type: "date",
            icon: "../../assets/image/date.png"
        }
        ],
        contactFields:[{
            label: "姓名",
            type: "name",
            icon: "../../assets/image/name.png"
        },{
            label: "邮箱",
            type: "email",
            icon: "../../assets/image/email.png"
        },{
            label: "电话",
            type: "phone",
            icon: "../../assets/image/phone.png"
        },{
            label: "地址",
            type: "address",
            icon: "../../assets/image/address.png"
        },],
        bgAnimationData: {},
        animationData: {},
        isFullScreen: !1,
        clickedIndex: -1,  //面板中被选择的模板
        clickedTag:0  //面板中被选择的tag
    },
    attached: function() {
        var e = this;
        i.isFullScreen().then(function(t) {
            e.setData({
                isFullScreen: t
            });
        });
    },
    methods: {
        //选择标签tag
        selectTag:function(e) {
            this.setData({
                clickedTag:e.currentTarget.dataset.index
            })
        },
        _closeToggle: function() {
            t.toggle.toggleOut(this, 300, 300), t.fade.fadeOut(this, 300, "bgAnimationData"), 
            this.emitShowFields(!1);
        },
        _showToggle: function() {
            t.toggle.toggleIn(this, 300, 300), t.fade.fadeIn(this, 300, "bgAnimationData"), 
            this.emitShowFields(!0);
        },
        _fieldsChange: function(e, t) {
            e ? this._showToggle() : this._closeToggle();
        },
        // 选择模板
        _selectField: function(e) {
            // i为函数传的实参index,n为点击模块在列表中对应的item
            let t = this;
            let i = e.currentTarget.dataset;
            let n = this.data.clickedTag===0?this.data.commomFields[i.index]:this.data.contactFields[i.index];
            this.setData({
                clickedIndex: i.index
            });
            let l = {
                type: n.type,
                label: n.label,
                notes: ""
            };
            setTimeout(function() {
                t.setData({
                    clickedIndex: -1,
                    showFields: !1
                })
                // 触发pages/create-form/create-form页面中的selectField事件
                t.triggerEvent("selectField", l);
            }, 300);
        },
        emitShowFields: function(e) {
            var t = this;
            setTimeout(function() {
                t.setData({
                    showFields: e,
                    clickedIndex: -1
                }), t.triggerEvent("fieldsBack", e);
            }, 400);
        }
    }
});