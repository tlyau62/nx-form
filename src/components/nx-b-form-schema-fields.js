import { createSchemaField } from "../utils";
import NxBFormGroup from "./NxBFormGroup";
import NxBFormSchemaInput from "./NxBFormSchemaInput";
import NxBFormSchemeObject from "./NxBFormSchemeObject";
import NxBFormSchemaDatepicker from "./NxBFormSchemaDatepicker";
import NxBFormSchemaInteger from "./NxBFormSchemaInteger";
import { T, cond, constant } from "lodash/fp";
import { equalType, equalTypeAndFormat } from "../utils";
import NxBFormSchemaField from "./NxBFormSchemeObject.js";

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
  NxBFormSchemaInteger,
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
  [T, constant(null)],
]);

export const mapTypeToComponentNoObject = cond([
  [equalType("integer"), constant(NxBFormSchemaIntegerField)],
  [
    equalTypeAndFormat("string", "date-time"),
    constant(NxBFormSchemaDatepickerField),
  ],
  [equalType("string"), constant(NxBFormSchemaTextField)],
  [T, constant(null)],
]);

export const NxBFormSchemaForm = NxBFormSchemaField(mapTypeToComponentNoObject);
