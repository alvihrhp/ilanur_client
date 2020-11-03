<template>
  <div class="master-perusahaan">
    <Toolbar></Toolbar>
    <Banner
      v-bind:bannerDetail="{
        background: 'perusahaan.jpg',
        title: 'Master Perusahaan'
    }"
    ></Banner>
    <div class="data-table-container">
      <v-alert
        type="success"
        class="success-create-alert"
        v-show="successCreateAlert"
        v-animate-css="'slideInDown'"
      >Create Perusahaan Success</v-alert>
      <v-alert
        type="success"
        class="success-create-alert"
        v-show="successEditAlert"
        v-animate-css="'slideInDown'"
      >Edit Perusahaan Success</v-alert>
      <v-alert
        type="success"
        class="success-create-alert"
        v-show="successDeleteAlert"
        v-animate-css="'slideInDown'"
      >Delete Perusahaan Success</v-alert>
      <Formdialog
        v-bind:dialogDetail="{
        from: 'Perusahaan',
        formInput,
        btnTitle: 'Create Perusahaan',
        btnIcon: 'mdi-home-modern',
        createAction: 'createMasterPerusahaan'
      }"
        v-on:createPerusahaanSuccess="resetFormInput"
      >
        <v-col cols="6" sm="6" md="6">
          <v-text-field
            label="Nama Perusahaan"
            v-model="formInput.masterPerusahaanNama"
            :rules="validatonRules.masterPerusahaanNama"
            required
          ></v-text-field>
        </v-col>
        <v-col cols="6" sm="6" md="6">
          <v-text-field label="Alamat Perusahaan" v-model="formInput.masterPerusahaanAlamat"></v-text-field>
        </v-col>
        <v-col cols="6" sm="6" md="6">
          <v-text-field label="Telepon Perusahaan" v-model="formInput.masterPerusahaanTelpon"></v-text-field>
        </v-col>
        <v-col cols="6" sm="6" md="6">
          <v-text-field
            label="Harga Perusahaan"
            v-model="formInput.masterPerusahaanHarga"
            :rules="validatonRules.masterPerusahaanHarga"
            required
          ></v-text-field>
        </v-col>
      </Formdialog>
      <Datatable
        :key="key"
        v-bind:dataTableDetail="{
        from: 'Perusahaan',
        data: masterPerusahaan.data,
        header: masterPerusahaan.header,
        length: masterPerusahaan.length,
        cardTitle: 'Table Perusahaan',
        editDetail: editForm,
        buttonEdit: true,
        buttonDelete: true,
        loadingData,
        itemKey: 'master_perusahaan_ID',
        isExpanded: false,
        editAction: 'editMasterPerusahaan',
        deleteAction: 'deleteMasterPerusahaan',
      }"
        v-on:inputFormEdit="inputEditPerusahaan"
        v-on:editPerusahaanSuccess="successEdit"
        v-on:deletePerusahaanSuccess="successDelete"
        v-on:getData="getMasterPerusahaan"
      >
        <v-col cols="6" sm="6" md="6">
          <v-text-field
            label="Nama Perusahaan"
            v-model="editForm.masterPerusahaanNama"
            :rules="validatonRules.masterPerusahaanNama"
            required
          ></v-text-field>
        </v-col>
        <v-col cols="6" sm="6" md="6">
          <v-text-field label="Alamat Perusahaan" v-model="editForm.masterPerusahaanAlamat"></v-text-field>
        </v-col>
        <v-col cols="6" sm="6" md="6">
          <v-text-field label="Telepon Perusahaan" v-model="editForm.masterPerusahaanTelpon"></v-text-field>
        </v-col>
        <v-col cols="6" sm="6" md="6">
          <v-text-field
            label="Harga Perusahaan"
            v-model="editForm.masterPerusahaanHarga"
            :rules="validatonRules.masterPerusahaanHarga"
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
  name: "Masterperusahaan",
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
      validatonRules: {
        masterPerusahaanNama: [v => !!v || "Nama Perusahaan is required"],
        masterPerusahaanHarga: [v => !!v || "Harga Perusahaan is required"]
      },
      formInput: {
        masterPerusahaanNama: "",
        masterPerusahaanAlamat: "",
        masterPerusahaanTelpon: "( 021 ) ",
        masterPerusahaanHarga: ""
      },
      successCreateAlert: false,
      editForm: {
        masterPerusahaanNama: "",
        masterPerusahaanAlamat: "",
        masterPerusahaanTelpon: "",
        masterPerusahaanHarga: "",
        originalID: ""
      },
      successEditAlert: false,
      successDeleteAlert: false,
      header: [
        {
          text: "Nama Perusahaan",
          value: "master_perusahaan_nama",
          align: "start"
        },
        { text: "Alamat Perusahaan", value: "master_perusahaan_alamat" },
        { text: "Telpon Perusahaan", value: "master_perusahaan_telpon" },
        { text: "Harga Perusahaan", value: "master_perusahaan_harga" },
        { text: "Actions", value: "actions", sortable: false }
      ]
    };
  },
  computed: {
    masterPerusahaan() {
      if (this.$store.state.masterPerusahaan.length > 0) {
        return {
          data: this.$store.state.masterPerusahaan,
          header: this.header,
          length: this.$store.state.totalMasterPerusahaan
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
    getMasterPerusahaan(params) {
      this.loadingData = true;
      const newParams = {
        page: params.page,
        itemsPerPage: params.itemsPerPage,
        sortBy: params.sortBy[0],
        sortDesc: params.sortDesc[0],
        search: params.search
      };
      this.$store
        .dispatch("getMasterPerusahaan", newParams)
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
      this.formInput.masterPerusahaanNama = "";
      this.formInput.masterPerusahaanAlamat = "";
      this.formInput.masterPerusahaanTelpon = "( 021 ) ";
      this.formInput.masterPerusahaanHarga = "";
      this.successCreateAlert = true;
      setTimeout(() => {
        this.successCreateAlert = false;
      }, 3000);
    },
    inputEditPerusahaan(perusahaan) {
      this.editForm.masterPerusahaanNama = perusahaan.master_perusahaan_nama;
      this.editForm.masterPerusahaanAlamat =
        perusahaan.master_perusahaan_alamat;
      this.editForm.masterPerusahaanTelpon =
        perusahaan.master_perusahaan_telpon;
      this.editForm.masterPerusahaanHarga = perusahaan.master_perusahaan_harga;
      this.editForm.originalID = perusahaan.master_perusahaan_ID;
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
.master-perusahaan {
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