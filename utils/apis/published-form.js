var e = require("../session");

module.exports = {
    show: function(s, r, u) {
        e.request("v2/f/" + s, "GET", {}, r, null, u);
    }
};