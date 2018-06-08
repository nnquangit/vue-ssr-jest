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
  import {mapActions} from 'vuex'

  export default {
    data: () => ({
      redirect: false,
      form: {
        fullname: '',
        token: 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwczovL2dpdGh1Yi5jb20vbm5xdWFuZ2l0L3Z1ZS1zc3ItamVzdCIsImlhdCI6MTUyMDY3OTc2MiwiZXhwIjoxNTIwNjgzMzYyLCJuYmYiOjE1MjA2Nzk3NjIsImp0aSI6Ikh4OVBISTJzTmNLc0l2dFUiLCJzdWIiOjMsInBydiI6IjIzYmQ1Yzg5NDlmNjAwYWRiMzllNzAxYzQwMDg3MmRiN2E1OTc2ZjciLCJuYW1lIjoiUXVhbmcgTmfDtCIsImVtYWlsIjoibm5xdWFuZ2l0QGdtYWlsLmNvbSJ9.Y1M_924FNC-eN8yyTF_g9gAdiG46mKpEga8fj4tsgkI'
      },
    }),
    mounted() {
      this.$root.$on('modalLogin:show', (redirect) => {
        this.redirect = redirect
        this.$refs.modalRef.show()
      })
    },
    methods: {
      ...mapActions(['signin']),
      onSubmit(evt) {
        evt.preventDefault();
        this.$refs.modalRef.hide()
        this.$router.push(this.redirect)
        this.signin(this.form)
      },
      onReset(evt) {
        evt.preventDefault();
        this.form.fullname = '';
      }
    }
  }
</script>