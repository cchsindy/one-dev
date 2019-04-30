<template>
  <div class="announcement-item">
    <div v-if="currentUser || isAdmin">
      <BaseButton @click="removeAnnouncement" :disabled="isNew" class="small">Remove</BaseButton>
      <BaseButton @click="saveAnnouncement" :disabled="hideSave || !isValid" class="small">Save</BaseButton>
      <BaseButton @click="cancelAnnouncement" :disabled="hideSave && !isNew" class="small">Cancel</BaseButton>
    </div>
    <BaseContent label="Message:" v-model="announcement.message" :disabled="!currentUser && !isAdmin"/>
    <div class="announcement-date">
      <BaseInput label="From:" type="date" v-model="announcement.fromDate" :disabled="!currentUser && !isAdmin"/>
      <BaseInput label="To:" type="date" v-model="announcement.toDate" :disabled="!currentUser && !isAdmin"/>
    </div>
    <div class="announcement-user">{{ announcement.user }}</div>
  </div>
</template>

<script>
export default {
  computed: {
    currentUser() {
      return this.announcement.user === this.$store.getters.user
    },
    isAdmin() {
      if (this.$store.getters.roles) {
        return this.$store.getters.roles.includes('Admin')
      }
      return false
    },
    isNew() {
      return this.announcement.id.substring(0, 3) === 'NEW'
    },
    isValid() {
      let valid = true
      if (this.announcement.message === '') valid = false
      if (this.announcement.toDate < this.announcement.fromDate) valid = false
      return valid
    }
  },
  data: () => {
    return {
      hideSave: true
    }
  },
  methods: {
    cancelAnnouncement() {
      this.$store.dispatch('cancelAnnouncement', this.announcement.id)
      this.isReset = true
    },
    removeAnnouncement() {
      this.$store.dispatch('removeAnnouncement', this.announcement.id)
    },
    saveAnnouncement() {
      this.$store.dispatch('saveAnnouncement', this.announcement.id)
      this.hideSave = true
      this.isReset = true
    }
  },
  props: {
    announcement: {
      type: Object,
      required: true
    }
  },
  watch: {
    announcement: {
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
.announcement-user {
  color: #ccc;
  font-style: italic;
}
</style>