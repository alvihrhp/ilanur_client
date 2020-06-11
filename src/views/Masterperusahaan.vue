<template>
  <div class="master-perusahaan">
    <Banner
      v-bind:bannerDetail="{
        background: 'perusahaan.jpg',
        title: 'Master Perusahaan'
    }"
    ></Banner>
    <div class="loading" v-if="masterPerusahaan.data.length === 0">
      <img src="../assets/loading.gif" />
    </div>
    <div class="data-table-container" v-else>
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
        formInput,
        btnTitle: 'Create Perusahaan',
        btnIcon: 'mdi-home-modern'
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
        v-bind:dataTableDetail="{
        data: masterPerusahaan.data,
        header: masterPerusahaan.header,
        cardTitle: 'Table Perusahaan',
        editDetail: editForm,
        buttonEdit: true,
        buttonDelete: true
      }"
        v-on:inputFormEdit="inputEditPerusahaan"
        v-on:editPerusahaanSuccess="successEdit"
        v-on:deletePerusahaanSuccess="successDelete"
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
import Banner from "../components/Banner";
import Datatable from "../components/Datatable";
import Formdialog from "../components/Formdialog";
export default {
  name: "Masterperusahaan",
  components: {
    Banner,
    Datatable,
    Formdialog
  },
  created() {
    this.$store.dispatch("getMasterPerusahaan");
  },
  data() {
    return {
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
      successDeleteAlert: false
    };
  },
  computed: {
    masterPerusahaan() {
      let header = [];
      if (this.$store.state.masterPerusahaan.length > 0) {
        this.$store.state.masterPerusahaan.forEach((perusahaan, index) => {
          Object.keys(perusahaan).forEach(key => {
            if (index === 0) {
              let objectHeader = {};
              if (
                key === "master_perusahaan_nama" ||
                key === "master_perusahaan_alamat" ||
                key === "master_perusahaan_harga" ||
                key === "master_perusahaan_telpon"
              ) {
                const newKey = key
                  .slice(7)
                  .replace("_", " ")
                  .split("");
                newKey[0] = newKey[0].toUpperCase();
                newKey[11] = newKey[11].toUpperCase();
                const headerKey = newKey.join("");
                if (key === "master_perusahaan_nama") {
                  objectHeader["text"] = headerKey;
                  objectHeader["value"] = key;
                  objectHeader["align"] = "start";
                  header.push(objectHeader);
                } else if (key !== "master_perusahaan_nama") {
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
          data: this.$store.state.masterPerusahaan,
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