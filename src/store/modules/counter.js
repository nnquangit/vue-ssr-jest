const define = {
    ADD: 'COUNTER_ADD'
}

const state = {current: 10}

const actions = {
    addCounter: ({commit}) => commit(define.ADD)
}

const mutations = {
    [define.ADD]: (state) => state.current += 1
}

const getters = {
    currentCounter: (state) => state.current
}

export default {define, state, actions, mutations, getters}
