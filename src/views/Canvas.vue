<template>
  <div>
    <h1>Canvas</h1>
    <BaseButton @click="deleteEnrollment">Delete J-Term Internship Enrollment</BaseButton>
    <BaseButton @click="makeObserver">Make Observer Import</BaseButton>
    <BaseButton @click="deleteObserver">Delete Previous Year Observer</BaseButton>
    <BaseInput label="Name:" v-model="name"/>
    <br>
    <BaseButton @click="loadSchedule">Load Schedule</BaseButton>
    <div v-for="s in schedule" :key="s.name">
      <p>{{s.name}} : {{s.section}} : {{s.grade}}</p>
    </div>
  </div>
</template>

<script>
  export default {
    data: () => {
      return {
        name: '',
        schedule: [],
        test: ''
      }
    },
    methods: {
      deleteEnrollment() {
        const d = this.$store.state.fbFunctions.httpsCallable('canvasFetch')
        d({ url: 'courses/790/enrollments',
            params: {
              state: ['active'],
              per_page: 100
            } })
          .then(result => {
            // this.schedule = result.data
            for (const e of result.data) {
              if (e.user_id !== 1577) {
                const d2 = this.$store.state.fbFunctions.httpsCallable('canvasDelete')
                d2({ url: `courses/790/enrollments/${e.id}`,
                  params: {
                    task: 'delete'
                  } })
              }
            }
          })
      },
      deleteObserver() {
        const d = this.$store.state.fbFunctions.httpsCallable('canvasFetch')
        d({ url: 'users/1452/enrollments',
            params: {
              role: 'ObserverEnrollment',
              state: ['active'],
              per_page: 100
            } })
          .then(result => {
            // this.schedule = result.data
            for (const e of result.data) {
              if (e.sis_course_id.substring(0, 4) !== '1920') {
                const d2 = this.$store.state.fbFunctions.httpsCallable('canvasDelete')
                d2({ url: `courses/${e.course_id}/enrollments/${e.id}`,
                  params: {
                    task: 'delete'
                  } })
              }
            }
          })
      },
      loadSchedule() {
        this.schedule = []
        const d = this.$store.state.fbFunctions.httpsCallable('canvas')
        d({ name: this.name })
          .then(result => {
            this.schedule = result.data
          })
      },
      makeObserver() {
        const d = this.$store.state.fbFunctions.httpsCallable('canvasFetch')
        d({ url: 'users/2483/enrollments',
            params: {
              state: ['active'],
              per_page: 100
            } })
          .then(result => {
            let rows = [
              [
                'user_id',
                'associated_user_id',
                'role',
                'section_id',
                'status'
              ]
            ]
            result.data.forEach(course => {
              let r = [
                4881,
                course.sis_user_id,
                'observer',
                course.sis_section_id,
                'active'
              ]
              rows.push(r)
            })
            let csvContent = 'data:text/csv;charset=utf-8,'
            rows.forEach(rowArray => {
              let row = rowArray.join(',')
              csvContent += row + '\r\n'
            })
            var encodedUri = encodeURI(csvContent)
            window.open(encodedUri)
          })
      }
    }
  }
</script>
