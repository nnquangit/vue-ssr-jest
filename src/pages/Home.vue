<template>
    <b-container class="my-3">
        <b-button variant="primary" @click="addCounter">
            Counter
            <b-badge variant="light">{{currentCounter}}</b-badge>
        </b-button>
        <br/><br/>
        <b-jumbotron>
            <template slot="header">{{title}}</template>
        </b-jumbotron>
    </b-container>
</template>
<script>
    import {vueActions, vueGetters} from 'exstore'

    export default {
        data: () => ({title: 'Hello world!'}),
        computed: {...vueGetters(['currentCounter'])},
        methods: {...vueActions(['addCounter'])}
    }
</script>
