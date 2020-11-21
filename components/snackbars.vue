<template>
  <div>
    <transition-group name="list" tag="div">
      <AppSnackbar
        v-for="snack in snacks"
        :key="snack.id"
        :id="snack.id"
        :timeout="snack.timeout"
        :color="snack.color"
        @onSnackClose="snackCloseHandler"
      >
        {{ snack.text }}
      </AppSnackbar>
    </transition-group>
  </div>
</template>

<script>
import AppSnackbar from "@/components/snackbar";

export default {
  components: {
    AppSnackbar,
  },
  data: () => ({
    snackbar: true,
  }),
  computed: {
    snacks() {
      return this.$store.getters["alerts/alerts"];
    },
  },
  methods: {
    snackCloseHandler(id) {
      this.$store.dispatch("alerts/remove", id);
    },
  },
};
</script>

<style scoped>
.list-enter-active, .list-leave-active {
  transition: all .5s;
}
.list-enter, .list-leave-to /* .list-leave-active до версии 2.1.8 */ {
  opacity: 0;
}
</style>
