<template>
  <div class="master-type-obat">
    <Toolbar></Toolbar>
    <Banner
      v-bind:bannerDetail="{
        title: 'Master Type Obat',
        background: 'mastertypeobat.jpg',
      }"
    ></Banner>
    <div class="data-table-container">
      <v-alert
        type="success"
        class="success-create-alert"
        v-show="successCreateAlert"
        v-animate-css="'slideInDown'"
        >Create Type Obat Success</v-alert
      >
      <v-alert
        type="success"
        class="success-create-alert"
        v-show="successEditAlert"
        v-animate-css="'slideInDown'"
        >Edit Type Obat Success</v-alert
      >
      <Formdialog
        v-bind:dialogDetail="{
          from: 'TypeObat',
          formInput,
          btnIcon: 'mdi-flask',
          btnTitle: 'Create Master Type Obat',
          createAction: 'createMasterTypeObat',
        }"
        v-on:createTypeObatSuccess="showNotif"
      >
        <v-col cols="12" md="12">
          <v-text-field
            label="Tipe Obat Nama"
            v-model="formInput.masterTipeObatNama"
            :rules="validationRulesCreate.masterTipeObatNama"
          ></v-text-field>
        </v-col>
      </Formdialog>
      <Datatable
        :key="key"
        v-bind:dataTableDetail="{
          from: 'TypeObat',
          data: typeObat.data,
          header: typeObat.header,
          length: typeObat.length,
          itemKey: 'master_tipe_obat_nama',
          loadingData,
          buttonEdit: true,
          buttonDelete: false,
          cardTitle: 'Table Type Obat',
          editDetail: editForm,
          editAction: 'editMasterTypeObat',
        }"
        v-on:getData="getMasterTypeObat"
        v-on:inputFormEdit="inputEditTypeObat"
        v-on:editTypeObatSuccess="showNotifEdit"
      >
        <v-col cols="6" md="6">
          <v-text-field
            label="Tipe Obat Nama"
            v-model="editForm.masterTipeObatNama"
            :rules="validationRulesEdit.masterTipeObatNama"
          ></v-text-field>
        </v-col>
        <v-col cols="6" md="6">
          <v-select
            label="Tipe Obat Status"
            v-model="editForm.masterTipeObatStatus"
            :items="selectStatus"
          >
          </v-select>
        </v-col>
      </Datatable>
    </div>
  </div>
</template>

<script>
import Toolbar from "@/components/Toolbar";
import Banner from "@/components/Banner";
import Formdialog from "@/components/Formdialog";
import Datatable from "@/components/Datatable";
export default {
  name: "Mastertypeobat",
  components: {
    Toolbar,
    Banner,
    Formdialog,
    Datatable,
  },
  data() {
    return {
      header: [
        {
          text: "Tipe Obat Nama",
          value: "master_tipe_obat_nama",
          align: "start",
        },
        { text: "Tipe Obat Status", value: "master_tipe_obat_status" },
        { text: "Actions", value: "actions", sortable: false },
      ],
      loadingData: true,
      key: false,
      formInput: {
        masterTipeObatNama: "",
        masterTipeObatStatus: "ACTIVE",
      },
      validationRulesCreate: {
        masterTipeObatNama: [(v) => !!v || "Tipe Obat Nama cannot be empty"],
      },
      successCreateAlert: false,
      editForm: {
        realName: "",
        masterTipeObatNama: "",
        masterTipeObatStatus: "",
      },
      selectStatus: ["ACTIVE", "INACTIVE"],
      validationRulesEdit: {
        masterTipeObatNama: [(v) => !!v || "Tipe Obat Nama cannot be empty"],
      },
      successEditAlert: false,
    };
  },
  computed: {
    typeObat() {
      if (this.$store.state.masterTypeObat.length > 0) {
        return {
          data: this.$store.state.masterTypeObat,
          header: this.header,
          length: this.$store.state.totalMasterTypeObat,
        };
      } else {
        return {
          data: [],
          header: this.header,
          length: 0,
        };
      }
    },
  },
  methods: {
    getMasterTypeObat(params) {
      this.loadingData = true;
      const newParams = {
        page: params.page,
        itemsPerPage: params.itemsPerPage,
        sortBy: params.sortBy[0],
        sortDesc: params.sortDesc[0],
        search: params.search,
      };
      this.$store
        .dispatch("getMasterTypeObat", newParams)
        .then((_) => {
          this.loadingData = false;
          this.key = true;
        })
        .catch((error) => {
          const errorStatus = { error }.error.response.status;
          if (errorStatus === 401) {
            this.$store.commit("TOKEN_UPDATE");
            this.$router.replace("/login");
            localStorage.clear();
          }
        });
    },
    showNotif() {
      this.successCreateAlert = true;

      setTimeout(() => {
        this.successCreateAlert = false;
      }, 3000);
    },
    inputEditTypeObat(item) {
      this.editForm.realName = item.master_tipe_obat_nama;
      this.editForm.masterTipeObatNama = item.master_tipe_obat_nama;
      this.editForm.masterTipeObatStatus = item.master_tipe_obat_status;
    },
    showNotifEdit() {
      this.successEditAlert = true;

      setTimeout(() => {
        this.successEditAlert = false;
      }, 3000);
    },
  },
};
</script>

<style scoped>
.master-type-obat {
  background-color: #f5f5f5;
}

.data-table-container {
  padding: 50px;
}
</style>