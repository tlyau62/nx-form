<template>
  <div>
    <b-container>
      <ValidationObserver v-slot="{ handleSubmit }">
        <b-form @submit.prevent="handleSubmit(submit($event))">
          <h5>Form design 2</h5>

          <p>{{ address }}</p>

          <p>{{ dob }}</p>

          <p>{{ nestedObject }}</p>

          <NxBFormSchemaForm
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
import { NxBFormSchemaForm } from "../components/nx-b-form-schema-fields";

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
          label: "Date Black",
          format: "date-time",
        },
      },
    },
  },
};

// export const mapTypeToComponent = cond([
//   [equalType("object"), constant(NxBFormSchemaObjectField)],
//   [equalType("integer"), constant(NxBFormSchemaIntegerField)],
//   [
//     equalTypeAndFormat("string", "date-time"),
//     constant(NxBFormSchemaDatepickerField),
//   ],
//   [equalType("string"), constant(NxBFormSchemaTextField)],
//   [T, constant(null)],
// ]);

// const visitor = {
//   fields: {
//     "folder.id"() {
//       return TreeObjectField;
//     },
//   },
//   type: {
//     integer(prop) {
//       if (prop.format === "tree-object") return TreeObjectField;
//     },
//   },
// };

// const CustomSchemaField = createSchemaField(visitor);

export default {
  components: {
    ValidationObserver,
    NxBFormSchemaForm,
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
