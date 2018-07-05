export function persitAuthPlugin(params) {
    return (_store) => {
        let {$cookies} = _store.getServices()
        let saved = $cookies.getItem('__auth')

        if (saved) {
            _store.replaceState({..._store.getState(), auth: JSON.parse(saved)})
        }

        if (process.env.VUE_ENV === 'client') {
            _store.subscribe((msg) => $cookies.setItem('__auth', JSON.stringify(_store.getState().auth)))
        }
    }
}
