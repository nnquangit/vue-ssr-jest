import {createApp} from './app'

const isDev = process.env.NODE_ENV !== 'production'

export default context => {
    return new Promise((resolve, reject) => {
        const {app, store, $router} = createApp(context)

        // context.meta = app.$meta()
        $router.push(context.url)
        $router.onReady(() => {
            const s = isDev && Date.now()
            const matched = $router.getMatchedComponents()

            if (!matched.length) {
                reject({code: 404})
            }

            Promise.all(matched.map(c => {
                if (c.asyncData) {
                    return c.asyncData({store, $router, $route: $router.currentRoute})
                }
            })).then(() => {
                isDev && console.log(`asyncData: ${Date.now() - s}ms`)
                context.state = store.state
                resolve(app)
            }).catch(reject)
        }, reject)
    })
}
