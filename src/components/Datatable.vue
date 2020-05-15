<template>
  <v-card>
    <v-card-title>
      {{title}}
      <v-spacer></v-spacer>
      <v-text-field
        v-model="search"
        append-icon="mdi-magnify"
        label="search"
        single-line
        hide-details
      ></v-text-field>
    </v-card-title>
    <v-data-table
      :headers="headers"
      :items="data"
      :items-per-page="10"
      :search="search"
      class="elevation-1"
    ></v-data-table>
  </v-card>
</template>

<script>
export default {
  name: "Datatable",
  props: ["dataTableDetail"],
  data() {
    return {
      data: this.dataTableDetail.data,
      headers: this.dataTableDetail.header,
      search: "",
      title: this.dataTableDetail.cardTitle
    };
  }
};
</script>

