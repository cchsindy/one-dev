<template>
  <div>
    <Notification v-for="item of notifications" :key="item.id" :notification="item"/>
    <BaseButton @click="addNotification">Add New Notification</BaseButton>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import moment from 'moment'
import Notification from '@/components/announcements/Notification'

export default {
  components: {
    Notification
  },
  computed: mapState({
    notifications: state => state.announcements.notifications,
    user: state => state.user
  }),
  methods: {
    addNotification() {
      const now = moment()
      const newNotification = {
        id: 'NEW' + now,
        student: 'student name...',
        location: 'my room',
        until: now.add(1, 'hour').format('hh:mm'),
        user: this.user.user
      }
      this.$store.dispatch('addNotification', newNotification)
    }
  }
}
</script>
