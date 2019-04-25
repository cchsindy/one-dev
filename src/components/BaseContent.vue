<template>
  <div class="content-editor" :class="{ focused: hasFocus }">
    <label v-if="label">{{ label }}</label>
    {{ decorator }}
    <div class="editable-div" contenteditable="true" @blur="onBlur" @focus="onFocus" @input="updateValue" v-bind="$attrs">
      {{ value }}
    </div>
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
.content-editor {
  border-radius: 1vw;
  padding: 1vw;
}
.focused {
  background: #cfc;
}
.editable-div {
  border-radius: 1vw;
  outline: none;
}
label {
  color: #777;
  display: block;
  font-style: italic;
}
</style>