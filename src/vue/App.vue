<template>
  <v-app class="h-100">
    <v-main class="main">
      <div>
        <transition name="fade">
          <Panel02 :realData="realData" :info="info"></Panel02>
        </transition>
      </div>
    </v-main>
  </v-app>
</template>
<script>
import Panel02 from "@vue/Panel02";
import mixins_funs from "@vue/mixins/funs";
import axios from "axios";
import cityList from "@src/res/cityList";
import zipCodeList from "@src/res/zipCodeList";
const isProduction = process.env.NODE_ENV === "production";
const apiUrl = "http://www.jsene.com/Farglory/Construction/lonzhong94/index.html/";
const displayParItem = ["TMP", "HUM", "PM2.5", "噪音"];
const changeParItem = [
  { input: "TMP", output: "溫度" },
  { input: "HUM", output: "濕度" },
  { input: "噪音", output: "均能音量" },
];
const changeUnitItem = [{ input: "ug/m3", output: "ug/m<sup>3</sup>" }];
export default {
  name: "app",
  mixins: [mixins_funs],
  components: { Panel02 },
  data() {
    return {
      currentIndex: 0,
      realData: {},
      info: undefined,
    };
  },
  mounted() {
    this.update();
    setInterval(() => {
      this.update();
    }, 1000 * 60);
  },
  methods: {
    update() {
      Promise.all([this.getAPI(apiUrl + "getReal", { stid: "3100006", list: "1,2,4,5" })]).then((realList) => {
        const realData = {};
        realList.forEach((data) => {
          const items = data.vals.map((item) => {
            const parItem = changeParItem.find((el) => el.input === item.parameter);
            item.parameterText = parItem ? parItem.output : item.parameter;
            const unitItem = changeUnitItem.find((el) => el.input === item.unit);
            item.unitText = unitItem ? unitItem.output : item.unit;
            return item;
          });
          realData[data.stid] = displayParItem.map((par) => items.find((el) => par === el.parameter)).filter((el) => el);
        });
        this.realData = realData;
        
      });
    },
    getAPI(url, params) {
      return axios
        .get(url, { params })
        .then((response) => response.data)
        .catch((error) => {
          console.log(error);
        });
    },
  },
};
</script>
<style lang="scss">
html {
  overflow: auto;
  height: 100%;
}
body {
  margin: 0;
  height: 100%;
  //background-color: #fffffa;
}
.v-application--wrap {
  min-height: auto;
  height: 100%;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 1s, transform 1s;
}
.fade-enter,
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
.fade-enter,
.fade-enter-from {
  transform: translateX(-120px) scaleX(1.1);
}
.fade-leave-to {
  transform: translateX(120px) scaleX(1.1);
}
.fade-leave,
.fade-enter-to,
.fade-leave-from {
  opacity: 1;
}
.fade-leave,
.fade-enter-to,
.fade-leave-from {
  transform: translateX(0px), scaleX(1);
}
</style>
<style lang="scss" scoped>
@import "~@css/_expansion.scss";
.main {
  width: 100%;
  height: 100%;
  overflow: hidden;
  min-height: 1080px;
}
@media (min-width: get-breakpoints("sm")) {
}
@media (min-width: get-breakpoints("md")) {
}
@media (min-width: get-breakpoints("lg")) {
}
@media (min-width: get-breakpoints("xl")) {
}
</style>
