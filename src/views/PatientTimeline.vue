<template>
  <v-container fill-height fluid grid-list-xl>
    <v-layout justify-center wrap>
      <v-flex>
        <v-card>
          <v-timeline align-top>
            <v-timeline-item
              v-for="(item, i) in items"
              :key="i"
              :color="item.color"
              :icon="item.icon"
              fill-dot
            >
              <template v-slot:opposite>
                <span
                  :class="`headline font-weight-bold ${item.color.split(' ')[0]}--text`"
                >{{item.dateFormatted}}</span>
              </template>
              <v-flex>
                <v-card hover :color="item.color" dark>
                  <v-card-title
                    class="headline wrap-overflow"
                    :class="{'title':$vuetify.breakpoint.smAndUp,'subheading':$vuetify.breakpoint.xsOnly}"
                  >{{item.title}}</v-card-title>
                  <v-card-text
                    class="grey lighten-4 text--primary wrap-overflow"
                    :class="{'title':$vuetify.breakpoint.smAndUp,'subheading':$vuetify.breakpoint.xsOnly}"
                  >{{item.desc}}</v-card-text>
                </v-card>
              </v-flex>
            </v-timeline-item>
          </v-timeline>
        </v-card>
      </v-flex>
      <v-snackbar top right v-model="snackbar" :color="snackbarColor" :timeout="6000">
        {{ snackbarText }}
        <v-btn dark flat @click="snackbar = false">Close</v-btn>
      </v-snackbar>
    </v-layout>
  </v-container>
</template>

<script>
class TimelineObject {
  constructor(obj) {
    switch (obj.timelineType) {
      case "Medicine":
        this.constructMedicineObj(obj);
        break;
      case "Symptom":
        this.constructSymptomObj(obj);
        break;
      case "Record":
        this.constructRecordObj(obj);
        break;
    }
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

  constructMedicineObj({ medicineName, medicineTimeHealthExpert, date }) {
    this.type = "medicine";
    this.color = "lime darken-4";
    this.icon = "mdi-pill";
    this.dateFormatted = date
      ? this.formattedDateAndTime(date.$date)
      : "Not available";
    this.title = "Medicine added";
    this.desc =
      medicineName && medicineTimeHealthExpert
        ? `${medicineName} : ${medicineTimeHealthExpert}`
        : "Not available";
  }
  constructSymptomObj({ symptomName, symptomSeverity, date }) {
    this.type = "symptom";
    this.color = "deep-orange darken-4";
    this.icon = "mdi-bug";
    this.dateFormatted = date
      ? this.formattedDateAndTime(date.$date)
      : "Not available";
    this.title = "Symptom added";
    this.desc =
      symptomName && symptomSeverity
        ? `${symptomName} : ${symptomSeverity}`
        : "Not available";
  }
  constructRecordObj({ recordsFolder, recordsName, date }) {
    this.type = "record";
    this.color = "indigo";
    this.icon = "mdi-book-open-page-variant";
    this.dateFormatted = date
      ? this.formattedDateAndTime(date.$date)
      : "Not available";
    this.title = "Medicine added";
    this.desc =
      recordsFolder && recordsName
        ? `${recordsName} added under ${recordsFolder}`
        : "Not available";
  }
}
export default {
  data: () => ({
    snackbar: false,
    snackbarColor: "error",
    snackbarText: "Failed to retrieve data",
    items: []
  }),
  mounted() {
    const token = this.$store.getters.authToken;
    const permissionLevel = this.$store.getters.authLevel;
    const patientID = this.$route.params.id;

    this.$http({
      method: "get",
      url: "http://api.remedley.com/api/admin/patient/timeline",
      headers: {
        token,
        permissionLevel,
        patientID
      }
    })
      .then(res => {
        this.items = res.data.data.map(
          timelineObj => new TimelineObject(timelineObj)
        );
      })
      .catch(() => {
        this.snackbar = true;
      });
  }
};
</script>

<style scoped>
.wrap-overflow {
  white-space: normal;
  word-wrap: break-word !important;
}
</style>
