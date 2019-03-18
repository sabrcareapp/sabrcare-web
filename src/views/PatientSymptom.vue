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
                      v-html="event.symptom"
                    ></div>
                  </template>
                  <v-card color="grey lighten-4" min-width="350px" flat>
                    <v-toolbar color="primary" dark>
                      <v-btn icon>
                        <v-icon>mdi-bug</v-icon>
                      </v-btn>
                      <v-toolbar-title v-html="'Severity'"></v-toolbar-title>
                      <v-spacer></v-spacer>
                    </v-toolbar>
                    <v-card-title primary-title>
                      <span v-html="event.intensity"></span>
                    </v-card-title>
                    <v-card-actions>
                      <v-btn flat color="secondary">Cancel</v-btn>
                    </v-card-actions>
                  </v-card>
                </v-menu>
              </template>
            </template>
          </v-calendar>
        </v-sheet>
      </v-flex>

      <v-flex xs12 sm4 class="text-sm-left text-xs-center">
        <v-btn color="secondary" @click="$refs.calendar.prev()">
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
          <v-date-picker class="custom-date" v-model="date" scrollable>
            <v-spacer></v-spacer>
            <v-btn flat color="primary" @click="modal = false">Cancel</v-btn>
            <v-btn flat color="primary" @click="$refs.dialog.save(date)">OK</v-btn>
          </v-date-picker>
        </v-dialog>
      </v-flex>
      <v-flex xs12 sm4 class="text-sm-right text-xs-center">
        <v-btn color="secondary" @click="$refs.calendar.next()">Next
          <v-icon right dark>mdi-chevron-right</v-icon>
        </v-btn>
      </v-flex>

      <!-- Symptom table -->
      <v-flex md12>
        <material-card color="green" title="Symptoms of Patient " text>
          <v-data-table :headers="headers" :items="items" hide-actions>
            <template slot="headerCell" slot-scope="{ header }">
              <span
                class="subheading font-weight-light text-success text--darken-3"
                v-text="header.text"
              />
            </template>
            <template slot="items" slot-scope="{ item }">
              <td>{{ item.symptom }}</td>
              <td>{{ item.date }}</td>
              <!-- <td>{{ item.intensity }}</td> -->
              <td>
                <v-progress-linear
                  :color="getIntensityColor(item.intensity)"
                  height="4"
                  :value="`${+(item.intensity)*20}`"
                ></v-progress-linear>
              </td>
            </template>
          </v-data-table>
        </material-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
export default {
  data: () => ({
    date: new Date().toISOString().substr(0, 10),
    modal: false,
    type: "month",
    symptomIntensityColorMap: {
      "0": "#4CAF50", //green
      "1": "#FFFF00", //yellow accent-2
      "2": "#FFC107", //amber
      "3": "#F57C00", //orange darken-2
      "4": "#F44336", //red
      "5": "#B71C1C", //red darken-4
      default: "#9E9E9E" //grey
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
    items: [
      {
        symptom: "Symptom 1",
        date: "2019-03-15",
        intensity: "0",
        open: false
      },
      {
        symptom: "Symptom 2",
        date: "2019-03-14",
        intensity: "1",
        open: false
      },
      {
        symptom: "Symptom 5",
        date: "2019-03-14",
        intensity: "2",
        open: false
      },
      {
        symptom: "Symptom 3",
        date: "2019-03-01",
        intensity: "2",
        open: false
      },
      {
        symptom: "Symptom 2",
        date: "2019-03-01",
        intensity: "5",
        open: false
      },
      {
        symptom: "Symptom 4",
        date: "2019-02-18",
        intensity: "3",
        open: false
      },
      {
        symptom: "Symptom 5",
        date: "2019-02-16",
        intensity: "4",
        open: false
      },
      {
        symptom: "Symptom 6",
        date: "2019-02-01",
        intensity: "5",
        open: false
      }
    ]
  }),
  computed: {
    // convert the list of events into a map of lists keyed by date
    eventsMap() {
      const map = {};
      this.items.forEach(e => (map[e.date] = map[e.date] || []).push(e));
      return map;
    }
  },
  methods: {
    getIntensityColor(intensity) {
      switch (intensity) {
        case "0":
          return "green";
        case "1":
          return "yellow accent-2";
        case "2":
          return "amber";
        case "3":
          return "orange darken-2";
        case "4":
          return "red";
        case "5":
          return "red darken-4";
        default:
          return "grey";
      }
    },
    open(event) {
      alert(event.title);
    }
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
