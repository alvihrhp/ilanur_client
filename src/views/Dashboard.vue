<template>
  <v-container fluid id="dashboard">
    <Toolbar></Toolbar>
    <Banner
      v-bind:bannerDetail="{
      title: 'Dashboard',
      background: 'dashboard.jpg'
    }"
    ></Banner>
    <v-card color="#fffff" height="fit-content">
      <v-row justify="center" align="center">
        <v-col cols="6" md="3" sm="3" lg="3" v-for="(data, i) in amountDopa" :key="i" class="col-dopa">
          <h4 class="dopa-title">{{data.name}}</h4>
          <div class="dopa-date">
            <v-icon class="calendar-icon">mdi-calendar-text</v-icon>
            <h5 style="margin-left: 5px; opacity: 0.8;">{{new Date().toLocaleDateString()}}</h5>
          </div>
          <h1 class="dopa-amount">{{data.amount}}</h1>
        </v-col>
      </v-row>
    </v-card>
    <v-card color="#fffff" class="card-chart-pengunjung">
      <h1 style="text-align: center; margin-bottom: 20px;">Pasien / Bulan</h1>
      <Chart v-bind:chartdata="chartData.chartdata" v-bind:options="chartData.options"></Chart>
    </v-card>
  </v-container>
</template>

<script>
import Banner from "../components/Banner";
import Toolbar from "../components/Toolbar";
import Chart from "../components/Chart";
export default {
  name: "Dashboard",
  components: {
    Banner,
    Toolbar,
    Chart
  },
  created() {
    // this.$store.dispatch("getMasterDoctor");
    // this.$store.dispatch("getMasterObat");
    // this.$store.dispatch("getMasterPerusahaan");
    // this.$store.dispatch("getMasterAsuransi");
  },
  computed: {
    amountDopa() {
      const stats = [
        {
          name: "Jumlah Dokter",
          amount: 0
        },
        {
          name: "Jumlah Obat",
          amount: 0
        },
        {
          name: "Jumlah Perusahaan",
          amount: 0
        },
        {
          name: "Jumlah Asuransi",
          amount: 0
        }
      ];
      return stats;
    },
    chartData() {
      const data = {
        chartdata: {
          labels: [
            "January",
            "February",
            "March",
            "April",
            "May",
            "Juni",
            "July",
            "August",
            "September",
            "October",
            "November",
            "December"
          ],
          datasets: [
            {
              label: "Pasien",
              backgroundColor: "#f87979",
              data: [40, 20, 30, 50, 100, 80, 70, 120, 10, 30, 40, 10]
            }
          ]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false
        }
      };
      return data;
    }
  }
};
</script>

<style scoped>
#dashboard {
  background-color: #f5f5f5;
}

.col-dopa {
  padding-left: 30px;
}

.dopa-title {
  font-size: 17px;
  opacity: 0.8;
}

.dopa-date {
  display: flex;
  align-items: center;
}

.dopa-amount {
  padding-left: 5px;
  color: #ee9632 !important;
}

.card-chart-pengunjung {
  margin: 50px 50px 0;
  padding: 30px 50px;
}

@media screen and (max-width: 900px) {
  .dopa-title {
    font-size: 0.875rem;
  }

  .dopa-date h5 {
    font-size: 0.75rem;
  }

  .calendar-icon {
    font-size: 0.875rem;
  }

  .dopa-amount {
    font-size: 1.25rem;
  }

  .card-chart-pengunjung {
    padding: 1rem 0.5rem;
  }
}
</style>