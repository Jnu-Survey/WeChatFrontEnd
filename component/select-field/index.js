var e = require("../../@babel/runtime/helpers/interopRequireWildcard"), t = require("../../animations/index"), i = e(require("../../utils/util"));
const app = getApp();

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
            "描述"
        ],
        imgIconServer:app.globalData.imgIconServer,
        commomFields: [ {
            title: "单行文字",
            type: "single_line_text",
            icon: app.globalData.imgIconServer + "/singleText.png"
        }, {
            title: "多行文字",
            type: "paragraph_text",
            icon: app.globalData.imgIconServer + "/multiText.png"
        }, {
            title: "单项选择",
            type: "single_choice",
            icon: app.globalData.imgIconServer + "/singleChoice.png"
        }, {
            title: "多项选择",
            type: "multiple_choice",
            icon: app.globalData.imgIconServer + "/multiChoice.png"
        }, 
        {
            title: "单级下拉框",
            type: "drop_down",
            icon: app.globalData.imgIconServer + "/singleSelect.png"
        },
        {
            title: "时间",
            type: "time",
            icon: app.globalData.imgIconServer + "/time.png"
        },
        {
            title: "选择定位",
            type: "geo_location",
            icon: app.globalData.imgIconServer + "/lication.png"
        },{
            title: "上传文件",
            type: "attachment",
            icon: app.globalData.imgIconServer + "/upload.png"
        },{
            title: "网址",
            type: "link",
            icon: app.globalData.imgIconServer + "/website.png"
        },
        {
            title: "地理位置",
            type: "detail_location",
            icon: app.globalData.imgIconServer + "/address.png"
        },
        {
            title: "日期",
            type: "date",
            icon: app.globalData.imgIconServer + "/date.png"
        }
        ],
        contactFields:[{
            title: "姓名",
            type: "name",
            icon: app.globalData.imgIconServer + "/name.png"
        },{
            title: "邮箱",
            type: "email",
            icon: app.globalData.imgIconServer + "/email.png"
        },{
            title: "电话",
            type: "phone",
            icon: app.globalData.imgIconServer + "/phone.png"
        },{
            title: "地址",
            type: "address",
            icon: app.globalData.imgIconServer + "/address.png"
        }
        ],
        descriptionField:[
            {
                title: "描述",
                type: "temp_des",
                icon: app.globalData.imgIconServer + "/intro.png"
            }
        ],
        bgAnimationData: {},
        animationData: {},
        isFullScreen: !1,
        clickedIndex: -1,  //面板中被选择的模板
        clickedTag:0,  //面板中被选择的tag
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
            let n = {}
            if(this.data.clickedTag===0) {
                n = this.data.commomFields[i.index]
            }
            else if(this.data.clickedTag===1) {
                n = this.data.contactFields[i.index]
            }
            else {
                n = this.data.descriptionField[i.index]
            }
            this.setData({
                clickedIndex: i.index
            });
            let l = {
                type: n.type,
                title: n.title,
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