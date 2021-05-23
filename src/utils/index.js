import {
  compose,
  curry,
  T,
  cond,
  constant,
  isPlainObject,
  mapValues,
  eq,
  prop,
  propOr,
} from "lodash/fp";

/**
 * Get schema field type
 *
 * For both nx-form schema and json schema
 */
export const equalType = curry((type, value) =>
  compose(eq(type), prop("type"))(value)
);

export const equalFormat = curry((type, value) =>
  compose(eq(type), prop("format"))(value)
);

export const equalTypeAndFormat = curry(
  (type, format, value) => equalType(type, value) && equalFormat(format, value)
);

export const createSchemaModel = cond([
  [
    equalType("object"),
    (scheme) => createSchemaModelOnObjectType(scheme.properties),
  ],
  [T, constant(null)],
]);

export const createSchemaModelOnObjectType = mapValues((v) =>
  createSchemaModel(v)
);

export const createSchemaModelWithDefault = (schema, defaultValue) =>
  compose(projectDeep(defaultValue), createSchemaModel)(schema);

export const project = curry((source, target) =>
  cond([
    [
      isPlainObject,
      (target) =>
        Object.entries(target).reduce(
          (a, [k, v]) =>
            Object.assign(a, {
              [k]: v ?? propOr(null, k, source),
            }),
          {}
        ),
    ],
    [T, constant(source)],
  ])(target)
);

/**
 * Project value on source to target
 *
 * mapValues not work on undefined value
 */
export const projectDeep = curry((source, target) =>
  cond([
    [
      isPlainObject,
      (target) =>
        Object.entries(target).reduce(
          (a, [k, v]) =>
            Object.assign(a, {
              [k]: v
                ? projectDeep(propOr({}, k, source), v)
                : propOr(null, k, source),
            }),
          {}
        ),
    ],
    [T, constant(source)],
  ])(target)
);
