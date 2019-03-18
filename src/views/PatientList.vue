<template>
  <v-container fill-height fluid grid-list-xl>
    <v-layout wrap>
      <v-flex xs12 sm12 lg12>
        <material-card>
          <v-toolbar color="teal" dark>
            <!-- <v-toolbar-side-icon></v-toolbar-side-icon> -->
            <v-toolbar-title class="text-xs-center hidden-sm-and-down">Patients</v-toolbar-title>

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
            <v-subheader v-if="numCritical>0&&!search" class="red--text title">Critical&nbsp;
              <v-icon color="red">mdi-alert-circle</v-icon>
            </v-subheader>

            <template v-for="(patient,index) in filteredList">
              <v-subheader
                :key="index"
                v-if="index==numCritical&&!search"
                class="green--text title"
              >Normal</v-subheader>
              <v-list-tile :key="index" avatar @click="goToPatientStats(patient.id)">
                <v-list-tile-avatar>
                  <img :src="patient.avatar">
                </v-list-tile-avatar>

                <v-list-tile-content>
                  <v-list-tile-title v-html="patient.name"></v-list-tile-title>
                  <v-list-tile-sub-title v-html="patient.email"></v-list-tile-sub-title>
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
      <v-flex sm6 xs12 md6 lg3>
        <material-stats-card
          color="green"
          icon="mdi-google-play"
          title="App Downloads"
          value="5"
          sub-icon="mdi-calendar"
          sub-text="Last 24 Hours"
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
        <material-modal :dialogOn="dialogs.healthExperts" isFullscreen></material-modal>
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
        <material-modal :dialogOn="dialogs.issuesRemaining"></material-modal>
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
        <material-modal :dialogOn="dialogs.patients"></material-modal>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
class Patient {
  constructor(id, name, email, avatar, isCritical) {
    this.id = id;
    this.name = name;
    this.email = email || null;
    this.avatar =
      avatar ||
      `https://cdn.vuetifyjs.com/images/lists/${Math.floor(
        Math.random() * 5 + 1
      )}.jpg`;
    this.isCritical = isCritical || false;
  }
}

export default {
  data() {
    return {
      search: "",
      timeSinceUpdate: 0,
      timeSinceUpdateListener: null,
      patientList: [],
      numCritical: 0,
      stats: {
        healthExperts: "...",
        githubIssuesCount: "...",
        patientCount: "..."
      },
      dialogs: {
        healthExperts: false,
        issuesRemaining: false,
        patients: false
      }
    };
  },
  methods: {
    click1() {
      alert("Test");
      return 1;
    },
    click2() {
      alert("Test");
    },
    showNotCriticalSubheading() {},
    goToPatientStats(patientId) {
      this.$router.push({
        name: "Patient Stats",
        params: { id: patientId.$oid }
      });
    }
  },
  computed: {
    filteredList() {
      return this.patientList.filter(patient => {
        //search anywhere
        // return (
        //   patient.name.toLowerCase().includes(this.search.toLowerCase()) ||
        //   patient.email.toLowerCase().includes(this.search.toLowerCase())
        // );
        //search from left to right
        return (
          patient.name.toLowerCase().indexOf(this.search.toLowerCase()) === 0 ||
          patient.email.toLowerCase().indexOf(this.search.toLowerCase()) === 0
        );
      });
    }
  },
  mounted() {
    //this.$http has been globally assigned as axios
    const timeNow = Date.now();
    this.timeSinceUpdate = 0;
    this.timeSinceUpdateListener = setInterval(() => {
      this.timeSinceUpdate = Math.round((Date.now() - timeNow) / 60000);
    }, 60000);
    this.$http
      .get("http://127.0.0.1:27016/api/web/patientname/list")
      .then(({ data }) => {
        const patientData = [];
        data.data.map(({ _id, emailID, name, isCritical }) =>
          patientData.push(
            new Patient(_id, name, emailID, null, Math.random() < 0.5)
          )
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
      })
      .catch(err => console.log(err));

    this.$http
      .get("http://localhost:27016/api/admin/healthexpertcount")
      .then(({ data }) => {
        this.stats.healthExperts = `${data.data}`;
      })
      .catch(err => console.log(err));

    this.$http
      .get("https://api.github.com/orgs/sabrcareapp/repos")
      .then(({ data }) => {
        // this.stats
        let count = 0;
        data.map(repo => (count += repo.open_issues));
        this.stats.githubIssuesCount = `${count}`;
      })
      .catch(err => console.log(err));

    this.$http
      .get("http://localhost:27016/api/admin/patientcount")
      .then(({ data }) => {
        this.stats.patientCount = `${data.data}`;
      })
      .catch(err => console.log(err));
  },
  beforeDestroy() {
    clearInterval(this.timeSinceUpdateListener);
  }
};
</script>

