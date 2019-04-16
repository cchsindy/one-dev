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
  background: #771E18;
  border: none;
  border-radius: 1em;
  color: #aaa;
  font-family: 'Work Sans', sans-serif;
  font-size: 1em;
  font-weight: 700;
  padding: 1vw 1.5vw;
}
.button:focus {
  /* border: solid 2px #000; */
  color: #fff;
  outline: none;
}
.button:hover:not(:disabled) {
  cursor: pointer;
}
.button:disabled {
  background: #aaa;
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
