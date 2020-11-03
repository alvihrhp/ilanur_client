<template>
  <div class="list-all-farmasi">
    <Toolbar></Toolbar>
    <Banner
      v-bind:bannerDetail="{
        title: 'List All Farmasi',
        background: 'listallfarmasi.jpg',
      }"
    ></Banner>
    <div class="data-table-container">
      <v-alert
        type="success"
        class="success-create-alert"
        v-show="successEditAlert"
        v-animate-css="'slideInDown'"
        >Edit List Farmasi All Success</v-alert
      >
      <Datatable
        :key="key"
        v-bind:dataTableDetail="{
          from: 'ListFarmasiAll',
          data: farmasiAll.data,
          header: farmasiAll.header,
          length: farmasiAll.length,
          itemKey: 'farmasi_ID',
          loadingData,
          buttonEdit: false,
          buttonDelete: false,
          cardTitle: 'Table List Farmasi All',
          editDetail: editForm,
          isExpanded: false,
          editAction: 'editFarmasiAll',
        }"
        v-on:getData="getFarmasiAll"
        v-on:inputFormEdit="inputEditFarmasiAll"
        v-on:editListFarmasiAllSuccess="editSuccess"
      >
        <v-col cols="12" md="12">
          <v-text-field
            label="Stock Farmasi"
            v-model="editForm.farmasiStock"
            :rules="validationRules.farmasiStock"
            required
          >
          </v-text-field>
        </v-col>
        <v-col cols="12" md="12">
          <v-text-field
            label="Batch Number Farmasi"
            v-model="editForm.farmasiBatchNumber"
            :rules="validationRules.farmasiBatchNumber"
            required
          >
          </v-text-field>
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
  name: "Listallfarmasi",
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
        { text: "Actions", value: "actions", sortable: false },
      ],
      editForm: {
        farmasiId: "",
        farmasiStock: 0,
        farmasiSatuan: "",
        farmasiBatchNumber: "",
      },
      validationRules: {
        farmasiStock: [(v) => !!v || "Stock cannot be empty"],
        farmasiBatchNumber: [(v) => !!v || "Batch Number cannot be empty"],
      },
      successEditAlert: false,
    };
  },
  computed: {
    farmasiAll() {
      if (this.$store.state.farmasiAll.length > 0) {
        return {
          data: this.$store.state.farmasiAll,
          header: this.header,
          length: this.$store.state.totalFarmasiAll,
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
    getFarmasiAll(params) {
      this.loadingData = true;
      const newParams = {
        page: params.page,
        itemsPerPage: params.itemsPerPage,
        sortBy: params.sortBy[0],
        sortDesc: params.sortDesc[0],
        search: params.search,
      };
      this.$store
        .dispatch("getFarmasiAll", newParams)
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
    inputEditFarmasiAll(item) {
      this.editForm.farmasiId = item.farmasi_ID;
      this.editForm.farmasiStock = item.farmasi_stock;
      this.editForm.farmasiSatuan = item.farmasi_satuan;
      this.editForm.farmasiBatchNumber = item.farmasi_batch_number;
    },
    editSuccess() {
      this.successEditAlert = true;
      setTimeout(() => {
        this.successEditAlert = false;
      }, 2000);
    },
  },
};
</script>

<style scoped>
.list-all-farmasi {
  background-color: #f5f5f5;
}

.data-table-container {
  padding: 50px;
}
</style>