const state = {
  blackbaudStudents: []
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
  getBlackbaudStudents({ commit, rootState }) {
    commit('CLEAR_BB_STUDENTS')
    const sky = rootState.fbFunctions.httpsCallable('skyapi')
    sky({ product: 'school', url: 'users/extended', params: {
        base_role_ids: '14'
      }
    })
    .then(result => {
      const students = []
      for (const r of result.data.value) {
        const s = {
          id: r.id,
          host_id: r.host_id,
          last_name: r.last_name,
          first_name: r.first_name,
          nick_name: r.nick_name,
          grade_level: r.student_info.grade_level_description
        }
        students.push(s)
      }
      commit('ADD_BB_STUDENTS', students)
    })
  },
  syncStudent({ commit, rootState, state }, { index, vm }) {
    const sky = rootState.fbFunctions.httpsCallable('skyapi')
    sky({ product: 'school', url: `academics/enrollments/${state.blackbaudStudents[index].id}`, params: {
        school_year: '2019-2020'
      }
    })
    .then(result => {
      const courses = []
      for (const r of result.data.value) {
        if (r.duration_name === '1st') {
          const c = {
            id: r.id,
            code: r.course_code,
            dropped: r.dropped,
            section: r.section_identifier,
            synced: false
          }
          courses.push(c)
        }
      }
      commit('ADD_BB_COURSES', { index, courses, vm })
      const canvasId = (state.blackbaudStudents[index].grade_level === 'Freshman')
        ? rootState.table.filter(t => t.sis == state.blackbaudStudents[index].id)[0].id
        : rootState.table.filter(t => t.sis == state.blackbaudStudents[index].host_id)[0].id
      const canvas = rootState.fbFunctions.httpsCallable('canvasFetch')
      canvas({ url: `users/${canvasId}/enrollments`, params: {
        role: 'StudentEnrollment',
        state: ['active'],
        per_page: 100
        }
      })
      .then(result => {
        const canvasCourses = []
        for (const r of result.data) {
          if (r.sis_section_id) {
            const section = r.sis_section_id.split('|')
            if (section[0] === '1920' && section[3] === 'S1') {
              const c = {
                id: r.id,
                code: section[1],
                section: section[2],
                synced: false
              }
              canvasCourses.push(c)
            }
          }
        }
        commit('ADD_CANVAS_COURSES', { index, canvasCourses, vm })
      })
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
  },
  ADD_BB_COURSES(state, data) {
    data.vm.$set(state.blackbaudStudents[data.index], 'bb_courses', data.courses)
  },
  ADD_CANVAS_COURSES(state, data) {
    data.vm.$set(state.blackbaudStudents[data.index], 'canvas_courses', data.canvasCourses)
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
