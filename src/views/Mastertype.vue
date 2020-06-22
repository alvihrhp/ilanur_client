<template>
  <div class="master-type">
    <Banner
      v-bind:bannerDetail="{ 
        background: 'detailprice.jpeg',
        title: 'Master Type'
    }"
    ></Banner>
    <div class="data-table-container">
      <v-alert
        type="success"
        class="success-create-alert"
        v-show="successCreateAlert"
        v-animate-css="'slideInDown'"
      >Create Type Success</v-alert>
      <v-alert
        type="success"
        class="success-create-alert"
        v-show="successEditAlert"
        v-animate-css="'slideInDown'"
      >Edit Type Success</v-alert>
      <Formdialog
        v-bind:dialogDetail="{
          formInput,
          btnTitle: 'Create Type',
          btnIcon: 'mdi-content-paste'
      }"
        v-on:createTypeSuccess="resetFormInput"
      >
        <v-col cols="6" md="6" sm="6">
          <v-text-field
            label="Name"
            v-model="formInput.name"
            :rules="validationRules.name"
            required
          ></v-text-field>
        </v-col>
        <v-col cols="6" md="6" sm="6">
          <v-select
            label="Status"
            v-model="formInput.status"
            :rules="validationRules.status"
            :items="selectStatus"
            required
          ></v-select>
        </v-col>
      </Formdialog>
      <Datatable
        v-bind:dataTableDetail="{
          data: masterType.data,
          header: masterType.header,
          cardTitle: 'Table Type',
          buttonEdit: true,
          buttonDelete: false,
          editDetail: editFormInput,
          itemKey:'name'
      }"
        v-on:inputFormEdit="inputEditType"
        v-on:editTypeSuccess="successEdit"
      >
        <v-col cols="6" md="6" sm="6">
          <v-text-field
            label="Name"
            v-model="editFormInput.name"
            :rules="validationRules.name"
            required
          ></v-text-field>
        </v-col>
        <v-col cols="6" md="6" sm="6">
          <v-select
            label="Status"
            v-model="editFormInput.status"
            :rules="validationRules.status"
            :items="selectStatus"
            required
          ></v-select>
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
  name: "Mastertype",
  components: {
    Banner,
    Datatable,
    Formdialog
  },
  computed: {
    masterType() {
      if (this.$store.state.masterType.length > 0) {
        console.log(this.$store.state.masterType);
        return {
          header: this.header,
          data: this.$store.state.masterType,
          length: this.$store.state.totalMasterType
        };
      } else {
        return {
          header: this.header,
          data: [],
          length: 0
        };
      }
    }
  },
  data() {
    return {
      header: [
        {
          text: "Name",
          value: "name",
          align: "start"
        },
        {
          text: "Status",
          value: "status"
        },
        {
          text: "Actions",
          value: "actions",
          sortable: false
        }
      ],
      formInput: {
        name: "",
        status: ""
      },
      validationRules: {
        name: [v => !!v || "Name cannot be empty"],
        status: [v => !!v || "Status cannot be empty"]
      },
      editFormInput: {
        name: "",
        status: "",
        originalName: ""
      },
      selectStatus: ["AKTIF", "TIDAK AKTIF"],
      successCreateAlert: false,
      successEditAlert: false
    };
  },
  methods: {
    inputEditType(item) {
      this.editFormInput.name = item.name;
      this.editFormInput.status = item.status;
      this.editFormInput.originalName = item.name;
    },
    resetFormInput() {
      this.formInput.name = "";
      this.formInput.status = null;
      this.successCreateAlert = true;
      setTimeout(() => {
        this.successCreateAlert = false;
      }, 3500);
    },
    successEdit() {
      this.successEditAlert = true;
      setTimeout(() => {
        this.successEditAlert = false;
      }, 3500);
    }
  }
};
</script>

<style scoped>
.master-type {
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