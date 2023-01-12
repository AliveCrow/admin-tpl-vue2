

const state = {
    tagStack: [],
    keepAliveTagStack: [] //只有名称匹配的组件会被缓存 eg: ['a', 'b', 'c']
}
const mutations = {
    SET_TAG_STACK(state, tagStack) {
        state.tagStack = tagStack
        state.keepAliveTagStack = tagStack.map(r => r.name)
    },
    SET_KEEP_ALIVE_TAG_STACK(state, tagStack) {
        state.keepAliveTagStack = tagStack.map(r => r.name)
    },
    ADD_TAG(state, tag) {
        const isNewTag = state.tagStack.some(t => t.name !== tag.name)
        if (isNewTag) {
            state.tagStack.push(tag)
            state.keepAliveTagStack.push(tag.name)
        }
    },
    REMOVE_TAG(state, tag) {
        state.tagStack = state.tagStack.filter(t => t.name !== tag.name)
        state.keepAliveTagStack = state.tagStack.map(r => r.name)
    },
}
const actions = {

}

export default {
    namespaced: true,
    state,
    actions,
    mutations,
}