export default ({app, router, store}) => (to, from, next) => {
    const s = Date.now()
    const matched = router.getMatchedComponents(to)

    if (!matched.length) {
        return next()
    }
    // store.dispatch('setAppRouting', true)

    Promise.all(matched.map(c => {
        if (c.asyncData) {
            return c.asyncData({$store: store, $route: to, $router: router})
        }
    })).then(() => {
        console.log(`data pre-fetch: ${Date.now() - s}ms`)
    }).catch(() => {
        console.log(`data error pre-fetch: ${Date.now() - s}ms`)
    })

    return next()
}
