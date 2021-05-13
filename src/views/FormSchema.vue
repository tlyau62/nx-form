<template>
  <div>
    <b-container>
      <ValidationObserver v-slot="{ handleSubmit }">
        <b-form @submit.prevent="handleSubmit(submit($event))">
          <h5>Form design 2</h5>

          <p>{{ address }}</p>

          <p>{{ dob }}</p>

          <NxBFormSchemaTextField
            name="address"
            :schema="textSchema"
            v-model="address"
          />

          <NxBFormSchemaObjectField
            name="dob"
            :schema="objectSchema"
            v-model="dob"
          />

          <b-button type="submit">Submit</b-button>
        </b-form>
      </ValidationObserver>
    </b-container>
  </div>
</template>

<script>
import { ValidationObserver } from "vee-validate";
import {
  NxBFormSchemaTextField,
  NxBFormSchemaObjectField,
} from "../components/nx-b-form-schema-fields";

const textSchema = {
  type: "string",
  label: "Address",
  required: true,
  placeholder: "Please input some text...",
};

const objectSchema = {
  type: "object",
  label: "DOB",
  fields: {
    day: {
      type: "string",
      label: "Day",
    },
    month: {
      type: "string",
      label: "Month",
    },
  },
};

export default {
  components: {
    ValidationObserver,
    NxBFormSchemaTextField,
    NxBFormSchemaObjectField,
  },
  data() {
    return {
      address: "asdf",
      dob: {
        day: "",
        month: "",
      },
      textSchema,
      objectSchema,
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
