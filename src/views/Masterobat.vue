<template>
  <div class="master-obat">
    <Banner
      v-bind:bannerDetail="{
        background: 'obat.jpg',
        title: 'Master Obat'
    }"
    ></Banner>
    <div class="loading" v-if="masterObat.data.length === 0">
      <img src="../assets/loading.gif" />
    </div>
    <div class="data-table-container" v-else>
      <v-alert
        type="success"
        class="success-create-alert"
        v-show="successCreateAlert"
      >Create Obat Success</v-alert>
      <v-alert
        type="success"
        class="success-create-alert"
        v-show="successEditAlert"
      >Edit Obat Success</v-alert>
      <v-alert
        type="success"
        class="success-create-alert"
        v-show="successDeleteAlert"
      >Delete Obat Success</v-alert>
      <Formdialog
        v-bind:dialogDetail="{
        formInput,
        btnTitle: 'Create Obat',
        btnIcon: 'mdi-pill'
      }"
        v-on:createObatSuccess="resetFormInput"
      >
        <v-col cols="6" sm="6" md="6">
          <v-text-field
            label="Kode Obat"
            v-model="formInput.obatKode"
            :rules="validationRules.obatKode"
            required
          ></v-text-field>
        </v-col>
        <v-col cols="6" sm="6" md="6">
          <v-text-field
            label="Nama Obat"
            v-model="formInput.obatNama"
            :rules="validationRules.obatNama"
            required
          ></v-text-field>
        </v-col>
        <v-col cols="6" sm="6" md="6">
          <v-text-field
            label="Komposisi Obat"
            v-model="formInput.obatKomposisi"
            :rules="validationRules.obatKomposisi"
            required
          ></v-text-field>
        </v-col>
        <v-col cols="6" sm="6" md="6">
          <v-select
            label="Satuan Obat"
            v-model="formInput.obatSatuan"
            :rules="validationRules.obatSatuan"
            :items="selectObatSatuan"
            required
          ></v-select>
        </v-col>
        <v-col cols="6" sm="6" md="6">
          <v-text-field label="Obat Hnappn" v-model="formInput.obatHnappn"></v-text-field>
        </v-col>
        <v-col cols="6" sm="6" md="6">
          <v-text-field
            label="Obat Persen"
            v-model="formInput.obatPersen"
            :rules="validationRules.obatPersen"
            required
          ></v-text-field>
        </v-col>
        <v-col cols="6" sm="6" md="6">
          <v-text-field label="Obat Prinsipal" v-model="formInput.obatPrinsipal"></v-text-field>
        </v-col>
        <v-col cols="6" sm="6" md="6">
          <v-select label="Jenis Obat" v-model="formInput.obatJenis" :items="selectObatJenis"></v-select>
        </v-col>
        <v-col cols="6" sm="6" md="6">
          <v-text-field label="Obat Diskon" v-model="formInput.obatDiskon"></v-text-field>
        </v-col>
        <v-col cols="6" sm="6" md="6">
          <v-text-field label="Obat Quantity" v-model="formInput.obatQuantity"></v-text-field>
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
          <v-text-field label="Harga Box" v-model="formInput.hargaBox"></v-text-field>
        </v-col>
        <v-col cols="6" sm="6" md="6">
          <v-text-field label="Harga Satuan" v-model="formInput.hargaSatuan"></v-text-field>
        </v-col>
      </Formdialog>
      <Datatable
        v-bind:dataTableDetail="{
        cardTitle: 'Table Obat',
        header: masterObat.header,
        data: masterObat.data,
        editDetail: editForm
      }"
        v-on:inputFormEdit="inputEditObat"
        v-on:editObatSuccess="successEdit"
        v-on:deleteObatSuccess="successDelete"
      >
        <v-col cols="6" sm="6" md="6">
          <v-text-field
            label="Nama Obat"
            v-model="editForm.obatNama"
            :rules="validationRules.obatNama"
            required
          ></v-text-field>
        </v-col>
        <v-col cols="6" sm="6" md="6">
          <v-text-field
            label="Komposisi Obat"
            v-model="editForm.obatKomposisi"
            :rules="validationRules.obatKomposisi"
            required
          ></v-text-field>
        </v-col>
        <v-col cols="6" sm="6" md="6">
          <v-select
            label="Satuan Obat"
            v-model="editForm.obatSatuan"
            :rules="validationRules.obatSatuan"
            :items="selectObatSatuan"
            required
          ></v-select>
        </v-col>
        <v-col cols="6" sm="6" md="6">
          <v-text-field label="Obat Hnappn" v-model="editForm.obatHnappn"></v-text-field>
        </v-col>
        <v-col cols="6" sm="6" md="6">
          <v-text-field
            label="Obat Persen"
            v-model="editForm.obatPersen"
            :rules="validationRules.obatPersen"
            required
          ></v-text-field>
        </v-col>
        <v-col cols="6" sm="6" md="6">
          <v-text-field label="Obat Prinsipal" v-model="editForm.obatPrinsipal"></v-text-field>
        </v-col>
        <v-col cols="6" sm="6" md="6">
          <v-select label="Jenis Obat" v-model="editForm.obatJenis" :items="selectObatJenis"></v-select>
        </v-col>
        <v-col cols="6" sm="6" md="6">
          <v-text-field label="Obat Diskon" v-model="editForm.obatDiskon"></v-text-field>
        </v-col>
        <v-col cols="6" sm="6" md="6">
          <v-text-field label="Obat Quantity" v-model="editForm.obatQuantity"></v-text-field>
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
  name: "Masterobat",
  components: {
    Banner,
    Datatable,
    Formdialog
  },
  created() {
    this.$store.dispatch("getMasterObat");
  },
  data() {
    return {
      validationRules: {
        obatKode: [v => !!v || "Kode Obat is required"],
        obatNama: [v => !!v || "Nama Obat is required"],
        obatKomposisi: [v => !!v || "Komposisi Obat is required"],
        obatSatuan: [v => !!v || "Satuan Obat is required"],
        obatPersen: [v => !!v || "Obat Persen is required"],
        typeHarga: [v => !!v || "Tipe Pembayaran is required"]
      },
      formInput: {
        obatKode: "",
        obatNama: "",
        obatKomposisi: "",
        obatSatuan: null,
        obatHnappn: 0,
        obatPersen: 0,
        obatPrinsipal: "",
        obatJenis: null,
        obatDiskon: 0,
        obatQuantity: 0,
        typeHarga: null,
        hargaBox: "0",
        hargaSatuan: "0"
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
      ],
      selectObatJenis: ["OBAT BEBAS", "NARKOTIK"],
      selectTypeHarga: ["UMUM", "BPJS", "ASURANSI/PERUSAHAAN"],
      successCreateAlert: false,
      editForm: {
        obatNama: "",
        obatKomposisi: "",
        obatSatuan: null,
        obatHnappn: 0,
        obatPersen: 0,
        obatPrinsipal: "",
        obatJenis: null,
        obatDiskon: 0,
        obatQuantity: 0,
        originalID: ""
      },
      successEditAlert: false,
      successDeleteAlert: false
    };
  },
  computed: {
    masterObat() {
      let header = [];
      if (this.$store.state.masterObat.length > 0) {
        this.$store.state.masterObat.forEach((obat, index) => {
          Object.keys(obat).forEach(key => {
            if (index === 0) {
              let objectHeader = {};
              if (
                key === "obat_kode" ||
                key === "obat_nama" ||
                key === "obat_quantity"
              ) {
                const newKey = key.replace("_", " ").split("");
                newKey[0] = newKey[0].toUpperCase();
                newKey[5] = newKey[5].toUpperCase();
                const headerKey = newKey.join("");
                if (key === "obat_kode") {
                  objectHeader["text"] = headerKey;
                  objectHeader["value"] = key;
                  objectHeader["align"] = "start";
                  header.push(objectHeader);
                } else if (key !== "obat_kode") {
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
          data: this.$store.state.masterObat,
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
      this.formInput.obatKode = "";
      this.formInput.obatNama = "";
      this.formInput.obatKomposisi = "";
      this.formInput.obatSatuan = null;
      this.formInput.obatHnappn = 0;
      this.formInput.obatPersen = 0;
      this.formInput.obatPrinsipal = "";
      this.formInput.obatJenis = null;
      this.formInput.obatDiskon = 0;
      this.formInput.obatQuantity = 0;
      this.formInput.typeHarga = null;
      this.formInput.hargaBox = "0";
      this.formInput.hargaSatuan = "0";
      this.successCreateAlert = true;
      setTimeout(() => {
        this.successCreateAlert = false;
      }, 3000);
    },
    inputEditObat(obat) {
      this.editForm.obatNama = obat.obat_nama;
      this.editForm.obatKomposisi = obat.obat_komposisi;
      this.editForm.obatSatuan = obat.obat_satuan;
      this.editForm.obatHnappn = obat.obat_hnappn;
      this.editForm.obatPersen = obat.obat_persen;
      this.editForm.obatPrinsipal = obat.obat_prinsipal;
      this.editForm.obatJenis = obat.obat_jenis;
      this.editForm.obatDiskon = obat.obat_diskon;
      this.editForm.obatQuantity = obat.obat_quantity;
      this.editForm.originalID = obat.obat_kode;
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
.master-obat {
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