<template>
  <div class="item">
    <BaseButton v-if="job.volunteers.length === 0" class="small">Remove</BaseButton>
    <BaseButton class="small" disabled>Save</BaseButton>
    <BaseButton class="small" disabled>Cancel</BaseButton><br>
    {{job.title}}<br>
    {{job.description}}<br>
    {{job.from}} - {{job.to}}<br>
    {{job.skills}}<br>
    <BaseButton class="small">Add Volunteer</BaseButton>
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