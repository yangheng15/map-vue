<template>
  <div class="EditPotentialCustomers">
    <child-nav :title="typeCN"></child-nav>
    <div v-if="typeCN == '潜在客户详情'">
      <van-field
        v-model="prospect_details_name"
        name="客户名称："
        label="客户名称："
        placeholder="请输入客户名称"
        required
      />
      <van-field
        v-model="prospect_details_telphone"
        name="手机号："
        label="手机号："
        placeholder="请输入手机号"
        required
      >
        <template #button>
          <a class="img4" :href="'tel:' + prospect_details.telphone"></a>
        </template>
      </van-field>
      <van-field
        v-model="prospect_details.identifyNo"
        name="证件号码："
        label="证件号码："
        placeholder="请输入证件号码"
      />
      <van-field
        v-model="prospect_details.wechat"
        name="微信："
        label="微信："
        placeholder="请输入微信"
      />
      <van-field
        readonly
        clickable
        name="picker"
        :value="prospect_details.nation"
        label="民族："
        placeholder="点击选择民族"
        @click="nation = true"
      />
      <van-popup v-model="nation" position="bottom">
        <van-picker
          show-toolbar
          :columns="nation_list"
          @confirm="onNation"
          @cancel="nation = false"
        />
      </van-popup>
      <van-field
        readonly
        clickable
        name="picker"
        :value="prospect_details.marriage"
        label="婚姻状况："
        placeholder="点击选择婚姻状况"
        @click="marital_status = true"
      />
      <van-popup v-model="marital_status" position="bottom">
        <van-picker
          show-toolbar
          :columns="marital_status_list"
          @confirm="onMarital_status"
          @cancel="marital_status = false"
        />
      </van-popup>

      <van-field
        readonly
        clickable
        name="area"
        :value="prospect_details.gridding"
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
        v-model="prospect_details.workUnit"
        name="工作单位："
        label="工作单位："
        placeholder="请输入工作单位"
      />
      <van-field
        v-model="prospect_details.connectAddress"
        name="联系地址："
        label="联系地址："
        placeholder="请输入"
      />
      <van-field
        v-model="prospect_details.annualIncome"
        name="年收入："
        label="年收入："
        placeholder="请输入年收入"
      />
      <van-field
        v-model="prospect_details.qq"
        name="QQ："
        label="QQ："
        placeholder="请输入QQ"
      />
      <van-field
        readonly
        clickable
        name="picker"
        :value="prospect_details.education"
        label="学历："
        placeholder="点击选择学历"
        @click="education_level = true"
      />
      <van-popup v-model="education_level" position="bottom">
        <van-picker
          show-toolbar
          :columns="education_level_list"
          @confirm="onEducation_level"
          @cancel="education_level = false"
        />
      </van-popup>
      <van-field
        readonly
        clickable
        name="picker"
        :value="prospect_details.nationality == '1' ? '中国' : ''"
        label="国籍："
        placeholder="点击选择国籍"
        @click="country = true"
      />
      <van-popup v-model="country" position="bottom">
        <van-picker
          show-toolbar
          :columns="country_list"
          @confirm="onCountry"
          @cancel="country = false"
        />
      </van-popup>

      <van-field
        v-model="prospect_details.address"
        name="居住地址："
        label="居住地址："
        placeholder="请输入居住地址"
      />
      <van-field
        v-model="prospect_details.workAddress"
        name="工作地址："
        label="工作地址："
        placeholder="请输入工作地址"
      />
      <van-field
        readonly
        clickable
        name="picker"
        :value="prospect_details.health == 0 ? '良好' : ''"
        label="健康状况："
        placeholder="点击选择健康状况"
        @click="health = true"
      />
      <van-popup v-model="health" position="bottom">
        <van-picker
          show-toolbar
          :columns="health_list"
          @confirm="onHealth"
          @cancel="health = false"
        />
      </van-popup>
      <van-field
        v-model="prospect_details.plateNumber"
        name="车牌号："
        label="车牌号："
        placeholder="请输入车牌号"
      />
      <van-field
        v-model="prospect_details.location"
        readonly
        name="经纬度："
        label="经纬度："
        placeholder="点击按钮标记经纬度"
      >
        <template #button>
          <img
            @click="getLongitudeLatitude"
            style="opacity: 0.9; margin-right: 15px"
            class=""
            src="../../../assets/grid/sign.svg"
            alt=""
          /> </template
      ></van-field>
      <div
        style="width: 99%; margin: 0.5rem auto; position: relative"
        v-if="longitudeLatitude"
      >
        <baidu-map
          class="bm-view"
          :center="mapCenter"
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
  </div>
</template>
<script>
import ChildNav from "../../../components/Public/ChildNav";
import { Toast, Dialog } from "vant";
export default {
  name: "EditPotentialCustomers",
  components: {
    ChildNav,
  },
  data() {
    return {
      title: "",
      typeCN: "",
      phone_number: "",
      weChat: "",
      nation_txt: "",
      nation_list: [],
      nation: false,
      marital_status_txt: "",
      marital_status_list: [],
      marital_status: false,
      work_unit: "",
      contact_address: "",
      annual_income: "",
      qq_number: "",
      country_txt: "",
      country_list: [{ index: 1, text: "中国" }],
      country: false,
      residential_address: "",
      user_positioning: "",
      work_address: "",
      health_txt: "",
      health_list: [{ index: 0, text: "良好" }],
      health: false,
      car_number: "",

      region_choice: false,
      active: false,
      screen_name: "",
      screen_number: "",
      customer_base: "",
      key_customers_txt: "",
      key_customers_list: ["是", "否"],
      key_customers: false,
      custome_level_txt: "",
      custome_level_list: ["铂金", "钻石"],
      Custome_level: false,
      recommended_products: "",
      education_level_txt: "",
      education_level_list: [],
      education_level: false,
      choose_gender_txt: "",
      choose_gender_list: ["男", "女"],
      choose_gender: false,
      occupation_category_txt: "",
      occupation_category_list: ["请选择"],
      occupation_category: false,
      products_held_txt: "",
      products_held_list: ["请选择"],
      products_held: false,
      organization_txt: "",
      organization_list: ["请选择"],
      organization: false,
      regional_grid_txt: "",
      areaList: [],
      regional_grid: false,
      screen_age: "",
      token: "",
      tabId: 0,
      title: "详情",
      textTitle: "--",
      content: "",
      deliverTime: "",
      deliverDepartment: "",
      deliverPerson: "",
      articleId: "",
      isPlaying: false,
      dataURL: "",
      value: "",
      showPicker: false,
      customer_name: "",
      card_number: "",
      id: "",
      prospect_details: {},
      prospect_detailsEdit: {},
      prospect_details_name: "",
      prospect_details_telphone: "",
      longitude: "114.654102",
      latitude: "33.623741",
      mapCenter: { lng: "114.654102", lat: "33.623741" },
      mapCenter1: { lng: "114.654102", lat: "33.623741" },
      zoomNum: 19,
      positionMarker: null,
      longitudeLatitude: false,
      map: null,
      timeOutEvent: 0,
      zoom: 20,
    };
  },
  async created() {
    this.typeCN = this.$route.query.title;
    this.id = this.$route.query.id;
    await this.editRecord();
    this.dic_nation();
    if (this.prospect_details.location == "") {
      this.appMessage();
    }
  },
  updated() {},
  methods: {
    mapReady({ BMap, map }) {
      this.map = map;
    },
    markerDragend({ point }) {
      const { lng, lat } = point;
      this.prospect_details.location = `${lng},${lat}`;
    },
    markerLongpress(point) {
      Dialog.confirm({
        message: "要标记当前位置吗？",
      })
        .then(() => {
          const { lng, lat } = point;
          // alert(lng + "-" + lat);
          this.mapCenter = point;
          // this.mapCenter1 = point;
          this.prospect_details.location = `${lng},${lat}`;
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
    // touchend() {
    //   clearTimeout(this.timeOutEvent);
    //   this.timeOutEvent = 0;
    // },
    enumData(val, data) {
      if (val && data.length > 0) {
        const find = data.find((it) => it.index === +val);
        return find ? find.text : "";
      } else {
        return "";
      }
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
      // 民族
      this.$httpGet({
        url: "/dic/type/dic_nation",
      }).then((res) => {
        let transformDara = [];
        res.data.forEach((it, index) => {
          if (it.parentId !== null) {
            transformDara.push({ index: it.id, text: it.codeText });
          }
        });
        this.nation_list = transformDara;
        this.prospect_details.nation = this.enumData(
          this.prospect_details.nation,
          this.nation_list
        );
      });
      // 婚姻状况
      this.$httpGet({
        url: "/dic/type/dic_marital_status",
      }).then((res) => {
        // const transformDara = res.data.map((it, index) =>
        //   it.parentId === null ? "" : { index, text: it.codeText }
        // );
        // this.marital_status_list = transformDara;
        let transformDara = [];
        res.data.forEach((it, index) => {
          if (it.parentId !== null) {
            transformDara.push({ index: it.id, text: it.codeText });
          }
        });
        this.marital_status_list = transformDara;
        this.prospect_details.marriage = this.enumData(
          this.prospect_details.marriage,
          this.marital_status_list
        );
      });
      // 最高学历
      this.$httpGet({
        url: "/dic/type/dic_education",
      }).then((res) => {
        // const transformDara = res.data.map((it, index) =>
        //   it.parentId === null ? "" : { index, text: it.codeText }
        // );
        // this.education_level_list = transformDara;
        let transformDara = [];
        res.data.forEach((it, index) => {
          if (it.parentId !== null) {
            transformDara.push({ index: it.id, text: it.codeText });
          }
        });
        this.education_level_list = transformDara;
        this.prospect_details.education = this.enumData(
          this.prospect_details.education,
          this.education_level_list
        );
      });
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
        this.prospect_details.gridding = this.enumData1(
          this.prospect_details.gridding,
          this.areaList
        );
        // this.areaList = res.data.length > 0 &&  this.transformData(res.data);
        // //回显数据
        // const arrIndex = this.prospect_details.gridding.split(',');
        // this.prospect_details.gridding = `${this.areaList[arrIndex[0]].text}/${this.areaList[arrIndex[0]]['children'][arrIndex[1]].text}`
      });
    },
    // transformData(data, newArr = []) { //递归查询
    //   for (let i = 0; i < data.length; i++) {
    //     newArr.push({text: data[i]['name'], id: data[i]['id']})
    //     if(data[i]['children'] && data[i]['children'].length > 0) {
    //       this.transformData(data[i]['children'], newArr[i]['children'] = []);
    //     }else {
    //       newArr[i]['children'] = ''
    //     }
    //   }
    //   return newArr;
    // },
    onNation(value) {
      // debugger;
      this.prospect_detailsEdit.nation = value.index;
      this.prospect_details.nation = value.text;
      this.nation = false;
    },
    onMarital_status(value) {
      this.prospect_detailsEdit.marriage = value.index;
      this.prospect_details.marriage = value.text;
      this.marital_status = false;
    },
    onCountry(value) {
      this.prospect_details.nationality = value.index;
      this.country = false;
    },
    onHealth(value) {
      this.prospect_details.health = value.index;
      this.health = false;
    },
    onEducation_level(value) {
      this.prospect_detailsEdit.education = value.index;
      this.prospect_details.education = value.text;
      this.education_level = false;
    },
    onRegional_grid(value) {
      if (value) {
        this.prospect_detailsEdit.gridding = value.index;
        this.prospect_details.gridding = value.text;
        // this.regional_grid_txt.text = values.join('/');
        // this.regional_grid_txt.index = `${this.areaList[index[0]].id},${this.areaList[[index[1]]].id}`;
        this.regional_grid = false;
      }
    },
    async editRecord(val) {
      const res = await this.$httpGet({
        url: `/api/customersPotential/get/${this.id}`,
        data: {
          id: this.id,
        },
      });
      this.prospect_details = res.data;
      this.prospect_details_name = res.data.name;
      this.prospect_details_telphone = res.data.telphone;
      if (this.prospect_details.location) {
        const positionArr = this.prospect_details.location.split(",");
        this.mapCenter = { lng: positionArr[0], lat: positionArr[1] };
        // this.mapCenter1 = { lng: positionArr[0], lat: positionArr[1] };
      } else {
        this.appMessage();
      }
    },
    getLongitudeLatitude() {
      this.longitudeLatitude = !this.longitudeLatitude;
    },
    appMessage() {
      let positionArr = window.android.getLocation().split(",");
      this.mapCenter = { lng: positionArr[0], lat: positionArr[1] };
      // this.mapCenter1 = { lng: positionArr[0], lat: positionArr[1] };
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
          positionArr[0] === this.mapCenter.lng &&
          positionArr[1] === this.mapCenter.lat
        ) {
          // 如果当前的 中心点和之前的中心点一样
          this.mapCenter = {
            lng: positionArr[0],
            lat: positionArr[1] + 0.0001,
          }; //直接将中心点回传不生效，需要稍微改动一下中心点
          this.zoomNum = this.map.getZoom();
          return;
        }
        this.mapCenter = { lng: positionArr[0], lat: positionArr[1] };
        this.zoomNum = this.map.getZoom();
        this.createMarker(positionArr);
      }
      if (isiOS) {
        let positionArr = window.prompt("getLocation").split(",");
        // let positionArr = [124.281873, 45.514322]
        if (
          positionArr[0] === this.mapCenter.lng &&
          positionArr[1] === this.mapCenter.lat
        ) {
          // 如果当前的 中心点和之前的中心点一样
          this.mapCenter = {
            lng: positionArr[0],
            lat: positionArr[1] + 0.0001,
          }; //直接将中心点回传不生效，需要稍微改动一下中心点
          this.zoomNum = this.map.getZoom();
          return;
        }
        this.mapCenter = { lng: positionArr[0], lat: positionArr[1] };
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
    modifyResult() {
      if (this.prospect_details_name == "") {
        Dialog.alert({
          title: "提示",
          message: "请输入客户名称！",
        });
        return;
      }
      if (this.prospect_details_telphone == "") {
        Dialog.alert({
          title: "提示",
          message: "请输入手机号！",
        });
        return;
      }
      this.$httpPut({
        url: "/api/customersPotential/update",
        data: {
          id: this.id,
          name: this.prospect_details_name,
          telphone: this.prospect_details_telphone,
          identifyNo: this.prospect_details.identifyNo,
          wechat: this.prospect_details.wechat,
          nation: this.prospect_detailsEdit.nation,
          marriage: this.prospect_detailsEdit.marriage,
          gridding: this.prospect_detailsEdit.gridding,
          workUnit: this.prospect_details.workUnit,
          connectAddress: this.prospect_details.connectAddress,
          annualIncome: this.prospect_details.annualIncome,
          qq: this.prospect_details.qq,
          education: this.prospect_detailsEdit.education,
          nationality: this.prospect_details.nationality,
          health: this.prospect_details.health,
          address: this.prospect_details.address,
          location: this.prospect_details.location,
          workAddress: this.prospect_details.workAddress,
          plateNumber: this.prospect_details.plateNumber,
        },
      })
        .then((res) => {
          Toast({
            message: "修改成功",
            position: "middle",
          });
          this.$router.go(-1);
        })
        .catch((err) => {});
    },
  },
};
</script>
<style scoped>
.EditPotentialCustomers {
  padding-top: 46px;
}
.bm-view {
  width: calc(100% - 1rem);
  margin: auto;
  border: 0.05rem solid #bbb;
  height: 40vh;
}
.save {
  display: flex;
  justify-content: center;
  padding: 0.5rem 0rem;
}
.save button {
  border: none;
  background: rgb(61, 66, 94);
  width: 5rem;
  height: 2rem;
  border-radius: 0.3rem;
  line-height: 2rem;
  text-align: center;
  color: #fff;
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
@media screen and (max-width: 359px) {
  li,
  select,
  input,
  p,
  div,
  span {
    font-size: 13px;
  }
  /*placeholder样式-开始*/
  input::-webkit-input-placeholder {
    font-size: 13px !important;
  }
  input::-moz-placeholder {
    /* Mozilla Firefox 19+ */
    font-size: 13px !important;
  }
  input:-moz-placeholder {
    /* Mozilla Firefox 4 to 18 */
    font-size: 13px !important;
  }
  input:-ms-input-placeholder {
    /* Internet Explorer 10-11 */
    font-size: 13px !important;
  }
}
</style>
