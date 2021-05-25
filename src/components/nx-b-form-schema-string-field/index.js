import { equalTypeAndFormat, equalType } from "../../utils";
import { T, cond, constant } from "lodash/fp";

export const NxBFormSchemaDatepickerField =
  require("./NxBFormSchemaDatepickerField").default;

export const NxBFormSchemaInputField =
  require("./NxBFormSchemaInputField").default;

export const mapTypeToComponent = cond([
  [
    equalTypeAndFormat("string", "date-time"),
    constant(NxBFormSchemaDatepickerField),
  ],
  [equalType("string"), constant(NxBFormSchemaInputField)],
  [T, constant(null)],
]);
