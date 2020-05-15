<template>
  <div class="master-lab">
    <Banner
      v-bind:bannerDetail="{
        title: 'Master Lab',
        background: 'lab.jpg'
    }"
    ></Banner>
    <div class="data-table-container">
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
export default {
  name: "Masterlab",
  components: {
    Banner,
    Datatable
  },
  created() {
    this.$store.dispatch("getMasterLab");
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

.data-table-container {
  padding: 50px;
}
</style>

