<template>
  <BInputGroup>
    <BFormInput
      type="text"
      v-model="localValue"
      placeholder="YYYY-MM-DD"
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
