<template>
  <div class="farmasi-order">
    <Toolbar></Toolbar>
    <Banner
      v-bind:bannerDetail="{
        title: 'Farmasi Order',
        background: 'farmasiorder.jpg',
      }"
    ></Banner>
    <div class="data-table-container">
      <v-alert
        type="success"
        class="success-create-alert"
        v-show="successCreateAlert"
        v-animate-css="'slideInDown'"
        >Create Farmasi Order Success</v-alert
      >
      <Formdialog
        v-bind:dialogDetail="{
          from: 'FarmasiOrder',
          formInput,
          btnTitle: 'Create Farmasi Order',
          btnIcon: 'mdi-basket',
          createAction: 'createFarmasiOrder',
        }"
        v-on:createFarmasiOrderSuccess="showNotif"
      >
        <v-col cols="12" md="12">
          <v-card>
            <v-text-field
              v-model="searchGudangAll"
              append-icon="mdi-magnify"
              label="search"
              single-line
              hide-details
              class="px-5 py-2"
            ></v-text-field>
            <v-data-table
              :key="keyGudangObat"
              v-on:item-selected="obatSelected"
              v-model="formInput.selected"
              :headers="gudangObat.header"
              :items="gudangObat.data"
              :options.sync="options"
              :single-select="singleSelect"
              :server-items-length="gudangObat.length"
              :loading-data="loadingGudangObat"
              item-key="gudang_ID"
              show-select
            >
              <template v-slot:top>
                <v-dialog v-model="dialogFarmasiOrder" max-width="500px">
                  <v-card>
                    <v-card-title>
                      <span class="headline">Detail Pembelian</span>
                    </v-card-title>

                    <v-card-text>
                      <v-container>
                        <v-row>
                          <v-col cols="12" md="12">
                            <v-text-field
                              v-model="formInputFarmasiOrder.quantity"
                              :rules="validationRules.quantity"
                              label="Obat Quantity"
                              required
                            ></v-text-field>
                          </v-col>
                        </v-row>
                      </v-container>
                    </v-card-text>

                    <v-card-actions>
                      <v-spacer></v-spacer>
                      <v-btn
                        color="blue darken-1"
                        text
                        @click="closeDialogFarmasiOrder"
                        >Cancel</v-btn
                      >
                      <v-btn
                        color="blue darken-1"
                        text
                        @click="saveFarmasiOrder"
                        >Save</v-btn
                      >
                    </v-card-actions>
                  </v-card>
                </v-dialog>
              </template>
            </v-data-table>
          </v-card>
        </v-col>
      </Formdialog>
      <Datatable
        :key="key"
        v-bind:dataTableDetail="{
          from: 'FarmasiOrder',
          data: farmasiOrder.data,
          header: farmasiOrder.header,
          length: farmasiOrder.length,
          itemKey: 'farmasi_order_ID',
          loadingData,
          buttonEdit: false,
          buttonDelete: false,
          cardTitle: 'Table Farmasi Order',
          isExpanded: true,
          tableExpandFor: 'farmasiObatOrder',
          tableExpandHeader: 'headerFarmasiObatOrder',
        }"
        v-on:getData="getFarmasiOrder"
      >
      </Datatable>
    </div>
  </div>
</template>

<script>
import Toolbar from "@/components/Toolbar";
import Banner from "@/components/Banner";
import Formdialog from "@/components/Formdialog";
import Datatable from "@/components/Datatable";
export default {
  name: "Farmasiorder",
  components: {
    Toolbar,
    Banner,
    Formdialog,
    Datatable,
  },
  data() {
    return {
      loadingData: true,
      key: false,
      header: [
        { text: "Order ID", value: "farmasi_order_ID", align: "start" },
        { text: "Order Date", value: "farmasi_order_date" },
        { text: "Order Petugas", value: "farmasi_order_petugas" },
        { text: "Order Status", value: "farmasi_order_status" },
        { text: "", value: "data-table-expand" },
      ],
      formInput: {
        farmasi_order_status: "PENDING",
        selected: [],
      },
      keyGudangObat: false,
      headerGudangObat: [
        { text: "Nama Obat", value: "obat_nama", align: "start" },
        { text: "Stock Gudang", value: "gudang_stock" },
      ],
      options: {},
      singleSelect: false,
      loadingGudangObat: true,
      searchGudangAll: "",
      dialogFarmasiOrder: false,
      formInputFarmasiOrder: {
        inputtedId: "",
        quantity: 0,
      },
      validationRules: {
        quantity: [(v) => !!v || "Quantity cannot be empty"],
      },
      successCreateAlert: false,
      editForm: {
        farmasi_order_status: "APPROVED",
      },
    };
  },
  watch: {
    params: {
      handler() {
        this.loadingGudangObat = true;
        const newParams = {
          page: this.params.page,
          itemsPerPage: this.params.itemsPerPage,
          sortBy: this.params.sortBy[0],
          sortDesc: this.params.sortDesc[0],
          search: this.params.search,
        };
        this.$store
          .dispatch("getListGudangAll", newParams)
          .then((_) => {
            this.keyGudangObat = true;
            this.loadingGudangObat = false;
          })
          .catch((error) => {
            console.log({ error });
            const errorStatus = { error }.error.response.status;
            if (errorStatus === 401) {
              this.$store.commit("TOKEN_UPDATE");
              this.$router.replace("/login");
              localStorage.clear();
            }
          });
      },
      deep: true,
    },
  },
  computed: {
    farmasiOrder() {
      if (this.$store.state.farmasiOrder.length > 0) {
        return {
          data: this.$store.state.farmasiOrder,
          header: this.header,
          length: this.$store.state.totalFarmasiOrder,
        };
      } else {
        return {
          data: [],
          header: this.header,
          length: 0,
        };
      }
    },
    gudangObat() {
      if (this.$store.state.listGudangAll.length > 0) {
        return {
          data: this.$store.state.listGudangAll,
          header: this.headerGudangObat,
          length: this.$store.state.totalListGudangAll,
        };
      } else {
        return {
          data: [],
          header: this.headerGudangObat,
          length: 0,
        };
      }
    },
    params() {
      return {
        ...this.options,
        search: this.searchGudangAll,
      };
    },
  },
  methods: {
    getFarmasiOrder(params) {
      this.loadingData = true;
      const newParams = {
        page: params.page,
        itemsPerPage: params.itemsPerPage,
        sortBy: params.sortBy[0],
        sortDesc: params.sortDesc[0],
        search: params.search,
      };
      this.$store
        .dispatch("getFarmasiOrder", newParams)
        .then((_) => {
          this.loadingData = false;
          this.key = true;
        })
        .catch((error) => {
          const errorStatus = { error }.error.response.status;
          if (errorStatus === 401) {
            this.$store.commit("TOKEN_UPDATE");
            this.$router.replace("/login");
            localStorage.clear();
          }
        });
    },
    obatSelected({ item, value }) {
      if (value) {
        this.dialogFarmasiOrder = true;
        this.formInputFarmasiOrder.inputtedId = item.obat_kode;
      }
    },
    closeDialogFarmasiOrder() {
      this.dialogFarmasiOrder = false;
      if (
        this.formInputFarmasiOrder.quantity === 0 ||
        this.formInputFarmasiOrder.quantity.length === 0
      ) {
        const newSelected = this.formInput.selected.filter((data) => {
          return data.obat_kode != this.formInputFarmasiOrder.inputtedId;
        });
        this.formInput.selected = newSelected;
      }
    },
    saveFarmasiOrder() {
      this.dialogFarmasiOrder = false;
      this.formInput.selected.forEach((data) => {
        if (data.obat_kode === this.formInputFarmasiOrder.inputtedId) {
          data["farmasi_order_obat_qty"] = this.formInputFarmasiOrder.quantity;
          data["farmasi_order_obat_price"] = parseInt(data.obat_hnappn);
          data["farmasi_order_obat_total"] =
            data["farmasi_order_obat_price"] *
            this.formInputFarmasiOrder.quantity;
          data["farmasi_order_obat_status"] = "PENDING";
        }
      });
      console.log(this.formInput.selected);
      this.formInputFarmasiOrder.inputtedId = "";
      this.formInputFarmasiOrder.quantity = 0;
    },
    showNotif() {
      this.successCreateAlert = true;

      setTimeout(() => {
        this.successCreateAlert = false;
      }, 2000);
    },
  },
};
</script>

<style scoped>
.farmasi-order {
  background-color: #f5f5f5;
}

.data-table-container {
  padding: 50px;
}
</style>