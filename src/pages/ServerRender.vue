<template>
    <b-container class="my-3">
        <app-loader :show="usersList.fetch"/>
        <b-pagination v-model="usersList.info.page" :total-rows="30" :per-page="10" @change="onPage"></b-pagination>
        <app-user-info v-for="(e,i) in usersList.results" :key="i" v-bind="e"/>
    </b-container>
</template>
<script>
    import {vueActions, vueGetters} from 'exstore'

    let asyncData = ({store: {actions}, $route}) => {
        let page = Math.max(parseInt($route.query.page), 1)
        return Promise.all([actions.getUsers(page)])
    }

    export default {
        asyncData,
        data: () => ({}),
        mounted() {
            let page = Math.max(parseInt(this.$route.query.page), 1)
            let usersList = this.usersList

            if (!usersList.loaded || (usersList.info.page !== page)) {
                this.getUsers(page)
            }
        },
        watch: {
            $route() {
                this.getUsers(this.$route.query.page)
            }
        },
        computed: {
            ...vueGetters(['usersList'])
        },
        methods: {
            ...vueActions(['getUsers', 'increase']),
            onPage(page) {
                this.$router.push({path: this.$route.fullPath, query: {page}})
            }
        }
    }
</script>
