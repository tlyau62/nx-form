<template>
  <b-form-radio-group
    :name="name"
    :value="value"
    @input="$listeners.input"
    :state="validationContext.state"
    :options="options"
  />
</template>

<script>
import { BFormRadioGroup } from "bootstrap-vue";

export default {
  components: {
    BFormRadioGroup,
  },
  props: {
    name: {},
    schema: {},
    value: {},
    validationContext: {},
  },
  computed: {
    options() {
      return "File1.txt|Mypdf.pdf|test.mp3|xxx.mp4"
        .split("|")
        .map((text, value) => ({ value, text }));
    },
  },
};
</script>
