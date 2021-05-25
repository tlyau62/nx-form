<template>
  <div>
    <b-container>
      <NxBForm
        @submit.prevent="handleSubmit(submit($event))"
        v-slot="{ handleSubmit }"
      >
        <h5>Form design 3</h5>

        <h6>Test form 1</h6>

        {{ form }}

        <NxBFormSchemaFieldset
          name="root"
          :schema="jsonSchema"
          v-model="form"
        />

        <h6>Test form 2</h6>

        {{ form2 }}

        <NxBFormSchemaFieldset
          name="root"
          :schema="jsonSchema2"
          v-model="form2"
        />

        <b-button type="submit">Submit</b-button>
      </NxBForm>
    </b-container>
  </div>
</template>

<script>
import { NxBForm } from "../components/nx-b-form";
import { NxBFormSchemaFieldset } from "../components/nx-b-form-schema";

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

const jsonSchema2 = {
  title: "MinuteWorkflowForm",
  type: "object",
  properties: {
    id: { type: ["string", "null"] },
    commentForUpdate: { type: ["string", "null"] },
    dueDateForUpdate: { type: ["string", "null"], format: "date-time" },
    minuteID: { type: "integer" },
    senderUserID: { type: "integer" },
    state: { type: ["string", "null"] },
    subMinuteID: { type: ["integer", "null"] },
    submissionID: { type: "integer" },
    submissionJson: { type: ["string", "null"] },
    taskType: {
      type: "string",
      enum: ["cat", "dog", "bird", "reptile", "other"],
      default: "dog",
    },
  },
};

export default {
  components: {
    NxBForm,
    NxBFormSchemaFieldset,
  },
  data() {
    return {
      jsonSchema,
      jsonSchema2,
      form: {},
      form2: {},
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
