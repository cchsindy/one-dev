<template>
  <div v-if="notSynced" class="student-item">
    <b>{{item.last_name}},
    {{item.first_name}}:</b>
    <span class="bb" v-for="bb in item.bb_courses" :key="bb.id">
      <span v-if="!bb.synced">
      {{bb.section}}-{{bb.code}}
      </span>
    </span>
    ::
    <span class="canvas" v-for="c in item.canvas_courses" :key="c.id">
      <span v-if="!c.synced">
      {{c.section}}-{{c.code}}
      </span>
    </span>
  </div>
</template>

<script>
  export default {
    props: {
      item: {
        type: Object,
        required: true
      }
    },
    computed: {
      notSynced() {
        if (this.item.bb_courses && this.item.canvas_courses) {
          const bb = this.item.bb_courses.findIndex(b => b.synced === false)
          const cc = this.item.canvas_courses.findIndex(c => c.synced === false)
          if (bb >= 0 || cc >= 0) return true
        }
        return false
      }
    },
    watch: {
      item: function () {
        if (this.item.bb_courses && this.item.canvas_courses) {
          const ignore = [ '9999A', '9999B', '9940A', '9940B', '1530A', '1530B', '3154A', '3154B' ]
          for (let i = 0, leni = this.item.bb_courses.length; i < leni; i++) {
            if (ignore.includes(this.item.bb_courses[i].code)) {
              this.item.bb_courses[i].synced = true
              continue
            }
            let alreadyDropped = true
            for (let j = 0, lenj = this.item.canvas_courses.length; j < lenj; j++) {
              if (this.item.bb_courses[i].dropped === 0) { 
                if (this.item.bb_courses[i].code === this.item.canvas_courses[j].code
                    && this.item.bb_courses[i].section === this.item.canvas_courses[j].section) {
                  this.item.bb_courses[i].synced = true
                  this.item.canvas_courses[j].synced = true
                }
              } else {
                // dropped courses
                if (this.item.bb_courses[i].code === this.item.canvas_courses[j].code
                    && this.item.bb_courses[i].section === this.item.canvas_courses[j].section) {
                  alreadyDropped = false
                }
              }
            }
            if (this.item.bb_courses[i].dropped === 1 && alreadyDropped) this.item.bb_courses[i].synced = true
          }
        }
      }
    }
  }
</script>

<style scoped>
.bb {
  background: cyan;
}
.canvas {
  background: magenta;
}
</style>