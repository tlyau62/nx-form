<script>
import { BFormInput } from "bootstrap-vue";
import fieldMixin from "../../mixins/field.mixin";
import { withNxSchemaGroup } from "../nx-b-form-schema-group";

export const NxBFormSchemaIntegerInput = {
  render() {
    return (
      <BFormInput
        name={this.name}
        type="number"
        placeholder={this.schema.placeholder}
        vModel={this.localValue}
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
  computed: {
    localValue: {
      get() {
        return this.value;
      },
      set(val) {
        if (val === "") {
          val = null;
        }
        this.$emit("input", val);
      },
    },
  },
};

export default withNxSchemaGroup(NxBFormSchemaIntegerInput);
</script>
