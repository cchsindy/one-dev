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
      const s = []
      for (const r of result.data.value) {
        s.push({
          id: r.id,
          host_id: r.host_id,
          last_name: r.last_name,
          first_name: r.first_name,
          nick_name: r.nick_name,
          grade_level: r.student_info.grade_level_description
        })
      }
      commit('ADD_BB_STUDENTS', s)
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
