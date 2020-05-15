<template>
  <div class="master-perusahaan">
    <Banner
      v-bind:bannerDetail="{
        background: 'perusahaan.jpg',
        title: 'Master Perusahaan'
    }"
    ></Banner>
    <div class="data-table-container">
      <Datatable
        v-bind:dataTableDetail="{
        data: masterPerusahaan.data,
        header: masterPerusahaan.header,
        cardTitle: 'Table Perusahaan'
      }"
      ></Datatable>
    </div>
  </div>
</template>

<script>
import Banner from "../components/Banner";
import Datatable from "../components/Datatable";
export default {
  name: "Masterperusahaan",
  components: {
    Banner,
    Datatable
  },
  created() {
    this.$store.dispatch("getMasterPerusahaan");
  },
  computed: {
    masterPerusahaan() {
      let header = [];
      if (this.$store.state.masterPerusahaan.length > 0) {
        this.$store.state.masterPerusahaan.forEach((perusahaan, index) => {
          Object.keys(perusahaan).forEach(key => {
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
              if (index === 0 && key === "master_perusahaan_nama") {
                objectHeader["text"] = headerKey;
                objectHeader["value"] = key;
                objectHeader["align"] = "start";
                header.push(objectHeader);
              } else if (index === 0 && key !== "master_perusahaan_nama") {
                objectHeader["text"] = headerKey;
                objectHeader["value"] = key;
                header.push(objectHeader);
              }
            }
          });
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
  }
};
</script>

<style scoped>
.master-perusahaan {
  background-color: #f5f5f5;
}

.data-table-container {
  padding: 50px;
}
</style>