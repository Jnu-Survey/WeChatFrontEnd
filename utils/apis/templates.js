Object.defineProperty(exports, "__esModule", {
    value: !0
}), exports.getSearchSuggestions = exports.getSearchHistory = exports.fetchTemplatesByTag = exports.fetchTemplatesByKeywords = exports.fetchTemplates = exports.fetchTemplateByToken = exports.fetchTemplate = exports.fetchTags = exports.fetchRecommendTopic = exports.fetchHotTemplates = exports.fetchHotSearchWord = exports.fetchHomeFloorRecommend = exports.fetchFloorRecommend = exports.fetchDefaultBannerData = exports.fetchBannerDataByUserId = exports.deleteSearchHistory = void 0, 
exports.getTempShareQrcode = function(t, r, o, a) {
    e.request("v2/templates/" + t + "/weixin_share_qrcode", "POST", {
        prefix: "mq"
    }, r, o, a);
}, exports.queryTemplateByFormToken = exports.queryGraphicFloorList = void 0;

var e = require("../session");

exports.fetchTemplates = function(t) {
    var r = t.data, o = t.id, a = void 0 === o ? "5bbc147448b81677b83041b4" : o, s = t.successCallback, c = t.completeCallback;
    e.request("v2/weixin_app/mobile_side_templates?category=".concat(a), "GET", r, s, c);
};

exports.fetchTemplate = function(t) {
    var r = t.template_id, o = t.data, a = t.successCallback, s = t.completeCallback;
    e.request("v2/weixin_app/mobile_side_templates/".concat(r), "GET", o, a, s);
};

exports.fetchHotSearchWord = function(t) {
    var r = t.count, o = t.data, a = void 0 === o ? {} : o;
    return e.requestTemplateApi("settings/hotWords?count=".concat(r), "GET", a);
};

exports.fetchHotTemplates = function(t) {
    var r = t.page, o = t.size, a = t.data, s = void 0 === a ? {} : a;
    return e.requestTemplateApi("hot-templates?page=".concat(r, "&size=").concat(o), "GET", s);
};

exports.fetchFloorRecommend = function(t) {
    var r = t.id;
    return e.requestTemplateApi("tabs/".concat(r), "GET");
};

exports.fetchBannerDataByUserId = function(t) {
    var r = t.id, o = t.data, a = void 0 === o ? {} : o;
    return e.requestTemplateApi("bannercard/groups/users/".concat(r), "GET", a);
};

exports.fetchDefaultBannerData = function() {
    return e.requestTemplateApi("bannercard/groups/default", "GET");
};

exports.fetchTags = function() {
    return e.requestTemplateApi("tags", "GET");
};

exports.fetchTemplatesByTag = function(t) {
    var r = t.tag, o = t.page, a = void 0 === o ? 1 : o, s = t.size, c = void 0 === s ? 10 : s, n = t.sort_by, p = void 0 === n ? "relevancy" : n;
    return e.requestTemplateApi("query?tag=".concat(r, "&page=").concat(a, "&size=").concat(c, "&sort_by=").concat(p, "&device_type=WEIXIN_APP"), "GET");
};

exports.fetchTemplatesByKeywords = function(t) {
    var r = t.keywords, o = t.userId, a = void 0 === o ? "" : o, s = t.page, c = void 0 === s ? 1 : s, n = t.size, p = void 0 === n ? 10 : n, i = t.sort_by, u = void 0 === i ? "relevancy" : i, l = a ? "&userId=".concat(a) : "";
    return e.requestTemplateApi("query?keywords=".concat(r, "&page=").concat(c, "&size=").concat(p, "&sort_by=").concat(u).concat(l, "&device_type=WEIXIN_APP"), "GET");
};

exports.fetchRecommendTopic = function() {
    return e.requestTemplateApi("topicsbox?page=0&size=0", "GET");
};

exports.fetchHomeFloorRecommend = function() {
    return e.requestTemplateApi("tabs?tabType=".concat("MINI_PROGRAM_HOME_FLOOR_WEIXIN", "&frm=roshan"), "GET");
};

exports.getSearchSuggestions = function(t) {
    var r = t.keywords, o = void 0 === r ? "" : r;
    return e.requestTemplateApi("search/suggestions?input=".concat(o), "GET");
};

exports.getSearchHistory = function(t) {
    var r = t.userId, o = void 0 === r ? "" : r, a = o ? "?userId=".concat(o) : "";
    return e.requestTemplateApi("search/histories".concat(a), "GET");
};

exports.deleteSearchHistory = function(t) {
    var r = t.userId, o = void 0 === r ? "" : r, a = o ? "?userId=".concat(o) : "";
    return e.requestTemplateApi("search/histories".concat(a), "POST");
};

exports.queryTemplateByFormToken = function() {
    var t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : "";
    return e.requestTemplateApi("searchByForm?formToken=".concat(t), "GET");
};

exports.fetchTemplateByToken = function(t) {
    var r = t.templateToken, o = void 0 === r ? "" : r;
    return e.requestTemplateApi("templates/".concat(o), "GET");
};

exports.queryGraphicFloorList = function() {
    return e.requestTemplateApi("roshan/ops/miniapp/floors", "GET");
};