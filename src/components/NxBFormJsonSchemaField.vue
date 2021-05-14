<template>
  <NxBFormSchemaField
    :name="name"
    :schema="jsonSchema"
    :value="value"
    @input="$listeners.input"
  />
</template>

<script>
import NxBFormSchemaField from "./NxBFormSchemaField";
import { parseJsonSchema } from "../utils/nx-json-schema-parser";

export default {
  components: {
    NxBFormSchemaField,
  },
  props: {
    name: {},
    schema: {},
    value: {},
  },
  computed: {
    jsonSchema() {
      return parseJsonSchema(this.schema);
    },
  },
};
</script>
