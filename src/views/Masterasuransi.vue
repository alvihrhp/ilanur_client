<template>
  <div class="master-asuransi">
    <Toolbar></Toolbar>
    <Banner
      v-bind:bannerDetail="{
        background: 'asuransi.jpg',
        title: 'Master Asuransi'
    }"
    ></Banner>
    <div class="data-table-container">
      <v-alert
        type="success"
        class="success-create-alert"
        v-show="successCreateAlert"
        v-animate-css="'slideInDown'"
      >Create Asuransi Success</v-alert>
      <v-alert
        type="success"
        class="success-create-alert"
        v-show="successEditAlert"
        v-animate-css="'slideInDown'"
      >Edit Asuransi Success</v-alert>
      <v-alert
        type="success"
        class="success-create-alert"
        v-show="successDeleteAlert"
        v-animate-css="'slideInDown'"
      >Delete Asuransi Success</v-alert>
      <Formdialog
        v-bind:dialogDetail="{
        from: 'Asuransi',
        formInput,
        btnTitle: 'Create Asuransi',
        btnIcon: 'mdi-umbrella',
        createAction: 'createMasterAsuransi'
      }"
        v-on:createAsuransiSuccess="resetFormInput"
      >
        <v-col cols="6" sm="6" md="6">
          <v-text-field
            label="Nama Asuransi"
            v-model="formInput.masterAsuransiNama"
            :rules="validationRules.masterAsuransiNama"
            required
          ></v-text-field>
        </v-col>
        <v-col cols="6" sm="6" md="6">
          <v-text-field label="Alamat Asuransi" v-model="formInput.masterAsuransiAlamat"></v-text-field>
        </v-col>
        <v-col cols="6" sm="6" md="6">
          <v-text-field label="Telpon Asuransi" v-model="formInput.masterAsuransiTelpon"></v-text-field>
        </v-col>
        <v-col cols="6" sm="6" md="6">
          <v-text-field
            label="Harga Asuransi"
            v-model="formInput.masterAsuransiHarga"
            :rules="validationRules.masterAsuransiHarga"
            required
          ></v-text-field>
        </v-col>
      </Formdialog>
      <Datatable
        :key="key"
        v-bind:dataTableDetail="{
          from: 'Asuransi',
          data: masterAsuransi.data,
          header: masterAsuransi.header,
          length: masterAsuransi.length,
          cardTitle: 'Table Asuransi',
          editDetail: editForm,
          buttonEdit: true,
          buttonDelete: true,
          loadingData,
          itemKey: 'master_asuransi_ID',
          isExpanded: false,
          editAction: 'editMasterAsuransi',
          deleteAction: 'deleteMasterAsuransi',
      }"
        v-on:inputFormEdit="inputEditAsuransi"
        v-on:editAsuransiSuccess="successEdit"
        v-on:deleteAsuransiSuccess="successDelete"
        v-on:getData="getMasterAsuransi"
      >
        <v-col cols="6" sm="6" md="6">
          <v-text-field
            label="Nama Asuransi"
            v-model="editForm.masterAsuransiNama"
            :rules="validationRules.masterAsuransiNama"
            required
          ></v-text-field>
        </v-col>
        <v-col cols="6" sm="6" md="6">
          <v-text-field label="Alamat Asuransi" v-model="editForm.masterAsuransiAlamat"></v-text-field>
        </v-col>
        <v-col cols="6" sm="6" md="6">
          <v-text-field label="Telpon Asuransi" v-model="editForm.masterAsuransiTelpon"></v-text-field>
        </v-col>
        <v-col cols="6" sm="6" md="6">
          <v-text-field
            label="Harga Asuransi"
            v-model="editForm.masterAsuransiHarga"
            :rules="validationRules.masterAsuransiHarga"
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
  name: "Masterasuransi",
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
        masterAsuransiNama: [v => !!v || "Nama Asuransi is required"],
        masterAsuransiHarga: [v => !!v || "Harga Asuransi is required"]
      },
      formInput: {
        masterAsuransiNama: "",
        masterAsuransiAlamat: "",
        masterAsuransiTelpon: "( 021 ) ",
        masterAsuransiHarga: ""
      },
      successCreateAlert: false,
      editForm: {
        masterAsuransiNama: "",
        masterAsuransiAlamat: "",
        masterAsuransiTelpon: "",
        masterAsuransiHarga: "",
        originalID: ""
      },
      successEditAlert: false,
      successDeleteAlert: false,
      header: [
        {
          text: "Nama Asuransi",
          value: "master_asuransi_nama",
          align: "start"
        },
        { text: "Alamat Asuransi", value: "master_asuransi_alamat" },
        { text: "Telpon Asuransi", value: "master_asuransi_telpon" },
        { text: "Harga Asuransi", value: "master_asuransi_harga" }
      ]
    };
  },
  computed: {
    masterAsuransi() {
      let header = [];
      if (this.$store.state.masterAsuransi.length > 0) {
        return {
          data: this.$store.state.masterAsuransi,
          header: this.header,
          length: this.$store.state.totalMasterAsuransi
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
    getMasterAsuransi(params) {
      this.loadingData = true;
      const newParams = {
        page: params.page,
        itemsPerPage: params.itemsPerPage,
        sortBy: params.sortBy[0],
        sortDesc: params.sortDesc[0],
        search: params.search
      };
      this.$store
        .dispatch("getMasterAsuransi", newParams)
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
      this.formInput.masterAsuransiNama = "";
      this.formInput.masterAsuransiAlamat = "";
      this.formInput.masterAsuransiTelpon = "( 021 ) ";
      this.formInput.masterAsuransiHarga = "";
      this.successCreateAlert = true;
      setTimeout(() => {
        this.successCreateAlert = false;
      }, 3000);
    },
    inputEditAsuransi(asuransi) {
      this.editForm.masterAsuransiNama = asuransi.master_asuransi_nama;
      this.editForm.masterAsuransiAlamat = asuransi.master_asuransi_alamat;
      this.editForm.masterAsuransiTelpon = asuransi.master_asuransi_telpon;
      this.editForm.masterAsuransiHarga = asuransi.master_asuransi_harga;
      this.editForm.originalID = asuransi.master_asuransi_ID;
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
.master-asuransi {
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