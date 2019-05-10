<template>
  <div>
    <h1>Blackbaud</h1>
    <BaseInput label="Id:" v-model="id"/>
    <br>
    <BaseButton @click="callBB">Get User</BaseButton>
    <p>{{ myData }}</p>
  </div>
</template>

<script>
  export default {
    data: () => {
      return {
        id: 0,
        myData: null
      }
    },
    methods: {
      callBB() {
        const d = this.$store.state.fbFunctions.httpsCallable('onapi')
        d({ userId: this.id })
          .then(result => {
            this.myData = result.data
          })
      }
    }
  }
</script>