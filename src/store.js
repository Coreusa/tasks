import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate'

Vue.use(Vuex)

export default new Vuex.Store({
  plugins: [createPersistedState(
    {
      key: 'taskboard',
      paths: [
        'board'
      ]
    }
  )],
  state: {
    board: []
  },
  mutations: {
    storeBoard (state, data) {
      state.board = data
    }
  },
  actions: {
    saveBoard ({ commit, state }, data) {
      commit('storeBoard', data)
    }
  },
  getters: {
    board: (state) => {
      return state.board
    }
  }
})
