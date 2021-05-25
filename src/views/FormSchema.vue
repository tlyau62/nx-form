<template>
  <div>
    <b-container>
      <NxBForm
        v-slot="{ handleSubmit }"
        @submit.prevent="handleSubmit(submit($event))"
      >
        <h5>Form design 2</h5>

        <p>{{ address }}</p>

        <p>{{ dob }}</p>

        <p>{{ nestedObject }}</p>

        <NxBFormSchemaInputField
          name="address"
          :schema="textSchema"
          v-model="address"
        />

        <NxBFormSchemaObject name="dob" :schema="objectSchema" v-model="dob" />

        <NxBFormSchemaObject
          name="colour"
          :schema="nestedObjectSchema"
          v-model="nestedObject"
        />

        <b-button type="submit">Submit</b-button>
      </NxBForm>
    </b-container>
  </div>
</template>

<script>
import { NxBForm } from "../components/nx-b-form";
import { NxBFormSchemaObject } from "../components/nx-b-form-schema";
import { NxBFormSchemaInputField } from "../components/nx-b-form-schema-string-field";

const textSchema = {
  type: "string",
  title: "Address",
  required: true,
  placeholder: "Please input some text...",
};

const objectSchema = {
  type: "object",
  title: "DOB",
  properties: {
    day: {
      type: "string",
      title: "Day",
    },
    month: {
      type: "string",
      title: "Month",
    },
  },
};

const nestedObjectSchema = {
  type: "object",
  title: "colour",
  properties: {
    blue: {
      type: "string",
      title: "Blue",
    },
    black: {
      type: "object",
      title: "Black",
      properties: {
        darkBlack: {
          type: "string",
          title: "Dark Black",
        },
        dateBlack: {
          type: "string",
          title: "Date Black",
          format: "date-time",
        },
      },
    },
  },
};

export default {
  components: {
    NxBForm,
    NxBFormSchemaInputField,
    NxBFormSchemaObject,
  },
  data() {
    return {
      address: "asdf",
      dob: {
        day: "",
        month: "",
      },
      nestedObject: {
        blue: "",
        black: {
          darkBlack: "",
        },
      },
      textSchema,
      objectSchema,
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
