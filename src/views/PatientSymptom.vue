<template>
  <v-container fill-height fluid grid-list-xl>
    <v-layout justify-center wrap>
      <!-- Heat Map of Symptoms -->
      <v-flex xs12 class="mb-3">
        <v-sheet height="500">
          <v-calendar locale="en-in" ref="calendar" v-model="date" :type="type" color="primary">
            <template v-slot:day="{ date }">
              <template v-for="(event,index) in eventsMap[date]">
                <v-menu :key="index" v-model="event.open" full-width offset-x>
                  <template v-slot:activator="{ on }">
                    <div
                      v-ripple
                      class="my-event"
                      :style="{backgroundColor:symptomIntensityColorMap[event.intensity],border: `1px solid ${symptomIntensityColorMap[event.intensity]}`}"
                      v-on="on"
                      v-text="event.symptom"
                    ></div>
                  </template>
                  <!-- <v-card color="grey lighten-4" min-width="350px" flat>
                    <v-toolbar color="primary" dark>
                      <v-btn icon>
                        <v-icon>mdi-bug</v-icon>
                      </v-btn>
                      <v-toolbar-title v-text="'Severity'"></v-toolbar-title>
                      <v-spacer></v-spacer>
                    </v-toolbar>
                    <v-card-title primary-title>
                      <span v-html="event.intensity"></span>
                    </v-card-title>
                    <v-card-actions>
                      <v-btn flat color="secondary">Cancel</v-btn>
                    </v-card-actions>
                  </v-card>-->
                </v-menu>
              </template>
            </template>
          </v-calendar>
        </v-sheet>
      </v-flex>

      <v-flex xs12 sm4 class="text-sm-left text-xs-center">
        <v-btn color="#0a2471" @click="$refs.calendar.prev()">
          <v-icon dark left>mdi-chevron-left</v-icon>Prev
        </v-btn>
      </v-flex>
      <v-flex xs12 sm4 class="text-xs-center">
        <v-dialog
          ref="dialog"
          v-model="modal"
          :return-value.sync="date"
          persistent
          lazy
          full-width
          width="290px"
        >
          <template v-slot:activator="{ on }">
            <v-text-field
              v-model="date"
              label="Go to date"
              prepend-icon="mdi-calendar"
              readonly
              v-on="on"
            ></v-text-field>
          </template>
          <v-date-picker class="custom-date" reactive v-model="date" scrollable>
            <v-spacer></v-spacer>
            <v-btn flat color="primary" @click="modal = false">Cancel</v-btn>
            <v-btn flat color="primary" @click="$refs.dialog.save(date)">OK</v-btn>
          </v-date-picker>
        </v-dialog>
      </v-flex>
      <v-flex xs12 sm4 class="text-sm-right text-xs-center">
        <v-btn color="#0a2471" @click="$refs.calendar.next()">
          Next
          <v-icon right dark>mdi-chevron-right</v-icon>
        </v-btn>
      </v-flex>

      <!-- Symptom table -->
      <v-flex md12>
        <material-card color="#0a2471" title="Symptoms of Patient " text>
          <v-data-table :headers="headers" :items="items" hide-actions>
            <template slot="headerCell" slot-scope="{ header }">
              <span
                class="subheading font-weight-light text-success text--darken-3"
                v-text="header.text"
              />
            </template>
            <template slot="items" slot-scope="{ item }">
              <td>{{ item.symptom }}</td>
              <td>{{ item.dateFormatted }}</td>
              <!-- <td>{{ item.intensity }}</td> -->
              <td class="text-xs-center">
                {{item.intensity}}
                <v-progress-linear
                  :color="symptomIntensityColorMap[item.intensity]"
                  height="4"
                  :value="symptomIntensityWidth[item.intensity]"
                ></v-progress-linear>
              </td>
            </template>
          </v-data-table>
        </material-card>
      </v-flex>
      <v-snackbar top right v-model="snackbar" :color="snackbarColor" :timeout="6000">
        {{ snackbarText }}
        <v-btn dark flat @click="snackbar = false">Close</v-btn>
      </v-snackbar>
    </v-layout>
  </v-container>
</template>

<script>
class Symptom {
  constructor({ symptomName, symptomSeverity, date }) {
    const UTCDate = new Date(date.$date);
    this.symptom = symptomName;
    this.intensity = symptomSeverity;
    this.date = UTCDate.toISOString().substring(0, 10);
    this.dateFormatted = this.formattedDateAndTime(UTCDate);
    //for showing the dialog
    this.open = false;
  }
  formattedDateAndTime(date) {
    return new Intl.DateTimeFormat("en-in", {
      year: "numeric",
      day: "2-digit",
      month: "short",
      weekday: "short",
      hour: "2-digit",
      minute: "2-digit"
    }).format(date);
  }
}
export default {
  data: () => ({
    snackbar: false,
    snackbarColor: "error",
    snackbarText: "Failed to retrieve data",
    date: `${new Date().getFullYear()}-${(new Date().getMonth() + 1)
      .toString()
      .padStart(2, "0")}-${new Date()
      .getDate()
      .toString()
      .padStart(2, "0")}`,
    modal: false,
    type: "month",
    symptomIntensityColorMap: {
      None: "#4CAF50", //green
      Mild: "#FFFF00", //yellow accent-2
      Moderate: "#F57C00", //orange darken-2
      Severe: "#B71C1C", //red darken-4
      default: "#9E9E9E" //grey
    },
    symptomIntensityWidth: {
      None: 0,
      Mild: 33,
      Moderate: 66,
      Severe: 100
    },
    headers: [
      {
        sortable: false,
        text: "Symptom Name",
        value: "symptom"
      },
      {
        sortable: false,
        text: "Date Added/Modified",
        value: "date"
      },
      {
        sortable: false,
        text: "Intensity",
        value: "intensity"
      }
    ],
    items: []
  }),
  computed: {
    // convert the list of events into a map of lists keyed by date
    eventsMap() {
      const map = {};
      this.items.forEach(e => (map[e.date] = map[e.date] || []).push(e));
      return map;
    }
  },
  mounted() {
    const token = this.$store.getters.authToken;
    const permissionLevel = this.$store.getters.authLevel;
    const patientID = this.$route.params.id;

    this.$http({
      method: "get",
      url: "http://api.remedley.com/api/admin/patient/symptoms",
      headers: {
        token,
        permissionLevel,
        patientID
      }
    })
      .then(res => {
        this.items = res.data.data.symptomList.map(
          symptom => new Symptom(symptom)
        );
      })
      .catch(() => {
        this.snackbar = true;
      });
  }
};
</script>
<style lang="stylus" scoped>
.my-event {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  border-radius: 2px;
  background-color: #1867c0;
  color: black;
  width: 100%;
  font-size: 12px;
  font-weight: 500;
  padding: 3px;
  cursor: pointer;
  margin-bottom: 1px;
}
</style>

<style lang="scss" scoped>
.custom-date /deep/ .v-btn {
  color: black !important;
  margin: 0;
  padding: 0;
}
</style>
