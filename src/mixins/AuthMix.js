let login = '/login'

export const AuthMix = {
    beforeMount: function () {
        if (!this._isLoggedIn) {
            this.$router.push({path: login, query: {redirect: this.$route.fullPath}})
        }
    },
    watch: {
        _isLoggedIn(newval) {
            if (!newval) {
                this.$router.push(login)
            }
        }
    },
    computed: {
        _isLoggedIn: function () {
            return this.$store.getters.isLoggedIn()
        }
    }
}
