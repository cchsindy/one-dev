<template>
  <div class="student-item">
    <b>{{item.last_name}},
    {{item.first_name}}:</b>
    <span class="bb" v-for="bb in item.bb_courses" :key="bb.id">
      <span v-if="bb.dropped === 0">
      {{bb.section}}-{{bb.code}}
      </span>
    </span>
    ::
    <span class="canvas" v-for="c in item.canvas_courses" :key="c.id">
      {{c.section}}-{{c.code}}
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
    watch: {
      item: function () {
        if (this.item.bb_courses && this.item.canvas_courses) {
          for (let i = 0, leni = this.item.bb_courses.length; i < leni; i++) {
            for (let j = 0, lenj = this.item.canvas_courses.length; j < lenj; j++) {
              if (this.item.bb_courses[i].dropped === 0) { 
                if (this.item.bb_courses[i].code === this.item.canvas_courses[j].code
                    && this.item.bb_courses[i].section === this.item.canvas_courses[j].section) {
                  this.item.bb_courses[i].code += '*'
                  this.item.canvas_courses[j].code += '*'
                  // this.item.bb_courses.splice(i, 1)
                  // this.item.canvas_courses.splice(j, 1)
                }
              } else {
                if (this.item.bb_courses[i].code === this.item.canvas_courses[j].code
                    && this.item.bb_courses[i].section === this.item.canvas_courses[j].section) {
                  this.item.canvas_courses[j].code += 'D'
                  // this.item.bb_courses.splice(i, 1)
                  // this.item.canvas_courses.splice(j, 1)
                }
              }
            }
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