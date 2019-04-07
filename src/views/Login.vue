<template>
  <v-container fill-height fluid grid-list-xl>
    <!-- <v-layout row wrap align-center> -->
    <v-layout wrap justify-center>
      <v-flex xs12 sm8 md6 lg6 xl6>
        <v-card class="elevation-12">
          <v-img
            src="./img/rem-logo.png"
            :aspect-ratio="25/9"
            contain
            class="mb-4"
            :style="{backgroundColor: '#0a2471'}"
          ></v-img>
          <div class="text-xs-center">
            <!-- <v-card-title primary-title> -->
            <h3 class="mb-0" :style="{color: '#0a2471'}">Login</h3>
            <!-- </v-card-title> -->
          </div>
          <v-form class="text-xs-center" ref="form" v-model="valid">
            <!-- <v-text-field v-model="name" :counter="10" :rules="nameRules" label="Name" required></v-text-field> -->
            <!-- <v-flex xs12 sm6> -->
            <v-text-field
              browser-autocomplete
              class="mx-5"
              v-model="email"
              :key="'email_login'"
              :rules="emailRules"
              label="E-mail"
              required
            ></v-text-field>
            <!-- </v-flex> -->
            <v-text-field
              class="mx-5"
              v-model="password"
              :key="'password_login'"
              :append-icon="show1 ? 'mdi-eye-off' : 'mdi-eye'"
              :rules="passwordRules"
              :type="show1 ? 'text' : 'password'"
              label="Password"
              hint="At least 8 characters"
              counter
              @click:append="show1 = !show1"
            ></v-text-field>

            <v-btn
              :loading="loginLoading"
              type="submit"
              :disabled="!valid"
              color="#0a2471"
              @click.prevent="login"
            >Login</v-btn>
          </v-form>
          <v-card-text class="mx-5 black--text justify-center">
            <h4 class="subheading font-weight-medium">Not a health expert yet ?</h4>
            <v-btn class="subheading" round small color="#0a2471" @click="goToSignUp">Sign up</v-btn>
          </v-card-text>
          <v-snackbar top right v-model="snackbar" :color="snackbarColor" :timeout="5000">
            {{ snackbarText }}
            <v-btn dark flat @click="snackbar = false">Close</v-btn>
          </v-snackbar>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
export default {
  data: () => ({
    show1: false,
    valid: false,
    snackbar: false,
    snackbarColor: "",
    snackbarText: "",
    loginLoading: false,
    email: "",
    emailRules: [
      v => !!v || "E-mail is required",
      v => /.+@.+\..+/.test(v) || "E-mail must be valid"
    ],
    password: "",
    passwordRules: [
      v => !!v || "Password is required",
      v => v.length >= 8 || "Min 8 characters"
    ],
    checkbox: ""
  }),

  methods: {
    goToSignUp() {
      this.$router.push("/signup");
    },
    login() {
      this.valid = false;
      this.loginLoading = true;
      const email = this.email;
      const password = this.password;
      this.$store
        .dispatch("login", { email, password })
        .then(() => this.$router.replace("/patient-list"))
        .catch(() => {
          this.snackbarColor = "error";
          this.snackbarText = "Error.Try again later.";
          this.snackbar = true;
          this.loginLoading = false;
          this.valid = true;
        });
    }
  }
};
</script>