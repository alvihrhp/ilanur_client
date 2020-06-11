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
      <v-alert
        type="success"
        class="success-create-alert"
        v-show="successCreateAlert"
        v-animate-css="'slideInDown'"
      >Create Doctor Success</v-alert>
      <v-alert
        type="success"
        class="success-create-alert"
        v-show="successEditAlert"
        v-animate-css="'slideInDown'"
      >Edit Doctor Success</v-alert>
      <v-alert
        type="success"
        class="success-create-alert"
        v-show="successDeleteAlert"
        v-animate-css="'slideInDown'"
      >Delete Doctor Success</v-alert>
      <Formdialog
        v-bind:dialogDetail="{
        formInput,
        btnIcon: 'mdi-stethoscope',
        btnTitle: 'Create Doctor',
      }"
        v-on:createDoctorSuccess="resetFormInput"
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
        editDetail: editForm
      }"
        v-on:inputFormEdit="inputEditDokter"
        v-on:editDoctorSuccess="successEdit"
        v-on:deleteDoctorSuccess="successDelete"
      >
        <v-col cols="6" md="6" sm="6">
          <v-text-field
            label="Nama Dokter"
            v-model="editForm.namaDokter"
            :rules="validationForm.namaDokter"
            required
          ></v-text-field>
        </v-col>
        <v-col cols="6" md="6" sm="6">
          <v-text-field label="Gelar Depan Dokter" v-model="editForm.gelarDepanDokter"></v-text-field>
        </v-col>
        <v-col cols="6" md="6" sm="6">
          <v-text-field label="Gelar Belakang Dokter" v-model="editForm.gelarBelakangDokter"></v-text-field>
        </v-col>
        <v-col cols="6" md="6" sm="6">
          <v-select
            label="Kelamin Dokter"
            v-model="editForm.jenisKelaminDokter"
            :rules="validationForm.jenisKelaminDokter"
            :items="selectFormKelamin"
            required
          ></v-select>
        </v-col>
        <v-col cols="6" md="6" sm="6">
          <v-text-field
            label="Alamat Dokter"
            v-model="editForm.alamatDokter"
            :rules="validationForm.alamatDokter"
            required
          ></v-text-field>
        </v-col>
        <v-col cols="6" md="6" sm="6">
          <v-text-field label="No.Telp Dokter" v-model="editForm.noTelpRumahDokter"></v-text-field>
        </v-col>
        <v-col cols="6" md="6" sm="6">
          <v-text-field label="No.Hp Dokter" v-model="editForm.noHpDokter"></v-text-field>
        </v-col>
        <v-col cols="6" md="6" sm="6">
          <v-text-field label="NPWP Dokter" v-model="editForm.npwpDokter"></v-text-field>
        </v-col>
        <v-col cols="6" md="6" sm="6">
          <v-text-field
            label="Status Dokter"
            v-model="editForm.statusDokter"
            :rules="validationForm.statusDokter"
            required
          ></v-text-field>
        </v-col>
        <v-col cols="6" md="6" sm="6">
          <v-text-field
            label="Pemeriksaan Dokter"
            v-model="editForm.pemeriksaanDokter"
            :rules="validationForm.pemeriksaanDokter"
            required
          ></v-text-field>
        </v-col>
      </Datatable>
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
      selectFormTypeHarga: ["UMUM", "BPJS", "ASURANSI/PERUSAHAAN"],
      successCreateAlert: false,
      editForm: {
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
        originalID: ""
      },
      successEditAlert: false,
      successDeleteAlert: false
    };
  },
  computed: {
    masterDoctor() {
      let header = [];
      if (this.$store.state.masterDoctor.length > 0) {
        header = [
          { text: "Doctor Kode", value: "doctor_kode", align: "start" },
          { text: "Doctor Nama", value: "doctor_nama" },
          { text: "Doctor Phone", value: "doctor_phone" },
          { text: "Doctor Hp", value: "doctor_hp" },
          { text: "Doctor Pemeriksaan", value: "doctor_pemeriksaan" },
          { text: "Actions", value: "actions", sortable: false },
          { text: "", value: "data-table-expand" }
        ];

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
  },
  methods: {
    resetFormInput() {
      this.formInput.kodeDokter = "";
      this.formInput.namaDokter = "";
      this.formInput.gelarDepanDokter = "";
      this.formInput.gelarBelakangDokter = "";
      this.formInput.jenisKelaminDokter = null;
      this.formInput.alamatDokter = "";
      this.formInput.noTelpRumahDokter = "";
      this.formInput.noHpDokter = "";
      this.formInput.npwpDokter = "";
      this.formInput.statusDokter = "";
      this.formInput.pemeriksaanDokter = "";
      this.formInput.typeHarga = null;
      this.formInput.hargaJasaDokter = "0";
      this.formInput.pembagianDokter = "";
      this.formInput.dokterOnVist = "";
      this.formInput.dokterOnCall = "";
      this.successCreateAlert = true;
      setTimeout(() => {
        this.successCreateAlert = false;
      }, 3000);
    },
    inputEditDokter(dokter) {
      this.editForm.namaDokter = dokter.doctor_nama;
      this.editForm.gelarDepanDokter = dokter.doctor_glr_dpn;
      this.editForm.gelarBelakangDokter = dokter.doctor_glr_blk;
      this.editForm.jenisKelaminDokter = dokter.doctor_kelamin;
      this.editForm.alamatDokter = dokter.doctor_alamat;
      this.editForm.noTelpRumahDokter = dokter.doctor_phone;
      this.editForm.noHpDokter = dokter.doctor_hp;
      this.editForm.npwpDokter = dokter.doctor_npwp;
      this.editForm.statusDokter = dokter.doctor_status;
      this.editForm.pemeriksaanDokter = dokter.doctor_pemeriksaan;
      this.editForm.originalID = dokter.doctor_kode;
    },
    successEdit() {
      this.successEditAlert = true;
      setTimeout(() => {
        this.successEditAlert = false;
      }, 3000);
    },
    successDelete() {
      this.successDeleteAlert = true;
      setTimeout(() => {
        this.successDeleteAlert = false;
      }, 3000);
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

.success-create-alert {
  font-weight: bold;
  font-size: 17.5px;
}
</style>