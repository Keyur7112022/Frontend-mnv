import { createRouter, createWebHashHistory } from "vue-router";

import DashboardLayout from "@/views/Layout/DashboardLayout";
import AuthLayout from "@/views/Pages/AuthLayout";

// Dashboard pages
import Dashboard from "../views/Dashboard/Dashboard.vue";

import Employees from "../views/Employees.vue";
import Calendar from "../views/Calendar/vueCalendar.vue";

// Pages

import Login from "../views/Pages/Login.vue";
import Forgot from "../views/Pages/Forgotpassword.vue";
import Reset from "../views/Pages/Resetpassword.vue";

import Register from "../views/Pages/Register.vue";

import Profile from "../views/Pages/UserProfile.vue";

// Components pages
import Buttons from "../views/Components/Buttons.vue";
import Cards from "../views/Components/Cards.vue";
import Grid from "../views/Components/GridSystem.vue";
import Notifications from "../views/Components/Notifications.vue";
import Checklists from "../views/Components/Checklists.vue";
import Timeoff from "../views/Components/Timeoff.vue";
import Icons from "../views/Components/Icons.vue";

import Myadmin from "../views/Components/Myadmin.vue";

import FormValidation from "../views/Forms/FormValidation.vue";

let componentsMenu = {
  path: "/components",
  component: DashboardLayout,
  redirect: "/components/buttons",
  name: "Components",
  children: [
    {
      path: "buttons",
      name: "Buttons",
      components: { default: Buttons },
    },
    {
      path: "cards",
      name: "Cards",
      components: { default: Cards },
    },
    {
      path: "grid-system",
      name: "Grid",
      components: { default: Grid },
    },
    {
      path: "notifications",
      name: "Notifications",
      components: { default: Notifications },
    },
    {
      path: "checklists",
      name: "Checklists",
      components: { default: Checklists },
    },
    {
      path: "timeoff",
      name: "Timeoff",
      components: { default: Timeoff },
    },
    {
      path: "myadmin",
      name: "Myadmin",
      components: { default: Myadmin },
    },
    {
      path: "icons",
      name: "Icons",
      components: { default: Icons },
    },
  ],
};

let formsMenu = {
  path: "/forms",
  component: DashboardLayout,
  redirect: "/forms/elements",
  name: "Forms",
  children: [
    {
      path: "validation",
      name: "Forms Validation",
      components: { default: FormValidation },
    },
  ],
};

const routes = [
  {
    path: "/",
    redirect: "/dashboard",
    component: DashboardLayout,
    name: "dashboard",
    children: [
      {
        path: "/dashboard",
        name: "dashboard",
        components: { default: Dashboard },
      },

      {
        path: "/employees",
        name: "Employees",
        components: { default: Employees },
      },
      {
        path: "/calendar",
        name: "Calendar",
        components: { default: Calendar },
      },
      {
        path: "/pages/user",
        name: "Profile",
        components: { default: Profile },
      },
    ],
  },
  {
    path: "/",
    redirect: "/",
    component: AuthLayout,
    children: [
      {
        path: "/login",
        name: "Login",
        components: { default: Login },
      },
      {
        path: "/forgotpassword",
        name: "Forgot",
        components: { default: Forgot },
      },
      {
        path: "/resetpassword",
        name: "Reset",
        components: { default: Reset },
      },

      {
        path: "/register",
        name: "Register",
        components: { default: Register },
      },
    ],
  },
  componentsMenu,

  formsMenu,
];

const router = createRouter({
  history: createWebHashHistory(),
  linkActiveClass: "active",
  routes,
});

export default router;
