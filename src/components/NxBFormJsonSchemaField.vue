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
import fieldMixin from "../mixins/field.mixin";

export default {
  mixins: [fieldMixin],
  components: {
    NxBFormSchemaForm,
  },
  computed: {
    jsonSchema() {
      return parseJsonSchema(this.schema);
    },
  },
};
</script>
