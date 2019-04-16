<template>
  <div>
    <label v-if="label">{{ label }}</label>
    {{decorator}}
    <input :value="value" @input="updateValue" v-bind="$attrs">
  </div>
</template>

<script>
export default {
  inheritAttrs: false,
  props: {
    decorator: {
      type: String,
      default: ''
    },
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
input {
  border: none;
  font-family: 'Work Sans', sans-serif;
  font-size: 1em;
}
input:focus {
  border-bottom: solid 2px #ccc;
  outline: none;
}
input[type='number'] {
  width: 60px;
}
input[type='text'] {
  width: 100%;
}
input[type='url'] {
  width: 60%;
}
label {
  color: #777;
  display: block;
  font-style: italic;
}
</style>
