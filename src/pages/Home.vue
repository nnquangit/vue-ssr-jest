<template>
    <b-container class="my-3">
        <b-jumbotron>
            <template slot="header">{{title}}</template>
        </b-jumbotron>
    </b-container>
</template>
<script>

    export default {
        data: () => ({title: 'Wellcome pagesas'})
    }
</script>
