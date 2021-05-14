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
import { isPlainObject, clone } from "lodash/fp";
import { mapTypeToComponent } from "./nx-b-form-schema-fields";
import { createSchemaModelWithDefault } from "../utils";

export default {
  props: {
    name: {},
    schema: {},
    value: {},
  },
  data() {
    return {
      localValue: null,
      cacheValue: null,
    };
  },
  computed: {
    localValueWatch() {
      return isPlainObject(this.localValue)
        ? Object.values(this.localValue)
        : this.localValue;
    },
    fields() {
      return Object.entries(this.schema.fields).map((entry) => [
        ...entry,
        mapTypeToComponent(entry[1]),
      ]);
    },
  },
  watch: {
    localValueWatch: {
      handler() {
        this.cacheValue = clone(this.localValue);

        this.$emit("input", this.cacheValue);
      },
    },
    value: {
      handler(value) {
        if (value !== this.cacheValue) {
          this.localValue = createSchemaModelWithDefault(this.schema, value);
        }
      },
      immediate: true,
    },
    schema(schema) {
      this.localValue = createSchemaModelWithDefault(schema, this.value);
    },
  },
};
</script>
