<template>
  <div>
    <b-container>
      <ValidationObserver v-slot="{ handleSubmit }">
        <b-form @submit.prevent="handleSubmit(submit($event))">
          <h5>Form design 2</h5>

          <p>{{ nestedObject }}</p>

          <FormSchemaCustomForm
            name="colour"
            :schema="nestedObjectSchema"
            v-model="nestedObject"
          />

          <b-button type="submit">Submit</b-button>
        </b-form>
      </ValidationObserver>
    </b-container>
  </div>
</template>

<script>
import { ValidationObserver } from "vee-validate";
import FormSchemaCustomForm from "./FormSchemaCustom/FormSchemaCustomForm";

const nestedObjectSchema = {
  type: "object",
  label: "colour",
  fields: {
    blue: {
      type: "string",
      label: "Blue",
    },
    black: {
      type: "object",
      label: "Black",
      fields: {
        darkBlack: {
          type: "string",
          label: "Dark Black",
        },
        dateBlack: {
          type: "string",
          format: "date-time",
          label: "Date Black",
        },
      },
    },
  },
};

export default {
  components: {
    ValidationObserver,
    FormSchemaCustomForm,
  },
  data() {
    return {
      nestedObject: {},
      nestedObjectSchema,
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
