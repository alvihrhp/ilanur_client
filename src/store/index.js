import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";
import router from "../router";

Vue.use(Vuex);

const baseURL = "http://hisapi.fsolteam.com/public";

export default new Vuex.Store({
  state: {
    mobileNav: true,
    isLoggedIn: false,
    masterDoctor: [],
    totalMasterDoctor: 0,
    hargaDoctor: [],
    masterPerusahaan: [],
    totalMasterPerusahaan: 0,
    masterAsuransi: [],
    totalMasterAsuransi: 0,
    masterTindakan: [],
    totalMasterTindakan: 0,
    hargaTindakan: [],
    masterLab: [],
    totalMasterLab: [],
    hargaLab: [],
    masterRonsen: [],
    totalMasterRonsen: 0,
    hargaRonsen: [],
    masterObat: [],
    totalMasterObat: 0,
    hargaObat: [],
    masterKamar: [],
    totalMasterKamar: 0,
    hargaKamar: [],
    masterDistributor: [],
    totalMasterDistributor: 0,
    masterUser: [],
    totalMasterUser: 0,
    masterType: [],
    masterLantai: [],
    masterDistributorObat: [],
    totalMasterDistributorObat: 0,
    masterDistributorObatFilter: [],
    totalMasterDistributorObatFilter: 0,
    masterTypeObat: [],
    totalMasterTypeObat: 0,
    listGudangAll: [],
    totalListGudangAll: 0,
    listNewGudang: [],
    totalListNewGudang: 0,
    pembelianGudang: [],
    totalPembelianGudang: 0,
    pembelianGudangObat: [],
    gudangRr: [],
    totalGudangRr: 0,
    gudangRrObat: [],
    gudangRetur: [],
    gudangReturObat: [],
    permintaanFarmasi: [],
    totalPermintaanFarmasi: [],
    permintaanObatFarmasi: [],
    farmasiAll: [],
    totalFarmasiAll: 0,
    farmasiNew: [],
    totalFarmasiNew: 0,
    farmasiOrder: [],
    totalFarmasiOrder: 0,
    farmasiObatOrder: [],
  },
  mutations: {
    CHANGE_MOBILE_NAV(state) {
      state.mobileNav = !state.mobileNav;
    },
    LOGIN_SUCCESS(state) {
      state.isLoggedIn = true;
    },
    TOKEN_UPDATE(state) {
      state.isLoggedIn = false;
    },
    FILL_MASTER_DOCTOR(state, data) {
      state.masterDoctor = data;
    },
    INSERT_MASTER_DOCTOR(state, data) {
      state.masterDoctor.push(data);
    },
    EDIT_MASTER_DOCTOR(state, data) {
      state.masterDoctor = state.masterDoctor.map((doctor) => {
        if (doctor.doctor_kode === data.doctor_kode) {
          return data;
        }
        return doctor;
      });
    },
    DELETE_MASTER_DOCTOR(state, data) {
      state.masterDoctor = state.masterDoctor.filter((doctor) => {
        return doctor.doctor_kode != data.doctor_kode;
      });
    },
    FILL_TOTAL_DOCTOR(state, data) {
      state.totalMasterDoctor = data;
    },
    FILL_HARGA_DOCTOR(state, data) {
      const filteredType = data.filter((type) => {
        return type.status === "AKTIF";
      });
      state.hargaDoctor = filteredType;
    },
    INSERT_HARGA_DOCTOR(state, data) {
      state.hargaDoctor.push(data);
    },
    EDIT_HARGA_DOCTOR(state, data) {
      state.hargaDoctor = state.hargaDoctor.map((price) => {
        if (price.id === data.id) {
          return data;
        }
        return price;
      });
    },
    FILL_MASTER_TINDAKAN(state, data) {
      state.masterTindakan = data;
    },
    INSERT_MASTER_TINDAKAN(state, data) {
      state.masterTindakan.push(data);
    },
    EDIT_MASTER_TINDAKAN(state, data) {
      state.masterTindakan = state.masterTindakan.map((tindakan) => {
        if (tindakan.tindakan_kode === data.tindakan_kode) {
          return data;
        }
        return tindakan;
      });
    },
    DELETE_MASTER_TINDAKAN(state, data) {
      state.masterTindakan = state.masterTindakan.filter((tindakan) => {
        return tindakan.tindakan_kode != data.tindakan_kode;
      });
    },
    FILL_TOTAL_TINDAKAN(state, data) {
      state.totalMasterTindakan = data;
    },
    FILL_HARGA_TINDAKAN(state, data) {
      const filteredType = data.filter((type) => {
        return type.status === "AKTIF";
      });
      state.hargaTindakan = filteredType;
    },
    INSERT_HARGA_TINDAKAN(state, data) {
      state.hargaTindakan.push(data);
    },
    EDIT_HARGA_TINDAKAN(state, data) {
      state.hargaTindakan = state.hargaTindakan.map((price) => {
        if (data.id === price.id) {
          return data;
        }
        return price;
      });
    },
    FILL_MASTER_LAB(state, data) {
      state.masterLab = data;
    },
    INSERT_MASTER_LAB(state, data) {
      state.masterLab.push(data);
    },
    EDIT_MASTER_LAB(state, data) {
      state.masterLab = state.masterLab.map((lab) => {
        if (lab.lab_kode === data.lab_kode) {
          return data;
        }
        return lab;
      });
    },
    DELETE_MASTER_LAB(state, data) {
      state.masterLab = state.masterLab.filter((lab) => {
        return lab.lab_kode != data.lab_kode;
      });
    },
    FILL_TOTAL_LAB(state, data) {
      state.totalMasterLab = data;
    },
    FILL_HARGA_LAB(state, data) {
      const filteredType = data.filter((type) => {
        return type.status === "AKTIF";
      });
      state.hargaLab = filteredType;
    },
    INSERT_HARGA_LAB(state, data) {
      state.hargaLab.push(data);
    },
    EDIT_HARGA_LAB(state, data) {
      state.hargaLab = state.hargaLab.map((price) => {
        if (price.id === data.id) {
          return data;
        }
        return price;
      });
    },
    FILL_MASTER_RONSEN(state, data) {
      state.masterRonsen = data;
    },
    INSERT_MASTER_RONSEN(state, data) {
      state.masterRonsen.push(data);
    },
    EDIT_MASTER_RONSEN(state, data) {
      state.masterRonsen = state.masterRonsen.map((ronsen) => {
        if (ronsen.ronsen_kode === data.ronsen_kode) {
          return data;
        }
        return ronsen;
      });
    },
    DELETE_MASTER_RONSEN(state, data) {
      state.masterRonsen = state.masterRonsen.filter((ronsen) => {
        return ronsen.ronsen_kode != data.ronsen_kode;
      });
    },
    FILL_TOTAL_RONSEN(state, data) {
      state.totalMasterRonsen = data;
    },
    FILL_HARGA_RONSEN(state, data) {
      const filteredType = data.filter((type) => {
        return type.status === "AKTIF";
      });
      state.hargaRonsen = filteredType;
    },
    INSERT_HARGA_RONSEN(state, data) {
      state.hargaRonsen.push(data);
    },
    EDIT_HARGA_RONSEN(state, data) {
      state.hargaRonsen = state.hargaRonsen.map((price) => {
        if (data.id === price.id) {
          return data;
        }
        return price;
      });
    },
    FILL_MASTER_OBAT(state, data) {
      state.masterObat = data;
    },
    INSERT_MASTER_OBAT(state, data) {
      state.masterObat.push(data);
    },
    EDIT_MASTER_OBAT(state, data) {
      state.masterObat = state.masterObat.map((obat) => {
        if (data.obat_kode === obat.obat_kode) {
          return data;
        }
        return obat;
      });
    },
    DELETE_MASTER_OBAT(state, data) {
      state.masterObat = state.masterObat.filter((obat) => {
        return obat.obat_kode != data.obat_kode;
      });
    },
    FILL_TOTAL_OBAT(state, data) {
      state.totalMasterObat = data;
    },
    FILL_HARGA_OBAT(state, data) {
      const filteredType = data.filter((type) => {
        return type.status === "AKTIF";
      });
      state.hargaObat = filteredType;
    },
    INSERT_HARGA_OBAT(state, data) {
      state.hargaObat.push(data);
    },
    EDIT_HARGA_OBAT(state, data) {
      state.hargaObat = state.hargaObat.map((price) => {
        if (data.id === price.id) {
          return data;
        }
        return price;
      });
    },
    FILL_MASTER_KAMAR(state, data) {
      state.masterKamar = data;
    },
    INSERT_MASTER_KAMAR(state, data) {
      state.masterKamar.push(data);
    },
    EDIT_MASTER_KAMAR(state, data) {
      state.masterKamar = state.masterKamar.map((kamar) => {
        if (kamar.id === data.id) {
          return data;
        }
        return kamar;
      });
    },
    FILL_TOTAL_KAMAR(state, data) {
      state.totalMasterKamar = data;
    },
    FILL_HARGA_KAMAR(state, data) {
      const filteredType = data.filter((type) => {
        return type.status === "AKTIF";
      });
      state.hargaKamar = filteredType;
    },
    INSERT_HARGA_KAMAR(state, data) {
      state.hargaKamar.push(data);
    },
    EDIT_HARGA_KAMAR(state, data) {
      state.hargaKamar = state.hargaKamar.map((price) => {
        if (data.id === price.id) {
          return data;
        }
        return price;
      });
    },
    FILL_MASTER_PERUSAHAAN(state, data) {
      state.masterPerusahaan = data;
    },
    INSERT_MASTER_PERUSAHAAN(state, data) {
      state.masterPerusahaan.push(data);
    },
    EDIT_MASTER_PERUSAHAAN(state, data) {
      state.masterPerusahaan = state.masterPerusahaan.map((perusahaan) => {
        if (perusahaan.master_perusahaan_ID === data.master_perusahaan_ID) {
          return data;
        }
        return perusahaan;
      });
    },
    DELETE_MASTER_PERUSAHAAN(state, data) {
      state.masterPerusahaan = state.masterPerusahaan.filter((perusahaan) => {
        return perusahaan.master_perusahaan_ID != data.master_perusahaan_ID;
      });
    },
    FILL_TOTAL_PERUSAHAAN(state, data) {
      state.totalMasterPerusahaan = data;
    },
    FILL_MASTER_ASURANSI(state, data) {
      state.masterAsuransi = data;
    },
    INSERT_MASTER_ASURANSI(state, data) {
      state.masterAsuransi.push(data);
    },
    EDIT_MASTER_ASURANSI(state, data) {
      state.masterAsuransi = state.masterAsuransi.map((asuransi) => {
        if (asuransi.master_asuransi_ID === data.master_asuransi_ID) {
          return data;
        }
        return asuransi;
      });
    },
    DELETE_MASTER_ASURANSI(state, data) {
      state.masterAsuransi = state.masterAsuransi.filter((asuransi) => {
        return asuransi.master_asuransi_ID != data.master_asuransi_ID;
      });
    },
    FILL_TOTAL_ASURANSI(state, data) {
      state.totalMasterAsuransi = data;
    },
    FILL_MASTER_DISTRIBUTOR(state, data) {
      state.masterDistributor = data;
    },
    INSERT_MASTER_DISTRIBUTOR(state, data) {
      state.masterDistributor.push(data);
    },
    EDIT_MASTER_DISTRIBUTOR(state, data) {
      state.masterDistributor = state.masterDistributor.map((distributor) => {
        if (distributor.master_distributor_ID === data.master_distributor_ID) {
          return data;
        }
        return distributor;
      });
    },
    DELETE_MASTER_DISTRIBUTOR(state, data) {
      state.masterDistributor = state.masterDistributor.filter(
        (distributor) => {
          return (
            distributor.master_distributor_ID != data.master_distributor_ID
          );
        }
      );
    },
    FILL_TOTAL_DISTRIBUTOR(state, data) {
      state.totalMasterDistributor = data;
    },
    FILL_MASTER_USER(state, data) {
      state.masterUser = data;
    },
    INSERT_MASTER_USER(state, data) {
      state.masterUser.push(data);
    },
    EDIT_MASTER_USER(state, data) {
      state.masterUser = state.masterUser.map((user) => {
        if (user.user_ID === data.user_ID) {
          return data;
        }
        return user;
      });
    },
    DELETE_MASTER_USER(state, data) {
      state.masterUser = state.masterUser.filter((user) => {
        return user.user_ID != data.user_ID;
      });
    },
    FILL_TOTAL_USER(state, data) {
      state.totalMasterUser = data;
    },
    FILL_MASTER_TYPE(state, data) {
      state.masterType = data;
    },
    INSERT_MASTER_TYPE(state, data) {
      state.masterType.push(data);
    },
    EDIT_MASTER_TYPE(state, data) {
      state.masterType = state.masterType.map((type) => {
        if (data.originalName === type.name) {
          return data;
        }
        return type;
      });
    },
    FILL_MASTER_LANTAI(state, data) {
      state.masterLantai = data;
    },
    INSERT_MASTER_LANTAI(state, data) {
      state.masterLantai.push(data);
    },
    EDIT_MASTER_LANTAI(state, data) {
      state.masterLantai = state.masterLantai.map((lantai) => {
        if (lantai.lantai === data.originalLantai) {
          return data;
        }
        return lantai;
      });
    },
    FILL_MASTER_DISTRIBUTOR_OBAT(state, data) {
      state.masterDistributorObat = data;
    },
    INSERT_MASTER_DISTRIBUTOR_OBAT(state, data) {
      data.forEach((distributor) => {
        state.masterDistributorObat.push(distributor);
      });
    },
    EDIT_MASTER_DISTRIBUTOR_OBAT(state, data) {
      state.masterDistributorObat = state.masterDistributorObat.map(
        (distributorObat) => {
          if (
            distributorObat.distributor_obat_kode === data.distributor_obat_kode
          ) {
            const updatedObject = {
              ...data,
              master_distributor_nama: distributorObat.master_distributor_nama,
              obat_nama: distributorObat.obat_nama,
            };
            return updatedObject;
          }
          return distributorObat;
        }
      );
    },
    DELETE_MASTER_DISTRIBUTOR_OBAT(state, data) {
      state.masterDistributorObat = state.masterDistributorObat.filter(
        (distributorObat) => {
          return (
            distributorObat.distributor_obat_kode != data.distributor_obat_kode
          );
        }
      );
    },
    FILL_MASTER_DISTRIBUTOR_OBAT_FILTER(state, data) {
      state.masterDistributorObatFilter = data;
    },
    FILL_TOTAL_DISTRIBUTOR_OBAT(state, data) {
      state.totalMasterDistributorObat = data;
    },
    FILL_TOTAL_DISTRIBUTOR_OBAT_FILTER(state, data) {
      state.totalMasterDistributorObatFilter = data;
    },
    FILL_MASTER_TYPE_OBAT(state, data) {
      state.masterTypeObat = data;
    },
    FILL_TOTAL_TYPE_OBAT(state, data) {
      state.totalMasterTypeObat = data;
    },
    INSERT_MASTER_TYPE_OBAT(state, data) {
      state.masterTypeObat.push(data);
    },
    EDIT_MASTER_TYPE_OBAT(state, data) {
      const newMasterTypeObat = state.masterTypeObat.map((item) => {
        if (data.realName === item.master_tipe_obat_nama) {
          return {
            master_tipe_obat_nama: data.masterTipeObatNama,
            master_tipe_obat_status: data.masterTipeObatStatus,
          };
        }
        return item;
      });
      state.masterTypeObat = newMasterTypeObat;
    },
    FILL_LIST_GUDANG_ALL(state, data) {
      state.listGudangAll = data;
    },
    EDIT_LIST_GUDANG_ALL(state, data) {
      state.listGudangAll = state.listGudangAll.map((gudang) => {
        if (gudang.gudang_ID === data.gudang_ID) {
          const newGudang = {
            ...data,
            obat_nama: gudang.obat_nama,
          };
          return newGudang;
        }
        return gudang;
      });
    },
    FILL_TOTAL_GUDANG_ALL(state, data) {
      state.totalListGudangAll = data;
    },
    FILL_LIST_NEW_GUDANG(state, data) {
      state.listNewGudang = data;
    },
    EDIT_LIST_NEW_GUDANG(state, data) {
      state.listNewGudang = state.listNewGudang.map((gudang) => {
        if (gudang.gudang_ID === data.gudang_ID) {
          const newGudang = {
            ...data,
            obat_nama: gudang.obat_nama,
          };
          return newGudang;
        }
        return gudang;
      });
    },
    FILL_TOTAL_NEW_GUDANG(state, data) {
      state.totalListNewGudang = data;
    },
    FILL_PEMBELIAN_GUDANG(state, data) {
      state.pembelianGudang = data;
    },
    INSERT_PEMBELIAN_GUDANG(state, data) {
      state.pembelianGudang.push(data);
    },
    EDIT_PEMBELIAN_GUDANG(state, data) {
      state.pembelianGudang = state.pembelianGudang.map((pembelian) => {
        if (pembelian.gudang_po_ID === data.gudang_po_ID) {
          const newObject = {
            ...data,
            master_distributor_nama: pembelian.master_distributor_nama,
          };
          return newObject;
        }
        return pembelian;
      });
    },
    FILL_TOTAL_PEMBELIAN_GUDANG(state, data) {
      state.totalPembelianGudang = data;
    },
    FILL_PEMBELIAN_GUDANG_OBAT(state, data) {
      state.pembelianGudangObat = data;
    },
    EDIT_PEMBELIAN_GUDANG_OBAT(state, data) {
      state.pembelianGudangObat = state.pembelianGudangObat.map((pembelian) => {
        if (pembelian.gudang_po_obat_ID === data.gudang_po_obat_ID) {
          const newObject = {
            ...data,
            obat_nama: pembelian.obat_nama,
            gudang_po_obat_price: pembelian.gudang_po_obat_price,
            gudang_po_obat_status: pembelian.gudang_po_obat_status,
          };
          return newObject;
        }
        return pembelian;
      });
    },
    FILL_LIST_GUDANG_RR(state, data) {
      state.gudangRr = data;
    },
    FILL_TOTAL_GUDANG_RR(state, data) {
      state.totalGudangRr = data;
    },
    FILL_LIST_GUDANG_RR_OBAT(state, data) {
      console.log(data);
      state.gudangRrObat = data;
    },
    INSERT_GUDANG_RR(state, data) {
      state.gudangRr.push(data);
    },
    FILL_LIST_GUDANG_RETUR(state, data) {
      state.gudangRetur = data;
    },
    FILL_LIST_GUDANG_RETUR_OBAT(state, data) {
      state.gudangReturObat = data;
    },
    INSERT_GUDANG_RETUR(state, data) {
      state.gudangRetur.push(data);
    },
    FILL_PERMINTAAN_FARMASI(state, data) {
      state.permintaanFarmasi = data;
    },
    FILL_TOTAL_PERMINTAAN_FARMASI(state, data) {
      state.totalPermintaanFarmasi = data;
    },
    EDIT_PERMINTAAN_FARMASI(state, data) {
      const newPermintaanFarmasi = state.permintaanFarmasi.map((item) => {
        if (data.farmasi_order_ID === item.farmasi_order_ID) {
          console.log(item);
          return {
            ...item,
            farmasi_order_status: data.farmasi_order_status,
          };
        }
        return item;
      });
      state.permintaanFarmasi = newPermintaanFarmasi;
    },
    FILL_PERMINTAAN_OBAT_FARMASI(state, data) {
      state.permintaanObatFarmasi = data;
    },
    EDIT_PERMINTAAN_OBAT_FARMASI(state, data) {
      const newPermintaanObatFarmasi = state.permintaanObatFarmasi.map(
        (item) => {
          if (data.farmasi_order_obat_ID === item.farmasi_order_obat_ID) {
            return {
              ...item,
              farmasi_order_obat_qty: data.farmasi_order_obat_qty,
              farmasi_order_obat_status: data.farmasi_order_obat_status,
              farmasi_order_obat_total: data.farmasi_order_obat_total,
            };
          }
          return item;
        }
      );
      state.permintaanObatFarmasi = newPermintaanObatFarmasi;
    },
    FILL_FARMASI_ALL(state, data) {
      state.farmasiAll = data;
    },
    FILL_TOTAL_FARMASI_ALL(state, data) {
      state.totalFarmasiAll = data;
    },
    EDIT_FARMASI_ALL(state, data) {
      const newFarmasiAll = state.farmasiAll.map((farmasi) => {
        if (farmasi.farmasi_ID === data.farmasi_ID) {
          return {
            ...farmasi,
            farmasi_stock: data.farmasi_stock,
            farmasi_batch_number: data.farmasi_batch_number,
            farmasi_satuan: data.farmasi_satuan,
          };
        }
        return farmasi;
      });
      state.farmasiAll = newFarmasiAll;
    },
    FILL_FARMASI_NEW(state, data) {
      state.farmasiNew = data;
    },
    FILL_TOTAL_FARMASI_NEW(state, data) {
      state.totalFarmasiNew = data;
    },
    FILL_FARMASI_ORDER(state, data) {
      state.farmasiOrder = data;
    },
    FILL_TOTAL_FARMASI_ORDER(state, data) {
      state.totalFarmasiOrder = data;
    },
    INSERT_FARMASI_ORDER(state, data) {
      state.farmasiOrder.push(data);
    },
    FILL_FARMASI_OBAT_ORDER(state, data) {
      state.farmasiObatOrder = data;
    },
  },
  actions: {
    handleNavMobile(context) {
      context.commit("CHANGE_MOBILE_NAV");
    },
    login(context, user) {
      axios.defaults.headers.common["X-Requested-With"] = "XMLHttpRequest";
      return axios
        .post(`${baseURL}/auth/login`, user, {
          headers: { "Content-Type": "application/json" },
        })
        .then((response) => {
          localStorage.setItem("token", response.data);
          context.commit("LOGIN_SUCCESS");
        });
    },
    tokenCheck(context, token) {
      axios.defaults.headers.common["X-Requested-With"] = "XMLHttpRequest";
      return axios
        .get(`${baseURL}/auth`, {
          headers: { "Content-Type": "application/json", token: token },
        })
        .then((response) => {
          context.commit("LOGIN_SUCCESS");
        });
    },
    getMasterDoctor(context, query) {
      axios.defaults.headers.common["X-Requested-With"] = "XMLHttpRequest";
      const token = localStorage.getItem("token");
      return axios
        .get(`${baseURL}/doctor`, {
          headers: {
            "Content-Type": "application/json",
            token: token,
            ...query,
          },
        })
        .then((response) => {
          context.commit("FILL_MASTER_DOCTOR", response.data.doctor);
          context.commit("FILL_TOTAL_DOCTOR", response.data.totalRows);
          return;
        });
    },
    createMasterDoctor(context, dokter) {
      axios.defaults.headers.common["X-Requested-With"] = "XMLHttpRequest";
      const token = localStorage.getItem("token");
      return axios
        .post(
          `${baseURL}/doctor`,
          {
            doctor_kode: dokter.kodeDokter,
            doctor_nama: dokter.namaDokter,
            doctor_glr_dpn: dokter.gelarDepanDokter,
            doctor_glr_blk: dokter.gelarBelakangDokter,
            doctor_kelamin: dokter.jenisKelaminDokter,
            doctor_alamat: dokter.alamatDokter,
            doctor_phone: dokter.noTelpRumahDokter,
            doctor_hp: dokter.noHpDokter,
            doctor_npwp: dokter.npwpDokter,
            doctor_status: dokter.statusDokter,
            doctor_pemeriksaan: dokter.pemeriksaanDokter,
            type: dokter.typeHarga,
            doctor_jasa: dokter.hargaJasaDokter,
            doctor_pembagian: dokter.pembagianDokter,
            dokter_on_visit: dokter.dokterOnVist,
            dokter_on_call: dokter.dokterOnCall,
          },
          { headers: { "Content-Type": "application/json", token: token } }
        )
        .then((response) => {
          const masterDoctor = response.data;
          context.commit("INSERT_MASTER_DOCTOR", masterDoctor);
          return;
        });
    },
    editMasterDoctor(context, dokter) {
      axios.defaults.headers.common["X-Requested-With"] = "XMLHttpRequest";
      const token = localStorage.getItem("token");
      return axios
        .put(
          `${baseURL}/doctor/${dokter.originalID}`,
          {
            doctor_nama: dokter.namaDokter,
            doctor_glr_dpn: dokter.gelarDepanDokter,
            doctor_glr_blk: dokter.gelarBelakangDokter,
            doctor_kelamin: dokter.jenisKelaminDokter,
            doctor_alamat: dokter.alamatDokter,
            doctor_phone: dokter.noTelpRumahDokter,
            doctor_hp: dokter.noHpDokter,
            doctor_npwp: dokter.npwpDokter,
            doctor_status: dokter.statusDokter,
            doctor_pemeriksaan: dokter.pemeriksaanDokter,
          },
          { headers: { "Content-Type": "application/json", token: token } }
        )
        .then((response) => {
          const editedDoctor = response.data;
          editedDoctor["doctor_kode"] = dokter.originalID;
          context.commit("EDIT_MASTER_DOCTOR", editedDoctor);
          return;
        });
    },
    deleteMasterDoctor(context, dokter) {
      axios.defaults.headers.common["X-Requested-With"] = "XMLHttpRequest";
      const token = localStorage.getItem("token");
      return axios
        .delete(`${baseURL}/doctor/${dokter.doctor_kode}`, {
          headers: { "Content-Type": "application/json", token: token },
        })
        .then((response) => {
          context.commit("DELETE_MASTER_DOCTOR", dokter);
          return;
        });
    },
    async getHargaDoctor(context, id) {
      axios.defaults.headers.common["X-Requested-With"] = "XMLHttpRequest";
      const token = localStorage.getItem("token");
      try {
        const hargaDoctor = await axios.get(`${baseURL}/doctor/${id}`, {
          headers: { "Content-Type": "application/json", token: token },
        });
        context.commit("FILL_HARGA_DOCTOR", hargaDoctor.data);
      } catch (error) {
        const errorStatus = { error }.error.response.status;
        if (errorStatus === 401) {
          context.commit("TOKEN_UPDATE");
          router.replace("/login");
          localStorage.clear();
        }
      }
    },
    createHargaDoctor(context, price) {
      axios.defaults.headers.common["X-Requested-With"] = "XMLHttpRequest";
      const token = localStorage.getItem("token");
      return axios
        .post(
          `${baseURL}/hargadoctor`,
          {
            doctor_kode: price.doctorKode,
            type: price.type,
            doctor_jasa: price.doctorJasa,
            doctor_pembagian: price.doctorPembagian,
            doctor_on_call: price.doctorOnCall,
            doctor_on_visit: price.doctorOnVisit,
          },
          { headers: { "Content-Type": "application/json", token: token } }
        )
        .then((response) => {
          context.commit("INSERT_HARGA_DOCTOR", response.data);
          return;
        });
    },
    editHargaDoctor(context, price) {
      axios.defaults.headers.common["X-Requested-With"] = "XMLHttpRequest";
      const token = localStorage.getItem("token");
      return axios
        .put(
          `${baseURL}/hargadoctor/${price.id}`,
          {
            doctor_jasa: price.doctorJasa,
            doctor_pembagian: price.doctorPembagian,
            doctor_on_call: price.doctorOnCall,
            doctor_on_visit: price.doctorOnVisit,
          },
          { headers: { "Content-Type": "application/json", token: token } }
        )
        .then((response) => {
          response.data["id"] = price.id;
          response.data["type"] = price.type;
          context.commit("EDIT_HARGA_DOCTOR", response.data);
          return;
        });
    },
    getMasterTindakan(context, query) {
      const token = localStorage.getItem("token");
      axios.defaults.headers.common["X-Requested-With"] = "XMLHttpRequest";
      return axios
        .get(`${baseURL}/tindakan`, {
          headers: {
            "Content-Type": "application/json",
            token: token,
            ...query,
          },
        })
        .then((response) => {
          context.commit("FILL_MASTER_TINDAKAN", response.data.tindakan);
          context.commit("FILL_TOTAL_TINDAKAN", response.data.totalRows);
          return;
        });
    },
    createMasterTindakan(context, tindakan) {
      axios.defaults.headers.common["X-Requested-With"] = "XMLHttpRequest";
      const token = localStorage.getItem("token");
      return axios
        .post(
          `${baseURL}/tindakan`,
          {
            tindakan_kode: tindakan.tindakanKode,
            tindakan_nama: tindakan.tindakanNama,
            type: tindakan.typeHarga,
            tindakan_harga: tindakan.tindakanHarga,
            tindakan_sewa_alat: tindakan.tindakanSewaAlat,
            tindakan_sewa_ruangan: tindakan.tindakanSewaRuangan,
            tindakan_jasa_operator: tindakan.tindakanJasaOperator,
            tindakan_jasa_aoperator: tindakan.tindakanJasaAOperator,
            tindakan_jasa_paramedis: tindakan.tindakanJasaParamedis,
          },
          { headers: { "Content-Type": "application/json", token: token } }
        )
        .then((response) => {
          const masterTindakan = response.data;
          context.commit("INSERT_MASTER_TINDAKAN", masterTindakan);
          return;
        });
    },
    editMasterTindakan(context, tindakan) {
      axios.defaults.headers.common["X-Requested-With"] = "XMLHttpRequest";
      const token = localStorage.getItem("token");
      return axios
        .put(
          `${baseURL}/tindakan/${tindakan.originalID}`,
          {
            tindakan_nama: tindakan.tindakanNama,
          },
          { headers: { "Content-Type": "application/json", token: token } }
        )
        .then((response) => {
          const editedTindakan = response.data;
          editedTindakan["tindakan_kode"] = tindakan.originalID;
          context.commit("EDIT_MASTER_TINDAKAN", editedTindakan);
          return;
        });
    },
    deleteMasterTindakan(context, tindakan) {
      axios.defaults.headers.common["X-Requested-With"] = "XMLHttpRequest";
      const token = localStorage.getItem("token");
      return axios
        .delete(`${baseURL}/tindakan/${tindakan.tindakan_kode}`, {
          headers: { "Content-Type": "application/json", token: token },
        })
        .then((response) => {
          context.commit("DELETE_MASTER_TINDAKAN", tindakan);
          return;
        });
    },
    async getHargaTindakan(context, id) {
      axios.defaults.headers.common["X-Requested-With"] = "XMLHttpRequest";
      const token = localStorage.getItem("token");
      try {
        const hargaTindakan = await axios.get(`${baseURL}/tindakan/${id}`, {
          headers: { "Content-Type": "application/json", token: token },
        });
        context.commit("FILL_HARGA_TINDAKAN", hargaTindakan.data);
      } catch (error) {
        const errorStatus = { error }.error.response.status;
        if (errorStatus === 401) {
          context.commit("TOKEN_UPDATE");
          router.replace("/login");
          localStorage.clear();
        }
      }
    },
    createHargaTindakan(context, price) {
      axios.defaults.headers.common["X-Requested-With"] = "XMLHttpRequest";
      const token = localStorage.getItem("token");
      return axios
        .post(
          `${baseURL}/hargatindakan`,
          {
            tindakan_kode: price.tindakanKode,
            type: price.type,
            tindakan_harga: price.tindakanHarga,
            tindakan_sewa_alat: price.tindakanSewaAlat,
            tindakan_sewa_ruangan: price.tindakanSewaRuangan,
            tindakan_jasa_operator: price.tindakanJasaOperator,
            tindakan_jasa_aoperator: price.tindakanJasaAOperator,
            tindakan_jasa_paramedis: price.tindakanJasaParamedis,
          },
          { headers: { "Content-Type": "application/json", token: token } }
        )
        .then((response) => {
          context.commit("INSERT_HARGA_TINDAKAN", response.data);
          return;
        });
    },
    editHargaTindakan(context, price) {
      axios.defaults.headers.common["X-Requested-With"] = "XMLHttpRequest";
      const token = localStorage.getItem("token");
      return axios
        .put(
          `${baseURL}/hargatindakan/${price.id}`,
          {
            tindakan_harga: price.tindakanHarga,
            tindakan_sewa_alat: price.tindakanSewaAlat,
            tindakan_sewa_ruangan: price.tindakanSewaRuangan,
            tindakan_jasa_operator: price.tindakanJasaOperator,
            tindakan_jasa_aoperator: price.tindakanJasaAOperator,
            tindakan_jasa_paramedis: price.tindakanJasaParamedis,
          },
          { headers: { "Content-Type": "application/json", token: token } }
        )
        .then((response) => {
          response.data["id"] = price.id;
          response.data["type"] = price.type;
          context.commit("EDIT_HARGA_TINDAKAN", response.data);
          return;
        });
    },
    getMasterLab(context, query) {
      axios.defaults.headers.common["X-Requested-With"] = "XMLHttpRequest";
      const token = localStorage.getItem("token");
      return axios
        .get(`${baseURL}/lab`, {
          headers: {
            "Content-Type": "application/json",
            token: token,
            ...query,
          },
        })
        .then((response) => {
          context.commit("FILL_MASTER_LAB", response.data.lab);
          context.commit("FILL_TOTAL_LAB", response.data.totalRows);
          return;
        });
    },
    createMasterLab(context, lab) {
      axios.defaults.headers.common["X-Requested-With"] = "XMLHttpRequest";
      const token = localStorage.getItem("token");
      return axios
        .post(
          `${baseURL}/lab`,
          {
            lab_kode: lab.labKode,
            lab_nama_pemeriksaan: lab.labNamaPemeriksaan,
            type: lab.typeHarga,
            harga_lab: lab.hargaLab,
          },
          { headers: { "Content-Type": "application/json", token: token } }
        )
        .then((response) => {
          const masterLab = response.data;
          context.commit("INSERT_MASTER_LAB", masterLab);
          return;
        });
    },
    editMasterLab(context, lab) {
      axios.defaults.headers.common["X-Requested-With"] = "XMLHttpRequest";
      const token = localStorage.getItem("token");
      return axios
        .put(
          `${baseURL}/lab/${lab.originalID}`,
          {
            lab_nama_pemeriksaan: lab.labNamaPemeriksaan,
          },
          { headers: { "Content-Type": "application/json", token: token } }
        )
        .then((response) => {
          const editedLab = response.data;
          editedLab["lab_kode"] = lab.originalID;
          context.commit("EDIT_MASTER_LAB", editedLab);
          return;
        });
    },
    deleteMasterLab(context, lab) {
      axios.defaults.headers.common["X-Requested-With"] = "XMLHttpRequest";
      const token = localStorage.getItem("token");
      return axios
        .delete(`${baseURL}/lab/${lab.lab_kode}`, {
          headers: { "Content-Type": "application/json", token: token },
        })
        .then((response) => {
          context.commit("DELETE_MASTER_LAB", lab);
          return;
        });
    },
    async getHargaLab(context, id) {
      axios.defaults.headers.common["X-Requested-With"] = "XMLHttpRequest";
      const token = localStorage.getItem("token");
      try {
        const hargaLab = await axios.get(`${baseURL}/lab/${id}`, {
          headers: { "Content-Type": "application/json", token: token },
        });
        context.commit("FILL_HARGA_LAB", hargaLab.data);
      } catch (error) {
        const errorStatus = { error }.error.response.status;
        if (errorStatus === 401) {
          context.commit("TOKEN_UPDATE");
          router.replace("/login");
          localStorage.clear();
        }
      }
    },
    createHargaLab(context, price) {
      axios.defaults.headers.common["X-Requested-With"] = "XMLHttpRequest";
      const token = localStorage.getItem("token");
      return axios
        .post(
          `${baseURL}/hargalab`,
          {
            lab_kode: price.labKode,
            type: price.type,
            harga_lab: price.hargaLab,
          },
          { headers: { "Content-Type": "application/json", token: token } }
        )
        .then((response) => {
          context.commit("INSERT_HARGA_LAB", response.data);
          return;
        });
    },
    editHargaLab(context, price) {
      axios.defaults.headers.common["X-Requested-With"] = "XMLHttpRequest";
      const token = localStorage.getItem("token");
      return axios
        .put(
          `${baseURL}/hargalab/${price.id}`,
          {
            harga_lab: price.hargaLab,
          },
          { headers: { "Content-Type": "application/json", token: token } }
        )
        .then((response) => {
          response.data["id"] = price.id;
          response.data["type"] = price.type;
          context.commit("EDIT_HARGA_LAB", response.data);
          return;
        });
    },
    getMasterRonsen(context, query) {
      axios.defaults.headers.common["X-Requested-With"] = "XMLHttpRequest";
      const token = localStorage.getItem("token");
      return axios
        .get(`${baseURL}/ronsen`, {
          headers: {
            "Content-Type": "application/json",
            token: token,
            ...query,
          },
        })
        .then((response) => {
          context.commit("FILL_MASTER_RONSEN", response.data.ronsen);
          context.commit("FILL_TOTAL_RONSEN", response.data.totalRows);
          return;
        });
    },
    createMasterRonsen(context, ronsen) {
      axios.defaults.headers.common["X-Requested-With"] = "XMLHttpRequest";
      const token = localStorage.getItem("token");
      return axios
        .post(
          `${baseURL}/ronsen`,
          {
            ronsen_kode: ronsen.ronsenKode,
            ronsen_nama_pemeriksaan: ronsen.ronsenNamaPemeriksaan,
            type: ronsen.typeHarga,
            harga: ronsen.harga,
          },
          { headers: { "Content-Type": "application/json", token: token } }
        )
        .then((response) => {
          const masterRonsen = response.data;
          context.commit("INSERT_MASTER_RONSEN", masterRonsen);
          return;
        });
    },
    editMasterRonsen(context, ronsen) {
      axios.defaults.headers.common["X-Requested-With"] = "XMLHttpRequest";
      const token = localStorage.getItem("token");
      return axios
        .put(
          `${baseURL}/ronsen/${ronsen.originalID}`,
          {
            ronsen_nama_pemeriksaan: ronsen.ronsenNamaPemeriksaan,
          },
          { headers: { "Content-Type": "application/json", token: token } }
        )
        .then((response) => {
          const editedRonsen = response.data;
          editedRonsen["ronsen_kode"] = ronsen.originalID;
          context.commit("EDIT_MASTER_RONSEN", editedRonsen);
          return;
        });
    },
    deleteMasterRonsen(context, ronsen) {
      axios.defaults.headers.common["X-Requested-With"] = "XMLHttpRequest";
      const token = localStorage.getItem("token");
      return axios
        .delete(`${baseURL}/ronsen/${ronsen.ronsen_kode}`, {
          headers: { "Content-Type": "application/json", token: token },
        })
        .then((response) => {
          context.commit("DELETE_MASTER_RONSEN", ronsen);
          return;
        });
    },
    async getHargaRonsen(context, id) {
      axios.defaults.headers.common["X-Requested-With"] = "XMLHttpRequest";
      const token = localStorage.getItem("token");
      try {
        const hargaRonsen = await axios.get(`${baseURL}/ronsen/${id}`, {
          headers: { "Content-Type": "application/json", token: token },
        });
        context.commit("FILL_HARGA_RONSEN", hargaRonsen.data);
      } catch (error) {
        const errorStatus = { error }.error.response.status;
        if (errorStatus === 401) {
          context.commit("TOKEN_UPDATE");
          router.replace("/login");
          localStorage.clear();
        }
      }
    },
    createHargaRonsen(context, price) {
      axios.defaults.headers.common["X-Requested-With"] = "XMLHttpRequest";
      const token = localStorage.getItem("token");
      return axios
        .post(
          `${baseURL}/hargaronsen`,
          {
            ronsen_kode: price.ronsenKode,
            type: price.type,
            harga: price.hargaRonsen,
          },
          { headers: { "Content-Type": "application/json", token: token } }
        )
        .then((response) => {
          context.commit("INSERT_HARGA_RONSEN", response.data);
          return;
        });
    },
    editHargaRonsen(context, price) {
      axios.defaults.headers.common["X-Requested-With"] = "XMLHttpRequest";
      const token = localStorage.getItem("token");
      return axios
        .put(
          `${baseURL}/hargaronsen/${price.id}`,
          {
            harga: price.hargaRonsen,
          },
          { headers: { "Content-Type": "application/json", token: token } }
        )
        .then((response) => {
          response.data["id"] = price.id;
          response.data["type"] = price.type;
          context.commit("EDIT_HARGA_RONSEN", response.data);
          return;
        });
    },
    getMasterObat(context, query) {
      axios.defaults.headers.common["X-Requested-With"] = "XMLHttpRequest";
      const token = localStorage.getItem("token");
      return axios
        .get(`${baseURL}/obat`, {
          headers: {
            "Content-Type": "application/json",
            token: token,
            ...query,
          },
        })
        .then((response) => {
          context.commit("FILL_MASTER_OBAT", response.data.obat);
          context.commit("FILL_TOTAL_OBAT", response.data.totalRows);
        });
    },
    createMasterObat(context, obat) {
      axios.defaults.headers.common["X-Requested-With"] = "XMLHttpRequest";
      const token = localStorage.getItem("token");
      return axios
        .post(
          `${baseURL}/obat`,
          {
            obat_kode: obat.obatKode,
            obat_nama: obat.obatNama,
            obat_komposisi: obat.obatKomposisi,
            obat_satuan: obat.obatSatuan,
            obat_hnappn: obat.obatHnappn,
            obat_persen: obat.obatPersen,
            obat_prinsipal: obat.obatPrinsipal,
            obat_jenis: obat.obatJenis,
            obat_diskon: obat.obatDiskon,
            obat_quantity: obat.obatQuantity,
            type: obat.typeHarga,
            harga_box: obat.hargaBox,
            harga_satuan: obat.hargaSatuan,
          },
          { headers: { "Content-Type": "application/json", token: token } }
        )
        .then((response) => {
          const masterObat = response.data;

          context.commit("INSERT_MASTER_OBAT", masterObat);
          return;
        });
    },
    editMasterObat(context, obat) {
      const token = localStorage.getItem("token");
      axios.defaults.headers.common["X-Requested-With"] = "XMLHttpRequest";
      return axios
        .put(
          `${baseURL}/obat/${obat.originalID}`,
          {
            obat_nama: obat.obatNama,
            obat_komposisi: obat.obatKomposisi,
            obat_satuan: obat.obatSatuan,
            obat_hnappn: obat.obatHnappn,
            obat_persen: obat.obatPersen,
            obat_prinsipal: obat.obatPrinsipal,
            obat_jenis: obat.obatJenis,
            obat_diskon: obat.obatDiskon,
            obat_quantity: obat.obatQuantity,
          },
          { headers: { "Content-Type": "application/json", token: token } }
        )
        .then((response) => {
          const editedObat = response.data;
          editedObat["obat_kode"] = obat.originalID;
          context.commit("EDIT_MASTER_OBAT", editedObat);
          return;
        });
    },
    deleteMasterObat(context, obat) {
      axios.defaults.headers.common["X-Requested-With"] = "XMLHttpRequest";
      const token = localStorage.getItem("token");
      return axios
        .delete(`${baseURL}/obat/${obat.obat_kode}`, {
          headers: { "Content-Type": "application/json", token: token },
        })
        .then((response) => {
          context.commit("DELETE_MASTER_OBAT", obat);
          return;
        });
    },
    async getHargaObat(context, id) {
      axios.defaults.headers.common["X-Requested-With"] = "XMLHttpRequest";
      const token = localStorage.getItem("token");
      try {
        const hargaObat = await axios.get(`${baseURL}/obat/${id}`, {
          headers: { "Content-Type": "application/json", token: token },
        });
        context.commit("FILL_HARGA_OBAT", hargaObat.data);
      } catch (error) {
        const errorStatus = { error }.error.response.status;
        if (errorStatus === 401) {
          context.commit("TOKEN_UPDATE");
          router.replace("/login");
          localStorage.clear();
        }
      }
    },
    createHargaObat(context, price) {
      axios.defaults.headers.common["X-Requested-With"] = "XMLHttpRequest";
      const token = localStorage.getItem("token");
      return axios
        .post(
          `${baseURL}/hargaobat`,
          {
            obat_kode: price.obatKode,
            type: price.type,
            harga_box: price.hargaBox,
            harga_satuan: price.hargaSatuan,
          },
          { headers: { "Content-Type": "application/json", token: token } }
        )
        .then((response) => {
          context.commit("INSERT_HARGA_OBAT", response.data);
          return;
        });
    },
    editHargaObat(context, price) {
      axios.defaults.headers.common["X-Requested-With"] = "XMLHttpRequest";
      const token = localStorage.getItem("token");
      return axios
        .put(
          `${baseURL}/hargaobat/${price.id}`,
          {
            harga_box: price.hargaBox,
            harga_satuan: price.hargaSatuan,
          },
          { headers: { "Content-Type": "application/json", token: token } }
        )
        .then((response) => {
          response.data["id"] = price.id;
          response.data["type"] = price.type;
          context.commit("EDIT_HARGA_OBAT", response.data);
          return;
        });
    },
    getMasterKamar(context, query) {
      axios.defaults.headers.common["X-Requested-With"] = "XMLHttpRequest";
      const token = localStorage.getItem("token");
      return axios
        .get(`${baseURL}/kamar`, {
          headers: {
            "Content-Type": "application/json",
            token: token,
            ...query,
          },
        })
        .then((response) => {
          context.commit("FILL_MASTER_KAMAR", response.data.kamar);
          context.commit("FILL_TOTAL_KAMAR", response.data.totalRows);
          return;
        });
    },
    createMasterKamar(context, kamar) {
      axios.defaults.headers.common["X-Requested-With"] = "XMLHttpRequest";
      const token = localStorage.getItem("token");
      return axios
        .post(
          `${baseURL}/kamar`,
          {
            nama: kamar.nama,
            lantai: kamar.lantai,
            kelas: kamar.kelas,
            type: kamar.type,
            kapasitas: kamar.kapasitas,
            harga: kamar.harga,
          },
          { headers: { "Content-Type": "application/json", token: token } }
        )
        .then((response) => {
          const newKamar = { id: response.data, nama: kamar.nama };
          context.commit("INSERT_MASTER_KAMAR", newKamar);
          return;
        });
    },
    editMasterKamar(context, kamar) {
      axios.defaults.headers.common["X-Requested-With"] = "XMLHttpRequest";
      const token = localStorage.getItem("token");
      return axios
        .put(
          `${baseURL}/kamar/${kamar.id}`,
          {
            nama: kamar.nama,
            lantai: kamar.lantai,
          },
          { headers: { "Content-Type": "application/json", token: token } }
        )
        .then((response) => {
          response.data["id"] = kamar.id;
          context.commit("EDIT_MASTER_KAMAR", response.data);
          return;
        });
    },
    async getHargaKamar(context, id) {
      axios.defaults.headers.common["X-Requested-With"] = "XMLHttpRequest";
      const token = localStorage.getItem("token");
      try {
        const hargaKamar = await axios.get(`${baseURL}/kamar/${id}`, {
          headers: { "Content-Type": "application/json", token: token },
        });
        context.commit("FILL_HARGA_KAMAR", hargaKamar.data);
      } catch (error) {
        const errorStatus = { error }.error.response.status;
        if (errorStatus === 401) {
          context.commit("TOKEN_UPDATE");
          router.replace("/login");
          localStorage.clear();
        }
      }
    },
    createHargaKamar(context, price) {
      axios.defaults.headers.common["X-Requested-With"] = "XMLHttpRequest";
      const token = localStorage.getItem("token");
      return axios
        .post(
          `${baseURL}/hargakamar`,
          {
            kamar_id: price.kamarId,
            kelas: price.kelas,
            type: price.type,
            kapasitas: price.kapasitas,
            harga: price.harga,
          },
          { headers: { "Content-Type": "application/json", token: token } }
        )
        .then((response) => {
          const newKamar = {
            id: response.data,
            kamar_id: price.kamarId,
            kelas: price.kelas,
            type: price.type,
            kapasitas: price.kapasitas,
            harga: price.harga,
          };
          context.commit("INSERT_HARGA_KAMAR", newKamar);
          return;
        });
    },
    editHargaKamar(context, price) {
      axios.defaults.headers.common["X-Requested-With"] = "XMLHttpRequest";
      const token = localStorage.getItem("token");
      return axios
        .put(
          `${baseURL}/hargakamar/${price.id}`,
          {
            kelas: price.kelas,
            kapasitas: price.kapasitas,
            harga: price.harga,
          },
          { headers: { "Content-Type": "application/json", token: token } }
        )
        .then((response) => {
          response.data["id"] = price.id;
          response.data["type"] = price.type;
          context.commit("EDIT_HARGA_KAMAR", response.data);
          return;
        });
    },
    getMasterPerusahaan(context, query) {
      axios.defaults.headers.common["X-Requested-With"] = "XMLHttpRequest";
      const token = localStorage.getItem("token");
      return axios
        .get(`${baseURL}/perusahaan`, {
          headers: {
            "Content-Type": "application/json",
            token: token,
            ...query,
          },
        })
        .then((response) => {
          context.commit("FILL_MASTER_PERUSAHAAN", response.data.perusahaan);
          context.commit("FILL_TOTAL_PERUSAHAAN", response.data.totalRows);
          return;
        });
    },
    createMasterPerusahaan(context, perusahaan) {
      axios.defaults.headers.common["X-Requested-With"] = "XMLHttpRequest";
      const token = localStorage.getItem("token");
      return axios
        .post(
          `${baseURL}/perusahaan`,
          {
            master_perusahaan_nama: perusahaan.masterPerusahaanNama,
            master_perusahaan_alamat: perusahaan.masterPerusahaanAlamat,
            master_perusahaan_telpon: perusahaan.masterPerusahaanTelpon,
            master_perusahaan_harga: perusahaan.masterPerusahaanHarga,
          },
          { headers: { "Content-Type": "application/json", token: token } }
        )
        .then((response) => {
          const masterPerusahaan = response.data;
          context.commit("INSERT_MASTER_PERUSAHAAN", masterPerusahaan);
          return;
        });
    },
    editMasterPerusahaan(context, perusahaan) {
      axios.defaults.headers.common["X-Requested-With"] = "XMLHttpRequest";
      const token = localStorage.getItem("token");
      return axios
        .put(
          `${baseURL}/perusahaan/${perusahaan.originalID}`,
          {
            master_perusahaan_nama: perusahaan.masterPerusahaanNama,
            master_perusahaan_alamat: perusahaan.masterPerusahaanAlamat,
            master_perusahaan_telpon: perusahaan.masterPerusahaanTelpon,
            master_perusahaan_harga: perusahaan.masterPerusahaanHarga,
          },
          { headers: { "Content-Type": "application/json", token: token } }
        )
        .then((response) => {
          const editedPerusahaan = response.data;
          editedPerusahaan["master_perusahaan_ID"] = perusahaan.originalID;
          context.commit("EDIT_MASTER_PERUSAHAAN", editedPerusahaan);
          return;
        });
    },
    deleteMasterPerusahaan(context, perusahaan) {
      axios.defaults.headers.common["X-Requested-With"] = "XMLHttpRequest";
      const token = localStorage.getItem("token");
      return axios
        .delete(`${baseURL}/perusahaan/${perusahaan.master_perusahaan_ID}`, {
          headers: { "Content-Type": "application/json", token: token },
        })
        .then((response) => {
          context.commit("DELETE_MASTER_PERUSAHAAN", perusahaan);
          return;
        });
    },
    getMasterAsuransi(context, query) {
      axios.defaults.headers.common["X-Requested-With"] = "XMLHttpRequest";
      const token = localStorage.getItem("token");
      return axios
        .get(`${baseURL}/asuransi`, {
          headers: {
            "Content-Type": "application/json",
            token: token,
            ...query,
          },
        })
        .then((response) => {
          context.commit("FILL_MASTER_ASURANSI", response.data.asuransi);
          context.commit("FILL_TOTAL_ASURANSI", response.data.totalRows);
          return;
        });
    },
    createMasterAsuransi(context, asuransi) {
      axios.defaults.headers.common["X-Requested-With"] = "XMLHttpRequest";
      const token = localStorage.getItem("token");
      return axios
        .post(
          `${baseURL}/asuransi`,
          {
            master_asuransi_nama: asuransi.masterAsuransiNama,
            master_asuransi_alamat: asuransi.masterAsuransiAlamat,
            master_asuransi_telpon: asuransi.masterAsuransiTelpon,
            master_asuransi_harga: asuransi.masterAsuransiHarga,
          },
          { headers: { "Content-Type": "application/json", token: token } }
        )
        .then((response) => {
          const masterAsuransi = response.data;
          context.commit("INSERT_MASTER_ASURANSI", masterAsuransi);
          return;
        });
    },
    editMasterAsuransi(context, asuransi) {
      axios.defaults.headers.common["X-Requested-With"] = "XMLHttpRequest";
      const token = localStorage.getItem("token");
      return axios
        .put(
          `${baseURL}/asuransi/${asuransi.originalID}`,
          {
            master_asuransi_nama: asuransi.masterAsuransiNama,
            master_asuransi_alamat: asuransi.masterAsuransiAlamat,
            master_asuransi_telpon: asuransi.masterAsuransiTelpon,
            master_asuransi_harga: asuransi.masterAsuransiHarga,
          },
          { headers: { "Content-Type": "application/json", token: token } }
        )
        .then((response) => {
          const editedAsuransi = response.data;
          editedAsuransi["master_perusahaan_ID"] = asuransi.originalID;
          context.commit("EDIT_MASTER_ASURANSI", editedAsuransi);
          return;
        });
    },
    deleteMasterAsuransi(context, asuransi) {
      axios.defaults.headers.common["X-Requested-With"] = "XMLHttpRequest";
      const token = localStorage.getItem("token");
      return axios
        .delete(`${baseURL}/asuransi/${asuransi.master_asuransi_ID}`, {
          headers: { "Content-Type": "application/json", token: token },
        })
        .then((response) => {
          context.commit("DELETE_MASTER_ASURANSI", asuransi);
          return;
        });
    },
    getMasterDistributor(context, query) {
      axios.defaults.headers.common["X-Requested-With"] = "XMLHttpRequest";
      const token = localStorage.getItem("token");
      return axios
        .get(`${baseURL}/distributor`, {
          headers: {
            "Content-Type": "application/json",
            token: token,
            ...query,
          },
        })
        .then((response) => {
          context.commit("FILL_MASTER_DISTRIBUTOR", response.data.distributor);
          context.commit("FILL_TOTAL_DISTRIBUTOR", response.data.totalRows);
          return;
        });
    },
    createMasterDistributor(context, distributor) {
      axios.defaults.headers.common["X-Requested-With"] = "XMLHttpRequest";
      const token = localStorage.getItem("token");
      return axios
        .post(
          `${baseURL}/distributor`,
          {
            master_distributor_nama: distributor.masterDistributorNama,
            master_distributor_alamat: distributor.masterDistributorAlamat,
            master_distributor_telpon: distributor.masterDistributorTelpon,
          },
          { headers: { "Content-Type": "application/json", token: token } }
        )
        .then((response) => {
          const masterDistributor = response.data;
          context.commit("INSERT_MASTER_DISTRIBUTOR", masterDistributor);
          return;
        });
    },
    editMasterDistributor(context, distributor) {
      axios.defaults.headers.common["X-Requested-With"] = "XMLHttpRequest";
      const token = localStorage.getItem("token");
      return axios
        .put(
          `${baseURL}/distributor/${distributor.originalID}`,
          {
            master_distributor_nama: distributor.masterDistributorNama,
            master_distributor_alamat: distributor.masterDistributorAlamat,
            master_distributor_telpon: distributor.masterDistributorTelpon,
          },
          { headers: { "Content-Type": "application/json", token: token } }
        )
        .then((response) => {
          const editedDistributor = response.data;
          editedDistributor["master_distributor_ID"] = distributor.originalID;
          context.commit("EDIT_MASTER_DISTRIBUTOR", editedDistributor);
          return;
        });
    },
    deleteMasterDistributor(context, distributor) {
      axios.defaults.headers.common["X-Requested-With"] = "XMLHttpRequest";
      const token = localStorage.getItem("token");
      return axios
        .delete(`${baseURL}/distributor/${distributor.master_distributor_ID}`, {
          headers: { "Content-Type": "application/json", token: token },
        })
        .then((response) => {
          context.commit("DELETE_MASTER_DISTRIBUTOR", distributor);
          return;
        });
    },
    getMasterUser(context, query) {
      axios.defaults.headers.common["X-Requested-With"] = "XMLHttpRequest";
      const token = localStorage.getItem("token");
      return axios
        .get(`${baseURL}/user`, {
          headers: {
            "Content-Type": "application/json",
            token: token,
            ...query,
          },
        })
        .then((response) => {
          context.commit("FILL_MASTER_USER", response.data.user);
          context.commit("FILL_TOTAL_USER", response.data.totalRows);
          return;
        });
    },
    createMasterUser(context, user) {
      axios.defaults.headers.common["X-Requested-With"] = "XMLHttpRequest";
      const token = localStorage.getItem("token");
      return axios
        .post(
          `${baseURL}/user`,
          {
            pusername: user.pUsername,
            ppassword: user.pPassword,
            pfirstname: user.pFirstName,
            plastname: user.pLastName,
            role: user.role,
            location: user.location,
          },
          { headers: { "Content-Type": "application/json", token: token } }
        )
        .then((response) => {
          const masterUser = response.data;
          context.commit("INSERT_MASTER_USER", masterUser);
          return;
        });
    },
    editMasterUser(context, user) {
      const token = localStorage.getItem("token");
      let inputtedUser = {
        pfirstname: user.pFirstName,
        plastname: user.pLastName,
        role: user.role,
        location: user.location,
      };
      if (user.pUsername !== user.originalUsername) {
        inputtedUser["pusername"] = user.pUsername;
      }
      if (user.pPassword.length > 0) {
        inputtedUser["ppassword"] = user.pPassword;
      }
      axios.defaults.headers.common["X-Requested-With"] = "XMLHttpRequest";
      return axios
        .put(`${baseURL}/user/${user.originalID}`, inputtedUser, {
          headers: { "Content-Type": "application/json", token: token },
        })
        .then((response) => {
          const editedUser = response.data;
          editedUser["user_ID"] = user.originalID;
          if (user.pUsername === user.originalUsername) {
            editedUser["pusername"] = user.pUsername;
          }
          context.commit("EDIT_MASTER_USER", editedUser);
          return;
        });
    },
    deleteMasterUser(context, user) {
      axios.defaults.headers.common["X-Requested-With"] = "XMLHttpRequest";
      const token = localStorage.getItem("token");
      return axios
        .delete(`${baseURL}/user/${user.user_ID}`, {
          headers: { "Content-Type": "application/json", token: token },
        })
        .then((response) => {
          context.commit("DELETE_MASTER_USER", user);
          return;
        });
    },
    async getMasterType(context) {
      axios.defaults.headers.common["X-Requested-With"] = "XMLHttpRequest";
      const token = localStorage.getItem("token");
      try {
        const masterType = await axios.get(`${baseURL}/type`, {
          headers: { "Content-Type": "application/json", token: token },
        });
        context.commit("FILL_MASTER_TYPE", masterType.data);
      } catch (error) {
        const errorStatus = { error }.error.response.status;
        if (errorStatus === 401) {
          context.commit("TOKEN_UPDATE");
          router.replace("/login");
          localStorage.clear();
        }
      }
    },
    createMasterType(context, type) {
      const token = localStorage.getItem("token");
      let nama = "";
      for (let i = 0; i < type.name.length; i++) {
        nama += type.name[i].toUpperCase();
      }
      type.name = nama;
      axios.defaults.headers.common["X-Requested-With"] = "XMLHttpRequest";
      return axios
        .post(`${baseURL}/type`, type, {
          headers: { "Content-Type": "application/json", token: token },
        })
        .then((response) => {
          context.commit("INSERT_MASTER_TYPE", response.data);
          return;
        });
    },
    editMasterType(context, type) {
      const token = localStorage.getItem("token");
      let nama = "";
      for (let i = 0; i < type.name.length; i++) {
        nama += type.name[i].toUpperCase();
      }
      type.name = nama;
      return axios
        .put(`${baseURL}/type/${type.originalName}`, type, {
          headers: { "Content-Type": "application/json", token: token },
        })
        .then((response) => {
          response.data.originalName = type.originalName;
          context.commit("EDIT_MASTER_TYPE", response.data);
          return;
        });
    },
    async getMasterLantai(context) {
      axios.defaults.headers.common["X-Requested-With"] = "XMLHttpRequest";
      const token = localStorage.getItem("token");
      try {
        const masterLantai = await axios.get(`${baseURL}/lantai`, {
          headers: { "Content-Type": "application/json", token: token },
        });
        context.commit("FILL_MASTER_LANTAI", masterLantai.data);
      } catch (error) {
        const errorStatus = { error }.error.response.status;
        if (errorStatus === 401) {
          context.commit("TOKEN_UPDATE");
          router.replace("/login");
          localStorage.clear();
        }
      }
    },
    createMasterLantai(context, lantai) {
      axios.defaults.headers.common["X-Requested-With"] = "XMLHttpRequest";
      const token = localStorage.getItem("token");
      return axios
        .post(
          `${baseURL}/lantai`,
          {
            lantai: lantai.lantai,
          },
          { headers: { "Content-Type": "application/json", token: token } }
        )
        .then((response) => {
          context.commit("INSERT_MASTER_LANTAI", response.data);
          return;
        });
    },
    editMasterLantai(context, lantai) {
      axios.defaults.headers.common["X-Requested-With"] = "XMLHttpRequest";
      const token = localStorage.getItem("token");
      return axios
        .put(`${baseURL}/lantai/${lantai.originalLantai}`, lantai, {
          headers: { "Content-Type": "application/json", token: token },
        })
        .then((response) => {
          context.commit("EDIT_MASTER_LANTAI", response.data);
          return;
        });
    },
    getMasterDistributorObat(context, query) {
      axios.defaults.headers.common["X-Requested-With"] = "XMLHttpRequest";
      const token = localStorage.getItem("token");
      return axios
        .get(`${baseURL}/distributorobat`, {
          headers: {
            "Content-Type": "application/json",
            token: token,
            ...query,
          },
        })
        .then((response) => {
          context.commit(
            "FILL_MASTER_DISTRIBUTOR_OBAT",
            response.data.distributorObat
          );
          context.commit(
            "FILL_TOTAL_DISTRIBUTOR_OBAT",
            response.data.totalRows
          );
          return;
        });
    },
    createMasterDistributorObat(context, distributorObat) {
      axios.defaults.headers.common["X-Requested-With"] = "XMLHttpRequest";
      const token = localStorage.getItem("token");
      return axios
        .post(`${baseURL}/distributorobat`, distributorObat, {
          headers: {
            "Content-Type": "application/json",
            token: token,
          },
        })
        .then((response) => {
          context.commit(
            "INSERT_MASTER_DISTRIBUTOR_OBAT",
            response.data.selected
          );
          return;
        });
    },
    editMasterDistributorObat(context, distributorObat) {
      axios.defaults.headers.common["X-Requested-With"] = "XMLHttpRequest";
      const token = localStorage.getItem("token");
      return axios
        .put(
          `${baseURL}/distributorobat/${distributorObat.distributorObatKode}`,
          {
            harga: distributorObat.harga,
          },
          {
            headers: {
              "Content-Type": "application/json",
              token: token,
            },
          }
        )
        .then((response) => {
          context.commit("EDIT_MASTER_DISTRIBUTOR_OBAT", response.data);
          return;
        });
    },
    deleteMasterDistributorObat(context, distributorObat) {
      axios.defaults.headers.common["X-Requested-With"] = "XMLHttpRequest";
      const token = localStorage.getItem("token");
      return axios
        .delete(
          `${baseURL}/distributorobat/${distributorObat.distributor_obat_kode}`,
          {
            headers: {
              "Content-Type": "application/json",
              token: token,
            },
          }
        )
        .then((response) => {
          context.commit("DELETE_MASTER_DISTRIBUTOR_OBAT", distributorObat);
          return;
        });
    },
    getMasterDistributorObatFilter(context, query) {
      axios.defaults.headers.common["X-Requested-With"] = "XMLHttpRequest";
      const token = localStorage.getItem("token");
      return axios
        .get(`${baseURL}/distributorobat/filter`, {
          headers: {
            "Content-Type": "application/json",
            token: token,
            ...query,
          },
        })
        .then((response) => {
          context.commit(
            "FILL_MASTER_DISTRIBUTOR_OBAT_FILTER",
            response.data.distributorObat
          );
          context.commit(
            "FILL_TOTAL_DISTRIBUTOR_OBAT_FILTER",
            response.data.totalRows
          );
          return;
        });
    },
    getMasterTypeObat(context, query) {
      axios.defaults.headers.common["X-Requested-With"] = "XMLHttpRequest";
      const token = localStorage.getItem("token");
      return axios
        .get(`${baseURL}/typeobat`, {
          headers: {
            "Content-Type": "application/json",
            token,
            ...query,
          },
        })
        .then((response) => {
          context.commit("FILL_MASTER_TYPE_OBAT", response.data);
          context.commit("FILL_TOTAL_TYPE_OBAT", response.data.length);
          return;
        });
    },
    createMasterTypeObat(context, typeObat) {
      axios.defaults.headers.common["X-Requested-With"] = "XMLHttpRequest";
      const token = localStorage.getItem("token");
      return axios
        .post(
          `${baseURL}/typeobat`,
          {
            master_tipe_obat_nama: typeObat.masterTipeObatNama,
            master_tipe_obat_status: typeObat.masterTipeObatStatus,
          },
          {
            headers: {
              "Content-Type": "application/json",
              token,
            },
          }
        )
        .then((response) => {
          context.commit("INSERT_MASTER_TYPE_OBAT", response.data.data);
          return;
        });
    },
    editMasterTypeObat(context, typeObat) {
      axios.defaults.headers.common["X-Requested-With"] = "XMLHttpRequest";
      const token = localStorage.getItem("token");
      const edited = {
        master_tipe_obat_nama: typeObat.masterTypeObatNama,
        master_tipe_obat_status: typeObat.masterTypeObatStatus,
      };
      const params = encodeURI(typeObat.realName);
      return axios
        .put(`${baseURL}/typeobat/${params}`, edited, {
          headers: {
            "Content-Type": "application/json",
            token,
          },
        })
        .then((response) => {
          context.commit("EDIT_MASTER_TYPE_OBAT", typeObat);
          return;
        });
    },
    getListGudangAll(context, query) {
      axios.defaults.headers.common["X-Requested-With"] = "XMLHttpRequest";
      const token = localStorage.getItem("token");
      return axios
        .get(`${baseURL}/gudang`, {
          headers: {
            "Content-Type": "application/json",
            token: token,
            ...query,
          },
        })
        .then((response) => {
          context.commit("FILL_LIST_GUDANG_ALL", response.data.gudang);
          context.commit("FILL_TOTAL_GUDANG_ALL", response.data.totalRows);
          return;
        });
    },
    editListGudangAll(context, gudang) {
      axios.defaults.headers.common["X-Requested-With"] = "XMLHttpRequest";
      const token = localStorage.getItem("token");
      return axios
        .put(`${baseURL}/gudang/${gudang.gudangId}`, gudang, {
          headers: {
            "Content-Type": "application/json",
            token: token,
          },
        })
        .then((response) => {
          context.commit("EDIT_LIST_GUDANG_ALL", response.data);
          return;
        });
    },
    getListNewGudang(context, query) {
      axios.defaults.headers.common["X-Requested-With"] = "XMLHttpRequest";
      const token = localStorage.getItem("token");
      return axios
        .get(`${baseURL}/gudang/new`, {
          headers: {
            "Content-Type": "application/json",
            token: token,
            ...query,
          },
        })
        .then((response) => {
          context.commit("FILL_LIST_NEW_GUDANG", response.data.gudang);
          context.commit("FILL_TOTAL_NEW_GUDANG", response.data.totalRows);
          return;
        });
    },
    editListNewGudang(context, gudang) {
      axios.defaults.headers.common["X-Requested-With"] = "XMLHttpRequest";
      const token = localStorage.getItem("token");
      return axios
        .put(`${baseURL}/gudang/${gudang.gudangId}`, gudang, {
          headers: {
            "Content-Type": "application/json",
            token: token,
          },
        })
        .then((response) => {
          context.commit("EDIT_LIST_NEW_GUDANG", response.data);
          return;
        });
    },
    getPembelianGudang(context, query) {
      axios.defaults.headers.common["X-Requested-With"] = "XMLHttpRequest";
      const token = localStorage.getItem("token");
      return axios
        .get(`${baseURL}/gudangpo`, {
          headers: {
            "Content-Type": "application/json",
            token: token,
            ...query,
          },
        })
        .then((response) => {
          context.commit("FILL_PEMBELIAN_GUDANG", response.data.gudangPo);
          context.commit(
            "FILL_TOTAL_PEMBELIAN_GUDANG",
            response.data.totalRows
          );
          return;
        });
    },
    createPembelianGudang(context, pembelian) {
      axios.defaults.headers.common["X-Requested-With"] = "XMLHttpRequest";
      const token = localStorage.getItem("token");
      return axios
        .post(`${baseURL}/gudangpo`, pembelian, {
          headers: {
            "Content-Type": "application/json",
            token: token,
          },
        })
        .then((response) => {
          context.commit("INSERT_PEMBELIAN_GUDANG", response.data);
          return;
        });
    },
    editPembelianGudang(context, pembelian) {
      axios.defaults.headers.common["X-Requested-With"] = "XMLHttpRequest";
      const token = localStorage.getItem("token");
      return axios
        .put(`${baseURL}/gudangpo/${pembelian.poId}`, pembelian, {
          headers: {
            "Content-Type": "application/json",
            token: token,
          },
        })
        .then((response) => {
          context.commit("EDIT_PEMBELIAN_GUDANG", response.data);
          return;
        });
    },
    getPembelianGudangObat(context, id) {
      axios.defaults.headers.common["X-Requested-With"] = "XMLHttpRequest";
      const token = localStorage.getItem("token");
      return axios
        .get(`${baseURL}/gudangpo/${id}`, {
          headers: {
            "Content-Type": "application/json",
            token: token,
          },
        })
        .then((response) => {
          context.commit("FILL_PEMBELIAN_GUDANG_OBAT", response.data);
          return;
        });
    },
    editPembelianGudangObat(context, pembelianGudangObat) {
      axios.defaults.headers.common["X-Requested-With"] = "XMLHttpRequest";
      const token = localStorage.getItem("token");
      return axios
        .put(
          `${baseURL}/gudangpoobat/${pembelianGudangObat.id}`,
          pembelianGudangObat,
          {
            headers: {
              "Content-Type": "application/json",
              token: token,
            },
          }
        )
        .then((response) => {
          context.commit("EDIT_PEMBELIAN_GUDANG_OBAT", response.data);
          return;
        });
    },
    getListGudangRr(context, query) {
      axios.defaults.headers.common["X-Requested-With"] = "XMLHttpRequest";
      const token = localStorage.getItem("token");
      return axios
        .get(`${baseURL}/gudangrr/datapo/${query.poId}`, {
          headers: {
            "Content-Type": "application/json",
            token: token,
            ...query,
          },
        })
        .then((response) => {
          context.commit("FILL_LIST_GUDANG_RR", response.data);
          return;
        });
    },
    getGudangRrObat(context, rrId) {
      axios.defaults.headers.common["X-Requested-With"] = "XMLHttpRequest";
      const token = localStorage.getItem("token");
      return axios
        .get(`${baseURL}/gudangrr/${rrId}`, {
          headers: {
            "Content-Type": "application/json",
            token: token,
          },
        })
        .then((response) => {
          context.commit("FILL_LIST_GUDANG_RR_OBAT", response.data);
          return;
        });
    },
    createGudangRr(context, formInput) {
      axios.defaults.headers.common["X-Requested-With"] = "XMLHttpRequest";
      const token = localStorage.getItem("token");
      const poId = formInput.selected[0].gudang_po_ID;
      const selected = formInput.selected.map((data) => {
        return {
          obat_kode: data.obat_kode,
          gudangRrObatQuantity: data.gudangRrQuantity,
          harga_obat: data.gudang_po_obat_price,
        };
      });
      return axios
        .post(
          `${baseURL}/gudangrr`,
          {
            gudang_po_ID: poId,
            selected,
          },
          {
            headers: {
              "Content-Type": "application/json",
              token: token,
            },
          }
        )
        .then((response) => {
          console.log(response.data);
          context.commit("INSERT_GUDANG_RR", response.data.data);
          return;
        });
    },
    getListGudangRetur(context, poId) {
      axios.defaults.headers.common["X-Requested-With"] = "XMLHttpRequest";
      const token = localStorage.getItem("token");
      return axios
        .get(`${baseURL}/gudangretur/datapo/${poId}`, {
          headers: {
            "Content-Type": "application/json",
            token: token,
          },
        })
        .then((response) => {
          context.commit("FILL_LIST_GUDANG_RETUR", response.data);
          return;
        });
    },
    getGudangReturObat(context, returId) {
      axios.defaults.headers.common["X-Requested-With"] = "XMLHttpRequest";
      const token = localStorage.getItem("token");
      return axios
        .get(`${baseURL}/gudangretur/${returId}`, {
          headers: {
            "Content-Type": "application/json",
            token: token,
          },
        })
        .then((response) => {
          context.commit("FILL_LIST_GUDANG_RETUR_OBAT", response.data);
          return;
        });
    },
    createGudangRetur(context, formInput) {
      axios.defaults.headers.common["X-Requested-With"] = "XMLHttpRequest";
      const token = localStorage.getItem("token");
      const poId = formInput.selected[0].gudang_po_ID;
      const selected = formInput.selected.map((data) => {
        return {
          obat_kode: data.obat_kode,
          gudangReturObatQuantity: data.gudangReturObatQuantity,
          harga_obat: data.gudang_po_obat_price,
          gudangReturObatTotal: data.gudangReturObatTotal,
        };
      });
      return axios
        .post(
          `${baseURL}/gudangretur`,
          {
            gudang_po_ID: poId,
            selected,
          },
          {
            headers: {
              "Content-Type": "application/json",
              token: token,
            },
          }
        )
        .then((response) => {
          context.commit("INSERT_GUDANG_RETUR", response.data.data);
          return;
        });
    },
    getPermintaanFarmasi(context, query) {
      axios.defaults.headers.common["X-Requested-With"] = "XMLHttpRequest";
      const token = localStorage.getItem("token");
      return axios
        .get(`${baseURL}/farmasiorder/status/PENDING`, {
          headers: {
            "Content-Type": "application/json",
            token,
            ...query,
          },
        })
        .then((response) => {
          context.commit("FILL_PERMINTAAN_FARMASI", response.data.farmasiorder);
          context.commit(
            "FILL_TOTAL_PERMINTAAN_FARMASI",
            response.data.totalRows
          );
          return;
        });
    },
    editPermintaanFarmasi(context, permintaanFarmasi) {
      axios.defaults.headers.common["X-Requested-With"] = "XMLHttpRequest";
      const token = localStorage.getItem("token");
      return axios
        .put(
          `${baseURL}/farmasiorder/${permintaanFarmasi.inputtedId}`,
          {
            farmasi_order_status: permintaanFarmasi.farmasiOrderStatus,
          },
          {
            headers: {
              "Content-Type": "application/json",
              token,
            },
          }
        )
        .then((response) => {
          console.log(response);
          context.commit("EDIT_PERMINTAAN_FARMASI", response.data);
          return;
        });
    },
    getPermintaanObatFarmasi(context, farmasiOrderId) {
      axios.defaults.headers.common["X-Requested-With"] = "XMLHttpRequest";
      const token = localStorage.getItem("token");
      const params = {
        page: 1,
        itemsPerPage: 10,
        search: "",
        sortBy: undefined,
        sortDesc: undefined,
      };
      return axios
        .get(`${baseURL}/farmasiorder/obat/${farmasiOrderId}`, {
          headers: {
            "Content-Type": "application/json",
            token,
            ...params,
          },
        })
        .then((response) => {
          context.commit("FILL_PERMINTAAN_OBAT_FARMASI", response.data.data);
          return;
        });
    },
    editPermintaanObatFarmasi(context, permintaanObatFarmasi) {
      axios.defaults.headers.common["X-Requested-With"] = "XMLHttpRequest";
      const token = localStorage.getItem("token");
      return axios
        .put(
          `${baseURL}/farmasiorderobat/${permintaanObatFarmasi.id}`,
          {
            farmasi_order_obat_qty: permintaanObatFarmasi.farmasiOrderObatQty,
            farmasi_order_obat_price:
              permintaanObatFarmasi.farmasiOrderObatPrice,
          },
          {
            headers: {
              "Content-Type": "application/json",
              token,
            },
          }
        )
        .then((response) => {
          context.commit("EDIT_PERMINTAAN_OBAT_FARMASI", response.data);
          return;
        });
    },
    getFarmasiAll(context, query) {
      axios.defaults.headers.common["X-Requested-With"] = "XMLHttpRequest";
      const token = localStorage.getItem("token");
      return axios
        .get(`${baseURL}/farmasi`, {
          headers: {
            "Content-Type": "application/json",
            token: token,
            ...query,
          },
        })
        .then((response) => {
          context.commit("FILL_FARMASI_ALL", response.data.farmasi);
          context.commit("FILL_TOTAL_FARMASI_ALL", response.data.totalRows);
          return;
        });
    },
    editFarmasiAll(context, farmasiAll) {
      axios.defaults.headers.common["X-Requested-With"] = "XMLHttpRequest";
      const token = localStorage.getItem("token");
      return axios
        .put(
          `${baseURL}/farmasi/${farmasiAll.farmasiId}`,
          {
            farmasiStock: farmasiAll.farmasiStock,
            farmasiSatuan: farmasiAll.farmasiSatuan,
            farmasiBatchNumber: farmasiAll.farmasiBatchNumber,
          },
          {
            headers: {
              "Content-Type": "application/json",
              token,
            },
          }
        )
        .then((response) => {
          context.commit("EDIT_FARMASI_ALL", response.data);
          return;
        });
    },
    getFarmasiNew(context, query) {
      axios.defaults.headers.common["X-Requested-With"] = "XMLHttpRequest";
      const token = localStorage.getItem("token");
      return axios
        .get(`${baseURL}/farmasi/new`, {
          headers: {
            "Content-Type": "application/json",
            token: token,
            ...query,
          },
        })
        .then((response) => {
          context.commit("FILL_FARMASI_NEW", response.data.farmasi);
          context.commit("FILL_TOTAL_FARMASI_NEW", response.data.totalRows);
          return;
        });
    },
    getFarmasiOrder(context, query) {
      axios.defaults.headers.common["X-Requested-With"] = "XMLHttpRequest";
      const token = localStorage.getItem("token");
      return axios
        .get(`${baseURL}/farmasiorder`, {
          headers: {
            "Content-Type": "application/json",
            token,
            ...query,
          },
        })
        .then((response) => {
          context.commit("FILL_FARMASI_ORDER", response.data.farmasiorder);
          context.commit("FILL_TOTAL_FARMASI_ORDER", response.data.totalRows);
          return;
        });
    },
    createFarmasiOrder(context, farmasiOrder) {
      axios.defaults.headers.common["X-Requested-With"] = "XMLHttpRequest";
      const token = localStorage.getItem("token");
      return axios
        .post(`http://hisapi.fsolteam.com/public/farmasiorder`, farmasiOrder, {
          headers: {
            "Content-Type": "application/json",
            token,
          },
        })
        .then((response) => {
          context.commit("INSERT_FARMASI_ORDER", response.data);
          return;
        });
    },
    getFarmasiObatOrder(context, farmasiOrderId) {
      axios.defaults.headers.common["X-Requested-With"] = "XMLHttpRequest";
      const token = localStorage.getItem("token");
      const params = {
        page: 1,
        itemsPerPage: 10,
        search: "",
        sortBy: undefined,
        sortDesc: undefined,
      };
      return axios
        .get(`${baseURL}/farmasiorder/obat/${farmasiOrderId}`, {
          headers: {
            "Content-Type": "application/json",
            token,
            ...params,
          },
        })
        .then((response) => {
          context.commit("FILL_FARMASI_OBAT_ORDER", response.data.data);
          return;
        });
    },
  },
  modules: {},
});
