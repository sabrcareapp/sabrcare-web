<template>
  <v-container fill-height fluid grid-list-xl>
    <v-layout wrap justify-center>
      <v-flex xs12 sm8 md6 lg6 xl6>
        <v-card class="elevation-12">
          <div class="text-xs-center">
            <h3 class="mb-0" :style="{color: '#0a2471'}">PAGE NOT FOUND</h3>
            <v-btn
              :style="{color: 'green !important'}"
              flat
              @click="$router.replace('/login')"
            >Go back to login</v-btn>
          </div>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>
