import { curry } from "lodash/fp";

export const createSchemaField = curry((FormGroup, FormInput) => ({
  render() {
    return (
      <FormGroup attrs={this.groupAttrs}>
        <FormInput
          attrs={this.inputAttrs}
          on={this.$listeners}
          scopedSlots={this.$scopedSlots}
        />
      </FormGroup>
    );
  },
  props: {
    schema: {
      type: Object,
      default: () => ({
        label: "Form title",
      }),
    },
    name: {
      type: String,
      default: "",
    },
    value: {},
  },
  computed: {
    groupAttrs() {
      const attrs = {
        // validation-group props
        name: this.$attrs.name,
        label: this.schema.label,
        rules: [],
        required: this.schema.required,
      };

      return attrs;
    },
    inputAttrs() {
      const attrs = {
        name: this.$attrs.name,
        schema: this.schema,
        value: this.value,
      };

      return attrs;
    },
  },
}));
