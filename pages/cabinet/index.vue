<template>
  <v-container>
    <v-row>
      <v-col cols="12" md="6">
        <AppCreateChat />
        <v-divider class="my-10"></v-divider>
        <AppJoinChat />
      </v-col>
      <v-col cols="12" md="6">
        <AppUserChats />
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import AppCreateChat from "@/components/cabinet/createChat";
import AppJoinChat from "@/components/cabinet/joinChat";
import AppUserChats from "@/components/cabinet/userChats";

export default {
  layout: "main",
  middleware: ["auth"],
  components: {
    AppCreateChat,
    AppJoinChat,
    AppUserChats,
  },
  data: () => ({
    valid: true,
    email: "",
    emailRules: [
      (v) => !!v || "E-mail is required",
      (v) => /.+@.+\..+/.test(v) || "E-mail must be valid",
    ],
    btnLoading: false,
  }),
};
</script>
