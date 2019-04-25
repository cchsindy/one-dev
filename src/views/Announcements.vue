<template>
  <div>
    <h1>Annoucements</h1>
    <AnnouncementList/>
    <BaseButton>Add New Announcement</BaseButton>
    <h1>Notifications</h1>
    <NotificationList/>
    <BaseButton>Add New Notification</BaseButton>
  </div>
</template>

<script>
import AnnouncementList from '@/components/announcements/AnnouncementList'
import NotificationList from '@/components/announcements/NotificationList'

export default {
  components: {
    AnnouncementList,
    NotificationList
  },
  created() {
    this.$store.dispatch('fetchAnnouncements')
  }

}
</script>

<style scoped>
</style>
