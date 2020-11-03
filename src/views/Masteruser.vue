<template>
  <div class="master-user">
    <Toolbar></Toolbar>
    <Banner
      v-bind:bannerDetail="{
        title: 'Master User',
        background: 'user.jpg'
    }"
    ></Banner>
    <div class="data-table-container">
      <v-alert
        type="success"
        class="success-create-alert"
        v-show="successCreateAlert"
        v-animate-css="'slideInDown'"
      >Create User Success</v-alert>
      <v-alert
        type="success"
        class="success-create-alert"
        v-show="successEditAlert"
        v-animate-css="'slideInDown'"
      >Edit User Success</v-alert>
      <v-alert
        type="success"
        class="success-create-alert"
        v-show="successDeleteAlert"
        v-animate-css="'slideInDown'"
      >Delete User Success</v-alert>
      <Formdialog
        v-bind:dialogDetail="{
        from: 'User',
        formInput,
        btnTitle: 'Create User',
        btnIcon: 'mdi-account',
        createAction: 'createMasterUser'
      }"
        v-on:createUserSuccess="resetFormInput"
      >
        <v-col cols="6" sm="6" md="6">
          <v-text-field
            label="Username"
            v-model="formInput.pUsername"
            :rules="validationRules.pUsername"
            required
          ></v-text-field>
        </v-col>
        <v-col cols="6" sm="6" md="6">
          <v-text-field
            label="Password"
            v-model="formInput.pPassword"
            :rules="validationRules.pPassword"
            type="password"
            required
          ></v-text-field>
        </v-col>
        <v-col cols="6" sm="6" md="6">
          <v-text-field
            label="First Name"
            v-model="formInput.pFirstName"
            :rules="validationRules.pFirstName"
            required
          ></v-text-field>
        </v-col>
        <v-col cols="6" sm="6" md="6">
          <v-text-field
            label="Last Name"
            v-model="formInput.pLastName"
            :rules="validationRules.pLastName"
            required
          ></v-text-field>
        </v-col>
        <v-col cols="6" sm="6" md="6">
          <v-select
            label="Role"
            v-model="formInput.role"
            :rules="validationRules.role"
            :items="selectRole"
            required
          ></v-select>
        </v-col>
        <v-col cols="6" sm="6" md="6">
          <v-select
            label="Location"
            v-model="formInput.location"
            :rules="validationRules.location"
            :items="selectLocation"
            required
          ></v-select>
        </v-col>
      </Formdialog>
      <Datatable
        :key="key"
        v-bind:dataTableDetail="{
          from: 'User',
          cardTitle: 'Table User',
          data: masterUser.data,
          header: masterUser.header,
          length: masterUser.length,
          editDetail: editForm,
          buttonEdit: true,
          buttonDelete: true,
          loadingData,
          itemKey: 'user_ID',
          isExpanded: false,
          editAction: 'editMasterUser',
          deleteAction: 'deleteMasterUser',
      }"
        v-on:inputFormEdit="inputEditUser"
        v-on:editUserSuccess="successEdit"
        v-on:deleteUserSuccess="successDelete"
        v-on:getData="getMasterUser"
      >
        <v-col cols="6" sm="6" md="6">
          <v-text-field
            label="Username"
            v-model="editForm.pUsername"
            :rules="validationRules.pUsername"
            required
          ></v-text-field>
        </v-col>
        <v-col cols="6" sm="6" md="6">
          <v-text-field
            label="Password"
            v-model="editForm.pPassword"
            :rules="validationRules.pPassword"
            type="password"
            required
          ></v-text-field>
        </v-col>
        <v-col cols="6" sm="6" md="6">
          <v-text-field
            label="First Name"
            v-model="editForm.pFirstName"
            :rules="validationRules.pFirstName"
            required
          ></v-text-field>
        </v-col>
        <v-col cols="6" sm="6" md="6">
          <v-text-field
            label="Last Name"
            v-model="editForm.pLastName"
            :rules="validationRules.pLastName"
            required
          ></v-text-field>
        </v-col>
        <v-col cols="6" sm="6" md="6">
          <v-select
            label="Role"
            v-model="editForm.role"
            :rules="validationRules.role"
            :items="selectRole"
            required
          ></v-select>
        </v-col>
        <v-col cols="6" sm="6" md="6">
          <v-select
            label="Location"
            v-model="editForm.location"
            :rules="validationRules.location"
            :items="selectLocation"
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
import Datatable from "../components/Datatable";
import Formdialog from "../components/Formdialog";
export default {
  name: "Masteruser",
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
        pUsername: [v => !!v || "Username is required"],
        pPassword: [v => !!v || "Password is required"],
        pFirstName: [v => !!v || "First Name is required"],
        pLastName: [v => !!v || "Last Name is required"],
        role: [v => !!v || "Role is required"],
        location: [v => !!v || "Location is required"]
      },
      formInput: {
        pUsername: "",
        pPassword: "",
        pFirstName: "",
        pLastName: "",
        role: null,
        location: null
      },
      selectRole: [
        "admin",
        "gudang",
        "farmasi",
        "resepsionis",
        "paramedis",
        "laboratorium",
        "radiologis"
      ],
      selectLocation: ["PUSAT"],
      successCreateAlert: false,
      editForm: {
        pUsername: "",
        pPassword: "",
        pFirstName: "",
        pLastName: "",
        role: null,
        location: null,
        originalID: "",
        originalUsername: ""
      },
      successEditAlert: false,
      successDeleteAlert: false,
      header: [
        { text: "Username", value: "pusername", align: "start" },
        { text: "First Name", value: "pfirstname" },
        { text: "Last Name", value: "plastname" },
        { text: "role", value: "role" },
        { text: "location", value: "location" },
        { text: "Actions", value: "actions", sortable: false }
      ]
    };
  },
  computed: {
    masterUser() {
      let header = [];
      if (this.$store.state.masterUser.length > 0) {
        return {
          data: this.$store.state.masterUser,
          header: this.header,
          length: this.$store.state.totalMasterUser
        };
      } else {
        return {
          data: [],
          header: this.header,
          length: 0
        };
      }
    }
  },
  methods: {
    getMasterUser(params) {
      this.loadingData = true;
      const newParams = {
        page: params.page,
        itemsPerPage: params.itemsPerPage,
        sortBy: params.sortBy[0],
        sortDesc: params.sortDesc[0],
        search: params.search
      };
      this.$store
        .dispatch("getMasterUser", newParams)
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
      this.formInput.pUsername = "";
      this.formInput.pPassword = "";
      this.formInput.pFirstName = "";
      this.formInput.pLastName = "";
      this.formInput.role = null;
      this.formInput.location = null;
      this.successCreateAlert = true;
      setTimeout(() => {
        this.successCreateAlert = false;
      }, 3000);
    },
    inputEditUser(user) {
      this.editForm.pUsername = user.pusername;
      this.editForm.pFirstName = user.pfirstname;
      this.editForm.pLastName = user.plastname;
      this.editForm.role = user.role;
      this.editForm.location = user.location;
      this.editForm.originalID = user.user_ID;
      this.editForm.originalUsername = user.pusername;
    },
    successEdit() {
      this.successEditAlert = true;
      this.editForm.pPassword = "";
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
.master-user {
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