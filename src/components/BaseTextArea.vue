<template>
  <div class="textarea" :class="{ focused: hasFocus }">
    <label v-if="label">{{ label }}</label>
    <textarea ref="ta" :value="value" @blur="onBlur" @focus="onFocus" @input="updateValue" v-bind="$attrs"></textarea>
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
      this.$refs.ta.style.height = 'auto'
      this.$refs.ta.style.height = this.$refs.ta.scrollHeight + 'px'
      this.$emit('input', event.target.value)
    }
  },
  updated: () => {
    this.$nextTick(() => {
      this.$refs.ta.style.height = 'auto'
      this.$refs.ta.style.height = this.$refs.ta.scrollHeight + 'px'
    })
  }
}
</script>

<style scoped>
.textarea {
  border-radius: 1vw;
  padding: 1vw;
}
.focused {
  background: #cfc;
}
label {
  color: #777;
  display: block;
  font-style: italic;
}
textarea {
  background: transparent;
  border: none;
  box-sizing: border-box;
  display: flex;
  font-family: 'Work Sans', sans-serif;
  font-size: 1em;
  outline: none;
  overflow: hidden;
  resize: none;
  width: 40vw;
}
</style>
