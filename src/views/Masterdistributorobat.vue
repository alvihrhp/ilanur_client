<template>
  <div class="master-distributor-obat">
    <Toolbar></Toolbar>
    <Banner
      v-bind:bannerDetail="{
        title: 'Master Distributor Obat',
        background: 'distributorobat.jpg'
    }"
    ></Banner>
    <div class="data-table-container">
      <v-alert
        type="success"
        class="success-create-alert"
        v-show="successCreateAlert"
        v-animate-css="'slideInDown'"
      >Create Distributor Obat Success</v-alert>
      <v-alert
        type="success"
        class="success-create-alert"
        v-show="successEditAlert"
        v-animate-css="'slideInDown'"
      >Edit Distributor Obat Success</v-alert>
      <v-alert
        type="success"
        class="success-create-alert"
        v-show="successDeleteAlert"
        v-animate-css="'slideInDown'"
      >Delete Distributor Obat Success</v-alert>
      <Formdialog
        v-bind:dialogDetail="{
          from: 'DistributorObat',
          formInput,
          btnTitle: 'Create Distributor Obat',
          btnIcon: 'mdi-store',
          createAction: 'createMasterDistributorObat'
      }"
        v-on:createDistributorObatSuccess="resetFormInput"
      >
        <v-col cols="12" md="12" sm="12">
          <v-autocomplete
            v-model="formInput.distributor"
            :loading="loading"
            :items="masterDistributor"
            :search-input.sync="search"
            color="white"
            hide-no-data
            hide-selected
            cache-items
            flat
            label="Nama Distributor"
            solo-inverted
          ></v-autocomplete>
        </v-col>
        <v-col cols="12" md="12" sm="12">
          <v-card>
            <v-text-field
              v-model="searchObat"
              append-icon="mdi-magnify"
              label="search"
              single-line
              hide-details
              class="px-5 py-2"
            ></v-text-field>
            <v-data-table
              :key="key"
              v-model="formInput.selected"
              :headers="headerObat"
              :items="masterObat"
              :options.sync="options"
              :single-select="singleSelect"
              :server-items-length="obatLength"
              :loading="loadingData"
              item-key="obat_kode"
              show-select
            ></v-data-table>
          </v-card>
        </v-col>
      </Formdialog>
      <Datatable
        :key="keyData"
        v-bind:dataTableDetail="{
        from: 'DistributorObat',
        cardTitle: 'Table Distributor Obat',
        header: masterDistributorObat.header,
        data: masterDistributorObat.data,
        length: masterDistributorObat.length,
        buttonEdit: true,
        buttonDelete: true,
        loadingData,
        itemKey: 'distributor_obat_kode',
        editDetail: editForm,
        isExpanded: false,
        editAction: 'editMasterDistributorObat',
        deleteAction: 'deleteMasterDistributorObat',
      }"
        v-on:inputFormEdit="inputEditObatDistributor"
        v-on:getData="getMasterDistributorObat"
        v-on:editDistributorObatSuccess="editSuccess"
        v-on:deleteDistributorObatSuccess="deleteSuccess"
      >
        <v-col cols="12" md="12" sm="12">
          <v-text-field
            label="Harga Obat"
            v-model="editForm.harga"
            :rules="validationRules.harga"
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
  name: "Masterdistributorobat",
  components: {
    Toolbar,
    Banner,
    Datatable,
    Formdialog
  },
  data() {
    return {
      successCreateAlert: false,
      successEditAlert: false,
      successDeleteAlert: false,
      loadingData: true,
      keyData: false,
      key: false,
      singleSelect: false,
      loading: false,
      options: {},
      masterDistributor: [],
      searchObat: "",
      obatLength: 0,
      masterObat: [],
      search: null,
      formInput: {
        distributor: null,
        selected: []
      },
      headerDistributorObat: [
        {
          text: "Nama Distributor",
          value: "master_distributor_nama",
          align: "start"
        },
        { text: "Nama Obat", value: "obat_nama" },
        { text: "Harga Obat", value: "harga_obat" },
        { text: "Date", value: "date" },
        { text: "Petugas", value: "petugas" },
        { text: "Actions", value: "actions", sortable: false }
      ],
      headerObat: [
        {
          text: "Nama Obat",
          value: "obat_nama",
          align: "start"
        },
        { text: "Obat Hnappn", value: "obat_hnappn" }
      ],
      editForm: {
        distributorObatKode: null,
        harga: ""
      },
      validationRules: {
        harga: [v => !!v || "Harga cannot be empty"]
      }
    };
  },
  watch: {
    search(val) {
      if (val && val !== this.select) {
        this.loading = true;
        const newParams = {
          page: "1",
          itemsPerPage: "-1",
          sortBy: "undefined",
          sortDesc: "undefined",
          search: val
        };
        this.$store
          .dispatch("getMasterDistributor", newParams)
          .then(() => {
            this.loading = false;
            this.masterDistributor = this.$store.state.masterDistributor.map(
              distributor => {
                return distributor.master_distributor_nama;
              }
            );
          })
          .catch(error => {
            const errorStatus = { error }.error.response.status;
            if (errorStatus === 401) {
              this.$store.commit("TOKEN_UPDATE");
              this.$router.replace("/login");
              localStorage.clear();
            }
          });
      }
    },
    params: {
      handler() {
        this.loadingData = true;
        const newParams = {
          page: this.params.page,
          itemsPerPage: this.params.itemsPerPage,
          sortBy: this.params.sortBy[0],
          sortDesc: this.params.sortDesc[0],
          search: this.params.search
        };
        this.$store
          .dispatch("getMasterObat", newParams)
          .then(() => {
            this.loadingData = false;
            this.key = true;
            this.masterObat = this.$store.state.masterObat;
            this.obatLength = this.$store.state.totalMasterObat;
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
      deep: true
    }
  },
  computed: {
    params() {
      return {
        ...this.options,
        search: this.searchObat
      };
    },
    masterDistributorObat() {
      if (this.$store.state.masterDistributorObat.length > 0) {
        return {
          header: this.headerDistributorObat,
          data: this.$store.state.masterDistributorObat,
          length: this.$store.state.totalMasterDistributorObat
        };
      } else {
        return {
          header: this.headerDistributorObat,
          data: [],
          length: 0
        };
      }
    }
  },
  methods: {
    getMasterDistributorObat(params) {
      this.loadingData = true;
      const newParams = {
        page: params.page,
        itemsPerPage: params.itemsPerPage,
        sortBy: params.sortBy[0],
        sortDesc: params.sortDesc[0],
        search: params.search
      };
      this.$store
        .dispatch("getMasterDistributorObat", newParams)
        .then(() => {
          this.loadingData = false;
          this.keyData = true;
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
      this.formInput.distributor = null;
      this.formInput.selected = [];
      this.successCreateAlert = true;

      setTimeout(() => {
        this.successCreateAlert = false;
      }, 3500);
    },
    inputEditObatDistributor(data) {
      this.editForm.distributorObatKode = data.distributor_obat_kode;
      this.editForm.harga = data.harga_obat;
    },
    editSuccess() {
      this.successEditAlert = true;

      setTimeout(() => {
        this.successEditAlert = false;
      }, 3500);
    },
    deleteSuccess() {
      this.successDeleteAlert = true;

      setTimeout(() => {
        this.successDeleteAlert = false;
      }, 3500);
    }
  }
};
</script>

<style scoped>
.master-distributor-obat {
  background-color: #f5f5f5;
}

.data-table-container {
  padding: 50px;
}
</style>