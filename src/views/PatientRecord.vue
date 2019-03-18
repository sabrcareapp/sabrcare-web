<template>
  <v-container fill-height fluid grid-list-xl>
    <v-layout justify-center wrap>
      <v-flex xs12 md12>
        <material-card color="green" title="Records of Patient " text>
          <v-data-table :headers="headers" :items="items" hide-actions>
            <template slot="headerCell" slot-scope="{ header }">
              <span
                class="subheading font-weight-light text-success text--darken-3"
                v-text="header.text"
              />
            </template>
            <template slot="items" slot-scope="{ item }">
              <td>{{ item.name }}</td>
              <td>{{ item.type }}</td>
              <td>{{ item.dateUploaded }}</td>
              <td>{{ item.fileType }}</td>
              <td>
                <a
                  :href="item.link"
                  target="_blank"
                  rel="noopener noreferrer"
                  @click.stop="openFile($event,item.link,item.fileType)"
                >Click to open</a>
              </td>
            </template>
          </v-data-table>
        </material-card>
      </v-flex>

      <v-flex xs12 md12>
        <v-dialog
          v-model="dialog"
          @keydown.esc="dialog = false"
          transition="dialog-bottom-transition"
          :fullscreen="dialogData.type === 'pdf'"
        >
          <!-- Handling an image -->
          <template v-if="dialogData.type== 'img'">
            <v-layout>
              <v-flex xs12 sm6 offset-sm3>
                <!-- <v-card> -->
                <v-img
                  class="white--text"
                  :class="{'text-xs-right':dialogCloseHover}"
                  :src="dialogData.link"
                >
                  <v-container fill-height fluid>
                    <v-layout fill-height>
                      <v-flex xs12 align-end flexbox>
                        <v-btn
                          @mouseleave="dialogCloseHover = dialog? !dialogCloseHover:true"
                          icon
                          round
                          color="black"
                          @click="dialog=false"
                        >
                          <v-icon>mdi-close</v-icon>
                        </v-btn>
                      </v-flex>
                    </v-layout>
                  </v-container>
                </v-img>
                <!-- </v-card> -->
              </v-flex>
            </v-layout>
          </template>

          <!-- Handling a pdf -->
          <template v-if="dialogData.type== 'pdf'">
            <v-container fill-height fluid grid-list-xl>
              <v-layout fill-height justify-center @click="dialog=false">
                <iframe
                  id="hideFromPrint"
                  allowfullscreen
                  width="80%"
                  height="100%"
                  type="application/pdf"
                  src="https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf#toolbar=0&statusbar=0&navpanes=0"
                ></iframe>
                <!-- http://docs.google.com/gview?url=http://example.com/mypdf.pdf&embedded=true -->
                <!-- https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf#toolbar=0&statusbar=0&navpanes=0 -->
              </v-layout>
            </v-container>
          </template>
        </v-dialog>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
export default {
  data: () => ({
    headers: [
      {
        sortable: false,
        text: "Name",
        value: "name"
      },
      {
        sortable: false,
        text: "Type",
        value: "type"
      },
      {
        sortable: false,
        text: "Date uploaded",
        value: "dateUploaded"
      },
      {
        sortable: false,
        text: "File Type",
        value: "fileType"
      },
      {
        sortable: false,
        text: "Link",
        value: "link"
      }
    ],
    items: [
      {
        name: "Record 1",
        type: "Surgery",
        dateUploaded: "01-01-2019",
        fileType: "img",
        link:
          "http://www.jpathinformatics.org/articles/2015/6/1/images/JPatholInform_2015_6_1_62_170649_f2.jpg"
      },
      {
        name: "Record 2",
        type: "Surgery",
        dateUploaded: "01-01-2019",
        fileType: "pdf",
        link:
          "https://firebasestorage.googleapis.com/v0/b/dummy-82f4f.appspot.com/o/BraveNewWorld.pdf?alt=media&token=4eeb3773-58fd-4ea0-85ed-db3f719b2a87"
      },
      {
        name: "Record 3",
        type: "Surgery",
        dateUploaded: "01-01-2019",
        fileType: "img",
        link: "https://cdn.vuetifyjs.com/images/cards/docks.jpg"
      },
      {
        name: "Record 4",
        type: "Surgery",
        dateUploaded: "01-01-2019",
        fileType: "img",
        link: "https://cdn.vuetifyjs.com/images/cards/docks.jpg"
      },
      {
        name: "Record 5",
        type: "Surgery",
        dateUploaded: "01-01-2019",
        fileType: "img",
        link: "https://cdn.vuetifyjs.com/images/cards/docks.jpg"
      },
      {
        name: "Record 6",
        type: "Surgery",
        dateUploaded: "01-01-2019",
        fileType: "other",
        link: "https://cdn.vuetifyjs.com/images/cards/docks.jpg"
      }
    ],
    dialog: false,
    dialogData: {
      type: "img",
      link: ""
    },
    dialogCloseHover: true
  }),
  methods: {
    openFile(event, link, type) {
      if (type === "img" || type === "pdf") {
        event.preventDefault();
        this.dialogData.type = type;
        this.dialogData.link = link;
        this.dialog = true;
      }
    }
  },
  watch: {
    dialog(val) {
      if (!val) this.dialogCloseHover = true;
    }
  }
};
</script>

<style scoped>
@media print {
  #hideFromPrint {
    display: none !important;
  }
}
</style>

