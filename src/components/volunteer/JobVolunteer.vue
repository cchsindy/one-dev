<template>
  <div>
    {{volunteer.member}} ({{volunteer.email}}) {{volunteer.hours}} hours
    <BaseButton class="small" @click="toggleDetails">Details</BaseButton>
    <BaseButton class="small">Add Hours</BaseButton>
    <BaseButton v-if="!volunteer.hours" class="small">Remove Volunteer</BaseButton>
    <div v-if="showDetails">
      <p v-for="item in volunteer.timesheet" :key="item.id">
        {{item.date}} : {{item.hours}}
        <BaseButton class="small">Remove</BaseButton>
        <BaseButton class="small" disabled>Save</BaseButton>
        <BaseButton class="small" disabled>Cancel</BaseButton>
      </p>
    </div>
  </div>
</template>

<script>
export default {
  data: () => {
    return {
      showDetails: false
    }
  },
  methods: {
    toggleDetails() {
      this.showDetails = !this.showDetails
    }
  },
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