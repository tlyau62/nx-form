<template>
  <b-form-radio-group
    :name="name"
    v-model="localValue"
    :state="validationContext.state"
    :options="options"
  />
</template>

<script>
import { BFormRadioGroup } from "bootstrap-vue";

export default {
  components: {
    BFormRadioGroup,
  },
  props: {
    name: {},
    schema: {},
    value: {},
    validationContext: {},
  },
  computed: {
    options() {
      return "File1.txt|Mypdf.pdf|test.mp3|xxx.mp4"
        .split("|")
        .map((text, value) => ({ value, text }));
    },
    localValue: {
      get() {
        return this.value;
      },
      set(val) {
        this.$emit("input", val);
      },
    },
  },
};
</script>
