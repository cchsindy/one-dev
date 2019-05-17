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
              email: 'brad@mail.com',
              hours: 7,
              timesheet: [
                {
                  id: 1,
                  date: '2019-5-17',
                  hours: 4
                },
                {
                  id: 2,
                  date: '2019-5-16',
                  hours: 2.5
                },
              ]
            },
            {
              id: 2,
              member: 'Joe',
              email: 'joe@smith.com',
              hours: 0
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
          ]
        }
      ]
    }
  }
}
</script>

<style scoped>

</style>