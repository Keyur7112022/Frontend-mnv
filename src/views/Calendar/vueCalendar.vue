<template>
  <div>
    <base-header
      class="pb-6 content__title content__title--calendar"
      style="background-color: rgb(54, 134, 255) !important"
    >
      <div class="row align-items-center py-4">
        <div class="col-lg-6 col-7">
          <h6 class="h2 text-white d-inline-block mb-0">{{ $route.name }}</h6>
        </div>
      </div>
    </base-header>

    <div class="card mt--6 ml-4 mr-4">
      <!-- Fullcalendar -->
      <div class="card p-2">
        <!-- Card header -->

        <!-- Card body -->

        <div class="d-flex justify-content-between m-2">
          <div>
            <el-button v-if="showprev" @click="vprevious" type="primary"
              ><i class="fa fa-less-than"></i
            ></el-button>
          </div>
          <div>
            <h1 class="m-0">
              {{ $dayjs(showdate).format("MMMM YYYY") }}
            </h1>
          </div>
          <div>
            <el-button v-if="shownext" @click="vnext" type="primary"
              ><i class="fa fa-greater-than"></i
            ></el-button>
          </div>
        </div>
        <vue-cal
          ref="vuecal"
          :time="false"
          hide-view-selector
          :selected-date="todayDate"
          active-view="month"
          events-on-month-view="true"
          :events="events"
          style="height: 100%"
          hide-title-bar
        >
        </vue-cal>
      </div>
      <div class="d-flex ml-2 mb-2">
        <div class="m-0 p-2">
          <h3 class="m-0">
            <i class="fa fa-gift text-blue fa-lg mr-2"></i>Birthday
          </h3>
        </div>
        <div class="m-0 p-2">
          <h3 class="m-0">
            <i class="fa fa-award text-blue fa-lg mr-2"></i>Anniversary
          </h3>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import VueCal from "vue-cal";
import "vue-cal/dist/vuecal.css";
import { ElButton } from "element-plus";
import axios from "axios";
export default {
  data() {
    return {
      events: [
        {
          start: "2022-12-12",
          end: "2022-12-12",
          title: '<i class="fa fa-gift text-white mr-2"></i>',
          content: "blue",
          class: "yellow-event",
          allDay: true,
        },
      ],
      todayDate: "",
      showdate: "",
      shownext: true,
      showprev: true,
    };
  },

  components: { VueCal, ElButton },
  methods: {
    getBirthDate() {
      this.events = [];
      axios.get("http://localhost:7000/dates").then((response) => {
        for (let i = 0; i < response.data.length; i++) {
          // current year
          this.events.push({
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

          this.events.push({
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
          this.events.push({
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

          this.events.push({
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
          this.events.push({
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

          this.events.push({
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
      });
    },
    vprevious() {
      this.shownext = true;
      this.$refs.vuecal.previous();
      this.showdate = this.$refs.vuecal.view.startDate;
      if (
        this.$dayjs(this.showdate) <
        this.$dayjs(this.todayDate).subtract(1, "year")
      ) {
        this.showprev = false;
      }
    },
    vnext() {
      this.showprev = true;
      this.$refs.vuecal.next();
      this.showdate = this.$refs.vuecal.view.startDate;
      if (
        this.$dayjs(this.showdate) > this.$dayjs(this.todayDate).add(1, "year")
      ) {
        this.shownext = false;
      }
    },
  },
  mounted() {
    this.todayDate = new Date();
    this.showdate = this.todayDate;
    this.setYear = this.$dayjs().year();
    this.getBirthDate();
    this.monthyear = this.$dayjs().format("MMMM YYYY");
  },
};
</script>
<style>
/* .vuecal__event-title {
  background-color: rgb(97, 97, 255);
  color: white;
  padding: 2px;
  margin: 0 10px;
} */
.vuecal--month-view .vuecal__cell-content {
  height: 100%;
  min-height: 100px;
  padding: 0;
  display: flex;
  justify-content: start;
  align-items: flex-end;
}
.vuecal__event {
  background: none;
  display: flex;
  gap: 10px;
  justify-content: start;
  padding: 2px;
  align-items: center;
}
.vuecal--month-view .vuecal__cell-date {
  padding: 4px;
}
.vuecal--month-view .vuecal__no-event {
  display: none;
}
</style>
