export default ({app, router, store}) => (to, from, next) => {
    const s = Date.now()
    const matched = router.getMatchedComponents(to)

    if (!matched.length) {
        return next()
    }

    Promise.all(matched.map(c => {
        if (c.asyncData) {
            return c.asyncData({$store: store, $route: to, $router: router})
        }
    })).then(next).catch(next)
}
