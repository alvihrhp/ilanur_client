<template>
  <div class="master-distributor">
    <Banner
      v-bind:bannerDetail="{
        title: 'Master Distributor',
        background: 'distributor.jpg'
    }"
    ></Banner>
    <div class="loading" v-if="masterDistributor.data.length === 0">
      <img src="../assets/loading.gif" />
    </div>
    <div class="data-table-container" v-else>
      <Formdialog
        v-bind:dialogDetail="{
        formInput,
        btnTitle: 'Create Distributor',
        btnIcon: 'mdi-truck'
      }"
      >
        <v-col cols="6" sm="6" md="6">
          <v-text-field
            label="Nama Distributor"
            v-model="formInput.masterDistributorNama"
            :rules="validationRules.masterDistributorNama"
            required
          ></v-text-field>
        </v-col>
        <v-col cols="6" sm="6" md="6">
          <v-text-field
            label="Alamat Distributor"
            v-model="formInput.masterDistributorAlamat"
            :rules="validationRules.masterDistributorAlamat"
            required
          ></v-text-field>
        </v-col>
        <v-col cols="6" sm="6" md="6">
          <v-text-field
            label="Telpon Distributor"
            v-model="formInput.masterDistributorTelpon"
            :rules="validationRules.masterDistributorTelpon"
            required
          ></v-text-field>
        </v-col>
      </Formdialog>
      <Datatable
        v-bind:dataTableDetail="{
          cardTitle: 'Table Distributor',
          data: masterDistributor.data,
          header: masterDistributor.header
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
  name: "Masterdistributor",
  components: {
    Banner,
    Datatable,
    Formdialog
  },
  created() {
    this.$store.dispatch("getMasterDistributor");
  },
  data() {
    return {
      validationRules: {
        masterDistributorNama: [v => !!v || "Nama Distributor is required"],
        masterDistributorAlamat: [v => !!v || "Alamat Distributor is required"],
        masterDistributorTelpon: [v => !!v || "Telpon Distributor is required"]
      },
      formInput: {
        masterDistributorNama: "",
        masterDistributorAlamat: "",
        masterDistributorTelpon: "(021) "
      }
    };
  },
  computed: {
    masterDistributor() {
      let header = [];
      if (this.$store.state.masterDistributor.length > 0) {
        this.$store.state.masterDistributor.forEach((distributor, index) => {
          Object.keys(distributor).forEach(key => {
            let objectHeader = {};
            if (key !== "master_distributor_ID") {
              const newKey = key.replace("_", " ").split("");
              newKey[0] = newKey[0].toUpperCase();
              newKey[7] = newKey[7].toUpperCase();
              newKey[18] = " ";
              newKey[19] = newKey[19].toUpperCase();
              const headerKey = newKey.join("");

              if (index === 0 && key === "master_distributor_nama") {
                objectHeader["text"] = headerKey;
                objectHeader["value"] = key;
                objectHeader["align"] = "start";
                header.push(objectHeader);
              } else if (index === 0 && key !== "master_distributor_nama") {
                objectHeader["text"] = headerKey;
                objectHeader["value"] = key;
                header.push(objectHeader);
              }
            }
          });
        });
        return {
          data: this.$store.state.masterDistributor,
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
.master-distributor {
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