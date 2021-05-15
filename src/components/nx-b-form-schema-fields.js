import { createSchemaField } from "../utils";
import NxBFormGroup from "./NxBFormGroup";
import NxBFormSchemaInput from "./NxBFormSchemaInput";
import NxBFormSchemeObject from "./NxBFormSchemeObject";
import NxBFormSchemaDatepicker from "./NxBFormSchemaDatepicker";
import { T, cond, constant } from "lodash/fp";
import { equalType, equalTypeAndFormat } from "../utils";

export const createSchemaFieldWitBFormGroup = createSchemaField(NxBFormGroup);

export const NxBFormSchemaTextField =
  createSchemaFieldWitBFormGroup(NxBFormSchemaInput);

export const NxBFormSchemaObjectField =
  createSchemaFieldWitBFormGroup(NxBFormSchemeObject);

export const NxBFormSchemaDatepickerField = createSchemaFieldWitBFormGroup(
  NxBFormSchemaDatepicker,
  {
    rules: {
      date: { format: "YYYY-MM-DD" },
    },
  }
);

export const NxBFormSchemaIntegerField = createSchemaFieldWitBFormGroup(
  NxBFormSchemaInput,
  {
    rules: {
      numeric: true,
    },
  }
);

export const mapTypeToComponent = cond([
  [equalType("object"), constant(NxBFormSchemaObjectField)],
  [equalType("integer"), constant(NxBFormSchemaIntegerField)],
  [
    equalTypeAndFormat("string", "date-time"),
    constant(NxBFormSchemaDatepickerField),
  ],
  [equalType("string"), constant(NxBFormSchemaTextField)],
  [T, constant(NxBFormSchemaTextField)],
]);
