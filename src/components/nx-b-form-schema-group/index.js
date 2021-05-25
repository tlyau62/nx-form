import { NxBFormGroup } from "../nx-b-form";
import { T, cond, constant } from "lodash/fp";
import { equalType } from "../../utils";

export const withSchemaGroup = require("./NxBFormSchemaGroup").default;

export const withNxSchemaGroup = withSchemaGroup(NxBFormGroup);

export const mapTypeToComponent = cond([
  [equalType("object"), constant(NxBFormGroup)],
  [T, constant(null)],
]);
