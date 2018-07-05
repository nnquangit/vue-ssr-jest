<template>
    <b-navbar toggleable="md" type="light" variant="light">
        <b-container>
            <b-navbar-brand to="/">Brand</b-navbar-brand>
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
</template>
<script>
    export default {}
</script>