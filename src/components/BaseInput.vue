<template>
  <div class="input" :class="{ focused: hasFocus }">
    <label v-if="label">{{ label }}</label>
    {{ decorator }}
    <input :value="value" @blur="onBlur" @focus="onFocus" @input="updateValue" v-bind="$attrs">
  </div>
</template>

<script>
export default {
  data: () => {
    return {
      hasFocus: false
    }
  },
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
    onBlur() {
      this.hasFocus = false
    },
    onFocus() {
      this.hasFocus = true
    },
    updateValue(event) {
      this.$emit('input', event.target.value)
    }
  }
}
</script>

<style scoped>
.input {
  border-radius: 1vw;
  padding: 1vw;
}
.focused {
  background: #cfc;
}
input {
  background: transparent;
  border: none;
  font-family: 'Work Sans', sans-serif;
  font-size: 1em;
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
