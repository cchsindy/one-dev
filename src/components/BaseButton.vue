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
  border-radius: 1em;
  color: #444;
  font-family: 'Work Sans', sans-serif;
  font-size: 1em;
  font-weight: 700;
  margin: 1vw;
  outline: none;
  padding: 1vw 1.5vw;
}
.button:focus {
  background: #cfc;
}
.button:hover:not(:disabled) {
  cursor: pointer;
}
.button:disabled {
  color: #ddd;
}
.small {
  font-size: 0.6em;
  padding: 0.5vw 1vw;
}
</style>
