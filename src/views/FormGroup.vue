<template>
  <div>
    <b-container>
      <NxBForm
        @submit.prevent="handleSubmit(submit($event))"
        v-slot="{ handleSubmit }"
      >
        <h5>Form design 1</h5>

        <NxBFormGroup
          name="email"
          label="Email"
          required
          :rules="{ email: true }"
          v-slot="{ state }"
        >
          <b-form-input v-model="form.email" :state="state" name="email" />
        </NxBFormGroup>

        <NxBFormGroup
          name="username"
          label="Username"
          required
          v-slot="{ state }"
        >
          <b-form-input
            v-model="form.username"
            :state="state"
            name="username"
          />
        </NxBFormGroup>

        <NxBFormGroup
          name="password"
          label="Password"
          required
          v-slot="{ state }"
        >
          <b-form-input
            v-model="form.password"
            :state="state"
            name="password"
          />
        </NxBFormGroup>

        <NxBFormGroup
          name="datetime"
          label="Date time"
          :rules="{
            date: { format: 'DD-MM-YYYY' },
          }"
          v-slot="{ state }"
        >
          <b-form-input
            v-model="form.datetime"
            :state="state"
            name="datetime"
          />
        </NxBFormGroup>

        <b-button type="submit">Submit</b-button>
      </NxBForm>

      <div>
        <h5>Form</h5>
        {{ form }}
      </div>
    </b-container>
  </div>
</template>

<script>
import { NxBForm, NxBFormGroup } from "../components/nx-b-form";

export default {
  components: {
    NxBFormGroup,
    NxBForm,
  },
  data() {
    return {
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
