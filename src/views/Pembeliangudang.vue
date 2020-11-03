<template>
  <div class="pembelian-gudang">
    <Toolbar></Toolbar>
    <Banner
      v-bind:bannerDetail="{
        title: 'Pembelian Gudang',
        background: 'pembeliangudang.jpg',
      }"
    ></Banner>
    <div class="data-table-container">
      <v-alert
        type="success"
        class="success-create-alert"
        v-show="successCreateAlert"
        v-animate-css="'slideInDown'"
        >Create Pembelian Gudang Success</v-alert
      >
      <v-alert
        type="success"
        class="success-create-alert"
        v-show="successEditAlert"
        v-animate-css="'slideInDown'"
        >Edit Pembelian Gudang Success</v-alert
      >
      <Formdialog
        v-bind:dialogDetail="{
          from: 'PembelianGudang',
          formInput,
          btnTitle: 'Create Pembelian Gudang',
          btnIcon: 'mdi-credit-card',
          createAction: 'createPembelianGudang',
          subTitle: true,
          subTitleText: `PO-${dateNow}-0000${pembelianGudang.length + 1}`,
        }"
        v-on:createPembelianGudangSuccess="resetFormInput"
      >
        <v-col cols="12" md="12" sm="12">
          <v-autocomplete
            v-model="formInput.distributor"
            :loading="loadingDataDistributor"
            :items="masterDistributor"
            :search-input.sync="searchDistributor"
            color="white"
            hide-no-data
            hide-selected
            cache-items
            flat
            label="Nama Distributor"
            solo-inverted
          ></v-autocomplete>
        </v-col>
        <v-col cols="12" md="12" sm="12">
          <v-card>
            <v-text-field
              v-model="searchDistributorObat"
              append-icon="mdi-magnify"
              label="search"
              single-line
              hide-details
              class="px-5 py-2"
            ></v-text-field>
            <v-data-table
              v-on:item-selected="obatSelected"
              :key="keyDistributorObat"
              v-model="formInput.selected"
              :headers="headersDistributorObat"
              :items="masterDistributorObat"
              :options.sync="options"
              :single-select="singleSelect"
              :server-items-length="distributorObatLength"
              :loading="loadingDistributorObat"
              item-key="distributor_obat_kode"
              show-select
            >
              <template v-slot:top>
                <v-dialog v-model="dialogDistributorObat" max-width="500px">
                  <v-card>
                    <v-card-title>
                      <span class="headline">Detail Pembelian</span>
                    </v-card-title>

                    <v-card-text>
                      <v-container>
                        <v-row>
                          <v-col cols="6" sm="6" md="6">
                            <v-text-field
                              v-model="
                                formInputDistributorObat.gudangPoObatQuantity
                              "
                              :rules="
                                validationRulesDistributorObat.gudangPoObatQuantity
                              "
                              label="Obat Quantity"
                              required
                            ></v-text-field>
                          </v-col>
                          <v-col cols="6" sm="6" md="6">
                            <v-text-field
                              v-model="
                                formInputDistributorObat.gudangPoObatStatus
                              "
                              label="Obat Status"
                              disabled
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
                        @click="closeDistributorObat"
                        >Cancel</v-btn
                      >
                      <v-btn
                        color="blue darken-1"
                        text
                        @click="saveDistributorObat"
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
        :key="keyPembelianGudang"
        v-bind:dataTableDetail="{
          from: 'PembelianGudang',
          cardTitle: 'Table Pembelian Gudang',
          header: pembelianGudang.header,
          data: pembelianGudang.data,
          length: pembelianGudang.length,
          buttonEdit: true,
          buttonDelete: false,
          buttonDetail: true,
          loadingData: loadingDataPembelianGudang,
          itemKey: 'gudang_po_ID',
          editDetail: editPembelianGudang,
          isExpanded: true,
          buttonExpand: false,
          editAction: 'editPembelianGudang',
          tableExpandFor: 'pembelianGudangObat',
          tableExpandHeader: 'headerPembelianGudang',
          tableExpandUpdate: 'editPembelianGudangObat',
          tableExpandEditForm: 'editFormPembelianGudangObat',
          dateNow: new Date(),
        }"
        v-on:getData="getPembelianGudang"
        v-on:inputFormEdit="inputEditPembelianGudang"
        v-on:editPembelianGudangSuccess="editSuccess"
      >
        <v-select
          label="PO Status"
          v-model="editPembelianGudang.gudangPoStatus"
          :items="selectStatus"
          required
        ></v-select>
      </Datatable>
    </div>
  </div>
</template>

<script>
import Toolbar from "../components/Toolbar";
import Banner from "../components/Banner";
import Formdialog from "../components/Formdialog";
import Datatable from "../components/Datatable";
export default {
  name: "Pembeliangudang",
  components: {
    Toolbar,
    Banner,
    Formdialog,
    Datatable,
  },
  data() {
    return {
      loadingDataPembelianGudang: true,
      keyPembelianGudang: false,
      headerPembelianGudang: [
        { text: "Kode PO", value: "gudang_po_ID", align: "start" },
        { text: "Nama Distributor", value: "master_distributor_nama" },
        { text: "Date", value: "gudang_po_date" },
        { text: "Petugas", value: "gudang_po_petugas" },
        { text: "Status", value: "gudang_po_status" },
        { text: "Actions", value: "actions", sortable: false },
        { text: "", value: "data-table-expand" },
      ],
      editPembelianGudang: {
        poId: "",
        gudangPoStatus: "",
      },
      loadingDataDistributor: false,
      searchDistributor: null,
      masterDistributor: [],
      keyDistributorObat: false,
      loadingDistributorObat: false,
      headersDistributorObat: [
        { text: "Nama Obat", value: "obat_nama", align: "start" },
        { text: "Harga Obat", value: "harga_obat" },
      ],
      masterDistributorObat: [],
      distributorObatLength: 0,
      dialogDistributorObat: false,
      singleSelect: false,
      searchDistributorObat: "",
      formInput: {
        distributor: null,
        selected: [],
      },
      formInputDistributorObat: {
        inputtedId: 0,
        gudangPoObatQuantity: 0,
        gudangPoObatStatus: 10,
      },
      validationRulesDistributorObat: {
        gudangPoObatQuantity: [(v) => !!v || "Quantity cannot be empty"],
        gudangPoObatStatus: [(v) => !!v || "Status cannot be empty"],
      },
      options: {},
      successCreateAlert: false,
      successEditAlert: false,
      selectStatus: ["OPEN", "CLOSED"],
    };
  },
  watch: {
    searchDistributor(val) {
      if (val && val !== this.select) {
        this.loading = true;
        const newParams = {
          page: "1",
          itemsPerPage: "-1",
          sortBy: "undefined",
          sortDesc: "undefined",
          search: val,
        };
        this.$store
          .dispatch("getMasterDistributor", newParams)
          .then(() => {
            this.loading = false;
            this.masterDistributor = this.$store.state.masterDistributor.map(
              (distributor) => {
                return distributor.master_distributor_nama;
              }
            );
          })
          .catch((error) => {
            const errorStatus = { error }.error.response.status;
            if (errorStatus === 401) {
              this.$store.commit("TOKEN_UPDATE");
              this.$router.replace("/login");
              localStorage.clear();
            }
          });
      }
    },
    params: {
      handler() {
        this.loadingDistributorObat = true;
        const newParams = {
          page: this.params.page,
          itemsPerPage: this.params.itemsPerPage,
          sortBy: this.params.sortBy[0],
          sortDesc: this.params.sortDesc[0],
          search: this.params.search,
          distributor: this.params.distributor,
        };
        this.$store
          .dispatch("getMasterDistributorObatFilter", newParams)
          .then(() => {
            this.masterDistributorObat = this.$store.state.masterDistributorObatFilter;
            this.distributorObatLength = this.$store.state.totalMasterDistributorObatFilter;
            this.loadingDistributorObat = false;
            this.keyDistributorObat = true;
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
      deep: true,
    },
  },
  computed: {
    params() {
      return {
        ...this.options,
        search: this.searchDistributorObat,
        distributor: this.searchDistributor,
      };
    },
    pembelianGudang() {
      if (this.$store.state.pembelianGudang.length > 0) {
        return {
          header: this.headerPembelianGudang,
          data: this.$store.state.pembelianGudang,
          length: this.$store.state.totalPembelianGudang,
        };
      } else {
        return {
          header: this.headerPembelianGudang,
          data: [],
          length: 0,
        };
      }
    },
    dateNow() {
      const today = new Date();
      let dd = today.getDate();
      let mm = today.getMonth();
      let yy = String(today.getFullYear()).slice(2);
      if (dd < 10) {
        dd = "0" + dd;
      }
      if (mm < 10) {
        mm = "0" + mm;
      }
      return mm + dd + yy;
    },
  },
  methods: {
    getPembelianGudang(params) {
      this.loadingDataPembelianGudang = true;
      const newParams = {
        page: params.page,
        itemsPerPage: params.itemsPerPage,
        sortBy: params.sortBy[0],
        sortDesc: params.sortDesc[0],
        search: params.search,
      };
      this.$store
        .dispatch("getPembelianGudang", newParams)
        .then(() => {
          this.loadingDataPembelianGudang = false;
          this.keyPembelianGudang = true;
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
    closeDistributorObat() {
      this.dialogDistributorObat = false;
      if (
        this.formInputDistributorObat.gudangPoObatQuantity === 0 ||
        this.formInputDistributorObat.gudangPoObatQuantity.length === 0
      ) {
        const newSelected = this.formInput.selected.filter((data) => {
          return (
            data.distributor_obat_kode !=
            this.formInputDistributorObat.inputtedId
          );
        });
        this.formInput.selected = newSelected;
      }
    },
    saveDistributorObat() {
      this.formInput.selected.forEach((data) => {
        if (
          data.distributor_obat_kode ===
          this.formInputDistributorObat.inputtedId
        ) {
          data["gudangPoObatTotal"] =
            parseInt(this.formInputDistributorObat.gudangPoObatQuantity) *
            parseInt(data.harga_obat);
          data[
            "gudangPoObatQuantity"
          ] = this.formInputDistributorObat.gudangPoObatQuantity;
          data[
            "gudangPoObatStatus"
          ] = this.formInputDistributorObat.gudangPoObatStatus;
        }
      });
      this.dialogDistributorObat = false;
      this.formInputDistributorObat.gudangPoObatQuantity = 0;
      this.formInputDistributorObat.inputtedId = 0;
    },
    obatSelected({ item, value }) {
      if (value === true) {
        this.dialogDistributorObat = true;
        this.formInputDistributorObat.inputtedId = item.distributor_obat_kode;
      }
    },
    resetFormInput() {
      this.formInput.distributor = "";
      this.formInput.selected = [];
      this.successCreateAlert = true;

      setTimeout(() => {
        this.successCreateAlert = false;
      }, 3500);
    },
    inputEditPembelianGudang(data) {
      this.editPembelianGudang.poId = data.gudang_po_ID;
      this.editPembelianGudang.gudangPoStatus = data.gudang_po_status;
    },
    editSuccess() {
      this.successEditAlert = true;

      setTimeout(() => {
        this.successEditAlert = false;
      }, 3500);
    },
  },
};
</script>

<style scoped>
.pembelian-gudang {
  background-color: #f5f5f5;
}

.data-table-container {
  padding: 50px;
}
</style>