<template>
  <div>
    <h1>Blackbaud-Canvas Sync</h1>
    <BaseButton @click="getFirst">Get First</BaseButton>
  </div>
</template>

<script>
import { mapGetters, mapState } from 'vuex'

export default {
  computed: {
    ...mapGetters([]),
    ...mapState({
      bbStudents: state => state.blackbaud.blackbaudStudents
    })
  },
  methods: {
    getFirst() {
      this.$store.dispatch('getBlackbaudStudentEnrollments', 0)
    }
  },
  created() {
    this.$store.dispatch('getBlackbaudStudents')
    // this.$store.dispatch('getCanvasCourses', 2359)
  }
}
</script>

<style scoped>

</style>