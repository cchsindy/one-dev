<template>
  <div>
    <h1>Blackbaud</h1>
    <BaseButton @click="callBB">Get Constituent</BaseButton>
    <p>A little change.</p>
  </div>
</template>

<script>
  export default {
    data: () => {
      return {
        skyData: null
      }
    },
    methods: {
      callBB() {
        const d = this.$store.state.fbFunctions.httpsCallable('direct')
        d({ send: 'this' })
          .then(result => {
            this.skyData = result.data
          })
      }
    }
  }
</script>