import { createSchemaField } from "../utils";
import NxBFormGroup from "./NxBFormGroup";
import NxBFormSchemaInput from "./NxBFormSchemaInput";
import NxBFormSchemaDatepicker from "./NxBFormSchemaDatepicker";
import NxBFormSchemaInteger from "./NxBFormSchemaInteger";
import { T, cond, constant } from "lodash/fp";
import { equalType, equalTypeAndFormat } from "../utils";
import nxBFormSchemaForm from "./nxBFormSchemaForm.js";

export const createSchemaFieldWitBFormGroup = createSchemaField(NxBFormGroup);

export const NxBFormSchemaTextField =
  createSchemaFieldWitBFormGroup(NxBFormSchemaInput);

export const NxBFormSchemaDatepickerField = createSchemaFieldWitBFormGroup(
  NxBFormSchemaDatepicker,
  {
    rules: {
      date: { format: "YYYY-MM-DD" },
    },
  }
);

export const NxBFormSchemaIntegerField = createSchemaFieldWitBFormGroup(
  NxBFormSchemaInteger,
  {
    rules: {
      numeric: true,
    },
  }
);

export const mapTypeToComponent = cond([
  [equalType("object"), constant(NxBFormGroup)],
  [equalType("integer"), constant(NxBFormSchemaIntegerField)],
  [
    equalTypeAndFormat("string", "date-time"),
    constant(NxBFormSchemaDatepickerField),
  ],
  [equalType("string"), constant(NxBFormSchemaTextField)],
  [T, constant(null)],
]);

export const { NxBFormSchemaForm, NxBFormSchemeObject } =
  nxBFormSchemaForm(mapTypeToComponent);

export const NxBFormSchemaObjectField =
  createSchemaFieldWitBFormGroup(NxBFormSchemeObject);
