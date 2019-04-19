<template>
  <div>
    <h1>Blackbaud</h1>
    <BaseButton @click="callBB">Create Doc</BaseButton>
  </div>
</template>

<script>
  export default {
    methods: {
      callBB() {
        const col = this.$store.state.fbStore.collection('skyRequests')
        col.add({
          topic: 'programming',
          language: 'javascript'
        })
      }
    }
  }
</script>