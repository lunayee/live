import "core-js/stable";
import "regenerator-runtime/runtime";
import "isomorphic-fetch";
import Vue from "vue";
import vuetify from "@src/plugins/vuetify";
import App from "@vue/App";

Vue.config.productionTip = false;

const app = new Vue({
  el: "#app",
  vuetify,
  render: (h) => h(App),
});
