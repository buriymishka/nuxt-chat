<template>
  <div class="main-wrap">
    <transition name="fade" mode="out-in" v-on:beforeEnter="beforeEnter">
      <AppLoader v-if="loading" />
      <v-container
        fluid
        ref="block"
        class="container"
        v-else-if="$store.getters['user/user']"
      >
        <div class="messages-wrapper" ref="block">
          <AppMessage
            v-for="(message, i) in messagesInfo"
            :key="i"
            :content="message.content"
            :ownerName="ownerName(message.ownerId)"
            :isOwner="isOwner(message.ownerId)"
            :system="message.ownerId === MixinSystemId"
          />
        </div>
      </v-container>
    </transition>
    <v-footer app height="72" inset class="flex-nowrap">
      <v-text-field
        background-color="grey lighten-2"
        class="input"
        dense
        flat
        hide-details
        rounded
        autofocus
        solo
        v-model="mess"
        @keypress.enter="sendMessage"
      ></v-text-field>
      <v-btn @click="sendMessage" large rounded color="success" class="ml-4">
        <v-icon> mdi-send </v-icon>
      </v-btn>
    </v-footer>
  </div>
</template>

<script>
import AppMessage from "@/components/cabinet/message";
import AppLoader from "@/components/loader";
import systemMixin from "@/mixins/system";

import { mapGetters } from "vuex";
export default {
  layout: "main",
  middleware: ["auth"],
  mixins: [systemMixin],
  components: {
    AppMessage,
    AppLoader,
  },
  data() {
    return {
      mess: "",
      loading: true,
      chatId: this.$route.params.id,
    };
  },
  computed: {
    ...mapGetters("currentChat", {
      usersInfo: "users",
      messagesInfo: "messages",
    }),
    ownerName: function () {
      return (ownerId) => {
        return this.usersInfo.find((user) => user.id === ownerId).name;
      };
    },
    isOwner: function () {
      return (ownerId) => {
        return this.$store.getters["user/user"].id === ownerId;
      };
    },
  },
  watch: {
    messagesInfo() {
      if (!this.loading) {
        let block = this.$refs.block;
        let difference =
          block.scrollHeight - block.scrollTop - block.clientHeight;
        this.$nextTick(() => {
          if (difference < 200) {
            block.scrollTop = block.scrollHeight;
          }
        });
      }
    },
  },
  methods: {
    async sendMessage() {
      let message = this.mess.trim();
      if (message) {
        let chatId = this.$route.params.id;
        let res = await this.$store.dispatch("currentChat/sendMessage", {
          content: message,
          chatId,
        });

        if (res) {
          this.$socket.client.emit("createMessage", {
            ...res,
            chatId,
          });
          this.mess = "";
        }
      }
    },
    beforeEnter() {
      this.$nextTick(() => {
        this.$refs.block.scrollTop = this.$refs.block.scrollHeight;
      });
    },
  },
  async mounted() {
    if (!this.$store.getters["user/user"]) {
      await this.$store.dispatch("user/load");
    }
    let res = await this.$store.dispatch(
      "currentChat/loadChat",
      this.$route.params.id
    );
    if (res) {
      this.loading = false;
      this.$socket.client.emit("joinToChat", this.$route.params.id);
    }
  },
  beforeDestroy() {
    this.$store.dispatch("currentChat/clear");
    this.$socket.client.emit("leftChat", this.chatId);
  },
};
</script>

<style scoped>
.input >>> .v-text-field__slot input {
  color: #000000;
}
.container {
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  overflow-y: auto;
}
.main-wrap {
  position: relative;
  height: 100%;
  overflow: hidden;
}
</style>
