<template>
  <div class="gudang-rr">
    <Toolbar></Toolbar>
    <Banner
      v-bind:bannerDetail="{
        background: 'gudangrr.jpg',
        title: 'Gudang Refrence Receiver',
      }"
    ></Banner>
    <div class="data-table-container">
      <Datatable
        :key="key"
        v-bind:dataTableDetail="{
          from: 'Gudangrr',
          data: gudangPo.data,
          header: gudangPo.header,
          length: gudangPo.length,
          itemKey: 'gudang_po_ID',
          loadingData,
          buttonEdit: false,
          buttonDelete: false,
          cardTitle: 'Table List Gudang RR',
          isExpanded: true,
          editAction: 'editListGudangRr',
          tableExpandFor: 'gudangRr',
          tableExpandHeader: 'headerGudangRr',
          tableExpandUpdate: 'editGudangRr',
          tableExpandEditForm: 'editFormGudangRr',
        }"
        v-on:getData="getListGudangPo"
      ></Datatable>
    </div>
  </div>
</template>

<script>
import Toolbar from "../components/Toolbar";
import Banner from "../components/Banner";
import Formdialog from "../components/Formdialog";
import Datatable from "../components/Datatable";
export default {
  name: "Gudangrr",
  components: {
    Toolbar,
    Banner,
    Formdialog,
    Datatable,
  },
  data() {
    return {
      loadingData: true,
      key: false,
      header: [
        { text: "Kode PO", value: "gudang_po_ID", align: "start" },
        { text: "Nama Distributor", value: "master_distributor_nama" },
        { text: "Date", value: "gudang_po_date" },
        { text: "Petugas", value: "gudang_po_petugas" },
        { text: "Status", value: "gudang_po_status" },
        { text: "", value: "data-table-expand" },
      ],
    };
  },
  computed: {
    gudangPo() {
      if (this.$store.state.pembelianGudang.length > 0) {
        return {
          header: this.header,
          data: this.$store.state.pembelianGudang,
          length: this.$store.state.totalPembelianGudang,
        };
      } else {
        return {
          header: this.header,
          data: [],
          length: 0,
        };
      }
    },
  },
  methods: {
    getListGudangPo(params) {
      this.loadingData = true;
      const newParams = {
        page: params.page,
        itemsPerPage: params.itemsPerPage,
        sortBy: params.sortBy[0],
        sortDesc: params.sortDesc[0],
        search: params.search,
      };
      this.$store
        .dispatch("getPembelianGudang", newParams)
        .then((_) => {
          this.loadingData = false;
          this.key = true;
        })
        .catch((error) => {
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
.gudang-rr {
  background-color: #f5f5f5;
}

.data-table-container {
  padding: 50px;
}
</style>