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
      const master = this.btnTitle.slice(7);
      this.$store
        .dispatch(`createMaster${master}`, this.formInput)
        .then(() => {
          this.dialog = false;
          this.iserror = false;
          this.errormessage = " ";
          this.$emit(`create${master}Success`);
        })
        .catch(error => {
          this.isError = true;
          const errorKey = Object.keys(
            { error }.error.response.data.messages
          )[0];
          this.errorMessage = { error }.error.response.data.messages[errorKey];
        });
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