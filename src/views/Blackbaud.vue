<template>
  <div>
    <h1>Blackbaud</h1>
    <BaseInput label="Last name:" v-model="lastname"/>
    <br>
    <BaseButton @click="callBB">Get User</BaseButton>
    <p v-for="item in myData" :key="item.UserId">
      {{item.UserId}} {{item.Name}}
    </p>
  </div>
</template>

<script>
  export default {
    data: () => {
      return {
        lastname: '',
        myData: null
      }
    },
    methods: {
      callBB() {
        const d = this.$store.state.fbFunctions.httpsCallable('onapi')
        d({ url: 'academics/enrollment', params: {
          sectionID: 92116980
          }
        })
          .then(result => {
            this.myData = result.data
          })
      }
    }
  }


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