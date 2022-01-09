<template>
  <v-navigation-drawer 
  app 
  color="#ee9632"
  v-model="drawer"
  absolute
  temporary>
  {{handleMobileNav}}
    <v-list>
      <v-list-item color="#ee9632" to="/dashboard">
        <v-list-item-icon>
          <v-icon color="white">mdi-home</v-icon>
        </v-list-item-icon>
        <v-list-item-title>Dashboard</v-list-item-title>
      </v-list-item>
      <v-list-group :value="masterData" no-action>
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
        <v-list-item to="/masterkamar">
          <v-list-item-content>
            <v-list-item-title>Master Kamar</v-list-item-title>
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
        <v-list-item to="/mastertype">
          <v-list-item-content>
            <v-list-item-title>Master Type</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item to="/masterlantai">
          <v-list-item-content>
            <v-list-item-title>Master Lantai</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item to="/masterdistributorobat">
          <v-list-item-content>
            <v-list-item-title>Master Dis Obat</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item to="/mastertypeobat">
          <v-list-item-content>
            <v-list-item-title>Master Type Obat</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list-group>
      <v-list-group :value="gudang" no-action>
        <template v-slot:activator>
          <v-list-item-icon>
            <v-icon color="white">mdi-garage</v-icon>
          </v-list-item-icon>
          <v-list-item-title>Gudang</v-list-item-title>
        </template>
        <v-list-item to="/listallgudang">
          <v-list-item-content>
            <v-list-item-title>List All Gudang</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item to="/listnewgudang">
          <v-list-item-content>
            <v-list-item-title>List New Gudang</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item to="/pembeliangudang">
          <v-list-item-content>
            <v-list-item-title>Pembelian Gudang</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item to="/permintaanfarmasi">
          <v-list-item-content>
            <v-list-item-title>Permintaan Farmasi</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list-group>
      <v-list-group :value="farmasi" no-action>
        <template v-slot:activator>
          <v-list-item-icon>
            <v-icon color="white">mdi-hospital-box</v-icon>
          </v-list-item-icon>
          <v-list-item-title>Farmasi</v-list-item-title>
        </template>
        <v-list-item to="/listallfarmasi">
          <v-list-item-content>
            <v-list-item-title>List All Farmasi</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item to="/listnewfarmasi">
          <v-list-item-content>
            <v-list-item-title>List New Farmasi</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item to="/farmasiorder">
          <v-list-item-content>
            <v-list-item-title>Farmasi Order</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list-group>
    </v-list>
  </v-navigation-drawer>
</template>

<script>
export default {
  name: "Sidebar",
  data() {
    return {
      masterData: false,
      gudang: false,
      farmasi: false,
      drawer: false,
      group: null
    };
  },
  computed: {
    handleMobileNav() {
      if(this.$store.state.mobileNav === true || this.$store.state.mobileNav === false) {
        this.drawer = true;
      }
    }
  }
};
</script>

<style scoped>
::-webkit-scrollbar {
  display: none;
}

.v-list-item__title {
  color: white;
  font-weight: bold;
  display: block;
}
</style>