<template>
  <v-card>
    <v-card-title>
      {{ title }}
      <v-spacer></v-spacer>
      <v-text-field
        v-model="search"
        append-icon="mdi-magnify"
        label="search"
        single-line
        hide-details
        :placeholder="placeHolderSearch"
      ></v-text-field>
    </v-card-title>
    <v-data-table
      v-if="conditionDataTable === true"
      :headers="headers"
      :items-per-page="10"
      :items="data"
      :item-key="itemKey"
      :single-expand="singleExpand"
      :expanded.sync="expanded"
      :options.sync="options"
      :server-items-length="length"
      :loading="loading"
      show-expand
      class="elevation-1"
      v-animate-css="'fadeIn'"
    >
      <template v-slot:top>
        <v-dialog v-model="dialog" max-width="500px">
          <v-card>
            <v-card-title>
              <span class="headline">{{ formEditTitle }}</span>
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
        <v-icon
          class="mr-2"
          @click="editItem(item)"
          v-show="buttonEdit"
          color="#FFCC00"
          >mdi-pencil</v-icon
        >
        <v-icon @click="detailItem(item)" v-show="buttonDetail" color="#4BB543"
          >mdi-eye</v-icon
        >
        <v-icon @click="deleteItem(item)" v-show="buttonDelete" color="#bb2124"
          >mdi-delete</v-icon
        >
      </template>
      <template v-slot:expanded-item="{ headers, item }">
        <td
          :colspan="headers.length"
          class="table-detail-container"
          v-on:mouseover="fillFormInput(item)"
        >
          <v-alert
            type="success"
            class="success-create-alert"
            v-show="successCreateAlert"
            v-animate-css="'slideInDown'"
            >{{ successCreateMessage }}</v-alert
          >
          <v-alert
            type="success"
            class="success-create-alert"
            v-show="successEditAlert"
            v-animate-css="'slideInDown'"
            >{{ successEditMessage }}</v-alert
          >
          <Formdialog
            v-if="buttonExpand"
            v-bind:dialogDetail="{
              from: 'Detail',
              formInput: logicFormInput,
              btnIcon: 'mdi-currency-usd',
              btnTitle: buttonExpandTitle,
              createAction: tableExpandCreate,
            }"
            v-on:createDetailSuccess="resetFormInput"
          >
            <template v-if="getRouteName === 'Masterdoctor'">
              <v-col cols="6" md="6" sm="6">
                <v-text-field
                  label="Kode Dokter"
                  v-model="formInputHargaDoctor.doctorKode"
                  disabled
                ></v-text-field>
              </v-col>
              <v-col cols="6" md="6" sm="6">
                <v-select
                  label="Tipe Pembayaran"
                  v-model="formInputHargaDoctor.type"
                  :rules="validationFormDoctor.type"
                  :items="selectType"
                  required
                ></v-select>
              </v-col>
              <v-col cols="6" md="6" sm="6">
                <v-text-field
                  label="Jasa Doctor"
                  v-model="formInputHargaDoctor.doctorJasa"
                  :rules="validationFormDoctor.doctorJasa"
                  required
                ></v-text-field>
              </v-col>
              <v-col cols="6" md="6" sm="6">
                <v-text-field
                  label="Pembagian Doctor"
                  v-model="formInputHargaDoctor.doctorPembagian"
                  :rules="validationFormDoctor.doctorPembagian"
                  required
                ></v-text-field>
              </v-col>
              <v-col cols="6" md="6" sm="6">
                <v-text-field
                  label="Doctor On Call"
                  v-model="formInputHargaDoctor.doctorOnCall"
                  :rules="validationFormDoctor.doctorOnCall"
                  required
                ></v-text-field>
              </v-col>
              <v-col cols="6" md="6" sm="6">
                <v-text-field
                  label="Doctor On Visit"
                  v-model="formInputHargaDoctor.doctorOnVisit"
                  :rules="validationFormDoctor.doctorOnVisit"
                  required
                ></v-text-field>
              </v-col>
            </template>
            <template v-else-if="getRouteName === 'Mastertindakan'">
              <v-col cols="6" sm="6" md="6">
                <v-text-field
                  label="Tindakan Kode"
                  v-model="formInputHargaTindakan.tindakanKode"
                  disabled
                ></v-text-field>
              </v-col>
              <v-col cols="6" sm="6" md="6">
                <v-select
                  label="Tipe Pembayaran"
                  v-model="formInputHargaTindakan.type"
                  :rules="validationFormTindakan.type"
                  :items="selectType"
                  required
                ></v-select>
              </v-col>
              <v-col cols="6" sm="6" md="6">
                <v-text-field
                  label="Tindakan Harga"
                  v-model="formInputHargaTindakan.tindakanHarga"
                  :rules="validationFormTindakan.tindakanHarga"
                  required
                ></v-text-field>
              </v-col>
              <v-col cols="6" sm="6" md="6">
                <v-text-field
                  label="Tindakan Sewa Alat"
                  v-model="formInputHargaTindakan.tindakanSewaAlat"
                  :rules="validationFormTindakan.tindakanSewaAlat"
                  required
                ></v-text-field>
              </v-col>
              <v-col cols="6" sm="6" md="6">
                <v-text-field
                  label="Tindakan Sewa Ruangan"
                  v-model="formInputHargaTindakan.tindakanSewaRuangan"
                  :rules="validationFormTindakan.tindakanSewaRuangan"
                  required
                ></v-text-field>
              </v-col>
              <v-col cols="6" sm="6" md="6">
                <v-text-field
                  label="Tindakan Jasa Operator"
                  v-model="formInputHargaTindakan.tindakanJasaOperator"
                  :rules="validationFormTindakan.tindakanJasaOperator"
                  required
                ></v-text-field>
              </v-col>
              <v-col cols="6" sm="6" md="6">
                <v-text-field
                  label="Tindakan Jasa A Operator"
                  v-model="formInputHargaTindakan.tindakanJasaAOperator"
                  :rules="validationFormTindakan.tindakanJasaAOperator"
                  required
                ></v-text-field>
              </v-col>
              <v-col cols="6" sm="6" md="6">
                <v-text-field
                  label="Tindakan Jasa Paramedis"
                  v-model="formInputHargaTindakan.tindakanJasaParamedis"
                  :rules="validationFormTindakan.tindakanJasaParamedis"
                  required
                ></v-text-field>
              </v-col>
            </template>
            <template v-else-if="getRouteName === 'Masterlab'">
              <v-col cols="6" sm="6" md="6">
                <v-text-field
                  label="Kode Lab"
                  v-model="formInputHargaLab.labKode"
                  disabled
                ></v-text-field>
              </v-col>
              <v-col cols="6" sm="6" md="6">
                <v-select
                  label="Tipe Pembayaran"
                  v-model="formInputHargaLab.type"
                  :rules="validationFormLab.type"
                  :items="selectType"
                  required
                ></v-select>
              </v-col>
              <v-col cols="6" sm="6" md="6">
                <v-text-field
                  label="Harga Lab"
                  v-model="formInputHargaLab.hargaLab"
                  :rules="validationFormLab.hargaLab"
                  required
                ></v-text-field>
              </v-col>
            </template>
            <template v-else-if="getRouteName === 'Masterronsen'">
              <v-col cols="6" sm="6" md="6">
                <v-text-field
                  label="Kode Lab"
                  v-model="formInputHargaRonsen.ronsenKode"
                  disabled
                ></v-text-field>
              </v-col>
              <v-col cols="6" sm="6" md="6">
                <v-select
                  label="Tipe Pembayaran"
                  v-model="formInputHargaRonsen.type"
                  :rules="validationFormRonsen.type"
                  :items="selectType"
                  required
                ></v-select>
              </v-col>
              <v-col cols="6" sm="6" md="6">
                <v-text-field
                  label="Harga Rosen"
                  v-model="formInputHargaRonsen.hargaRonsen"
                  :rules="validationFormRonsen.hargaRonsen"
                  required
                ></v-text-field>
              </v-col>
            </template>
            <template v-else-if="getRouteName === 'Masterobat'">
              <v-col cols="6" sm="6" md="6">
                <v-text-field
                  label="Obat Kode"
                  v-model="formInputHargaObat.obatKode"
                  disabled
                ></v-text-field>
              </v-col>
              <v-col cols="6" sm="6" md="6">
                <v-select
                  label="Tipe Pembayaran"
                  v-model="formInputHargaObat.type"
                  :rules="validationFormObat.type"
                  :items="selectType"
                  required
                ></v-select>
              </v-col>
              <v-col cols="6" sm="6" md="6">
                <v-text-field
                  label="Harga / Box"
                  v-model="formInputHargaObat.hargaBox"
                  :rules="validationFormObat.hargaBox"
                  required
                ></v-text-field>
              </v-col>
              <v-col cols="6" sm="6" md="6">
                <v-text-field
                  label="Harga Satuan"
                  v-model="formInputHargaObat.hargaSatuan"
                  :rules="validationFormObat.hargaSatuan"
                  required
                ></v-text-field>
              </v-col>
            </template>
            <template v-else-if="getRouteName === 'Masterkamar'">
              <v-col cols="6" md="6" sm="6">
                <v-select
                  label="Kelas Kamar"
                  v-model="formInputHargaKamar.kelas"
                  :rules="validationFormKamar.kelas"
                  :items="selectKamarKelas"
                  required
                ></v-select>
              </v-col>
              <v-col cols="6" md="6" sm="6">
                <v-select
                  label="Type"
                  v-model="formInputHargaKamar.type"
                  :rules="validationFormKamar.type"
                  :items="selectType"
                  required
                ></v-select>
              </v-col>
              <v-col cols="6" md="6" sm="6">
                <v-text-field
                  label="Kapasitas"
                  v-model="formInputHargaKamar.kapasitas"
                  required
                ></v-text-field>
              </v-col>
              <v-col cols="6" md="6" sm="6">
                <v-text-field
                  label="Harga"
                  v-model="formInputHargaKamar.harga"
                  required
                ></v-text-field>
              </v-col>
            </template>
          </Formdialog>
          <Tabledetail
            v-bind:detail="{
              item,
              headers,
              editForm: logicPropsEditForm,
              tableExpandFor,
              tableExpandHeader,
              tableExpandUpdate,
            }"
            :key="item[`${itemKey}`]"
            v-on:getItem="fillFormEdit"
            v-on:editSuccess="logicEditAlert"
          >
            <template v-if="getRouteName === 'Masterdoctor'">
              <v-col cols="6" md="6" sm="6">
                <v-text-field
                  label="Jasa Doctor"
                  v-model="editFormHargaDoctor.doctorJasa"
                  :rules="validationFormDoctor.doctorJasa"
                  required
                ></v-text-field>
              </v-col>
              <v-col cols="6" md="6" sm="6">
                <v-text-field
                  label="Pembagian Doctor"
                  v-model="editFormHargaDoctor.doctorPembagian"
                  :rules="validationFormDoctor.doctorPembagian"
                  required
                ></v-text-field>
              </v-col>
              <v-col cols="6" md="6" sm="6">
                <v-text-field
                  label="Doctor On Call"
                  v-model="editFormHargaDoctor.doctorOnCall"
                  :rules="validationFormDoctor.doctorOnCall"
                  required
                ></v-text-field>
              </v-col>
              <v-col cols="6" md="6" sm="6">
                <v-text-field
                  label="Doctor On Visit"
                  v-model="editFormHargaDoctor.doctorOnVisit"
                  :rules="validationFormDoctor.doctorOnVisit"
                  required
                ></v-text-field>
              </v-col>
            </template>
            <template v-else-if="getRouteName === 'Mastertindakan'">
              <v-col cols="6" sm="6" md="6">
                <v-text-field
                  label="Tindakan Harga"
                  v-model="editFormHargaTindakan.tindakanHarga"
                  :rules="validationFormTindakan.tindakanHarga"
                  required
                ></v-text-field>
              </v-col>
              <v-col cols="6" sm="6" md="6">
                <v-text-field
                  label="Tindakan Sewa Alat"
                  v-model="editFormHargaTindakan.tindakanSewaAlat"
                  :rules="validationFormTindakan.tindakanSewaAlat"
                  required
                ></v-text-field>
              </v-col>
              <v-col cols="6" sm="6" md="6">
                <v-text-field
                  label="Tindakan Sewa Ruangan"
                  v-model="editFormHargaTindakan.tindakanSewaRuangan"
                  :rules="validationFormTindakan.tindakanSewaRuangan"
                  required
                ></v-text-field>
              </v-col>
              <v-col cols="6" sm="6" md="6">
                <v-text-field
                  label="Tindakan Jasa Operator"
                  v-model="editFormHargaTindakan.tindakanJasaOperator"
                  :rules="validationFormTindakan.tindakanJasaOperator"
                  required
                ></v-text-field>
              </v-col>
              <v-col cols="6" sm="6" md="6">
                <v-text-field
                  label="Tindakan Jasa A Operator"
                  v-model="editFormHargaTindakan.tindakanJasaAOperator"
                  :rules="validationFormTindakan.tindakanJasaAOperator"
                  required
                ></v-text-field>
              </v-col>
              <v-col cols="6" sm="6" md="6">
                <v-text-field
                  label="Tindakan Jasa Paramedis"
                  v-model="editFormHargaTindakan.tindakanJasaParamedis"
                  :rules="validationFormTindakan.tindakanJasaParamedis"
                  required
                ></v-text-field>
              </v-col>
            </template>
            <template v-else-if="getRouteName === 'Masterlab'">
              <v-col cols="12" sm="12" md="12">
                <v-text-field
                  label="Harga Lab"
                  v-model="editFormHargaLab.hargaLab"
                  :rules="validationFormLab.hargaLab"
                  required
                ></v-text-field>
              </v-col>
            </template>
            <template v-else-if="getRouteName === 'Masterronsen'">
              <v-col cols="12" sm="12" md="12">
                <v-text-field
                  label="Harga Ronsen"
                  v-model="editFormHargaRonsen.hargaRonsen"
                  :rules="validationFormRonsen.hargaRonsen"
                  required
                ></v-text-field>
              </v-col>
            </template>
            <template v-else-if="getRouteName === 'Masterobat'">
              <v-col cols="6" sm="6" md="6">
                <v-text-field
                  label="Harga / Box"
                  v-model="editFormHargaObat.hargaBox"
                  :rules="validationFormObat.hargaBox"
                  required
                ></v-text-field>
              </v-col>
              <v-col cols="6" sm="6" md="6">
                <v-text-field
                  label="Harga Satuan"
                  v-model="editFormHargaObat.hargaSatuan"
                  :rules="validationFormObat.hargaSatuan"
                  required
                ></v-text-field>
              </v-col>
            </template>
            <template v-else-if="getRouteName === 'Masterkamar'">
              <v-col cols="6" md="6" sm="6">
                <v-select
                  label="Kelas Kamar"
                  v-model="editFormHargaKamar.kelas"
                  :rules="validationFormKamar.kelas"
                  :items="selectKamarKelas"
                  required
                ></v-select>
              </v-col>
              <v-col cols="6" md="6" sm="6">
                <v-text-field
                  label="Kapasitas"
                  v-model="editFormHargaKamar.kapasitas"
                  required
                ></v-text-field>
              </v-col>
              <v-col cols="6" md="6" sm="6">
                <v-text-field
                  label="Harga"
                  v-model="editFormHargaKamar.harga"
                  required
                ></v-text-field>
              </v-col>
            </template>
            <template v-else-if="getRouteName === 'Pembeliangudang'">
              <v-text-field
                label="Obat Quantity"
                v-model="editFormPembelianGudangObat.gudangPoObatQuantity"
                :rules="validationFormPembelianGudangObat.gudangPoObatQuantity"
                required
              ></v-text-field>
            </template>
            <template v-else-if="getRouteName === 'Permintaanfarmasi'">
              <v-col cols="6" md="6">
                <v-text-field
                  label="Obat Quantity"
                  v-model="editFormPermintaanObatFarmasi.farmasiOrderObatQty"
                  :rules="
                    validationFormEditPermintaanObatFarmasi.farmasiOrderObatQty
                  "
                  required
                ></v-text-field>
              </v-col>
              <v-col cols="6" md="6">
                <v-text-field
                  label="Obat Price"
                  v-model="editFormPermintaanObatFarmasi.farmasiOrderObatPrice"
                  :rules="
                    validationFormEditPermintaanObatFarmasi.farmasiOrderObatPrice
                  "
                  required
                ></v-text-field>
              </v-col>
            </template>
          </Tabledetail>
        </td>
      </template>
    </v-data-table>
    <v-data-table
      v-else
      :headers="headers"
      :items="data"
      :item-key="itemKey"
      :items-per-page="10"
      :search="search"
      :options.sync="options"
      :server-items-length="length"
      :loading="loading"
      class="elevation-1"
      v-animate-css="'fadeIn'"
    >
      <template v-slot:top>
        <v-dialog v-model="dialog" max-width="500px">
          <v-card>
            <v-card-title>
              <span class="headline">{{ formEditTitle }}</span>
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
        <v-icon
          class="mr-2"
          @click="editItem(item)"
          v-show="buttonEdit"
          color="#FFCC00"
          >mdi-pencil</v-icon
        >
        <v-icon @click="detailItem(item)" v-show="buttonDetail" color="#4BB543"
          >mdi-eye</v-icon
        >
        <v-icon @click="deleteItem(item)" v-show="buttonDelete" color="#bb2124"
          >mdi-delete</v-icon
        >
      </template>
    </v-data-table>
  </v-card>
</template>

<script>
import swal from "sweetalert2";
import Tabledetail from "../components/Tabledetail";
import Formdialog from "../components/Formdialog";
export default {
  name: "Datatable",
  props: ["dataTableDetail"],
  components: {
    Tabledetail,
    Formdialog,
  },
  data() {
    return {
      from: this.dataTableDetail.from,
      headers: this.dataTableDetail.header,
      search: "",
      title: this.dataTableDetail.cardTitle,
      dialog: false,
      editForm: this.dataTableDetail.editDetail,
      length: this.dataTableDetail.length,
      isError: false,
      errorMessage: "",
      buttonAction: true,
      singleExpand: true,
      expanded: [],
      options: {},
      itemKey: this.dataTableDetail.itemKey,
      formInputHargaDoctor: {
        doctorKode: "",
        type: null,
        doctorJasa: "0",
        doctorPembagian: "0",
        doctorOnCall: "0",
        doctorOnVisit: "0",
      },
      editFormHargaDoctor: {
        id: "",
        doctorKode: "",
        type: null,
        doctorJasa: "0",
        doctorPembagian: "0",
        doctorOnCall: "0",
        doctorOnVisit: "0",
      },
      validationFormDoctor: {
        type: [(v) => !!v || "Tipe Pembayaran Dokter is required"],
        doctorJasa: [(v) => !!v || "Harga Jasa Dokter is required"],
        doctorPembagian: [(v) => !!v || "Pembagian Dokter is required"],
        doctorOnVisit: [(v) => !!v || "Harga On Visit is required"],
        doctorOnCall: [(v) => !!v || "Harga On Call is required"],
      },
      formInputHargaTindakan: {
        tindakanKode: "",
        type: null,
        tindakanHarga: "0",
        tindakanSewaAlat: "0",
        tindakanSewaRuangan: "0",
        tindakanJasaOperator: "0",
        tindakanJasaAOperator: "0",
        tindakanJasaParamedis: "0",
      },
      editFormHargaTindakan: {
        id: "",
        tindakanKode: "",
        type: null,
        tindakanHarga: "0",
        tindakanSewaAlat: "0",
        tindakanSewaRuangan: "0",
        tindakanJasaOperator: "0",
        tindakanJasaAOperator: "0",
        tindakanJasaParamedis: "0",
      },
      validationFormTindakan: {
        type: [(v) => !!v || "Tipe Pembayaran Tindakan is required"],
        tindakanHarga: [(v) => !!v || "Tindakan Harga is required"],
        tindakanSewaAlat: [(v) => !!v || "Tindakan Sewa Alat is required"],
        tindakanSewaRuangan: [
          (v) => !!v || "Tindakan Sewa Ruangan is required",
        ],
        tindakanJasaOperator: [
          (v) => !!v || "Tindakan Jasa Operator is required",
        ],
        tindakanJasaAOperator: [
          (v) => !!v || "Tindakan Jasa A Operator is required",
        ],
        tindakanJasaParamedis: [
          (v) => !!v || "Tindakan Jasa Paramedis is required",
        ],
      },
      formInputHargaLab: {
        labKode: "",
        type: null,
        hargaLab: "0",
      },
      editFormHargaLab: {
        id: "",
        labKode: "",
        type: null,
        hargaLab: "0",
      },
      validationFormLab: {
        type: [(v) => !!v || "Tipe Pembayaran is required"],
        hargaLab: [(v) => !!v || "Harga Lab is requred"],
      },
      formInputHargaRonsen: {
        ronsenKode: "",
        type: null,
        hargaRonsen: "0",
      },
      editFormHargaRonsen: {
        id: "",
        ronsenKode: "",
        type: null,
        hargaRonsen: "0",
      },
      validationFormRonsen: {
        type: [(v) => !!v || "Tipe Pembayaran is required"],
        hargaRonsen: [(v) => !!v || "Harga Ronsen is required"],
      },
      formInputHargaObat: {
        obatKode: "",
        type: null,
        hargaBox: "0",
        hargaSatuan: "0",
      },
      editFormHargaObat: {
        id: "",
        obatKode: "",
        type: null,
        hargaBox: "0",
        hargaSatuan: "0",
      },
      validationFormObat: {
        type: [(v) => !!v || "Tipe pembayaran is required"],
        hargaBox: [(v) => !!v || "Harga Box is required"],
        hargaSatuan: [(v) => !!v || "Harga Satuan is required"],
      },
      formInputHargaKamar: {
        kamarId: "",
        kelas: null,
        type: null,
        kapasitas: "0",
        harga: "0",
      },
      editFormHargaKamar: {
        id: "",
        kelas: null,
        type: null,
        kapasitas: "0",
        harga: "0",
      },
      validationFormKamar: {
        type: [(v) => !!v || "Type is required"],
        kelas: [(v) => !!v || "Kelas is required"],
      },
      selectKamarKelas: ["VVIP", "VIP", "SATU", "DUA", "TIGA"],
      editFormPembelianGudangObat: {
        id: "",
        gudangPoObatQuantity: 0,
        gudangPoObatPrice: 0,
      },
      validationFormPembelianGudangObat: {
        gudangPoObatQuantity: [(v) => !!v || "Quantity is required"],
      },
      editFormPermintaanObatFarmasi: {
        id: "",
        farmasiOrderObatQty: 0,
        farmasiOrderObatPrice: "",
      },
      validationFormEditPermintaanObatFarmasi: {
        farmasiOrderObatQty: [
          (v) => !!v || "Farmasi Order Obat Quantity cannot be empty",
        ],
        farmasiOrderObatPrice: [
          (v) => !!v || "Farmasi Order Obat Price cannot be empty",
        ],
      },
      successCreateAlert: false,
      successCreateMessage: "",
      successEditAlert: false,
      successEditMessage: "",
      buttonEdit: this.dataTableDetail.buttonEdit,
      buttonDelete: this.dataTableDetail.buttonDelete,
      buttonDetail: this.dataTableDetail.buttonDetail,
      conditionDataTable: this.dataTableDetail.isExpanded,
      buttonExpand: this.dataTableDetail.buttonExpand,
      buttonExpandTitle: this.dataTableDetail.btnExpandTitle,
      tableExpandFor: this.dataTableDetail.tableExpandFor,
      tableExpandHeader: this.dataTableDetail.tableExpandHeader,
      tableExpandCreate: this.dataTableDetail.tableExpandCreate,
      tableExpandUpdate: this.dataTableDetail.tableExpandUpdate,
    };
  },
  watch: {
    params: {
      handler() {
        this.$emit("getData", this.params);
      },
      deep: true,
    },
  },
  mounted() {
    this.$emit("getData", this.params);
  },
  computed: {
    placeHolderSearch() {
      return this.$route.name.slice(6);
      +" " + "Kode";
    },
    loading() {
      return this.dataTableDetail.loadingData;
    },
    params() {
      return {
        ...this.options,
        search: this.search,
      };
    },
    formEditTitle() {
      return "Edit" + this.title.slice(5);
    },
    data() {
      return this.dataTableDetail.data;
    },
    selectType() {
      let arrayType = this.$store.state.masterType;
      let from = this.$route.name.slice(6).split("");
      from[0] = from[0].toUpperCase();
      from = from.join("");
      if (this.$store.state[`harga${from}`].length > 0) {
        let filteredType = [];
        arrayType.forEach((type) => {
          let flag = false;
          this.$store.state[`harga${from}`].forEach((item) => {
            if (type.name === item.type || type.status === "TIDAK AKTIF") {
              flag = true;
            }
          });
          if (flag === false) {
            filteredType.push(type.name);
          }
        });
        return filteredType;
      } else {
        arrayType = arrayType.map((type) => {
          return type.name;
        });
        return arrayType;
      }
    },
    logicFormInput() {
      return this[`${this.dataTableDetail.tableExpandFormInput}`];
    },
    getRouteName() {
      return this.$route.name;
    },
    logicPropsEditForm() {
      return this[`${this.dataTableDetail.tableExpandEditForm}`];
    },
  },
  methods: {
    editItem(item) {
      this.dialog = true;
      this.$emit("inputFormEdit", item);
    },
    save() {
      this.buttonAction = false;
      this.$store
        .dispatch(this.dataTableDetail.editAction, this.editForm)
        .then(() => {
          this.buttonAction = true;
          this.dialog = false;
          this.isError = false;
          this.errorMessage = "";
          this.$emit(`edit${this.from}Success`);
        })
        .catch((error) => {
          console.log({ error });
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
    deleteItem(item) {
      swal
        .fire({
          title: "Are you sure?",
          text: "You won't be able to revert this!",
          icon: "warning",
          showCancelButton: true,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          confirmButtonText: "Yes, delete it!",
        })
        .then((result) => {
          if (result.value) {
            return this.$store.dispatch(
              this.dataTableDetail.deleteAction,
              item
            );
          } else {
            throw null;
          }
        })
        .then(() => {
          this.$emit(`delete${this.from}Success`);
        })
        .catch((error) => {
          const errorKey = Object.keys(
            { error }.error.response.data.messages
          )[0];
          const errorMessage = { error }.error.response.data.messages[errorKey];
          const errorStatus = { error }.error.response.status;
          if (errorStatus === 401) {
            this.$store.commit("TOKEN_UPDATE");
            this.$router.replace("/login");
            localStorage.clear();
            this.isError = false;
          }
        });
    },
    fillFormInput(item) {
      if (this.$route.name === "Masterdoctor") {
        this.formInputHargaDoctor.doctorKode = item.doctor_kode;
      } else if (this.$route.name === "Mastertindakan") {
        this.formInputHargaTindakan.tindakanKode = item.tindakan_kode;
      } else if (this.$route.name === "Masterlab") {
        this.formInputHargaLab.labKode = item.lab_kode;
      } else if (this.$route.name === "Masterronsen") {
        this.formInputHargaRonsen.ronsenKode = item.ronsen_kode;
      } else if (this.$route.name === "Masterobat") {
        this.formInputHargaObat.obatKode = item.obat_kode;
      } else if (this.$route.name === "Masterkamar") {
        this.formInputHargaKamar.kamarId = item.id;
      }
    },
    resetFormInput() {
      if (this.$route.name === "Masterdoctor") {
        this.formInputHargaDoctor.type = null;
        this.formInputHargaDoctor.doctorJasa = "0";
        this.formInputHargaDoctor.doctorPembagian = "0";
        this.formInputHargaDoctor.doctorOnCall = "0";
        this.formInputHargaDoctor.doctorOnVisit = "0";
      } else if (this.$route.name === "Mastertindakan") {
        this.formInputHargaTindakan.type = null;
        this.formInputHargaTindakan.tindakanHarga = "0";
        this.formInputHargaTindakan.tindakanSewaAlat = "0";
        this.formInputHargaTindakan.tindakanSewaRuangan = "0";
        this.formInputHargaTindakan.tindakanJasaOperator = "0";
        this.formInputHargaTindakan.tindakanJasaAOperator = "0";
        this.formInputHargaTindakan.tindakanJasaParamedis = "0";
      } else if (this.$route.name === "Masterlab") {
        this.formInputHargaLab.labKode = "";
        this.formInputHargaLab.type = null;
        this.formInputHargaLab.hargaLab = "0";
      } else if (this.$route.name === "Masterronsen") {
        this.formInputHargaRonsen.ronsenKode = "";
        this.formInputHargaRonsen.type = null;
        this.formInputHargaRonsen.hargaRonsen = "0";
      } else if (this.$route.name === "Masterobat") {
        this.formInputHargaObat.obatKode = "";
        this.formInputHargaObat.type = null;
        this.formInputHargaObat.hargaBox = "0";
        this.formInputHargaObat.hargaSatuan = "0";
      } else if (this.$route.name === "Masterkamar") {
        this.formInputHargaKamar.kamarId = "";
        this.formInputHargaKamar.kelas = null;
        this.formInputHargaKamar.type = null;
        this.formInputHargaKamar.kapasitas = "0";
        this.formInputHargaKamar.harga = "0";
      }
      this.successCreateAlert = true;
      this.successCreateMessage = `Create Detail Success`;
      setTimeout(() => {
        this.successCreateAlert = false;
      }, 3500);
    },
    fillFormEdit(item) {
      if (this.$route.name === "Masterdoctor") {
        this.editFormHargaDoctor.id = item.id;
        this.editFormHargaDoctor.doctorKode = item.doctor_kode;
        this.editFormHargaDoctor.type = item.type;
        this.editFormHargaDoctor.doctorJasa = item.doctor_jasa;
        this.editFormHargaDoctor.doctorPembagian = item.doctor_pembagian;
        this.editFormHargaDoctor.doctorOnCall = item.doctor_on_call;
        this.editFormHargaDoctor.doctorOnVisit = item.doctor_on_visit;
      } else if (this.$route.name === "Mastertindakan") {
        this.editFormHargaTindakan.id = item.id;
        this.editFormHargaTindakan.tindakanKode = item.tindakan_kode;
        this.editFormHargaTindakan.type = item.type;
        this.editFormHargaTindakan.tindakanHarga = item.tindakan_harga;
        this.editFormHargaTindakan.tindakanSewaAlat = item.tindakan_sewa_alat;
        this.editFormHargaTindakan.tindakanSewaRuangan =
          item.tindakan_sewa_ruangan;
        this.editFormHargaTindakan.tindakanJasaOperator =
          item.tindakan_jasa_operator;
        this.editFormHargaTindakan.tindakanJasaAOperator =
          item.tindakan_jasa_aoperator;
        this.editFormHargaTindakan.tindakanJasaParamedis =
          item.tindakan_jasa_paramedis;
      } else if (this.$route.name === "Masterlab") {
        this.editFormHargaLab.id = item.id;
        this.editFormHargaLab.labKode = item.lab_kode;
        this.editFormHargaLab.type = item.type;
        this.editFormHargaLab.hargaLab = item.harga_lab;
      } else if (this.$route.name === "Masterronsen") {
        this.editFormHargaRonsen.id = item.id;
        this.editFormHargaRonsen.ronsenKode = item.ronsen_kode;
        this.editFormHargaRonsen.type = item.type;
        this.editFormHargaRonsen.hargaRonsen = item.harga;
      } else if (this.$route.name === "Masterobat") {
        this.editFormHargaObat.id = item.id;
        this.editFormHargaObat.obatKode = item.obatKode;
        this.editFormHargaObat.type = item.type;
        this.editFormHargaObat.hargaBox = item.harga_box;
        this.editFormHargaObat.hargaSatuan = item.harga_satuan;
      } else if (this.$route.name === "Masterkamar") {
        this.editFormHargaKamar.id = item.id;
        this.editFormHargaKamar.kelas = item.kelas;
        this.editFormHargaKamar.type = item.type;
        this.editFormHargaKamar.kapasitas = item.kapasitas;
        this.editFormHargaKamar.harga = item.harga;
      } else if (this.$route.name === "Pembeliangudang") {
        this.editFormPembelianGudangObat.id = item.gudang_po_obat_ID;
        this.editFormPembelianGudangObat.gudangPoObatQuantity =
          item.gudang_po_obat_qty;
        this.editFormPembelianGudangObat.gudangPoObatPrice =
          item.gudang_po_obat_price;
      } else if (this.$route.name === "Permintaanfarmasi") {
        this.editFormPermintaanObatFarmasi.id = item.farmasi_order_obat_ID;
        this.editFormPermintaanObatFarmasi.farmasiOrderObatQty =
          item.farmasi_order_obat_qty;
        this.editFormPermintaanObatFarmasi.farmasiOrderObatPrice =
          item.farmasi_order_obat_price;
      }
    },
    logicEditAlert() {
      this.successEditAlert = true;
      this.successEditMessage = `Edit Detail Success`;
      setTimeout(() => {
        this.successEditAlert = false;
      }, 3500);
    },
    detailItem(item) {
      if (this.$route.name === "Pembeliangudang") {
        this.$router.push({
          name: "Detailpembeliangudang",
          params: { poId: item.gudang_po_ID },
        });
      }
    },
  },
};
</script>

<style scoped>
.row-expand {
  padding: 20px 0;
}

.table-detail-container {
  padding: 30px;
}
</style>

