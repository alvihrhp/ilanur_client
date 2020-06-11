<template>
  <v-container fluid>
    <Toolbar></Toolbar>
    <Banner
      v-bind:bannerDetail="{
      background: 'detailprice.jpeg',
      title: bannerTitle
    }"
    ></Banner>
    <div class="loading" v-if="price.data.length === 0">
      <img src="../assets/loading.gif" />
    </div>
    <div class="data-table-container" v-else>
      <Formdialog
        v-bind:dialogDetail="{
        formInput: logicFormInput,
        btnIcon: 'mdi-currency-usd',
        btnTitle: 'Create Price'
      }"
      >
        <template v-if="this.$route.params.from === 'doctor'">
          <v-col cols="6" md="6" sm="6">
            <v-text-field label="Kode Dokter" v-model="formInputHargaDoctor.doctorKode" disabled></v-text-field>
          </v-col>
          <v-col cols="6" md="6" sm="6">
            <v-select
              label="Tipe Pembayaran"
              v-model="formInputHargaDoctor.type"
              :items="selectType"
              :rules="validationFormDoctor.type"
              required
            ></v-select>
          </v-col>
          <v-col cols="6" md="6" sm="6">
            <v-text-field
              label="Jasa Doctor"
              v-model="formInputHargaDoctor.doctorJasa"
              :rules="validationFormDoctor.doctorJasa"
              required
            ></v-text-field>
          </v-col>
          <v-col cols="6" md="6" sm="6">
            <v-text-field
              label="Pembagian Doctor"
              v-model="formInputHargaDoctor.doctorPembagian"
              :rules="validationFormDoctor.doctorPembagian"
              required
            ></v-text-field>
          </v-col>
          <v-col cols="6" md="6" sm="6">
            <v-text-field
              label="Doctor On Call"
              v-model="formInputHargaDoctor.doctorOnCall"
              :rules="validationFormDoctor.doctorOnCall"
              required
            ></v-text-field>
          </v-col>
          <v-col cols="6" md="6" sm="6">
            <v-text-field
              label="Doctor On Visit"
              v-model="formInputHargaDoctor.doctorOnVisit"
              :rules="validationFormDoctor.doctorOnVisit"
              required
            ></v-text-field>
          </v-col>
        </template>
        <template v-else-if="this.$route.params.from === 'tindakan'">
          <v-col cols="6" sm="6" md="6">
            <v-text-field
              label="Tindakan Kode"
              v-model="formInputHargaTindakan.tindakanKode"
              disabled
            ></v-text-field>
          </v-col>
          <v-col cols="6" sm="6" md="6">
            <v-select
              label="Tipe Pembayaran"
              v-model="formInputHargaTindakan.type"
              :rules="validationFormTindakan.type"
              :items="selectType"
              required
            ></v-select>
          </v-col>
          <v-col cols="6" sm="6" md="6">
            <v-text-field
              label="Tindakan Harga"
              v-model="formInputHargaTindakan.tindakanHarga"
              :rules="validationFormTindakan.tindakanHarga"
              required
            ></v-text-field>
          </v-col>
          <v-col cols="6" sm="6" md="6">
            <v-text-field
              label="Tindakan Sewa Alat"
              v-model="formInputHargaTindakan.tindakanSewaAlat"
              :rules="validationFormTindakan.tindakanSewaAlat"
              required
            ></v-text-field>
          </v-col>
          <v-col cols="6" sm="6" md="6">
            <v-text-field
              label="Tindakan Sewa Ruangan"
              v-model="formInputHargaTindakan.tindakanSewaRuangan"
              :rules="validationFormTindakan.tindakanSewaRuangan"
              required
            ></v-text-field>
          </v-col>
          <v-col cols="6" sm="6" md="6">
            <v-text-field
              label="Tindakan Jasa Operator"
              v-model="formInputHargaTindakan.tindakanJasaOperator"
              :rules="validationFormTindakan.tindakanJasaOperator"
              required
            ></v-text-field>
          </v-col>
          <v-col cols="6" sm="6" md="6">
            <v-text-field
              label="Tindakan Jasa A Operator"
              v-model="formInputHargaTindakan.tindakanJasaAOperator"
              :rules="validationFormTindakan.tindakanJasaAOperator"
              required
            ></v-text-field>
          </v-col>
          <v-col cols="6" sm="6" md="6">
            <v-text-field
              label="Tindakan Jasa Paramedis"
              v-model="formInputHargaTindakan.tindakanJasaParamedis"
              :rules="validationFormTindakan.tindakanJasaParamedis"
              required
            ></v-text-field>
          </v-col>
        </template>
        <template v-else-if="this.$route.params.from === 'lab'">
          <v-col cols="6" sm="6" md="6">
            <v-text-field label="Kode Lab" v-model="formInputHargaLab.labKode" disabled></v-text-field>
          </v-col>
          <v-col cols="6" sm="6" md="6">
            <v-select
              label="Tipe Pembayaran"
              v-model="formInputHargaLab.type"
              :rules="validationFormLab.type"
              :items="selectType"
              required
            ></v-select>
          </v-col>
          <v-col cols="6" sm="6" md="6">
            <v-text-field
              label="Harga Lab"
              v-model="formInputHargaLab.hargaLab"
              :rules="validationFormLab.hargaLab"
              required
            ></v-text-field>
          </v-col>
        </template>
        <template v-else-if="this.$route.params.from === 'ronsen'">
          <v-col cols="6" sm="6" md="6">
            <v-text-field label="Kode Lab" v-model="formInputHargaRonsen.ronsenKode" disabled></v-text-field>
          </v-col>
          <v-col cols="6" sm="6" md="6">
            <v-select
              label="Tipe Pembayaran"
              v-model="formInputHargaRonsen.type"
              :rules="validationFormRonsen.type"
              :items="selectType"
              required
            ></v-select>
          </v-col>
          <v-col cols="6" sm="6" md="6">
            <v-text-field
              label="Harga Lab"
              v-model="formInputHargaRonsen.hargaRonsen"
              :rules="validationFormRonsen.hargaRonsen"
              required
            ></v-text-field>
          </v-col>
        </template>
        <template v-else-if="this.$route.params.from === 'obat'">
          <v-col cols="6" sm="6" md="6">
            <v-text-field label="Obat Kode" v-model="formInputHargaObat.obatKode" disabled></v-text-field>
          </v-col>
          <v-col cols="6" sm="6" md="6">
            <v-select
              label="Tipe Pembayaran"
              v-model="formInputHargaObat.type"
              :rules="validationFormObat.type"
              :items="selectType"
              required
            ></v-select>
          </v-col>
          <v-col cols="6" sm="6" md="6">
            <v-text-field
              label="Harga / Box"
              v-model="formInputHargaObat.hargaBox"
              :rules="validationFormObat.hargaBox"
              required
            ></v-text-field>
          </v-col>
          <v-col cols="6" sm="6" md="6">
            <v-text-field
              label="Harga Satuan"
              v-model="formInputHargaObat.hargaSatuan"
              :rules="validationFormObat.hargaSatuan"
              required
            ></v-text-field>
          </v-col>
        </template>
      </Formdialog>
      <Datatable
        v-bind:dataTableDetail="{
        data: price.data,
        header: price.header,
        cardTitle: `Table Price`
      }"
      ></Datatable>
    </div>
  </v-container>
</template>

<script>
import Toolbar from "../components/Toolbar";
import Banner from "../components/Banner";
import Datatable from "../components/Datatable";
import Formdialog from "../components/Formdialog";
export default {
  name: "Detailprice",
  components: {
    Toolbar,
    Banner,
    Datatable,
    Formdialog
  },
  created() {
    let from = this.$route.params.from.split("");
    from[0] = from[0].toUpperCase();
    from = from.join("");
    this.$store.dispatch(`getHarga${from}`, this.$route.params.id);
  },
  data() {
    return {
      headerDoctor: [
        { text: "Type", value: "type" },
        { text: "Doctor Jasa", value: "doctor_jasa" },
        { text: "Doctor Pembagian", value: "doctor_pembagian" },
        { text: "Doctor On Call", value: "doctor_on_call" },
        { text: "Doctor On Visit", value: "doctor_on_visit" },
        { text: "Actions", value: "actions", sortable: false }
      ],
      headerTindakan: [
        {
          text: "Type",
          value: "type"
        },
        {
          text: "Tindakan Harga",
          value: "tindakan_harga"
        },
        {
          text: "Tindakan Sewa Alat",
          value: "tindakan_sewa_alat"
        },
        {
          text: "Tindakan Sewa Ruangan",
          value: "tindakan_sewa_ruangan"
        },
        {
          text: "Tindakan Jasa Paramedis",
          value: "tindakan_jasa_paramedis"
        },
        {
          text: "Tindakan Jasa Operator",
          value: "tindakan_jasa_operator"
        },
        {
          text: "Tindakan Jasa A Operator",
          value: "tindakan_jasa_aoperator"
        },
        { text: "Actions", value: "actions", sortable: false }
      ],
      headerLab: [
        {
          text: "Type",
          value: "type"
        },
        {
          text: "Harga Pemeriksaan",
          value: "harga_lab"
        },
        { text: "Actions", value: "actions", sortable: false }
      ],
      headerRonsen: [
        {
          text: "Type",
          value: "type"
        },
        {
          text: "Harga Pemeriksaan",
          value: "harga"
        },
        { text: "Actions", value: "actions", sortable: false }
      ],
      headerObat: [
        {
          text: "Type",
          value: "type"
        },
        {
          text: "Harga / Box",
          value: "harga_box"
        },
        {
          text: "Harga Satuan",
          value: "harga_satuan"
        },
        {
          text: "Actions",
          value: "actions",
          sortable: false
        }
      ],
      formInputHargaDoctor: {
        doctorKode: this.$route.params.id,
        type: null,
        doctorJasa: "0",
        doctorPembagian: "0",
        doctorOnCall: "0",
        doctorOnVisit: "0"
      },
      validationFormDoctor: {
        type: [v => !!v || "Tipe Pembayaran Dokter is required"],
        doctorJasa: [v => !!v || "Harga Jasa Dokter is required"],
        doctorPembagian: [v => !!v || "Pembagian Dokter is required"],
        doctorOnVisit: [v => !!v || "Harga On Visit is required"],
        doctorOnCall: [v => !!v || "Harga On Call is required"]
      },
      formInputHargaTindakan: {
        tindakanKode: this.$route.params.id,
        type: null,
        tindakanHarga: "0",
        tindakanSewaAlat: "0",
        tindakanSewaRuangan: "0",
        tindakanJasaOperator: "0",
        tindakanJasaAOperator: "0",
        tindakanJasaParamedis: "0"
      },
      validationFormTindakan: {
        type: [v => !!v || "Tipe Pembayaran Tindakan is required"],
        tindakanHarga: [v => !!v || "Tindakan Harga is required"],
        tindakanSewaAlat: [v => !!v || "Tindakan Sewa Alat is required"],
        tindakanSewaRuangan: [v => !!v || "Tindakan Sewa Ruangan is required"],
        tindakanJasaOperator: [
          v => !!v || "Tindakan Jasa Operator is required"
        ],
        tindakanJasaAOperator: [
          v => !!v || "Tindakan Jasa A Operator is required"
        ],
        tindakanJasaParamedis: [
          v => !!v || "Tindakan Jasa Paramedis is required"
        ]
      },
      formInputHargaLab: {
        labKode: this.$route.params.id,
        type: null,
        hargaLab: "0"
      },
      validationFormLab: {
        type: [v => !!v || "Tipe Pembayaran is required"],
        hargaLab: [v => !!v || "Harga Lab is requred"]
      },
      formInputHargaRonsen: {
        ronsenKode: this.$route.params.id,
        type: null,
        hargaRonsen: "0"
      },
      validationFormRonsen: {
        type: [v => !!v || "Tipe Pembayaran is required"],
        hargaRonsen: [v => !!v || "Harga Ronsen is required"]
      },
      formInputHargaObat: {
        obatKode: this.$route.params.id,
        type: null,
        hargaBox: "0",
        hargaSatuan: "0"
      },
      validationFormObat: {
        type: [v => !!v || "Tipe pembayaran is required"],
        hargaBox: [v => !!v || "Harga Box is required"],
        hargaSatuan: [v => !!v || "Harga Satuan is required"]
      }
    };
  },
  computed: {
    showData() {
      return this.data;
    },
    bannerTitle() {
      let title = this.$route.params.from.split("");
      title[0] = title[0].toUpperCase();
      title = title.join("");
      return `Detail Harga ${title}`;
    },
    price() {
      let from = this.$route.params.from.split("");
      from[0] = from[0].toUpperCase();
      from = from.join("");
      let header = [];
      if (this.$store.state[`harga${from}`].length > 0) {
        if (from === "Doctor") {
          header = this.headerDoctor;
        } else if (from === "Tindakan") {
          header = this.headerTindakan;
        } else if (from === "Lab") {
          header = this.headerLab;
        } else if (from === "Ronsen") {
          header = this.headerRonsen;
        } else if (from === "Obat") {
          header = this.headerObat;
        }
        return {
          header,
          data: this.$store.state[`harga${from}`]
        };
      } else {
        return {
          header,
          data: []
        };
      }
    },
    selectType() {
      let arrayType = ["UMUM", "BPJS", "ASURANSI/PERUSAHAAN"];
      let from = this.$route.params.from.split("");
      from[0] = from[0].toUpperCase();
      from = from.join("");
      if (this.$store.state[`harga${from}`].length > 0) {
        let filteredType = [];
        arrayType.forEach(type => {
          let flag = false;
          this.$store.state[`harga${from}`].forEach(item => {
            if (type === item.type) {
              flag = true;
            }
          });
          if (flag === false) {
            filteredType.push(type);
          }
        });
        return filteredType;
      }
    },
    logicFormInput() {
      if (this.$route.params.from === "doctor") {
        return this.formInputHargaDoctor;
      } else if (this.$route.params.from === "tindakan") {
        return this.formInputHargaTindakan;
      } else if (this.$route.params.from === "lab") {
        return this.formInputHargaLab;
      } else if (this.$route.params.from === "ronsen") {
        return this.formInputHargaRonsen;
      } else if (this.$route.params.from === "obat") {
        return this.formInputHargaObat;
      }
    }
  },
  methods: {}
};
</script>

<style scoped>
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