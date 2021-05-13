import { curry } from "lodash/fp";

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
export const createSchemaField = curry(function (FormGroup, FormInput) {
  return {
    render() {
      return (
        <FormGroup
          name={this.name}
          label={this.schema.label}
          rules={[]}
          required={this.schema.required}
          attrs={this.groupAttrs}
        >
          <FormInput
            name={this.name}
            schema={this.schema}
            value={this.value}
            attrs={this.inputAttrs}
            on={this.$listeners}
          />
        </FormGroup>
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
