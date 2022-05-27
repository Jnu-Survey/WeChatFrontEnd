var e = [ {
    name: "单项选择",
    type: "single_choice",
    migrateToFields: [ "drop_down" ]
}, {
    name: "多项选择",
    type: "multiple_choice"
}, {
    name: "单行文字",
    type: "single_line_text",
    migrateToFields: [ "paragraph_text" ]
}, {
    name: "多行文字",
    type: "paragraph_text",
    migrateToFields: [ "single_line_text" ]
}, {
    name: "数字",
    type: "number",
    migrateToFields: [ "single_line_text", "paragraph_text" ]
}, {
    name: "手机",
    type: "mobile",
    migrateToFields: [ "single_line_text", "paragraph_text" ]
}, {
    name: "日期",
    type: "date"
}, {
    name: "下拉框",
    type: "drop_down",
    migrateToFields: [ "single_choice" ]
}, {
    name: "评分",
    type: "rating"
}, {
    name: "地理位置",
    type: "geo_location"
}, {
    name: "上传文件",
    type: "attachment"
}, {
    name: "分页",
    type: "page_break"
}, {
    name: "矩阵填空",
    type: "matrix"
}, {
    name: "矩阵单选",
    type: "likert"
},{
    name: "表单关联",
    type: "form_association"
},{
    name: "地址",
    type: "address"
}, {
    name: "电话",
    type: "phone"
},{
    name: "姓名",
    type: "name"
},
 {
    name: "邮箱",
    type: "email"
}, {
    name: "网址",
    type: "link"
}, {
    name: "描述",
    type: "temp_des"
}, {
    name: "时间",
    type: "time"
}, {
    name: "位置",
    type: "detail_location"
} ], t = e.reduce(function(e, t) {
    return e[t.type] = t, e;
}, {});

module.exports = {
    types: e,
    mapping: t
};