<template>
  <div>
    <NxBFormSchemaTextField
      v-for="[name, field] of fields"
      :key="name"
      :name="name"
      :schema="field"
      v-model="localValue[name]"
    />
  </div>
</template>

<script>
export default {
  props: {
    name: {},
    schema: {},
    value: {},
  },
  data() {
    return {
      localValue: this.value,
    };
  },
  computed: {
    fields() {
      return Object.entries(this.schema.fields);
    },
  },
  beforeCreate() {
    this.$options.components.NxBFormSchemaTextField =
      require("./nx-b-form-schema-fields").NxBFormSchemaTextField;
  },
};
</script>
