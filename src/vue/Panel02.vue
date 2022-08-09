<template>
  <div class="panel">
    <div class="h-100 d-flex">
      <div class="bg"></div>
      <div class="d-flex flex-1 position-relative px-14 py-10">
        <div class="d-flex flex-column col-7">
          <div class="row flex-1">
            <div class="item tmp" v-if="someRealData['3100006']">
              <div class="itemTitle" v-html="someRealData['3100006'][0].parameterText"></div>
              <div class="itemContent d-flex flex-column">
                <div class="flex-1 d-flex justify-center align-center">
                  <div class="state" :class="['pic_' + getTMPLevel(someRealData['3100006'][0].val)]"></div>
                </div>
                <div class="text py-4">
                  <span class="value" v-html="someRealData['3100006'][0].val"></span>
                  <span class="unit" v-html="someRealData['3100006'][0].unitText"></span>
                </div>
              </div>
              <div class="itemFooter text-h5 px-4 pt-1">
                感測器 3100006
              </div>
            </div>
            <div class="item hum" v-if="someRealData['3100006']">
              <div class="itemTitle" v-html="someRealData['3100006'][1].parameterText"></div>
              <div class="itemContent d-flex flex-column">
                <div class="flex-1 d-flex justify-center align-center">
                  <div class="state" :class="['pic_' + getHUMLevel(someRealData['3100006'][1].val)]"></div>
                </div>
                <div class="text py-4">
                  <span class="value" v-html="someRealData['3100006'][1].val"></span>
                  <span class="unit" v-html="someRealData['3100006'][1].unitText"></span>
                </div>
              </div>
              <div class="itemFooter text-h5 px-4 pt-1">
                感測器 3100006
              </div>
            </div>
            <div class="item pm25" v-if="someRealData['3100006']">
              <div class="itemTitle" v-html="someRealData['3100006'][2].parameterText"></div>
              <div class="itemContent d-flex flex-column">
                <div class="flex-1 d-flex justify-center align-center">
                  <div class="state" :class="['pic_' + getPM25Level(someRealData['3100006'][2].val)]"></div>
                </div>
                <div class="text py-4">
                  <span class="value" v-html="someRealData['3100006'][2].val"></span>
                  <span class="unit" v-html="someRealData['3100006'][2].unitText"></span>
                </div>
              </div>
              <div class="itemFooter text-h5 px-4 pt-1">
                感測器 3100006
              </div>
            </div>
            <div class="item volume" v-if="someRealData['3100006']">
              <div class="itemTitle" v-html="someRealData['3100006'][3].parameterText"></div>
              <div class="itemContent d-flex flex-column">
                <div class="flex-1 d-flex justify-center align-center">
                  <div class="state" :class="['pic_' + getVolumeLevel(someRealData['3100006'][3].val)]"></div>
                </div>
                <div class="text py-4">
                  <span class="value" v-html="someRealData['3100006'][3].val"></span>
                  <span class="unit" v-html="someRealData['3100006'][3].unitText"></span>
                </div>
              </div>
              <div class="itemFooter text-h5 px-4 pt-1">
                感測器 3100006
              </div>
            </div>
          </div>
          <div class="datetime mt-12">{{ datetime }}</div>
        </div>

        <div class="d-flex flex-column col-5">
          <!-- <video width="100%" height="100%" controls>
            <source src="http://35.201.250.84:8088/test.m3u8" type="application/x-mpegURL" />
          </video> -->
        </div>
      </div>
      <div id="js_logo"></div>
    </div>
  </div>
</template>
<script>
import mixins_funs from "@vue/mixins/funs";
import videojs from "video.js";
import axios from "axios";

export default {
  props: {
    realData: {
      type: Object,
      default() {
        return {};
      },
    },
    info: {
      type: Object,
      default() {
        return undefined;
      },
    },
  },
  name: "app",
  mixins: [mixins_funs],
  components: {},
  data() {
    return {
      weatherLoaded: false,
      area: "",
      temperature: "",
      weatherState: "",
      datetime: "",
      someRealData: {},
    };
  },
  watch: {
    realData(val) {
      const someRealData = {};
      if (this.realData["3100006"]) {
        someRealData["3100006"] = [
          this.getVal(this.realData["3100006"], "TMP"),
          this.getVal(this.realData["3100006"], "HUM"),
          this.getVal(this.realData["3100006"], "PM2.5"),
          this.getVal(this.realData["3100006"], "噪音"),
        ];
      }
      this.someRealData = someRealData;
    },
  },
  mounted() {
    this.updateDatetime();
    setInterval(() => {
      this.updateWeather();
    }, 1000 * 60 * 30);
    setInterval(() => {
      this.updateDatetime();
    }, 1000);
  },

  methods: {
    getTMPLevel(val) {
      if (val === undefined) return;
      val = parseFloat(val.toFixed(1));
      if (val <= 18) {
        return 1;
      } else if (val >= 18 && val <= 30) {
        return 2;
      } else if (val >= 30) {
        return 3;
      }
    },
    getHUMLevel(val) {
      if (val === undefined) return;
      val = parseFloat(val.toFixed(1));
      if (val <= 50) {
        return 1;
      } else if (val >= 50 && val <= 70) {
        return 2;
      } else if (val >= 70) {
        return 3;
      }
    },
    getPM25Level(val) {
      if (val === undefined) return;
      val = parseFloat(val.toFixed(1));
      if (val >= 0 && val <= 15.4) {
        return 1;
      } else if (val >= 15.5 && val <= 35.4) {
        return 2;
      } else if (val >= 35.5 && val <= 54.4) {
        return 3;
      } else if (val >= 54.5 && val <= 150.4) {
        return 4;
      } else if (val >= 150.5 && val <= 250.4) {
        return 5;
      } else if (val >= 250.5) {
        return 6;
      }
    },
    getVolumeLevel(val) {
      if (val === undefined) return;
      let date = new Date();
      let nowS = date.getHours() * 60 * 60 + date.getMinutes() * 60 + date.getSeconds();
      let obj = {};
      if (nowS >= 6 * 60 * 60 && nowS < 20 * 60 * 60) {
        obj = { type: "daytime", volume: 60 };
      } else if (nowS >= 20 * 60 * 60 && nowS < 22 * 60 * 60) {
        obj = { type: "evening", volume: 55 };
      } else {
        obj = { type: "nighttime", volume: 55 };
      }
      val = parseFloat(val.toFixed(1));
      if (val >= 0 && val < obj.volume) {
        return 1;
      } else if (val >= obj.volume) {
        return 2;
      }
    },
    getVal(vals, type) {
      return vals.find((el) => el.parameter === type);
    },
    updateDatetime() {
      let date = new Date();
      let hours = date.getHours();
      hours = (hours < 12 ? "上午" : "下午") + this.pushZero((hours % 12) + (hours % 12 == 0 ? 12 : 0));
      this.datetime = `${date.getFullYear()}年${this.pushZero(date.getMonth() + 1)}月${this.pushZero(date.getDate())}日 ${hours}:${this.pushZero(date.getMinutes())}`;
    },
    pushZero(val) {
      return val.toString().padStart(2, "0");
    },
  },
};
</script>

<style lang="scss" scoped>
@import "~@css/_expansion.scss";
@font-face {
  font-family: framd;
  src: url(~@fonts/framd.ttf);
}
.panel {
  //background-image: linear-gradient(45deg, #ffffff, #d8e7ed);
  background-color: #fff;
  font-family: "微軟正黑體", serif;
  position: absolute;
  width: 100%;
  height: 100%;
  left: 0px;
  top: 0px;
}
.bg {
  background-position: center;
  background-size: 100% 100%;
  background-image: url(~@img/panel02/bg.jpg);
  position: absolute;
  display: block;
  width: 100%;
  height: 100%;
  left: 0px;
  top: 0px;
}
.datetime {
  font-size: 48px;
  color: #fff;
  font-weight: bold;
  letter-spacing: 0.1em;
  padding: 0px 20px;
  text-shadow: 0px 0px 5px rgba(0, 0, 0, 0.5);
}
.item {
  display: flex;
  flex-direction: column;
  padding: 5px 20px;
  flex: 0 0 50%;
  max-width: 50%;
  max-height: 50%;
  .itemTitle {
    font-size: 48px;
    color: #f8f244;
    font-weight: bold;
    letter-spacing: 0.1em;
    text-align: center;
  }
  .itemContent {
    flex: 100%;
    background-image: url(~@img/panel02/item_bg.png);
    background-size: 100% 100%;
    box-shadow: 0px 0px 20px rgba(255, 255, 255, 0.25);
    border-radius: 20px;
    // backdrop-filter: blur(5px);
  }
}
.tmp {
  .state {
    background-size: contain;
    background-position: center;
    //background-image: url(~@img/panel02/state_0.png);
    width: 180px;
    height: 180px;
    $icons: "1", "2", "3";
    @each $icon in $icons {
      &.pic_#{$icon} {
        background-image: url(~@img/panel02/tmp/state_#{$icon}.png);
      }
    }
  }
  .text {
    font-size: 48px;
    font-weight: bold;
    color: #195283;
    text-align: center;
    font-family: framd, serif;
    letter-spacing: 0.05em;
  }
}
.hum {
  .state {
    background-size: contain;
    background-position: center;
    //background-image: url(~@img/panel02/state_0.png);
    width: 180px;
    height: 180px;
    $icons: "1", "2", "3";
    @each $icon in $icons {
      &.pic_#{$icon} {
        background-image: url(~@img/panel02/hum/state_#{$icon}.png);
      }
    }
  }
  .text {
    font-size: 48px;
    font-weight: bold;
    color: #195283;
    text-align: center;
    font-family: framd, serif;
    letter-spacing: 0.05em;
  }
}
.pm25 {
  .state {
    background-size: contain;
    background-position: center;
    //background-image: url(~@img/panel02/state_0.png);
    width: 180px;
    height: 180px;
    $icons: "1", "2", "3", "4", "5", "6";
    @each $icon in $icons {
      &.pic_#{$icon} {
        background-image: url(~@img/panel02/pm25/state_#{$icon}.png);
      }
    }
  }
  .text {
    font-size: 48px;
    font-weight: bold;
    color: #195283;
    text-align: center;
    font-family: framd, serif;
    letter-spacing: 0.05em;
  }
}
.volume {
  .state {
    background-size: contain;
    background-position: center;
    // background-image: url(~@img/panel02/state_0.png);
    width: 180px;
    height: 180px;
    $icons: "1", "2";
    @each $icon in $icons {
      &.pic_#{$icon} {
        background-image: url(~@img/panel02/volume/state_#{$icon}.png);
      }
    }
  }
  .text {
    font-weight: bold;
    color: #195283;
    font-family: framd, serif;
    letter-spacing: 0.05em;
    font-size: 48px;
    text-align: center;
    .value {
    }
    .unit {
      //margin-left: 0.5em;
    }
  }
}
.itemFooter {
  color: #f6d3d3;
  /* font-weight: bold; */
  text-shadow: 0px 0px 10px #000;
  text-align: right;
}
#js_logo {
  background-size: contain;
  background-position: center;
  background-image: url(~@img/panel02/JS_logo.png);
  position: absolute;
  bottom: 55px;
  right: 115px;
  width: 264px;
  height: 126px;
}
.weather {
  margin-top: 120px;
  width: 600px;
  .text {
    font-size: 48px;
    color: #d7f4f9;
    // font-weight: bold;
    letter-spacing: 0.75em;
    text-indent: 0.75em;
    text-shadow: 0 0 10px #093150;
  }
  .area {
    font-size: 48px;
    color: #fff;
    font-weight: bold;
    letter-spacing: 0.1em;
    text-align: center;
    text-shadow: 0px 5px 10px rgba(0, 0, 0, 0.2);
  }
  .temperature {
    font-size: 100px;
    color: #fff;
    font-weight: bold;
    letter-spacing: 0.1em;
    text-align: center;
    text-shadow: 0px 5px 10px rgba(0, 0, 0, 0.2);
  }

  .weatherState {
    background-size: contain;
    background-position: center;
    width: 256px;
    height: 256px;
    filter: drop-shadow(0px 5px 10px rgba(16, 129, 152, 0.5));
    $icons: "01d", "02d", "03d", "04d", "09d", "10d", "11d", "13d", "50d";
    @each $icon in $icons {
      &.pic_#{$icon} {
        background-image: url(~@img/panel02/weatherState/#{$icon}.png);
      }
    }
  }
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
