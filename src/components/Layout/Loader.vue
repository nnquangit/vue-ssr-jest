<template>
    <div :class="'loader-wrapper ' +(show?'active':'')">
        <div class="loader-overlay"></div>
        <div class="loader"></div>
    </div>
</template>
<script>
    export default {
        props: ['show'],
        mounted: function () {
            document.querySelector('body').appendChild(this.$el)
        }
    }
</script>