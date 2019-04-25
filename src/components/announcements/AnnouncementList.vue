<template>
  <div class="announcement-list">
    <div v-for="item of items" :key="item.id" class="announcement-item">
      <BaseButton class="small">Remove</BaseButton>
      <BaseContent label="Message:" :value="item.message"/>
      <div class="item-date">
        <BaseInput label="From:" type="date" :value="item.fromDate"/>
        <BaseInput label="To:" type="date" :value="item.toDate"/>
      </div>
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
          message:
            'My First Announcement is a long announcement with lots of words to fill up the screen.',
          fromDate: '2018-11-21',
          toDate: '2018-11-22',
          user: 'bradspencer'
        },
        {
          id: 2,
          message: 'My Second Announcement',
          fromDate: '2018-11-23',
          toDate: '2018-11-25',
          user: 'bradspencer'
        }
        ]
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
.item-date {
  display: flex;
  flex-wrap: wrap;
}
</style>
