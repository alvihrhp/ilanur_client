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
      <Formdialog
        v-bind:dialogDetail="{
        formInput,
        btnIcon: 'mdi-thermometer',
        btnTitle: 'Create Tindakan'
      }"
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
          header: masterTindakan.header
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
      selectFormTypeHarga: ["UMUM", "BPJS", "ASURANSI/PERUSAHAAN"]
    };
  },
  computed: {
    masterTindakan() {
      let header = [];
      if (this.$store.state.masterTindakan.length > 0) {
        this.$store.state.masterTindakan.forEach((tindakan, index) => {
          Object.keys(tindakan).forEach(key => {
            let objectHeader = {};
            const newKey = key.replace("_", " ").split("");
            newKey[0] = newKey[0].toUpperCase();
            newKey[9] = newKey[9].toUpperCase();
            const headerKey = newKey.join("");

            if (index === 0 && key === "tindakan_kode") {
              objectHeader["text"] = headerKey;
              objectHeader["value"] = key;
              objectHeader["align"] = "start";
              header.push(objectHeader);
            } else if (index === 0 && key !== "tindakan_kode") {
              objectHeader["text"] = headerKey;
              objectHeader["value"] = key;
              header.push(objectHeader);
            }
          });
        });
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
</style>