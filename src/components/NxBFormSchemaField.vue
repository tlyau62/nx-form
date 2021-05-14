<template>
  <component
    :is="component"
    :name="name"
    :schema="schema"
    :value="value"
    @input="$listeners.input"
  />
</template>

<script>
import { mapTypeToComponent } from "./nx-b-form-schema-fields";

export default {
  props: {
    name: {},
    schema: {},
    value: {},
  },
  computed: {
    component() {
      return mapTypeToComponent(this.schema);
    },
  },
};
</script>
