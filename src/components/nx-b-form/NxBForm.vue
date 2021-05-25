<script>
import { ValidationObserver } from "vee-validate";
import { BForm } from "bootstrap-vue";

export default {
  render() {
    const defaultScopedSlots = (v) => {
      return (
        <BForm attrs={this.$attrs} on={this.$listeners}>
          {this.$scopedSlots.default(v)}
        </BForm>
      );
    };

    return <ValidationObserver scopedSlots={{ default: defaultScopedSlots }} />;
  },
};
</script>
