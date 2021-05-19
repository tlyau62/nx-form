<template>
  <FormSchemaCustomFormTreeObject v-bind="$attrs" v-on="$listeners" />
</template>

<script>
import { cond, constant, T } from "lodash/fp";
import { equalTypeAndFormat } from "../../utils";
import {
  NxBFormSchemaNxBFormGroup,
  mapTypeToComponent as defaultMapTypeToComponent,
} from "../../components/nx-b-form-schema-fields";
import NxBFormSchemaForm from "../../components/NxBFormSchemaForm";
import FormSchemaCustomFormTreeObject from "./FormSchemaCustomFormTreeObject";

const mapTypeToComponent = cond([
  [
    equalTypeAndFormat("integer", "tree-object-id"),
    constant(NxBFormSchemaNxBFormGroup(FormSchemaCustomFormTreeObject)),
  ],
  [T, defaultMapTypeToComponent],
]);

export default {
  components: {
    FormSchemaCustomFormTreeObject:
      NxBFormSchemaForm(mapTypeToComponent).NxBFormSchemaForm,
  },
};
</script>
