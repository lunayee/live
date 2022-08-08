<template>
  <div class="panel">
    <div class="h-100 d-flex flex-column">
      <div class="bg"></div>
      <div class="headInfo flex-1 max-h-120 pa-4 d-flex justify-start align-center position-relative">
        <div id="logo"></div>
      </div>
      <div class="d-flex flex-1 position-relative pa-4">
        <div class="flex-1 d-flex mr-4 kanban">
          <table class="table flex-1">
            <tr class="tableHead">
              <td class="itemTitle">工程名稱</td>
              <td colspan="3">高雄市三民區大港段3397地號新建工程(遠雄琢蘊)</td>
            </tr>
            <tr>
              <td class="itemTitle">建造執照</td>
              <td colspan="3">109高市工建築字第00676號</td>
            </tr>
            <tr>
              <td class="itemTitle">起造人</td>
              <td colspan="3">中國建築經理股份有限公司</td>
            </tr>
            <tr>
              <td class="itemTitle">設計人</td>
              <td colspan="3">大硯建築師事務所</td>
            </tr>
            <tr>
              <td class="itemTitle">監造人</td>
              <td colspan="3">大硯建築師事務所</td>
            </tr>
            <tr>
              <td class="itemTitle">承造人</td>
              <td>遠雄營造股份有限公司</td>
              <td class="itemTitle">工地主任</td>
              <td>田晉瑋</td>
            </tr>
            <tr>
              <td class="itemTitle">工地電話</td>
              <td>(07)380-7800</td>
              <td class="itemTitle">主管機關</td>
              <td>--</td>
            </tr>
            <tr>
              <td class="itemTitle">工程概要</td>
              <td colspan="3">地下三樓，地上三十樓</td>
            </tr>
            <tr>
              <td class="itemTitle">施工期間</td>
              <td colspan="3">民國109年10月01號至114年05月09號</td>
            </tr>
            <tr>
              <td class="itemTitle">空汙管制編號</td>
              <td colspan="3">E109E51014-1</td>
            </tr>
          </table>
        </div>

        <div class="flex-1 d-flex flex-column max-w-600">
          <div class="sensors flex-1 d-flex flex-column">
            <div class="sensor flex-1 mb-2" v-if="realData['3100010']">
              <div class="sensorTitle">感測器 3100010</div>
              <div class="item" v-for="(item, key) in realData['3100010']" :key="key">
                <div class="itemTitle"><span v-html="item.parameterText"></span></div>
                <div class="itemValue"><span v-html="item.val"></span> <span v-html="item.unitText"></span></div>
              </div>
            </div>
            <div class="sensor flex-1" v-if="realData['3100011']">
              <div class="sensorTitle">感測器 3100011</div>
              <div class="item" v-for="(item, key) in realData['3100011']" :key="key">
                <div class="itemTitle"><span v-html="item.parameterText"></span></div>
                <div class="itemValue"><span v-html="item.val"></span> <span v-html="item.unitText"></span></div>
              </div>
            </div>
          </div>
          <div id="js_logo"></div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import mixins_funs from "@vue/mixins/funs";
export default {
  props: {
    realData: {
      type: Object,
      default() {
        return {};
      },
    },
  },
  name: "app",
  mixins: [mixins_funs],
  components: {},
  data() {
    return {};
  },
  mounted() {},
  methods: {},
};
</script>
<style lang="scss" scoped>
@import "~@css/_expansion.scss";
.panel {
  //background-image: linear-gradient(45deg, #ffffff, #d8e7ed);
  background-color: #fff;
  position: absolute;
  width: 100%;
  height: 100%;
  left: 0px;
  top: 0px;
}
.bg {
  background-position: center;
  background-size: 100% 100%;
  background-image: url(~@img/panel01/bg.jpg);
  position: absolute;
  display: block;
  width: 100%;
  height: 100%;
  left: 0px;
  top: 0px;
}
.kanban {
  background-color: rgba(252, 253, 255, 0.95);
  border: 3px solid #81a1c2;
  border-radius: 10px;
}
.table {
  border-collapse: collapse;
  border-radius: 10px;
  overflow: hidden;
  width: 100%;
  height: 100%;
  .tableHead {
    background-color: #0185cd;
    td {
      color: #fff;
    }
  }
  td {
    font-family: "標楷體" !important;
    font-size: 32px;
    padding: 0.25em 0.5em;
    font-weight: bold;
    letter-spacing: 0.05em;
    color: #42619e;
    border: 1.5px solid #81a1c2;
    text-align: center;
  }
  .itemTitle {
    font-size: 36px;
    //color: #fff;
  }
}

.sensors {
  //background-color: #fff;
  .sensor {
    display: flex;
    flex-direction: column;
    border: 3px solid #81a1c2;
    border-radius: 10px;
    overflow: auto;
    .sensorTitle {
      color: #fff;
      font-size: 36px;
      text-align: center;
      background-color: #0185cd;
      border-bottom: 1.5px solid #81a1c2;
    }
    .item {
      flex: 1;
      display: flex;
      background-color: rgba(208, 219, 230, 0.95);
      padding: 5px;
      color: #fff;
      align-items: center;
      border-bottom: 1.5px solid #81a1c2;
      color: #484848;
      font-weight: bold;
      .itemTitle {
        flex: 0 0 50%;
        max-width: 50%;
        font-size: 26px;
      }
      .itemValue {
        flex: 0 0 50%;
        max-width: 50%;
        font-size: 26px;
      }
    }
    .item:nth-child(even) {
      background-color: rgba(235, 242, 249, 0.95);
    }
  }
}
.headInfo {
}
.otherInfo {
}
.img {
  background-size: contain;
  background-position: center;
}
#logo {
  background-size: contain;
  background-position: center;
  background-image: url(~@img/panel01/logo.png);
  //filter: drop-shadow(0px 0px 20px rgba(112, 197, 223, 0.2));
  width: 240px;
  height: 100px;
}
#js_logo {
  background-size: contain;
  background-position: center;
  background-image: url(~@img/panel01/JS_logo.png);
  //filter: drop-shadow(0px 0px 20px rgba(112, 197, 223, 0.2));
  position: absolute;
  bottom: 23px;
  right: 23px;
  width: 100px;
  height: 50px;
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
