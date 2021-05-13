<template>
  <ValidationProvider
    :name="name"
    :rules="computedRules"
    v-slot="validationContext"
  >
    <component :is="tag" :label="label" v-bind="$attrs" v-on="$listeners">
      <slot
        v-bind="{
          ...validationContext,
          state: getValidationState(validationContext),
        }"
      />

      <b-form-invalid-feedback>{{
        validationContext.errors[0]
      }}</b-form-invalid-feedback>
    </component>
  </ValidationProvider>
</template>

<script>
import { ValidationProvider } from "vee-validate";
import { BFormGroup, BFormInvalidFeedback } from "bootstrap-vue";

export default {
  components: {
    ValidationProvider,
    BFormGroup,
    BFormInvalidFeedback,
  },
  props: {
    name: {},
    rules: {},
    required: {
      type: Boolean,
    },
    tag: {
      default: "b-form-group",
    },
    label: {},
  },
  computed: {
    computedRules() {
      return {
        ...this.rules,
        required: this.required,
      };
    },
  },
  methods: {
    getValidationState({ dirty, validated, valid = null }) {
      return dirty || validated ? valid : null;
    },
  },
};
</script>

<style lang="scss" scoped></style>
