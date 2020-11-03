<template>
  <div class="master-distributor">
    <Toolbar></Toolbar>
    <Banner
      v-bind:bannerDetail="{
        title: 'Master Distributor',
        background: 'distributor.jpg'
    }"
    ></Banner>
    <div class="data-table-container">
      <v-alert
        type="success"
        class="success-create-alert"
        v-show="successCreateAlert"
        v-animate-css="'slideInDown'"
      >Create Distributor Success</v-alert>
      <v-alert
        type="success"
        class="success-create-alert"
        v-show="successEditAlert"
        v-animate-css="'slideInDown'"
      >Edit Distributor Success</v-alert>
      <v-alert
        type="success"
        class="success-create-alert"
        v-show="successDeleteAlert"
        v-animate-css="'slideInDown'"
      >Delete Distributor Success</v-alert>
      <Formdialog
        v-bind:dialogDetail="{
        from: 'Distributor',
        formInput,
        btnTitle: 'Create Distributor',
        btnIcon: 'mdi-truck',
        createAction: 'createMasterDistributor'
      }"
        v-on:createDistributorSuccess="resetFormInput"
      >
        <v-col cols="6" sm="6" md="6">
          <v-text-field
            label="Nama Distributor"
            v-model="formInput.masterDistributorNama"
            :rules="validationRules.masterDistributorNama"
            required
          ></v-text-field>
        </v-col>
        <v-col cols="6" sm="6" md="6">
          <v-text-field
            label="Alamat Distributor"
            v-model="formInput.masterDistributorAlamat"
            :rules="validationRules.masterDistributorAlamat"
            required
          ></v-text-field>
        </v-col>
        <v-col cols="6" sm="6" md="6">
          <v-text-field
            label="Telpon Distributor"
            v-model="formInput.masterDistributorTelpon"
            :rules="validationRules.masterDistributorTelpon"
            required
          ></v-text-field>
        </v-col>
      </Formdialog>
      <Datatable
        :key="key"
        v-bind:dataTableDetail="{
          from: 'Distributor',
          cardTitle: 'Table Distributor',
          data: masterDistributor.data,
          header: masterDistributor.header,
          length: masterDistributor.length,
          editDetail: editForm,
          buttonEdit: true,
          buttonDelete: true,
          loadingData,
          itemKey: 'master_distributor_ID',
          isExpanded: true,
          buttonExpand: true,
          editAction: 'editMasterDistributor',
          deleteAction: 'deleteMasterDistributor',
          tableExpandFormInput: 'formInputDistributorObat',
          tableExpandEditForm: 'editFormDistributorObat',
          btnExpandTitle: 'Create Distributor Obat',
          tableExpandFor: 'masterDistributorObat',
          tableExpandHeader: 'headerDistributorObat',
          tableExpandCreate: 'createDistributorObat',
          tableExpandUpdate: 'editDistributorObat',
      }"
        v-on:inputFormEdit="inputEditDistributor"
        v-on:editDistributorSuccess="successEdit"
        v-on:deleteDistributorSuccess="successDelete"
        v-on:getData="getMasterDistributor"
      >
        <v-col cols="6" sm="6" md="6">
          <v-text-field
            label="Nama Distributor"
            v-model="editForm.masterDistributorNama"
            :rules="validationRules.masterDistributorNama"
            required
          ></v-text-field>
        </v-col>
        <v-col cols="6" sm="6" md="6">
          <v-text-field
            label="Alamat Distributor"
            v-model="editForm.masterDistributorAlamat"
            :rules="validationRules.masterDistributorAlamat"
            required
          ></v-text-field>
        </v-col>
        <v-col cols="6" sm="6" md="6">
          <v-text-field
            label="Telpon Distributor"
            v-model="editForm.masterDistributorTelpon"
            :rules="validationRules.masterDistributorTelpon"
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
  name: "Masterdistributor",
  components: {
    Banner,
    Datatable,
    Formdialog,
    Toolbar
  },
  created() {
    this.$store.dispatch("getMasterDistributor");
  },
  data() {
    return {
      loadingData: true,
      key: false,
      validationRules: {
        masterDistributorNama: [v => !!v || "Nama Distributor is required"],
        masterDistributorAlamat: [v => !!v || "Alamat Distributor is required"],
        masterDistributorTelpon: [v => !!v || "Telpon Distributor is required"]
      },
      formInput: {
        masterDistributorNama: "",
        masterDistributorAlamat: "",
        masterDistributorTelpon: "(021) "
      },
      successCreateAlert: false,
      editForm: {
        masterDistributorNama: "",
        masterDistributorAlamat: "",
        masterDistributorTelpon: "",
        originalID: ""
      },
      successEditAlert: false,
      successDeleteAlert: false,
      header: [
        {
          text: "Nama Distributor",
          value: "master_distributor_nama",
          align: "start"
        },
        { text: "Alamat Distributor", value: "master_distributor_alamat" },
        { text: "Telpon Distributor", value: "master_distributor_telpon" },
        { text: "Actions", value: "actions", sortable: false }
      ]
    };
  },
  computed: {
    masterDistributor() {
      if (this.$store.state.masterDistributor.length > 0) {
        return {
          data: this.$store.state.masterDistributor,
          header: this.header,
          length: this.$store.state.totalMasterDistributor
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
    getMasterDistributor(params) {
      this.loadingData = true;
      const newParams = {
        page: params.page,
        itemsPerPage: params.itemsPerPage,
        sortBy: params.sortBy[0],
        sortDesc: params.sortDesc[0],
        search: params.search
      };
      this.$store
        .dispatch("getMasterDistributor", newParams)
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
      this.formInput.masterDistributorNama = "";
      this.formInput.masterDistributorAlamat = "";
      this.formInput.masterDistributorTelpon = "(021) ";
      this.successCreateAlert = true;
      setTimeout(() => {
        this.successCreateAlert = false;
      }, 3000);
    },
    inputEditDistributor(distributor) {
      this.editForm.masterDistributorNama = distributor.master_distributor_nama;
      this.editForm.masterDistributorAlamat =
        distributor.master_distributor_alamat;
      this.editForm.masterDistributorTelpon =
        distributor.master_distributor_telpon;
      this.editForm.originalID = distributor.master_distributor_ID;
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
.master-distributor {
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