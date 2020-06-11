import Vue from 'vue'
import VueRouter from 'vue-router'
import Dashboard from '../views/Dashboard.vue'
import Masterdoctor from '../views/Masterdoctor.vue'
import Masterlab from '../views/Masterlab.vue'
import Mastertindakan from '../views/Mastertindakan.vue'
import Masterronsen from '../views/Masterronsen.vue'
import Masterobat from '../views/Masterobat.vue'
import Masterperusahaan from '../views/Masterperusahaan.vue'
import Masterasuransi from '../views/Masterasuransi.vue'
import Masterdistributor from '../views/Masterdistributor.vue'
import Masteruser from '../views/Masteruser.vue'
import Mastertype from '../views/Mastertype.vue'
import Detailprice from '../views/Detailprice.vue'

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
    path: '/masterobat',
    name: 'Masterobat',
    component: Masterobat
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
  },
  {
    path: '/masterdistributor',
    name: 'Masterdistributor',
    component: Masterdistributor
  },
  {
    path: '/masteruser',
    name: 'Masteruser',
    component: Masteruser
  },
  {
    path: '/mastertype',
    name: 'Mastertype',
    component: Mastertype
  },
  {
    path: '/detailprice/:from/:id',
    name: 'detailprice',
    component: Detailprice,
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
