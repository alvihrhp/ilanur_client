<template>
  <div class="list-new-gudang">
    <Toolbar></Toolbar>
    <Banner
      v-bind:bannerDetail="{
        title: 'List New Gudang',
        background: 'listnewgudang.jpg'
    }"
    ></Banner>
    <div class="data-table-container">
      <v-alert
        type="success"
        class="success-create-alert"
        v-show="successEditAlert"
        v-animate-css="'slideInDown'"
      >Edit List New Gudang Success</v-alert>
      <Datatable
        :key="key"
        v-bind:dataTableDetail="{
            from: 'ListNewGudang',
            header: gudangNew.header, 
            data: gudangNew.data,
            length: gudangNew.length,
            loadingData,
            cardTitle: 'Table List New Gudang',
            itemKey: 'gudang_ID',
            buttonEdit: true,
            buttonDelete: false,
            editDetail: editForm,
            isExpanded: false,
            editAction: 'editListNewGudang'
        }"
        v-on:getData="getListNewGudang"
        v-on:inputFormEdit="inputEditListNewGudang"
        v-on:editListNewGudangSuccess="editSuccess"
      >
        <v-col cols="6" md="6" sm="6">
          <v-text-field
            label="Stock Gudang"
            v-model="editForm.gudangStock"
            :rules="validationRules.gudangStock"
            required
          ></v-text-field>
        </v-col>
        <v-col cols="6" md="6" sm="6">
          <v-select
            label="Satuan Obat"
            v-model="editForm.gudangSatuan"
            :rules="validationRules.gudangSatuan"
            :items="selectObatSatuan"
            required
          ></v-select>
        </v-col>
        <v-col cols="6" md="6" sm="6">
          <v-text-field
            label="Batch Number"
            v-model="editForm.gudangBatchNumber"
            :rules="validationRules.gudangBatchNumber"
            required
          ></v-text-field>
        </v-col>
      </Datatable>
    </div>
  </div>
</template>

<script>
import Toolbar from "../components/Toolbar";
import Banner from "../components/Banner";
import Datatable from "../components/Datatable";
export default {
  name: "Listnewgudang",
  components: {
    Toolbar,
    Banner,
    Datatable
  },
  data() {
    return {
      loadingData: true,
      key: false,
      successEditAlert: false,
      header: [
        { text: "Nama Obat", value: "obat_nama", align: "start" },
        { text: "Stock Gudang", value: "gudang_stock" },
        { text: "Satuan Obat", value: "gudang_satuan" },
        { text: "Batch Number", value: "gudang_batch_number" },
        { text: "Actions", value: "actions", sortable: false }
      ],
      editForm: {
        gudangId: "",
        gudangStock: 0,
        gudangSatuan: "",
        gudangBatchNumber: ""
      },
      validationRules: {
        gudangStock: [v => !!v || "Stock Gudang cannot be empty"],
        gudangSatuan: [v => !!v || "Satuan Obat cannot be empty"],
        gudangBatchNumber: [v => !!v || "Batch Number cannot be empty"]
      },
      selectObatSatuan: [
        "BOX",
        "FLES",
        "SOFT BAG",
        "TUBE",
        "VIAL",
        "TABLE",
        "AMPUL",
        "POT"
      ]
    };
  },
  computed: {
    gudangNew() {
      if (this.$store.state.listNewGudang.length > 0) {
        return {
          data: this.$store.state.listNewGudang,
          header: this.header,
          length: this.$store.state.totalListNewGudang
        };
      } else {
        return {
          data: [],
          header: this.header,
          length: 0
        };
      }
    }
  },
  methods: {
    getListNewGudang(params) {
      this.loadingData = true;
      const newParams = {
        page: params.page,
        itemsPerPage: params.itemsPerPage,
        sortBy: params.sortBy[0],
        sortDesc: params.sortDesc[0],
        search: params.search
      };
      this.$store
        .dispatch("getListNewGudang", newParams)
        .then(() => {
          this.loadingData = false;
          this.key = true;
        })
        .catch(error => {
          const errorStatus = { error }.error.response.status;
          if (errorStatus === 401) {
            this.$store.commit("TOKEN_UPDATE");
            this.$router.replace("/login");
            localStorage.clear();
          }
        });
    },
    inputEditListNewGudang(data) {
      this.editForm.gudangId = data.gudang_ID;
      this.editForm.gudangStock = data.gudang_stock;
      this.editForm.gudangSatuan = data.gudang_satuan;
      this.editForm.gudangBatchNumber = data.gudang_batch_number;
    },
    editSuccess() {
      this.successEditAlert = true;

      setTimeout(() => {
        this.successEditAlert = false;
      }, 3500);
    }
  }
};
</script>

<style scoped>
.list-new-gudang {
  background-color: #f5f5f5;
}

.data-table-container {
  padding: 50px;
}
</style>