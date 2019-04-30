<template>
  <div class="notification-item">
    <div v-if="currentUser || isAdmin">
      <BaseButton @click="removeNotification" :disabled="isNew" class="small">Remove</BaseButton>
      <BaseButton @click="saveNotification" :disabled="hideSave || !isValid" class="small">Save</BaseButton>
      <BaseButton @click="cancelNotification" :disabled="hideSave && !isNew" class="small">Cancel</BaseButton>
    </div>
    <BaseInput label="Student:" v-model="notification.student" :disabled="!currentUser && !isAdmin"/>
    <BaseInput label="Location:" v-model="notification.location" :disabled="!currentUser && !isAdmin"/>
    <BaseInput label="Until:" type="time" v-model="notification.until" :disabled="!currentUser && !isAdmin"/>
    <div class="notification-user">{{ notification.user }}</div>
  </div>
</template>

<script>
export default {
  computed: {
    currentUser() {
      return this.notification.user === this.$store.getters.user
    },
    isAdmin() {
      return false
    },
    isNew() {
      return this.notification.id.substring(0, 3) === 'NEW'
    },
    isValid() {
      let valid = true
      if (this.notification.student === '') valid = false
      return valid
    }
  },
  data: () => {
    return {
      hideSave: true
    }
  },
  methods: {
    cancelNotification() {
      this.$store.dispatch('cancelNotification', this.notification.id)
      this.isReset = true
    },
    removeNotification() {
      this.$store.dispatch('removeNotification', this.notification.id)
    },
    saveNotification() {
      this.$store.dispatch('saveNotification', this.notification.id)
      this.hideSave = true
      this.isReset = true
    }
  },
  props: {
    notification: {
      type: Object,
      required: true
    }
  },
  watch: {
    notification: {
      handler: function() {
        if (this.isReset) {
          this.hideSave = true
          this.isReset = false
        } else {
          this.hideSave = false
        }
      },
      deep: true
    }
  }
}
</script>

<style scoped>
.notification-item {
  border: solid 2px #ccc;
  border-radius: 2vw;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  margin-bottom: 2vh;
  padding: 1vw;
}
.notification-user {
  color: #ccc;
  font-style: italic;
}
</style>