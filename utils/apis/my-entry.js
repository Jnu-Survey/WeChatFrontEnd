var e = require("../session");

module.exports = {
    list: function(r, s, t) {
        var i = "v2/my_entries", n = [];
        for (var o in r) n.push(o + "=" + r[o]);
        n.length > 0 && (i = i + "?" + n.join("&")), e.request(i, "GET", {}, s, t);
    },
    show: function(r, s, t) {
        var i = "v2/forms/" + r + "/my_entries/" + s;
        e.request(i, "GET", {}, t);
    }
};