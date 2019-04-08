<template>
  <v-toolbar
    id="core-toolbar"
    prominent
    style="background: #0a2471;"
    v-if="false || title!==
    'Login'&&title!=='Sign Up'"
  >
    <div class="v-toolbar-title">
      <v-toolbar-title class="white--text remedley-heading">Remedley</v-toolbar-title>
    </div>

    <v-spacer/>
    <v-toolbar-items>
      <v-flex align-center layout>
        <!-- <span style="cursor: pointer"> -->
        <span class="title" @click="logout" style="color: #f55a4e;cursor: pointer">Logout</span>
        <v-icon
          v-if="title!=='Login'&&title!=='Sign Up'"
          left
          large
          color="#f55a4e"
          @click="logout"
          style="cursor: pointer"
        >mdi-logout-variant</v-icon>
        <!-- </span> -->

        <!-- <v-btn
          v-if="title!=='Login'&&title!=='Sign Up'"
          @click="logout"
          large
          :bottom="isChrome"
          color="#f55a4e !important"
          icon
          flat
          class="btn-1"
        >
          Logout&nbsp;
          <v-icon left large color="#f55a4e">mdi-logout-variant</v-icon>
        </v-btn>-->
      </v-flex>
    </v-toolbar-items>
  </v-toolbar>
</template>

<script>
export default {
  data: () => ({
    notifications: [],
    title: null,
    responsive: false,
    responsiveInput: false,
    isChrome: true
  }),

  watch: {
    $route(val) {
      this.title = val.name;
    }
  },

  mounted() {
    this.isChrome =
      !!window.chrome && (!!window.chrome.webstore || !!window.chrome.runtime);
    this.onResponsiveInverted();
    window.addEventListener("resize", this.onResponsiveInverted);
  },
  beforeDestroy() {
    window.removeEventListener("resize", this.onResponsiveInverted);
  },

  methods: {
    onResponsiveInverted() {
      if (window.innerWidth < 991) {
        this.responsive = true;
        this.responsiveInput = false;
      } else {
        this.responsive = false;
        this.responsiveInput = true;
      }
    },
    logout() {
      this.$store.dispatch("logout").then(() => {
        this.$router.push("/login");
      });
    }
  }
};
</script>

<style scoped>
#core-toolbar a {
  text-decoration: none;
}

.remedley-heading {
  font-family: "Lobster", cursive;
  font-size: 2em !important;
}
</style>

<style lang="scss" scoped>
@import "../../styles/material-dashboard/mixins";
@import "../../styles/material-dashboard/variables";
@import "../../styles/material-dashboard/toolbar";
</style>

