<template>
  <base-nav
    style="background-color: rgb(54, 134, 255)"
    class="navbar-top border-bottom navbar-expand bg-mnvspec"
    :class="{ 'navbar-dark': type === 'default' }"
  >
    <!-- Search form -->
    <form
      class="navbar-search form-inline mr-sm-3"
      :class="{
        'navbar-search-light': type === 'default',
        'navbar-search-dark': type === 'light',
      }"
      id="navbar-search-main"
    >
      <div class="form-group mb-0">
        <div class="input-group input-group-alternative input-group-merge">
          <div class="input-group-prepend">
            <span class="input-group-text"><i class="fas fa-search"></i></span>
          </div>
          <input class="form-control" placeholder="Search" type="text" />
        </div>
      </div>
      <button
        type="button"
        class="close"
        data-action="search-close"
        data-target="#navbar-search-main"
        aria-label="Close"
      >
        <span aria-hidden="true">×</span>
      </button>
    </form>
    <!-- Navbar links -->
    <ul class="navbar-nav align-items-center ml-md-auto">
      <li class="nav-item d-xl-none">
        <!-- Sidenav toggler -->
        <div
          class="pr-3 sidenav-toggler"
          :class="{
            active: $sidebar.showSidebar,
            'sidenav-toggler-dark': type === 'default',
            'sidenav-toggler-light': type === 'light',
          }"
          @click="toggleSidebar"
        >
          <div class="sidenav-toggler-inner">
            <i class="sidenav-toggler-line"></i>
            <i class="sidenav-toggler-line"></i>
            <i class="sidenav-toggler-line"></i>
          </div>
        </div>
      </li>
      <li class="nav-item d-sm-none">
        <a
          class="nav-link"
          href="#"
          data-action="search-show"
          data-target="#navbar-search-main"
        >
          <i class="ni ni-zoom-split-in"></i>
        </a>
      </li>
      <base-dropdown
        class="nav-item"
        tag="li"
        title-classes="nav-link"
        title-tag="a"
        icon="ni ni-bell-55"
        menu-classes="dropdown-menu-xl dropdown-menu-right py-0 overflow-hidden"
      >
        <!-- Dropdown header -->
        <div class="px-3 py-3">
          <h6 class="text-sm text-muted m-0">
            You have
            <strong class="text-primary">{{ notificationList.length }}</strong>
            notifications.
          </h6>
        </div>
        <!-- List group -->
        <div class="list-group list-group-flush">
          <a
            href="#components/checklists"
            v-for="data in notificationList"
            :key="data.id"
            class="list-group-item list-group-item-action"
          >
            <div class="row align-items-center">
              <div class="col-auto">
                <!-- Avatar -->
                <img
                  alt="Image placeholder"
                  src="userpic.jpeg"
                  class="avatar rounded-circle"
                />
              </div>
              <div class="col ml--2">
                <div class="d-flex justify-content-between align-items-center">
                  <div>
                    <h4 class="mb-0 text-sm">New Task</h4>
                  </div>
                  <div class="text-right text-muted">
                    <small>{{ $dayjs(data.date).fromNow() }}</small>
                  </div>
                </div>
                <p class="text-sm mb-0">{{ data.notificationmsg }}</p>
              </div>
            </div>
          </a>
        </div>
        <!-- View all -->
        <a
          href="#!"
          class="dropdown-item text-center text-primary font-weight-bold py-3"
          >View all</a
        >
      </base-dropdown>
      <base-dropdown
        menu-classes="dropdown-menu-lg dropdown-menu-dark bg-default dropdown-menu-right"
        class="nav-item"
        tag="li"
        title-tag="a"
        title-classes="nav-link"
        icon="ni ni-ungroup"
      >
        <div class="row shortcuts px-4">
          <a href="#!" class="col-4 shortcut-item">
            <span class="shortcut-media avatar rounded-circle bg-gradient-red">
              <i class="ni ni-calendar-grid-58"></i>
            </span>
            <small>Calendar</small>
          </a>
          <a href="#!" class="col-4 shortcut-item">
            <span
              class="shortcut-media avatar rounded-circle bg-gradient-orange"
            >
              <i class="ni ni-email-83"></i>
            </span>
            <small>Email</small>
          </a>
          <a href="#!" class="col-4 shortcut-item">
            <span
              class="shortcut-media avatar rounded-circle bg-gradient-green"
            >
              <i class="ni ni-books"></i>
            </span>
            <small>Reports</small>
          </a>
        </div>
      </base-dropdown>
    </ul>
    <ul class="navbar-nav align-items-center ml-auto ml-md-0">
      <base-dropdown
        menu-on-right
        class="nav-item"
        tag="li"
        title-tag="a"
        title-classes="nav-link pr-0"
      >
        <template v-slot:title-container>
          <a href="#" class="nav-link pr-0" @click.prevent>
            <div class="media align-items-center">
              <span class="avatar avatar-sm rounded-circle">
                <img
                  alt="Image placeholder"
                  :src="user.profile_pic ? user.profile_pic : 'userpic.jpeg'"
                />
              </span>
              <div class="media-body ml-2 d-none d-lg-block">
                <p class="mb-0 text-white">
                  {{ user.fullName }}
                </p>
              </div>
            </div>
          </a>
        </template>

        <div class="dropdown-header noti-title">
          <h6 class="text-overflow m-0">Welcome!</h6>
        </div>
        <a href="#pages/user" class="dropdown-item">
          <i class="ni ni-single-02"></i>
          <span>My profile</span>
        </a>
        <a href="#!" class="dropdown-item">
          <i class="ni ni-settings-gear-65"></i>
          <span>Settings</span>
        </a>
        <a href="#calendar" class="dropdown-item">
          <i class="ni ni-calendar-grid-58"></i>
          <span>Activity</span>
        </a>
        <a href="#!" class="dropdown-item">
          <i class="ni ni-support-16"></i>
          <span>Support</span>
        </a>
        <div class="dropdown-divider"></div>
        <a href="#login" class="dropdown-item" @click="removeLocal">
          <i class="ni ni-user-run"></i>
          <span>Logout</span>
        </a>
      </base-dropdown>
    </ul>
  </base-nav>
</template>
<script>
import BaseNav from "@/components/Navbar/BaseNav";
import axios from "axios";

export default {
  components: {
    BaseNav,
  },
  props: {
    type: {
      type: String,
      default: "default", // default|light
      description:
        "Look of the dashboard navbar. Default (Green) or light (gray)",
    },
  },
  computed: {
    routeName() {
      const { name } = this.$route;
      return this.capitalizeFirstLetter(name);
    },
  },
  data() {
    return {
      notificationList: [],
      activeNotifications: false,
      showMenu: false,
      searchModalVisible: false,
      searchQuery: "",
      user: "",
    };
  },
  methods: {
    getNotification(id) {
      this.notificationList = [];
      axios.get(`http://localhost:7000/notify/${id}`).then((response) => {
        this.notificationList = response.data;
      });
    },
    removeLocal() {
      localStorage.removeItem("user");
      localStorage.removeItem("token");
    },
    capitalizeFirstLetter(string) {
      return string.charAt(0).toUpperCase() + string.slice(1);
    },
    toggleNotificationDropDown() {
      this.activeNotifications = !this.activeNotifications;
    },
    closeDropDown() {
      this.activeNotifications = false;
    },
    toggleSidebar() {
      this.$sidebar.displaySidebar(!this.$sidebar.showSidebar);
    },
    hideSidebar() {
      this.$sidebar.displaySidebar(false);
    },
  },
  mounted() {
    this.user = JSON.parse(localStorage.getItem("user"));
    this.getNotification(JSON.parse(localStorage.getItem("user"))._id);
  },
};
</script>
