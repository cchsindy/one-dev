<template>
  <div class="item">
    {{job.title}}<br>
    {{job.description}}<br>
    {{job.from}} - {{job.to}}<br>
    {{job.skills}}<br>
    <u>Volunteers:</u><JobVolunteer v-for="item of job.volunteers" :key="item.id" :volunteer="item"></JobVolunteer>
  </div>
</template>

<script>
import JobVolunteer from '@/components/volunteer/JobVolunteer'

export default {
  components: {
    JobVolunteer
  },
  props: {
    job: {
      type: Object,
      required: true
    }
  }
}
</script>

<style scoped>
.item {
  border: solid 1px #ccc;
  padding: 1vw;
  margin: 1vw;
}
</style>