export default {
  namespaced: true,
  state: {
    userInfo: {}
  },
  mutations: {
    updateUser (state, item) {
      console.log(item)
      state.userInfo = item
      console.log(state)
    }
  },
  getters: {
    getUser (state) {
      console.log(state)
      return state.userInfo
    }
  },
  actions: {
    updateUser (context, item) {
      console.log(item)
      context.commit('updateUser', item)
    }
  }
}
