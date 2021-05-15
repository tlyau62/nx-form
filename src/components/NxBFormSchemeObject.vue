<template>
  <div>
    <NxBFormSchemaField
      v-for="[name, field] of fields"
      :key="name"
      :name="name"
      :schema="field"
      v-model="localValue[name]"
    />
  </div>
</template>

<script>
import { isPlainObject, clone } from "lodash/fp";
import { createSchemaModelWithDefault } from "../utils";

export default {
  components: {
    NxBFormSchemaField: () => import("./NxBFormSchemaField"), // fix circular dep
  },
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
      return Object.entries(this.schema.fields);
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
