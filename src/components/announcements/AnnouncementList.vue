<template>
  <div class="announcement-list">
    <div v-for="item of items" :key="item.id" class="announcement-item">
      <BaseButton class="small">Remove</BaseButton>
      <BaseContent label="Message:" v-model="item.message"/>
      <div class="item-date">
        <BaseInput label="From:" type="date" v-model="item.fromDate"/>
        <BaseInput label="To:" type="date" v-model="item.toDate"/>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  computed: mapState({
    items: state => state.announcements.announcements
  })
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
.item-date {
  display: flex;
  flex-wrap: wrap;
}
</style>
