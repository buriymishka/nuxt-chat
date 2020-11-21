<template>
  <div>
    <h2>Create chat</h2>
    <v-form
      @submit.prevent="formHandler"
      ref="form"
      v-model="valid"
      lazy-validation
    >
      <v-text-field
        v-model="title"
        :rules="titleRules"
        name="title"
        label="Chat title"
        required
      ></v-text-field>

      <v-text-field
        v-model="password"
        :rules="passwordRules"
        name="password"
        label="Chat password"
        required
      ></v-text-field>

      <v-btn
        type="submit"
        color="primary"
        :loading="btnLoading"
        class="mr-4 mt-4"
        >Create chat</v-btn
      >
    </v-form>
  </div>
</template>

<script>
export default {
  data: () => ({
    valid: true,

    title: "",
    titleRules: [
      (v) => !!v || "Chat title is required",
      (v) => v.length >= 2 || "Min 2 characters",
    ],

    password: "",
    passwordRules: [
      (v) => !!v || "Chat password is required",
      (v) => v.length >= 2 || "Min 2 characters",
      (v) => (v || "").indexOf(" ") < 0 || "No spaces are allowed",
    ],

    btnLoading: false,
  }),
  methods: {
    async formHandler() {
      if (this.$refs.form.validate()) {
        this.btnLoading = true;

        let res = await this.$store.dispatch('userChats/create', {
          title: this.title,
          password: this.password
        })
        if(res) {
          this.title = ''
          this.password = ''
        }

        this.btnLoading = false;
        this.$refs.form.resetValidation()
      }
    },
  },
};
</script>
