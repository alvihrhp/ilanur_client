<template>
  <div id="table">
    <div
      class="loading"
      v-if="data.data.length === 0"
      style="text-align: center"
    >
      <img src="../assets/loading-action.gif" />
    </div>
    <v-data-table
      v-else
      dense
      :headers="data.header"
      :items="data.data"
      item-key="name"
      class="elevation-1"
    >
      <template v-slot:top>
        <v-dialog v-model="dialog" max-width="500px">
          <v-card>
            <v-card-title>
              <span class="headline">Edit Detail</span>
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
              <v-btn
                color="blue darken-1"
                text
                @click="close"
                v-show="buttonAction"
                >Cancel</v-btn
              >
              <v-btn
                color="blue darken-1"
                text
                @click="save"
                v-show="buttonAction"
                >Save</v-btn
              >
            </v-card-actions>
            <v-alert v-if="isError" type="error">{{ errorMessage }}</v-alert>
          </v-card>
        </v-dialog>
      </template>
      <template v-slot:[`item.actions`]="{ item }">
        <v-icon class="mr-2" @click="editItem(item)" color="#FFCC00"
          >mdi-pencil</v-icon
        >
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
    } else if (from === "Iangudang") {
      this.$store.dispatch(
        "getPembelianGudangObat",
        this.detail.item.gudang_po_ID
      );
    } else if (from === "Pembeliangudang") {
      let tableExpandFor = this.detail.tableExpandFor.split("");
      tableExpandFor[0] = tableExpandFor[0].toUpperCase();
      tableExpandFor = tableExpandFor.join("");
      if (tableExpandFor === "GudangRrObat") {
        this.$store.dispatch(
          `get${tableExpandFor}`,
          this.detail.item.gudang_rr_ID
        );
      } else {
        this.$store.dispatch(
          `get${tableExpandFor}`,
          this.detail.item.gudang_retur_ID
        );
      }
    } else if (from === "Taanfarmasi") {
      this.$store.dispatch(
        `getPermintaanObatFarmasi`,
        this.detail.item.farmasi_order_ID
      );
    } else if (from === "Iorder") {
      this.$store.dispatch(
        `getFarmasiObatOrder`,
        this.detail.item.farmasi_order_ID
      );
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
        { text: "Actions", value: "actions", sortable: false },
      ],
      headerTindakan: [
        {
          text: "Type",
          value: "type",
        },
        {
          text: "Tindakan Harga",
          value: "tindakan_harga",
        },
        {
          text: "Tindakan Sewa Alat",
          value: "tindakan_sewa_alat",
        },
        {
          text: "Tindakan Sewa Ruangan",
          value: "tindakan_sewa_ruangan",
        },
        {
          text: "Tindakan Jasa Paramedis",
          value: "tindakan_jasa_paramedis",
        },
        {
          text: "Tindakan Jasa Operator",
          value: "tindakan_jasa_operator",
        },
        {
          text: "Tindakan Jasa A Operator",
          value: "tindakan_jasa_aoperator",
        },
        { text: "Actions", value: "actions", sortable: false },
      ],
      headerLab: [
        {
          text: "Type",
          value: "type",
        },
        {
          text: "Harga Pemeriksaan",
          value: "harga_lab",
        },
        { text: "Actions", value: "actions", sortable: false },
      ],
      headerRonsen: [
        {
          text: "Type",
          value: "type",
        },
        {
          text: "Harga Pemeriksaan",
          value: "harga",
        },
        { text: "Actions", value: "actions", sortable: false },
      ],
      headerObat: [
        {
          text: "Type",
          value: "type",
        },
        {
          text: "Harga / Box",
          value: "harga_box",
        },
        {
          text: "Harga Satuan",
          value: "harga_satuan",
        },
        {
          text: "Actions",
          value: "actions",
          sortable: false,
        },
      ],
      headerKamar: [
        {
          text: "Kelas",
          value: "kelas",
          align: "start",
        },
        {
          text: "Type",
          value: "type",
        },
        {
          text: "Kapasitas",
          value: "kapasitas",
        },
        {
          text: "Harga",
          value: "harga",
        },
        {
          text: "Actions",
          value: "actions",
          sortable: false,
        },
      ],
      headerPembelianGudang: [
        {
          text: "Nama Obat",
          value: "obat_nama",
          align: "start",
        },
        {
          text: "Quantity Obat",
          value: "gudang_po_obat_qty",
        },
        {
          text: "Harga Obat",
          value: "gudang_po_obat_price",
        },
        {
          text: "Total Harga Obat",
          value: "gudang_po_obat_total",
        },
        {
          text: "Status",
          value: "gudang_po_obat_status",
        },
        {
          text: "Actions",
          value: "actions",
          sortable: false,
        },
      ],
      headerGudangRr: [
        {
          text: "Nama Obat",
          value: "obat_nama",
          align: "start",
        },
        {
          text: "Quantity",
          value: "gudang_rr_obat_qty",
        },
        {
          text: "Price",
          value: "gudang_rr_obat_price",
        },
        {
          text: "Total",
          value: "gudang_rr_obat_total",
        },
        {
          text: "Kode Obat",
          value: "obat_kode",
        },
      ],
      headerGudangRetur: [
        {
          text: "Nama Obat",
          value: "obat_nama",
          align: "start",
        },
        {
          text: "Quantity",
          value: "gudang_retur_obat_qty",
        },
        {
          text: "Price",
          value: "gudang_retur_obat_price",
        },
        {
          text: "Total",
          value: "gudang_retur_obat_total",
        },
      ],
      headerPermintaanObatFarmasi: [
        {
          text: "Kode Obat",
          value: "obat_kode",
          align: "start",
        },
        {
          text: "Nama Obat",
          value: "obat_nama",
        },
        {
          text: "Quantity",
          value: "farmasi_order_obat_qty",
        },
        {
          text: "Status",
          value: "farmasi_order_obat_status",
        },
        {
          text: "Actions",
          value: "actions",
          sortable: false,
        },
      ],
      headerFarmasiObatOrder: [
        {
          text: "Kode Obat",
          value: "obat_kode",
          align: "start",
        },
        {
          text: "Nama Obat",
          value: "obat_nama",
        },
        {
          text: "Quantity",
          value: "farmasi_order_obat_qty",
        },
        {
          text: "Status",
          value: "farmasi_order_obat_status",
        },
      ],
      isError: false,
      errorMessage: "",
      buttonAction: true,
    };
  },
  computed: {
    data() {
      if (this.$store.state[`${this.detail.tableExpandFor}`].length > 0) {
        return {
          header: this[`${this.detail.tableExpandHeader}`],
          data: this.$store.state[`${this.detail.tableExpandFor}`],
        };
      } else {
        return {
          header: this[`${this.detail.tableExpandHeader}`],
          data: [],
        };
      }
    },
  },
  methods: {
    editItem(item) {
      this.$emit("getItem", item);
      this.dialog = true;
    },
    save() {
      this.buttonAction = false;
      console.log(this.detail.tableExpandUpdate);
      this.$store
        .dispatch(this.detail.tableExpandUpdate, this.detail.editForm)
        .then(() => {
          this.buttonAction = true;
          this.dialog = false;
          this.iserror = false;
          this.errormessage = " ";
          this.$emit("editSuccess");
        })
        .catch((error) => {
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
      this.dialog = false;
    },
  },
};
</script>

<style scoped>
</style>
