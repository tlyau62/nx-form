import { equalType } from "../../utils";
import { T, cond, constant } from "lodash/fp";
import { mapTypeToComponent as mapObjectToComponent } from "../nx-b-form-schema-group";
import { mapTypeToComponent as mapIntToComponent } from "../nx-b-form-schema-int-field";
import { mapTypeToComponent as mapStringToComponent } from "../nx-b-form-schema-string-field";

export const withSchemaFieldset = require("./NxBFormSchemaFieldset").default;

export const mapTypeToComponent = cond([
  [equalType("object"), mapObjectToComponent],
  [equalType("integer"), mapIntToComponent],
  [equalType("string"), mapStringToComponent],
  [T, constant(null)],
]);

export const { NxBFormSchemaFieldset, NxBFormSchemaObject } =
  withSchemaFieldset(mapTypeToComponent);
