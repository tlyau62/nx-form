<template>
  <div>
    <b-container>
      <ValidationObserver v-slot="{ handleSubmit }">
        <b-form @submit.prevent="handleSubmit(submit($event))">
          <h5>Form design 3</h5>

          <NxBFormJsonSchemaField
            name="root"
            :schema="jsonSchema"
            v-model="form"
          />

          <b-button type="submit">Submit</b-button>
        </b-form>
      </ValidationObserver>
    </b-container>
  </div>
</template>

<script>
import { ValidationObserver } from "vee-validate";
import NxBFormJsonSchemaField from "../components/NxBFormJsonSchemaField";

const jsonSchema = {
  title: "Longitude and Latitude Values",
  type: "object",
  properties: {
    latitude: {
      type: "string",
      title: "Latitude",
    },
    longitude: {
      type: "string",
      title: "Longitude",
    },
    testInt: {
      type: "integer",
      title: "Test integer",
    },
  },
};

export default {
  components: {
    ValidationObserver,
    NxBFormJsonSchemaField,
  },
  data() {
    return {
      jsonSchema,
      form: {},
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
