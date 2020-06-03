<template>
  <v-dialog id="card-container" v-model="dialog" persistent max-width="600px">
    <template v-slot:activator="{ on }">
      <v-btn color="primary" dark v-on="on" class="btn-open-dialog">
        <v-icon left>{{btnIcon}}</v-icon>
        {{btnTitle}}
      </v-btn>
    </template>
    <v-card>
      <v-card-title>
        <span class="headline">{{btnTitle}}</span>
      </v-card-title>
      <v-card-text>
        <v-container>
          <v-row>
            <slot></slot>
          </v-row>
        </v-container>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="blue darken-1" text @click="dialog = false">Close</v-btn>
        <v-btn color="blue darken-1" text @click="saveButton">Save</v-btn>
      </v-card-actions>
      <v-alert v-if="isError" type="error">{{errorMessage}}</v-alert>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  name: "Formdialog",
  props: ["dialogDetail"],
  data() {
    return {
      dialog: false,
      btnIcon: this.dialogDetail.btnIcon,
      btnTitle: this.dialogDetail.btnTitle,
      isError: false,
      errorMessage: "",
      formInput: this.dialogDetail.formInput
    };
  },
  methods: {
    saveButton() {
      if (this.btnTitle === "Create Dokter") {
        this.$store
          .dispatch("createMasterDoctor", this.formInput)
          .then(() => {
            this.dialog = false;
            this.iserror = false;
            this.errormessage = " ";
          })
          .catch(error => {
            this.isError = true;
            this.errorMessage = { error }.error.response.data.messages.error;
          });
      } else if (this.btnTitle === "Create Tindakan") {
        this.$store
          .dispatch("createMasterTindakan", this.formInput)
          .then(() => {
            this.dialog = false;
            this.iserror = false;
            this.errormessage = " ";
          })
          .catch(error => {
            this.isError = true;
            this.errorMessage = { error }.error.response.data.messages.error;
          });
      } else if (this.btnTitle === "Create Lab") {
        this.$store
          .dispatch("createMasterLab", this.formInput)
          .then(() => {
            this.dialog = false;
            this.iserror = false;
            this.errormessage = " ";
          })
          .catch(error => {
            this.isError = true;
            this.errorMessage = { error }.error.response.data.messages.error;
          });
      } else if (this.btnTitle === "Create Ronsen") {
        this.$store
          .dispatch("createMasterRonsen", this.formInput)
          .then(() => {
            this.dialog = false;
            this.iserror = false;
            this.errormessage = " ";
          })
          .catch(error => {
            this.isError = true;
            this.errorMessage = { error }.error.response.data.messages.error;
          });
      } else if (this.btnTitle === "Create Obat") {
        this.$store
          .dispatch("createMasterObat", this.formInput)
          .then(() => {
            this.dialog = false;
            this.iserror = false;
            this.errormessage = " ";
          })
          .catch(error => {
            console.log({ error });
            this.isError = true;
            this.errorMessage = { error }.error.response.data.messages.error;
          });
      } else if (this.btnTitle === "Create Perusahaan") {
        this.$store
          .dispatch("createMasterPerusahaan", this.formInput)
          .then(() => {
            this.dialog = false;
            this.iserror = false;
            this.errormessage = " ";
          })
          .catch(error => {
            this.isError = true;
            this.errorMessage = { error }.error.response.data.messages.error;
          });
      } else if (this.btnTitle === "Create Asuransi") {
        this.$store
          .dispatch("createMasterAsuransi", this.formInput)
          .then(() => {
            this.dialog = false;
            this.iserror = false;
            this.errormessage = " ";
          })
          .catch(error => {
            this.isError = true;
            this.errorMessage = { error }.error.response.data.messages.error;
          });
      } else if (this.btnTitle === "Create Distributor") {
        this.$store
          .dispatch("createMasterDistributor", this.formInput)
          .then(() => {
            this.dialog = false;
            this.iserror = false;
            this.errormessage = " ";
          })
          .catch(error => {
            this.isError = true;
            this.errorMessage = { error }.error.response.data.messages.error;
          });
      } else if (this.btnTitle === "Create User") {
        this.$store
          .dispatch("createMasterUser", this.formInput)
          .then(() => {
            // this.dialog = false;
            // this.iserror = false;
            // this.errormessage = " ";
          })
          .catch(error => {
            console.log({ error });
            this.isError = true;
            this.errorMessage = { error }.error.response.data.messages.error;
          });
      }
    },
    scrollToEnd() {
      let container = this.$el.querySelector("#card-container");
      console.log(container);
      // container.scrollTop = container.scrollHeight;
    }
  }
};
</script>

<style scoped>
.btn-open-dialog {
  margin-bottom: 10px;
}

.v-alert {
  margin-bottom: 0px !important;
}
</style>