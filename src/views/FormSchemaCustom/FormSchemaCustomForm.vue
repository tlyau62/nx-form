<template>
  <FormSchemaCustomFormTreeObject v-bind="$attrs" v-on="$listeners" />
</template>

<script>
import { cond, constant, T } from "lodash/fp";
import { equalTypeAndFormat } from "../../utils";
import {
  createSchemaFieldWitBFormGroup,
  mapTypeToComponent as defaultMapTypeToComponent,
} from "../../components/nx-b-form-schema-fields";
import nxBFormSchemaForm from "../../components/nxBFormSchemaForm";
import FormSchemaCustomFormTreeObject from "./FormSchemaCustomFormTreeObject";

const mapTypeToComponent = cond([
  [
    equalTypeAndFormat("integer", "tree-object-id"),
    constant(createSchemaFieldWitBFormGroup(FormSchemaCustomFormTreeObject)),
  ],
  [T, defaultMapTypeToComponent],
]);

export default {
  components: {
    FormSchemaCustomFormTreeObject:
      nxBFormSchemaForm(mapTypeToComponent).NxBFormSchemaForm,
  },
};
</script>
