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
    const sync = rootState.fbFunctions.httpsCallable('canvasSync') //, { timeout: 120000 })
    sync().then(result => {
      commit('ADD_BB_STUDENTS', result.data)
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
