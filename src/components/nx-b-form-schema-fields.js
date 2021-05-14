import { createSchemaField } from "../utils";
import NxBFormGroup from "./NxBFormGroup";
import NxBFormSchemaInput from "./NxBFormSchemaInput";
import NxBFormSchemeObject from "./NxBFormSchemeObject";
import NxBFormSchemaDatepicker from "./NxBFormSchemaDatepicker";
import { equalType } from "../utils";

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
