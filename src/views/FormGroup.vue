<template>
  <div>
    <b-container>
      <ValidationObserver v-slot="{ handleSubmit }">
        <b-form @submit.prevent="handleSubmit(submitDesign1($event))">
          <h5>Form design 1</h5>

          <NxBFormGroup
            name="email"
            required
            :rules="{ email: true }"
            v-slot="{ state }"
          >
            <b-form-input v-model="form.email" :state="state" name="email" />
          </NxBFormGroup>

          <NxBFormGroup name="username" required v-slot="{ state }">
            <b-form-input
              v-model="form.username"
              :state="state"
              name="username"
            />
          </NxBFormGroup>

          <NxBFormGroup name="password" required v-slot="{ state }">
            <b-form-input
              v-model="form.password"
              :state="state"
              name="password"
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
};
</script>
