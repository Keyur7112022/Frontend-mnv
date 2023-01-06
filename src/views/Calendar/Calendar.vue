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

    <div class="container mt--6">
      <div class="row">
        <div class="col">
          <!-- Fullcalendar -->
          <div class="card card-calendar">
            <!-- Card header -->
            <div class="card-header">
              <!-- Title -->
              <div class="d-flex justify-content-between">
                <div>
                  <a
                    v-if="disablePrevbutton"
                    href="#"
                    @click.prevent="prev"
                    class="fullcalendar-btn-prev btn btn-sm btn-default"
                  >
                    <i class="fas fa-angle-left"></i>
                  </a>
                </div>
                <div class="d-inline-block mr-2">
                  <h2>
                    {{ monthyear }}
                  </h2>
                </div>
                <div>
                  <a
                    v-if="disableNextbutton"
                    href="#"
                    @click.prevent="next"
                    class="fullcalendar-btn-next btn btn-sm btn-default"
                  >
                    <i class="fas fa-angle-right"></i>
                  </a>
                </div>
              </div>
            </div>

            <!-- Card body -->
            <div class="card-body p-0 card-calendar-body">
              <div id="fullCalendar"></div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <modal v-model:show="showAddModal" modal-classes="modal-secondary">
      <form class="new-event--form" @submit.prevent="saveEvent">
        <base-input
          name="title"
          label="Event title"
          placeholder="Event Title"
          v-model="model.title"
          input-classes="form-control-alternative new-event--title"
        >
        </base-input>
        <div class="form-group">
          <label class="form-control-label d-block mb-3">Status color</label>
          <div class="btn-group btn-group-toggle btn-group-colors event-tag">
            <label
              v-for="color in eventColors"
              :key="color"
              class="btn"
              :class="[color, { 'active focused': model.className === color }]"
            >
              <input
                v-model="model.className"
                type="radio"
                name="event-tag"
                :value="color"
                autocomplete="off"
              />
            </label>
          </div>
        </div>
        <input type="hidden" class="new-event--start" />
        <input type="hidden" class="new-event--end" />
      </form>

      <template v-slot:footer>
        <button
          type="submit"
          class="btn btn-primary new-event--add"
          @click="saveEvent"
        >
          Add event
        </button>
        <button
          type="button"
          class="btn btn-link ml-auto"
          @click="showAddModal = false"
        >
          Close
        </button>
      </template>
    </modal>

    <modal v-model:show="showEditModal" modal-classes="modal-secondary">
      <div>
        <h1>{{ model.title }}</h1>
      </div>
      <div>{{ model.description }}</div>
      <input type="hidden" class="new-event--start" />
      <input type="hidden" class="new-event--end" />

      <template v-slot:footer>
        <base-button
          native-type="submit"
          type="primary"
          class="new-event--add"
          @click="editEvent"
          >Update</base-button
        >
        <base-button type="danger" @click="deleteEvent">Delete</base-button>
        <base-button type="link" class="ml-auto" @click="showAddModal = false"
          >Close</base-button
        >
      </template>
    </modal>
  </div>
</template>
<script>
import Modal from "@/components/Modal";
import { Calendar } from "@fullcalendar/core";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import timeGridDay from "@fullcalendar/timegrid";
import axios from "axios";
import { event } from "d3";

// const today = new Date();
// const y = today.getFullYear();
// const m = today.getMonth();
// const d = today.getDate();
var calendar;
// console.log(calendar.viewTitle);
export default {
  name: "calendar",
  components: {
    Modal,
  },
  data() {
    return {
      monthyear: "",
      setYear: "",
      disableNextbutton: true,
      disablePrevbutton: true,
      events: [],
      model: {
        title: "",
        description: "",
      },
      showAddModal: false,
      showEditModal: false,
      eventColors: [
        "bg-info",
        "bg-orange",
        "bg-red",
        "bg-green",
        "bg-default",
        "bg-blue",
        "bg-purple",
        "bg-yellow",
      ],
    };
  },
  methods: {
    getBirthDate() {
      this.events = [];
      axios.get("http://localhost:7000/dates").then((response) => {
        for (let i = 0; i < response.data.length; i++) {
          this.events.push({
            title: response.data[i].fullName,
            start:
              this.setYear +
              "-" +
              this.$dayjs(response.data[i].Info.DOB).format("MM-DD"),
            allDay: true,
            className: "event-azure",
          });
          this.events.push({
            title: "Anniversary",
            start:
              this.setYear +
              "-" +
              this.$dayjs(response.data[i].joinDate).format("MM-DD"),
            allDay: true,
            className: "event-azure",
          });
          this.events.push({
            title: "BirthDay",
            start:
              this.$dayjs("2021").format("YYYY") +
              "-" +
              this.$dayjs(response.data[i].Info.DOB).format("MM-DD"),
            allDay: true,
            className: "event-azure",
          });
          this.events.push({
            title: "Anniversary",
            start:
              this.$dayjs("2021").format("YYYY") +
              "-" +
              this.$dayjs(response.data[i].joinDate).format("MM-DD"),
            allDay: true,
            className: "event-azure",
          });
          this.events.push({
            title: "BirthDay",
            start:
              this.$dayjs("2023").format("YYYY") +
              "-" +
              this.$dayjs(response.data[i].Info.DOB).format("MM-DD"),
            allDay: true,
            className: "event-azure",
          });
          this.events.push({
            title: "Anniversary",
            start:
              this.$dayjs("2023").format("YYYY") +
              "-" +
              this.$dayjs(response.data[i].joinDate).format("MM-DD"),
            allDay: true,
            className: "event-azure",
          });
        }
        this.initCalendar();
      });
    },

    initCalendar() {
      var calendarEl = document.getElementById("fullCalendar");

      calendar = new Calendar(calendarEl, {
        plugins: [dayGridPlugin, timeGridDay, interactionPlugin],
        selectable: true,
        headerToolbar: false,
        select: () => {
          this.showAddModal = true;
        },
        eventClick: () => {
          this.model = {
            title: event.title,
            description: event.description,
          };
          this.showEditModal = true;
        },
        events: this.events,
        initialView: "dayGridMonth",
      });
      calendar.render();
    },
    changeView(newView) {
      calendar.changeView(newView);
    },
    next() {
      calendar.next();
      this.monthyear = calendar.currentData.viewTitle;
      this.disablePrevbutton = true;
      if (
        this.$dayjs(calendar.currentData.currentDate).format("YYYY-MM") >
        this.$dayjs("2023-11-01").format("YYYY-MM")
      ) {
        this.disableNextbutton = false;
      }
    },
    prev() {
      calendar.prev();
      this.monthyear = calendar.currentData.viewTitle;
      this.disableNextbutton = true;
      if (
        this.$dayjs(calendar.currentData.currentDate).format("YYYY-MM") <
        this.$dayjs("2021-11-01").format("YYYY-MM")
      ) {
        this.disablePrevbutton = false;
      }
    },
    saveEvent() {
      if (this.model.title) {
        let event = {
          ...this.model,
          allDay: true,
        };
        this.events.push(JSON.parse(JSON.stringify(event)));
        console.log(this.events);
        this.model = {
          title: "",
          eventColor: "bg-danger",
          start: "",
          end: "",
        };
      }
      this.showAddModal = false;
    },
    editEvent() {
      let index = this.events.findIndex((e) => e.title === this.model.title);
      if (index !== -1) {
        this.events.splice(index, 1, this.model);
      }
      this.showEditModal = false;
    },
    deleteEvent() {
      let index = this.events.findIndex((e) => e.title === this.model.title);
      if (index !== -1) {
        this.events.splice(index, 1);
      }
      this.showEditModal = false;
    },
  },
  mounted() {
    this.setYear = this.$dayjs().year();
    this.getBirthDate();
    this.monthyear = this.$dayjs().format("MMMM YYYY");
  },
};
</script>
<style lang="scss">
@import "~@/assets/sass/core/vendors/fullcalendar";
</style>
