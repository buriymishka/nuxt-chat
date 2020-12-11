<template>
  <v-layout align-center fill-height>
    <v-flex>
      <v-card max-width="600" class="mx-auto my-12">
        <v-card-title>Recover password</v-card-title>
        <v-card-text>
          <v-form
            @submit.prevent="formHandler"
            ref="form"
            v-model="valid"
            lazy-validation
          >
            <v-text-field
              v-model="email"
              :rules="emailRules"
              name="email"
              label="E-mail"
              required
            ></v-text-field>

            <v-btn
              type="submit"
              color="primary"
              :loading="btnLoading"
              class="mr-4 mt-4"
              >Recover password</v-btn
            >
          </v-form>
          <div class="mt-6 d-flex justify-space-between">
            <nuxt-link to="/register">
              <v-chip link color="green" text-color="white">Register</v-chip>
            </nuxt-link>
            <nuxt-link to="/">
              <v-chip link color="red" text-color="white">Sign in</v-chip>
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
  middleware: ["notAuth"],
  data: () => ({
    valid: true,
    email: "",
    emailRules: [
      (v) => !!v || "E-mail is required",
      (v) => /.+@.+\..+/.test(v) || "E-mail must be valid",
      (v) => (v || "").indexOf(" ") < 0 || "No spaces are allowed",
    ],
    btnLoading: false,
  }),

  methods: {
    async formHandler() {
      if (this.$refs.form.validate()) {
        this.btnLoading = true;
        await this.$store.dispatch("user/recover", {
          email: this.email,
        });
        this.btnLoading = false;
      }
    },
  },
};
</script>
