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
      <Formdialog
        v-bind:dialogDetail="{
        formInput,
        btnTitle: 'Create Obat',
        btnIcon: 'mdi-pill'
      }"
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
          <v-text-field
            label="Obat Hnappn"
            v-model="formInput.obatHnappn"
            :rules="validationRules.obatHnappn"
            required
          ></v-text-field>
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
        data: masterObat.data
      }"
      ></Datatable>
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
        obatHnappn: [v => !!v || "Obat Hnappn is required"],
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
      selectTypeHarga: ["UMUM", "BPJS", "ASURANSI/PERUSAHAAN"]
    };
  },
  computed: {
    masterObat() {
      let header = [];
      if (this.$store.state.masterObat.length > 0) {
        this.$store.state.masterObat.forEach((obat, index) => {
          Object.keys(obat).forEach(key => {
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
              if (index === 0 && key === "obat_kode") {
                objectHeader["text"] = headerKey;
                objectHeader["value"] = key;
                objectHeader["align"] = "start";
                header.push(objectHeader);
              } else if (index === 0 && key !== "obat_kode") {
                objectHeader["text"] = headerKey;
                objectHeader["value"] = key;
                header.push(objectHeader);
              }
            }
          });
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
</style>