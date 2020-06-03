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
      <Formdialog
        v-bind:dialogDetail="{
        formInput,
        btnTitle: 'Create Asuransi',
        btnIcon: 'mdi-umbrella'
      }"
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
          cardTitle: 'Table Asuransi'
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
      }
    };
  },
  computed: {
    masterAsuransi() {
      let header = [];
      if (this.$store.state.masterAsuransi.length > 0) {
        this.$store.state.masterAsuransi.forEach((asuransi, index) => {
          Object.keys(asuransi).forEach(key => {
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
              if (index === 0 && key === "master_asuransi_nama") {
                objectHeader["text"] = headerKey;
                objectHeader["value"] = key;
                objectHeader["align"] = "start";
                header.push(objectHeader);
              } else if (index === 0 && key !== "master_asuransi_nama") {
                objectHeader["text"] = headerKey;
                objectHeader["value"] = key;
                header.push(objectHeader);
              }
            }
          });
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
</style>