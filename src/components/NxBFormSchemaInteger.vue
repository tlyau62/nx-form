<template>
  <BFormInput
    :name="name"
    type="number"
    :placeholder="schema.placeholder"
    v-model.number="localValue"
    :state="validationContext.state"
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
    validationContext: {},
  },
  computed: {
    localValue: {
      get() {
        return this.value;
      },
      set(val) {
        if (val === "") {
          val = null;
        }
        this.$emit("input", val);
      },
    },
  },
};
</script>
