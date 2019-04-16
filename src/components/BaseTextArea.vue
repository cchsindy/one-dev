<template>
  <div>
    <label v-if="label">{{ label }}</label>
    <textarea :value="value" @input="updateValue" v-bind="$attrs"></textarea>
  </div>
</template>

<script>
export default {
  inheritAttrs: false,
  props: {
    label: {
      type: String,
      default: ''
    },
    value: [String, Number]
  },
  methods: {
    updateValue(event) {
      this.$emit('input', event.target.value)
    }
  }
}
</script>

<style scoped>
label {
  color: #777;
  display: block;
  font-style: italic;
}
textarea {
  border: 1px solid #ccc;
  box-sizing: border-box;
  display: block;
  font-family: 'Work Sans', sans-serif;
  font-size: 1em;
  height: 20vh;
  margin-bottom: 1vh;
  outline: none;
  padding: 1vw;
  resize: none;
  width: 100%;
}
</style>
