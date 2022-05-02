Component({
    options: {
        multipleSlots: !0
    },
    properties: {
        visible: {
            type: Boolean,
            value: !1
        },
        backdropClosable: {
            type: Boolean,
            value: !0
        }
    },
    data: {},
    methods: {
        handleTap: function() {},
        transitionEnd: function() {},
        clickBackdrop: function() {
            this.triggerEvent("backdropClicked", {}, {});
        }
    },
    ready: function() {}
});