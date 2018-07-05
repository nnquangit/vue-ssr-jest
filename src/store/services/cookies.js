import * as Cookies from 'js-cookie'

export function createCookies(ssrContext) {
    if (ssrContext && ssrContext.req && ssrContext.res) {
        return {
            getItem: key => ssrContext.req.cookies[key],
            setItem: (key, value) => ssrContext.res.cookie(key, value),
            removeItem: key => ssrContext.res.clearCookie(key)
        }
    }

    return {
        getItem: key => Cookies.get(key),
        setItem: (key, value) => Cookies.set(key, value, {expires: 3}),
        removeItem: key => Cookies.remove(key)
    }
}
