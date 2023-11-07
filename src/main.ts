import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import "./main.scss";

import HighchartsVue from "highcharts-vue";
import Notifications from "@kyvg/vue3-notification";

const app = createApp(App);

app
  .use(store)
  .use(router)
  .use(Notifications)
  .use(HighchartsVue as any); // https://github.com/highcharts/highcharts-vue/issues/219
app.mount("#app");
