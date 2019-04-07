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
            <h3 class="mb-0" :style="{color:'#0a2471'}">SignUp (for health experts)</h3>
            <!-- </v-card-title> -->
          </div>
          <v-form class="text-xs-center" ref="formSignup" v-model="valid">
            <!-- <v-text-field v-model="name" :counter="10" :rules="nameRules" label="Name" required></v-text-field> -->
            <!-- <v-flex xs12 sm6> -->
            <v-text-field
              class="mx-5"
              :counter="30"
              :key="'full name'"
              v-model="firstName"
              :rules="firstNameRules"
              label="Full Name"
              required
            ></v-text-field>
            <v-text-field
              class="mx-5"
              v-model="email"
              :key="'email'"
              :rules="emailRules"
              label="E-mail"
              required
            ></v-text-field>
            <v-text-field
              class="mx-5"
              v-model="username"
              :key="'username'"
              :rules="usernameRules"
              label="Username"
              required
            ></v-text-field>
            <!-- </v-flex> -->
            <v-text-field
              class="mx-5"
              v-model="license"
              :key="'license no'"
              :rules="licenseRules"
              label="License No."
              required
            ></v-text-field>
            <v-text-field
              class="mx-5"
              v-model="password"
              :key="'password'"
              :append-icon="show1 ? 'mdi-eye-off' : 'mdi-eye'"
              :rules="passwordRules"
              :type="show1 ? 'text' : 'password'"
              label="Enter a password"
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
              :loading="signUpLoading"
              :disabled="!valid"
              color="#0a2471"
              @click.prevent.stop="signUp"
            >SignUp</v-btn>
            <!-- </router-link> -->
          </v-form>
          <v-snackbar top right v-model="snackbar" :color="snackbarColor" :timeout="5000">
            {{ snackbarText }}
            <v-btn dark flat @click="snackbar = false">Close</v-btn>
          </v-snackbar>
          <v-card-actions class="mx-5">
            <v-btn flat :style="{color:'#0a2471 !important'}" @click="goToLogin">Back to Login</v-btn>
          </v-card-actions>
        </v-card>
      </v-flex>

      <v-dialog persistent v-model="showSignUpMessage">
        <v-layout justify-center wrap>
          <v-card>
            <v-card-title class="headline" :style="{color: '#0a2471'}">Sign Up Application Received</v-card-title>

            <v-card-text>We have received your application for signup...Our admins will contact you on the given email once we're done with preliminary verification...Expect upto three days of delay.</v-card-text>

            <v-card-actions>
              <v-spacer></v-spacer>

              <v-btn color="green darken-1" flat @click="goToLogin">Ok</v-btn>
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
    snackbar: false,
    snackbarColor: "",
    snackbarText: "",
    signUpLoading: false,
    firstName: "",
    firstNameRules: [v => !!v || "Your name is required"],
    email: "",
    emailRules: [
      v => !!v || "E-mail is required",
      v => /.+@.+\..+/.test(v) || "E-mail must be valid"
    ],
    username: "",
    usernameRules: [v => !!v || "Username is required"],
    license: "",
    licenseRules: [v => !!v || "License number is mandatory"],
    password: "",
    passwordRules: [
      v => !!v || "Password is required",
      v => v.length >= 8 || "Min 8 characters"
    ],
    checkbox: "",
    showSignUpMessage: false
  }),
  mounted() {
    // this.$refs.formSignup.reset();
  },
  methods: {
    signUp() {
      this.valid = false;
      this.signUpLoading = true;
      // let data = {
      //   name: this.name,
      //   email: this.email,
      //   password: this.password,
      //   is_admin: this.is_admin
      // };
      // this.$store
      //   .dispatch("signup", data)
      //   .then(() => this.$router.push("/"))
      //   .catch(err => console.log(err));
      this.$http({
        method: "post",
        url: "http://api.remedley.com/api/admin/signup",
        headers: {
          email: this.email,
          firstName: this.firstName,
          password: this.password,
          username: this.username,
          license: this.license
        }
      })
        .then(res => {
          this.showSignUpMessage = true;
        })
        .catch(() => {
          this.snackbarColor = "error";
          this.snackbarText = "Error.";
          this.snackbar = true;
          this.signUpLoading = false;
          this.valid = true;
        });
    },
    goToLogin() {
      this.$router.replace("/login");
    }
  }
};
</script>
