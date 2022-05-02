var e = require("../@babel/runtime/helpers/classCallCheck"), t = require("../@babel/runtime/helpers/createClass"), r = require("./field-formatter/index").createFormatter, a = require("util"), o = function() {
    function o(t, r) {
        e(this, o), this.rawEntries = t, this.fields = r, this.formatters = {};
    }
    return t(o, [ {
        key: "formatter",
        value: function(e) {
            return this.formatters[e.api_code] || (this.formatters[e.api_code] = r(e)), this.formatters[e.api_code];
        }
    }, {
        key: "formatFieldEntry",
        value: function(e, t) {
            if (t) {
                var r = "formatted_value_of_" + t.api_code, a = this.formatter(t).format(e);
                e[r] = a || "";
            }
        }
    }, {
        key: "execute",
        value: function() {
            var e = this;
            return this.rawEntries.map(function(t) {
                return t.formatted_created_at = a.formatTime(new Date(t.created_at)), e.fields.forEach(function(r) {
                    return e.formatFieldEntry(t, r);
                }), t;
            });
        }
    } ]), o;
}();

function i(e, t) {
    if (t) {
        var a = r(t), o = "formatted_value_of_" + t.api_code, i = a.formatToString(e);
        e[o] = i || "", "goods" === t.type && (e["goods_images_of_" + t.api_code] = a.goodsImages(e));
    }
}

module.exports = {
    EntryFormatter: o,
    execute: function(e, t) {
        return e.map(function(e) {
            return e.formatted_created_at = a.formatTime(new Date(e.created_at)), t.forEach(function(t) {
                i(e, t);
            }), e;
        });
    },
    executeForSingleEntryField: i,
    entryDateFormatter: function(e) {
        [ "created_at", "updated_at" ].forEach(function(t) {
            e[t] && (e[t] = a.formatTime(new Date(e[t])));
        });
    }
};