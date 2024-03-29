<template>
  <div class="master-ronsen">
    <Toolbar></Toolbar>
    <Banner
      v-bind:bannerDetail="{
        background: 'ronsen.jpg',
        title: 'Master Ronsen'
    }"
    ></Banner>
    <div class="data-table-container">
      <v-alert
        type="success"
        class="success-create-alert"
        v-show="successCreateAlert"
        v-animate-css="'slideInDown'"
      >Create Ronsen Success</v-alert>
      <v-alert
        type="success"
        class="success-create-alert"
        v-show="successEditAlert"
        v-animate-css="'slideInDown'"
      >Edit Ronsen Success</v-alert>
      <v-alert
        type="success"
        class="success-create-alert"
        v-show="successDeleteAlert"
        v-animate-css="'slideInDown'"
      >Delete Ronsen Success</v-alert>
      <Formdialog
        v-bind:dialogDetail="{
        from: 'Ronsen',
        formInput,
        btnTitle:'Create Ronsen',
        btnIcon: 'mdi-skull-scan',
        createAction: 'createMasterRonsen'
      }"
        v-on:createRonsenSuccess="resetFormInput"
      >
        <v-col cols="6" sm="6" md="6">
          <v-text-field
            label="Kode Ronsen"
            v-model="formInput.ronsenKode"
            :rules="validationRules.ronsenKode"
            required
          ></v-text-field>
        </v-col>
        <v-col cols="6" sm="6" md=" 6">
          <v-text-field
            label="Nama Pemeriksaan"
            v-model="formInput.ronsenNamaPemeriksaan"
            :rules="validationRules.ronsenNamaPemeriksaan"
            required
          ></v-text-field>
        </v-col>
        <v-col cols="6" sm="6" md="6">
          <v-select
            label="Tipe Pembayaran"
            v-model="formInput.typeHarga"
            :rules="validationRules.typeHarga"
            :items="masterType"
            required
          ></v-select>
        </v-col>
        <v-col cols="6" sm="6" md="6">
          <v-text-field label="Harga Pemeriksaan" v-model="formInput.harga"></v-text-field>
        </v-col>
      </Formdialog>
      <Datatable
        :key="key"
        v-bind:dataTableDetail="{
        from: 'Ronsen',
        cardTitle: 'Table Ronsen',
        header: masterRonsen.header,
        data: masterRonsen.data,
        length: masterRonsen.length,
        editDetail: editForm,
        buttonEdit: true,
        buttonDelete: true,
        loadingData,
        itemKey: 'ronsen_kode',
        isExpanded: true,
        buttonExpand: true,
        editAction: 'editMasterRonsen',
        deleteAction: 'deleteMasterRonsen',
        tableExpandFormInput: 'formInputHargaRonsen',
        tableExpandEditForm: 'editFormHargaRonsen',
        btnExpandTitle: 'Create Price',
        tableExpandFor: 'hargaRonsen',
        tableExpandHeader: 'headerRonsen',
        tableExpandCreate: 'createHargaRonsen',
        tableExpandUpdate: 'editHargaRonsen',
      }"
        v-on:inputFormEdit="inputEditRonsen"
        v-on:editRonsenSuccess="successEdit"
        v-on:deleteRonsenSuccess="successDelete"
        v-on:getData="getMasterRonsen"
      >
        <v-col cols="12" md="12" sm="12">
          <v-text-field
            label="Nama Pemeriksaan"
            v-model="editForm.ronsenNamaPemeriksaan"
            :rules="validationRules.ronsenNamaPemeriksaan"
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
import Formdialog from "../components/Formdialog";
export default {
  name: "Masterronsen",
  components: {
    Banner,
    Datatable,
    Formdialog,
    Toolbar
  },
  data() {
    return {
      loadingData: true,
      key: false,
      validationRules: {
        ronsenKode: [v => !!v || "Ronsen Kode is required"],
        ronsenNamaPemeriksaan: [v => !!v || "Nama Pemeriksaan is required"],
        typeHarga: [v => !!v || "Tipe pembayaran is required"]
      },
      formInput: {
        ronsenKode: "",
        ronsenNamaPemeriksaan: "",
        typeHarga: null,
        harga: "0"
      },
      selectTypeHarga: ["UMUM", "BPJS", "ASURANSI/PERUSAHAAN"],
      successCreateAlert: false,
      editForm: {
        ronsenNamaPemeriksaan: "",
        originalID: ""
      },
      successEditAlert: false,
      successDeleteAlert: false,
      header: [
        { text: "Ronsen Kode", value: "ronsen_kode", align: "start" },
        { text: "Ronsen Nama Pemeriksaan", value: "ronsen_nama_pemeriksaan" },
        { text: "Actions", value: "actions", sortable: false },
        { text: "", value: "data-table-expand" }
      ]
    };
  },
  computed: {
    masterRonsen() {
      if (this.$store.state.masterRonsen.length > 0) {
        return {
          data: this.$store.state.masterRonsen,
          header: this.header,
          length: this.$store.state.totalMasterRonsen
        };
      } else {
        return {
          data: [],
          header: this.header,
          length: 0
        };
      }
    },
    masterType() {
      const type = this.$store.state.masterType
        .map(data => {
          if (data.status === "AKTIF") {
            return data.name;
          }
        })
        .filter(data => {
          return data !== undefined;
        });
      return type;
    }
  },
  methods: {
    getMasterRonsen(params) {
      this.loadingData = true;
      const newParams = {
        page: params.page,
        itemsPerPage: params.itemsPerPage,
        sortBy: params.sortBy[0],
        sortDesc: params.sortDesc[0],
        search: params.search
      };
      this.$store
        .dispatch("getMasterRonsen", newParams)
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
    resetFormInput() {
      this.formInput.ronsenKode = "";
      this.formInput.ronsenNamaPemeriksaan = "";
      this.formInput.typeHarga = null;
      this.formInput.harga = "0";
      this.successCreateAlert = true;
      setTimeout(() => {
        this.successCreateAlert = false;
      }, 3000);
    },
    inputEditRonsen(ronsen) {
      this.editForm.ronsenNamaPemeriksaan = ronsen.ronsen_nama_pemeriksaan;
      this.editForm.originalID = ronsen.ronsen_kode;
    },
    successEdit() {
      this.successEditAlert = true;
      setTimeout(() => {
        this.successEditAlert = false;
      }, 3000);
    },
    successDelete() {
      this.successDeleteAlert = true;
      setTimeout(() => {
        this.successDeleteAlert = false;
      }, 3000);
    }
  }
};
</script>

<style scoped>
.master-ronsen {
  background-color: #f5f5f5;
}

.loading {
  text-align: center;
  height: 100%;
  padding-top: 100px;
  background-color: #ffffff;
}

.data-table-container {
  padding: 50px;
}

.success-create-alert {
  font-weight: bold;
  font-size: 17.5px;
}
</style>