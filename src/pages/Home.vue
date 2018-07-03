<template>
    <b-container class="my-3">
        {{current}}
        <div @click="increase">Tang</div>
        <b-jumbotron>
            <template slot="header">{{title}}</template>
        </b-jumbotron>
    </b-container>
</template>
<script>
    import {vueActions, vueGetters} from '../plugins/exstore'

    export default {
        data: () => ({title: 'Wellcome pagesas'}),
        computed: {
            ...vueGetters(['current']),
        },
        actions: {
            ...vueActions(['increase']),
        }
    }
</script>
