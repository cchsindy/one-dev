<template>
  <div>
    <h1>Blackbaud-Canvas Sync</h1>
    <BaseButton @click="getStudents">Get Current Students</BaseButton>
    <p>{{ bbStudents.length }} current students.</p>
    <BaseButton @click="syncEnrollments">Sync Enrollments</BaseButton>
    <StudentItem v-for="item in bbStudents" :key="item.id" :item="item"/>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import StudentItem from '@/components/sync/StudentItem'

export default {
  components: {
    StudentItem
  },
  computed: {
    ...mapState({
      bbStudents: state => state.blackbaud.blackbaudStudents,
      lookup: state => state.table
    })
  },
  methods: {
    getStudents() {
      this.$store.dispatch('getBlackbaudStudents')
    },
    syncEnrollments() {
      for (let i = 0; i < 10; i++) {
        this.$store.dispatch('syncStudent', i)

      }
    }
  }
}
</script>

<style scoped>

</style>