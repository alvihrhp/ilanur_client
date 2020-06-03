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
      <Formdialog
        v-bind:dialogDetail="{
        formInput,
        btnIcon: 'mdi-eyedropper-variant',
        btnTitle: 'Create Lab'
      }"
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
          cardTitle: 'Table Lab' 
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
        hargaLab: 0
      },
      validationRules: {
        labKode: [v => !!v || "Lab Kode is required"],
        labNamaPemeriksaan: [v => !!v || "Lab Nama Pemeriksaan is required"],
        typeHarga: [v => !!v || "Tipe Pembayaran is required"]
      },
      selectTypeHarga: ["UMUM", "BPJS", "ASURANSI/PERUSAHAAN"]
    };
  },
  computed: {
    masterLab() {
      let header = [];
      if (this.$store.state.masterLab.length > 0) {
        this.$store.state.masterLab.forEach((lab, index) => {
          Object.keys(lab).forEach(key => {
            let objectHeader = {};
            const newKey = key.replace("_", " ").split("");
            newKey[0] = newKey[0].toUpperCase();
            let headerKey;
            if (index === 0 && key === "lab_kode") {
              newKey[4] = newKey[4].toUpperCase();
              headerKey = newKey.join("");
              objectHeader["text"] = headerKey;
              objectHeader["value"] = key;
              objectHeader["align"] = "start";
              header.push(objectHeader);
            } else if (index === 0 && key !== "lab_kode") {
              newKey[4] = newKey[4].toUpperCase();
              newKey[8] = " ";
              newKey[9] = newKey[9].toUpperCase();
              headerKey = newKey.join("");
              objectHeader["text"] = headerKey;
              objectHeader["value"] = key;
              header.push(objectHeader);
            }
          });
        });
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
</style>

