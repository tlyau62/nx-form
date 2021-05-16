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
import NxBFormSchemeObject from "../../components/NxBFormSchemeObject";
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
    FormSchemaCustomFormTreeObject: NxBFormSchemeObject(mapTypeToComponent),
  },
};
</script>
