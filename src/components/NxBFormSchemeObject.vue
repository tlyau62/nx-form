<template>
  <div>
    <component
      v-for="[name, field, component] of fields"
      :is="component"
      :key="name"
      :name="name"
      :schema="field"
      v-model="localValue[name]"
    />
  </div>
</template>

<script>
import { compose, curry, T, eq, prop, cond, constant } from "lodash/fp";

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
      return Object.entries(this.schema.fields).map((entry) => [
        ...entry,
        mapTypeToComponent(entry[1]),
      ]);
    },
  },
  beforeCreate() {
    this.$options.components.NxBFormSchemaTextField =
      require("./nx-b-form-schema-fields").NxBFormSchemaTextField;

    this.$options.components.NxBFormSchemaObjectField =
      require("./nx-b-form-schema-fields").NxBFormSchemaObjectField;
  },
};

export const equalType = curry((type, value) =>
  compose(eq(type), prop("type"))(value)
);

export const mapTypeToComponent = cond([
  [equalType("object"), constant("NxBFormSchemaObjectField")],
  [T, constant("NxBFormSchemaTextField")],
]);
</script>
