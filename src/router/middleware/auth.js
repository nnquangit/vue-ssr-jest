export default ({app, router, store}) => (to, from, next) => {
    const auth = to.matched.some(record => record.meta.auth)

    if (!auth) {
        return next()
    }

    if (store.getters.isLoggedIn) {
        return next()
    }

    return router.push('/login')
}
