<template>
  <div class="master-tindakan">
    <Toolbar></Toolbar>
    <Banner
      v-bind:bannerDetail="{
        title: 'Master Tindakan',
        background: 'tindakan.jpg'
    }"
    ></Banner>
    <div class="data-table-container">
      <v-alert
        type="success"
        class="success-create-alert"
        v-show="successCreateAlert"
        v-animate-css="'slideInDown'"
      >Create Tindakan Success</v-alert>
      <v-alert
        type="success"
        class="success-create-alert"
        v-show="successEditAlert"
        v-animate-css="'slideInDown'"
      >Edit Tindakan Success</v-alert>
      <v-alert
        type="success"
        class="success-create-alert"
        v-show="successDeleteAlert"
        v-animate-css="'slideInDown'"
      >Delete Tindakan Success</v-alert>
      <Formdialog
        v-bind:dialogDetail="{
        from: 'Tindakan',
        formInput,
        btnIcon: 'mdi-thermometer',
        btnTitle: 'Create Tindakan',
        createAction: 'createMasterTindakan'
      }"
        v-on:createTindakanSuccess="resetFormInput"
      >
        <v-col cols="6" md="6" lg="6">
          <v-text-field
            label="Kode Tindakan"
            v-model="formInput.tindakanKode"
            :rules="validationForm.tindakanKode"
            required
          ></v-text-field>
        </v-col>
        <v-col cols="6" md="6" lg="6">
          <v-text-field
            label="Nama Tindakan"
            v-model="formInput.tindakanNama"
            :rules="validationForm.tindakanNama"
            required
          ></v-text-field>
        </v-col>
        <v-col cols="6" md="6" lg="6">
          <v-select
            label="Tipe Pembayaran"
            v-model="formInput.typeHarga"
            :rules="validationForm.typeHarga"
            :items="masterType"
            required
          ></v-select>
        </v-col>
        <v-col cols="6" md="6" lg="6">
          <v-text-field label="Harga Tindakan" v-model="formInput.tindakanHarga" required></v-text-field>
        </v-col>
        <v-col cols="6" md="6" lg="6">
          <v-text-field label="Harga Sewa Alat" v-model="formInput.tindakanSewaAlat"></v-text-field>
        </v-col>
        <v-col cols="6" md="6" lg="6">
          <v-text-field label="Harga Sewa Ruangan" v-model="formInput.tindakanSewaRuangan"></v-text-field>
        </v-col>
        <v-col cols="6" md="6" lg="6">
          <v-text-field label="Harga Jasa Operator" v-model="formInput.tindakanJasaOperator"></v-text-field>
        </v-col>
        <v-col cols="6" md="6" lg="6">
          <v-text-field label="Harga Jasa A Operator" v-model="formInput.tindakanJasaAOperator"></v-text-field>
        </v-col>
        <v-col cols="6" md="6" lg="6">
          <v-text-field label="Harga Jasa Paramedis" v-model="formInput.tindakanJasaParamedis"></v-text-field>
        </v-col>
      </Formdialog>
      <Datatable
        :key="key"
        v-bind:dataTableDetail="{
          from: 'Tindakan',
          cardTitle: 'Table Tindakan',
          data: masterTindakan.data,
          header: masterTindakan.header,
          length: masterTindakan.length,
          editDetail: editForm,
          buttonEdit: true,
          buttonDelete: true,
          itemKey: 'tindakan_kode',
          loadingData,
          isExpanded: true,
          buttonExpand: true,
          editAction: 'editMasterTindakan',
          deleteAction: 'deleteMasterTindakan',
          tableExpandFormInput: 'formInputHargaTindakan',
          tableExpandEditForm: 'editFormHargaTindakan',
          btnExpandTitle: 'Create Price',
          tableExpandFor: 'hargaTindakan',
          tableExpandHeader: 'headerTindakan',
          tableExpandCreate: 'createHargaTindakan',
          tableExpandUpdate: 'editHargaTindakan',
      }"
        v-on:inputFormEdit="inputEditTindakan"
        v-on:editTindakanSuccess="successEdit"
        v-on:deleteTindakanSuccess="successDelete"
        v-on:getData="getMasterTindakan"
      >
        <v-col cols="6" md="12" sm="12">
          <v-text-field
            label="Nama Tindakan"
            v-model="editForm.tindakanNama"
            :rules="validationForm.tindakanNama"
            required
          ></v-text-field>
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
  name: "Mastertindakan",
  components: {
    Banner,
    Datatable,
    Formdialog,
    Toolbar
  },
  data() {
    return {
      loadingData: true,
      validationForm: {
        tindakanKode: [v => !!v || "Tindakan Kode is required"],
        tindakanNama: [v => !!v || "Tindakan Nama is required"],
        typeHarga: [v => !!v || "Tipe Harga is required"]
      },
      formInput: {
        tindakanKode: "",
        tindakanNama: "",
        typeHarga: null,
        tindakanHarga: "0",
        tindakanSewaAlat: "0",
        tindakanSewaRuangan: "0",
        tindakanJasaOperator: "0",
        tindakanJasaAOperator: "0",
        tindakanJasaParamedis: "0"
      },
      successCreateAlert: false,
      editForm: {
        tindakanNama: "",
        originalID: ""
      },
      successEditAlert: false,
      successDeleteAlert: false,
      header: [
        { text: "Tindakan Kode", value: "tindakan_kode", align: "start" },
        { text: "Tindakan Nama", value: "tindakan_nama" },
        { text: "Actions", value: "actions", sortable: false },
        { text: "", value: "data-table-expand" }
      ],
      key: false
    };
  },
  computed: {
    masterTindakan() {
      if (this.$store.state.masterTindakan.length > 0) {
        return {
          data: this.$store.state.masterTindakan,
          header: this.header,
          length: this.$store.state.totalMasterTindakan
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
    getMasterTindakan(params) {
      this.loadingData = true;
      const newParams = {
        page: params.page,
        itemsPerPage: params.itemsPerPage,
        sortBy: params.sortBy[0],
        sortDesc: params.sortDesc[0],
        search: params.search
      };
      this.$store
        .dispatch("getMasterTindakan", newParams)
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
      this.formInput.tindakanKode = "";
      this.formInput.tindakanNama = "";
      this.formInput.typeHarga = null;
      this.formInput.tindakanHarga = "0";
      this.formInput.tindakanSewaAlat = "0";
      this.formInput.tindakanSewaRuangan = "0";
      this.formInput.tindakanJasaOperator = "0";
      this.formInput.tindakanJasaAOperator = "0";
      this.formInput.tindakanJasaParamedis = "0";
      this.successCreateAlert = true;
      setTimeout(() => {
        this.successCreateAlert = false;
      }, 3000);
    },
    inputEditTindakan(tindakan) {
      this.editForm.tindakanNama = tindakan.tindakan_nama;
      this.editForm.originalID = tindakan.tindakan_kode;
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
.master-tindakan {
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