<template>
  <div>
    <h1>Blackbaud</h1>
    <BaseButton @click="callBB">Get User</BaseButton>
    <p>{{ myData }}</p>
  </div>
</template>

<script>
  export default {
    data: () => {
      return {
        myData: null
      }
    },
    methods: {
      callBB() {
        const d = this.$store.state.fbFunctions.httpsCallable('onapi')
        d({ userId: 5488245 })
          .then(result => {
            this.myData = result.data
          })
      }
    }
  }
</script>