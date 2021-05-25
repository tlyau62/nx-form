<template>
  <FormSchemaCustomForm v-bind="$attrs" v-on="$listeners" />
</template>

<script>
import { cond, constant, T } from "lodash/fp";
import { equalTypeAndFormat } from "../../utils";
import {
  withSchemaFieldset,
  mapTypeToComponent as defaultMapTypeToComponent,
} from "../../components/nx-b-form-schema";
import { withNxSchemaGroup } from "../../components/nx-b-form-schema-group";
import FormSchemaCustomFormTreeObject from "./FormSchemaCustomFormTreeObject";

const mapTypeToComponent = cond([
  [
    equalTypeAndFormat("integer", "tree-object-id"),
    constant(withNxSchemaGroup(FormSchemaCustomFormTreeObject)),
  ],
  [T, defaultMapTypeToComponent],
]);

export default {
  components: {
    FormSchemaCustomForm:
      withSchemaFieldset(mapTypeToComponent).NxBFormSchemaFieldset,
  },
};
</script>
