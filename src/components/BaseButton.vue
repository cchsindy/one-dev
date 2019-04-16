<template>
  <button v-on="$listeners" v-bind="$attrs" class="button" :class="buttonClass">
    <slot/>
  </button>
</template>

<script>
export default {
  inheritAttrs: false,
  props: {
    buttonClass: {
      type: String
    }
  }
}
</script>

<style scoped>
.button {
  background: #fff;
  border: solid 2px #ccc;
  border-radius: 0.5em;
  font-family: 'Work Sans', sans-serif;
  font-size: 1em;
  padding: 0.5vw 1vw;
}
.button:focus {
  border: solid 2px #000;
  outline: none;
}
.button:hover:not(:disabled) {
  background: #ccc;
  color: #fff;
  cursor: pointer;
}
.button:disabled {
  color: #ccc;
}
.small {
  font-size: 0.6em;
}
.right {
  float: right;
  margin-left: 1vw;
}
</style>
