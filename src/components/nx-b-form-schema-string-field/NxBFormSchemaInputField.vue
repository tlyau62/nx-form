<script>
import { BFormInput } from "bootstrap-vue";
import fieldMixin from "../../mixins/field.mixin";
import { withNxSchemaGroup } from "../nx-b-form-schema-group";

export const NxBFormSchemaInput = {
  render() {
    return (
      <BFormInput
        name={this.name}
        placeholder={this.schema.placeholder}
        value={this.value}
        on={{
          input: this.$listeners.input,
        }}
        state={this.validationContext.state}
      />
    );
  },
  mixins: [fieldMixin],
  components: {
    BFormInput,
  },
  props: {
    validationContext: {},
  },
};

export default withNxSchemaGroup(NxBFormSchemaInput);
</script>
