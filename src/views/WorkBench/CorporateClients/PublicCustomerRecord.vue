<template>
  <div class="FarmersInformation">
    <child-nav :title="typeCN"></child-nav>
    <div v-if="typeCN == '对公客户建档'">
      <ul class="tabList">
        <li @click="tab(0)" :class="tabId == 0 ? 'cur' : 'ordinary'">
          基本信息
        </li>
        <li @click="tab(1)" :class="tabId == 1 ? 'cur' : 'ordinary'">
          客户需求
        </li>
        <li @click="tab(2)" :class="tabId == 2 ? 'cur' : 'ordinary'">
          营销记录
        </li>
      </ul>
      <div v-show="tabId === 0" class="household_base">
        <van-field
          v-model="publicCustomerName"
          name="名称："
          label="名称："
          placeholder="单行输入"
          required
        />
        <van-field
          v-model="publicCustomerAddress"
          name="地址："
          label="地址："
          placeholder="单行输入"
          required
        />
        <van-field
          readonly
          clickable
          name="area"
          :value="publicCustomerGrid.text"
          label="所属网格："
          placeholder="点击选择所属网格"
          @click="regional_grid = true"
        />
        <van-popup v-model="regional_grid" position="bottom">
          <van-picker
            show-toolbar
            :columns="areaList"
            @cancel="regional_grid = false"
            @confirm="onRegional_grid"
          />
        </van-popup>
        <van-field
          readonly
          clickable
          name="picker"
          :value="industry.text"
          label="所属行业："
          placeholder="点击选择所属行业"
          @click="industryShow = true"
        />
        <van-popup v-model="industryShow" position="bottom">
          <van-picker
            show-toolbar
            :columns="industry_list"
            @confirm="onIndustryShow"
            @cancel="industryShow = false"
          />
        </van-popup>
        <van-field name="uploader" label="客户照片" required>
          <template #input>
            <van-uploader :after-read="afterRead" v-model="uploader" multiple />
          </template>
        </van-field>
        <van-field
          v-model="businessLicenseNo"
          name="营业执照号："
          label="营业执照号："
          placeholder="单行输入"
          required
        />
        <van-field
          v-model="legalPersonName"
          name="法人姓名："
          label="法人姓名："
          placeholder="单行输入"
        />
        <van-field
          v-model="legalPersonTelephone"
          name="法人联系方式："
          label="法人联系方式："
          placeholder="单行输入"
        >
          <!-- <template #button>
            <a class="img4" :href="'tel:' + farmers_details.telphone"></a>
          </template> -->
        </van-field>
        <van-field
          v-model="otherContactsName"
          name="其他联系人姓名："
          label="其他联系人姓名："
          placeholder="单行输入"
        />
        <van-field
          v-model="otherContactsTelephone"
          name="其他联系方式："
          label="其他联系方式："
          placeholder="单行输入"
        >
          <!-- <template #button>
            <a class="img4" :href="'tel:' + farmers_details.telphone"></a>
          </template> -->
        </van-field>
        <van-field
          v-model="publicCustomerLocation"
          readonly
          name="位置："
          label="位置："
          placeholder="点击在地图中选择"
        >
          <template #button>
            <img
              @click="getLongitudeLatitude"
              style="opacity: 0.9; margin-right: 15px"
              class=""
              src="../../../assets/grid/sign.svg"
              alt=""
            />
          </template>
        </van-field>
        <!-- <van-field
          v-model="sourceClues"
          name="线索来源："
          label="线索来源："
          placeholder="单行输入"
        /> -->
        <div
          style="width: 99%; margin: 0.5rem auto; position: relative"
          v-if="longitudeLatitude"
        >
          <baidu-map
            class="bm-view"
            :center="mapCenter1"
            :zoom="zoom"
            ak="WjS3NqjeiRpXVIQiWp2WiHhFyEcYz90e"
            @longpress="longpress"
            @ready="mapReady"
          >
            <bm-marker
              :dragging="true"
              :position="mapCenter"
              @dragend="markerDragend"
              :icon="{
                url: require('../../../assets/grid/sign.svg'),
                size: { width: 30, height: 30 },
              }"
            ></bm-marker>
            <template>
              <p
                style="
                  width: 35px;
                  height: 35px;
                  display: flex;
                  justify-content: center;
                  align-items: center;
                  background: #dedede;
                  border: 1px solid #d8d8d8;
                  border-radius: 5px;
                  position: absolute;
                  right: 20px;
                  margin: 0;
                  top: 20px;
                "
                @click="appMessage1"
              >
                <img src="../../../assets/grid/current_location.svg" alt />
              </p>
            </template>
          </baidu-map>
        </div>
        <div class="save">
          <van-button round block type="primary" @click="modifyResult()"
            >保存</van-button
          >
        </div>
      </div>
      <div v-show="tabId === 1" class="household_have">
        <van-field
          name="radio"
          :label="item.text"
          v-for="(item, index) in potential_need_type"
          :key="index"
        >
          <template #input>
            <van-radio-group v-model="item.index" direction="horizontal">
              <van-radio name="0" checked-color="rgb(61, 66, 94)"
                >已办</van-radio
              >
              <van-radio name="1" checked-color="rgb(61, 66, 94)"
                >未办</van-radio
              >
              <van-radio name="2" checked-color="rgb(61, 66, 94)"
                >需办</van-radio
              >
            </van-radio-group>
          </template>
        </van-field>
        <van-field
          v-model="otherTxt"
          rows="1"
          autosize
          label="其他"
          type="textarea"
          placeholder="多行输入"
        />
        <div class="save" style="padding-top: 2rem">
          <van-button round block type="primary" @click="modifyResult()"
            >保存</van-button
          >
        </div>
      </div>
      <div v-show="tabId === 2">
        <!-- <van-list
          v-model="loading"
          :finished="finished"
          finished-text="没有更多了"
          @load="onLoad"
        > -->
          <ul style="background: #fff">
            <li
              v-for="(thisItem, index) in MarketingRecord"
              :key="index"
              class="marked_record"
            >
              <div class="positionFixd">
                <router-link
                  tag="p"
                  :to="{
                    name: 'EditMarketingRecord',
                    query: {
                      title: '营销记录',
                      id: thisItem.id,
                      custName: custName,
                      productName: productName,
                    },
                  }"
                  style="width: 55%"
                  >{{ thisItem.semTime | transform }}</router-link
                >

                <p>
                  <van-button
                    color="#3d425e"
                    size="mini"
                    @click="deleteRemark(thisItem.id)"
                    >删除</van-button
                  >
                </p>
              </div>

              <div class="positionFixd">
                <router-link
                  tag="p"
                  :to="{
                    name: 'EditMarketingRecord',
                    query: {
                      title: '营销记录',
                      id: thisItem.id,
                      custName: custName,
                      productName: productName,
                    },
                  }"
                  class="dadian"
                  >{{ thisItem.remark }}</router-link
                >
                <p style="width: 50%; display: flex" class="approval">
                  <!-- <span class="approval_Passed">已营销</span> -->
                  <span
                    :class="
                      thisItem.intention == '1'
                        ? 'approval_Passed'
                        : 'approval_Passed1'
                    "
                    >{{ thisItem.intention | dic_client_will }}</span
                  >
                  <span
                    :class="
                      thisItem.isSucc == '1'
                        ? 'approval_Passed'
                        : 'approval_Passed1'
                    "
                    >{{
                      thisItem.isSucc == "0"
                        ? "失败"
                        : thisItem.isSucc == "1"
                        ? "成功"
                        : thisItem.isSucc == "2"
                        ? "未成功"
                        : ""
                    }}
                  </span>
                </p>
              </div>
            </li>
          </ul>
        <!-- </van-list> -->
      </div>
    </div>
  </div>
</template>
<script>
import ChildNav from "../../../components/Public/ChildNav";
import { Toast, Dialog } from "vant";
import moment from "moment";
import BaiduMap from 'vue-baidu-map'

export default {
  components: {
    ChildNav,
  },
  data() {
    return {
      publicCustomerName: "",
      publicCustomerAddress: "",
      publicCustomerGrid: "",
      industry_list: [],
      industry: "",
      industryShow: false,
      uploader: [],
      pictureId: [],
      businessLicenseNo: "",
      legalPersonName: "",
      legalPersonTelephone: "",
      otherContactsName: "",
      otherContactsTelephone: "",
      publicCustomerLocation: "",
      sourceClues: "",

      potential_need_type: [],
      otherTxt: "",

      radio: "2",
      areaList: [],
      regional_grid: false,
      tabId: 0,

      id: "",
      prospect_detailsEdit: {},

      show: false,

      longitude: "114.654102",
      latitude: "33.623741",
      mapCenter: { lng: "114.654102", lat: "33.623741" },
      mapCenter1: { lng: "114.654102", lat: "33.623741" },
      zoomNum: 19,
      positionMarker: null,
      longitudeLatitude: false,
      map: null,

      zoom: 20,
      MarketingRecord: [],
    };
  },

  created() {
    this.typeCN = this.$route.query.title;
    this.dic_nation();
  },

  methods: {
    getMarkedRecord() {
      // if (this.customerCode && this.gridCode) {
      this.$httpGet({
        url: "/api/appMarket/marketRecord",
        params: {
          // customerCode: this.customerCode,
          // limit: 10,
          // gridCode: this.gridCode,
          // taskId: this.taskId,
          page: 1,
        },
      }).then((res) => {
        this.MarketingRecord = res.data;
      });
      // }
    },
    onIndustryShow(value) {
      this.industry = value;
      this.industryShow = false;
    },
    formatDate(date) {
      return `${date.getMonth() + 1}-${date.getDate()}`;
    },
    mapReady({ BMap, map }) {
      this.map = map;
    },
    markerDragend({ point }) {
      const { lng, lat } = point;
      this.publicCustomerLocation = `${lng},${lat}`;
    },
    markerLongpress(point) {
      Dialog.confirm({
        message: "要标记当前位置吗？",
      })
        .then(() => {
          const { lng, lat } = point;
          // alert(lng + "-" + lat);
          this.mapCenter = point;
          this.mapCenter1 = point;
          this.publicCustomerLocation = `${lng},${lat}`;
        })
        .catch(() => {
          // on cancel
        });
    },
    longpress({ point }) {
      console.log(123);
      const zoom = this.map.getZoom();
      if (Math.abs(zoom - this.zoom) > 0) {
        this.zoom = zoom;
        return;
      }
      this.markerLongpress(point);
      // clearTimeout(this.timeOutEvent);
      // // this.timeOutEvent = 0;
      // this.timeOutEvent = setTimeout(() => {
      //   //执行长按要执行的内容
      //   this.markerLongpress(point);
      //   this.timeOutEvent = 0;
      // }, 600);
    },
    enumData(val, data) {
      // debugger
      if (val && data.length > 0) {
        // console.log(this.prospect_details);
        // console.log(data, val);
        const find = data.find((it) => it.index == val);
        // debugger
        return find ? find.text : "";
      } else {
        return "";
      }
    },
    enumData1(val, data) {
      let find = "";
      if (val && data.length > 0) {
        find = data.find((it) => it.index === val);
        console.log(find);
        return find ? find.text : "";
      } else {
        return "";
      }
    },
    dic_nation() {
      // 所属行业
      this.$httpGet({
        url: "/dic/type/industry_type",
      }).then((res) => {
        // console.log(res.data);
        let transformDara = [];
        res.data.forEach((it, index) => {
          if (it.parentId !== null) {
            transformDara.push({ index: it.code, text: it.codeText });
          }
        });
        console.log(transformDara);
        this.industry_list = transformDara;
      });
      // 潜在客户需求
      this.$httpGet({
        url: "/dic/type/potential_need_type",
      }).then((res) => {
        // console.log(res.data);
        let transformDara = [];
        res.data.forEach((it, index) => {
          if (it.parentId !== null) {
            transformDara.push({ index: it.code, text: it.codeText });
          }
        });
        console.log(transformDara);
        this.potential_need_type = transformDara;
      });
      this.$httpGet({
        url: "/api/semGridding/query",
        params: {
          limit: 10,
          page: 1,
        },
      }).then((res) => {
        let transformDara = [];
        res.data.forEach((it, index) => {
          it.children &&
            it.children.forEach((ele, index1) => {
              transformDara.push({ index: ele.code, text: ele.name });
            });
        });
        this.areaList = transformDara;
        // this.publicCustomerGrid = this.enumData1(
        //   this.publicCustomerGrid,
        //   this.areaList
        // );
      });
    },

    onRegional_grid(value) {
      this.publicCustomerGrid = value;
      this.regional_grid = false;
    },
    handler({ BMap, map }) {
      // console.log(BMap, map);
      this.center.lng = 116.404;
      this.center.lat = 39.915;
      this.zoom = 15;
    },
    tab(ev) {
      this.tabId = ev;
      if (ev == 2) {
        this.getMarkedRecord();
      }
    },

    //选中一个item
    selectItem(thisItem) {
      if (typeof thisItem.checked == "undefined") {
        this.$set(thisItem, "checked", true);
      } else {
        thisItem.checked = !thisItem.checked;
      }
    },

    getLongitudeLatitude() {
      this.longitudeLatitude = !this.longitudeLatitude;
    },
    appMessage() {
      let positionArr = window.android.getLocation().split(",");
      this.mapCenter = { lng: positionArr[0], lat: positionArr[1] };
      this.mapCenter1 = { lng: positionArr[0], lat: positionArr[1] };
      this.prospect_details.location = positionArr.toString();
    },
    appMessage1() {
      var u = navigator.userAgent;
      //Android终端
      var isAndroid = u.indexOf("Android") > -1 || u.indexOf("Adr") > -1;
      //iOS终端
      var isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/);
      if (isAndroid) {
        let positionArr = window.android.getLocation().split(",");
        // let positionArr = [124.281873, 45.514322]
        if (
          positionArr[0] === this.mapCenter1.lng &&
          positionArr[1] === this.mapCenter1.lat
        ) {
          // 如果当前的 中心点和之前的中心点一样
          this.mapCenter1 = {
            lng: positionArr[0],
            lat: positionArr[1] + 0.0001,
          }; //直接将中心点回传不生效，需要稍微改动一下中心点
          this.zoomNum = this.map.getZoom();
          return;
        }
        this.mapCenter1 = { lng: positionArr[0], lat: positionArr[1] };
        this.mapCenter = this.mapCenter1;
        // this.zoomNum = 20;
        this.zoomNum = this.map.getZoom();
        this.createMarker(positionArr);
      }
      if (isiOS) {
        let positionArr = window.prompt("getLocation").split(",");
        // let positionArr = [124.281873, 45.514322]
        if (
          positionArr[0] === this.mapCenter1.lng &&
          positionArr[1] === this.mapCenter1.lat
        ) {
          // 如果当前的 中心点和之前的中心点一样
          this.mapCenter1 = {
            lng: positionArr[0],
            lat: positionArr[1] + 0.0001,
          }; //直接将中心点回传不生效，需要稍微改动一下中心点
          this.zoomNum = this.map.getZoom();
          return;
        }
        this.mapCenter1 = { lng: positionArr[0], lat: positionArr[1] };
        this.mapCenter = this.mapCenter1;
        // this.zoomNum = 20;
        this.zoomNum = this.map.getZoom();
        this.createMarker(positionArr);
      }
    },
    createMarker(position) {
      if (this.positionMarker) {
        this.map.removeOverlay(this.positionMarker);
      }
      this.positionMarker = new BMap.Marker(new BMap.Point(...position)); // 创建标注
      this.map.addOverlay(this.positionMarker); // 将标注添加到地图中
    },
    afterRead(file) {
      let formData = new FormData();
      formData.append("file", file.file);
      this.$httpPost({
        url: "/api/upload/attachment",
        headers: { "Content-Type": "multipart/form-data" },
        data: formData,
      }).then((res) => {
        // console.log(res.data.pid);
        this.pictureId.push(res.data.pid);
      });
    },
    async modifyResult() {
      if (this.publicCustomerName == "") {
        Dialog.alert({
          title: "提示",
          message: "请输入名称！",
        });
        return;
      }
      if (this.publicCustomerAddress == "") {
        Dialog.alert({
          title: "提示",
          message: "请输入地址！",
        });
        return;
      }
      if (this.pictureId == "") {
        Dialog.alert({
          title: "提示",
          message: "请添加客户照片！",
        });
        return;
      }
      if (this.businessLicenseNo == "") {
        Dialog.alert({
          title: "提示",
          message: "请输入营业执照号！",
        });
        return;
      }
      //逆向解析
      // this.publicCustomerAddress = this.publicCustomerAddress && await this.analysIsAddress(this.publicCustomerAddress)
      // console.log(this.publicCustomerAddress);
      this.$httpPost({
        url: "/api/pulicCustomersInfo/add",
        data: {
          name: this.publicCustomerName,
          address: this.publicCustomerAddress,
          gridding: this.publicCustomerGrid.index,
          industryType: this.industry.index,
          location: this.publicCustomerLocation,
          legalName: this.legalPersonName,
          legalPhone: this.legalPersonTelephone,
          customerImg: this.pictureId.join(","),
          businessLicenseNo: this.businessLicenseNo,
          otherContactsName: this.otherContactsName,
          otherContactsPhone: this.otherContactsTelephone,
        },
      })
        .then((res) => {
          Toast({
            message: "保存成功",
            position: "middle",
          });
          // this.$router.go(-1);
        })
        .catch((err) => {
          // console.log(err);
        });
    },
    initMap() {
      const AK = "WjS3NqjeiRpXVIQiWp2WiHhFyEcYz90e";
      const BMap_URL = "https://api.map.baidu.com/api?v=2.0&ak="+ AK +"&s=1&callback=onBMapCallback";
      return new Promise((resolve, reject) => {
        // 如果已加载直接返回
        if(typeof BMap !== "undefined") {
          resolve(BMap);
          return true;
        }
        // 百度地图异步加载回调处理
        window.onBMapCallback = function () {
          console.log("百度地图脚本初始化成功...");
          resolve(BMap);
        };

        // 插入script脚本
        let scriptNode = document.createElement("script");
        scriptNode.setAttribute("type", "text/javascript");
        scriptNode.setAttribute("src", BMap_URL);
        document.body.appendChild(scriptNode);
      });
    },
    async analysIsAddress(address) {
      let BMap = await this.initMap();
      let Geo = new BMap.Geocoder()
      let point;
      Geo.getPoint(address, (res) => {
        console.log(res);
        point = res;
      })
    }
  },
};
</script>
<style scoped>
.income_expenditure .van-cell >>> .van-field__label {
  width: 75%;
}
.household_base .van-cell >>> .van-field__label {
  width: 7em;
}
.household_have .van-cell >>> .van-field__label {
  width: 5em;
}
.FarmersInformation {
  padding-top: 46px;
}
.FarmersInformation .tabList {
  display: flex;
  height: 3rem;
  line-height: 3rem;
  background: #fff;
  border-bottom: 0.001rem solid #e8e8e8;
  justify-content: space-between;
  padding: 0rem 1rem;
}
.van-radio--horizontal >>> .van-radio__icon {
  height: 1.4rem;
}
input {
  border-radius: 0.3rem;
}
.bm-view {
  width: 100%;
  height: 15rem;
}
.bm-view1 {
  width: 100%;
  height: 23rem;
}
.checked::before {
  position: absolute;
  content: "";
  width: 0.8rem;
  height: 0.8rem;
  top: 0.1rem;
  background: rgb(61, 66, 94);
  left: 0.1rem;
  border-radius: 100%;
}
.checked {
  position: relative;
  background: #fff;
  border: 0.1rem solid rgb(61, 66, 94) !important;
  border-radius: 100%;
}
.cur {
  color: #df0f0f;
  position: relative;
}
textarea {
  border: 0.05rem solid #bbb;
  background-color: #fff;
  border-radius: 0.3rem;
  padding: 0.5rem;
}
.save {
  background: #fff;
  display: flex;
  justify-content: center;
  align-items: center;
  padding-top: 0.5rem;
  padding-bottom: 50px;
}
.save button {
  border: 0.05rem solid #bbb;
  background: #fff;
  color: #000;
  width: 6rem;
  height: 2rem;
  border-radius: 0.4rem;
}
.save1 {
  background: #fff;
  text-align: center;
  padding-bottom: 50px;
}
.save1 button {
  border: 0.05rem solid #bbb;
  background: rgb(61, 66, 94);
  border-radius: 0.4rem;
  color: #fff;
  width: 6rem;
  line-height: 2rem;
}

.save {
  text-align: center;
  padding-bottom: 50px;
}
.save button {
  border: 0.05rem solid #bbb;
  background: rgb(61, 66, 94);
  color: #fff;
  width: 6rem;
  height: 2rem;
  border-radius: 0.3rem;
}
.img4 {
  position: absolute;
  right: 5%;
  top: 0.1rem;
  background: url("../../../assets/home/md-phone.svg") no-repeat;
  background-size: cover;
  width: 1rem;
  height: 1rem;
}
.img1 {
  position: absolute;
  right: -1.5rem;
  bottom: 0rem;
  background: url("../../../assets/home/md-phone.svg") no-repeat;
  background-size: cover;
  width: 1rem;
  height: 1rem;
}
@media screen and (min-width: 320px) and (max-width: 374px) {
  li,
  select,
  input,
  p,
  div,
  span {
    font-size: 0.8rem;
  }
  /*placeholder样式-开始*/
  input::-webkit-input-placeholder {
    font-size: 0.8rem !important;
  }
  input::-moz-placeholder {
    /* Mozilla Firefox 19+ */
    font-size: 0.8rem !important;
  }
  input:-moz-placeholder {
    /* Mozilla Firefox 4 to 18 */
    font-size: 0.8rem !important;
  }
  input:-ms-input-placeholder {
    /* Internet Explorer 10-11 */
    font-size: 0.8rem !important;
  }
  .cur {
    font-size: 0.8rem;
  }
  .end_line {
    font-size: 0.7rem;
  }
  .save1 button {
    font-size: 0.8rem;
    line-height: 1.8rem;
    height: 1.8rem;
    width: 5rem;
  }
}
</style>
