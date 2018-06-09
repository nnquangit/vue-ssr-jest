<template>
    <b-container class="my-3">
        <app-loader v-if="fetch"/>
        <b-pagination
                align="center"
                v-model="usersListInfo.page"
                :total-rows="100" :per-page="10"
                @change="onChange"></b-pagination>
        <div class="my-3">
            <b-media v-for="(e,i) in usersList" :key="i">
                <b-img slot="aside" :src="e.picture.thumbnail"/>
                <h6 class="mt-0">{{e.email}}</h6>
                <p>Registered {{e.registered}}</p>
            </b-media>
        </div>
        <div class="text-center">Current Page: {{usersListInfo.page}}</div>
    </b-container>
</template>
<script>
    import {mapActions, mapGetters} from 'vuex'

    let asyncData = ({$store, $route}) => {
        let page = Math.max(parseInt($route.query.page), 1)
        return Promise.all([$store.dispatch('getUsers', page)])
    }

    export default {
        asyncData,
        data: () => ({}),
        mounted() {
            if (!this.usersList.length) {
                asyncData(this)
            }
        },
        watch: {
            $route() {
                asyncData(this)
            }
        },
        computed: {
            ...mapGetters(['usersList', 'usersListInfo']),
            fetch() {
                return this.$store.state.users.list.fetch
            }
        },
        methods: {
            ...mapActions(['getUsers']),
            onChange(page) {
                this.$router.push({path: this.$route.fullPath, query: {page}})
            }
        }
    }
</script>
