<template>
  <div>
    <h1>Blackbaud-Canvas Sync</h1>
    <BaseButton @click="getCanvas">Get Canvas</BaseButton>
    <BaseButton @click="runSync">Run Sync</BaseButton>
    <!-- <StudentItem v-for="item in bbStudents" :key="item.id" :item="item"/> -->
  </div>
</template>

<script>
import { mapState } from 'vuex'
// import StudentItem from '@/components/sync/StudentItem'

export default {
  components: {
    // StudentItem
  },
  computed: {
    ...mapState({
      bbStudents: state => state.blackbaud.blackbaudStudents,
      lookup: state => state.table
    })
  },
  methods: {
    getCanvas() {
      this.$store.dispatch('getCanvasCourses', this.lookup.filter(t => t.sis == this.bbStudents[0].host_id)[0].id)
    },
    runSync() {
      this.$store.dispatch('getBlackbaudStudents')
    }
  }
}
</script>

<style scoped>

</style>