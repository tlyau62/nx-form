<template>
  <BFormInput
    :name="name"
    :placeholder="schema.placeholder"
    v-model="localValue"
  />
</template>

<script>
import { BFormInput } from "bootstrap-vue";

export default {
  components: {
    BFormInput,
  },
  props: {
    name: {},
    schema: {},
    value: {},
  },
  data() {
    return {
      localValue: null,
    };
  },
  watch: {
    value: {
      handler(value) {
        this.localValue = value;
      },
      immediate: true,
    },
    localValue(localValue) {
      this.$emit("input", localValue);
    },
  },
};
</script>
