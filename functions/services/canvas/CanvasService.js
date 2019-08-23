module.exports = class CanvasService {
  constructor() {
    this.axios = require('axios')
    this.config = require('./config')
    this.canvas = this.axios.create({
      baseURL: this.config.baseUrl,
      timeout: 15000,
      headers: {
        Authorization: this.config.auth
      }
    })
  }

  async fetchData(url, params) {
    try {
      const res = await this.canvas.get(url, { params })
      return res.data
    } catch (err) {
      console.log(err.response.data)
      return null
    }
  }

  async deleteData(url, params) {
    try {
      const res = await this.canvas.delete(url, { params })
      return res.data
    } catch (err) {
      console.log(err.response.data)
      return null
    }
  }

  async getCourseSections(courseId) {
    try {
      const res = await this.canvas
        .get(`courses/${courseId}/sections`)
      return res.data
    } catch (err) {
      console.log(err.response.data)
      return null
    }
  }

  async getEnrollments(courseId) {
    try {
      const res = await this.canvas
        .get(`courses/${courseId}/enrollments`, {
          params: {
            per_page: 200
          }
        })
      return res.data
    } catch (err) {
      console.log(err.response.data)
      return null
    }
  }

  async getUser(name) {
    try {
      const res = await this.canvas
        .get('accounts/1/users', {
          params: {
            search_term: name
          }
        })
      return res.data
    } catch (err) {
      console.log(err.response.data)
      return null
    }
  }

  async getUserCourses(userId) {
    try {
      const res = await this.canvas
        .get(`users/${userId}/courses`, {
          params: {
            include: ['term'],
            enrollment_state: 'active',
            per_page: 100
          }
        })
      return res.data
    } catch (err) {
      console.log(err.response.data)
      return null
    }
  }

  async getGrades(id, term) {
    try {
      const res = await this.canvas
        .get(`users/${id}/courses`, {
          params: {
            include: ['total_scores', 'sections'],
            per_page: 100
          }
        })
      let courses = []
      for (const course of res.data) {
        if (course.enrollment_term_id === term) {
          courses.push({
            name: course.name,
            section: course.sections[0].name,
            grade: course.enrollments[0].computed_current_score
          })
        }
      }
      return courses
    } catch (err) {
      console.log(err.response.data)
      return null
    }
  }
}
