const state = {
  canvasStudents: []
}

const getters = {

}

const actions = {
  getCanvasStudents({ commit, rootState }) {
    commit('CLEAR_CANVAS_STUDENTS')
    const canvas = rootState.fbFunctions.httpsCallable('canvasFetch')
    canvas({ url: 'accounts/1/users', params: {
      enrollment_type: 'StudentEnrollment',
      per_page: 100
      }
    })
    .then(result => {
      // const s = []
      // for (const r of result.data) {
      //   s.push({
      //     id: r.id,
      //     host_id: r.host_id,
      //     last_name: r.last_name,
      //     first_name: r.first_name,
      //     nick_name: r.nick_name,
      //     grade_level: r.student_info.grade_level_description
      //   })
      // }
      commit('ADD_CANVAS_STUDENTS', result.data)
    })
  }
}

const mutations = {
  ADD_CANVAS_STUDENTS(state, data) {
    state.canvasStudents = data
  },
  CLEAR_CANVAS_STUDENTS(state) {
    state.canvasStudents = []
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
