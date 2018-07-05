export function ssrPlugin(params) {
    return (_store) => {
        if (process.browser) {
            if (_store) {
                if (window.__INITIAL_STATE__) {
                    _store.replaceState(window.__INITIAL_STATE__)
                    delete window.__INITIAL_STATE__
                }
            }
        }
    }
}
