<template>
  <div class="list-new-farmasi">
    <Toolbar></Toolbar>
    <Banner
      v-bind:bannerDetail="{
        title: 'List New Farmasi',
        background: 'listnewfarmasi.jpg',
      }"
    ></Banner>
    <div class="data-table-container">
      <Datatable
        v-bind:dataTableDetail="{
          from: 'ListFarmasiNew',
          data: farmasiNew.data,
          header: farmasiNew.header,
          length: farmasiNew.length,
          itemKey: 'farmasi_ID',
          loadingData,
          buttonEdit: true,
          buttonDelete: false,
          cardTitle: 'Table List Farmasi New',
        }"
        v-on:getData="getFarmasiNew"
      ></Datatable>
    </div>
  </div>
</template>

<script>
import Toolbar from "@/components/Toolbar";
import Banner from "@/components/Banner";
import Datatable from "@/components/Datatable";
export default {
  name: "Listnewfarmasi",
  components: {
    Toolbar,
    Banner,
    Datatable,
  },
  data() {
    return {
      key: false,
      loadingData: true,
      header: [
        { text: "Nama Obat", value: "obat_nama", align: "start" },
        { text: "Kode Obat", value: "obat_kode" },
        { text: "Stock", value: "farmasi_stock" },
        { text: "Satuan", value: "farmasi_satuan" },
        { text: "Batch Number", value: "farmasi_batch_number" },
      ],
    };
  },
  computed: {
    farmasiNew() {
      if (this.$store.state.farmasiNew.length > 0) {
        return {
          data: this.$store.state.farmasiNew,
          header: this.header,
          length: this.$store.state.totalFarmasiNew,
        };
      } else {
        return {
          data: [],
          header: this.header,
          length: 0,
        };
      }
    },
  },
  methods: {
    getFarmasiNew(params) {
      this.loadingData = true;
      const newParams = {
        page: params.page,
        itemsPerPage: params.itemsPerPage,
        sortBy: params.sortBy[0],
        sortDesc: params.sortDesc[0],
        search: params.search,
      };
      this.$store
        .dispatch("getFarmasiNew", newParams)
        .then((_) => {
          this.loadingData = false;
          this.key = true;
        })
        .catch((error) => {
          console.log({ error });
          const errorStatus = { error }.error.response.status;
          if (errorStatus === 401) {
            this.$store.commit("TOKEN_UPDATE");
            this.$router.replace("/login");
            localStorage.clear();
          }
        });
    },
  },
};
</script>

<style scoped>
.list-new-farmasi {
  background-color: #f5f5f5;
}

.data-table-container {
  padding: 50px;
}
</style>