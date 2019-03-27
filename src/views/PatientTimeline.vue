<template>
  <v-container fill-height fluid grid-list-xl>
    <v-layout v-resize="onResize" justify-center wrap>
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
                >{{item.dateOfEvent + " " + item.timeOfEvent}}</span>
              </template>
              <v-flex>
                <v-card hover :color="item.color" dark>
                  <v-card-title class="headline">{{item.title}}</v-card-title>
                  <v-card-text
                    class="grey lighten-4 text--primary"
                    :class="{'title':$vuetify.breakpoint.smAndUp,'subheading':$vuetify.breakpoint.xsOnly}"
                  >{{item.desc}}</v-card-text>
                </v-card>
              </v-flex>
            </v-timeline-item>
          </v-timeline>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
export default {
  data: () => ({
    items: [
      {
        color: "lime darken-4",
        icon: "mdi-pill",
        dateOfEvent: "01-01-2019",
        timeOfEvent: "12:00 PM",
        type: "medicine",
        title: "Medicine added",
        desc: "Paracetamol 600mg advised for morning/night"
      },
      {
        color: "indigo",
        icon: "mdi-book-open-page-variant",
        dateOfEvent: "02-07-2018",
        timeOfEvent: "12:00 PM",
        type: "record",
        title: "Record added",
        desc: "Biopsy file added"
      },
      {
        color: "deep-orange darken-4",
        icon: "mdi-bug",
        dateOfEvent: "02-05-2018",
        timeOfEvent: "12:00 PM",
        type: "symptom",
        title: "Symptom added",
        desc: "Anxiety : severe"
      },
      {
        color: "deep-orange darken-4",
        icon: "mdi-bug",
        dateOfEvent: "02-05-2018",
        timeOfEvent: "12:00 PM",
        type: "symptom",
        title: "Symptom added",
        desc: "Nausea : moderate"
      },
      {
        color: "indigo",
        icon: "mdi-book-open-page-variant",
        dateOfEvent: "02-07-2018",
        timeOfEvent: "12:00 PM",
        type: "record",
        title: "Record added",
        desc: "X-ray file added"
      }
    ]
  })
};
</script>