import { T, cond, constant } from "lodash/fp";
import { equalType } from "../../utils";

export const NxBFormSchemaIntegerField =
  require("./NxBFormSchemaIntegerField").default;

export const mapTypeToComponent = cond([
  [equalType("integer"), constant(NxBFormSchemaIntegerField)],
  [T, constant(null)],
]);
