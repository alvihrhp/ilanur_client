import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

// const baseURL = 'http://hisapi.fsolteam.com/public'
const baseURL = "http://localhost:8081"

export default new Vuex.Store({
  state: {
    masterDoctor: [],
    hargaDoctor: [],
    masterPerusahaan: [],
    masterAsuransi: [],
    masterTindakan: [],
    hargaTindakan: [],
    masterLab: [],
    hargaLab: [],
    masterRonsen: [],
    hargaRonsen: [],
    masterObat: [],
    hargaObat: [],
    masterDistributor: [],
    masterUser: [],
    masterType: []
  },
  mutations: {
    FILL_MASTER_DOCTOR(state, data) {
      state.masterDoctor = data
    },
    INSERT_MASTER_DOCTOR(state, data) {
      state.masterDoctor.push(data);
    },
    EDIT_MASTER_DOCTOR(state, data) {
      state.masterDoctor = state.masterDoctor.map(doctor => {
        if (doctor.doctor_kode === data.doctor_kode) {
          return data
        }
        return doctor
      })
    },
    DELETE_MASTER_DOCTOR(state, data) {
      state.masterDoctor = state.masterDoctor.filter(doctor => {
        return doctor.doctor_kode != data.doctor_kode;
      })
    },
    FILL_HARGA_DOCTOR(state, data) {
      state.hargaDoctor = data;
    },
    INSERT_HARGA_DOCTOR(state, data) {
      state.hargaDoctor.push(data);
    },
    EDIT_HARGA_DOCTOR(state, data) {
      state.hargaDoctor = state.hargaDoctor.map(price => {
        if (price.id === data.id) {
          return data;
        }
        return price;
      })
    },
    FILL_MASTER_TINDAKAN(state, data) {
      state.masterTindakan = data;
    },
    INSERT_MASTER_TINDAKAN(state, data) {
      state.masterTindakan.push(data);
    },
    EDIT_MASTER_TINDAKAN(state, data) {
      state.masterTindakan = state.masterTindakan.map(tindakan => {
        if (tindakan.tindakan_kode === data.tindakan_kode) {
          return data
        }
        return tindakan
      })
    },
    DELETE_MASTER_TINDAKAN(state, data) {
      state.masterTindakan = state.masterTindakan.filter(tindakan => {
        return tindakan.tindakan_kode != data.tindakan_kode;
      })
    },
    FILL_HARGA_TINDAKAN(state, data) {
      state.hargaTindakan = data;
    },
    INSERT_HARGA_TINDAKAN(state, data) {
      state.hargaTindakan.push(data);
    },
    EDIT_HARGA_TINDAKAN(state, data) {
      state.hargaTindakan = state.hargaTindakan.map(price => {
        if (data.id === price.id) {
          return data;
        }
        return price;
      })
    },
    FILL_MASTER_LAB(state, data) {
      state.masterLab = data;
    },
    INSERT_MASTER_LAB(state, data) {
      state.masterLab.push(data);
    },
    EDIT_MASTER_LAB(state, data) {
      state.masterLab = state.masterLab.map(lab => {
        if (lab.lab_kode === data.lab_kode) {
          return data;
        }
        return lab;
      })
    },
    DELETE_MASTER_LAB(state, data) {
      state.masterLab = state.masterLab.filter(lab => {
        return lab.lab_kode != data.lab_kode;
      })
    },
    FILL_HARGA_LAB(state, data) {
      state.hargaLab = data;
    },
    INSERT_HARGA_LAB(state, data) {
      state.hargaLab.push(data);
    },
    EDIT_HARGA_LAB(state, data) {
      state.hargaLab = state.hargaLab.map(price => {
        if (price.id === data.id) {
          return data;
        }
        return price;
      })
    },
    FILL_MASTER_RONSEN(state, data) {
      state.masterRonsen = data;
    },
    INSERT_MASTER_RONSEN(state, data) {
      state.masterRonsen.push(data);
    },
    EDIT_MASTER_RONSEN(state, data) {
      state.masterRonsen = state.masterRonsen.map(ronsen => {
        if (ronsen.ronsen_kode === data.ronsen_kode) {
          return data;
        }
        return ronsen;
      })
    },
    DELETE_MASTER_RONSEN(state, data) {
      state.masterRonsen = state.masterRonsen.filter(ronsen => {
        return ronsen.ronsen_kode != data.ronsen_kode;
      })
    },
    FILL_HARGA_RONSEN(state, data) {
      state.hargaRonsen = data;
    },
    INSERT_HARGA_RONSEN(state, data) {
      state.hargaRonsen.push(data);
    },
    EDIT_HARGA_RONSEN(state, data) {
      state.hargaRonsen = state.hargaRonsen.map(price => {
        if (data.id === price.id) {
          return data;
        }
        return price;
      })
    },
    FILL_MASTER_OBAT(state, data) {
      state.masterObat = data;
    },
    INSERT_MASTER_OBAT(state, data) {
      state.masterObat.push(data);
    },
    EDIT_MASTER_OBAT(state, data) {
      state.masterObat = state.masterObat.map(obat => {
        if (data.obat_kode === obat.obat_kode) {
          return data;
        }
        return obat;
      })
    },
    DELETE_MASTER_OBAT(state, data) {
      state.masterObat = state.masterObat.filter(obat => {
        return obat.obat_kode != data.obat_kode;
      })
    },
    FILL_HARGA_OBAT(state, data) {
      state.hargaObat = data;
    },
    INSERT_HARGA_OBAT(state, data) {
      state.hargaObat.push(data);
    },
    EDIT_HARGA_OBAT(state, data) {
      state.hargaObat = state.hargaObat.map(price => {
        if (data.id === price.id) {
          return data;
        }
        return price;
      })
    },
    FILL_MASTER_PERUSAHAAN(state, data) {
      state.masterPerusahaan = data;
    },
    INSERT_MASTER_PERUSAHAAN(state, data) {
      state.masterPerusahaan.push(data);
    },
    EDIT_MASTER_PERUSAHAAN(state, data) {
      state.masterPerusahaan = state.masterPerusahaan.map(perusahaan => {
        if (perusahaan.master_perusahaan_ID === data.master_perusahaan_ID) {
          return data;
        }
        return perusahaan;
      })
    },
    DELETE_MASTER_PERUSAHAAN(state, data) {
      state.masterPerusahaan = state.masterPerusahaan.filter(perusahaan => {
        return perusahaan.master_perusahaan_ID != data.master_perusahaan_ID;
      })
    },
    FILL_MASTER_ASURANSI(state, data) {
      state.masterAsuransi = data;
    },
    INSERT_MASTER_ASURANSI(state, data) {
      state.masterAsuransi.push(data)
    },
    EDIT_MASTER_ASURANSI(state, data) {
      state.masterAsuransi = state.masterAsuransi.map(asuransi => {
        if (asuransi.master_asuransi_ID === data.master_asuransi_ID) {
          return data;
        }
        return asuransi
      })
    },
    DELETE_MASTER_ASURANSI(state, data) {
      state.masterAsuransi = state.masterAsuransi.filter(asuransi => {
        return asuransi.master_asuransi_ID != data.master_asuransi_ID;
      })
    },
    FILL_MASTER_DISTRIBUTOR(state, data) {
      state.masterDistributor = data;
    },
    INSERT_MASTER_DISTRIBUTOR(state, data) {
      state.masterDistributor.push(data);
    },
    EDIT_MASTER_DISTRIBUTOR(state, data) {
      state.masterDistributor = state.masterDistributor.map(distributor => {
        if (distributor.master_distributor_ID === data.master_distributor_ID) {
          return data;
        }
        return distributor;
      })
    },
    DELETE_MASTER_DISTRIBUTOR(state, data) {
      state.masterDistributor = state.masterDistributor.filter(distributor => {
        return distributor.master_distributor_ID != data.master_distributor_ID;
      })
    },
    FILL_MASTER_USER(state, data) {
      state.masterUser = data
    },
    INSERT_MASTER_USER(state, data) {
      state.masterUser.push(data);
    },
    EDIT_MASTER_USER(state, data) {
      state.masterUser = state.masterUser.map(user => {
        if (user.user_ID === data.user_ID) {
          return data;
        }
        return user;
      })
    },
    DELETE_MASTER_USER(state, data) {
      state.masterUser = state.masterUser.filter(user => {
        return user.user_ID != data.user_ID;
      })
    },
    FILL_MASTER_TYPE(state, data) {
      state.masterType = data;
    },
    INSERT_MASTER_TYPE(state, data) {
      state.masterType.push(data);
    },
    EDIT_MASTER_TYPE(state, data) {
      state.masterType = state.masterType.map(type => {
        if (data.originalName === type.name) {
          return data;
        }
        return type;
      })
    }
  },
  actions: {
    async getMasterDoctor(context) {
      axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';
      const masterDoctor = await (axios.get(`${baseURL}/doctor`, { headers: { 'Content-Type': 'application/json' } }));
      context.commit('FILL_MASTER_DOCTOR', masterDoctor.data);
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
          console.log(response)
          const masterDoctor = response.data;
          context.commit('INSERT_MASTER_DOCTOR', masterDoctor);
          return;
        })
    },
    editMasterDoctor(context, dokter) {
      axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';
      return axios.put(`${baseURL}/doctor/${dokter.originalID}`, {
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
      }, { headers: { 'Content-Type': 'application/json' } })
        .then(response => {
          const editedDoctor = response.data;
          editedDoctor['doctor_kode'] = dokter.originalID;
          context.commit('EDIT_MASTER_DOCTOR', editedDoctor);
          return;
        })
    },
    deleteMasterDoctor(context, dokter) {
      axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';
      return axios.delete(`${baseURL}/doctor/${dokter.doctor_kode}`,
        { headers: { 'Content-Type': 'application/json' } })
        .then(response => {
          context.commit('DELETE_MASTER_DOCTOR', dokter);
          return;
        })
    },
    async getHargaDoctor(context, id) {
      axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';
      const hargaDoctor = await (axios.get(`${baseURL}/doctor/${id}`, { headers: { 'Content-Type': 'application/json' } }));
      context.commit('FILL_HARGA_DOCTOR', hargaDoctor.data);
    },
    createHargaDoctor(context, price) {
      axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';
      return axios.post(`${baseURL}/hargadoctor`, {
        'doctor_kode': price.doctorKode,
        'type': price.type,
        'doctor_jasa': price.doctorJasa,
        'doctor_pembagian': price.doctorPembagian,
        'doctor_on_call': price.doctorOnCall,
        'doctor_on_visit': price.doctorOnVisit
      }, { headers: { 'Content-Type': 'application/json' } })
        .then(response => {
          context.commit('INSERT_HARGA_DOCTOR', response.data);
          return;
        })
    },
    editHargaDoctor(context, price) {
      axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';
      return axios.put(`${baseURL}/hargadoctor/${price.id}`, {
        'doctor_jasa': price.doctorJasa,
        'doctor_pembagian': price.doctorPembagian,
        'doctor_on_call': price.doctorOnCall,
        'doctor_on_visit': price.doctorOnVisit
      }, { headers: { 'Content-Type': 'application/json' } })
        .then(response => {
          response.data['id'] = price.id;
          response.data['type'] = price.type;
          context.commit('EDIT_HARGA_DOCTOR', response.data);
          return;
        })
    },
    async getMasterTindakan(context) {
      axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';
      const masterTindakan = await (axios.get(`${baseURL}/tindakan`, { headers: { 'Content-Type': 'application/json' } }));
      context.commit('FILL_MASTER_TINDAKAN', masterTindakan.data);
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
        context.commit('INSERT_MASTER_TINDAKAN', masterTindakan);
        return;
      })
    },
    editMasterTindakan(context, tindakan) {
      axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';
      return axios.put(`${baseURL}/tindakan/${tindakan.originalID}`, {
        'tindakan_nama': tindakan.tindakanNama
      }, { headers: { 'Content-Type': 'application/json' } })
        .then(response => {
          const editedTindakan = response.data;
          editedTindakan['tindakan_kode'] = tindakan.originalID;
          context.commit('EDIT_MASTER_TINDAKAN', editedTindakan);
          return;
        })
    },
    deleteMasterTindakan(context, tindakan) {
      axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';
      return axios.delete(`${baseURL}/tindakan/${tindakan.tindakan_kode}`,
        { headers: { 'Content-Type': 'application/json' } })
        .then(response => {
          context.commit('DELETE_MASTER_TINDAKAN', tindakan);
          return;
        })
    },
    async getHargaTindakan(context, id) {
      axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';
      const hargaTindakan = await (axios.get(`${baseURL}/tindakan/${id}`, { headers: { 'Content-Type': 'application/json' } }));
      context.commit('FILL_HARGA_TINDAKAN', hargaTindakan.data);
    },
    createHargaTindakan(context, price) {
      axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';
      return axios.post(`${baseURL}/hargatindakan`, {
        'tindakan_kode': price.tindakanKode,
        'type': price.type,
        'tindakan_harga': price.tindakanHarga,
        'tindakan_sewa_alat': price.tindakanSewaAlat,
        'tindakan_sewa_ruangan': price.tindakanSewaRuangan,
        'tindakan_jasa_operator': price.tindakanJasaOperator,
        'tindakan_jasa_aoperator': price.tindakanJasaAOperator,
        'tindakan_jasa_paramedis': price.tindakanJasaParamedis
      }, { headers: { 'Content-Type': 'application/json' } })
        .then(response => {
          context.commit('INSERT_HARGA_TINDAKAN', response.data);
          return;
        })
    },
    editHargaTindakan(context, price) {
      axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';
      return axios.put(`${baseURL}/hargatindakan/${price.id}`, {
        'tindakan_harga': price.tindakanHarga,
        'tindakan_sewa_alat': price.tindakanSewaAlat,
        'tindakan_sewa_ruangan': price.tindakanSewaRuangan,
        'tindakan_jasa_operator': price.tindakanJasaOperator,
        'tindakan_jasa_aoperator': price.tindakanJasaAOperator,
        'tindakan_jasa_paramedis': price.tindakanJasaParamedis
      }, { headers: { 'Content-Type': 'application/json' } })
        .then(response => {
          response.data['id'] = price.id;
          response.data['type'] = price.type;
          context.commit('EDIT_HARGA_TINDAKAN', response.data);
          return;
        })
    },
    async getMasterLab(context) {
      axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';
      const masterLab = await (axios.get(`${baseURL}/lab`, { headers: { 'Content-Type': 'application/json' } }));
      context.commit('FILL_MASTER_LAB', masterLab.data);
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
          context.commit('INSERT_MASTER_LAB', masterLab);
          return;
        })
    },
    editMasterLab(context, lab) {
      axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';
      return axios.put(`${baseURL}/lab/${lab.originalID}`, {
        'lab_nama_pemeriksaan': lab.labNamaPemeriksaan
      }, { headers: { 'Content-Type': 'application/json' } })
        .then(response => {
          const editedLab = response.data;
          editedLab['lab_kode'] = lab.originalID;
          context.commit('EDIT_MASTER_LAB', editedLab)
          return;
        })
    },
    deleteMasterLab(context, lab) {
      axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';
      return axios.delete(`${baseURL}/lab/${lab.lab_kode}`,
        { headers: { 'Content-Type': 'application/json' } })
        .then(response => {
          context.commit('DELETE_MASTER_LAB', lab);
          return;
        })
    },
    async getHargaLab(context, id) {
      axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';
      const hargaLab = await (axios.get(`${baseURL}/lab/${id}`, { headers: { 'Content-Type': 'application/json' } }));
      context.commit('FILL_HARGA_LAB', hargaLab.data);
    },
    createHargaLab(context, price) {
      axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';
      return axios.post(`${baseURL}/hargalab`, {
        'lab_kode': price.labKode,
        'type': price.type,
        'harga_lab': price.hargaLab
      }, { headers: { 'Content-Type': 'application/json' } })
        .then(response => {
          context.commit('INSERT_HARGA_LAB', response.data);
          return;
        })
    },
    editHargaLab(context, price) {
      axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';
      return axios.put(`${baseURL}/hargalab/${price.id}`, {
        'harga_lab': price.hargaLab
      }, { headers: { 'Content-Type': 'application/json' } })
        .then(response => {
          response.data['id'] = price.id;
          response.data['type'] = price.type;
          context.commit('EDIT_HARGA_LAB', response.data);
          return;
        })
    },
    async getMasterRonsen(context) {
      axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';
      const masterRonsen = await (axios.get(`${baseURL}/ronsen`, { headers: { 'Content-Type': 'application/json' } }));
      context.commit('FILL_MASTER_RONSEN', masterRonsen.data);
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
          context.commit('INSERT_MASTER_RONSEN', masterRonsen);
          return
        })
    },
    editMasterRonsen(context, ronsen) {
      axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';
      return axios.put(`${baseURL}/ronsen/${ronsen.originalID}`, {
        'ronsen_nama_pemeriksaan': ronsen.ronsenNamaPemeriksaan
      }, { headers: { 'Content-Type': 'application/json' } })
        .then(response => {
          const editedRonsen = response.data;
          editedRonsen['ronsen_kode'] = ronsen.originalID;
          console.log(editedRonsen);
          context.commit('EDIT_MASTER_RONSEN', editedRonsen);
          return;
        })
    },
    deleteMasterRonsen(context, ronsen) {
      axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';
      return axios.delete(`${baseURL}/ronsen/${ronsen.ronsen_kode}`,
        { headers: { 'Content-Type': 'application/json' } })
        .then(response => {
          context.commit('DELETE_MASTER_RONSEN', ronsen);
          return;
        })
    },
    async getHargaRonsen(context, id) {
      axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';
      const hargaRonsen = await (axios.get(`${baseURL}/ronsen/${id}`, { headers: { 'Content-Type': 'application/json' } }));
      context.commit('FILL_HARGA_RONSEN', hargaRonsen.data);
    },
    createHargaRonsen(context, price) {
      axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';
      return axios.post(`${baseURL}/hargaronsen`, {
        'ronsen_kode': price.ronsenKode,
        'type': price.type,
        'harga': price.hargaRonsen
      }, { headers: { 'Content-Type': 'application/json' } })
        .then(response => {
          context.commit('INSERT_HARGA_RONSEN', response.data);
          return;
        })
    },
    editHargaRonsen(context, price) {
      axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';
      return axios.put(`${baseURL}/hargaronsen/${price.id}`, {
        'harga': price.hargaRonsen
      }, { headers: { 'Content-Type': 'application/json' } })
        .then(response => {
          response.data['id'] = price.id;
          response.data['type'] = price.type;
          context.commit('EDIT_HARGA_RONSEN', response.data);
          return;
        })
    },
    async getMasterObat(context) {
      axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';
      const masterObat = await (axios.get(`${baseURL}/obat`, { headers: { 'Content-Type': 'application/json' } }));
      context.commit('FILL_MASTER_OBAT', masterObat.data);
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
          context.commit('INSERT_MASTER_OBAT', masterObat);
          return;
        })
    },
    editMasterObat(context, obat) {
      axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';
      return axios.put(`${baseURL}/obat/${obat.originalID}`, {
        'obat_nama': obat.obatNama,
        'obat_komposisi': obat.obatKomposisi,
        'obat_satuan': obat.obatSatuan,
        'obat_hnappn': obat.obatHnappn,
        'obat_persen': obat.obatPersen,
        'obat_prinsipal': obat.obatPrinsipal,
        'obat_jenis': obat.obatJenis,
        'obat_diskon': obat.obatDiskon,
        'obat_quantity': obat.obatQuantity
      }, { headers: { 'Content-Type': 'application/json' } })
        .then(response => {
          const editedObat = response.data;
          editedObat['obat_kode'] = obat.originalID;
          context.commit('EDIT_MASTER_OBAT', editedObat);
          return;
        })
    },
    deleteMasterObat(context, obat) {
      axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';
      return axios.delete(`${baseURL}/obat/${obat.obat_kode}`,
        { headers: { 'Content-Type': 'application/json' } })
        .then(response => {
          context.commit('DELETE_MASTER_OBAT', obat);
          return;
        })
    },
    async getHargaObat(context, id) {
      axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';
      const hargaObat = await (axios.get(`${baseURL}/obat/${id}`, { headers: { 'Content-Type': 'application/json' } }));
      context.commit('FILL_HARGA_OBAT', hargaObat.data);
    },
    createHargaObat(context, price) {
      axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';
      return axios.post(`${baseURL}/hargaobat`, {
        'obat_kode': price.obatKode,
        'type': price.type,
        'harga_box': price.hargaBox,
        'harga_satuan': price.hargaSatuan
      }, { headers: { 'Content-Type': 'application/json' } })
        .then(response => {
          context.commit('INSERT_HARGA_OBAT', response.data);
          return;
        })
    },
    editHargaObat(context, price) {
      axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';
      return axios.put(`${baseURL}/hargaobat/${price.id}`, {
        'harga_box': price.hargaBox,
        'harga_satuan': price.hargaSatuan
      }, { headers: { 'Content-Type': 'application/json' } })
        .then(response => {
          response.data['id'] = price.id;
          response.data['type'] = price.type;
          context.commit('EDIT_HARGA_OBAT', response.data);
          return;
        })
    },
    async getMasterPerusahaan(context) {
      axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';
      const masterPerusahaan = await (axios.get(`${baseURL}/perusahaan`, { headers: { 'Content-Type': 'application/json' } }));
      context.commit('FILL_MASTER_PERUSAHAAN', masterPerusahaan.data);
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
          console.log(response);
          context.commit('INSERT_MASTER_PERUSAHAAN', masterPerusahaan);
          return;
        })
    },
    editMasterPerusahaan(context, perusahaan) {
      axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';
      return axios.put(`${baseURL}/perusahaan/${perusahaan.originalID}`, {
        'master_perusahaan_nama': perusahaan.masterPerusahaanNama,
        'master_perusahaan_alamat': perusahaan.masterPerusahaanAlamat,
        'master_perusahaan_telpon': perusahaan.masterPerusahaanTelpon,
        'master_perusahaan_harga': perusahaan.masterPerusahaanHarga
      }, { headers: { 'Content-Type': 'application/json' } })
        .then(response => {
          const editedPerusahaan = response.data;
          editedPerusahaan['master_perusahaan_ID'] = perusahaan.originalID;
          console.log(editedPerusahaan);
          context.commit('EDIT_MASTER_PERUSAHAAN', editedPerusahaan);
          return;
        })
    },
    deleteMasterPerusahaan(context, perusahaan) {
      axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';
      return axios.delete(`${baseURL}/perusahaan/${perusahaan.master_perusahaan_ID}`,
        { headers: { 'Content-Type': 'application/json' } })
        .then(response => {
          context.commit('DELETE_MASTER_PERUSAHAAN', perusahaan)
          return;
        })
    },
    async getMasterAsuransi(context) {
      axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';
      const masterAsuransi = await (axios.get(`${baseURL}/asuransi`, { headers: { 'Content-Type': 'application/json' } }));
      context.commit('FILL_MASTER_ASURANSI', masterAsuransi.data);
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
          context.commit('INSERT_MASTER_ASURANSI', masterAsuransi);
          return;
        })
    },
    editMasterAsuransi(context, asuransi) {
      axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';
      return axios.put(`${baseURL}/asuransi/${asuransi.originalID}`, {
        'master_asuransi_nama': asuransi.masterAsuransiNama,
        'master_asuransi_alamat': asuransi.masterAsuransiAlamat,
        'master_asuransi_telpon': asuransi.masterAsuransiTelpon,
        'master_asuransi_harga': asuransi.masterAsuransiHarga
      }, { headers: { 'Content-Type': 'application/json' } })
        .then(response => {
          const editedAsuransi = response.data;
          editedAsuransi['master_perusahaan_ID'] = asuransi.originalID;
          console.log(editedAsuransi);
          context.commit('EDIT_MASTER_ASURANSI', editedAsuransi);
          return;
        })
    },
    deleteMasterAsuransi(context, asuransi) {
      axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';
      return axios.delete(`${baseURL}/asuransi/${asuransi.master_asuransi_ID}`,
        { headers: { 'Content-Type': 'application/json' } })
        .then(response => {
          context.commit('DELETE_MASTER_ASURANSI', asuransi)
          return;
        })
    },
    async getMasterDistributor(context) {
      axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';
      const masterDistributor = await (axios.get(`${baseURL}/distributor`, { headers: { 'Content-Type': 'application/json' } }));
      context.commit('FILL_MASTER_DISTRIBUTOR', masterDistributor.data);
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
          context.commit('INSERT_MASTER_DISTRIBUTOR', masterDistributor);
          return;
        })
    },
    editMasterDistributor(context, distributor) {
      axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';
      return axios.put(`${baseURL}/distributor/${distributor.originalID}`, {
        'master_distributor_nama': distributor.masterDistributorNama,
        'master_distributor_alamat': distributor.masterDistributorAlamat,
        'master_distributor_telpon': distributor.masterDistributorTelpon
      }, { headers: { 'Content-Type': 'application/json' } })
        .then(response => {
          const editedDistributor = response.data;
          editedDistributor['master_distributor_ID'] = distributor.originalID;
          console.log(editedDistributor);
          context.commit('EDIT_MASTER_DISTRIBUTOR', editedDistributor);
          return;
        })
    },
    deleteMasterDistributor(context, distributor) {
      axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';
      return axios.delete(`${baseURL}/distributor/${distributor.master_distributor_ID}`,
        { headers: { 'Content-Type': 'application/json' } })
        .then(response => {
          context.commit('DELETE_MASTER_DISTRIBUTOR', distributor);
          return;
        })
    },
    async getMasterUser(context) {
      axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';
      const masterUser = await (axios.get(`${baseURL}/user`, { headers: { 'Content-Type': 'application/json' } }));
      context.commit('FILL_MASTER_USER', masterUser.data);
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
          console.log({ response });
          const masterUser = response.data;
          context.commit('INSERT_MASTER_USER', masterUser);
          return;
        })
    },
    editMasterUser(context, user) {
      let inputtedUser = {
        'pfirstname': user.pFirstName,
        'plastname': user.pLastName,
        'role': user.role,
        'location': user.location
      }
      if (user.pUsername !== user.originalUsername) {
        inputtedUser['pusername'] = user.pUsername;
      }
      if (user.pPassword.length > 0) {
        inputtedUser['ppassword'] = user.pPassword;
      }
      axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';
      return axios.put(`${baseURL}/user/${user.originalID}`, inputtedUser, { headers: { 'Content-Type': 'application/json' } })
        .then(response => {
          const editedUser = response.data;
          editedUser['user_ID'] = user.originalID;
          if (user.pUsername === user.originalUsername) {
            editedUser['pusername'] = user.pUsername;
          }
          context.commit('EDIT_MASTER_USER', editedUser);
          return;
        })
    },
    deleteMasterUser(context, user) {
      axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';
      return axios.delete(`${baseURL}/user/${user.user_ID}`,
        { headers: { 'Content-Type': 'application/json' } })
        .then(response => {
          context.commit('DELETE_MASTER_USER', user);
          return;
        })
    },
    async getMasterType(context) {
      axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';
      const masterType = await (axios.get(`${baseURL}/type`, { headers: { 'Content-Type': 'application/json' } }));
      context.commit('FILL_MASTER_TYPE', masterType.data);
    },
    createMasterType(context, type) {
      let nama = '';
      for (let i = 0; i < type.name.length; i++) {
        nama += type.name[i].toUpperCase();
      }
      type.name = nama;
      axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';
      return axios.post(`${baseURL}/type`, type, {
        headers: { 'Content-Type': 'application/json' }
      })
        .then(response => {
          context.commit('INSERT_MASTER_TYPE', response.data);
          return;
        })
    },
    editMasterType(context, type) {
      let nama = '';
      for (let i = 0; i < type.name.length; i++) {
        nama += type.name[i].toUpperCase();
      }
      type.name = nama;
      return axios.put(`${baseURL}/type/${type.originalName}`, type, {
        headers: { 'Content-Type': 'application/json' }
      })
        .then(response => {
          response.data.originalName = type.originalName;
          context.commit('EDIT_MASTER_TYPE', response.data);
          return;
        })
    }
  },
  modules: {
  }
})
