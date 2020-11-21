<template>
  <v-snackbar v-model="snackbar" top :timeout="timeout" :color="color">
    <slot>Error</slot>
    <template v-slot:action="{ attrs }">
      <v-btn color="pink" v-bind="attrs" @click="snackbar = false">
        Close
      </v-btn>
    </template>
  </v-snackbar>
</template>

<script>
export default {
  props: {
    timeout: {
      default: 4000,
    },
    id: {
      required: true,
    },
    color: {
      default: "error",
    },
  },
  data: () => ({
    snackbar: false,
  }),
  mounted() {
    this.snackbar = true;
  },
  watch: {
    snackbar() {
      if (!this.snackbar) {
        this.$emit("onSnackClose", this.id);
      }
    },
  },
};
</script>
