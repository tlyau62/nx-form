import { curry, startCase, lowerCase } from "lodash/fp";
import fieldMixin from "../mixins/field.mixin";
import { isRequired } from "../utils";

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
export default curry(function (FormGroup, FormInput, options = {}) {
  return {
    mixins: [fieldMixin],
    render() {
      return (
        <FormGroup
          name={this.name}
          label={this.schema.title || startCase(lowerCase(this.name))}
          rules={options.rules}
          required={isRequired(this.schema)}
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
        />
      );
    },
  };
});
