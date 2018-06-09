<template>
    <div id="app">
        <app-navbar/>
        <router-view></router-view>
        <app-modal-login/>
    </div>
</template>
<script>
    export default {
        data: () => ({})
    }
</script>