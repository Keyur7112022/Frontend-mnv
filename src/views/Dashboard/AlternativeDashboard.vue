<template>
  <div>
    <base-header class="pb-6" type="">
      <div class="row align-items-center py-4">
        <div class="col-lg-6 col-7">
          <h6 class="h2 d-inline-block mb-0">Alternative</h6>
          <nav aria-label="breadcrumb" class="d-none d-md-inline-block ml-md-4">
            <ol class="breadcrumb breadcrumb-links">
              <li class="breadcrumb-item">
                <router-link to="/"><i class="fas fa-home"></i></router-link>
              </li>
              <li class="breadcrumb-item"><a href="#">Dashboards</a></li>
              <li class="breadcrumb-item active" aria-current="page">
                Alternative
              </li>
            </ol>
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
          <div class="card bg-gradient-primary border-0">
            <!-- Card body -->
            <div class="card-body">
              <div class="row">
                <div class="col">
                  <h5
                    class="card-title text-uppercase text-muted mb-0 text-white"
                  >
                    Tasks completed
                  </h5>
                  <span class="h2 font-weight-bold mb-0 text-white">8/24</span>
                  <base-progress
                    class="progress-xs mt-3 mb-0"
                    type="success"
                    :value="30"
                  ></base-progress>
                </div>
                <div class="col-auto">
                  <base-dropdown
                    title-classes="btn btn-sm btn-neutral mr-0"
                    menu-on-right
                    :has-toggle="false"
                  >
                    <template v-slot:title>
                      <i class="fas fa-ellipsis-h"></i>
                    </template>

                    <a class="dropdown-item" href="#">Action</a>
                    <a class="dropdown-item" href="#">Another action</a>
                    <a class="dropdown-item" href="#">Something else here</a>
                  </base-dropdown>
                </div>
              </div>
              <p class="mt-3 mb-0 text-sm">
                <a href="#!" class="text-nowrap text-white font-weight-600"
                  >See details</a
                >
              </p>
            </div>
          </div>
        </div>
        <div class="col-xl-3 col-md-6">
          <div class="card bg-gradient-info border-0">
            <!-- Card body -->
            <div class="card-body">
              <div class="row">
                <div class="col">
                  <h5
                    class="card-title text-uppercase text-muted mb-0 text-white"
                  >
                    Contacts
                  </h5>
                  <span class="h2 font-weight-bold mb-0 text-white"
                    >123/267</span
                  >
                  <base-progress
                    class="progress-xs mt-3 mb-0"
                    type="success"
                    :value="50"
                  ></base-progress>
                </div>
                <div class="col-auto">
                  <base-dropdown
                    title-classes="btn btn-sm btn-neutral mr-0"
                    menu-on-right
                    :has-toggle="false"
                  >
                    <template v-slot:title>
                      <i class="fas fa-ellipsis-h"></i>
                    </template>

                    <a class="dropdown-item" href="#">Action</a>
                    <a class="dropdown-item" href="#">Another action</a>
                    <a class="dropdown-item" href="#">Something else here</a>
                  </base-dropdown>
                </div>
              </div>
              <p class="mt-3 mb-0 text-sm">
                <a href="#!" class="text-nowrap text-white font-weight-600"
                  >See details</a
                >
              </p>
            </div>
          </div>
        </div>
        <div class="col-xl-3 col-md-6">
          <div class="card bg-gradient-danger border-0">
            <!-- Card body -->
            <div class="card-body">
              <div class="row">
                <div class="col">
                  <h5
                    class="card-title text-uppercase text-muted mb-0 text-white"
                  >
                    Items sold
                  </h5>
                  <span class="h2 font-weight-bold mb-0 text-white"
                    >200/300</span
                  >
                  <base-progress
                    class="progress-xs mt-3 mb-0"
                    type="success"
                    :value="80"
                  ></base-progress>
                </div>
                <div class="col-auto">
                  <base-dropdown
                    title-classes="btn btn-sm btn-neutral mr-0"
                    menu-on-right
                    :has-toggle="false"
                  >
                    <template v-slot:title>
                      <i class="fas fa-ellipsis-h"></i>
                    </template>

                    <a class="dropdown-item" href="#">Action</a>
                    <a class="dropdown-item" href="#">Another action</a>
                    <a class="dropdown-item" href="#">Something else here</a>
                  </base-dropdown>
                </div>
              </div>
              <p class="mt-3 mb-0 text-sm">
                <a href="#!" class="text-nowrap text-white font-weight-600"
                  >See details</a
                >
              </p>
            </div>
          </div>
        </div>
        <div class="col-xl-3 col-md-6">
          <div class="card bg-gradient-default border-0">
            <!-- Card body -->
            <div class="card-body">
              <div class="row">
                <div class="col">
                  <h5
                    class="card-title text-uppercase text-muted mb-0 text-white"
                  >
                    Notifications
                  </h5>
                  <span class="h2 font-weight-bold mb-0 text-white">50/62</span>
                  <base-progress
                    class="progress-xs mt-3 mb-0"
                    type="success"
                    :value="90"
                  ></base-progress>
                </div>
                <div class="col-auto">
                  <base-dropdown
                    title-classes="btn btn-sm btn-neutral mr-0"
                    menu-on-right
                    :has-toggle="false"
                  >
                    <template v-slot:title>
                      <i class="fas fa-ellipsis-h"></i>
                    </template>

                    <a class="dropdown-item" href="#">Action</a>
                    <a class="dropdown-item" href="#">Another action</a>
                    <a class="dropdown-item" href="#">Something else here</a>
                  </base-dropdown>
                </div>
              </div>
              <p class="mt-3 mb-0 text-sm">
                <a href="#!" class="text-nowrap text-white font-weight-600"
                  >See details</a
                >
              </p>
            </div>
          </div>
        </div>
      </div>
    </base-header>

    <div class="container-fluid mt--6">
      <!--Charts-->
      <div class="card-deck flex-column flex-xl-row">
        <card header-classes="bg-transparent">
          <template v-slot:header>
            <div class="row align-items-center">
              <div class="col">
                <h6 class="text-muted text-uppercase ls-1 mb-1">Overview</h6>
                <h5 class="h3 mb-0">Sales value</h5>
              </div>
            </div>
          </template>
          <div class="chart-area">
            <canvas :height="350" :id="salesChartID"></canvas>
          </div>
        </card>

        <card header-classes="bg-transparent">
          <template v-slot:header>
            <div class="row align-items-center">
              <div class="col">
                <h6 class="text-uppercase text-muted ls-1 mb-1">Performance</h6>
                <h5 class="h3 mb-0">Total orders</h5>
              </div>
            </div>
          </template>
          <div class="chart-area">
            <canvas :height="350" :id="ordersChartID"></canvas>
          </div>
        </card>
        <!-- Progress track list-->
        <card>
          <!-- Card header -->
          <template v-slot:header>
            <div class="row align-items-center">
              <div class="col-8">
                <!-- Surtitle -->
                <h6 class="surtitle">5/23 projects</h6>
                <!-- Title -->
                <h5 class="h3 mb-0">Progress track</h5>
              </div>
              <div class="col-4 text-right">
                <a href="#!" class="btn btn-sm btn-neutral">Action</a>
              </div>
            </div>
          </template>
          <!-- Card body -->
          <progress-track-list :item-limit="5"></progress-track-list>
        </card>
      </div>
      <!-- End charts-->

      <!--Tables & Widgets-->
      <div class="row">
        <div class="col-xl-8">
          <light-table :item-limit="5"></light-table>
        </div>
        <div class="col-xl-4">
          <vector-map-card></vector-map-card>
        </div>
      </div>
      <!--End Tables & Widgets-->

      <!--Lists-->
      <div class="card-deck flex-column flex-xl-row">
        <!-- Members list group card -->
        <members-card :show-search="false"></members-card>
        <!-- Checklist -->
        <task-list></task-list>
        <!-- Progress track -->
        <card>
          <!-- Card header -->
          <template v-slot:header>
            <h5 class="h3 mb-0">Progress track</h5>
          </template>
          <!-- Card body -->
          <progress-track-list :item-limit="5"></progress-track-list>
        </card>
      </div>
      <!--End lists-->
    </div>
  </div>
</template>

<script>
// Lists
import TaskList from "../Widgets/TaskList";
import MembersCard from "../Widgets/MembersCard";
import ProgressTrackList from "./ProgressTrackList";

// Tables
import LightTable from "./LightTable";
import VectorMapCard from "../Widgets/VectorMapCard";

// Charts
import { ordersChart } from "@/components/Charts/Chart";
import Chart from "chart.js";
let chart;

export default {
  components: {
    TaskList,
    VectorMapCard,
    ProgressTrackList,
    LightTable,
    MembersCard,
  },
  data() {
    return {
      salesChartID: "salesChart",
      ordersChartID: "ordersChart",
      bigLineChart: {
        allData: [
          [0, 20, 10, 30, 15, 40, 20, 60, 60],
          [0, 20, 5, 25, 10, 30, 15, 40, 40],
        ],
        activeIndex: 0,
      },
    };
  },
  methods: {
    initBigChart(index) {
      chart.update(
        (chart.config.data.datasets[0].data = this.bigLineChart.allData[index])
      );
      this.bigLineChart.activeIndex = index;
    },
  },
  mounted() {
    chart = new Chart(
      document.getElementById(this.salesChartID).getContext("2d"),
      {
        type: "line",
        data: {
          labels: ["May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
          datasets: [
            {
              label: "Performance",
              tension: 0.4,
              borderWidth: 4,
              borderColor: "#5e72e4",
              pointRadius: 0,
              backgroundColor: "transparent",
              data: this.bigLineChart.allData[0],
            },
          ],
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          legend: {
            display: false,
          },
          tooltips: {
            enabled: true,
            mode: "index",
            intersect: false,
          },
          scales: {
            yAxes: [
              {
                barPercentage: 1.6,
                gridLines: {
                  drawBorder: false,
                  color: "transparent",
                  zeroLineColor: "transparent",
                },
                ticks: {
                  padding: 0,
                  fontColor: "#8898aa",
                  fontSize: 13,
                  fontFamily: "Open Sans",
                },
              },
            ],
            xAxes: [
              {
                barPercentage: 1.6,
                gridLines: {
                  drawBorder: false,
                  color: "rgba(29,140,248,0.0)",
                  zeroLineColor: "transparent",
                },
                ticks: {
                  padding: 10,
                  fontColor: "#8898aa",
                  fontSize: 13,
                  fontFamily: "Open Sans",
                },
              },
            ],
          },
          layout: {
            padding: 0,
          },
        },
      }
    );
    ordersChart.createChart(this.ordersChartID);
  },
};
</script>

<style></style>
