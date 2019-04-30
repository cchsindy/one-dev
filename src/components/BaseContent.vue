<template>
  <div class="content-editor" :class="{ focused: hasFocus }">
    <label v-if="label">{{ label }}</label>
    <div v-if="!disabled" ref="edit" class="editable-div"
      contenteditable="true"
      v-text="value"
      @blur="onBlur"
      @focus="onFocus"
      @input="updateValue"
      v-bind="$attrs"/>
    <div v-else v-text="value"/>
  </div>
</template>

<script>
import { position } from 'caret-pos'
import { setTimeout } from 'timers'

export default {
  data: () => {
    return {
      hasFocus: false,
      caret: 0
    }
  },
  inheritAttrs: false,
  props: {
    label: {
      type: String,
      default: ''
    },
    value: [String, Number],
    disabled: Boolean
  },
  watch: {
    value: function() {
      // needs delay to work - still glitchy
      setTimeout(() => position(this.$refs.edit, this.caret), 5)
    }
  },
  methods: {
    onBlur() {
      this.hasFocus = false
    },
    onFocus() {
      this.hasFocus = true
    },
    updateValue(event) {
      this.caret = position(event.target).pos
      this.$emit('input', event.target.innerText)
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