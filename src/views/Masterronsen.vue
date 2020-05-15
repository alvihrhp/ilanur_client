<template>
  <div class="master-ronsen">
    <Banner
      v-bind:bannerDetail="{
        background: 'ronsen.jpg',
        title: 'Master Ronsen'
    }"
    ></Banner>
    <div class="data-table-container">
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
export default {
  name: "Masterronsen",
  components: {
    Banner,
    Datatable
  },
  created() {
    this.$store.dispatch("getMasterRonsen");
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

.data-table-container {
  padding: 50px;
}
</style>