Component({
    properties: {
        form: {
            type: Object,
            value: null
        },
        pcMode: {
            type: Boolean,
            value: !1
        }
    },
    attached: function() {},
    methods: {
        _editField: function(e) {
            this.triggerEvent("editField", e.currentTarget.dataset);
        }
    }
});