const fs = require('fs')
const path = require('path')
const LRU = require('lru-cache')
const express = require('express')
const cookieParser = require('cookie-parser')
const favicon = require('serve-favicon')
const compression = require('compression')
const resolve = file => path.resolve(__dirname, file)
const {createBundleRenderer} = require('vue-server-renderer')
const redirects = require('./src/router/301.json')

const isProd = process.env.NODE_ENV === 'production'
const useMicroCache = process.env.MICRO_CACHE !== 'false'
const serverInfo =
    `express/${require('express/package.json').version} ` +
    `vue-server-renderer/${require('vue-server-renderer/package.json').version}`

const app = express()

const template = fs.readFileSync(resolve('./src/index.html'), 'utf-8')

function createRenderer(bundle, options) {
    return createBundleRenderer(bundle, Object.assign(options, {
        template,
        cache: LRU({max: 1000, maxAge: 1000 * 60 * 15}),
        basedir: resolve('./public'),
        runInNewContext: true
    }))
}

let renderer
let readyPromise
if (isProd) {
    const bundle = require('./public/vue-ssr-server-bundle.json')
    const clientManifest = require('./public/vue-ssr-client-manifest.json')
    renderer = createRenderer(bundle, {clientManifest})
} else {
    readyPromise = require('./build/setup-dev-server')(app, (bundle, options) => {
        renderer = createRenderer(bundle, options)
    })
}

const serve = (path, cache) => express.static(resolve(path), {
    maxAge: cache && isProd ? 60 * 60 * 24 * 30 : 0
})

app.use(cookieParser())
app.use(compression({threshold: 0}))
app.use(favicon('./static/favicon.ico'))
app.use('/static', serve('./static', true))
app.use('/public', serve('./public', true))
app.use('/static/robots.txt', serve('./robots.txt'))
app.get('/sitemap.xml', (req, res) => {
    res.setHeader("Content-Type", "text/xml")
    res.sendFile(resolve('./static/sitemap.xml'))
})

// 301 redirect for changed routes
Object.keys(redirects).forEach(k => {
    app.get(k, (req, res) => res.redirect(301, redirects[k]))
})

const microCache = LRU({max: 100, maxAge: 1000})
const isCacheable = req => useMicroCache

function render(req, res) {
    const s = Date.now()

    res.setHeader("Content-Type", "text/html")
    res.setHeader("Server", serverInfo)

    const handleError = err => {
        if (err && err.code === 404) {
            res.status(404).end('404 | Page Not Found')
        } else {
            // Render Error Page or Redirect
            res.status(500).end('500 | Internal Server Error')
            console.error(`error during render : ${req.url}`)
            console.error(err.stack)
        }
    }

    const cacheable = isCacheable(req)
    if (cacheable) {
        const hit = microCache.get(req.url)
        if (hit) {
            if (!isProd) {
                console.log(`cache hit!`)
            }
            return res.end(hit)
        }
    }

    const context = {url: req.url, req, res}
    renderer.renderToString(context, (err, html) => {
        if (err) {
            return handleError(err)
        }
        res.end(html)
        if (cacheable) {
            microCache.set(req.url, html)
        }
        if (!isProd) {
            console.log(`Request: ${Date.now() - s}ms`)
        }
    })
}

app.get('*', isProd ? render : (req, res) => {
    readyPromise.then(() => render(req, res))
})

const port = process.env.PORT || 9090
app.listen(port, '0.0.0.0', () => console.log(`server started at localhost:${port}`))
