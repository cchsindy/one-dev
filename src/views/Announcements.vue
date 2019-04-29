<template>
  <div>
    <h1>Annoucements</h1>
    <AnnouncementList/>
    <h1>Notifications</h1>
    <NotificationList/>
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
    this.$store.dispatch('fetchNotifications')
  }
}
</script>

<style scoped>
</style>
