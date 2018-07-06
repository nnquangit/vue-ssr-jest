import {initApp} from './app'
import {createRenderer} from 'vue-server-renderer'

export function createApp(context) {
    const {app, store, $router} = initApp(context)

    $router.push(context.req.url)

    return new Promise((resolve, reject) => {
        $router.onReady(() => {
            const matched = $router.getMatchedComponents()
            Promise.all(matched.map(c => {
                if (c.asyncData) {
                    return c.asyncData({store, $router, $route: $router.currentRoute})
                }
            })).then(() => createRenderer().renderToString(app, (err, html) => {
                resolve({html, state: store.getStateCapture(), err})
            })).catch(() => {
                resolve({html: '', state: {}, code: 404})
            })
        }, reject)
    })
}
