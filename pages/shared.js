Object.defineProperty(exports, "__esModule", {
    value: !0
}), exports.formatTpls = exports.formatTpl = void 0;

var r = function(r) {
    var e = r.id, t = r.name, o = r.description, a = r.summary, s = r.header_image_url, n = r.cover_url, u = r.structure, i = [];
    try {
        i = u.length > 0 ? JSON.parse(u) : [];
    } catch (r) {
        console.log(r);
    }
    return {
        id: e,
        name: t,
        description: o,
        summary: a,
        thumb: n,
        header_image: {
            url: s
        },
        fields: i
    };
};

exports.formatTpl = r;

exports.formatTpls = function(e) {
    return e instanceof Array ? e.map(function(e) {
        return r(e);
    }) : [];
};