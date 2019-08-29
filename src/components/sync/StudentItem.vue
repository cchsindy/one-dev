<template>
  <div class="student-item">
    <b>{{item.last_name}},
    {{item.first_name}}:</b>
    <span v-for="section in item.enrollments" :key="section.code">
      {{section.name}}
    </span>
  </div>
</template>

<script>
  export default {
    props: {
      item: {
        type: Object,
        required: true
      }
    }
  }
</script>

<style scoped>

</style>