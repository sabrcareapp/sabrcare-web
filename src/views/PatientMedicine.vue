<template>
  <v-container fill-height fluid grid-list-xl>
    <v-layout justify-center wrap>
      <v-flex md12>
        <material-card color="#0a2471" title="Medicines Allotted to the Patient " text>
          <v-data-table :headers="headers" :items="items" hide-actions>
            <template slot="headerCell" slot-scope="{ header }">
              <span
                class="subheading font-weight-light text-success text--darken-3"
                v-text="header.text"
              />
            </template>
            <template slot="items" slot-scope="{ item }">
              <td>{{ item.name }}</td>
              <td>{{ item.dateStarted }}</td>
              <td>{{item.details}}</td>
            </template>
          </v-data-table>
        </material-card>
        <v-snackbar top right v-model="snackbar" :color="snackbarColor" :timeout="6000">
          {{ snackbarText }}
          <v-btn dark flat @click="snackbar = false">Close</v-btn>
        </v-snackbar>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
class Medicine {
  constructor({ medicineName, medicineTimeHealthExpert, date }) {
    const errorMsg = "Not available";
    this.name = medicineName || errorMsg;
    this.dateStarted = date ? this.formattedDateAndTime(date.$date) : errorMsg;
    this.details = medicineTimeHealthExpert || errorMsg;
  }
  formattedDateAndTime(date) {
    return new Intl.DateTimeFormat("en-in", {
      year: "numeric",
      day: "2-digit",
      month: "short",
      weekday: "short",
      hour: "2-digit",
      minute: "2-digit"
    }).format(new Date(date));
  }
}
export default {
  data: () => ({
    snackbar: false,
    snackbarColor: "error",
    snackbarText: "Failed to retrieve data",
    headers: [
      {
        sortable: false,
        text: "Name",
        value: "name"
      },
      {
        sortable: false,
        text: "Date Started",
        value: "dateStarted"
      },
      {
        sortable: false,
        text: "Prescription Details",
        value: "details"
      }
    ],
    items: []
  }),
  mounted() {
    const token = this.$store.getters.authToken;
    const permissionLevel = this.$store.getters.authLevel;
    const patientID = this.$route.params.id;
    this.$http({
      method: "get",
      url: "http://api.remedley.com/api/admin/patient/medicine",
      headers: {
        token,
        permissionLevel,
        patientID
      }
    })
      .then(res => {
        this.items = res.data.data.map(medicine => new Medicine(medicine));
      })
      .catch(() => {
        this.snackbar = true;
      });
  }
};
</script>
