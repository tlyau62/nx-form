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
import fieldMixin from "../mixins/field.mixin";

export default {
  mixins: [fieldMixin],
  components: {
    BFormInput,
  },
  props: {
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
