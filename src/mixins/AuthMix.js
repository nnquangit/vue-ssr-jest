let login = '/'

export const AuthMix = {
    beforeMount: function () {
        console.log('AuthMix', this)
        // if (!this.isLoggedIn) {
        //     this.$router.push(login)
        // }
    },
    watch: {
        // isLoggedIn(newval) {
        //     if (!newval) {
        //         this.$router.push(login)
        //     }
        // }
    },
    computed: {
        // ...mapGetters(['isLoggedIn'])
    }
}
