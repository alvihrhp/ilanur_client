<template>
  <v-dialog v-model="dialog" persistent max-width="600px">
    <template v-slot:activator="{ on }">
      <v-btn color="primary" dark v-on="on" class="btn-open-dialog">
        <v-icon left>{{ btnIcon }}</v-icon>
        {{ btnTitle }}
      </v-btn>
    </template>
    <v-card id="card-dialog">
      <v-card-title>
        <span class="headline">{{ btnTitle }}</span>
      </v-card-title>
      <div class="subtitle" v-if="subTitle === true">
        <h4>{{ subTitleText }}</h4>
      </div>
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
        <v-btn
          color="blue darken-1"
          text
          @click="dialog = false"
          v-show="actionButton"
          >Close</v-btn
        >
        <v-btn
          color="blue darken-1"
          text
          @click="saveButton"
          v-show="actionButton"
          >Save</v-btn
        >
      </v-card-actions>
      <v-alert v-if="isError" type="error">{{ errorMessage }}</v-alert>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  name: "Formdialog",
  props: ["dialogDetail"],
  data() {
    return {
      from: this.dialogDetail.from,
      dialog: false,
      btnIcon: this.dialogDetail.btnIcon,
      btnTitle: this.dialogDetail.btnTitle,
      isError: false,
      errorMessage: "",
      formInput: this.dialogDetail.formInput,
      actionButton: true,
      createAction: this.dialogDetail.createAction,
      subTitle: this.dialogDetail.subTitle,
      subTitleText: this.dialogDetail.subTitleText,
    };
  },
  methods: {
    saveButton() {
      this.$store
        .dispatch(this.createAction, this.formInput)
        .then(() => {
          this.actionButton = true;
          this.dialog = false;
          this.iserror = false;
          this.errormessage = " ";
          this.$emit(`create${this.from}Success`);
        })
        .catch((error) => {
          console.log({ error });
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
    },
  },
};
</script>

<style scoped>
.btn-open-dialog {
  margin-bottom: 10px;
}

.v-alert {
  margin-bottom: 0px !important;
}

.subtitle {
  padding: 3px 24px 3px;
}

.subtitle h4 {
  font-weight: 300;
}
</style>