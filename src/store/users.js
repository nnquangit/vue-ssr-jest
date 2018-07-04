export const actionsConst = {
    list: {
        FETCH: 'USERS_LIST_FETCH',
        FETCH_SUCCESS: 'USERS_LIST_FETCH_SUCCESS',
        FETCH_FAIL: 'USERS_LIST_FETCH_FAIL'
    }
}

const state = {
    list: {fetch: false, results: [], info: {}, loaded: false}
}

const actions = {
    getUsers({commit, state, store: {services: {api}}}, page = 1) {
        commit(actionsConst.list.FETCH)
        return api.get('https://randomuser.me/api/?results=10&nat=us&page=' + page)
            .then(res => {
                commit(actionsConst.list.FETCH_SUCCESS, res)
                return res
            })
            .catch(res => {
                commit(actionsConst.list.FETCH_FAIL, res)
                return res
            })
    }
}

const mutations = {
    [actionsConst.list.FETCH]: (state) => state.list.fetch = true,
    [actionsConst.list.FETCH_SUCCESS]: (state, res) => state.list = {...res.data, fetch: false, loaded: true},
    [actionsConst.list.FETCH_FAIL]: (state) => state.list.fetch = false
}

const getters = {
    usersList: (state) => state.list,
    usersListInfo: (state) => state.list.info
}

export default {state, actions, mutations, getters}
