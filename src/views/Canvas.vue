<template>
  <div>
    <h1>Canvas</h1>
    <BaseButton @click="deleteEnrollment">Delete J-Term Internship Enrollment</BaseButton>
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
        schedule: []
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
      loadSchedule() {
        this.schedule = []
        const d = this.$store.state.fbFunctions.httpsCallable('canvas')
        d({ name: this.name })
          .then(result => {
            this.schedule = result.data
          })
      }
    }
  }
</script>
