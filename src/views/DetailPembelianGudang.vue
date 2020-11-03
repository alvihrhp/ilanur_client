<template>
  <div class="detail-pembelian-gudang">
    <Toolbar></Toolbar>
    <Banner
      v-bind:bannerDetail="{
        title: 'Detail Pembelian Gudang',
        background: 'gudangrr.jpg',
      }"
    ></Banner>
    <v-row>
      <v-col cols="2" class="text-center">
        <v-btn depressed color="primary" @click="changeContent('gudangRR')"
          >Gudang RR</v-btn
        >
      </v-col>
      <v-col cols="2" class="text-center">
        <v-btn depressed color="error" @click="changeContent('gudangRetur')"
          >Gudang Retur</v-btn
        >
      </v-col>
    </v-row>
    <div class="data-table-container">
      <v-alert
        type="success"
        class="success-create-alert"
        v-show="successCreateRrAlert"
        v-animate-css="'slideInDown'"
        >{{ messageNotif }}</v-alert
      >
      <v-alert
        type="success"
        class="success-create-alert"
        v-show="successCreateReturAlert"
        v-animate-css="'slideInDown'"
        >{{ messageNotif }}</v-alert
      >
      <Formdialog
        :key="whichContent"
        v-bind:dialogDetail="{
          from: whichContent,
          formInput,
          btnTitle: btnTitleInput,
          btnIcon: btnIconInput,
          createAction: createActionInput,
          subTitle: true,
          subTitleText: subTitleInput,
        }"
        v-on:creategudangRRSuccess="showNotif"
        v-on:creategudangReturSuccess="showNotif"
      >
        <v-col cols="12" md="12">
          <v-card>
            <v-data-table
              v-on:item-selected="formInputSelected"
              v-model="formInput.selected"
              :headers="gudangPoObat.header"
              :items="gudangPoObat.data"
              :single-select="singleSelectInput"
              :loading="loadingTableInput"
              item-key="gudang_po_obat_ID"
              show-select
            >
              <template v-slot:top>
                <v-dialog v-model="dialogFormInput" max-width="500px">
                  <v-card>
                    <v-form ref="form" @submit.prevent="saveDialogFormInput">
                      <v-card-title>
                        <span
                          class="headline"
                          v-if="whichContent === 'gudangRR'"
                          >Detail RR</span
                        >
                        <span class="headline" v-else>Detail Retur</span>
                      </v-card-title>

                      <v-card-text>
                        <v-container>
                          <v-row>
                            <v-col cols="12" md="12">
                              <v-text-field
                                v-model="formInputGudangPo.quantity"
                                :rules="validationRulesGudangPo.quantity"
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
                          @click="closeDialogFormInput"
                          >Cancel</v-btn
                        >
                        <v-btn
                          color="blue darken-1"
                          text
                          @click="saveDialogFormInput"
                          >Save</v-btn
                        >
                      </v-card-actions>
                    </v-form>
                  </v-card>
                </v-dialog>
              </template>
            </v-data-table>
          </v-card>
        </v-col>
      </Formdialog>
      <Datatable
        v-if="whichContent === 'gudangRR'"
        :key="keyGudangRr"
        v-bind:dataTableDetail="{
          from: 'Detailpembeliangudang',
          cardTitle: 'Table Gudang RR',
          header: gudangRr.header,
          data: gudangRr.data,
          length: gudangRr.length,
          buttonEdit: true,
          buttonDelete: false,
          buttonDetail: false,
          loadingData: loadingGudangRr,
          itemKey: 'gudang_rr_ID',
          isExpanded: true,
          buttonExpanded: false,
          tableExpandFor: 'gudangRrObat',
          tableExpandHeader: 'headerGudangRr',
        }"
        v-on:getData="getGudangRr"
      ></Datatable>
      <Datatable
        v-if="whichContent === 'gudangRetur'"
        :key="keyGudangRetur"
        v-bind:dataTableDetail="{
          from: 'Detailpembeliangudang',
          cardTitle: 'Table Gudang Retur',
          header: gudangRetur.header,
          data: gudangRetur.data,
          length: gudangRetur.length,
          buttonEdit: true,
          buttonDelete: false,
          buttonDetail: false,
          loadingData: loadingGudangRetur,
          itemKey: 'gudang_retur_ID',
          isExpanded: true,
          buttonExpanded: false,
          tableExpandFor: 'gudangReturObat',
          tableExpandHeader: 'headerGudangRetur',
        }"
      ></Datatable>
    </div>
  </div>
</template>

<script>
import Toolbar from "@/components/Toolbar";
import Banner from "@/components/Banner";
import Formdialog from "@/components/Formdialog";
import Datatable from "../components/Datatable";
export default {
  name: "DetailPembelianGudang.vue",
  components: {
    Toolbar,
    Banner,
    Formdialog,
    Datatable,
  },
  created() {
    this.$store
      .dispatch("getPembelianGudangObat", this.$route.params.poId)
      .then((_) => {
        this.loadingTableInput = false;
      });
  },
  data() {
    return {
      whichContent: "gudangRR",
      loadingGudangRr: true,
      keyGudangRr: false,
      headerGudangRr: [
        { text: "RR ID", value: "gudang_rr_ID", align: "start" },
        { text: "RR date", value: "gudang_rr_date" },
        { text: "RR Petugas", value: "gudang_rr_petugas" },
        { text: "", value: "data-table-expand" },
      ],
      loadingGudangRetur: true,
      keyGudangRetur: false,
      headerGudangRetur: [
        { text: "Retur ID", value: "gudang_retur_ID", align: "start" },
        { text: "Retur Date", value: "gudang_retur_date" },
        { text: "Retur Petugas", value: "gudang_retur_petugas" },
        { text: "", value: "data-table-expand" },
      ],
      headerFormInput: [
        { text: "Nama Obat", value: "obat_nama", align: "start" },
        { text: "Obat Status", value: "gudang_po_obat_status" },
      ],
      formInput: {
        selected: [],
      },
      validationRulesGudangPo: {
        quantity: [
          (v) => !!v || "Quantity cannot be empty",
          (v) =>
            v <= this.formInputGudangPo.status ||
            "Quantity must be lesser than or equal status",
        ],
      },
      btnTitleInput: "Create Gudang RR",
      btnIconInput: "mdi-receipt",
      createActionInput: "createGudangRr",
      singleSelectInput: false,
      loadingTableInput: true,
      dialogFormInput: false,
      formInputGudangPo: {
        inputtedId: "",
        quantity: 0,
        price: 0,
        status: 0,
      },
      successCreateRrAlert: false,
      successCreateReturAlert: false,
      messageNotif: "",
    };
  },
  watch: {
    whichContent: {
      handler() {
        if (this.whichContent === "gudangRR") {
          this.$store
            .dispatch("getListGudangRr", this.$route.params.poId)
            .then(() => {
              this.loadingGudangRr = false;
              this.keyGudangRr = true;
              this.keyGudangRetur = false;
            })
            .catch((error) => {
              const errorStatus = { error }.error.response.status;
              if (errorStatus === 401) {
                this.$store.commit("TOKEN_UPDATE");
                this.$router.replace("/login");
                localStorage.clear();
              }
            });
        } else {
          this.$store
            .dispatch("getListGudangRetur", this.$route.params.poId)
            .then(() => {
              this.loadingGudangRetur = false;
              this.keyGudangRetur = true;
              this.keyGudangRr = false;
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
      deep: true,
    },
  },
  computed: {
    gudangRr() {
      if (this.$store.state.gudangRr.length > 0) {
        return {
          header: this.headerGudangRr,
          data: this.$store.state.gudangRr,
          length: this.$store.state.gudangRr.length,
        };
      } else {
        return {
          header: this.headerGudangRr,
          data: [],
          length: 0,
        };
      }
    },
    gudangRetur() {
      if (this.$store.state.gudangRetur.length > 0) {
        return {
          header: this.headerGudangRetur,
          data: this.$store.state.gudangRetur,
          length: this.$store.state.gudangRetur.length,
        };
      } else {
        return {
          header: this.headerGudangRetur,
          data: [],
          length: 0,
        };
      }
    },
    gudangPoObat() {
      if (this.$store.state.pembelianGudangObat.length > 0) {
        return {
          header: this.headerFormInput,
          data: this.$store.state.pembelianGudangObat,
          length: this.$store.state.pembelianGudangObat.length,
        };
      } else {
        return {
          header: this.headerFormInput,
          data: [],
          length: 0,
        };
      }
    },
    subTitleInput() {
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
      if (this.whichContent === "gudangRR") {
        return `RR-${mm + "0" + yy}-0000${this.gudangRr.data.length + 1}`;
      } else {
        return `RET-${mm + "0" + yy}-0000${this.gudangRetur.data.length + 1}`;
      }
    },
  },
  methods: {
    getGudangRr(params) {
      this.loadingGudangRr = true;
      const newParams = {
        page: params.page,
        itemsPerPage: params.itemsPerPage,
        sortBy: params.sortBy[0],
        sortDesc: params.sortDesc[0],
        search: params.search,
        poId: this.$route.params.poId,
      };
      this.$store
        .dispatch("getListGudangRr", newParams)
        .then((_) => {
          this.loadingGudangRr = false;
          this.keyGudangRr = true;
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
    changeContent(params) {
      if (params === "gudangRR") {
        this.fromInput = "GudangRr";
        this.btnTitleInput = "Create Gudang RR";
        this.btnIconInput = "mdi-receipt";
        this.createActionInput = "createGudangRr";
      } else {
        this.fromInput = "GudangRetur";
        this.btnTitleInput = "Create Gudang Retur";
        this.btnIconInput = "mdi-keyboard-return";
        this.createActionInput = "createGudangRetur";
      }
      this.whichContent = params;
    },
    formInputSelected({ item, value }) {
      if (value === true) {
        this.dialogFormInput = true;
        this.formInputGudangPo.inputtedId = item.obat_kode;
        this.formInputGudangPo.price = item.gudang_po_obat_price;
        this.formInputGudangPo.status = parseInt(item.gudang_po_obat_status);
      }
    },
    closeDialogFormInput() {
      this.dialogFormInput = false;
      if (
        this.formInputGudangPo.quantity === 0 ||
        this.formInputGudangPo.quantity.length === 0
      ) {
        const newSelected = this.formInput.selected.filter((data) => {
          return data.obat_kode != this.formInputGudangPo.inputtedId;
        });
        this.formInput.selected = newSelected;
      }
    },
    saveDialogFormInput() {
      if (this.$refs.form.validate()) {
        if (this.whichContent === "gudangRR") {
          this.formInput.selected.forEach((data) => {
            if (data.obat_kode === this.formInputGudangPo.inputtedId) {
              data["gudangRrQuantity"] = this.formInputGudangPo.quantity;
            }
          });
        } else {
          this.formInput.selected.forEach((data) => {
            if (data.obat_kode === this.formInputGudangPo.inputtedId) {
              data["gudangReturObatQuantity"] = this.formInputGudangPo.quantity;
              data["gudangReturObatTotal"] = String(
                this.formInputGudangPo.quantity * this.formInputGudangPo.price
              );
            }
          });
        }

        this.dialogFormInput = false;
        this.formInputGudangPo.quantity = 0;
        this.formInputGudangPo.inputtedId = 0;
        this.formInputGudangPo.price = 0;
        this.formInputGudangPo.status = 0;
      }
    },
    showNotif() {
      if (this.whichContent === "gudangRR") {
        this.messageNotif = "Create Gudang RR Success";
        this.successCreateRrAlert = true;
      } else {
        this.messageNotif = "Create Gudang Retur Success";
        this.successCreateReturAlert = true;
      }
      this.formInput.selected = [];
      setTimeout(() => {
        this.successCreateRrAlert = false;
        this.successCreateReturAlert = false;
      }, 1000);
    },
  },
};
</script>

<style scoped>
.detail-pembelian-gudang {
  background-color: #f5f5f5;
}

.data-table-container {
  padding: 50px;
}
</style>