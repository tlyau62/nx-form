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
export default {
  props: {
    name: {},
    schema: {},
    value: {},
  },
  computed: {
    component() {
      const mapTypeToComponent =
        require("./nx-b-form-schema-fields").mapTypeToComponent;

      return mapTypeToComponent(this.schema);
    },
  },
};
</script>
