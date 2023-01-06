<template>
  <div>
    <base-header class="pb-6">
      <div class="row align-items-center py-4">
        <div class="col-lg-6 col-7">
          <h6 class="h2 text-white d-inline-block mb-0">Charts</h6>
          <nav aria-label="breadcrumb" class="d-none d-md-inline-block ml-md-4">
            <route-bread-crumb></route-bread-crumb>
          </nav>
        </div>
        <div class="col-lg-6 col-5 text-right">
          <base-button size="sm" type="neutral">New</base-button>
          <base-button size="sm" type="neutral">Filters</base-button>
        </div>
      </div>
      <!-- Card stats -->
      <div class="row">
        <div class="col-xl-3 col-md-6">
          <stats-card
            title="Total traffic"
            type="gradient-red"
            sub-title="350,897"
            icon="ni ni-active-40"
          >
            <template v-slot:footer>
              <span class="text-success mr-2"
                ><i class="fa fa-arrow-up"></i> 3.48%</span
              >
              <span class="text-nowrap">Since last month</span>
            </template>
          </stats-card>
        </div>
        <div class="col-xl-3 col-md-6">
          <stats-card
            title="Total traffic"
            type="gradient-orange"
            sub-title="2,356"
            icon="ni ni-chart-pie-35"
          >
            <template v-slot:footer>
              <span class="text-success mr-2"
                ><i class="fa fa-arrow-up"></i> 12.18%</span
              >
              <span class="text-nowrap">Since last month</span>
            </template>
          </stats-card>
        </div>
        <div class="col-xl-3 col-md-6">
          <stats-card
            title="Sales"
            type="gradient-green"
            sub-title="924"
            icon="ni ni-money-coins"
          >
            <template v-slot:footer>
              <span class="text-danger mr-2"
                ><i class="fa fa-arrow-down"></i> 5.72%</span
              >
              <span class="text-nowrap">Since last month</span>
            </template>
          </stats-card>
        </div>
        <div class="col-xl-3 col-md-6">
          <stats-card
            title="Performance"
            type="gradient-info"
            sub-title="49,65%"
            icon="ni ni-chart-bar-32"
          >
            <template v-slot:footer>
              <span class="text-success mr-2"
                ><i class="fa fa-arrow-up"></i> 54.8%</span
              >
              <span class="text-nowrap">Since last month</span>
            </template>
          </stats-card>
        </div>
      </div>
    </base-header>
    <div class="container-fluid mt--6">
      <div class="row">
        <div class="col-xl-6">
          <card>
            <template v-slot:header>
              <!-- Subtitle -->
              <h6 class="surtitle">Overview</h6>
              <!-- Title -->
              <h5 class="h3 mb-0">Total sales</h5>
            </template>
            <div class="chart-area">
              <canvas :height="350" :id="salesChartID"></canvas>
            </div>
          </card>
        </div>

        <div class="col-xl-6">
          <card>
            <template v-slot:header>
              <!-- Subtitle -->
              <h6 class="surtitle">Performance</h6>
              <!-- Title -->
              <h5 class="h3 mb-0">Total orders</h5>
            </template>
            <div class="chart-area">
              <canvas :height="350" :id="ordersChartID"></canvas>
            </div>
          </card>
        </div>
      </div>
      <div class="row">
        <div class="col-xl-6">
          <card>
            <template v-slot:header>
              <!-- Subtitle -->
              <h6 class="surtitle">Growth</h6>
              <!-- Title -->
              <h5 class="h3 mb-0">Sales value</h5>
            </template>
            <div class="chart">
              <div class="chart-area">
                <canvas :height="350" :id="dotsChartID"></canvas>
              </div>
            </div>
          </card>
        </div>

        <div class="col-xl-6">
          <card>
            <template v-slot:header>
              <!-- Subtitle -->
              <h6 class="surtitle">Users</h6>
              <!-- Title -->
              <h5 class="h3 mb-0">Audience overview</h5>
            </template>
            <div class="chart-area">
              <canvas :height="350" :id="doughnutChartID"></canvas>
            </div>
          </card>
        </div>
      </div>

      <div class="row">
        <div class="col-xl-6">
          <card>
            <template v-slot:header>
              <!-- Subtitle -->
              <h6 class="surtitle">Partners</h6>
              <!-- Title -->
              <h5 class="h3 mb-0">Affiliate traffic</h5>
            </template>
            <div class="chart">
              <canvas :height="350" :id="pieChartID"></canvas>
            </div>
          </card>
        </div>

        <div class="col-xl-6">
          <card>
            <template v-slot:header>
              <!-- Subtitle -->
              <h6 class="surtitle">Overview</h6>
              <!-- Title -->
              <h5 class="h3 mb-0">Product comparison</h5>
            </template>
            <div class="chart-area">
              <canvas :height="350" :id="barChartStackedID"></canvas>
            </div>
          </card>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import RouteBreadCrumb from "@/components/Breadcrumb/RouteBreadcrumb";
import BaseHeader from "@/components/BaseHeader";
import StatsCard from "@/components/Cards/StatsCard";

import { ordersChart } from "@/components/Charts/Chart";
import { salesChart } from "@/components/Charts/Chart";
import { dotsChart } from "@/components/Charts/Chart";
import { doughnutChart } from "@/components/Charts/Chart";
import { pieChart } from "@/components/Charts/Chart";
import { barChartStacked } from "@/components/Charts/Chart";

export default {
  components: {
    StatsCard,
    BaseHeader,
    RouteBreadCrumb,
  },
  data() {
    return {
      salesChartID: "salesChart",
      ordersChartID: "ordersChart",
      dotsChartID: "dotsChart",
      doughnutChartID: "doughnutChart",
      pieChartID: "pieChart",
      barChartStackedID: "barChartStacked",
    };
  },
  mounted() {
    ordersChart.createChart(this.ordersChartID);
    salesChart.createChart(this.salesChartID);
    dotsChart.createChart(this.dotsChartID);
    doughnutChart.createChart(this.doughnutChartID);
    pieChart.createChart(this.pieChartID);
    barChartStacked.createChart(this.barChartStackedID);
  },
};
</script>
<style></style>
