<template>
  <div class="notification-list">
    <div v-for="item of items" :key="item.id" class="notification-item">
      <BaseButton class="small">Remove</BaseButton>
      <BaseInput label="Student:" v-model="item.student"/>
      <BaseInput label="Location:" v-model="item.location"/>
      <BaseInput label="Until:" type="time" v-model="item.expiration"/>
    </div>
  </div>
</template>

<script>
  export default {
    data: () => {
      return {
        items: [
        {
          id: 1,
          student: 'Bob Forbush',
          location: 'Library',
          expiration: '16:35',
          user: 'bradspencer'
        },
        {
          id: 2,
          student: 'Jill Doe',
          location: 'Room 123',
          expiration: '09:15',
          user: 'bradspencer'
        }
        ]
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
