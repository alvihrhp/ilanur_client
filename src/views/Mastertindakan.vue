<template>
  <div class="master-tindakan">
    <Banner
      v-bind:bannerDetail="{
        title: 'Master Tindakan',
        background: 'tindakan.jpg'
    }"
    ></Banner>
    <div class="loading" v-if="masterTindakan.data.length === 0">
      <img src="../assets/loading.gif" />
    </div>
    <div class="data-table-container" v-else>
      <v-alert
        type="success"
        class="success-create-alert"
        v-show="successCreateAlert"
        v-animate-css="'slideInDown'"
      >Create Tindakan Success</v-alert>
      <v-alert
        type="success"
        class="success-create-alert"
        v-show="successEditAlert"
        v-animate-css="'slideInDown'"
      >Edit Tindakan Success</v-alert>
      <v-alert
        type="success"
        class="success-create-alert"
        v-show="successDeleteAlert"
        v-animate-css="'slideInDown'"
      >Delete Tindakan Success</v-alert>
      <Formdialog
        v-bind:dialogDetail="{
        formInput,
        btnIcon: 'mdi-thermometer',
        btnTitle: 'Create Tindakan'
      }"
        v-on:createTindakanSuccess="resetFormInput"
      >
        <v-col cols="6" md="6" lg="6">
          <v-text-field
            label="Kode Tindakan"
            v-model="formInput.tindakanKode"
            :rules="validationForm.tindakanKode"
            required
          ></v-text-field>
        </v-col>
        <v-col cols="6" md="6" lg="6">
          <v-text-field
            label="Nama Tindakan"
            v-model="formInput.tindakanNama"
            :rules="validationForm.tindakanNama"
            required
          ></v-text-field>
        </v-col>
        <v-col cols="6" md="6" lg="6">
          <v-select
            label="Tipe Pembayaran"
            v-model="formInput.typeHarga"
            :rules="validationForm.typeHarga"
            :items="selectFormTypeHarga"
            required
          ></v-select>
        </v-col>
        <v-col cols="6" md="6" lg="6">
          <v-text-field label="Harga Tindakan" v-model="formInput.tindakanHarga" required></v-text-field>
        </v-col>
        <v-col cols="6" md="6" lg="6">
          <v-text-field label="Harga Sewa Alat" v-model="formInput.tindakanSewaAlat"></v-text-field>
        </v-col>
        <v-col cols="6" md="6" lg="6">
          <v-text-field label="Harga Sewa Ruangan" v-model="formInput.tindakanSewaRuangan"></v-text-field>
        </v-col>
        <v-col cols="6" md="6" lg="6">
          <v-text-field label="Harga Jasa Operator" v-model="formInput.tindakanJasaOperator"></v-text-field>
        </v-col>
        <v-col cols="6" md="6" lg="6">
          <v-text-field label="Harga Jasa A Operator" v-model="formInput.tindakanJasaAOperator"></v-text-field>
        </v-col>
        <v-col cols="6" md="6" lg="6">
          <v-text-field label="Harga Jasa Paramedis" v-model="formInput.tindakanJasaParamedis"></v-text-field>
        </v-col>
      </Formdialog>
      <Datatable
        v-bind:dataTableDetail="{
          cardTitle: 'Table Tindakan',
          data: masterTindakan.data,
          header: masterTindakan.header,
          editDetail: editForm
      }"
        v-on:inputFormEdit="inputEditTindakan"
        v-on:editTindakanSuccess="successEdit"
        v-on:deleteTindakanSuccess="successDelete"
      >
        <v-col cols="6" md="12" sm="12">
          <v-text-field
            label="Nama Tindakan"
            v-model="editForm.tindakanNama"
            :rules="validationForm.tindakanNama"
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
  name: "Mastertindakan",
  components: {
    Banner,
    Datatable,
    Formdialog
  },
  created() {
    this.$store.dispatch("getMasterTindakan");
  },
  data() {
    return {
      validationForm: {
        tindakanKode: [v => !!v || "Tindakan Kode is required"],
        tindakanNama: [v => !!v || "Tindakan Nama is required"],
        typeHarga: [v => !!v || "Tipe Harga is required"]
      },
      formInput: {
        tindakanKode: "",
        tindakanNama: "",
        typeHarga: null,
        tindakanHarga: "0",
        tindakanSewaAlat: "0",
        tindakanSewaRuangan: "0",
        tindakanJasaOperator: "0",
        tindakanJasaAOperator: "0",
        tindakanJasaParamedis: "0"
      },
      selectFormTypeHarga: ["UMUM", "BPJS", "ASURANSI/PERUSAHAAN"],
      successCreateAlert: false,
      editForm: {
        tindakanNama: "",
        originalID: ""
      },
      successEditAlert: false,
      successDeleteAlert: false
    };
  },
  computed: {
    masterTindakan() {
      let header = [];
      if (this.$store.state.masterTindakan.length > 0) {
        header = [
          { text: "Tindakan Kode", value: "tindakan_kode", align: "start" },
          { text: "Tindakan Nama", value: "tindakan_nama" },
          { text: "Actions", value: "actions", sortable: false },
          { text: "", value: "data-table-expand" }
        ];
        return {
          data: this.$store.state.masterTindakan,
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
      this.formInput.tindakanKode = "";
      this.formInput.tindakanNama = "";
      this.formInput.typeHarga = null;
      this.formInput.tindakanHarga = "0";
      this.formInput.tindakanSewaAlat = "0";
      this.formInput.tindakanSewaRuangan = "0";
      this.formInput.tindakanJasaOperator = "0";
      this.formInput.tindakanJasaAOperator = "0";
      this.formInput.tindakanJasaParamedis = "0";
      this.successCreateAlert = true;
      setTimeout(() => {
        this.successCreateAlert = false;
      }, 3000);
    },
    inputEditTindakan(tindakan) {
      this.editForm.tindakanNama = tindakan.tindakan_nama;
      this.editForm.originalID = tindakan.tindakan_kode;
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
.master-tindakan {
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