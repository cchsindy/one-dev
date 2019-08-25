const state = {
  blackbaudStudents: []
}

const getters = {

}

const actions = {
  getBlackbaudStudents({ commit, rootState }) {
    commit('CLEAR_BB_STUDENTS')
    const sky = rootState.fbFunctions.httpsCallable('skyapi')
    sky({ product: 'school', url: 'users/extended', params: {
      base_role_ids: '14'
      }
    })
    .then(result => {
      commit('ADD_BB_STUDENTS', result.data.value)
    })
  }
}

const mutations = {
  ADD_BB_STUDENTS(state, data) {
    state.blackbaudStudents = data
  },
  CLEAR_BB_STUDENTS(state) {
    state.blackbaudStudents = []
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
