<template>
  <div>
    <v-dialog v-model="dialog" width="500">
      <template v-slot:activator="{ on, attrs }">
        <v-btn color="success" dark v-bind="attrs" v-on="on">
          <v-icon> mdi-information-outline </v-icon>
        </v-btn>
      </template>

      <v-card>
        <v-card-title class="headline primary"> Chat information </v-card-title>

        <v-card-text>
          <v-card-subtitle class="pl-0 py-2 pt-4"
            >Chat title: {{ title }}</v-card-subtitle
          >
          <v-card-subtitle class="pl-0 py-2"
            >Chat number: {{ id }}</v-card-subtitle
          >
          <v-list>
            <h3>Members</h3>
            <v-list-item-group color="primary">
              <v-list-item v-for="user in users" :key="user.id" v-show="user.id !== MixinSystemId">
                <v-list-item-content>
                  <v-list-item-title v-text="user.name"></v-list-item-title>
                </v-list-item-content>
              </v-list-item>
            </v-list-item-group>
          </v-list>
        </v-card-text>

        <v-divider></v-divider>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="primary" text @click="dialog = false">OK</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import systemMixin from '@/mixins/system'

export default {
  mixins: [systemMixin],
  data() {
    return {
      dialog: false,
    };
  },
  computed: {
    ...mapGetters("currentChat", {
      title: "title",
      id: "id",
      users: "users" || [],
    }),
  },
};
</script>
