import { equalTypeAndFormat, equalType } from "../../utils";
import { T, cond, constant, has } from "lodash/fp";

export const NxBFormSchemaDatepickerField =
  require("./NxBFormSchemaDatepickerField").default;

export const NxBFormSchemaInputField =
  require("./NxBFormSchemaInputField").default;

export const NxBFormSchemaSelectField =
  require("./NxBFormSchemaSelectField").default;

export const mapTypeToComponent = cond([
  [has("enum"), constant(NxBFormSchemaSelectField)],
  [
    equalTypeAndFormat("string", "date-time"),
    constant(NxBFormSchemaDatepickerField),
  ],
  [equalType("string"), constant(NxBFormSchemaInputField)],
  [T, constant(null)],
]);
