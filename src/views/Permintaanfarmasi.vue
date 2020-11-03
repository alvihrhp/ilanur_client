<template>
  <div class="permintaan-farmasi">
    <Toolbar></Toolbar>
    <Banner
      v-bind:bannerDetail="{
        title: 'Permintaan Farmasi',
        background: 'permintaanfarmasi.jpg',
      }"
    ></Banner>
    <div class="data-table-container">
      <v-alert
        type="success"
        class="success-create-alert"
        v-show="successEditAlert"
        v-animate-css="'slideInDown'"
        >Edit Permintaan Farmasi Success</v-alert
      >
      <Datatable
        :key="key"
        v-bind:dataTableDetail="{
          from: 'PermintaanFarmasi',
          data: permintaanFarmasi.data,
          header: permintaanFarmasi.header,
          length: permintaanFarmasi.length,
          loadingData,
          itemKey: 'farmasi_order_ID',
          buttonEdit: true,
          buttonDelete: false,
          cardTitle: 'Table Permintaan Farmasi',
          isExpanded: true,
          editDetail: editForm,
          editAction: 'editPermintaanFarmasi',
          tableExpandFor: 'permintaanObatFarmasi',
          tableExpandHeader: 'headerPermintaanObatFarmasi',
          tableExpandEditForm: 'editFormPermintaanObatFarmasi',
          tableExpandUpdate: 'editPermintaanObatFarmasi',
        }"
        v-on:getData="getPermintaanFarmasi"
        v-on:inputFormEdit="inputEditPermintaanFarmasi"
        v-on:editPermintaanFarmasiSuccess="showNotif"
      >
        <v-col cols="12" md="12">
          <v-select
            label="Order Status"
            v-model="editForm.farmasiOrderStatus"
            :items="selectStatus"
            :rules="validationRules.farmasiOrderStatus"
          ></v-select>
        </v-col>
      </Datatable>
    </div>
  </div>
</template>

<script>
import Toolbar from "@/components/Toolbar";
import Banner from "@/components/Banner";
import Datatable from "@/components/Datatable";
export default {
  name: "Permintaanfarmasi",
  components: {
    Toolbar,
    Banner,
    Datatable,
  },
  data() {
    return {
      loadingData: true,
      key: false,
      successEditAlert: false,
      header: [
        { text: "Order ID", value: "farmasi_order_ID", align: "start" },
        { text: "Order Date", value: "farmasi_order_date" },
        { text: "Order Petugas", value: "farmasi_order_petugas" },
        { text: "Order Status", value: "farmasi_order_status" },
        { text: "Actions", value: "actions", sortable: false },
        { text: "", value: "data-table-expand" },
      ],
      selectStatus: ["APPROVED", "PENDING"],
      editForm: {
        inputtedId: "",
        farmasiOrderStatus: "",
      },
      validationRules: {
        farmasiOrderStatus: [(v) => !!v || "Order Status cannot be empty"],
      },
    };
  },
  computed: {
    permintaanFarmasi() {
      if (this.$store.state.permintaanFarmasi.length > 0) {
        return {
          data: this.$store.state.permintaanFarmasi,
          header: this.header,
          length: this.$store.state.totalPermintaanFarmasi,
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
    getPermintaanFarmasi(params) {
      this.loadingData = true;
      const newParams = {
        page: params.page,
        itemsPerPage: params.itemsPerPage,
        sortBy: params.sortBy[0],
        sortDesc: params.sortDesc[0],
        search: params.search,
      };
      this.$store
        .dispatch("getPermintaanFarmasi", newParams)
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
    inputEditPermintaanFarmasi(item) {
      this.editForm.inputtedId = item.farmasi_order_ID;
      this.editForm.farmasiOrderStatus = item.farmasi_order_status;
    },
    showNotif() {
      this.successEditAlert = true;

      setTimeout(() => {
        this.successEditAlert = false;
      }, 3000);
    },
  },
};
</script>

<style scoped>
.permintaan-farmasi {
  background-color: #f5f5f5;
}

.data-table-container {
  padding: 50px;
}
</style>