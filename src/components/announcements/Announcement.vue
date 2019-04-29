<template>
  <div class="announcement-item">
    <BaseButton @click="removeAnnouncement" class="small">Remove</BaseButton>
    <BaseButton @click="saveAnnouncement" class="small">Save</BaseButton>
    <BaseButton @click="cancelAnnouncement" class="small">Cancel</BaseButton>
    <BaseContent label="Message:" v-model="announcement.message"/>
    <div class="announcement-date">
      <BaseInput label="From:" type="date" v-model="announcement.fromDate"/>
      <BaseInput label="To:" type="date" v-model="announcement.toDate"/>
    </div>
  </div>
</template>

<script>
  export default {
    methods: {
      cancelAnnouncement() {
        this.$store.dispatch('cancelAnnouncement', this.announcement.id)
      },
      removeAnnouncement() {
        this.$store.dispatch('removeAnnouncement', this.announcement.id)
      },
      saveAnnouncement() {
        this.$store.dispatch('saveAnnouncement', this.announcement.id)
      }
    },
    props: {
      announcement: {
        type: Object,
        required: true
      }
    }
  }
</script>

<style scoped>
.announcement-item {
  border: solid 2px #ccc;
  border-radius: 2vw;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  margin-bottom: 2vh;
  padding: 1vw;
}
.announcement-date {
  display: flex;
  flex-wrap: wrap;
}
</style>