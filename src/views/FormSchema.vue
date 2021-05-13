<template>
  <div>
    <b-container>
      <ValidationObserver v-slot="{ handleSubmit }">
        <b-form @submit.prevent="handleSubmit(submit($event))">
          <h5>Form design 2</h5>

          {{ address }}

          <NxBFormSchemaTextField
            name="address"
            :schema="textSchema"
            v-model="address"
          />

          <b-button type="submit">Submit</b-button>
        </b-form>
      </ValidationObserver>
    </b-container>
  </div>
</template>

<script>
import { ValidationObserver } from "vee-validate";
import { NxBFormSchemaTextField } from "../components/nx-b-form-schema-fields";

const textSchema = {
  type: "string",
  label: "Address",
  required: true,
  placeholder: "Please input some text...",
};

export default {
  components: {
    ValidationObserver,
    NxBFormSchemaTextField,
  },
  data() {
    return {
      address: "asdf",
      textSchema,
    };
  },
  methods: {
    submit(evt) {
      return () => {
        const form = new FormData(evt.target);
        const jsonForm = Object.fromEntries(form);

        console.log(jsonForm);
      };
    },
  },
};
</script>
