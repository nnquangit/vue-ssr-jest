export const actionsConst = {
  SIGNIN: 'AUTH_SIGNIN',
  SIGNOUT: 'AUTH_SIGNOUT',
}

const state = {isLoggedIn: false, user: {}}

const actions = {
  signin: ({commit, state, rootState: {api}}, user) => commit(actionsConst.SIGNIN, user),
  signout: ({commit, state}) => commit(actionsConst.SIGNOUT)
}

const mutations = {
  [actionsConst.SIGNIN]: (state, user) => Object.assign(state, {isLoggedIn: true, user}),
  [actionsConst.SIGNOUT]: (state) => Object.assign(state, {isLoggedIn: false, user: {}})
}

const getters = {
  currentUser: (state) => state.user,
  isLoggedIn: (state) => state.isLoggedIn
}

export default {state, actions, mutations, getters}
