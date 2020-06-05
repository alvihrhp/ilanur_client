<template>
  <v-navigation-drawer app color="#ee9632">
    <v-list>
      <v-list-item color="#ee9632" to="/dashboard">
        <v-list-item-icon>
          <v-icon color="white">mdi-home</v-icon>
        </v-list-item-icon>
        <v-list-item-title>Dashboard</v-list-item-title>
      </v-list-item>
      <v-list-group value="true" no-action>
        <template v-slot:activator>
          <v-list-item-icon>
            <v-icon color="white">mdi-database</v-icon>
          </v-list-item-icon>
          <v-list-item-title>Master Data</v-list-item-title>
        </template>
        <v-list-item to="/masterdoctor">
          <v-list-item-content>
            <v-list-item-title>Master Doctor</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item to="/mastertindakan">
          <v-list-item-content>
            <v-list-item-title>Master Tindakan</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item to="/masterlab">
          <v-list-item-content>
            <v-list-item-title>Master Lab</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item to="/masterronsen">
          <v-list-item-content>
            <v-list-item-title>Master Ronsen</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item to="/masterobat">
          <v-list-item-content>
            <v-list-item-title>Master Obat</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item to="/masterperusahaan">
          <v-list-item-content>
            <v-list-item-title>Master Perusahaan</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item to="/masterasuransi">
          <v-list-item-content>
            <v-list-item-title>Master Asuransi</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item to="/masterdistributor">
          <v-list-item-content>
            <v-list-item-title>Master Distributor</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item to="/masteruser">
          <v-list-item-content>
            <v-list-item-title>Master User</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list-group>
    </v-list>
  </v-navigation-drawer>
</template>

<script>
export default {
  name: "Sidebar"
};
</script>

<style scoped>
.v-list-item__title {
  color: white;
  font-weight: bold;
}
</style>