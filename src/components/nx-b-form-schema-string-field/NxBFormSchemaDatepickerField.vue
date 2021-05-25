<script>
import fieldMixin from "../../mixins/field.mixin";
import {
  BInputGroup,
  BFormInput,
  BInputGroupAppend,
  BFormDatepicker,
} from "bootstrap-vue";
import { withNxSchemaGroup } from "../nx-b-form-schema-group";

export const NxBFormSchemaInput = {
  render() {
    return (
      <BInputGroup>
        <BFormInput
          type={this.text}
          vModel={this.localValue}
          placeholder="DD-MM-YYYY"
          state={this.validationContext.state}
          name={this.name}
        />
        <BInputGroupAppend>
          <BFormDatepicker vModel={this.localValue} button-only right />
        </BInputGroupAppend>
      </BInputGroup>
    );
  },
  mixins: [fieldMixin],
  components: {
    BInputGroup,
    BFormInput,
    BInputGroupAppend,
    BFormDatepicker,
  },
  props: {
    validationContext: {},
  },
  computed: {
    localValue: {
      get() {
        return this.value;
      },
      set(value) {
        this.$emit("input", value);
      },
    },
  },
};

export default withNxSchemaGroup(NxBFormSchemaInput);
</script>
