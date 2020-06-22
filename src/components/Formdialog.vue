<template>
  <v-dialog v-model="dialog" persistent max-width="600px">
    <template v-slot:activator="{ on }">
      <v-btn color="primary" dark v-on="on" class="btn-open-dialog">
        <v-icon left>{{btnIcon}}</v-icon>
        {{btnTitle}}
      </v-btn>
    </template>
    <v-card id="card-dialog">
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
        <img v-show="!actionButton" src="../assets/loading-action.gif" />
        <v-btn color="blue darken-1" text @click="dialog = false" v-show="actionButton">Close</v-btn>
        <v-btn color="blue darken-1" text @click="saveButton" v-show="actionButton">Save</v-btn>
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
      formInput: this.dialogDetail.formInput,
      actionButton: true
    };
  },
  methods: {
    saveButton() {
      const master = this.btnTitle.slice(7);
      this.actionButton = false;
      let action;
      if (master === "Price") {
        let from = this.$route.name.slice(6).split("");
        from[0] = from[0].toUpperCase();
        from = from.join("");
        action = `createHarga${from}`;
      } else {
        action = `createMaster${master}`;
      }
      this.$store
        .dispatch(`${action}`, this.formInput)
        .then(() => {
          this.actionButton = true;
          this.dialog = false;
          this.iserror = false;
          this.errormessage = " ";
          if (master === "Price") {
            this.$emit(`createHargaSuccess`);
          } else {
            this.$emit(`create${master}Success`);
          }
        })
        .catch(error => {
          this.actionButton = true;
          this.isError = true;
          const errorKey = Object.keys(
            { error }.error.response.data.messages
          )[0];
          this.errorMessage = { error }.error.response.data.messages[errorKey];
          const errorStatus = { error }.error.response.status;
          if (errorStatus === 401) {
            this.$store.commit("TOKEN_UPDATE");
            this.$router.replace("/login");
            localStorage.clear();
            this.isError = false;
          }
        });
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