<template>
  <v-container fill-height fluid grid-list-xl>
    <v-layout wrap>
      <v-flex xs12 sm12 lg12>
        <material-card>
          <v-toolbar color="#0a2471" dark>
            <!-- <v-toolbar-side-icon></v-toolbar-side-icon> -->
            <v-toolbar-title class="text-xs-center hidden-xs-only">Patients</v-toolbar-title>

            <v-spacer></v-spacer>
            <!-- <v-text-field
            class="mr-4 mt-2 purple-input"
            label="Search..."
            hide-details
            color="purple"
            />-->
            <v-flex xs12 sm6 md3>
              <v-text-field
                placeholder="Search"
                clearable
                v-model="search"
                prepend-icon="mdi-account-search"
              ></v-text-field>
            </v-flex>
            <!-- <v-btn icon>
            <v-icon>mdi-account-search</v-icon>
            </v-btn>-->
          </v-toolbar>

          <v-list subheader>
            <!-- <v-subheader>Sorted by Name</v-subheader> -->
            <v-subheader v-if="numCritical>0&&!search" class="red--text title">
              Critical&nbsp;
              <v-icon color="red">mdi-alert-circle</v-icon>
            </v-subheader>

            <!--  -->
            <template v-for="(patient,index) in filteredList">
              <v-subheader
                :key="'critical'+index"
                v-if="index==numCritical&&!search"
                class="green--text title"
              >Normal</v-subheader>
              <v-list-tile :key="index" avatar @click="goToPatientStats(patient.id)">
                <v-list-tile-avatar color="teal">
                  <img v-if="patient.avatar" :src="patient.avatar">
                  <span
                    v-else
                    class="white--text headline"
                  >{{patient.name.slice(0,1).toUpperCase()}}</span>
                </v-list-tile-avatar>

                <v-list-tile-content>
                  <v-list-tile-title v-text="patient.name"></v-list-tile-title>
                  <v-list-tile-sub-title v-text="patient.email"></v-list-tile-sub-title>
                </v-list-tile-content>

                <v-list-tile-action>
                  <v-icon
                    :color="patient.isCritical ? 'red' : 'green'"
                  >{{patient.isCritical ? 'mdi-alert':'mdi-checkbox-marked-circle'}}</v-icon>
                </v-list-tile-action>
              </v-list-tile>
            </template>
            <!-- <v-divider></v-divider> -->
          </v-list>
        </material-card>
      </v-flex>
      <template v-if="isAdmin">
        <v-flex sm6 xs12 md6 lg3>
          <material-stats-card
            color="green"
            icon="mdi-google-play"
            title="App Downloads"
            :value="stats.appDownloads"
            sub-icon="mdi-update"
            :sub-text="`Updated ${timeSinceUpdate < 1 ? 'less than a minute':timeSinceUpdate+' mins'} ago`"
          />
        </v-flex>
        <v-flex sm6 xs12 md6 lg3>
          <material-stats-card
            color="orange"
            icon="mdi-stethoscope"
            title="Health Experts"
            :value="stats.healthExperts"
            small-value
            sub-icon="mdi-update"
            sub-icon-color
            :sub-text="`Updated ${timeSinceUpdate < 1 ? 'less than a minute':timeSinceUpdate+' mins'} ago`"
            sub-text-color
            @click.stop="dialogs.healthExperts = !dialogs.healthExperts"
          />
          <material-modal
            :dialogOn="dialogs.healthExperts"
            isFullscreen
            color="#0a2471"
            :dataInput="healthExpertList"
            @modal-action-toggled="updateStateOfHealthExpertApproval"
            @modal-item-deleted="deleteHealthExpertEntry"
          >
            <template #toolbarTitle>Health Experts</template>
            <template #listContent></template>
            <!-- <template #actions>
              <v-btn flat :style="{color: '#0a2471 !important'}" @click="dialog=false">Ok</v-btn>
            </template>-->
          </material-modal>
        </v-flex>
        <v-flex sm6 xs12 md6 lg3>
          <material-stats-card
            color="red"
            icon="mdi-information-outline"
            title="Issues Remaining"
            :value="stats.githubIssuesCount"
            sub-icon="mdi-tag"
            sub-text="Tracked from Github"
            @click.stop="dialogs.issuesRemaining = !dialogs.issuesRemaining"
          />
          <material-modal :dialogOn="dialogs.issuesRemaining" color="#0a2471">
            <template #toolbarTitle>Page Redirection</template>
            <template #simpleContent>
              <span class="subheading">You are about to be redirected to an extenal page :</span>
              <br>
              <span class="subheading">
                Link:
                <a :href="githubRepoLink" target="_blank">{{githubRepoLink}}</a>
              </span>
            </template>
            <template #actions>
              <a class="subheading" :href="githubRepoLink">Continue</a>
            </template>
          </material-modal>
        </v-flex>
        <v-flex sm6 xs12 md6 lg3>
          <material-stats-card
            color="info"
            icon="mdi-account-multiple"
            title="Patients"
            :value="stats.patientCount"
            sub-icon="mdi-update"
            :sub-text="`Updated ${timeSinceUpdate < 1 ? 'less than a minute':timeSinceUpdate+' mins'} ago`"
            @click.stop="dialogs.patients = !dialogs.patients"
          />
          <!-- <material-modal :dialogOn="dialogs.patients"></material-modal> -->
        </v-flex>
        <v-snackbar top right v-model="snackbar" :color="snackbarColor" :timeout="6000">
          {{ snackbarText }}
          <v-btn dark flat @click="snackbar = false">Close</v-btn>
        </v-snackbar>
      </template>
    </v-layout>
  </v-container>
</template>

<script>
class Patient {
  constructor(id, name, email, avatar, isCritical) {
    this.id = id;
    this.name = name || "<No name provided>";
    this.email = email || null;
    this.avatar = avatar || null;
    this.isCritical = isCritical || false;
  }
}

/**
 * The HealthExpert Obj fields are named according to the generic item names of the modal component
 */

class HealthExpertFormatted {
  constructor({ _id, name, emailID, emailVerified, licenseNumber }) {
    this.id = _id.$oid;
    this.action = emailVerified;
    this.title = name;
    this.headline = emailID;
    this.subtitle = licenseNumber;
  }
}

export default {
  data() {
    return {
      isAdmin: false,
      snackbar: false,
      snackbarColor: "error",
      snackbarText: "Failed to retrieve data",
      search: "",
      timeSinceUpdate: 0,
      timeSinceUpdateListener: null,
      patientList: [],
      healthExpertList: {
        items: [],
        actionText: ["Approved", "Pending"]
      },
      items: [],
      numCritical: 0,
      stats: {
        appDownloads: "...",
        healthExperts: "...",
        githubIssuesCount: "...",
        patientCount: "..."
      },
      dialogs: {
        healthExperts: false,
        issuesRemaining: false,
        patients: false
      },
      githubRepoLink: "https://github.com/sabrcareapp/"
    };
  },
  methods: {
    goToPatientStats(patientId) {
      this.$router.push({
        name: "Patient Stats",
        params: { id: patientId.$oid }
      });
    },
    updateStateOfHealthExpertApproval({
      action: isApproved,
      id: healthExpert
    }) {
      if (isApproved) return;
      const token = this.$store.getters.authToken;
      const permissionLevel = this.$store.getters.authLevel;
      this.$http({
        method: "post",
        url: "http://api.remedley.com/api/admin/healthexpert/authorize",
        headers: {
          token,
          permissionLevel,
          healthExpert
        }
      })
        .then(() => {
          this.snackbarText = "Health Expert Approved Successfully";
          this.snackbarColor = "green";
          this.snackbar = true;
          this.healthExpertList.items.find(
            expert => expert.id === healthExpert
          ).action = true;
          setTimeout(() => {
            this.snackbarText = "Failed to retrieve data";
            this.snackbarColor = "red";
          }, 7000);
        })
        .catch(() => {
          this.snackbarText =
            "Failed to approve expert...Try again after reloading the page";
          this.snackbar = true;
          setTimeout(() => {
            this.snackbarText = "Failed to retrieve data";
          }, 7000);
        });
    },
    deleteHealthExpertEntry({ action: isApproved, id }) {
      //TODO: Update request to update health expert status/remove him ??
    },
    setTimeSinceUpdateListeners() {
      const timeNow = Date.now();
      this.timeSinceUpdate = 0;
      this.timeSinceUpdateListener = setInterval(() => {
        this.timeSinceUpdate = Math.round((Date.now() - timeNow) / 60000);
      }, 60000);
    }
  },
  computed: {
    filteredList() {
      return this.patientList.filter(patient => {
        return (
          patient.name.toLowerCase().indexOf(this.search.toLowerCase()) === 0 ||
          patient.email.toLowerCase().indexOf(this.search.toLowerCase()) === 0
        );
      });
    }
  },
  mounted() {
    this.isAdmin = this.$store.getters.authLevel === "2";
    this.setTimeSinceUpdateListeners();

    const token = this.$store.getters.authToken;
    const permissionLevel = this.$store.getters.authLevel;
    if (!token || !permissionLevel) {
      this.$router.go();
    }

    this.$http({
      method: "get",
      url: "http://api.remedley.com/api/admin/patientname/list",
      headers: {
        token,
        permissionLevel
      }
    })
      .then(({ data }) => {
        const patientData = [];
        data.data.map(({ _id, name, emailID, avatar, isCritical }) =>
          patientData.push(new Patient(_id, name, emailID, avatar, isCritical))
        );
        this.numCritical = 0;
        patientData.map(({ isCritical }) => {
          if (isCritical) this.numCritical++;
        });
        patientData.sort((a, b) => {
          if (a.isCritical && !b.isCritical) return -1;
          if (a.isCritical && b.isCritical) return 0;
          if (!a.isCritical && b.isCritical) return 1;
          return 0;
        });
        this.patientList = patientData;
        this.stats.patientCount = patientData.length + "";
      })
      .catch(() => {
        if (!this.snackbar) this.snackbar = true;
      });

    if (this.$store.getters.authLevel !== "2") return;

    //Meant only for admins

    //Get total number of health experts
    this.$http({
      method: "get",
      url: "http://api.remedley.com/api/admin/healthexpert/count",
      headers: {
        token,
        permissionLevel
      }
    })
      .then(({ data }) => {
        this.stats.healthExperts = `${data.data}`;
      })
      .catch(() => {
        if (!this.snackbar) this.snackbar = true;
      });

    //Get total number of code issues
    this.$http
      .get("https://api.github.com/orgs/sabrcareapp/repos")
      .then(({ data }) => {
        let count = 0;
        data.map(repo => (count += repo.open_issues));
        this.stats.githubIssuesCount = `${count}`;
      })
      .catch(() => {
        if (!this.snackbar) this.snackbar = true;
      });

    // Get health expert list
    this.$http({
      method: "get",
      url: "http://api.remedley.com/api/admin/healthexpert/list",
      headers: {
        token,
        permissionLevel
      }
    })
      .then(res => {
        /* NOTE: assigning the result of map to this.healthExpertList.items will NOT work
        because of change in array reference*/
        this.healthExpertList.items.push(
          ...res.data.data.map(expert => new HealthExpertFormatted(expert))
        );
      })
      .catch(() => {
        if (!this.snackbar) this.snackbar = true;
      });
  },
  beforeDestroy() {
    clearInterval(this.timeSinceUpdateListener);
  }
};
</script>

