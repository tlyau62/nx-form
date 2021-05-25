<template>
  <div>
    <b-container>
      <NxBForm
        @submit.prevent="handleSubmit(submit($event))"
        v-slot="{ handleSubmit }"
      >
        <h5>Form design 2</h5>

        <p>{{ nestedObject }}</p>

        <FormSchemaCustomForm
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
import FormSchemaCustomForm from "./FormSchemaCustom/FormSchemaCustomForm";

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
          format: "date-time",
          title: "Date Black",
        },
        treeObj: {
          type: "integer",
          format: "tree-object-id",
          title: "Tree Object id",
        },
      },
    },
  },
};

export default {
  components: {
    NxBForm,
    FormSchemaCustomForm,
  },
  data() {
    return {
      nestedObject: {
        black: {
          darkBlack: "testetst",
          dateBlack: "10-10-1999",
          treeObj: 2,
        },
      },
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
