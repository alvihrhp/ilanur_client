<template>
  <v-card>
    <v-card-title>
      {{title}}
      <v-spacer></v-spacer>
      <v-text-field
        v-model="search"
        append-icon="mdi-magnify"
        label="search"
        single-line
        hide-details
      ></v-text-field>
    </v-card-title>
    <v-data-table
      :headers="headers"
      :items="data"
      :items-per-page="10"
      :search="search"
      class="elevation-1"
    >
      <template v-slot:top>
        <v-dialog v-model="dialog" max-width="500px">
          <v-card>
            <v-card-title>
              <span class="headline">{{formEditTitle}}</span>
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
              <v-btn color="blue darken-1" text @click="close">Cancel</v-btn>
              <v-btn color="blue darken-1" text @click="save">Save</v-btn>
            </v-card-actions>
            <v-alert v-if="isError" type="error">{{errorMessage}}</v-alert>
          </v-card>
        </v-dialog>
      </template>
      <template v-slot:item.actions="{ item }">
        <v-icon small class="mr-2" @click="editItem(item)" color="#22bb33">mdi-pencil</v-icon>
        <v-icon small @click="deleteItem(item)" color="#bb2124">mdi-delete</v-icon>
      </template>
    </v-data-table>
  </v-card>
</template>

<script>
import swal from "sweetalert2";

export default {
  name: "Datatable",
  props: ["dataTableDetail"],
  data() {
    return {
      headers: this.dataTableDetail.header,
      search: "",
      title: this.dataTableDetail.cardTitle,
      dialog: false,
      editForm: this.dataTableDetail.editDetail,
      isError: false,
      errorMessage: ""
    };
  },
  computed: {
    formEditTitle() {
      return "Edit" + this.title.slice(5);
    },
    data() {
      return this.dataTableDetail.data;
    }
  },
  methods: {
    editItem(item) {
      this.dialog = true;
      this.$emit("inputFormEdit", item);
    },
    save() {
      const master = this.title.slice(6);
      this.$store
        .dispatch(`editMaster${master}`, this.editForm)
        .then(() => {
          this.dialog = false;
          this.isError = false;
          this.errorMessage = "";
          this.$emit(`edit${master}Success`);
        })
        .catch(error => {
          this.isError = true;
          const errorKey = Object.keys(
            { error }.error.response.data.messages
          )[0];
          this.errorMessage = { error }.error.response.data.messages[errorKey];
        });
    },
    close() {
      this.dialog = false;
    },
    deleteItem(item) {
      const master = this.title.slice(6);
      swal
        .fire({
          title: "Are you sure?",
          text: "You won't be able to revert this!",
          icon: "warning",
          showCancelButton: true,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          confirmButtonText: "Yes, delete it!"
        })
        .then(result => {
          if (result.value) {
            return this.$store.dispatch(`deleteMaster${master}`, item);
          } else {
            throw null;
          }
        })
        .then(() => {
          console.log("masuk");
          this.$emit(`delete${master}Success`);
        })
        .catch(error => {
          console.log({ error });
          const errorKey = Object.keys(
            { error }.error.response.data.messages
          )[0];
          const errorMessage = { error }.error.response.data.messages[errorKey];
        });
    }
  }
};
</script>

