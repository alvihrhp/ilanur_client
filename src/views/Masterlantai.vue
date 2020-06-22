<template>
  <div class="master-lantai">
    <Toolbar></Toolbar>
    <Banner
      v-bind:bannerDetail="{
        title: 'Master Lantai',
        background: 'lantai.jpeg'
    }"
    ></Banner>
    <div class="loading" v-if="masterLantai.data.length === 0">
      <img src="../assets/loading.gif" />
    </div>
    <div class="data-table-container" v-else>
      <v-alert
        type="success"
        class="success-create-alert"
        v-show="successCreateAlert"
        v-animate-css="'slideInDown'"
      >Create Lantai Success</v-alert>
      <v-alert
        type="success"
        class="success-create-alert"
        v-show="successEditAlert"
        v-animate-css="'slideInDown'"
      >Edit Lantai Success</v-alert>
      <Formdialog
        v-bind:dialogDetail="{
          formInput,
          btnTitle: 'Create Lantai',
          btnIcon: 'mdi-elevation-rise'
      }"
        v-on:createLantaiSuccess="resetFormInput"
      >
        <v-col cols="12" md="12" sm="12">
          <v-text-field
            label="Lantai"
            v-model="formInput.lantai"
            :rules="validationRules.lantai"
            required
          ></v-text-field>
        </v-col>
      </Formdialog>
      <Datatable
        v-bind:dataTableDetail="{
          header: masterLantai.header,
          data: masterLantai.data,
          cardTitle: 'Table Lantai',
          editDetail: editForm,
          buttonEdit: true,
          buttonDelete: false
      }"
        v-on:inputFormEdit="inputEditLantai"
        v-on:editLantaiSuccess="editSuccess"
      >
        <v-col cols="12" md="12" sm="12">
          <v-text-field
            label="Lantai"
            v-model="editForm.lantai"
            :rules="validationRules.lantai"
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
import Formdialog from "../components/Formdialog";
import Datatable from "../components/Datatable";
export default {
  name: "Masterlantai",
  components: {
    Toolbar,
    Banner,
    Formdialog,
    Datatable
  },
  data() {
    return {
      validationRules: {
        lantai: [v => !!v || "Lantai is required"]
      },
      formInput: {
        lantai: ""
      },
      editForm: {
        lantai: "",
        originalLantai: ""
      },
      header: [
        {
          text: "Lantai",
          value: "lantai",
          align: "start"
        },
        {
          text: "Actions",
          value: "actions",
          sortable: false
        }
      ],
      successCreateAlert: false,
      successEditAlert: false
    };
  },
  computed: {
    masterLantai() {
      if (this.$store.state.masterLantai.length > 0) {
        return {
          header: this.header,
          data: this.$store.state.masterLantai
        };
      } else {
        return {
          header: this.header,
          data: []
        };
      }
    }
  },
  methods: {
    resetFormInput() {
      this.formInput.lantai = "";
      this.successCreateAlert = true;
      setTimeout(() => {
        this.successCreateAlert = false;
      }, 3500);
    },
    inputEditLantai(item) {
      this.editForm.lantai = item.lantai;
      this.editForm.originalLantai = item.lantai;
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
.master-lantai {
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