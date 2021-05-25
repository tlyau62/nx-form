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
  isArray,
  head,
  includes,
  negate,
  has,
} from "lodash/fp";

export const equalType = curry((type, value) =>
  compose(
    cond([
      [isArray, compose(includes(type), head)],
      [T, eq(type)],
    ]),
    prop("type")
  )(value)
);

export const equalFormat = curry((type, value) =>
  compose(eq(type), prop("format"))(value)
);

export const equalTypeAndFormat = curry(
  (type, format, value) => equalType(type, value) && equalFormat(format, value)
);

export const isRequired = compose(
  cond([
    [isArray, negate(includes("null"))],
    [T, T],
  ]),
  prop("type")
);

export const getSchemaDefaultValue = cond([
  [has("default"), prop("default")],
  [T, constant(null)],
]);

export const createSchemaModel = cond([
  [
    equalType("object"),
    (scheme) => createSchemaModelOnObjectType(scheme.properties),
  ],
  [T, getSchemaDefaultValue],
]);

export const createSchemaModelOnObjectType = mapValues((v) =>
  createSchemaModel(v)
);

export const createSchemaModelWithDefault = (schema, defaultValue) =>
  compose(projectDeep(defaultValue), createSchemaModel)(schema);

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
              [k]: projectDeep(propOr(v, k, source), v),
            }),
          {}
        ),
    ],
    [T, constant(source)],
  ])(target)
);
