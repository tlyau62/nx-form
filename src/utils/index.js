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
} from "lodash/fp";

/**
 * Wrap a form input element to schema field
 *
 * FormGroup
 * - normally refer to NxBFormGroup, a bform group with validation
 *
 * FormInput
 * - in addtional to any bootstrap vue form element
 * - please create a new schema component that map the schema object to the bootstrap vue component
 */
export const createSchemaField = curry(function (
  FormGroup,
  FormInput,
  options = {}
) {
  return {
    render() {
      return (
        <FormGroup
          name={this.name}
          label={this.schema.label}
          rules={options.rules}
          required={this.schema.required}
          scopedSlots={{
            default: (validationContext) => {
              return (
                <FormInput
                  name={this.name}
                  schema={this.schema}
                  value={this.value}
                  on={{
                    input: this.$listeners.input,
                  }}
                  validationContext={validationContext}
                />
              );
            },
          }}
        ></FormGroup>
      );
    },
    props: {
      schema: {
        type: Object,
      },
      name: {
        type: String,
        default: "",
      },
      value: {},
    },
  };
});

/**
 * Get schema field type
 *
 * For both nx-form schema and json schema
 */
export const equalType = curry((type, value) =>
  compose(eq(type), prop("type"))(value)
);

export const createSchemaModel = cond([
  [
    equalType("object"),
    (scheme) => createSchemaModelOnObjectType(scheme.fields),
  ],
  [T, constant(undefined)],
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
              [k]: v ?? (source[k] || {}),
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
              [k]: v ? projectDeep(source[k] || [], v) : source[k],
            }),
          {}
        ),
    ],
    [T, constant(source)],
  ])(target)
);
