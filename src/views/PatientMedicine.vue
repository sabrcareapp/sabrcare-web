<template>
  <v-container fill-height fluid grid-list-xl>
    <v-layout justify-center wrap>
      <v-flex md12>
        <material-card color="green" title="Medicines Allotted to the Patient " text>
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
              <td>
                <v-icon
                  :color="item.morning ? 'green':'red'"
                >{{item.morning ? 'mdi-check':'mdi-minus'}}</v-icon>
              </td>
              <td>
                <v-icon :color="item.noon ? 'green':'red'">{{item.noon ? 'mdi-check':'mdi-minus'}}</v-icon>
              </td>
              <td>
                <v-icon
                  :color="item.evening ? 'green':'red'"
                >{{item.evening ? 'mdi-check':'mdi-minus'}}</v-icon>
              </td>
              <td>
                <v-icon :color="item.night ? 'green':'red'">{{item.night ? 'mdi-check':'mdi-minus'}}</v-icon>
              </td>
              <!-- <td>{{ item.morning+"" }}</td> -->
            </template>
          </v-data-table>
        </material-card>
      </v-flex>
      <!-- <v-flex md12>
        <material-card
          color="green"
          flat
          full-width
          title="Table on Plain Background"
          text="Here is a subtitle for this table"
        >
          <v-data-table :headers="headers" :items="items.slice(0, 7)" hide-actions>
            <template slot="headerCell" slot-scope="{ header }">
              <span class="subheading font-weight-light text--darken-3" v-text="header.text"/>
            </template>
            <template slot="items" slot-scope="{ item }">
              <td>{{ item.name }}</td>
              <td>{{ item.country }}</td>
              <td>{{ item.city }}</td>
              <td class="text-xs-right">{{ item.salary }}</td>
            </template>
          </v-data-table>
        </material-card>
      </v-flex>-->
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
        text: "Date Started",
        value: "dateStarted"
      },
      {
        sortable: false,
        text: "Morning",
        value: "morning"
      },
      {
        sortable: false,
        text: "Noon",
        value: "noon"
      },
      {
        sortable: false,
        text: "Evening",
        value: "evening"
      },
      {
        sortable: false,
        text: "Night",
        value: "night"
      }
    ],
    items: [
      {
        name: "Paracetamol",
        dateStarted: "01-01-2019",
        morning: true,
        noon: true,
        evening: false,
        night: true
      },
      {
        name: "Medicine 0",
        dateStarted: "01-01-2019",
        morning: false,
        noon: false,
        evening: false,
        night: true
      },
      {
        name: "Medicine 1",
        dateStarted: "01-01-2019",
        morning: true,
        noon: true,
        evening: true,
        night: true
      },
      {
        name: "Medicine 2",
        dateStarted: "01-01-2019",
        morning: true,
        noon: true,
        evening: true,
        night: true
      },
      {
        name: "Medicine 3",
        dateStarted: "01-01-2019",
        morning: true,
        noon: false,
        evening: false,
        night: true
      },
      {
        name: "Medicine 4",
        dateStarted: "01-01-2019",
        morning: true,
        noon: false,
        evening: false,
        night: true
      }
    ]
  })
};
</script>
