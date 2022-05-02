Object.defineProperty(exports, "__esModule", {
    value: !0
}), exports.Attachment = void 0, require("../../@babel/runtime/helpers/Arrayincludes");

var s = require("../../@babel/runtime/helpers/classCallCheck"), e = require("../../@babel/runtime/helpers/createClass"), t = require("../../@babel/runtime/helpers/inherits"), p = require("../../@babel/runtime/helpers/createSuper"), a = require("./base").Base, i = function(i) {
    t(n, a);
    var r = p(n);
    function n() {
        return s(this, n), r.apply(this, arguments);
    }
    return e(n, [ {
        key: "attachmentIcon",
        value: function(s) {
            var e = {
                default: "/assets/imgs/attachment.png",
                pdf: "/assets/imgs/pdf.png",
                txt: "/assets/imgs/txt.png",
                doc: "/assets/imgs/doc.png",
                docx: "/assets/imgs/docx.png",
                ppt: "/assets/imgs/ppt.png",
                pptx: "/assets/imgs/pptx.png",
                xls: "/assets/imgs/xls.png",
                xlsx: "/assets/imgs/xlsx.png",
                jpg: "/assets/imgs/jpg.png",
                png: "/assets/imgs/png.png",
                rar: "/assets/imgs/rar.png",
                zip: "/assets/imgs/zip.png",
                mp3: "/assets/imgs/mp3.png",
                mp4: "/assets/imgs/mp4.png",
                avi: "/assets/imgs/avi.png",
                gif: "/assets/imgs/gif.png",
                jpeg: "/assets/imgs/jpeg.png",
                mpg: "/assets/imgs/mpg.png",
                rm: "/assets/imgs/rm.png",
                mov: "/assets/imgs/mov.png"
            };
            return e[s = s in e ? s : "default"];
        }
    }, {
        key: "formatToString",
        value: function(s) {
            var e = this;
            return (s[this.field.api_code] || []).map(function(s) {
                var t = s.url.split("?"), p = s.name.split(".")[s.name.split(".").length - 1];
                return [ "jpg", "png", "jpeg" ].includes(p) ? (s.preview_url = t[0] + "@enlarge?" + t[1], 
                s.previewable = !0) : (s.preview_url = e.attachmentIcon(p), s.previewable = !1), 
                s;
            });
        }
    } ]), n;
}();

exports.Attachment = i;