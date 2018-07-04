<template>
    <b-modal id="modalLogin" ref="modalRef" hide-footer :title="'Account Login'.toUpperCase()">
        <b-form @submit="onSubmit" @reset="onReset">
            <b-form-group label="Username">
                <b-form-input type="text" v-model="form.fullname" required placeholder="Enter username"/>
            </b-form-group>
            <b-form-group>
                <b-button type="submit" variant="primary" block>Signin</b-button>
            </b-form-group>
        </b-form>
    </b-modal>
</template>
<script>
    import {vueActions} from '../../../plugins/exstore'

    export default {
        data: () => ({
            redirect: false,
            form: {
                fullname: '',
                token: 'Bearer sample 123456'
            }
        }),
        mounted() {
            this.$root.$on('modalLogin:show', (redirect) => {
                this.redirect = redirect
                this.$refs.modalRef.show()
            })
        },
        methods: {
            ...vueActions(['signin']),
            onSubmit(evt) {
                evt.preventDefault()
                this.$refs.modalRef.hide()
                this.$router.push(this.redirect)
                this.signin(this.form)
            },
            onReset(evt) {
                evt.preventDefault()
                this.form.fullname = ''
            }
        }
    }
</script>