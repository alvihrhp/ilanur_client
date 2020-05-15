<template>
  <div class="master-doctor">
    <Banner
      v-bind:bannerDetail="{
        background: 'doctor.jpg',
        title: 'Master Doctor'
    }"
    ></Banner>
    <div class="data-table-container">
      <Datatable
        v-bind:dataTableDetail="{
        data: masterDoctor.data,
        header: masterDoctor.header,
        cardTitle: 'Table Doctor'
      }"
      ></Datatable>
    </div>
  </div>
</template>

<script>
import Banner from "../components/Banner";
import Datatable from "../components/Datatable";
export default {
  name: "Masterdoctor",
  components: {
    Banner,
    Datatable
  },
  created() {
    this.$store.dispatch("getMasterDoctor");
  },
  data() {
    return {};
  },
  computed: {
    masterDoctor() {
      let header = [];
      if (this.$store.state.masterDoctor.length > 0) {
        this.$store.state.masterDoctor.forEach((doctor, index) => {
          const keys = Object.keys(doctor);
          keys.forEach(key => {
            if (
              key === "doctor_kode" ||
              key === "doctor_nama" ||
              key === "doctor_phone" ||
              key === "doctor_hp" ||
              key === "doctor_pemeriksaan"
            ) {
              let objectHeader = {};
              const keyArray = key.replace("_", " ").split("");
              keyArray[0] = keyArray[0].toUpperCase();
              keyArray[7] = keyArray[7].toUpperCase();
              const keyStr = keyArray.join("");
              if (index === 0 && key === "doctor_kode") {
                objectHeader["text"] = keyStr;
                objectHeader["value"] = key;
                objectHeader["align"] = "start";
                header.push(objectHeader);
              } else if (index === 0 && key !== "doctor_kode") {
                objectHeader["text"] = keyStr;
                objectHeader["value"] = key;
                header.push(objectHeader);
              }
            }
          });
        });
        return {
          data: this.$store.state.masterDoctor,
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
.master-doctor {
  background-color: #f5f5f5;
}

.data-table-container {
  padding: 50px;
}
</style>