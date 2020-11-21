<template>
  <v-list>
    <h3 class="ml-4 mb-4">Administrate your chats</h3>
    <AppLoader v-if="loading" />
    <transition mode="out-in" name="edit">
      <AppChatControl
        @close="editTab = false"
        v-if="editTab"
        :id="editTabChatId"
      />
      <v-list-item-group color="primary" v-else>
        <v-list-item
          v-for="chat in userChats"
          :key="chat.id"
          @click="editHandler(chat.id)"
        >
          <v-list-item-content>
            <v-list-item-title v-text="chat.title"></v-list-item-title>
          </v-list-item-content>
          <v-list-item-icon>
            <v-icon class="icon-edit"> mdi-playlist-edit </v-icon>
          </v-list-item-icon>
          <v-list-item-icon>
            <v-icon class="icon-trash" @click.stop="deleteHandler(chat.id)">
              mdi-trash-can-outline
            </v-icon>
          </v-list-item-icon>
        </v-list-item>
      </v-list-item-group>
    </transition>
  </v-list>
</template>

<script>
import AppLoader from "@/components/loader";
import AppChatControl from "@/components/cabinet/chatControl";

export default {
  components: {
    AppLoader,
    AppChatControl,
  },
  data: () => ({
    loading: true,
    editTab: false,
    editTabChatId: null,
  }),
  computed: {
    userChats() {
      return this.$store.getters["userChats/chats"];
    },
  },
  methods: {
    async deleteHandler(id) {
      const res = await this.$confirm("Do you really want to delete chat?", {
        title: "Warning",
      });
      if (res) {
        this.$store.dispatch("userChats/remove", id);
      }
    },
    async editHandler(id) {
      this.editTab = true;
      this.editTabChatId = id;
    },
  },
  async mounted() {
    if (!this.$store.getters["userChats/chatsLoaded"]) {
      await this.$store.dispatch("userChats/load");
    }
    this.loading = false;
  },
};
</script>

<style lang="sass" scoped>
.icon-trash
  cursor: pointer
  &:hover
    color: #d32f2f

.icon-edit
  cursor: pointer
  &:hover
    color: #388E3C

.edit-enter-active
  animation: fadeIn .3s

.edit-leave-active
  animation: fadeOut .3s

@keyframes fadeIn
  from
    opacity: 0

  to
    opacity: 1

@keyframes fadeOut
  from
    opacity: 1

  to
    opacity: 0
</style>
