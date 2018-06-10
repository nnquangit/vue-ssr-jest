<template>
    <b-container class="my-3">
        <b-jumbotron>
            <template slot="header">
                Protected Page {{currentUser.fullname}}
            </template>
        </b-jumbotron>
    </b-container>
</template>
<script>
    import {AuthMix} from '../mixins'
    import {mapGetters} from 'vuex'

    export default {
        mixins: [AuthMix],
        computed: {
            ...mapGetters(['currentUser', 'isLoggedIn'])
        }
    }
</script>
