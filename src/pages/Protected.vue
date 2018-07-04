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
    import {vueActions, vueGetters} from '../plugins/exstore'

    export default {
        mixins: [AuthMix],
        computed: {...vueGetters(['currentUser', 'isLoggedIn'])}
    }
</script>
