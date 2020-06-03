<template>
  <div class="master-doctor">
    <Banner
      v-bind:bannerDetail="{
        background: 'doctor.jpeg',
        title: 'Master Doctor'
    }"
    ></Banner>
    <div class="loading" v-if="masterDoctor.data.length === 0">
      <img src="../assets/loading.gif" />
    </div>
    <div class="data-table-container" v-else>
      <Formdialog
        v-bind:dialogDetail="{
        formInput,
        btnIcon: 'mdi-stethoscope',
        btnTitle: 'Create Dokter',
      }"
      >
        <v-col cols="6" sm="6" md="6">
          <v-text-field
            label="Kode Dokter"
            v-model="formInput.kodeDokter"
            :rules="validationForm.kodeDokter"
            required
          ></v-text-field>
        </v-col>
        <v-col cols="6" sm="6" md="6">
          <v-text-field
            label="Nama Dokter"
            v-model="formInput.namaDokter"
            :rules="validationForm.namaDokter"
            required
          ></v-text-field>
        </v-col>
        <v-col cols="6" sm="6" md="6">
          <v-text-field v-model="formInput.gelarDepanDokter" label="Gelar Depan Dokter"></v-text-field>
        </v-col>
        <v-col cols="6" sm="6" md="6">
          <v-text-field v-model="formInput.gelarBelakangDokter" label="Gelar Belakang Dokter"></v-text-field>
        </v-col>
        <v-col cols="6" sm="6" md="6">
          <v-select
            label="Jenis Kelamin Dokter"
            v-model="formInput.jenisKelaminDokter"
            :rules="validationForm.jenisKelaminDokter"
            :items="selectFormKelamin"
            required
          ></v-select>
        </v-col>
        <v-col cols="6" sm="6" md="6">
          <v-text-field
            label="Alamat Dokter"
            v-model="formInput.alamatDokter"
            :rules="validationForm.alamatDokter"
            required
          ></v-text-field>
        </v-col>
        <v-col cols="6" sm="6" md="6">
          <v-text-field v-model="formInput.noTelpRumahDokter" label="Nomer Telp Rumah Dokter"></v-text-field>
        </v-col>
        <v-col cols="6" sm="6" md="6">
          <v-text-field v-model="formInput.noHpDokter" label="Nomer Hp Dokter"></v-text-field>
        </v-col>
        <v-col cols="6" sm="6" md="6">
          <v-text-field v-model="formInput.npwpDokter" label="NPWP Dokter"></v-text-field>
        </v-col>
        <v-col cols="6" sm="6" md="6">
          <v-text-field
            v-model="formInput.statusDokter"
            label="Status Dokter"
            :rules="validationForm.statusDokter"
            required
          ></v-text-field>
        </v-col>
        <v-col cols="6" sm="6" md="6">
          <v-text-field
            label="Pemeriksaan Dokter"
            v-model="formInput.pemeriksaanDokter"
            :rules="validationForm.pemeriksaanDokter"
            required
          ></v-text-field>
        </v-col>
        <v-col cols="6" sm="6" md="6">
          <v-select
            label="Tipe Harga Dokter"
            v-model="formInput.typeHarga"
            :rules="validationForm.typeHarga"
            :items="selectFormTypeHarga"
            required
          ></v-select>
        </v-col>
        <v-col cols="6" sm="6" md="6">
          <v-text-field
            label="Harga Jasa Dokter"
            v-model="formInput.hargaJasaDokter"
            :rules="validationForm.hargaJasaDokter"
            required
          ></v-text-field>
        </v-col>
        <v-col cols="6" sm="6" md="6">
          <v-text-field
            label="Pembagian Dokter"
            v-model="formInput.pembagianDokter"
            :rules="validationForm.pembagianDokter"
            required
          ></v-text-field>
        </v-col>
        <v-col cols="6" sm="6" md="6">
          <v-text-field
            label="Harga On Visit"
            v-model="formInput.dokterOnVist"
            :rules="validationForm.dokterOnVist"
            required
          ></v-text-field>
        </v-col>
        <v-col cols="6" sm="6" md="6">
          <v-text-field
            label="Harga On Call"
            v-model="formInput.dokterOnCall"
            :rules="validationForm.dokterOnCall"
            required
          ></v-text-field>
        </v-col>
      </Formdialog>
      <Datatable
        v-bind:dataTableDetail="{
        data: masterDoctor.data,
        header: masterDoctor.header,
        cardTitle: 'Table Doctor',
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
  name: "Masterdoctor",
  components: {
    Banner,
    Datatable,
    Formdialog
  },
  created() {
    this.$store.dispatch("getMasterDoctor");
  },
  data() {
    return {
      validationForm: {
        kodeDokter: [v => !!v || "Kode Dokter is required"],
        namaDokter: [v => !!v || "Nama Dokter is required"],
        jenisKelaminDokter: [v => !!v || "Item is required"],
        alamatDokter: [v => !!v || "Alamat Dokter is required"],
        statusDokter: [v => !!v || "Status Dokter is required"],
        pemeriksaanDokter: [v => !!v || "Pemeriksaan Dokter is required"],
        typeHarga: [v => !!v || "Tipe Harga Dokter is required"],
        hargaJasaDokter: [v => !!v || "Harga Jasa Dokter is required"],
        pembagianDokter: [v => !!v || "Pembagian Dokter is required"],
        dokterOnVist: [v => !!v || "Harga On Visit is required"],
        dokterOnCall: [v => !!v || "Harga On Call is required"]
      },
      formInput: {
        kodeDokter: "",
        namaDokter: "",
        gelarDepanDokter: "",
        gelarBelakangDokter: "",
        jenisKelaminDokter: null,
        alamatDokter: "",
        noTelpRumahDokter: "",
        noHpDokter: "",
        npwpDokter: "",
        statusDokter: "",
        pemeriksaanDokter: "",
        typeHarga: null,
        hargaJasaDokter: "0",
        pembagianDokter: "",
        dokterOnVist: "",
        dokterOnCall: ""
      },
      selectFormKelamin: ["Pria", "Wanita"],
      selectFormTypeHarga: ["UMUM", "BPJS", "ASURANSI/PERUSAHAAN"]
    };
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