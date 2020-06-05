<template>
  <div class="master-distributor">
    <Banner
      v-bind:bannerDetail="{
        title: 'Master Distributor',
        background: 'distributor.jpg'
    }"
    ></Banner>
    <div class="loading" v-if="masterDistributor.data.length === 0">
      <img src="../assets/loading.gif" />
    </div>
    <div class="data-table-container" v-else>
      <v-alert
        type="success"
        class="success-create-alert"
        v-show="successCreateAlert"
      >Create Distributor Success</v-alert>
      <v-alert
        type="success"
        class="success-create-alert"
        v-show="successEditAlert"
      >Edit Distributor Success</v-alert>
      <v-alert
        type="success"
        class="success-create-alert"
        v-show="successDeleteAlert"
      >Delete Distributor Success</v-alert>
      <Formdialog
        v-bind:dialogDetail="{
        formInput,
        btnTitle: 'Create Distributor',
        btnIcon: 'mdi-truck'
      }"
        v-on:createMasterDistributor="resetFormInput"
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
        v-bind:dataTableDetail="{
          cardTitle: 'Table Distributor',
          data: masterDistributor.data,
          header: masterDistributor.header,
          editDetail: editForm
      }"
        v-on:inputFormEdit="inputEditDistributor"
        v-on:editDistributorSuccess="successEdit"
        v-on:deleteDistributorSuccess="successDelete"
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
import Banner from "../components/Banner";
import Datatable from "../components/Datatable";
import Formdialog from "../components/Formdialog";
export default {
  name: "Masterdistributor",
  components: {
    Banner,
    Datatable,
    Formdialog
  },
  created() {
    this.$store.dispatch("getMasterDistributor");
  },
  data() {
    return {
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
      successDeleteAlert: false
    };
  },
  computed: {
    masterDistributor() {
      let header = [];
      if (this.$store.state.masterDistributor.length > 0) {
        this.$store.state.masterDistributor.forEach((distributor, index) => {
          Object.keys(distributor).forEach(key => {
            if (index === 0) {
              let objectHeader = {};
              if (key !== "master_distributor_ID") {
                const newKey = key.replace("_", " ").split("");
                newKey[0] = newKey[0].toUpperCase();
                newKey[7] = newKey[7].toUpperCase();
                newKey[18] = " ";
                newKey[19] = newKey[19].toUpperCase();
                const headerKey = newKey.join("");

                if (key === "master_distributor_nama") {
                  objectHeader["text"] = headerKey;
                  objectHeader["value"] = key;
                  objectHeader["align"] = "start";
                  header.push(objectHeader);
                } else if (key !== "master_distributor_nama") {
                  objectHeader["text"] = headerKey;
                  objectHeader["value"] = key;
                  header.push(objectHeader);
                }
              }
            }
          });
          if (index === 0) {
            header.push({ text: "Actions", value: "actions", sortable: false });
          }
        });
        return {
          data: this.$store.state.masterDistributor,
          header
        };
      } else {
        return {
          data: [],
          header
        };
      }
    }
  },
  methods: {
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