const define = {
    SIGNIN: 'AUTH_SIGNIN',
    SIGNOUT: 'AUTH_SIGNOUT'
}

const state = {isLoggedIn: false, user: {}}

const actions = {
    signin: ({commit, state}, user) => commit(define.SIGNIN, user),
    signout: ({commit}) => commit(define.SIGNOUT)
}

const mutations = {
    [define.SIGNIN]: (state, user) => Object.assign(state, {isLoggedIn: true, user}),
    [define.SIGNOUT]: (state) => Object.assign(state, {isLoggedIn: false, user: {}})
}

const getters = {
    currentUser: (state) => state.user,
    isLoggedIn: (state) => state.isLoggedIn
}

export default {define, state, actions, mutations, getters}
