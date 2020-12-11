<template>
  <v-app id="inspire">
    <v-navigation-drawer v-model="drawer" app>
      <nuxt-link to="/cabinet"
        ><v-btn class="ml-4 mt-4" color="primary">main page</v-btn></nuxt-link
      >
      <AppRecentChats />
    </v-navigation-drawer>

    <v-app-bar app>
      <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>
      <v-spacer></v-spacer>
      <AppChatInfo v-if="$route.name === 'chat-id'" class="mr-8" />
      <nuxt-link to="/cabinet/user" class="mr-8">
        <v-avatar>
          <img :src="userImage" alt="John" />
        </v-avatar>
      </nuxt-link>
      <v-btn depressed color="error" @click="logoutHandler">
        <v-icon> mdi-exit-to-app </v-icon>
      </v-btn>
    </v-app-bar>

    <v-main class="oh">
      <nuxt></nuxt>
    </v-main>
    <AppSnackbars />
  </v-app>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import AppRecentChats from "@/components/cabinet/recentChats";
import AppSnackbars from "@/components/snackbars";
import AppChatInfo from "@/components/cabinet/chatInfo";

export default {
  components: {
    AppRecentChats,
    AppSnackbars,
    AppChatInfo,
  },
  data: () => ({ drawer: null }),
  computed: {
    ...mapGetters("user", ["user", "userImage"]),
  },
  methods: {
    ...mapActions("user", ["load", "logout"]),
    logoutHandler() {
      this.logout();
    },
  },
  mounted() {
    if (!this.user) {
      this.load();
    }
  },
};
</script>