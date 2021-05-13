import { createSchemaField } from "../utils";
import { BFormGroup } from "bootstrap-vue";
import { cond, curry, prop, compose, eq, constant, T } from "lodash/fp";
import NxBFormSchemaInput from "./NxBFormSchemaInput";

export const createSchemaFieldWitBFormGroup = createSchemaField(BFormGroup);

export const NxBFormSchemaTextField =
  createSchemaFieldWitBFormGroup(NxBFormSchemaInput);

export const equalType = curry((type, value) =>
  compose(eq(type), prop("type"))(value)
);

export const getSchemaFieldByType = cond([
  [T, constant(NxBFormSchemaTextField)],
]);
