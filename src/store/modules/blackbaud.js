const state = {
  blackbaudSections: [],
  blackbaudStudents: [],
  interval: null
}

const getters = {
}

const actions = {
  getBlackbaudSections({ commit, rootState }) {
    commit('CLEAR_BB_SECTIONS')
    const sky = rootState.fbFunctions.httpsCallable('skyapi')
    sky({ product: 'school', url: 'academics/sections', params: {
      level_num: 2175,
      school_year: '2019-2020'
      }
    })
    .then(result => {
      const s = []
      for (const r of result.data.value) {
        if (r.duration.name === '1st Semester')
        s.push({
          id: r.id,
          code: r.course_code,
          name: r.name,
          year: r.school_year,
          section: r.section_identifier,
          term: r.duration.name
        })
      }
      commit('ADD_BB_SECTIONS', s)
    })
  },
  getBlackbaudStudents({ commit, rootState }) { // dispatch, state
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
      // let i = 0
      // state.interval = setInterval(() => {
      //   dispatch('getBlackbaudStudentEnrollments', i)
      //   i++
      // }, 250)
    })
  },
  getBlackbaudStudentEnrollments({ commit, rootState, state }, index) {
    if (index >= state.blackbaudStudents.length) {
      // clearInterval(state.interval)
    } else {
      const id = state.blackbaudStudents[index].id
      const sky = rootState.fbFunctions.httpsCallable('skyapi')
      sky({ product: 'school', url: `academics/enrollments/${id}`, params: {
        school_year: '2019-2020'
        }
      })
      .then(result => {
        const e = []
        for (const r of result.data.value) {
          if (r.duration_name === '1st') {
            e.push({
                code: r.course_code,
                name: r.course_title,
                section: r.section_identifier
            })
          }
        }
        commit('ADD_BB_ENROLLMENT', { index, enrollments: e })
      })
    }
  }
}

const mutations = {
  ADD_BB_ENROLLMENT(state, data) {
    state.blackbaudStudents[data.index].enrollments = data.enrollments
  },
  ADD_BB_SECTIONS(state, data) {
    state.blackbaudSections = data
  },
  CLEAR_BB_SECTIONS(state) {
    state.blackbaudSections = []
  },
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
