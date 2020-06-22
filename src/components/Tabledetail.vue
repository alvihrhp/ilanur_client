<template>
  <div id="table">
    <div class="loading" v-if="price.data.length === 0" style="text-align: center;">
      <img src="../assets/loading-action.gif" />
    </div>
    <v-data-table
      v-else
      dense
      :headers="price.header"
      :items="price.data"
      item-key="name"
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
              <img src="../assets/loading-action.gif" v-show="!buttonAction" />
              <v-btn color="blue darken-1" text @click="close" v-show="buttonAction">Cancel</v-btn>
              <v-btn color="blue darken-1" text @click="save" v-show="buttonAction">Save</v-btn>
            </v-card-actions>
            <v-alert v-if="isError" type="error">{{errorMessage}}</v-alert>
          </v-card>
        </v-dialog>
      </template>
      <template v-slot:item.actions="{ item }">
        <v-icon class="mr-2" @click="editItem(item)" color="#FFCC00">mdi-pencil</v-icon>
      </template>
    </v-data-table>
  </div>
</template>

<script>
export default {
  name: "Tabledetail",
  props: ["detail"],
  created() {
    let from = this.$route.name.split("").slice(6);
    from[0] = from[0].toUpperCase();
    from = from.join("");
    if (from === "Kamar") {
      this.$store.dispatch(`getHarga${from}`, this.detail.item.id);
    } else {
      this.$store.dispatch(
        `getHarga${from}`,
        this.detail.item[`${this.$route.name.slice(6)}_kode`]
      );
    }
  },
  data() {
    return {
      dialog: false,
      headerDoctor: [
        { text: "Type", value: "type" },
        { text: "Doctor Jasa", value: "doctor_jasa" },
        { text: "Doctor Pembagian", value: "doctor_pembagian" },
        { text: "Doctor On Call", value: "doctor_on_call" },
        { text: "Doctor On Visit", value: "doctor_on_visit" },
        { text: "Actions", value: "actions", sortable: false }
      ],
      headerTindakan: [
        {
          text: "Type",
          value: "type"
        },
        {
          text: "Tindakan Harga",
          value: "tindakan_harga"
        },
        {
          text: "Tindakan Sewa Alat",
          value: "tindakan_sewa_alat"
        },
        {
          text: "Tindakan Sewa Ruangan",
          value: "tindakan_sewa_ruangan"
        },
        {
          text: "Tindakan Jasa Paramedis",
          value: "tindakan_jasa_paramedis"
        },
        {
          text: "Tindakan Jasa Operator",
          value: "tindakan_jasa_operator"
        },
        {
          text: "Tindakan Jasa A Operator",
          value: "tindakan_jasa_aoperator"
        },
        { text: "Actions", value: "actions", sortable: false }
      ],
      headerLab: [
        {
          text: "Type",
          value: "type"
        },
        {
          text: "Harga Pemeriksaan",
          value: "harga_lab"
        },
        { text: "Actions", value: "actions", sortable: false }
      ],
      headerRonsen: [
        {
          text: "Type",
          value: "type"
        },
        {
          text: "Harga Pemeriksaan",
          value: "harga"
        },
        { text: "Actions", value: "actions", sortable: false }
      ],
      headerObat: [
        {
          text: "Type",
          value: "type"
        },
        {
          text: "Harga / Box",
          value: "harga_box"
        },
        {
          text: "Harga Satuan",
          value: "harga_satuan"
        },
        {
          text: "Actions",
          value: "actions",
          sortable: false
        }
      ],
      headerKamar: [
        {
          text: "Kelas",
          value: "kelas",
          align: "start"
        },
        {
          text: "Type",
          value: "type"
        },
        {
          text: "Kapasitas",
          value: "kapasitas"
        },
        {
          text: "Harga",
          value: "harga"
        },
        {
          text: "Actions",
          value: "actions",
          sortable: false
        }
      ],
      isError: false,
      errorMessage: "",
      buttonAction: true
    };
  },
  computed: {
    price() {
      let from = this.$route.name.split("").slice(6);
      from[0] = from[0].toUpperCase();
      from = from.join("");
      let header = [];
      if (this.$store.state[`harga${from}`].length > 0) {
        if (from === "Doctor") {
          header = this.headerDoctor;
        } else if (from === "Tindakan") {
          header = this.headerTindakan;
        } else if (from === "Lab") {
          header = this.headerLab;
        } else if (from === "Ronsen") {
          header = this.headerRonsen;
        } else if (from === "Obat") {
          header = this.headerObat;
        } else if (from === "Kamar") {
          header = this.headerKamar;
        }
        return {
          header,
          data: this.$store.state[`harga${from}`]
        };
      } else {
        return {
          header,
          data: []
        };
      }
    },
    formEditTitle() {
      let from = this.$route.name.split("").slice(6);
      from[0] = from[0].toUpperCase();
      from = from.join("");
      return `Edit Harga ${from}`;
    }
  },
  methods: {
    editItem(item) {
      this.$emit("getPrice", item);
      this.dialog = true;
    },
    save() {
      this.buttonAction = false;
      let from = this.$route.name.split("").slice(6);
      from[0] = from[0].toUpperCase();
      from = from.join("");
      this.$store
        .dispatch(`editHarga${from}`, this.detail.editForm)
        .then(() => {
          this.buttonAction = true;
          this.dialog = false;
          this.iserror = false;
          this.errormessage = " ";
          this.$emit("editHargaSuccess");
        })
        .catch(error => {
          this.buttonAction = true;
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
    close() {
      console.log("INI CLOSE");
      this.dialog = false;
      console.log(this.dialog);
    }
  }
};
</script>

<style scoped>
</style>
