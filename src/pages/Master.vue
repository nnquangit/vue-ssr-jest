<template>
    <div id="app">
        <b-navbar toggleable="md" type="light" variant="light">
            <b-container>
                <b-navbar-brand to="/"><i class="mdi mdi-home" /></b-navbar-brand>
                <b-navbar-toggle target="nav_collapse"></b-navbar-toggle>
                <b-collapse is-nav id="nav_collapse">
                    <b-navbar-nav>
                        <b-nav-item to="/login">Login</b-nav-item>
                        <b-nav-item to="/protected">Protected</b-nav-item>
                        <b-nav-item to="/serverrender">ServerRender</b-nav-item>
                    </b-navbar-nav>
                </b-collapse>
            </b-container>
        </b-navbar>
        <router-view></router-view>
    </div>
</template>
<script>
    export default {
        data: () => ({})
    }
</script>