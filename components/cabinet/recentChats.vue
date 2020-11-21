<template>
  <div>
    <v-list subheader>
      <v-subheader>Recent chat</v-subheader>

      <AppLoader v-if="loading" />

      <v-list-item-group>
        <v-list-item v-for="chat in recentChats" :key="chat.id" @click="chatSelect(chat.id)">
          <v-list-item-content class="list-item">
            <v-list-item-title v-text="chat.title"></v-list-item-title>
          </v-list-item-content>

          <v-list-item-icon>
            <v-icon class="icon" @click.stop="deleteHandler(chat.id)"
              >mdi-trash-can-outline</v-icon
            >
          </v-list-item-icon>
        </v-list-item>
      </v-list-item-group>
    </v-list>
  </div>
</template>

<script>
import AppLoader from "@/components/loader";

export default {
  components: {
    AppLoader,
  },
  data: () => ({
    loading: true,
  }),
  computed: {
    recentChats() {
      return this.$store.getters["recentChats/recentChats"];
    },
  },
  methods: {
    chatSelect(id) {
      this.$router.push(`/chat/${id}`);
    },
    async deleteHandler(id) {
      const res = await this.$confirm(
        "Do you really want to delete chat from your list?",
        { title: "Warning" }
      );
      if (res) {
        this.$store.dispatch("recentChats/remove", id);
      }
    },
  },
  async mounted() {
    await this.$store.dispatch("recentChats/load");
    this.loading = false;
  },
};
</script>

<style lang="sass" scoped>
.icon
  cursor: pointer
  &:hover
    color: #d32f2f

.list-item
  cursor: pointer
  transition: color .25s ease
  &:hover
    color: #039BE5
</style>

