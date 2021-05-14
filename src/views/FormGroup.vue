<template>
  <div>
    <b-container>
      <ValidationObserver v-slot="{ handleSubmit }">
        <b-form @submit.prevent="handleSubmit(submit($event))">
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
        </b-form>
      </ValidationObserver>

      <div>
        <h5>Form</h5>
        {{ form }}
      </div>
    </b-container>
  </div>
</template>

<script>
import NxBFormGroup from "../components/NxBFormGroup";
import { ValidationObserver } from "vee-validate";

export default {
  components: {
    NxBFormGroup,
    ValidationObserver,
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
