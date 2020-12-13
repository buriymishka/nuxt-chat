<template>
  <v-layout align-center fill-height>
    <v-flex>
      <div class="text-center">
        <a
          href="https://docs.google.com/document/d/1S5S4CsrBvERFyGrEy6iLEJCrbURyV8MfrRG-OoYHzBI/edit?usp=sharing"
          target="_blank"
          rel="noopener noreferrer"
        >
          <v-chip large class="ma-4 pointer" color="green" text-color="white">
            How does it works
          </v-chip>
        </a>
      </div>
      <v-card max-width="600" class="mx-auto my-12">
        <v-card-title>Sign in</v-card-title>
        <v-card-text>
          <v-form
            @submit.prevent="formHandler"
            ref="form"
            v-model="valid"
            lazy-validation
          >
            <v-text-field
              v-model.trim="email"
              :rules="emailRules"
              name="email"
              label="E-mail"
              required
            ></v-text-field>

            <v-text-field
              :append-icon="show3 ? 'mdi-eye' : 'mdi-eye-off'"
              :rules="passwordRules"
              :type="show3 ? 'text' : 'password'"
              v-model.trim="password"
              label="Password"
              hint="At least 2 characters"
              class="input-group--focused"
              @click:append="show3 = !show3"
            ></v-text-field>

            <v-btn
              type="submit"
              color="primary"
              :loading="btnLoading"
              class="mr-4 mt-4"
              >Sign in</v-btn
            >
          </v-form>
          <div class="mt-6 d-flex justify-space-between">
            <nuxt-link to="/register">
              <v-chip link color="green" text-color="white">Register</v-chip>
            </nuxt-link>
            <nuxt-link to="/recover">
              <v-chip link color="red" text-color="white"
                >Forgot password</v-chip
              >
            </nuxt-link>
          </div>
        </v-card-text>
      </v-card>
    </v-flex>
  </v-layout>
</template>

<script>
export default {
  layout: "empty",
  middleware: ['notAuth'],
  data: () => ({
    valid: true,
    email: "",
    emailRules: [
      (v) => !!v || "E-mail is required",
      (v) => /.+@.+\..+/.test(v) || "E-mail must be valid",
      (v) => (v || "").indexOf(" ") < 0 || "No spaces are allowed",
    ],
    password: "",
    show3: false,
    passwordRules: [
      (value) => !!value || "Required.",
      (v) => v.length >= 2 || "Min 2 characters",
      (v) => (v || "").indexOf(" ") < 0 || "No spaces are allowed",
    ],
    btnLoading: false,
  }),

  methods: {
    async formHandler() {
      if (this.$refs.form.validate()) {
        this.btnLoading = true;
        await this.$store.dispatch("user/login", {
          email: this.email,
          password: this.password,
        });
        this.btnLoading = false;
      }
    },
  },
};
</script>
