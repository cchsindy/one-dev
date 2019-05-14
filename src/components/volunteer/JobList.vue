<template>
  <div>
    <JobItem v-for="item of jobs" :key="item.id" :job="item"></JobItem>
  </div>
</template>

<script>
import JobItem from '@/components/volunteer/JobItem'

export default {
  components: {
    JobItem
  },
  data: () => {
    return {
      jobs: [
        {
          id: 1,
          title: 'First Job',
          description: 'First job description.',
          from: 'from date',
          to: 'to date',
          skills: 'list of skills needed',
          volunteers: [
            {
              id: 1,
              member: 'Brad',
              hours: 7
            }
          ]
        },
        {
          id: 2,
          title: 'Second Job',
          description: 'Second job description.',
          from: 'from date',
          to: 'to date',
          skills: 'list of skills needed',
          volunteers: [
            {
              id: 1,
              member: 'Isaac',
              hours: 93
            }
          ]
        }
      ]
    }
  }
}
</script>

<style scoped>

</style>