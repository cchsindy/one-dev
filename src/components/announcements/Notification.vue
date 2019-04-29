<template>
  <div class="notification-item">
    <BaseButton @click="removeNotification" :disabled="isNew" class="small">Remove</BaseButton>
    <BaseButton @click="saveNotification" :disabled="hideSave || !isValid" class="small">Save</BaseButton>
    <BaseButton @click="cancelNotification" :disabled="hideSave && !isNew" class="small">Cancel</BaseButton>
    <BaseInput label="Student:" v-model="notification.student"/>
    <BaseInput label="Location:" v-model="notification.location"/>
    <BaseInput label="Until:" type="time" v-model="notification.until"/>
  </div>
</template>

<script>
export default {
  computed: {
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
</style>