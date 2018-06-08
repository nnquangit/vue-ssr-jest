import * as Cookies from 'js-cookie'

export function createStoreStorage(ssrContext) {

  if (process.browser) {
    return {
      getItem: key => Cookies.get(key),
      setItem: (key, value) => Cookies.set(key, value, {expires: 3}),
      removeItem: key => Cookies.remove(key)
    }
  }

  return {
    getItem: key => ssrContext.req.cookies[key],
    setItem: (key, value) => ssrContext.res.cookie(key, JSON.stringify(value)),
    removeItem: key => ssrContext.res.clearCookie(key)
  }
}