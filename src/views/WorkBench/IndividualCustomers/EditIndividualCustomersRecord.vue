<template>
  <div class="FarmersInformation">
    <div class="public_nav">
      <van-nav-bar left-arrow @click-left="onClickLeft" :title="typeCN">
        <template #right>
          <router-link
            v-if="sourceClues == 1"
            class="share"
            :to="{
              name: 'CorporateClientsShare',
              query: { title: '线索分享', code: customerCode },
            }"
          >
            分享
          </router-link>
        </template>
      </van-nav-bar>
    </div>
    <div v-if="typeCN == '个人客户详情'">
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
        <li @click="tab(3)" :class="tabId == 3 ? 'cur' : 'ordinary'">资产</li>
      </ul>
      <div v-show="tabId === 0" class="household_base">
        <van-field
          v-model="publicCustomerName"
          name="名称："
          label="名称："
          placeholder="请输入名称"
          required
          type="textarea"
          autosize
        />
        <van-field
          v-model="publicCustomerTelephone"
          name="手机号："
          label="手机号："
          placeholder="请输入手机号"
        >
          <!-- <template #button>
            <a class="img4" :href="'tel:' + farmers_details.telphone"></a>
          </template> -->
        </van-field>
        <van-field
          v-model="publicCustomerId"
          name="身份证："
          label="身份证："
          placeholder="请输入身份证"
        />

        <van-field
          readonly
          clickable
          name="area"
          :value="publicCustomerGrid"
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
          v-model="publicCustomerWorkUnit"
          name="工作单位："
          label="工作单位："
          placeholder="请输入工作单位"
          type="textarea"
          autosize
        />
        <van-field
          v-model="publicCustomerAddress"
          name="联系地址："
          label="联系地址："
          placeholder="请输入联系地址"
          type="textarea"
          autosize
        />
        <van-field
          readonly
          clickable
          name="picker"
          :value="industry"
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
        <!-- <van-field name="uploader" label="客户照片" required>
          <template #input>
            <van-uploader
              :after-read="afterRead"
              v-model="uploader"
              @delete="deleteImage"
              multiple
            />
          </template>
        </van-field>
        <van-field
          v-model="businessLicenseNo"
          name="营业执照号："
          label="营业执照号："
          placeholder="单行输入"
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
        </van-field> -->
        <van-field
          @click="getLongitudeLatitude"
          v-model="publicCustomerLocation"
          readonly
          name="位置："
          label="位置："
          placeholder="点击选择位置信息"
        >
          <template #button>
            <img
              style="opacity: 0.9; margin-right: 15px"
              class=""
              src="../../../assets/grid/sign.svg"
              alt=""
            />
          </template>
        </van-field>
        <van-field
          v-if="sourceClues == 2"
          v-model="sourceCluesName"
          name="线索来源："
          label="线索来源："
          placeholder=""
          readonly
        />
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
            <van-radio-group v-model="item.radio" direction="horizontal">
              <van-radio name="1" checked-color="rgb(61, 66, 94)"
                >已办</van-radio
              >
              <van-radio name="2" checked-color="rgb(61, 66, 94)"
                >未办</van-radio
              >
              <van-radio name="3" checked-color="rgb(61, 66, 94)"
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
          <van-button round block type="primary" @click="saveCustomersDemand()"
            >保存</van-button
          >
        </div>
      </div>
      <div v-show="tabId === 2">
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
                    custName: publicCustomerName,
                    productName: productName,
                    taskUpdateFlag: taskUpdateFlag,
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
                    custName: publicCustomerName,
                    productName: productName,
                    taskUpdateFlag: taskUpdateFlag,
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
        <div
          style="
            margin-left: 85%;
            position: fixed !important;
            float: right;
            z-index: 9999;
            align-items: right;
            bottom: 5%;
            right: 5%;
          "
        >
          <router-link
            tag="span"
            class="add_record"
            :to="{
              name: 'AddMarketingRecord',
              query: {
                title: '添加营销记录',
                customerCode: this.customerCode,
                gridCode: this.gridCode,
                productCode: this.productCode,
                productName: this.productName,
                custName: this.publicCustomerName,
                taskUpdateFlag: this.taskUpdateFlag,
              },
            }"
            >+</router-link
          >
        </div>
      </div>
      <div v-show="tabId === 3">
        <div
          class="stock stock_education"
          v-for="(thisItem, index) in assets"
          :key="index"
        >
          <div style="margin-bottom: 0.5rem">
            <router-link
              tag="p"
              :to="{
                name: 'AssetsLiabilitiesDetail1',
                query: {
                  title: '客户资产负债详情',
                  customerCode: thisItem.customerCode,
                  id: thisItem.id,
                },
              }"
              style="color: #000; font-weight: 550"
            >
              {{ thisItem.name }}
              <van-tag
                class="approval_Passed"
                v-if="thisItem.type === 1"
                plain
                color="#7232dd"
                size="medium"
                >资产
              </van-tag>
              <van-tag
                class="approval_Passed1"
                v-if="thisItem.type === 2"
                plain
                color="#7232dd"
                size="medium"
                >负债
              </van-tag>
            </router-link>
            <p v-if="thisItem.checkTime">
              清查日期：{{ thisItem.checkTime | transform }}
            </p>
          </div>
          <p>评估价值（万元）：{{ thisItem.amount | NumFormat }}</p>
          <p class="delete" @click="deleteFamilyAssets(thisItem.id)">
            <van-button type="primary" color="rgb(61, 66, 94)" size="mini"
              >删除</van-button
            >
          </p>
        </div>
        <div
          style="
            margin-left: 85%;
            position: fixed !important;
            float: right;
            z-index: 9999;
            align-items: right;
            bottom: 5%;
            right: 5%;
          "
        >
          <router-link
            tag="span"
            :to="{
              name: 'AssetsLiabilitiesAddIn',
              query: {
                title: '客户资产负债添加',
                customerCode: this.customerCode,
              },
            }"
            class="add_record"
            >+</router-link
          >
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { Toast, Dialog } from "vant";
import moment from "moment";
export default {
  data() {
    return {
      publicCustomerName: "",
      publicCustomerTelephone: "",
      publicCustomerId: "",
      publicCustomerWorkUnit: "",
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
      sourceCluesName: "",

      potential_need_type: [],
      otherTxt: "",

      // radio: "2",
      areaList: [],
      regional_grid: false,
      tabId: 0,

      id: "",
      prospect_detailsEdit: {},

      show: false,

      longitude: "114.654102",
      latitude: "33.623741",
      mapCenter: {},
      mapCenter1: {},
      zoomNum: 19,
      positionMarker: null,
      longitudeLatitude: false,
      map: null,
      zoom: 20,
      id: "",
      detailAddress: "",
      demandLoan: "",
      MarketingRecord: [],
      customersDemandList1: [],
      customerCode: "",
      gridCode: "",
      productCode: "",
      productName: "",
      custName: "",
      taskUpdateFlag: "",
      // 资产
      assets: [],
    };
  },
  beforeRouteEnter(to, from, next) {
    next((vm) => {
      if (
        from.path === "/EditMarketingRecord" ||
        from.path === "/AddMarketingRecord" ||
        from.path === "/IndividualAddMarketingRecord"
      ) {
        vm.tab(2);
      }
      if (
        from.path === "/AssetsLiabilitiesAddIn" ||
        from.path === "/AssetsLiabilitiesDetail1"
      ) {
        vm.tab(3);
      }
    });
  },
  async created() {
    this.typeCN = this.$route.query.title;
    this.id = this.$route.query.id;
    this.taskUpdateFlag = this.$route.query.taskUpdateFlag;

    await this.editRecord();
    await this.dic_nation();
    await this.getIndusty();
  },

  methods: {
    currentPositioning() {
      var u = navigator.userAgent;
      //Android终端
      var isAndroid = u.indexOf("Android") > -1 || u.indexOf("Adr") > -1;
      //iOS终端
      var isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/);
      if (isAndroid) {
        let positionArr = window.android.getLocation().split(",");
        let currentPositioning = { lng: positionArr[0], lat: positionArr[1] };
        return currentPositioning;
      }
      if (isiOS) {
        let positionArr = window.prompt("getLocation").split(",");
        let currentPositioning = { lng: positionArr[0], lat: positionArr[1] };
        return currentPositioning;
      }
    },
    onClickLeft() {
      this.$router.go(-1);
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
      this.$httpGet({
        url: "/api/customersMapLocus/getAddress",
        params: {
          location: this.publicCustomerLocation,
        },
      }).then((res) => {
        this.publicCustomerAddress = res.data;
      });
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
          this.$httpGet({
            url: "/api/customersMapLocus/getAddress",
            params: {
              location: this.publicCustomerLocation,
            },
          }).then((res) => {
            this.publicCustomerAddress = res.data;
          });
        })
        .catch(() => {
          // on cancel
        });
    },
    longpress({ point }) {
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
      if (val && data.length > 0) {
        const find = data.find((it) => it.index == val);
        return find ? find.text : "";
      } else {
        return "";
      }
    },
    getIndusty() {
      // 所属行业
      this.$httpGet({
        url: "/dic/type/industry_type",
      }).then((res) => {
        let transformDara = [];
        res.data.forEach((it, index) => {
          if (it.parentId !== null) {
            transformDara.push({ index: it.code, text: it.codeText });
          }
        });
        this.industry_list = transformDara;
        this.industry = this.enumData(this.industry, this.industry_list);
      });
    },
    enumData1(val, data) {
      let find = "";
      if (val && data.length > 0) {
        find = data.find((it) => it.index === val);
        return find ? find.text : "";
      } else {
        return "";
      }
    },
    dic_nation() {
      // 所属网格
      this.$httpGet({
        url: "/api/semGridding/query",
        params: {
          limit: 100,
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
        this.publicCustomerGrid = this.enumData1(
          this.publicCustomerGrid,
          this.areaList
        );
      });
      // 获取详细地址
      var u = navigator.userAgent;
      //Android终端
      var isAndroid = u.indexOf("Android") > -1 || u.indexOf("Adr") > -1;
      //iOS终端
      // var isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/);
      // if (isAndroid) {
      //   if (window.android.getDetailAddress() != false) {
      //     this.detailAddress = window.android.getDetailAddress();
      //     return;
      //   }
      // }
      // if (isiOS) {
      //   if (window.prompt("getDetailAddress") != false) {
      //     this.detailAddress = window.prompt("getDetailAddress");
      //     return;
      //   }
      // }
    },
    deleteImage({ url }) {
      const index = this.uploader.findIndex((it) => it.url === url);
      this.pictureId.splice(index, 1);
    },
    async editRecord(val) {
      // 潜在客户需求
      this.$httpGet({
        url: "/dic/type/task_product_type",
      }).then((res) => {
        let transformDara = [];
        res.data.forEach((it, index) => {
          if (it.parentId !== null) {
            transformDara.push({
              index: it.code,
              text: it.codeText,
              radio: "",
            });
            this.potential_need_type = transformDara;
          }
        });
      });

      const res = await this.$httpGet({
        url: `/api/publicCustomerPool/get/${this.id}`,
        data: {
          id: this.id,
        },
      });
      this.customerCode = res.data.code;
      localStorage.setItem("customerCode", this.customerCode);
      this.publicCustomerName = res.data.name;
      res.data.address != false
        ? (this.publicCustomerAddress = res.data.address)
        : (this.publicCustomerAddress = this.detailAddress);
      this.publicCustomerGrid = res.data.gridding;
      this.industry = res.data.industryType;
      this.publicCustomerLocation = res.data.location;
      this.sourceClues = res.data.source;
      this.sourceCluesName = res.data.shareName;
      res.data.location
        ? (this.mapCenter = {
            lng: res.data.location.split(",")[0],
            lat: res.data.location.split(",")[1],
          })
        : (this.mapCenter = this.currentPositioning());
      res.data.location
        ? (this.mapCenter1 = { ...this.mapCenter })
        : (this.mapCenter1 = this.currentPositioning());
      this.legalPersonName = res.data.legalName;
      this.legalPersonTelephone = res.data.legalPhone;
      this.pictureId = res.data.customerImg
        ? res.data.customerImg.split(",")
        : [];
      this.publicCustomerTelephone = res.data.telphone;
      this.publicCustomerId = res.data.identifyNo;
      this.publicCustomerWorkUnit = res.data.workUnit;
      if (res.data.customersDemandList.length > 0) {
        res.data.customersDemandList.forEach((item) => {
          for (
            let index = 0;
            index < this.potential_need_type.length;
            index++
          ) {
            const i = this.potential_need_type.findIndex(
              (it) => it.index == item.demandType
            );
            i >= 0 &&
              (this.potential_need_type[
                i
              ].radio = item.demandStatus.toString());
            i < 0 && (this.otherTxt = item.description);
          }
        });
      }
      if (this.pictureId) {
        this.pictureId.forEach((el) => {
          this.$httpGet({
            url: "/api/show/image/base64",
            params: {
              id: el,
            },
          }).then((res) => {
            this.uploader.push({
              url: "data:image/jpg;base64," + res.data,
              isImage: true,
            });
          });
        });
      }
      this.customersDemandList = res.data.customersDemandList;
    },
    onRegional_grid(value) {
      if (value) {
        this.publicCustomerGrid = value["text"];
        this.prospect_detailsEdit.publicCustomerGrid = value["index"];
        this.regional_grid = false;
      }
    },
    onIndustryShow(value) {
      this.industry = value["text"];
      this.prospect_detailsEdit.industry = value["index"];
      this.industryShow = false;
    },
    handler({ BMap, map }) {
      this.center.lng = 116.404;
      this.center.lat = 39.915;
      this.zoom = 15;
    },
    tab(ev) {
      this.tabId = ev;
      if (ev == 2) {
        this.getMarkedRecord();
      }
      if (ev == 3) {
        this.getFamilyAssets();
      }
    },
    getFamilyAssets() {
      const customerCodeBack = localStorage.getItem("customerCode");
      this.$httpGet({
        url: "/api/customersAssetsInfo/query",
        params: {
          customerCode: this.id || customerCodeBack,
          limit: 10,
          page: 1,
        },
      }).then((res) => {
        this.assets = res.data;
      });
    },
    deleteFamilyAssets(id) {
      Dialog.confirm({
        title: "你确定删除这条记录吗？",
      })
        .then(() => {
          this.$httpDelete({
            url: "/api/customersAssetsInfo/delete",
            params: {
              ids: id,
            },
          })
            .then((res) => {
              this.getFamilyAssets();
            })
            .catch(() => {});
        })
        .catch(() => {});
    },
    getMarkedRecord() {
      const customerCodeBack = localStorage.getItem("customerCode");
      this.$httpGet({
        url: "/api/publicCustomersInfo/marketRecord",
        params: {
          customerCode: this.id || customerCodeBack,
          limit: 10,
          page: 1,
        },
      }).then((res) => {
        this.MarketingRecord = res.data;
      });
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
        this.publicCustomerLocation = `${positionArr[0]},${positionArr[1]}`;
        // this.zoomNum = 20;
        this.zoomNum = this.map.getZoom();
        this.createMarker(positionArr);
        this.$httpGet({
          url: "/api/customersMapLocus/getAddress",
          params: {
            location: this.publicCustomerLocation,
          },
        }).then((res) => {
          this.publicCustomerAddress = res.data;
        });
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
        this.publicCustomerLocation = `${positionArr[0]},${positionArr[1]}`;
        // this.zoomNum = 20;
        this.zoomNum = this.map.getZoom();
        this.createMarker(positionArr);
        this.$httpGet({
          url: "/api/customersMapLocus/getAddress",
          params: {
            location: this.publicCustomerLocation,
          },
        }).then((res) => {
          this.publicCustomerAddress = res.data;
        });
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
      // if (file.size / 1024 > 1025) {
      //文件大于1M（根据需求更改），进行压缩上传
      this.compressImg(file.file, (base64Codes) => {
        let bl = this.base64UrlToBlob(base64Codes, file.file.name);
        formData.append("file", bl); // 文件对象
        this.$httpPost({
          url: "/api/upload/attachment",
          headers: { "Content-Type": "multipart/form-data" },
          data: formData,
        }).then((res) => {
          this.pictureId.push(res.data.pid);
        });
      });
    },
    async saveCustomersDemand() {
      let arr = [];
      this.potential_need_type.forEach((item) => {
        arr.push({
          demandStatus: item.radio,
          demandType: item.index,
        });
      });
      if (this.otherTxt) {
        arr.push({
          description: this.otherTxt,
          demandType: -1,
        });
      }
      const res = await this.$httpPost({
        url: "/api/customersDemand/save",
        data: {
          code: this.customerCode,
          customersDemandList: arr,
        },
      })
        .then((res) => {
          Toast({
            message: "保存成功",
            position: "middle",
          });
          // this.$router.go(-1);
        })
        .catch((err) => {});
    },
    modifyResult() {
      if (this.publicCustomerName == "") {
        Dialog.alert({
          title: "提示",
          message: "请输入名称！",
        });
        return;
      }
      this.$httpPut({
        url: "/api/publicCustomersInfo/update",
        data: {
          code: this.id,
          name: this.publicCustomerName,
          address: this.publicCustomerAddress,
          gridding: this.prospect_detailsEdit.publicCustomerGrid,
          industryType: this.prospect_detailsEdit.industry,
          location: this.publicCustomerLocation,
          legalName: this.legalPersonName,
          legalPhone: this.legalPersonTelephone,
          customerImg: this.pictureId.join(","),
          telphone: this.publicCustomerTelephone,
          identifyNo: this.publicCustomerId,
          workUnit: this.publicCustomerWorkUnit,
        },
      })
        .then((res) => {
          Toast({
            message: "保存成功",
            position: "middle",
          });
        })
        .catch((err) => {});
    },
    deleteRemark(val) {
      Dialog.confirm({
        title: "你确定删除吗？",
      })
        .then(() => {
          this.$httpDelete({
            url: "/api/semCustRecords/delete",
            params: {
              ids: val,
            },
          })
            .then((res) => {
              Toast({
                message: "删除成功",
                position: "middle",
              });
              this.getMarkedRecord();
            })
            .catch(() => {});
        })
        .catch(() => {});
    },
  },
  filters: {
    dic_client_will(val) {
      const findWill = JSON.parse(localStorage.getItem("dicClientWill")).find(
        (it) => +it.key == val
      );
      return findWill ? findWill.value : "";
    },
  },
};
</script>
<style scoped>
.public_nav {
  position: fixed;
  width: 100%;
  top: 0;
  left: 0;
  z-index: 1000000;
}
.van-icon {
  font-size: 20px;
}
.van-nav-bar {
  background-color: rgb(61, 66, 94);
}
.van-nav-bar >>> .van-nav-bar__title {
  color: #ffffff !important;
  font-size: 16px;
  font-weight: 600;
}
.van-nav-bar__right img {
  width: 20px;
}
.share {
  color: #fff;
  font-weight: 600;
}
.van-nav-bar >>> .van-icon {
  color: #fff;
}
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
  height: 24px !important;
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
/* 下面都是营销记录 */
.marked_record {
  display: flex;
  flex-wrap: wrap;
  padding: 0.5rem;
  border-bottom: 0.001rem solid #e8e8e8;
}
.marked_record p {
  margin: 3px 0px;
}
.positionFixd {
  display: flex;
  width: 100%;
  justify-content: space-between;
  align-items: center;
}
.approval .approval_Passed {
  display: inline-block;
  line-height: 1.6rem;
  text-align: center;
  width: 6.5rem;
  height: 1.6rem;
  font-size: 0.7rem;
  border: 1px solid #3cc8ab;
  color: #3cc8ab;
  margin-left: 0.5rem;
}
.approval .approval_Passed1 {
  display: inline-block;
  line-height: 1.6rem;
  text-align: center;
  width: 6.5rem;
  height: 1.6rem;
  font-size: 0.7rem;
  border: 1px solid #c1b9b9;
  color: #c1b9b9;
  margin-left: 0.5rem;
}
.add_record {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 4rem;
  height: 4rem;
  font-size: 0.8rem;
  border-radius: 100%;
  background-color: #3d425e;
  color: #fff;
}
/* 资产———————————— */
.stock {
  padding: 0rem;
  background: #fff;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
}
.stock p {
  margin: 0.5rem 0rem 0rem;
}
.stock:last-child {
  padding-bottom: 0.5rem;
}
.stock_have p {
  width: 33.3%;
}

.stock li {
  width: 60%;
  /* text-align: right; */
  margin: 0.5rem 0rem;
}
.stock li:nth-child(odd) {
  width: 38%;
}
.stock li input,
.stock li select {
  border: 0.05rem solid #bbb;
  background-color: #fff;
  height: 2rem;
  border-radius: 0.3rem;
  padding-left: 0.5rem;
  width: 100%;
}
.stock_education {
  position: relative;
  padding: 0.5rem;
  border-bottom: 0.001rem solid #e8e8e8;
}
.stock_education div {
  width: 100%;
  display: flex;
  justify-content: space-between;
}
.stock_education .delete {
  color: #1432e3;
  cursor: pointer;
}
@media screen and (max-width: 359px) {
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
  .approval .approval_Passed {
    height: 1.5rem;
    line-height: 1.5rem;
  }
  .approval .approval_Passed1 {
    height: 1.5rem;
    line-height: 1.5rem;
  }
  .add_record {
    width: 3.5rem;
    height: 3.5rem;
  }
}
</style>
