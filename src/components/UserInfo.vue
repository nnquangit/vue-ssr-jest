<template>
    <b-media>
        <b-img slot="aside" :src="picture.thumbnail"/>
        <h6 class="mt-0">{{email}}</h6>
        <p>Registered {{registered}}</p>
    </b-media>
</template>
<script>
    export default {
        props: ['email', 'picture', 'registered']
    }
</script>