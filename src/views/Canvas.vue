<template>
  <div>
    <h1>Canvas</h1>
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
      loadSchedule() {
        this.schedule = []
        const d = this.$store.state.fbFunctions.httpsCallable('canvas')
        d({ UserId: this.name })
          .then(result => {
            this.schedule = result.data
          })
      }
    }
  }
</script>
