<template>
  <div class="account">
    <div v-if="!user">Not logged in.
      <BaseButton @click="googleLogin">Login with Google</BaseButton>
    </div>
    <div v-else>
      Logged in as {{ user }}.
      <BaseButton @click="logout">Logout</BaseButton>
    </div>
  </div>
</template>

<script>
export default {
  props: ['user', 'error'],
  methods: {
    googleLogin() {
      this.$store.dispatch('googleSignin')
    },
    logout() {
      this.$store.dispatch('logoutUser')
    }
  }
}
</script>

<style>
</style>
