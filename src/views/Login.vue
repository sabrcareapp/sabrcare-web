<template>
  <v-container fluid fill-height>
    <v-layout row wrap align-end class="login-1" >
      <v-flex xs12 sm6 offset-sm3>
        <v-card class="mx-auto">
          <v-img
            src="http://sabrcare.com/wp-content/uploads/2018/07/sabcare-logo-1.png"
            position="center"
            height="auto"
            width="auto"
            class="mb-5"
          ></v-img>

          <!-- <v-card-title  primary-title>
            <div >
              <h3 class="headline mb-0">Login</h3>
            </div>
          </v-card-title>-->
          <v-form class="text-xs-center" ref="form" v-model="valid">
            <!-- <v-text-field v-model="name" :counter="10" :rules="nameRules" label="Name" required></v-text-field> -->
            <!-- <v-flex xs12 sm6> -->
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

            <!-- <v-checkbox
              class="mx-5"
              v-model="checkbox"
              :rules="[v => !!v || 'You must agree to continue!']"
              label="Do you agree? (For future, if required)"
              required
            ></v-checkbox>-->
            <!-- <router-link to="/dashboard"> -->
            <v-btn type="submit" :disabled="!valid" color="success" @click.prevent="login">Login</v-btn>
            <!-- </router-link> -->
          </v-form>

          <v-card-actions class="mx-5">
            <v-btn flat color="success">Share</v-btn>
            <v-btn flat color="success">Explore</v-btn>
          </v-card-actions>
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
    email: "",
    emailRules: [
      v => !!v || "E-mail is required",
      v => /.+@.+/.test(v) || "E-mail must be valid"
    ],
    password: "",
    passwordRules: [
      v => !!v || "Password is required",
      v => v.length >= 8 || "Min 8 characters"
    ],
    checkbox: ""
  }),

  methods: {
    login() {
      this.$router.replace("/dashboard");
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
