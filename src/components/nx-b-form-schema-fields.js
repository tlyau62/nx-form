import { createSchemaField } from "../utils";
import { BFormGroup } from "bootstrap-vue";
import NxBFormSchemaInput from "./NxBFormSchemaInput";
import NxBFormSchemeObject from "./NxBFormSchemeObject";
import NxBFormSchemaDatepicker from "./NxBFormSchemaDatepicker";

export const createSchemaFieldWitBFormGroup = createSchemaField(BFormGroup);

export const NxBFormSchemaTextField =
  createSchemaFieldWitBFormGroup(NxBFormSchemaInput);

export const NxBFormSchemaObjectField =
  createSchemaFieldWitBFormGroup(NxBFormSchemeObject);

export const NxBFormSchemaDatepickerField = createSchemaFieldWitBFormGroup(
  NxBFormSchemaDatepicker
);
