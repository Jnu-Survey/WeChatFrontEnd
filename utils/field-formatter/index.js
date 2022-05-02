Object.defineProperty(exports, "__esModule", {
    value: !0
}), exports.mapping = exports.createFormatter = void 0;

var e = require("./base").Base, r = require("./mobile").Mobile, o = require("./geo-location").GeoLocation, i = require("./paragraph-text").ParagraphText, t = require("./multiple-choice").MultipleChoice, a = require("./drop-down").DropDown, s = require("./attachment").Attachment, c = require("./likert").Likert, d = require("./matrix").Matrix, n = require("./time").Time, p = require("./cascade-drop-down").CascadeDropDown, u = require("./address").Address, m = require("./basic-goods").BasicGoods, l = require("./goods").Goods, q = {
    mobile: r,
    geo_location: o,
    paragraph_text: i,
    multiple_choice: t,
    drop_down: a,
    single_choice: require("./single-choice").SingleChoice,
    attachment: s,
    likert: c,
    matrix: d,
    time: n,
    cascade_drop_down: p,
    address: u,
    basic_goods: m,
    goods: l,
    form_association: require("./form-association").FormAssociation,
    sort: require("./sort").Sort
};

exports.mapping = q;

exports.createFormatter = function(r) {
    var o = q[r.type];
    return o ? new o(r) : new e(r);
};