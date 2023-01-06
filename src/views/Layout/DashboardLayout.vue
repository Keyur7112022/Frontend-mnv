<template>
  <div class="wrapper" ref="formContainer">
    <!-- <notifications></notifications> -->
    <side-bar>
      <template v-slot:links>
        <sidebar-item
          :link="{
            name: 'dashboard',
            icon: 'fa-solid fa-house-user text-blue',
            path: '/dashboard',
          }"
        >
        </sidebar-item>

        <sidebar-item
          :link="{
            name: 'Employees',
            icon: 'fa-solid fa-users text-blue',
            path: '/employees',
          }"
        >
        </sidebar-item>

        <sidebar-item
          :link="{
            name: 'Checklists',
            icon: 'fa fa-clipboard  text-blue',
            path: '/components/checklists',
          }"
        >
        </sidebar-item>

        <sidebar-item
          :link="{
            name: 'Timeoff',
            icon: 'fa fa-business-time  text-blue',
            path: '/components/timeoff',
          }"
        >
        </sidebar-item>

        <sidebar-item
          :link="{
            name: 'Calendar',
            icon: 'ni ni-calendar-grid-58  text-blue',
            path: '/calendar',
          }"
        >
        </sidebar-item>

        <sidebar-item
          :link="{
            name: 'Notifications',
            icon: 'ni ni-bell-55  text-blue',
            path: '/components/notifications',
          }"
        >
        </sidebar-item>

        <sidebar-item
          :link="{
            name: 'Profile',
            icon: 'ni ni-circle-08  text-blue',
            path: '/pages/user',
          }"
        >
        </sidebar-item>
        <template v-if="admin">
          <sidebar-item
            :link="{
              name: 'My Admin',
              icon: 'ni ni-single-02 text-blue',
              path: '/components/myadmin',
            }"
          >
          </sidebar-item>
        </template>
      </template>
    </side-bar>
    <div class="main-content" style="background-color: rgb(235, 243, 255)">
      <dashboard-navbar :type="$route.meta.navbarType"></dashboard-navbar>

      <div @click="$sidebar.displaySidebar(false)">
        <router-view></router-view>
      </div>
      <content-footer v-if="!$route.meta.hideFooter"></content-footer>
    </div>
  </div>
</template>
<script>
/* eslint-disable no-new */
import PerfectScrollbar from "perfect-scrollbar";
import "perfect-scrollbar/css/perfect-scrollbar.css";

function hasElement(className) {
  return document.getElementsByClassName(className).length > 0;
}

function initScrollbar(className) {
  if (hasElement(className)) {
    new PerfectScrollbar(`.${className}`);
  } else {
    // try to init it later in case this component is loaded async
    setTimeout(() => {
      initScrollbar(className);
    }, 100);
  }
}

import DashboardNavbar from "./DashboardNavbar.vue";
import ContentFooter from "./ContentFooter.vue";

export default {
  data() {
    return {
      admin: "",
    };
  },
  components: {
    DashboardNavbar,
    ContentFooter,
  },
  methods: {
    submit() {
      let loader = this.$loading.show({
        // Optional parameters
        container: this.fullPage ? null : this.$refs.formContainer,
        canCancel: true,
        color: "#318efd",
        loader: "dots",
        width: 100,
        height: 100,
        backgroundColor: "#ffffff",
        opacity: 1,
        zIndex: 9999,
        onCancel: this.onCancel,
      });
      // simulate AJAX
      setTimeout(() => {
        loader.hide();
      }, 2000);
    },
    onCancel() {
      console.log("User cancelled the loader.");
    },
    getAdmin() {
      console.log(typeof JSON.parse(localStorage.getItem("user")).admin);
      this.admin = JSON.parse(localStorage.getItem("user")).admin;
    },
    initScrollbar() {
      let isWindows = navigator.platform.startsWith("Win");
      if (isWindows) {
        initScrollbar("sidenav");
      }
    },
  },
  mounted() {
    this.initScrollbar();
    this.getAdmin();
    this.submit();
  },
};
</script>
<style lang="scss"></style>
