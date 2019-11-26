<template>
  <div>
    <h1>Blackbaud</h1>
    <BaseInput label="Last name:" v-model="lastname"/>
    <br>
    <p>{{index}}</p>
    <BaseButton @click="getAttendance">Get Attendance</BaseButton>
    <BaseButton @click="postAttendance">Post Attendance</BaseButton>
    <BaseButton @click="callBB">Get Sections</BaseButton>
    <BaseButton @click="startTimer">Get Enrollment</BaseButton>
    <BaseButton @click="getMaster">Get Master</BaseButton>
    <BaseButton @click="csv">CSV</BaseButton>
    <BaseButton @click="getuser">Users</BaseButton>
    <p v-for="item in myData" :key="item.UserId">
      {{item.UserId}} {{item.Name}}
    </p>
    <img :src="profileUrl">
  </div>
</template>

<script>
import { setInterval } from 'timers'
  export default {
    data: () => {
      return {
        lastname: '',
        myData: [],
        myData2: [ "data:text/csv;charset=utf-8," ],
        index: 0,
        timer: null,
        user: null,
        attendance: []
      }
    },
    computed: {
      profileUrl() {
        return (this.user) ? "https://bbk12e1-cdn.myschoolcdn.com/ftpimages/1465/user/" + this.user.ProfilePhotoFile.Attachment : ''
      }
    },
    methods: {
      callBB() {
        const d = this.$store.state.fbFunctions.httpsCallable('onapi')
        d({ url: 'academics/section', params: {
            schoolYear: '2019 - 2020',
            levelNum: 2175
          }
        })
          .then(result => {
            for (const item of result.data) {
              if (item.Duration.Name === '1st Semester' && item.CourseCode !== '9999A' && item.CourseCode !== '3154A' && item.CourseCode !== '9940A') {
                this.myData.push(item)
              }
            }
          })
      },
      callBB2() {
        const d = this.$store.state.fbFunctions.httpsCallable('onapi')
        d({ url: 'academics/enrollment', params: {
            sectionID: this.myData[this.index].Id
          }
        })
          .then(result => {
            for (const item of result.data) {
              this.myData2.push(this.myData[this.index].CourseCode + "," + this.myData[this.index].SectionIdentifier + "," + item.UserId + "\r\n")
            }
            this.index++
            if (this.index === this.myData.length) clearInterval(this.timer)
            // clearInterval(this.timer)
          })
      },
      csv() {
        // let csv = []
        // csv[0] = "data:text/csv;charset=utf-8,"
        // for (const section of this.myData) {
        //   if (section.Duration.Name === '1st Semester') {
        //     csv.push(section.Id + "," + section.CourseCode + "," + section.SectionIdentifier + "\r\n")
        //   }
        // }
        let uri = encodeURI(this.myData2)
        window.open(uri)
      },
      startTimer() {
        // this.callBB2()
        this.timer = setInterval(this.callBB2, 1000)
      },
      getMaster() {
        this.$store.dispatch('getMasterSchedule')
      },
      getAttendance() {
        const sky = this.$store.state.fbFunctions.httpsCallable('skyapi')
        sky({ product: 'school', url: 'attendance', params: {
            level_id: 2175,
            day: '2019-11-25',
            offering_type: 1
          }
        })
        .then(result => {
          this.attendance = result.data.value
        })
      },
      postAttendance() {
        const sky = this.$store.state.fbFunctions.httpsCallable('skyapiPOST')
        sky({ product: 'school', url: 'users/5531012/phones', params: {
            number: '317-473-6075',
            type_id: 5970
            // student_user_id: 5530725,
            // begin_date: '2018-08-17T00:00:00+00:00',
            // end_date: '2018-08-17T00:00:00+00:00',
            // start_time: '12:50:00',
            // end_time: '13:35:00',
            // excuse_type_id: 6737
          }
        })
      },
      getuser() {
        const d = this.$store.state.fbFunctions.httpsCallable('onapi')
        d({ url: `user/5531012`, params: {} })
          .then(result => {
            this.user = result.data
          })
      }
    }
  }

// 91578 NWEA
// 91346 STN

        // d({ url: 'academics/enrollment', params: {
        //   sectionID: 92116980
        //   }
        // })



        // d({ url: 'academics/TeacherSection', params: {
        //   schoolYear: '2019 - 2020',
        //   userID: 5529893
        //   }
        // })


        //   d({ url: 'user/all', params: {
        //   roleIDs: 62829,
        //   lastname: this.lastname
        //   }
        // })

</script>