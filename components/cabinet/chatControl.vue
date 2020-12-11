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
          :append-icon="show3 ? 'mdi-eye' : 'mdi-eye-off'"
          :rules="passwordRules"
          :type="show3 ? 'text' : 'password'"
          v-model="password"
          label="Chat password"
          class="input-group--focused"
          hint="At least 2 characters"
          @click:append="show3 = !show3"
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
import { mapGetters, mapActions } from "vuex";
import AppLoader from "@/components/loader";
import mixinParser from "@/mixins/parser";

export default {
  mixins: [mixinParser],
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
    show3: false,
    passwordRules: [
      (v) => v.length >= 2 || !v.length || "Min 2 characters",
      (v) => (v || "").indexOf(" ") < 0 || "No spaces are allowed",
    ],

    btnLoading: false,
  }),
  computed: {
    ...mapGetters("userChats", {
      chatInfo: "editChat",
    }),
  },
  methods: {
    ...mapActions("userChats", ["update", "clearEditChat", "loadById"]),
    async formHandler() {
      this.title = this.MixinParser(this.title);
      this.$nextTick(async () => {
        if (this.$refs.form.validate()) {
          this.btnLoading = true;

          let res = await this.update({
            title: this.title,
            password: this.password,
            id: this.chatInfo.id,
          });
          if (res) {
            this.password = "";
          }

          this.btnLoading = false;
        }
      });
    },
    closeHandler() {
      this.clearEditChat();
      this.$emit("close");
    },
  },
  async mounted() {
    await this.loadById(this.id);
    this.title = this.chatInfo.title;
    this.loading = false;
  },
};
</script>
