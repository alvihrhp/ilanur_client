<template>
  <div class="master-lab">
    <Banner
      v-bind:bannerDetail="{
        title: 'Master Lab',
        background: 'lab.jpg'
    }"
    ></Banner>
    <div class="loading" v-if="masterLab.data.length === 0">
      <img src="../assets/loading.gif" />
    </div>
    <div class="data-table-container" v-else>
      <v-alert
        type="success"
        class="success-create-alert"
        v-show="successCreateAlert"
        v-animate-css="'slideInDown'"
      >Create Lab Success</v-alert>
      <v-alert
        type="success"
        class="success-create-alert"
        v-show="successEditAlert"
        v-animate-css="'slideInDown'"
      >Edit Lab Success</v-alert>
      <v-alert
        type="success"
        class="success-create-alert"
        v-show="successDeleteAlert"
        v-animate-css="'slideInDown'"
      >Delete Lab Success</v-alert>
      <Formdialog
        v-bind:dialogDetail="{
        formInput,
        btnIcon: 'mdi-eyedropper-variant',
        btnTitle: 'Create Lab'
      }"
        v-on:createLabSuccess="resetFormInput"
      >
        <v-col cols="6" sm="6" md="6">
          <v-text-field
            label="Kode Lab"
            v-model="formInput.labKode"
            :rules="validationRules.labKode"
            required
          ></v-text-field>
        </v-col>
        <v-col cols="6" sm="6" md="6">
          <v-text-field
            label="Nama Pemeriksaan"
            v-model="formInput.labNamaPemeriksaan"
            :rules="validationRules.labNamaPemeriksaan"
            required
          ></v-text-field>
        </v-col>
        <v-col cols="6" sm="6" md="6">
          <v-select
            label="Tipe Pembayaran"
            v-model="formInput.typeHarga"
            :rules="validationRules.typeHarga"
            :items="selectTypeHarga"
            required
          ></v-select>
        </v-col>
        <v-col cols="6" sm="6" md="6">
          <v-text-field label="Harga Pemeriksaan" v-model="formInput.hargaLab" required></v-text-field>
        </v-col>
      </Formdialog>
      <Datatable
        v-bind:dataTableDetail="{
          data: masterLab.data,
          header: masterLab.header,
          cardTitle: 'Table Lab',
          editDetail: editForm
      }"
        v-on:inputFormEdit="inputEditLab"
        v-on:editLabSuccess="successEdit"
        v-on:deleteLabSuccess="successDelete"
      >
        <v-col cols="12" md="12" sm="12">
          <v-text-field
            label="Nama Pemeriksaan"
            v-model="editForm.labNamaPemeriksaan"
            :rules="validationRules.labNamaPemeriksaan"
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
  name: "Masterlab",
  components: {
    Banner,
    Datatable,
    Formdialog
  },
  created() {
    this.$store.dispatch("getMasterLab");
  },
  data() {
    return {
      formInput: {
        labKode: "",
        labNamaPemeriksaan: "",
        typeHarga: null,
        hargaLab: "0"
      },
      validationRules: {
        labKode: [v => !!v || "Lab Kode is required"],
        labNamaPemeriksaan: [v => !!v || "Lab Nama Pemeriksaan is required"],
        typeHarga: [v => !!v || "Tipe Pembayaran is required"]
      },
      selectTypeHarga: ["UMUM", "BPJS", "ASURANSI/PERUSAHAAN"],
      successCreateAlert: false,
      editForm: {
        labNamaPemeriksaan: "",
        originalID: ""
      },
      successEditAlert: false,
      successDeleteAlert: false
    };
  },
  computed: {
    masterLab() {
      let header = [];
      if (this.$store.state.masterLab.length > 0) {
        header = [
          { text: "Lab Kode", value: "lab_kode", align: "start" },
          { text: "Lab Nama Pemeriksaan", value: "lab_nama_pemeriksaan" },
          { text: "Actions", value: "actions", sortable: false },
          { text: "", value: "data-table-expand" }
        ];
        return {
          data: this.$store.state.masterLab,
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
      this.formInput.labKode = "";
      this.formInput.labNamaPemeriksaan = "";
      this.formInput.typeHarga = null;
      this.formInput.hargaLab = 0;
      this.successCreateAlert = true;
      setTimeout(() => {
        this.successCreateAlert = false;
      }, 3000);
    },
    inputEditLab(tindakan) {
      this.editForm.labNamaPemeriksaan = tindakan.lab_nama_pemeriksaan;
      this.editForm.originalID = tindakan.lab_kode;
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
.master-lab {
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

