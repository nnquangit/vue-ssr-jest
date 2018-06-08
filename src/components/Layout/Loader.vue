<template>
    <div class="loader-wrapper">
        <div class="loader-overlay"></div>
        <div class="loader"></div>
    </div>
</template>
<script>
  export default {
    mounted: function () {
      document.querySelector('body').appendChild(this.$el)
    }
  }
</script>