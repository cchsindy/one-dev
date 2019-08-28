<template>
  <div>
    <h1>Blackbaud-Canvas Sync</h1>
    <BaseButton @click="runSync">Run</BaseButton>
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
    runSync() {
      // const sky = this.$store.state.fbFunctions.httpsCallable('skyapi')
      // sky({ product: 'school', url: 'users/extended', params: {
      //     base_role_ids: '14' //'62830'
      //   }
      // })
      //   .then(result => {
      //     this.blackbaudDiff = result.data.value
      //   })
    }
  },
  created() {
    this.$store.dispatch('getBlackbaudStudents')
  }
}
</script>

<style scoped>

</style>