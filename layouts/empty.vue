<template>
  <v-app app>
    <v-main>
      <Nuxt />
    </v-main>
    <AppSnackbars />
  </v-app>
</template>

<script>
import AppSnackbars from "@/components/snackbars";
export default {
  components: {
    AppSnackbars,
  },
  data: () => ({ drawer: null }),
};
</script>
