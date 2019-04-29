<template>
  <div>
    <Announcement v-for="item of announcements" :key="item.id" :announcement="item" />
    <BaseButton @click="addAnnouncement">Add New Announcement</BaseButton>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import moment from 'moment'
import Announcement from '@/components/announcements/Announcement'

export default {
  components: {
    Announcement
  },
  computed: mapState({
    announcements: state => state.announcements.announcements
  }),
  methods: {
    addAnnouncement() {
      const now = moment()
      const newAnnouncement = {
        id: 'NEW' + now,
        message: 'your message here...',
        fromDate: now.format('YYYY-MM-DD'),
        toDate: now.add(1, 'day').format('YYYY-MM-DD'),
        user: 'bradspencer'
      }
      this.$store.dispatch('addAnnouncement', newAnnouncement)
    }
  }
}
</script>
