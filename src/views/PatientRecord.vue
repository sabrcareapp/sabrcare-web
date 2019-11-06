<template>
  <v-container fill-height fluid grid-list-xl>
    <v-layout justify-center wrap>
      <v-flex xs12 md12>
        <material-card color="#0a2471" title="Records of Patient " text>
          <v-data-table :headers="headers" :items="items" hide-actions>
            <template slot="headerCell" slot-scope="{ header }">
              <span
                class="subheading font-weight-light text-success text--darken-3"
                v-text="header.text"
              />
            </template>
            <template slot="items" slot-scope="{ item }">
              <td>{{ item.name }}</td>
              <td>{{ item.folderName }}</td>
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
          :fullscreen="dialogData.type.toLowerCase() === 'pdf'"
        >
          <!-- Handling an image -->
          <template v-if="dialogData.type === 'img' || dialogData.type === 'Image'">
            <v-layout>
              <v-flex xs12 sm6 offset-sm3>
                <!-- <v-card> -->
                <v-img
                  class="white--text"
                  :class="{'text-xs-right':dialogCloseHover}"
                  :src="dialogData.link"
                  @error.self="imageFailedToLoad"
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
          <template v-if="dialogData.type.toLowerCase() === 'pdf'">
            <v-container fill-height fluid grid-list-xl>
              <v-layout fill-height justify-center @click="dialog=false">
                <iframe
                  id="hideFromPrint"
                  allowfullscreen
                  width="80%"
                  height="100%"
                  type="application/pdf"
                  :src="dialogData.link"
                ></iframe>
              </v-layout>
            </v-container>
          </template>
        </v-dialog>
        <v-snackbar top right v-model="snackbar" :color="snackbarColor" :timeout="6000">
          {{ snackbarText }}
          <v-btn dark flat @click="snackbar = false">Close</v-btn>
        </v-snackbar>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
class Record {
  constructor({
    recordsName,
    recordsFolder,
    recordsFileType,
    recordsURL,
    date
  }) {
    const errorMsg = "Not available";
    this.name = recordsName || errorMsg;
    this.folderName = recordsFolder || errorMsg;
    this.dateUploaded = this.formattedDateAndTime(date.$date) || errorMsg;
    this.fileType = recordsFileType || errorMsg;
    this.link = recordsURL || errorMsg;
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
        text: "Folder",
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
    items: [],
    dialog: false,
    dialogData: {
      type: "img",
      link: ""
    },
    dialogCloseHover: true
  }),
  methods: {
    openFile(event, link, type) {
      if (
        type === "img" ||
        type === "Image" ||
        type === "pdf" ||
        type === "PDF"
      ) {
        event.preventDefault();
        this.dialogData.type = type;
        this.dialogData.link = link;
        this.dialog = true;
      }
    },
    imageFailedToLoad(event) {
      this.dialog = false;
      this.snackbarText = "Broken link";
      this.snackbar = true;
      this.snackbarText = "Failed to retrieve data";
    }
  },
  watch: {
    dialog(val) {
      if (!val) this.dialogCloseHover = true;
    }
  },
  mounted() {
    const token = this.$store.getters.authToken;
    const permissionLevel = this.$store.getters.authLevel;
    const patientID = this.$route.params.id;

    this.$http({
      method: "get",
      url: "http://api.remedley.com/api/admin/patient/records",
      headers: {
        token,
        permissionLevel,
        patientID
      }
    })
      .then(res => {
        this.items = res.data.data.map(record => new Record(record));
      })
      .catch(() => {
        this.snackbar = true;
      });
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

