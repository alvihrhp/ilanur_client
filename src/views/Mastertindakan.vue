<template>
  <div class="master-tindakan">
    <Banner
      v-bind:bannerDetail="{
        title: 'Master Tindakan',
        background: 'tindakan.jpg'
    }"
    ></Banner>
    <div class="data-table-container">
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
export default {
  name: "Mastertindakan",
  components: {
    Banner,
    Datatable
  },
  created() {
    this.$store.dispatch("getMasterTindakan");
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

.data-table-container {
  padding: 50px;
}
</style>