<template>
    <app-nossr>
        <b-container class="my-3">
            <div v-if="isLoggedIn">
                <pre>{{JSON.stringify(currentUser, true, ' ')}}</pre>
                <b-button type="button" variant="danger" @click="signout">Logout</b-button>
            </div>
            <b-form @submit="onSubmit" v-if="!isLoggedIn">
                <b-form-group id="fullname" label="Fullname" label-for="txtFullname">
                    <b-form-input id="txtFullname" type="text" v-model="form.fullname" required></b-form-input>
                </b-form-group>
                <b-button type="submit" variant="primary">Submit</b-button>
            </b-form>
        </b-container>
    </app-nossr>
</template>
<script>
    import {vueActions, vueGetters} from 'exstore'

    export default {
        data: () => ({
            form: {
                fullname: '',
                token: 'Bearer sample 123456'
            }
        }),
        computed: {...vueGetters(['currentUser', 'isLoggedIn'])},
        methods: {
            ...vueActions(['signin', 'signout']),
            onSubmit(evt) {
                evt.preventDefault()
                this.signin(this.form)
                this.$router.push(this.$route.query.redirect || '/')
            }
        }
    }
</script>
