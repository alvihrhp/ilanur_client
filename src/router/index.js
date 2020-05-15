import Vue from 'vue'
import VueRouter from 'vue-router'
import Dashboard from '../views/Dashboard.vue'
import Masterdoctor from '../views/Masterdoctor.vue'
import Mastertindakan from '../views/Mastertindakan.vue'
import Masterlab from '../views/Masterlab.vue'
import Masterperusahaan from '../views/Masterperusahaan.vue'
import Masterasuransi from '../views/Masterasuransi.vue'
import Masterronsen from '../views/Masterronsen.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/dashboard',
    name: 'Dashboard',
    component: Dashboard
  },
  {
    path: '/masterdoctor',
    name: 'Masterdoctor',
    component: Masterdoctor
  },
  {
    path: '/masterlab',
    name: 'Masterlab',
    component: Masterlab
  },
  {
    path: '/mastertindakan',
    name: 'Mastertindakan',
    component: Mastertindakan
  },
  {
    path: '/masterronsen',
    name: 'Masterronsen',
    component: Masterronsen
  },
  {
    path: '/masterperusahaan',
    name: 'Masterperusahaan',
    component: Masterperusahaan
  },
  {
    path: '/masterasuransi',
    name: 'Masterasuransi',
    component: Masterasuransi
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
