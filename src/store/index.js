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
  },
  mutations: {
    fillMasterDoctor(state, data) {
      state.masterDoctor = data
    },
    fillMasterTindakan(state, data) {
      state.masterTindakan = data;
    },
    fillMasterLab(state, data) {
      state.masterLab = data;
    },
    fillMasterRonsen(state, data) {
      state.masterRonsen = data;
    },
    fillMaterPerusahaan(state, data) {
      state.masterPerusahaan = data;
    },
    fillMasterAsuransi(state, data) {
      state.masterAsuransi = data;
    },
  },
  actions: {
    async getMasterDoctor(context) {
      axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';
      const masterDoctor = await (axios.get(`${baseURL}/doctor`, { headers: { 'Content-Type': 'application/json' } }));
      context.commit('fillMasterDoctor', masterDoctor.data);
    },
    async getMasterTindakan(context) {
      axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';
      const masterTindakan = await (axios.get(`${baseURL}/tindakan`, { headers: { 'Content-Type': 'application/json' } }));
      context.commit('fillMasterTindakan', masterTindakan.data);
    },
    async getMasterLab(context) {
      axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';
      const masterLab = await (axios.get(`${baseURL}/lab`, { headers: { 'Content-Type': 'application/json' } }));
      context.commit('fillMasterLab', masterLab.data);
    },
    async getMasterRonsen(context) {
      axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';
      const masterRonsen = await (axios.get(`${baseURL}/ronsen`, { headers: { 'Content-Type': 'application/json' } }));
      context.commit('fillMasterRonsen', masterRonsen.data);
    },
    async getMasterPerusahaan(context) {
      axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';
      const masterPerusahaan = await (axios.get(`${baseURL}/perusahaan`, { headers: { 'Content-Type': 'application/json' } }));
      context.commit('fillMaterPerusahaan', masterPerusahaan.data);
    },
    async getMasterAsuransi(context) {
      axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';
      const masterAsuransi = await (axios.get(`${baseURL}/asuransi`, { headers: { 'Content-Type': 'application/json' } }));
      console.log(masterAsuransi);
      context.commit('fillMasterAsuransi', masterAsuransi.data);
    }
  },
  modules: {
  }
})
