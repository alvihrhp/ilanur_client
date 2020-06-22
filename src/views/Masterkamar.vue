<template>
  <div class="master-kamar">
    <Toolbar></Toolbar>
    <Banner
      v-bind:bannerDetail="{
        title: 'Master Kamar',
        background: 'kamar.jpg'
    }"
    ></Banner>
    <div class="data-table-container">
      <v-alert
        type="success"
        class="success-create-alert"
        v-show="successCreateAlert"
        v-animate-css="'slideInDown'"
      >Create Kamar Success</v-alert>
      <v-alert
        type="success"
        class="success-create-alert"
        v-show="successEditAlert"
        v-animate-css="'slideInDown'"
      >Edit Kamar Success</v-alert>
      <Formdialog
        v-bind:dialogDetail="{
          formInput,
          btnTitle: 'Create Kamar',
          btnIcon: 'mdi-seat-flat'
      }"
        v-on:createKamarSuccess="resetFormInput"
      >
        <v-col cols="6" sm="6" md="6">
          <v-text-field
            label="Nama Kamar"
            v-model="formInput.nama"
            :rules="validationRules.nama"
            required
          ></v-text-field>
        </v-col>
        <v-col cols="6" sm="6" md="6">
          <v-select
            label="Lantai Kamar"
            v-model="formInput.lantai"
            :rules="validationRules.lantai"
            :items="masterLantai"
            required
          ></v-select>
        </v-col>
        <v-col cols="6" sm="6" md="6">
          <v-select
            label="Kelas Kamar"
            v-model="formInput.kelas"
            :rules="validationRules.kelas"
            :items="selectKelas"
            required
          ></v-select>
        </v-col>
        <v-col cols="6" sm="6" md="6">
          <v-select
            label="Type"
            v-model="formInput.type"
            :rules="validationRules.type"
            :items="masterType"
            required
          ></v-select>
        </v-col>
        <v-col cols="6" sm="6" md="6">
          <v-text-field label="Kapasitas Kamar" v-model="formInput.kapasitas" required></v-text-field>
        </v-col>
        <v-col cols="6" sm="6" md="6">
          <v-text-field label="Harga Kamar" v-model="formInput.harga" required></v-text-field>
        </v-col>
      </Formdialog>
      <Datatable
        :key="key"
        v-bind:dataTableDetail="{
          cardTitle: 'Table Kamar',
          header: masterKamar.header,
          data: masterKamar.data,
          editDetail: editForm,
          buttonEdit: true,
          buttonDelete: false,
          loadingData,
          itemKey: 'id'
      }"
        v-on:inputFormEdit="inputEditKamar"
        v-on:editKamarSuccess="editSuccess"
        v-on:getData="getMasterKamar"
      >
        <v-col cols="6" md="6" sm="6">
          <v-text-field
            label="Nama Kamar"
            v-model="editForm.nama"
            :rules="validationRules.nama"
            required
          ></v-text-field>
        </v-col>
        <v-col cols="6" md="6" sm="6">
          <v-select
            label="Lantai Kamar"
            v-model="editForm.lantai"
            :rules="validationRules.lantai"
            :items="masterLantai"
            required
          ></v-select>
        </v-col>
      </Datatable>
    </div>
  </div>
</template>

<script>
import Toolbar from "../components/Toolbar";
import Banner from "../components/Banner";
import Formdialog from "../components/Formdialog";
import Datatable from "../components/Datatable";
export default {
  name: "Masterkamar",
  components: {
    Toolbar,
    Banner,
    Formdialog,
    Datatable
  },
  data() {
    return {
      loadingData: true,
      key: false,
      validationRules: {
        nama: [v => !!v || "Nama kamar is required"],
        kelas: [v => !!v || "Kelas kamar is required"],
        lantai: [v => !!v || "Lantai kamar is required"],
        type: [v => !!v || "Type is required"]
      },
      formInput: {
        nama: "",
        lantai: null,
        kelas: null,
        type: null,
        kapasitas: "0",
        harga: "0"
      },
      editForm: {
        id: "",
        lantai: "",
        nama: ""
      },
      headerKamar: [
        { text: "Nama Kamar", value: "nama", align: "start" },
        { text: "Lantai Kamar", value: "lantai" },
        { text: "Actions", value: "actions", sortable: false },
        { text: "", value: "data-table-expand" }
      ],
      selectKelas: ["VVIP", "VIP", "SATU", "DUA", "TIGA"],
      successCreateAlert: false,
      successEditAlert: false
    };
  },
  computed: {
    masterKamar() {
      if (this.$store.state.masterKamar.length > 0) {
        return {
          header: this.headerKamar,
          data: this.$store.state.masterKamar
        };
      } else {
        return {
          header: this.headerKamar,
          data: []
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
    },
    masterLantai() {
      const lantai = this.$store.state.masterLantai.map(data => {
        return data.lantai;
      });
      return lantai;
    }
  },
  methods: {
    getMasterKamar(params) {
      this.loadingData = true;
      const newParams = {
        page: params.page,
        itemsPerPage: params.itemsPerPage,
        sortBy: params.sortBy[0],
        sortDesc: params.sortDesc[0],
        search: params.search
      };
      this.$store
        .dispatch("getMasterKamar", newParams)
        .then(() => {
          this.loadingData = false;
          this.key = true;
        })
        .catch(error => {
          console.log({ error });
          const errorStatus = { error }.error.response.status;
          if (errorStatus === 401) {
            this.$store.commit("TOKEN_UPDATE");
            this.$router.replace("/login");
            localStorage.clear();
          }
        });
    },
    resetFormInput() {
      this.formInput.nama = "";
      this.formInput.lantai = null;
      this.formInput.kelas = null;
      this.formInput.type = null;
      this.formInput.kapasitas = "0";
      this.formInput.harga = "0";
      this.successCreateAlert = true;
      setTimeout(() => {
        this.successCreateAlert = false;
      }, 3500);
    },
    inputEditKamar(item) {
      this.editForm.id = item.id;
      this.editForm.nama = item.nama;
      this.editForm.lantai = item.lantai;
    },
    editSuccess() {
      this.successEditAlert = true;
      setTimeout(() => {
        this.successEditAlert = false;
      }, 3500);
    }
  }
};
</script>

<style scoped>
.master-kamar {
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