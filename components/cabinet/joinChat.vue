<template>
  <div>
    <h2>Join chat</h2>
    <v-form
      @submit.prevent="formHandler"
      ref="form"
      v-model="valid"
      lazy-validation
    >
      <v-text-field
        v-model="number"
        :rules="numberRules"
        name="number"
        label="Chat number"
        required
      ></v-text-field>

      <v-text-field
        :append-icon="show3 ? 'mdi-eye' : 'mdi-eye-off'"
        :rules="passwordRules"
        :type="show3 ? 'text' : 'password'"
        v-model="password"
        label="Password"
        class="input-group--focused"
        @click:append="show3 = !show3"
      ></v-text-field>

      <v-btn
        type="submit"
        color="primary"
        :loading="btnLoading"
        class="mr-4 mt-4"
        >Join chat</v-btn
      >
    </v-form>
  </div>
</template>

<script>
export default {
  data: () => ({
    valid: true,

    number: "",
    numberRules: [
      (v) => !!v || "Chat number is required",
      (v) => (v || "").indexOf(" ") < 0 || "No spaces are allowed",
    ],

    password: "",
    show3: false,
    passwordRules: [
      (v) => !!v || "Chat password is required",
      (v) => (v || "").indexOf(" ") < 0 || "No spaces are allowed",
    ],

    btnLoading: false,
  }),
  methods: {
    async formHandler() {
      if (this.$refs.form.validate()) {
        this.btnLoading = true;
        let chatId = this.number
        let res = await this.$store.dispatch("userChats/join", {
          number: this.number,
          password: this.password,
        });
        if (res.newUserMessage) {
          this.$socket.client.emit("createMessage", {
            ...res.newUserMessage,
            chatId
          });
          this.$socket.client.emit("addUserToChat", {
            ...res.newUser,
            chatId
          });
        }
        if (!res) {
          this.btnLoading = false;
        }
      }
    },
  },
};
</script>
