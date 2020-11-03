<template>
  <div class="master-obat">
    <Toolbar></Toolbar>
    <Banner
      v-bind:bannerDetail="{
        background: 'obat.jpg',
        title: 'Master Obat'
    }"
    ></Banner>
    <div class="data-table-container">
      <v-alert
        type="success"
        class="success-create-alert"
        v-show="successCreateAlert"
        v-animate-css="'slideInDown'"
      >Create Obat Success</v-alert>
      <v-alert
        type="success"
        class="success-create-alert"
        v-show="successEditAlert"
        v-animate-css="'slideInDown'"
      >Edit Obat Success</v-alert>
      <v-alert
        type="success"
        class="success-create-alert"
        v-show="successDeleteAlert"
        v-animate-css="'slideInDown'"
      >Delete Obat Success</v-alert>
      <Formdialog
        v-bind:dialogDetail="{
        from: 'Obat',
        formInput,
        btnTitle: 'Create Obat',
        btnIcon: 'mdi-pill',
        createAction: 'createMasterObat'
      }"
        v-on:createObatSuccess="resetFormInput"
      >
        <v-col cols="6" sm="6" md="6">
          <v-text-field
            label="Kode Obat"
            v-model="formInput.obatKode"
            :rules="validationRules.obatKode"
            required
          ></v-text-field>
        </v-col>
        <v-col cols="6" sm="6" md="6">
          <v-text-field
            label="Nama Obat"
            v-model="formInput.obatNama"
            :rules="validationRules.obatNama"
            required
          ></v-text-field>
        </v-col>
        <v-col cols="6" sm="6" md="6">
          <v-text-field
            label="Komposisi Obat"
            v-model="formInput.obatKomposisi"
            :rules="validationRules.obatKomposisi"
            required
          ></v-text-field>
        </v-col>
        <v-col cols="6" sm="6" md="6">
          <v-select
            label="Satuan Obat"
            v-model="formInput.obatSatuan"
            :rules="validationRules.obatSatuan"
            :items="selectObatSatuan"
            required
          ></v-select>
        </v-col>
        <v-col cols="6" sm="6" md="6">
          <v-text-field label="Obat Hnappn" v-model="formInput.obatHnappn"></v-text-field>
        </v-col>
        <v-col cols="6" sm="6" md="6">
          <v-text-field
            label="Obat Persen"
            v-model="formInput.obatPersen"
            :rules="validationRules.obatPersen"
            required
          ></v-text-field>
        </v-col>
        <v-col cols="6" sm="6" md="6">
          <v-text-field label="Obat Prinsipal" v-model="formInput.obatPrinsipal"></v-text-field>
        </v-col>
        <v-col cols="6" sm="6" md="6">
          <v-select label="Jenis Obat" v-model="formInput.obatJenis" :items="selectObatJenis"></v-select>
        </v-col>
        <v-col cols="6" sm="6" md="6">
          <v-text-field label="Obat Diskon" v-model="formInput.obatDiskon"></v-text-field>
        </v-col>
        <v-col cols="6" sm="6" md="6">
          <v-text-field label="Obat Quantity" v-model="formInput.obatQuantity"></v-text-field>
        </v-col>
        <v-col cols="6" sm="6" md="6">
          <v-select
            label="Tipe Pembayaran"
            v-model="formInput.typeHarga"
            :rules="validationRules.typeHarga"
            :items="masterType"
            required
          ></v-select>
        </v-col>
        <v-col cols="6" sm="6" md="6">
          <v-text-field label="Harga Box" v-model="formInput.hargaBox"></v-text-field>
        </v-col>
        <v-col cols="6" sm="6" md="6">
          <v-text-field label="Harga Satuan" v-model="formInput.hargaSatuan"></v-text-field>
        </v-col>
      </Formdialog>
      <Datatable
        :key="key"
        v-bind:dataTableDetail="{
        from: 'Obat',
        cardTitle: 'Table Obat',
        header: masterObat.header,
        data: masterObat.data,
        length: masterObat.length,
        editDetail: editForm,
        buttonEdit: true,
        buttonDelete: true,
        loadingData,
        itemKey: 'obat_kode',
        isExpanded: true,
        buttonExpand: true,
        editAction: 'editMasterObat',
        deleteAction: 'deleteMasterObat',
        tableExpandFormInput: 'formInputHargaObat',
        tableExpandEditForm: 'editFormHargaObat',
        btnExpandTitle: 'Create Price',
        tableExpandFor: 'hargaObat',
        tableExpandHeader: 'headerObat',
        tableExpandCreate: 'createHargaObat',
        tableExpandUpdate: 'editHargaObat',
      }"
        v-on:inputFormEdit="inputEditObat"
        v-on:editObatSuccess="successEdit"
        v-on:deleteObatSuccess="successDelete"
        v-on:getData="getMasterObat"
      >
        <v-col cols="6" sm="6" md="6">
          <v-text-field
            label="Nama Obat"
            v-model="editForm.obatNama"
            :rules="validationRules.obatNama"
            required
          ></v-text-field>
        </v-col>
        <v-col cols="6" sm="6" md="6">
          <v-text-field
            label="Komposisi Obat"
            v-model="editForm.obatKomposisi"
            :rules="validationRules.obatKomposisi"
            required
          ></v-text-field>
        </v-col>
        <v-col cols="6" sm="6" md="6">
          <v-select
            label="Satuan Obat"
            v-model="editForm.obatSatuan"
            :rules="validationRules.obatSatuan"
            :items="selectObatSatuan"
            required
          ></v-select>
        </v-col>
        <v-col cols="6" sm="6" md="6">
          <v-text-field label="Obat Hnappn" v-model="editForm.obatHnappn"></v-text-field>
        </v-col>
        <v-col cols="6" sm="6" md="6">
          <v-text-field
            label="Obat Persen"
            v-model="editForm.obatPersen"
            :rules="validationRules.obatPersen"
            required
          ></v-text-field>
        </v-col>
        <v-col cols="6" sm="6" md="6">
          <v-text-field label="Obat Prinsipal" v-model="editForm.obatPrinsipal"></v-text-field>
        </v-col>
        <v-col cols="6" sm="6" md="6">
          <v-select label="Jenis Obat" v-model="editForm.obatJenis" :items="selectObatJenis"></v-select>
        </v-col>
        <v-col cols="6" sm="6" md="6">
          <v-text-field label="Obat Diskon" v-model="editForm.obatDiskon"></v-text-field>
        </v-col>
        <v-col cols="6" sm="6" md="6">
          <v-text-field label="Obat Quantity" v-model="editForm.obatQuantity"></v-text-field>
        </v-col>
      </Datatable>
    </div>
  </div>
</template>

<script>
import Toolbar from "../components/Toolbar";
import Banner from "../components/Banner";
import Datatable from "../components/Datatable";
import Formdialog from "../components/Formdialog";
export default {
  name: "Masterobat",
  components: {
    Banner,
    Datatable,
    Formdialog,
    Toolbar
  },
  data() {
    return {
      loadingData: true,
      key: false,
      validationRules: {
        obatKode: [v => !!v || "Kode Obat is required"],
        obatNama: [v => !!v || "Nama Obat is required"],
        obatKomposisi: [v => !!v || "Komposisi Obat is required"],
        obatSatuan: [v => !!v || "Satuan Obat is required"],
        obatPersen: [v => !!v || "Obat Persen is required"],
        typeHarga: [v => !!v || "Tipe Pembayaran is required"]
      },
      formInput: {
        obatKode: "",
        obatNama: "",
        obatKomposisi: "",
        obatSatuan: null,
        obatHnappn: 0,
        obatPersen: 0,
        obatPrinsipal: "",
        obatJenis: null,
        obatDiskon: 0,
        obatQuantity: 0,
        typeHarga: null,
        hargaBox: "0",
        hargaSatuan: "0"
      },
      selectObatSatuan: [
        "BOX",
        "FLES",
        "SOFT BAG",
        "TUBE",
        "VIAL",
        "TABLE",
        "AMPUL",
        "POT"
      ],
      selectObatJenis: ["OBAT BEBAS", "NARKOTIK"],
      selectTypeHarga: ["UMUM", "BPJS", "ASURANSI/PERUSAHAAN"],
      successCreateAlert: false,
      editForm: {
        obatNama: "",
        obatKomposisi: "",
        obatSatuan: null,
        obatHnappn: 0,
        obatPersen: 0,
        obatPrinsipal: "",
        obatJenis: null,
        obatDiskon: 0,
        obatQuantity: 0,
        originalID: ""
      },
      successEditAlert: false,
      successDeleteAlert: false,
      header: [
        { text: "Obat Kode", value: "obat_kode", align: "start" },
        { text: "Obat Nama", value: "obat_nama" },
        { text: "Obat Quantity", value: "obat_quantity" },
        { text: "Actions", value: "actions", sortable: false },
        { text: "", value: "data-table-expand" }
      ]
    };
  },
  computed: {
    masterObat() {
      if (this.$store.state.masterObat.length > 0) {
        return {
          data: this.$store.state.masterObat,
          header: this.header,
          length: this.$store.state.totalMasterObat
        };
      } else {
        return {
          data: [],
          header: this.header,
          length: 0
        };
      }
    },
    masterType() {
      const type = this.$store.state.masterType
        .map(data => {
          if (data.status === "AKTIF") {
            return data.name;
          }
        })
        .filter(data => {
          return data !== undefined;
        });
      return type;
    }
  },
  methods: {
    getMasterObat(params) {
      this.loadingData = true;
      const newParams = {
        page: params.page,
        itemsPerPage: params.itemsPerPage,
        sortBy: params.sortBy[0],
        sortDesc: params.sortDesc[0],
        search: params.search
      };
      this.$store
        .dispatch("getMasterObat", newParams)
        .then(() => {
          this.loadingData = false;
          this.key = true;
        })
        .catch(error => {
          const errorStatus = { error }.error.response.status;
          if (errorStatus === 401) {
            this.$store.commit("TOKEN_UPDATE");
            this.$router.replace("/login");
            localStorage.clear();
          }
        });
    },
    resetFormInput() {
      this.formInput.obatKode = "";
      this.formInput.obatNama = "";
      this.formInput.obatKomposisi = "";
      this.formInput.obatSatuan = null;
      this.formInput.obatHnappn = 0;
      this.formInput.obatPersen = 0;
      this.formInput.obatPrinsipal = "";
      this.formInput.obatJenis = null;
      this.formInput.obatDiskon = 0;
      this.formInput.obatQuantity = 0;
      this.formInput.typeHarga = null;
      this.formInput.hargaBox = "0";
      this.formInput.hargaSatuan = "0";
      this.successCreateAlert = true;
      setTimeout(() => {
        this.successCreateAlert = false;
      }, 3000);
    },
    inputEditObat(obat) {
      this.editForm.obatNama = obat.obat_nama;
      this.editForm.obatKomposisi = obat.obat_komposisi;
      this.editForm.obatSatuan = obat.obat_satuan;
      this.editForm.obatHnappn = obat.obat_hnappn;
      this.editForm.obatPersen = obat.obat_persen;
      this.editForm.obatPrinsipal = obat.obat_prinsipal;
      this.editForm.obatJenis = obat.obat_jenis;
      this.editForm.obatDiskon = obat.obat_diskon;
      this.editForm.obatQuantity = obat.obat_quantity;
      this.editForm.originalID = obat.obat_kode;
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
.master-obat {
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