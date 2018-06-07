<template>
    <b-container class="my-3">
        <b-jumbotron>
            <template slot="header">
                Protected Page
            </template>
        </b-jumbotron>
    </b-container>
</template>
<script>
  import {AuthMix} from '../mixins'

  export default {
    mixins: [AuthMix]
  }
</script>
