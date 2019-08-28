<template>
  <div>
    <h1>Blackbaud-Canvas Sync</h1>
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
  },
  created() {
    this.$store.dispatch('getBlackbaudSections')
    this.$store.dispatch('getCanvasCourses', 2359)
  }
}
</script>

<style scoped>

</style>