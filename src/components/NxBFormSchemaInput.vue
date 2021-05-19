<template>
  <BFormInput
    :name="name"
    :placeholder="schema.placeholder"
    :value="value"
    @input="$listeners.input"
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
};
</script>
