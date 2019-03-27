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
        text: "Date Started",
        value: "dateStarted"
      },
      {
        sortable: false,
        text: "Prescription Details",
        value: "prescDetails"
      }
    ],
    items: [
      {
        name: "Paracetamol",
        dateStarted: "01-01-2019",
        details: "Nulla qui cupidatat voluptate laborum dolore pariatur nostrud non minim aliqua nulla duis."
      },
      {
        name: "Medicine 0",
        dateStarted: "01-01-2019",
        details: "Exercitation laboris deserunt cillum labore exercitation mollit."
      },
      {
        name: "Medicine 1",
        dateStarted: "01-01-2019",
        details: "In irure ut ut officia sit ullamco."
      },
      {
        name: "Medicine 2",
        dateStarted: "01-01-2019",
        details: "Aliquip dolore velit eiusmod aliqua eiusmod dolore mollit nostrud amet non veniam enim esse elit."
      },
      {
        name: "Medicine 3",
        dateStarted: "01-01-2019",
        details: "Ad ex aliquip exercitation ut."
      },
      {
        name: "Medicine 4",
        dateStarted: "01-01-2019",
        details: "Ullamco minim deserunt magna cupidatat sit."
      }
    ]
  })
};
</script>
