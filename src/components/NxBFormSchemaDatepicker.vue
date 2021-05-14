<template>
  <BInputGroup>
    <BFormInput
      type="text"
      v-model="localValue"
      placeholder="DD-MM-YYYY"
      :state="validationContext.state"
    ></BFormInput>
    <BInputGroupAppend>
      <BFormDatepicker v-model="localValue" button-only right></BFormDatepicker>
    </BInputGroupAppend>
  </BInputGroup>
</template>

<script>
import {
  BInputGroup,
  BFormInput,
  BInputGroupAppend,
  BFormDatepicker,
} from "bootstrap-vue";

export default {
  components: {
    BInputGroup,
    BFormInput,
    BInputGroupAppend,
    BFormDatepicker,
  },
  props: {
    name: {},
    schema: {},
    value: {},
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
