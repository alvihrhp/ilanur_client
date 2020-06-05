<template>
  <div class="master-asuransi">
    <Banner
      v-bind:bannerDetail="{
        background: 'asuransi.jpg',
        title: 'Master Asuransi'
    }"
    ></Banner>
    <div class="loading" v-if="masterAsuransi.data.length === 0">
      <img src="../assets/loading.gif" />
    </div>
    <div class="data-table-container" v-else>
      <v-alert
        type="success"
        class="success-create-alert"
        v-show="successCreateAlert"
      >Create Asuransi Success</v-alert>
      <v-alert
        type="success"
        class="success-create-alert"
        v-show="successEditAlert"
      >Edit Asuransi Success</v-alert>
      <v-alert
        type="success"
        class="success-create-alert"
        v-show="successDeleteAlert"
      >Delete Asuransi Success</v-alert>
      <Formdialog
        v-bind:dialogDetail="{
        formInput,
        btnTitle: 'Create Asuransi',
        btnIcon: 'mdi-umbrella'
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
        v-bind:dataTableDetail="{
          data: masterAsuransi.data,
          header: masterAsuransi.header,
          cardTitle: 'Table Asuransi',
          editDetail: editForm
      }"
        v-on:inputFormEdit="inputEditAsuransi"
        v-on:editAsuransiSuccess="successEdit"
        v-on:deleteAsuransiSuccess="successDelete"
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
import Banner from "../components/Banner";
import Datatable from "../components/Datatable";
import Formdialog from "../components/Formdialog";
export default {
  name: "Masterasuransi",
  components: {
    Banner,
    Datatable,
    Formdialog
  },
  created() {
    this.$store.dispatch("getMasterAsuransi");
  },
  data() {
    return {
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
      successDeleteAlert: false
    };
  },
  computed: {
    masterAsuransi() {
      let header = [];
      if (this.$store.state.masterAsuransi.length > 0) {
        this.$store.state.masterAsuransi.forEach((asuransi, index) => {
          Object.keys(asuransi).forEach(key => {
            if (index === 0) {
              let objectHeader = {};
              if (
                key === "master_asuransi_nama" ||
                key === "master_asuransi_alamat" ||
                key === "master_asuransi_telpon" ||
                key === "master_asuransi_harga"
              ) {
                const newKey = key
                  .slice(7)
                  .replace("_", " ")
                  .split("");
                newKey[0] = newKey[0].toUpperCase();
                newKey[9] = newKey[9].toUpperCase();
                const headerKey = newKey.join("");
                if (key === "master_asuransi_nama") {
                  objectHeader["text"] = headerKey;
                  objectHeader["value"] = key;
                  objectHeader["align"] = "start";
                  header.push(objectHeader);
                } else if (key !== "master_asuransi_nama") {
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
          data: this.$store.state.masterAsuransi,
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