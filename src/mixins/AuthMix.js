import {mapGetters} from 'vuex'

let login = '/'

export const AuthMix = {
    beforeMount: function () {
        if (!this.isLoggedIn) {
            this.$router.push(login)
        }
    },
    watch: {
        isLoggedIn(newval) {
            if (!newval) {
                this.$router.push(login)
            }
        }
    },
    computed: {
        ...mapGetters(['isLoggedIn'])
    }
}
