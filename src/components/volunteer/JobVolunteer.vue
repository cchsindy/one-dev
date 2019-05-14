<template>
  <div>
    {{volunteer.member}} {{volunteer.hours}} hours
  </div>
</template>

<script>
export default {
  props: {
    volunteer: {
      type: Object,
      required: true
    }
  }
}
</script>

<style scoped>

</style>