<template>
  <v-container fluid fill-height>
    <!-- <v-layout row wrap align-center> -->
    <v-layout wrap align-center justify-center>
      <v-flex xs12 sm8 md6 lg6 xl6>
        <v-card class="elevation-12">
          <v-img
            src="./img/Remedley-Logo.svg"
            :aspect-ratio="16/9"
            contain
            position="center"
            class="mb-4"
          ></v-img>
          <div class="text-xs-center">
            <!-- <v-card-title primary-title> -->
            <h3 class="mb-0 green--text">SignUp (for health experts)</h3>
            <!-- </v-card-title> -->
          </div>
          <v-form class="text-xs-center" ref="form" v-model="valid">
            <!-- <v-text-field v-model="name" :counter="10" :rules="nameRules" label="Name" required></v-text-field> -->
            <!-- <v-flex xs12 sm6> -->
            <v-text-field
              browser-autocomplete
              class="mx-5"
              :counter="30"
              v-model="fullName"
              :rules="fullNameRules"
              label="Full Name"
              required
            ></v-text-field>
            <v-text-field
              browser-autocomplete
              class="mx-5"
              v-model="email"
              :rules="emailRules"
              label="E-mail"
              required
            ></v-text-field>
            <!-- </v-flex> -->
            <v-text-field
              class="mx-5"
              v-model="password"
              :append-icon="show1 ? 'mdi-eye-off' : 'mdi-eye'"
              :rules="passwordRules"
              :type="show1 ? 'text' : 'password'"
              label="Password"
              hint="At least 8 characters"
              counter
              @click:append="show1 = !show1"
            ></v-text-field>

            <v-checkbox
              class="mx-5"
              v-model="checkbox"
              :rules="[v => !!v || 'You must agree to continue!']"
              label="Do you agree? (For future, if required)"
              required
            ></v-checkbox>
            <!-- <router-link to="/dashboard"> -->
            <v-btn
              type="submit"
              :disabled="!valid"
              color="success"
              @click.prevent.stop="signUp"
            >SignUp</v-btn>
            <!-- </router-link> -->
          </v-form>

          <v-card-actions class="mx-5">
            <v-btn flat color="success" @click="goToLogin">Back to Login</v-btn>
          </v-card-actions>
        </v-card>
      </v-flex>

      <v-dialog v-model="showSignUpMessage">
        <v-layout justify-center wrap>
          <v-card>
            <v-card-title class="headline">Sign Up Application Received</v-card-title>

            <v-card-text>We have received your application for signup...Our admins will contact you on the given email once we're done with preliminary verification...Expect upto three days of delay.</v-card-text>

            <v-card-actions>
              <v-spacer></v-spacer>

              <v-btn color="green darken-1" flat="flat" @click="goToLogin">Ok</v-btn>
            </v-card-actions>
          </v-card>
        </v-layout>
      </v-dialog>
    </v-layout>
  </v-container>
</template>

<script>
export default {
  data: () => ({
    show1: false,
    valid: false,
    fullName: "",
    fullNameRules: [v => !!v || "Your name is required"],
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
    checkbox: "",
    showSignUpMessage: false
  }),

  methods: {
    signUp() {
      // this.$router.replace("/dashboard");
      //   this.$router.replace("/patient-list");
      this.valid = false;
      setTimeout(() => {
        this.showSignUpMessage = true;
      }, 1500);
    },
    goToLogin() {
      this.$router.replace("/login");
    }
  }
};
</script>

<style scoped>
/* .login-1 {
  height: 100%;
  width: auto;
  margin-top: auto;
} */
</style>
