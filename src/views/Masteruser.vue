<template>
  <div class="master-user">
    <Banner
      v-bind:bannerDetail="{
        title: 'Master User',
        background: 'user.jpg'
    }"
    ></Banner>
    <div class="loading" v-if="masterUser.data.length === 0">
      <img src="../assets/loading.gif" />
    </div>
    <div class="data-table-container" v-else>
      <v-alert
        type="success"
        class="success-create-alert"
        v-show="successCreateAlert"
      >Create User Success</v-alert>
      <v-alert
        type="success"
        class="success-create-alert"
        v-show="successEditAlert"
      >Edit User Success</v-alert>
      <v-alert
        type="success"
        class="success-create-alert"
        v-show="successDeleteAlert"
      >Delete User Success</v-alert>
      <Formdialog
        v-bind:dialogDetail="{
        formInput,
        btnTitle: 'Create User',
        btnIcon: 'mdi-account'
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
        v-bind:dataTableDetail="{
          cardTitle: 'Table User',
          data: masterUser.data,
          header: masterUser.header,
          editDetail: editForm
      }"
        v-on:inputFormEdit="inputEditUser"
        v-on:editUserSuccess="successEdit"
        v-on:deleteUserSuccess="successDelete"
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
import Banner from "../components/Banner";
import Datatable from "../components/Datatable";
import Formdialog from "../components/Formdialog";
export default {
  name: "Masteruser",
  components: {
    Banner,
    Datatable,
    Formdialog
  },
  created() {
    this.$store.dispatch("getMasterUser");
  },
  data() {
    return {
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
      successDeleteAlert: false
    };
  },
  computed: {
    masterUser() {
      let header = [];
      if (this.$store.state.masterUser.length > 0) {
        this.$store.state.masterUser.forEach((user, index) => {
          Object.keys(user).forEach(key => {
            if (index === 0) {
              let objectHeader = {};
              if (
                key === "pusername" ||
                key === "pfirstname" ||
                key === "plastname" ||
                key === "role"
              ) {
                let newKey;
                let headerKey;
                if (key[0] === "p") {
                  newKey = key.slice(1).split("");
                  const nIndex = newKey.indexOf("n");
                  newKey[0] = newKey[0].toUpperCase();
                  newKey[nIndex] = newKey[nIndex].toUpperCase();
                  newKey.splice(nIndex, 0, " ");
                  headerKey = newKey.join("");
                  if (key === "pusername") {
                    objectHeader["text"] = headerKey;
                    objectHeader["value"] = key;
                    objectHeader["align"] = "start";
                    header.push(objectHeader);
                  } else {
                    objectHeader["text"] = headerKey;
                    objectHeader["value"] = key;
                    header.push(objectHeader);
                  }
                } else {
                  headerKey = key.replace("r", "R");
                  objectHeader["text"] = headerKey;
                  objectHeader["value"] = key;
                  header.push(objectHeader);
                }
              }
            }
          });
          if (index === 0) {
            header.push({ text: "Actions", value: "actions", sortable: false });
          }
        });
        return {
          data: this.$store.state.masterUser,
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