import { compose, curry, eq, prop } from "lodash/fp";

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
