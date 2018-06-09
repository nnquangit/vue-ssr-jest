<template>
    <b-navbar toggleable="md" type="light" variant="light">
        <b-container>
            <b-navbar-brand to="/">Brand</b-navbar-brand>
            <b-navbar-toggle target="nav_collapse"></b-navbar-toggle>
            <b-collapse is-nav id="nav_collapse">
                <b-navbar-nav>
                    <b-nav-item to="/protected">Protected</b-nav-item>
                    <b-nav-item to="/serverrender">ServerRender</b-nav-item>
                </b-navbar-nav>
                <app-nossr>
                    <b-navbar-nav class="ml-auto">
                        <b-nav-item @click="$root.$emit('modalLogin:show','/')" v-if="!isLoggedIn">Sign In</b-nav-item>
                        <b-nav-item v-if="isLoggedIn">{{currentUser.fullname}}</b-nav-item>
                        <b-nav-item v-if="isLoggedIn" @click="signout()">Sign Out</b-nav-item>
                    </b-navbar-nav>
                </app-nossr>
            </b-collapse>
        </b-container>
    </b-navbar>
</template>
<script>
    import {mapActions, mapGetters} from 'vuex'

    export default {
        data: () => ({}),
        computed: {
            ...mapGetters(['currentUser', 'isLoggedIn'])
        },
        methods: {
            ...mapActions(['signout'])
        }
    }
</script>