<template>
  <v-layout align-center fill-height>
    <v-flex>
      <v-card max-width="600" class="mx-auto my-12">
        <v-card-title>Register</v-card-title>
        <v-card-text>
          <v-form
            @submit.prevent="formHandler"
            ref="form"
            v-model="valid"
            lazy-validation
          >
            <v-text-field
              v-model="name"
              :rules="nameRules"
              name="name"
              label="Name"
              hint="At least 2 characters"
              required
            ></v-text-field>

            <v-text-field
              v-model="email"
              :rules="emailRules"
              name="email"
              label="E-mail"
              required
            ></v-text-field>

            <v-text-field
              :append-icon="show3 ? 'mdi-eye' : 'mdi-eye-off'"
              :rules="passwordRules"
              :type="show3 ? 'text' : 'password'"
              v-model="password"
              label="Password"
              hint="At least 2 characters"
              class="input-group--focused"
              @click:append="show3 = !show3"
            ></v-text-field>

            <v-text-field
              :append-icon="show4 ? 'mdi-eye' : 'mdi-eye-off'"
              :rules="[rePasswordRules.required, comparePasswords]"
              :type="show4 ? 'text' : 'password'"
              v-model="rePassword"
              label="Re-enter Password"
              hint="At least 2 characters"
              class="input-group--focused"
              @click:append="show4 = !show4"
            ></v-text-field>

            <v-btn
              type="submit"
              color="primary"
              :loading="btnLoading"
              class="mr-4 mt-4"
              >Sign up</v-btn
            >
          </v-form>
          <div class="mt-6 d-flex justify-space-between">
            <nuxt-link to="/">
              <v-chip link color="green" text-color="white">Sign in</v-chip>
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
import mixinParser from "@/mixins/parser";
export default {
  layout: "empty",
  middleware: ['notAuth'],
  mixins: [mixinParser],
  data: () => ({
    valid: true,
    email: "",
    emailRules: [
      (v) => !!v || "E-mail is required",
      (v) => /.+@.+\..+/.test(v) || "E-mail must be valid",
      (v) => (v || "").indexOf(" ") < 0 || "No spaces are allowed",
    ],
    name: "",
    nameRules: [
      (v) => !!v || "Name is required",
      (v) => v.length >= 2 || "Min 2 characters",
    ],
    password: "",
    show3: false,
    passwordRules: [
      (value) => !!value || "Required.",
      (v) => v.length >= 2 || "Min 2 characters",
      (v) => (v || "").indexOf(" ") < 0 || "No spaces are allowed",
    ],
    rePassword: "",
    show4: false,
    rePasswordRules: {
      required: (value) => !!value || "Required.",
    },
    btnLoading: false,
  }),
  computed: {
    comparePasswords() {
      return () => this.password === this.rePassword || "Password must match";
    },
  },

  methods: {
    async formHandler() {
      this.name = this.MixinParser(this.name);
      this.$nextTick(async () => {
        if (this.$refs.form.validate()) {
          this.btnLoading = true;
          await this.$store.dispatch("user/signUp", {
            name: this.name,
            email: this.email,
            password: this.password,
          });
          this.btnLoading = false;
        }
      });
    },
  },
};
</script>
