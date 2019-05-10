<template>
  <div>
    <h1>Blackbaud</h1>
    <BaseInput label="Last name:" v-model="lastname"/>
    <br>
    <BaseButton @click="callBB">Get User</BaseButton>
    <p>{{ myData }}</p>
  </div>
</template>

<script>
  export default {
    data: () => {
      return {
        lastname: '',
        myData: null
      }
    },
    methods: {
      callBB() {
        const d = this.$store.state.fbFunctions.httpsCallable('onapi')
        d({ lastname: this.lastname })
          .then(result => {
            this.myData = result.data
          })
      }
    }
  }
</script>