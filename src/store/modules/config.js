
const config = {
    state: {
        isFold: false
    },
    mutations: {
        TOGGLE_FOLD: (state, isFold) => {
            state.isFold = isFold
        }
    },
    actions: {},
}

export default {
    namespaced: true,
    ...config
}