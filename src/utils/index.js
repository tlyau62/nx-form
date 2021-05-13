import { curry } from "lodash/fp";

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
