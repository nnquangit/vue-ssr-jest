export default {
    data: () => ({client: false}),
    mounted: function () {
        this.client = true
    },
    render: function (h) {
        return this.client ? this.$slots.default[0] : ''
    }
}
