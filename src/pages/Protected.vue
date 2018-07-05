<template>
    <app-nossr v-if="isLoggedIn">
        <b-container class="my-3">
            <b-jumbotron>
                <pre>{{JSON.stringify(currentUser,true, ' ')}}</pre>
                <b-button type="button" variant="danger" @click="signout">Logout</b-button>
                <template slot="header">
                    Protected Page
                </template>
            </b-jumbotron>
        </b-container>
    </app-nossr>
</template>
<script>
    import {AuthMix} from '../mixins'
    import {vueActions, vueGetters} from 'exstore'

    export default {
        mixins: [AuthMix],
        computed: {...vueGetters(['currentUser', 'isLoggedIn'])},
        methods: {...vueActions(['signout'])}
    }
</script>
