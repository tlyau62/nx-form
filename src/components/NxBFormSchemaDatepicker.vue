<template>
  <BInputGroup>
    <BFormInput
      type="text"
      v-model="localValue"
      placeholder="DD-MM-YYYY"
      :state="validationContext.state"
      :name="name"
    ></BFormInput>
    <BInputGroupAppend>
      <BFormDatepicker v-model="localValue" button-only right></BFormDatepicker>
    </BInputGroupAppend>
  </BInputGroup>
</template>

<script>
import fieldMixin from "../mixins/field.mixin";
import {
  BInputGroup,
  BFormInput,
  BInputGroupAppend,
  BFormDatepicker,
} from "bootstrap-vue";

export default {
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
</script>
