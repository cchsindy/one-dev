<template>
  <div class="student-item">
    <b>{{item.last_name}},
    {{item.first_name}}:</b>
    <span class="bb" v-for="bb in item.bb_courses" :key="bb.id">
      {{bb.code}}
    </span>
    ::
    <span class="canvas" v-for="c in item.canvas_courses" :key="c.id">
      {{c.code}}
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