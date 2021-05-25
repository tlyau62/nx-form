<script>
import { BFormSelect } from "bootstrap-vue";
import fieldMixin from "../../mixins/field.mixin";
import { withNxSchemaGroup } from "../nx-b-form-schema-group";
import { startCase, toLower, upperFirst, compose } from "lodash/fp";

const toLabel = compose(upperFirst, toLower, startCase);

export const NxBFormSchemaSelect = {
  render() {
    return (
      <BFormSelect
        name={this.name}
        value={this.value}
        on={{
          input: this.$listeners.input,
        }}
        state={this.validationContext.state}
        options={this.options}
      />
    );
  },
  mixins: [fieldMixin],
  props: {
    validationContext: {},
  },
  computed: {
    options() {
      return this.schema.enum.map((value) => ({
        value,
        text: toLabel(value),
      }));
    },
  },
};

export default withNxSchemaGroup(NxBFormSchemaSelect);
</script>
