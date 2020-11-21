<template>
  <v-container>
    <v-btn color="primary" class="mb-6" @click="closeHandler">
      <v-icon> mdi-keyboard-backspace </v-icon>
    </v-btn>
    <h2>Chat information</h2>

    <AppLoader v-if="loading" />
    <div v-else>
      <h4>Title: {{ chatInfo.title }}</h4>
      <h4>Number: {{ chatInfo.id }}</h4>
      <h4>Password: {{ chatInfo.password }}</h4>
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
          >Update chat</v-btn
        >
      </v-form>
    </div>
  </v-container>
</template>

<script>
import AppLoader from "@/components/loader";

export default {
  components: {
    AppLoader,
  },
  props: {
    id: {
      required: true,
    },
  },
  data: () => ({
    valid: true,
    title: "",
    loading: true,
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
  computed: {
    chatInfo() {
      return this.$store.getters["userChats/editChat"];
    },
  },
  methods: {
    async formHandler() {
      if (this.$refs.form.validate()) {
        this.btnLoading = true;

        let res = await this.$store.dispatch("userChats/update", {
          title: this.title,
          password: this.password,
          id: this.chatInfo.id,
        });

        this.btnLoading = false;
      }
    },
    closeHandler() {
      this.$store.dispatch("userChats/clearEditChat");
      this.$emit("close");
    },
  },
  async mounted() {
    await this.$store.dispatch("userChats/loadById", this.id);
    this.title = this.chatInfo.title;
    this.password = this.chatInfo.password;
    this.loading = false;
  },
};
</script>
