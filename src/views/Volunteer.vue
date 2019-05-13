<template>
  <div>
    <h1>Volunteer</h1>
    <Volunteer v-if="!isMember"/>
    <Member v-if="isMember || isAdmin"/>
    <Supervisor v-if="isSupervisor || isAdmin"/>
    <Admin v-if="isAdmin"/>
  </div>
</template>

<script>
import Volunteer from '@/components/volunteer/Volunteer'
import Member from '@/components/volunteer/Member'
import Supervisor from '@/components/volunteer/Supervisor'
import Admin from '@/components/volunteer/Admin'

export default {
  components: {
    Volunteer,
    Member,
    Supervisor,
    Admin
  },
  computed: {
    isMember() {
      if (this.$store.getters.roles) {
        return this.$store.getters.roles.includes('VWS-Member')
      }
      return false
    },
    isSupervisor() {
      if (this.$store.getters.roles) {
        return this.$store.getters.roles.includes('VWS-Supervisor')
      }
      return false
    },
    isAdmin() {
      if (this.$store.getters.roles) {
        return this.$store.getters.roles.includes('VWS-Admin') || this.$store.getters.roles.includes('Admin')
      }
      return false
    }
  }
}
</script>

<style scoped>

</style>