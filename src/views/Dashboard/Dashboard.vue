<template>
  <div>
    <!-- your form inputs goes here-->

    <base-header style="background-color: rgb(54, 134, 255) !important">
      <div class="row align-items-center py-4">
        <div class="col-lg-6 col-7">
          <h6 class="h2 text-white d-inline-block mb-0">Default</h6>
          <nav aria-label="breadcrumb" class="d-none d-md-inline-block ml-md-4">
            <route-bread-crumb></route-bread-crumb>
          </nav>
        </div>
        <div class="col-lg-6 col-5 text-right">
          <base-button size="sm" type="neutral">New</base-button>
          <base-button size="sm" type="neutral">Filters</base-button>
        </div>
      </div>
    </base-header>

    <!-- dashboard -->

    <div class="card bg-transparent d-flex flex-row">
      <!-- flex-calendar -->
      <div class="w-75">
        <div class="card m-3 p-3">
          <div>
            <h3 class="text-blue">
              <i class="fa fa-calendar mr-2"></i>Upcoming Events
            </h3>
          </div>
          <div class="w-100" v-if="showcal">
            <vue-cal
              small
              ref="vuecal"
              :time="false"
              hide-view-selector
              :selected-date="todayDate"
              active-view="week"
              :events="$events"
              style="height: 100%"
              :clickToNavigate="false"
              :disable-views="['years', 'day']"
            >
              <template #title="{ title }"
                ><h3 class="m-0">{{ title }}</h3></template
              >
            </vue-cal>
          </div>
        </div>
        <div class="card m-3 p-3">
          <div>
            <h3 class="text-blue"><i class="fa fa-calendar mr-2"></i>News</h3>
          </div>
          <div v-for="news in eventList" :key="news.id" class="border p-3">
            <h3>
              <i class="fa fa-flag text-red mr-2"></i>{{ news.title }} ({{
                $dayjs(news.eventDate).format("DD-MMM-YYYY")
              }})
            </h3>
            <p class="text-muted">
              <i class="fa fa-clock mr-2"></i
              >{{ $dayjs(news.date).format("DD-MMM-YYYY") }} | Sachin Gupta
            </p>
          </div>
        </div>
        <div class="card m-3 p-3">
          <div>
            <h3 class="text-blue">
              <i class="fa fa-user-plus mr-2"></i>New member
            </h3>
          </div>
          <div class="border">
            <el-table :data="userupdatelist" style="width: 100%">
              <el-table-column prop="fullName" label="Name" class="flex-fill"
                ><template v-slot="{ row }">
                  <img
                    class="profile_image"
                    :src="row.profile_pic ? row.profile_pic : 'userpic.jpeg'"
                  />
                  <span>{{ row.fullName }}</span>
                </template></el-table-column
              >
              <el-table-column prop="email" label="email" class="flex-fill" />
              <el-table-column prop="" label="Joining" class="flex-fill"
                ><template v-slot="{ row }">
                  <span>{{ $dayjs(row.joinDate).format("DD-MM-YYYY") }}</span>
                </template></el-table-column
              >
            </el-table>
          </div>
        </div>
      </div>

      <!-- flex-activities -->
      <div class="w-25">
        <div class="card m-3 p-3">
          <div>
            <h3 class="text-blue">
              <i class="fa fa-clock mr-2"></i>Clock-in/out
            </h3>
          </div>
          <div class="d-flex flex-column">
            <div class="w-100 h-50 mb-2 d-flex flex-row bg-secondary p-2">
              <div class="flex-fill">First in -- : --</div>
              <div class="flex-fill">Last out -- : --</div>
            </div>
            <div class="h-50 w-100">
              <el-button type="success" style="width: 100%"
                ><i class="fa fa-clock text-white mr-2"></i>Clock
                in/out</el-button
              >
            </div>
          </div>
        </div>
        <div class="card m-3 p-3">
          <div>
            <h3 class="text-blue">
              <i class="fa fa-stopwatch mr-2"></i>To-dos
            </h3>
          </div>
          <div class="border">
            <el-table :data="tasklist" class="h-100" style="width: 100%">
              <el-table-column
                prop="taskName"
                label="Tasks"
                class="flex-fill"
              />
              <el-table-column prop="DueDate" label="Date" class="flex-fill"
                ><template v-slot="{ row }">
                  <span style="font-size: 10px">{{
                    $dayjs(row.DueDate).format("DD-MM-YYYY")
                  }}</span>
                </template></el-table-column
              >
            </el-table>
          </div>
        </div>
        <div class="card m-3 p-3">
          <div>
            <h3 class="text-blue">
              <i class="fa fa-plane mr-2"></i>My Time-off
            </h3>
          </div>
          <div class="border">
            <el-table :data="allleavelist" class="h-100" style="width: 100%">
              <el-table-column prop="fullName" label="Name" class="flex-fill" />
            </el-table>
          </div>
        </div>
        <div class="card m-3 p-3">
          <div>
            <h3 class="text-blue">
              <i class="fa fa-plane-up mr-2"></i>Who's off today
            </h3>
          </div>
          <div class="border">
            <el-table :data="allleavelist" height="250" style="width: 100%">
              <el-table-column prop="fullName" label="Name" class="flex-fill"
                ><template v-slot="{ row }">
                  <img
                    class="profile_image mr-2"
                    :src="row.profile_pic ? row.profile_pic : 'userpic.jpeg'"
                  />
                  <span>{{ row.fullName }}</span>
                </template></el-table-column
              >
            </el-table>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import RouteBreadCrumb from "@/components/Breadcrumb/RouteBreadcrumb";
import { ElTable, ElTableColumn, ElButton } from "element-plus";
import VueCal from "vue-cal";
import "vue-cal/dist/vuecal.css";
import axios from "axios";

export default {
  components: {
    RouteBreadCrumb,
    [ElTable.name]: ElTable,
    [ElTableColumn.name]: ElTableColumn,
    VueCal,
    ElButton,
  },
  data() {
    return {
      fullPage: true,
      eventList: [],
      userupdatelist: [],
      allleavelist: [],
      tasklist: [],
      gobalvar: "",
      showcal: false,
    };
  },
  methods: {
    // submit() {
    //   let loader = this.$loading.show({
    //     // Optional parameters
    //     container: this.fullPage ? null : this.$refs.formContainer,
    //     canCancel: true,
    //     color: "#318efd",
    //     loader: "dots",
    //     width: 100,
    //     height: 100,
    //     backgroundColor: "#ffffff",
    //     opacity: 1,
    //     zIndex: 999,
    //     onCancel: this.onCancel,
    //   });
    //   // simulate AJAX
    //   setTimeout(() => {
    //     loader.hide();
    //   }, 2000);
    // },
    // onCancel() {
    //   console.log("User cancelled the loader.");
    // },
    getBirthDate() {
      this.$events = [];
      axios.get("http://localhost:7000/dates").then((response) => {
        for (let i = 0; i < response.data.length; i++) {
          // current year
          this.$events.push({
            start:
              this.setYear +
              "-" +
              this.$dayjs(response.data[i].Info.DOB).format("MM-DD"),
            end:
              this.setYear +
              "-" +
              this.$dayjs(response.data[i].Info.DOB).format("MM-DD"),
            allDay: true,
            title: '<i class="fa fa-gift text-blue fa-lg"></i>',
            content: `<img class="rounded-circle" style="width: 30px" src="${response.data[i].profile_pic}"/>`,
            class: "yellow-event",
          });

          this.$events.push({
            start:
              this.setYear +
              "-" +
              this.$dayjs(response.data[i].joinDate).format("MM-DD"),
            end:
              this.setYear +
              "-" +
              this.$dayjs(response.data[i].joinDate).format("MM-DD"),
            allDay: true,
            title: '<i class="fa-solid fa-award text-blue fa-lg"></i>',
            content: `<img class="rounded-circle" style="width: 30px" src="${response.data[i].profile_pic}"/>`,
            class: "yellow-event",
          });

          // previous one year
          this.$events.push({
            start:
              this.$dayjs().subtract(1, "year").year() +
              "-" +
              this.$dayjs(response.data[i].Info.DOB).format("MM-DD"),
            end:
              this.$dayjs().subtract(1, "year").year() +
              "-" +
              this.$dayjs(response.data[i].Info.DOB).format("MM-DD"),
            allDay: true,
            title: '<i class="fa fa-gift text-blue fa-lg"></i>',
            content: `<img class="rounded-circle" style="width: 30px" src="${response.data[i].profile_pic}"/>`,
            class: "yellow-event",
          });

          this.$events.push({
            start:
              this.$dayjs().subtract(1, "year").year() +
              "-" +
              this.$dayjs(response.data[i].joinDate).format("MM-DD"),
            end:
              this.$dayjs().subtract(1, "year").year() +
              "-" +
              this.$dayjs(response.data[i].joinDate).format("MM-DD"),
            allDay: true,
            title: '<i class="fa-solid fa-award text-blue fa-lg"></i>',
            content: `<img class="rounded-circle" style="width: 30px" src="${response.data[i].profile_pic}"/>`,
            class: "yellow-event",
          });

          // next one year
          this.$events.push({
            start:
              this.$dayjs().add(1, "year").year() +
              "-" +
              this.$dayjs(response.data[i].Info.DOB).format("MM-DD"),
            end:
              this.$dayjs().add(1, "year").year() +
              "-" +
              this.$dayjs(response.data[i].Info.DOB).format("MM-DD"),
            allDay: true,
            title: '<i class="fa fa-gift text-blue fa-lg"></i>',
            content: `<img class="rounded-circle" style="width: 30px" src="${response.data[i].profile_pic}"/>`,
            class: "yellow-event",
          });

          this.$events.push({
            start:
              this.$dayjs().add(1, "year").year() +
              "-" +
              this.$dayjs(response.data[i].joinDate).format("MM-DD"),
            end:
              this.$dayjs().add(1, "year").year() +
              "-" +
              this.$dayjs(response.data[i].joinDate).format("MM-DD"),
            allDay: true,
            title: '<i class="fa-solid fa-award text-blue fa-lg"></i>',
            content: `<img class="rounded-circle" style="width: 30px" src="${response.data[i].profile_pic}"/>`,
            class: "yellow-event",
          });
        }
        this.showcal = true;
        this.$maincalevents = [];

        for (let i = 0; i < this.$events.length; i++) {
          this.$maincalevents.push(this.$events[i]);
        }
        console.log(this.$maincalevents.length);
      });
    },
    getTasks(id) {
      this.completedTasks = [];
      this.tasklist = [];
      axios
        .get(
          `http://localhost:7000/tasks/${id}` /*, {
          headers: {
            Authorization: JSON.parse(localStorage.getItem("token")),
          },
        }*/
        )
        .then((response) => {
          for (let i = 0; i < response.data.length; i++) {
            if (!response.data[i].done) {
              this.tasklist.push(response.data[i]);
            }
          }
        });
    },
    getalluserupdate() {
      axios.get("http://localhost:7000/userprofiles").then((response) => {
        for (let i = 0; i < response.data.userdetails.length; i++) {
          if (
            this.$dayjs(response.data.userdetails[i].joinDate).format(
              "DD-MM"
            ) == this.$dayjs().format("DD-MM")
          ) {
            this.userupdatelist.push(response.data.userdetails[i]);
          }
          // console.log(response.data[i].joinDate);
        }
        for (let i = 0; i < response.data.thisday.length; i++) {
          if (
            this.$dayjs(response.data.thisday[i].startDate).format("DD-MM") ==
              this.$dayjs().format("DD-MM") &&
            response.data.thisday[i].status == "Approved"
          ) {
            axios
              .get(
                `http://localhost:7000/usertask/${response.data.thisday[i].user}`
              )
              .then((res) => {
                this.allleavelist.push(res.data);
              });
          }
          // console.log(response.data[i].joinDate);
        }
      });
    },

    getEventDetails() {
      this.eventList = [];
      axios.get("http://localhost:7000/getevent").then((response) => {
        this.eventList = response.data;
      });
    },
  },
  mounted() {
    //this.submit();
    this.showcal = false;
    this.getBirthDate();
    this.getEventDetails();
    this.getalluserupdate();

    const userId = JSON.parse(localStorage.getItem("user"))._id;
    this.getTasks(userId);

    this.todayDate = new Date();
    this.showdate = this.todayDate;
    this.setYear = this.$dayjs().year();

    this.monthyear = this.$dayjs().format("MMMM YYYY");
    // this.$events = [];
  },
};
</script>

<style>
.vuecal__title-bar {
  background-color: rgb(182, 200, 255);
}
.card-view {
  display: flex;
  flex-wrap: wrap;
  flex-direction: row;
  gap: 10px;
  margin: 10px;
  align-items: flex-start;
}
</style>
