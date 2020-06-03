import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

const baseURL = 'http://localhost:8080'

export default new Vuex.Store({
  state: {
    masterDoctor: [],
    masterPerusahaan: [],
    masterAsuransi: [],
    masterTindakan: [],
    masterLab: [],
    masterRonsen: [],
    masterObat: [],
    masterDistributor: [],
    masterUser: []
  },
  mutations: {
    fillMasterDoctor(state, data) {
      state.masterDoctor = data
    },
    insertMasterDoctor(state, data) {
      state.masterDoctor.push(data);
    },
    fillMasterTindakan(state, data) {
      state.masterTindakan = data;
    },
    insertMasterTindakan(state, data) {
      state.masterTindakan.push(data);
    },
    fillMasterLab(state, data) {
      state.masterLab = data;
    },
    insertMasterLab(state, data) {
      state.masterLab.push(data);
    },
    fillMasterRonsen(state, data) {
      state.masterRonsen = data;
    },
    insertMasterRonsen(state, data) {
      state.masterRonsen.push(data);
    },
    fillMasterObat(state, data) {
      state.masterObat = data;
    },
    insertMasterObat(state, data) {
      state.masterObat.push(data);
    },
    fillMaterPerusahaan(state, data) {
      state.masterPerusahaan = data;
    },
    insertMasterPerusahaan(state, data) {
      state.masterPerusahaan.push(data);
    },
    fillMasterAsuransi(state, data) {
      state.masterAsuransi = data;
    },
    insertMasterAsuransi(state, data) {
      state.masterAsuransi.push(data)
    },
    fillMasterDistributor(state, data) {
      state.masterDistributor = data;
    },
    insertMasterDistributor(state, data) {
      state.masterDistributor.push(data);
    },
    fillMasterUser(state, data) {
      state.masterUser = data
    },
    insertMasterUser(state, data) {
      state.masterUser.push(data);
    }
  },
  actions: {
    async getMasterDoctor(context) {
      axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';
      const masterDoctor = await (axios.get(`${baseURL}/doctor`, { headers: { 'Content-Type': 'application/json' } }));
      context.commit('fillMasterDoctor', masterDoctor.data);
    },
    createMasterDoctor(context, dokter) {
      axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';
      return axios.post(`${baseURL}/doctor`, {
        'doctor_kode': dokter.kodeDokter,
        'doctor_nama': dokter.namaDokter,
        'doctor_glr_dpn': dokter.gelarDepanDokter,
        'doctor_glr_blk': dokter.gelarBelakangDokter,
        'doctor_kelamin': dokter.jenisKelaminDokter,
        'doctor_alamat': dokter.alamatDokter,
        'doctor_phone': dokter.noTelpRumahDokter,
        'doctor_hp': dokter.noHpDokter,
        'doctor_npwp': dokter.npwpDokter,
        'doctor_status': dokter.statusDokter,
        'doctor_pemeriksaan': dokter.pemeriksaanDokter,
        'type': dokter.typeHarga,
        'doctor_jasa': dokter.hargaJasaDokter,
        'doctor_pembagian': dokter.pembagianDokter,
        'dokter_on_visit': dokter.dokterOnVist,
        'dokter_on_call': dokter.dokterOnCall
      }, { headers: { 'Content-Type': 'application/json' } })
        .then((response) => {
          const masterDoctor = response.data;
          context.commit('insertMasterDoctor', masterDoctor);
          return;
        })
    },
    async getMasterTindakan(context) {
      axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';
      const masterTindakan = await (axios.get(`${baseURL}/tindakan`, { headers: { 'Content-Type': 'application/json' } }));
      context.commit('fillMasterTindakan', masterTindakan.data);
    },
    createMasterTindakan(context, tindakan) {
      axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';
      return axios.post(`${baseURL}/tindakan`, {
        'tindakan_kode': tindakan.tindakanKode,
        'tindakan_nama': tindakan.tindakanNama,
        'type': tindakan.typeHarga,
        'tindakan_harga': tindakan.tindakanHarga,
        'tindakan_sewa_alat': tindakan.tindakanSewaAlat,
        'tindakan_sewa_ruangan': tindakan.tindakanSewaRuangan,
        'tindakan_jasa_operator': tindakan.tindakanJasaOperator,
        'tindakan_jasa_aoperator': tindakan.tindakanJasaAOperator,
        'tindakan_jasa_paramedis': tindakan.tindakanJasaParamedis
      }, { headers: { 'Content-Type': 'application/json' } }).then(response => {
        const masterTindakan = response.data;
        context.commit('insertMasterTindakan', masterTindakan);
        return;
      })
    },
    async getMasterLab(context) {
      axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';
      const masterLab = await (axios.get(`${baseURL}/lab`, { headers: { 'Content-Type': 'application/json' } }));
      context.commit('fillMasterLab', masterLab.data);
    },
    createMasterLab(context, lab) {
      axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';
      return axios.post(`${baseURL}/lab`, {
        'lab_kode': lab.labKode,
        'lab_nama_pemeriksaan': lab.labNamaPemeriksaan,
        'type': lab.typeHarga,
        'harga_lab': lab.hargaLab
      }, { headers: { 'Content-Type': 'application/json' } })
        .then(response => {
          const masterLab = response.data;
          context.commit('insertMasterLab', masterLab);
          return;
        })
    },
    async getMasterRonsen(context) {
      axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';
      const masterRonsen = await (axios.get(`${baseURL}/ronsen`, { headers: { 'Content-Type': 'application/json' } }));
      context.commit('fillMasterRonsen', masterRonsen.data);
    },
    createMasterRonsen(context, ronsen) {
      axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';
      return axios.post(`${baseURL}/ronsen`, {
        'ronsen_kode': ronsen.ronsenKode,
        'ronsen_nama_pemeriksaan': ronsen.ronsenNamaPemeriksaan,
        'type': ronsen.typeHarga,
        'harga': ronsen.harga
      }, { headers: { 'Content-Type': 'application/json' } })
        .then(response => {
          const masterRonsen = response.data;
          console.log(masterRonsen);
          context.commit('insertMasterRonsen', masterRonsen);
          return
        })
    },
    async getMasterObat(context) {
      axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';
      const masterObat = await (axios.get(`${baseURL}/obat`, { headers: { 'Content-Type': 'application/json' } }));
      context.commit('fillMasterObat', masterObat.data);
    },
    createMasterObat(context, obat) {
      axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';
      return axios.post(`${baseURL}/obat`, {
        'obat_kode': obat.obatKode,
        'obat_nama': obat.obatNama,
        'obat_komposisi': obat.obatKomposisi,
        'obat_satuan': obat.obatSatuan,
        'obat_hnappn': obat.obatHnappn,
        'obat_persen': obat.obatPersen,
        'obat_prinsipal': obat.obatPrinsipal,
        'obat_jenis': obat.obatJenis,
        'obat_diskon': obat.obatDiskon,
        'obat_quantity': obat.obatQuantity,
        'type': obat.typeHarga,
        'harga_box': obat.hargaBox,
        'harga_satuan': obat.hargaSatuan
      }, { headers: { 'Content-Type': 'application/json' } })
        .then(response => {
          const masterObat = response.data;
          console.log(masterObat);
          context.commit('insertMasterObat', masterObat);
          return;
        })
    },
    async getMasterPerusahaan(context) {
      axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';
      const masterPerusahaan = await (axios.get(`${baseURL}/perusahaan`, { headers: { 'Content-Type': 'application/json' } }));
      context.commit('fillMaterPerusahaan', masterPerusahaan.data);
    },
    createMasterPerusahaan(context, perusahaan) {
      axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';
      return axios.post(`${baseURL}/perusahaan`, {
        'master_perusahaan_nama': perusahaan.masterPerusahaanNama,
        'master_perusahaan_alamat': perusahaan.masterPerusahaanAlamat,
        'master_perusahaan_telpon': perusahaan.masterPerusahaanTelpon,
        'master_perusahaan_harga': perusahaan.masterPerusahaanHarga
      }, { headers: { 'Content-Type': 'application/json' } })
        .then(response => {
          const masterPerusahaan = response.data;
          context.commit('insertMasterPerusahaan', masterPerusahaan);
          return;
        })
    },
    async getMasterAsuransi(context) {
      axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';
      const masterAsuransi = await (axios.get(`${baseURL}/asuransi`, { headers: { 'Content-Type': 'application/json' } }));
      context.commit('fillMasterAsuransi', masterAsuransi.data);
    },
    createMasterAsuransi(context, asuransi) {
      axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';
      return axios.post(`${baseURL}/asuransi`, {
        'master_asuransi_nama': asuransi.masterAsuransiNama,
        'master_asuransi_alamat': asuransi.masterAsuransiAlamat,
        'master_asuransi_telpon': asuransi.masterAsuransiTelpon,
        'master_asuransi_harga': asuransi.masterAsuransiHarga
      }, { headers: { 'Content-Type': 'application/json' } })
        .then(response => {
          const masterAsuransi = response.data;
          context.commit('insertMasterAsuransi', masterAsuransi);
          return;
        })
    },
    async getMasterDistributor(context) {
      axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';
      const masterDistributor = await (axios.get(`${baseURL}/distributor`, { headers: { 'Content-Type': 'application/json' } }));
      context.commit('fillMasterDistributor', masterDistributor.data);
    },
    createMasterDistributor(context, distributor) {
      axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';
      return axios.post(`${baseURL}/distributor`, {
        'master_distributor_nama': distributor.masterDistributorNama,
        'master_distributor_alamat': distributor.masterDistributorAlamat,
        'master_distributor_telpon': distributor.masterDistributorTelpon
      }, { headers: { 'Content-Type': 'application/json' } })
        .then(response => {
          const masterDistributor = response.data;
          context.commit('insertMasterDistributor', masterDistributor);
          return;
        })
    },
    async getMasterUser(context) {
      axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';
      const masterUser = await (axios.get(`${baseURL}/user`, { headers: { 'Content-Type': 'application/json' } }));
      context.commit('fillMasterUser', masterUser.data);
    },
    createMasterUser(context, user) {
      axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';
      return axios.post(`${baseURL}/user`, {
        'pusername': user.pUsername,
        'ppassword': user.pPassword,
        'pfirstname': user.pFirstName,
        'plastname': user.pLastName,
        'role': user.role,
        'location': user.location
      }, { headers: { 'Content-Type': 'application/json' } })
        .then(response => {
          console.log(response);
          const masterUser = response.data;
          context.commit('insertMasterUser', masterUser);
          return;
        })
    }
  },
  modules: {
  }
})
