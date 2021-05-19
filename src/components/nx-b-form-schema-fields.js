import NxBFormGroup from "./NxBFormGroup";
import NxBFormSchemaInput from "./NxBFormSchemaInput";
import NxBFormSchemaDatepicker from "./NxBFormSchemaDatepicker";
import NxBFormSchemaInteger from "./NxBFormSchemaInteger";
import { T, cond, constant } from "lodash/fp";
import { equalType, equalTypeAndFormat } from "../utils";
import nxBFormSchemaForm from "./nxBFormSchemaForm.js";
import NxBFormSchemaGroup from "./NxBFormSchemaGroup";

export const NxBFormSchemaNxBFormGroup = NxBFormSchemaGroup(NxBFormGroup);

export const NxBFormSchemaTextField =
  NxBFormSchemaNxBFormGroup(NxBFormSchemaInput);

export const NxBFormSchemaDatepickerField = NxBFormSchemaNxBFormGroup(
  NxBFormSchemaDatepicker,
  {
    rules: {
      date: { format: "YYYY-MM-DD" },
    },
  }
);

export const NxBFormSchemaIntegerField = NxBFormSchemaNxBFormGroup(
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
  NxBFormSchemaNxBFormGroup(NxBFormSchemeObject);
