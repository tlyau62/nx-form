<template>
  <BFormInput
    :name="name"
    :placeholder="schema.placeholder"
    :value="value"
    @input="$listeners.input"
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
};
</script>
