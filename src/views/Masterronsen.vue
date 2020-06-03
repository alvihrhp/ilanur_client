<template>
  <div class="master-ronsen">
    <Banner
      v-bind:bannerDetail="{
        background: 'ronsen.jpg',
        title: 'Master Ronsen'
    }"
    ></Banner>
    <div class="loading" v-if="masterRonsen.data.length === 0">
      <img src="../assets/loading.gif" />
    </div>
    <div class="data-table-container" v-else>
      <Formdialog
        v-bind:dialogDetail="{
        formInput,
        btnTitle:'Create Ronsen',
        btnIcon: 'mdi-laptop-mac'
      }"
      >
        <v-col cols="6" sm="6" md="6">
          <v-text-field
            label="Kode Ronsen"
            v-model="formInput.ronsenKode"
            :rules="validationRules.ronsenKode"
            required
          ></v-text-field>
        </v-col>
        <v-col cols="6" sm="6" md=" 6">
          <v-text-field
            label="Nama Pemeriksaan"
            v-model="formInput.ronsenNamaPemeriksaan"
            :rules="validationRules.ronsenNamaPemeriksaan"
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
          <v-text-field label="Harga Pemeriksaan" v-model="formInput.harga"></v-text-field>
        </v-col>
      </Formdialog>
      <Datatable
        v-bind:dataTableDetail="{
        cardTitle: 'Table Ronsen',
        header: masterRonsen.header,
        data: masterRonsen.data
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
  name: "Masterronsen",
  components: {
    Banner,
    Datatable,
    Formdialog
  },
  created() {
    this.$store.dispatch("getMasterRonsen");
  },
  data() {
    return {
      validationRules: {
        ronsenKode: [v => !!v || "Ronsen Kode is required"],
        ronsenNamaPemeriksaan: [v => !!v || "Nama Pemeriksaan is required"],
        typeHarga: [v => !!v || "Tipe pembayaran is required"]
      },
      formInput: {
        ronsenKode: "",
        ronsenNamaPemeriksaan: "",
        typeHarga: null,
        harga: "0"
      },
      selectTypeHarga: ["UMUM", "BPJS", "ASURANSI/PERUSAHAAN"]
    };
  },
  computed: {
    masterRonsen() {
      let header = [];
      if (this.$store.state.masterRonsen.length > 0) {
        this.$store.state.masterRonsen.forEach((ronsen, index) => {
          Object.keys(ronsen).forEach(key => {
            let objectHeader = {};
            const newKey = key.replace("_", " ").split("");
            newKey[0] = newKey[0].toUpperCase();
            let headerKey;
            if (index === 0 && key === "ronsen_kode") {
              newKey[7] = newKey[7].toUpperCase();
              headerKey = newKey.join("");
              objectHeader["text"] = headerKey;
              objectHeader["value"] = key;
              objectHeader["align"] = "start";
              header.push(objectHeader);
            } else if (index === 0 && key !== "ronsen_kode") {
              newKey[7] = newKey[7].toUpperCase();
              newKey[11] = " ";
              newKey[12] = newKey[12].toUpperCase();
              headerKey = newKey.join("");
              objectHeader["text"] = headerKey;
              objectHeader["value"] = key;
              header.push(objectHeader);
            }
          });
        });
        return {
          data: this.$store.state.masterRonsen,
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
.master-ronsen {
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