<template>
  <div class="master-asuransi">
    <Banner
      v-bind:bannerDetail="{
        background: 'asuransi.jpg',
        title: 'Master Asuransi'
    }"
    ></Banner>
    <div class="data-table-container">
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
export default {
  name: "Masterasuransi",
  components: {
    Banner,
    Datatable
  },
  created() {
    this.$store.dispatch("getMasterAsuransi");
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

.data-table-container {
  padding: 50px;
}
</style>