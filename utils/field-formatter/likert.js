Object.defineProperty(exports, "__esModule", {
    value: !0
}), exports.Likert = void 0;

var e = require("../../@babel/runtime/helpers/classCallCheck"), t = require("../../@babel/runtime/helpers/createClass"), r = require("../../@babel/runtime/helpers/inherits"), i = require("../../@babel/runtime/helpers/createSuper"), a = require("./base").Base, s = function(s) {
    r(c, a);
    var n = i(c);
    function c() {
        return e(this, c), n.apply(this, arguments);
    }
    return t(c, [ {
        key: "formatToString",
        value: function(e) {
            var t = this, r = e[this.field.api_code];
            return r ? (this.statementMap = this.statementMap || this.arrayToMap(this.field.statements), 
            this.choiceMap = this.choiceMap || this.arrayToMap(this.field.choices), r.map(function(e) {
                var r = t.statementMap[e.statement], i = t.choiceMap[e.choice];
                return "".concat(r, ": ").concat(i);
            })) : [];
        }
    } ]), c;
}();

exports.Likert = s;