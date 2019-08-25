<template>
  <div>
    <h1>Blackbaud-Canvas Sync</h1>
    <BaseButton @click="runSync">Run</BaseButton>
  </div>
</template>

<script>
  export default {
    data: () => {
      return {
        blackbaudDiff: [],
        canvasDiff: []
      }
    },
    methods: {
      runSync() {
        const sky = this.$store.state.fbFunctions.httpsCallable('skyapi')
        sky({ product: 'school', url: 'users', params: {
            roles: '62830'
          }
        })
          .then(result => {
            this.blackbaudDiff = result.data
          })
      }
    }
  }
</script>

<style scoped>

</style>