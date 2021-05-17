<template>
  <NxBFormSchemaForm
    :name="name"
    :schema="jsonSchema"
    :value="value"
    @input="$listeners.input"
  />
</template>

<script>
import { NxBFormSchemaForm } from "./nx-b-form-schema-fields";
import { parseJsonSchema } from "../utils/nx-json-schema-parser";

export default {
  components: {
    NxBFormSchemaForm,
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
