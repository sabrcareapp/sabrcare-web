<template>
  <v-layout row>
    <v-flex xs12 sm6 offset-sm3>
      <v-card>
        <v-toolbar color="teal" dark>
          <!-- <v-toolbar-side-icon></v-toolbar-side-icon> -->
          <v-toolbar-title class="text-xs-center hidden-sm-and-down">Patients</v-toolbar-title>

          <v-spacer></v-spacer>
          <!-- <v-text-field
            class="mr-4 mt-2 purple-input"
            label="Search..."
            hide-details
            color="purple"
          />-->
          <v-flex xs12 sm6 md3>
            <v-text-field
              label="Search"
              clearable
              prepend-icon="mdi-account-search"
              @click:prepend="click2"
              @keyup.enter="click2"
            ></v-text-field>
          </v-flex>
          <!-- <v-btn icon>
            <v-icon>mdi-account-search</v-icon>
          </v-btn>-->
        </v-toolbar>

        <v-list subheader>
          <v-subheader>Today</v-subheader>
          <v-list-tile v-for="item in items" :key="item.title" avatar @click="click1">
            <v-list-tile-avatar>
              <img :src="item.avatar">
            </v-list-tile-avatar>

            <v-list-tile-content>
              <v-list-tile-title v-html="item.title"></v-list-tile-title>
            </v-list-tile-content>

            <v-list-tile-action>
              <v-icon
                :color="item.active ? 'orange' : 'green'"
              >{{item.active ? 'mdi-alert-circle':'mdi-check'}}</v-icon>
            </v-list-tile-action>
          </v-list-tile>
        </v-list>

        <v-divider></v-divider>

        <v-list subheader>
          <v-subheader>Previous</v-subheader>

          <v-list-tile v-for="item in items2" :key="item.title" avatar @click="click1">
            <v-list-tile-avatar>
              <img :src="item.avatar">
            </v-list-tile-avatar>

            <v-list-tile-content>
              <v-list-tile-title v-html="item.title"></v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>
        </v-list>
      </v-card>
    </v-flex>
  </v-layout>
</template>

<script>
export default {
  data() {
    return {
      items: [
        {
          active: true,
          title: "Jason Oner",
          avatar: "https://cdn.vuetifyjs.com/images/lists/1.jpg"
        },
        {
          active: true,
          title: "Ranee Carlson",
          avatar: "https://cdn.vuetifyjs.com/images/lists/2.jpg"
        },
        {
          title: "Cindy Baker",
          avatar: "https://cdn.vuetifyjs.com/images/lists/3.jpg"
        },
        {
          title: "Ali Connors",
          avatar: "https://cdn.vuetifyjs.com/images/lists/4.jpg"
        }
      ],
      items2: [
        {
          title: "Travis Howard",
          avatar: "https://cdn.vuetifyjs.com/images/lists/5.jpg"
        }
      ]
    };
  },
  methods: {
    click1() {
      return 1;
    },
    click2() {
      alert("Test");
    }
  }
};
</script>

