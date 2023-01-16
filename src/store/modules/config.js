const state = {
    isFold: false
}
const mutations = {
    TOGGLE_FOLD: (state, isFold) => {
        state.isFold = isFold
    }
}
const actions = {}

export default {
    state,
    mutations,
    actions,
    namespaced: true,
}