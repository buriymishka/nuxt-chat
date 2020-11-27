<template>
  <v-container>
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
        v-model="password"
        label="New password"
        hint="At least 2 characters"
        class="input-group--focused"
        @click:append="show3 = !show3"
      ></v-text-field>

      <v-text-field
        :append-icon="show4 ? 'mdi-eye' : 'mdi-eye-off'"
        :rules="[comparePasswords]"
        :type="show4 ? 'text' : 'password'"
        v-model="rePassword"
        label="Re-enter new password"
        hint="At least 2 characters"
        class="input-group--focused"
        @click:append="show4 = !show4"
      ></v-text-field>

      <v-img max-height="150" max-width="250" :src="userImage"></v-img>

      <v-file-input ref="upload" @change="handleImageChange"> </v-file-input>

      <v-btn
        type="submit"
        color="primary"
        :loading="btnLoading"
        class="mr-4 mt-4"
        >Update</v-btn
      >
    </v-form>
  </v-container>
</template>
<script>
import mixinParser from "@/mixins/parser";
export default {
  layout: "main",
  middleware: ["auth"],
  mixins: [mixinParser],
  data() {
    return {
      valid: true,
      email: "",
      emailRules: [
        (v) => /.+@.+\..+/.test(v) || "E-mail must be valid",
        (v) => (v || "").indexOf(" ") < 0 || "No spaces are allowed",
      ],
      name: "",
      nameRules: [(v) => v.length >= 2 || "Min 2 characters"],
      password: "",
      show3: false,
      passwordRules: [
        (v) => v.length >= 2 || !v.length || "Min 2 characters",
        (v) => (v || "").indexOf(" ") < 0 || "No spaces are allowed",
      ],
      rePassword: "",
      show4: false,
      rePasswordRules: {},
      userImage: "",
      image: null,
      btnLoading: false,
    };
  },
  computed: {
    comparePasswords() {
      return () => this.password === this.rePassword || "Password must match";
    },
  },

  methods: {
    handleImageChange(file, fileList) {
      this.image = file;
    },
    setupForm() {
      let { name, email } = this.$store.getters["user/user"];
      this.name = name;
      this.email = email;
      this.userImage = this.$store.getters["user/userImage"];
    },
    async formHandler() {
      this.name = this.MixinParser(this.name);
      this.$nextTick(async () => {
        if (this.$refs.form.validate()) {
          this.btnLoading = true;

          const formData = {
            name: this.name,
            email: this.email,
            image: this.image,
            newPassword: this.password,
          };

          let res = await this.$store.dispatch("user/update", formData);
          if (res) {
            this.setupForm();
          }
          this.btnLoading = false;
        }
      });
    },
  },
  async mounted() {
    if (!this.$store.getters["user/user"]) {
      await this.$store.dispatch("user/load");
    }
    this.setupForm();
  },
};
</script>
