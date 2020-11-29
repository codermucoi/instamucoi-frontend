<script>
import axios from 'axios';
import _ from 'lodash';
import { required, email, sameAs } from 'vuelidate/lib/validators';

export default {
  name: 'Registration',
  data() {
    return {
      form: {
        email: '',
        password: '',
        passwordConfirmation: '',
      },
      show: true,
    };
  },
  methods: {
    async onSubmit() {
      this.$v.form.$touch();

      if (this.$v.form.$anyError) {
        return;
      }

      const signUpData = _.mapKeys(this.form, (value, key) => _.snakeCase(key));
      const response = await axios.post('//localhost:3000/users/sign_up', signUpData);
      console.log(response.headers);
    },
    validateState(name) {
      const { $dirty, $error } = this.$v.form[name];
      return $dirty ? !$error : null;
    },
    touchOnBlur(name) {
      this.$v.form[name].$touch();
    },
  },
  validations: {
    form: {
      email: {
        required,
        email,
      },
      password: {
        required,
      },
      passwordConfirmation: {
        required,
        sameAsPassword: sameAs('password'),
      },
    },
  },
};
</script>

<template>
  <div>
    <b-form
      v-if="show"
      novalidate
      @submit.stop.prevent="onSubmit"
    >
      <b-form-group
        id="user_email_group"
        label="Email:"
        label-for="user_email"
      >
        <b-form-input
          id="user_email"
          v-model="form.email"
          type="email"
          required
          placeholder="Enter email"
          :state="validateState('email')"
          @blur="touchOnBlur('email')"
        />
        <b-form-invalid-feedback>
          Invalid Email
        </b-form-invalid-feedback>
      </b-form-group>

      <b-form-group
        id="user_password_group"
        label="Password:"
        label-for="user_password"
      >
        <b-form-input
          id="user_password"
          v-model="form.password"
          type="password"
          required
          placeholder="Enter password"
          :state="validateState('password')"
          @blur="touchOnBlur('password')"
        />
        <b-form-invalid-feedback>
          Invalid Password
        </b-form-invalid-feedback>
      </b-form-group>

      <b-form-group
        id="user_password_confirmation_group"
        label="Password Confirmation:"
        label-for="user_password_confirmation"
      >
        <b-form-input
          id="user_password_confirmation"
          v-model="form.passwordConfirmation"
          type="password"
          required
          placeholder="Enter password confirmation"
          :state="validateState('passwordConfirmation')"
          @blur="touchOnBlur('passwordConfirmation')"
        />
        <b-form-invalid-feedback>
          Invalid Password Confirmation
        </b-form-invalid-feedback>
      </b-form-group>

      <b-button
        type="submit"
        variant="primary"
      >
        Submit
      </b-button>
    </b-form>
  </div>
</template>
