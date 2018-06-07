<template>
    <b-container class="my-3">
        <div class="loader"></div>
        <b-media v-for="(e,i) in usersList" :key="i">
            <b-img slot="aside" blank blank-color="#ccc" width="64" alt="placeholder" :src="e.picture.thumbnail"/>
            <h5 class="mt-0">{{e.email}}</h5>
            <p>
                {{e.picture.thumbnail}}
                Cras sit amet nibh libero, in gravida nulla. Nulla vel metus scelerisque ante
                sollicitudin. Cras purus odio, vestibulum in vulputate at, tempus viverra turpis.
                Fusce condimentum nunc ac nisi vulputate fringilla. Donec lacinia congue felis
                in faucibus.
            </p>
        </b-media>
    </b-container>
</template>
<script>
  import {mapActions, mapGetters} from 'vuex'

  let asyncData = ({$store, $route}) => {
    console.log('getUsers ssr')
    return Promise.all([$store.dispatch('getUsers', 1)])
  }

  export default {
    asyncData,
    data: () => ({}),
    computed: {
      ...mapGetters(['usersList']),
      fetch() {
        return this.$store.state.users.list.fetch;
      }
    },
    methods: {
      ...mapActions(['getUsers'])
    }
  }
</script>
