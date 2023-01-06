/*!

=========================================================
* Vue Argon Dashboard PRO - v2.0.0
=========================================================

* Product Page: https://www.creative-tim.com/product/argon-dashboard
* Copyright 2021 Creative Tim (https://www.creative-tim.com)

* Coded by www.creative-tim.com

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/

import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import ArgonDashboard from "./plugins/argon-dashboard";
import "element-plus/lib/theme-chalk/index.css";
import dayjs from "dayjs";

import Toast from "vue-toastification";
import "vue-toastification/dist/index.css";
import relativeTime from "dayjs/plugin/relativeTime";
import VueLoading from "vue-loading-overlay";
import "vue-loading-overlay/dist/vue-loading.css";
dayjs.extend(relativeTime);

const options = { containerClassName: "ct-notification" };

const appInstance = createApp(App);
appInstance.config.globalProperties.$events = [];
appInstance.config.globalProperties.$maincalevents = [];
appInstance.config.globalProperties.$dayjs = dayjs;
appInstance.use(router);
appInstance.use(Toast, options);
appInstance.use(ArgonDashboard);
appInstance.use(VueLoading);
appInstance.use(dayjs);
appInstance.mount("#app");
