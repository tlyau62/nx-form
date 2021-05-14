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
};
</script>
