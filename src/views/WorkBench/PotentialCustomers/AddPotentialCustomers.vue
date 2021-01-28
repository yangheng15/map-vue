<template>
  <div class="AddPotentialCustomers">
    <child-nav :title="typeCN"></child-nav>
    <div v-if="typeCN == '潜在客户添加'">
      <van-field
        v-model="customer_name"
        name="客户名称："
        label="客户名称："
        placeholder="请输入客户名称"
        required
      />
      <van-field
        v-model="phone_number"
        name="手机号："
        label="手机号："
        placeholder="请输入手机号"
        required
      />
      <van-field
        v-model="card_number"
        name="证件号码："
        label="证件号码："
        placeholder="请输入证件号码"
      />
      <van-field
        v-model="weChat"
        name="微信："
        label="微信："
        placeholder="请输入微信"
      />
      <van-field
        readonly
        clickable
        name="picker"
        :value="nation_txt.text"
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
        :value="marital_status_txt.text"
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
        :value="regional_grid_txt.text"
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
        v-model="work_unit"
        name="工作单位："
        label="工作单位："
        placeholder="请输入工作单位"
      />
      <van-field
        v-model="contact_address"
        name="联系地址："
        label="联系地址："
        placeholder="请输入联系地址"
      />
      <van-field
        v-model="annual_income"
        name="年收入："
        label="年收入："
        placeholder="请输入年收入"
      />
      <van-field
        v-model="qq_number"
        name="QQ："
        label="QQ："
        placeholder="请输入QQ"
      />
      <van-field
        readonly
        clickable
        name="picker"
        :value="education_level_txt.text"
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
        :value="country_txt.text"
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
        v-model="residential_address"
        name="居住地址："
        label="居住地址："
        placeholder="请输入居住地址"
      />
      <van-field
        v-model="work_address"
        name="工作地址："
        label="工作地址："
        placeholder="请输入工作地址"
      />
      <van-field
        readonly
        clickable
        name="picker"
        :value="health_txt.text"
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
        v-model="car_number"
        name="车牌号："
        label="车牌号："
        placeholder="请输入车牌号"
      />
      <van-field
        v-model="user_positioning"
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
          @ready="mapReady"
          @longpress="longpress"
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
            <p class="local-marker" @click="getLocation">
              <img src="../../../assets/grid/current_location.svg" alt />
            </p>
          </template>
        </baidu-map>
      </div>
      <div class="save">
        <van-button round block type="primary" @click="addResult()"
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
  name: "AddPotentialCustomers",
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
      value: "",
      customer_name: "",
      card_number: "",
      prospect_details: {},
      longitudeLatitude: false,
      map: null,
      positionMarker: null,
      mapCenter: { lng: "114.654102", lat: "33.623741" },
      moveStatus: false,
      zoomNum: 19,
      zoom: 20,
    };
  },
  created() {
    this.typeCN = this.$route.query.title;
    this.dic_nation();
  },
  methods: {
    mapReady({ BMap, map }) {
      this.map = map;
    },
    touchmove() {
      this.moveStatus = true;
    },
    longpress({ type, target, point, pixel }) {
      // alert(this.map.getZoom() + '-' + this.zoom);
      // if(this.moveStatus) {
      //     this.moveStatus = false;
      //     return
      // };
      // alert('123')
      const zoom = this.map.getZoom();
      if (Math.abs(zoom - this.zoom) > 0) {
        this.zoom = zoom;
        return;
      }
      this.markerLongpress(point);
      // alert('123')
      // clearTimeout(this.timeOutEvent);
      // this.timeOutEvent = 0;
      // this.timeOutEvent = setTimeout(() => {
      //     //执行长按要执行的内容
      //     this.markerLongpress(point);
      //     this.timeOutEvent = 0;
      // }, 600);
    },
    markerLongpress(point) {
      Dialog.confirm({
        message: "要标记当前位置吗？",
      })
        .then(() => {
          const { lng, lat } = point;
          // alert(lng + "-" + lat);
          this.mapCenter = point;
          this.user_positioning = `${lng},${lat}`;
        })
        .catch(() => {
          // on cancel
        });
    },
    markerDragend({ point }) {
      const { lng, lat } = point;
      this.user_positioning = `${lng},${lat}`;
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
        // debugger
        this.nation_list = transformDara;
      });
      // 婚姻状况
      this.$httpGet({
        url: "/dic/type/dic_marital_status",
      }).then((res) => {
        let transformDara = [];
        res.data.forEach((it, index) => {
          if (it.parentId !== null) {
            transformDara.push({ index: it.id, text: it.codeText });
          }
        });
        this.marital_status_list = transformDara;
      });
      // 最高学历
      this.$httpGet({
        url: "/dic/type/dic_education",
      }).then((res) => {
        let transformDara = [];
        res.data.forEach((it, index) => {
          if (it.parentId !== null) {
            transformDara.push({ index: it.id, text: it.codeText });
          }
        });
        this.education_level_list = transformDara;
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
        // this.areaList = res.data.length > 0 &&  this.transformData(res.data);
      });
    },
    // transformData(data, newArr = []) {
    //   //递归查询一二级网格
    //   for (let i = 0; i < data.length; i++) {
    //     newArr.push({ text: data[i]["name"], id: data[i]["id"] });
    //     if (data[i]["children"] && data[i]["children"].length > 0) {
    //       this.transformData(data[i]["children"], (newArr[i]["children"] = []));
    //     } else {
    //       newArr[i]["children"] = "";
    //     }
    //   }
    //   return newArr;
    // },
    onNation(value) {
      // debugger
      this.nation_txt = value;
      this.nation = false;
    },
    onMarital_status(value) {
      this.marital_status_txt = value;
      this.marital_status = false;
    },
    onCountry(value) {
      this.country_txt = value;
      this.country = false;
    },
    onHealth(value) {
      this.health_txt = value;
      this.health = false;
    },
    onEducation_level(value) {
      this.education_level_txt = value;
      this.education_level = false;
    },
    onRegional_grid(values) {
      if (values) {
        this.regional_grid_txt = values;
        // this.regional_grid_txt.text = values.join('/');
        // this.regional_grid_txt.index = index.join(',');
        // this.regional_grid_txt.index = `${this.areaList[index[0]].id},${this.areaList[[index[1]]].id}`;
        // this.regional_grid_txt.index = `${this.areaList[[index[1]]].id}`;
        this.regional_grid = false;
      }
    },
    getLongitudeLatitude() {
      this.longitudeLatitude = !this.longitudeLatitude;
    },
    addResult() {
      if (this.customer_name == "") {
        Dialog.alert({
          title: "提示",
          message: "请输入客户名称！",
        });
        return;
      }
      if (this.phone_number == "") {
        Dialog.alert({
          title: "提示",
          message: "请输入手机号！",
        });
        return;
      }
      this.$httpPost({
        url: "/api/customersPotential/add",
        data: {
          name: this.customer_name,
          telphone: this.phone_number,
          identifyNo: this.card_number,
          wechat: this.weChat,
          nation: this.nation_txt.index,
          marriage: this.marital_status_txt.index,
          gridding: this.regional_grid_txt.index,
          workUnit: this.work_unit,
          connectAddress: this.contact_address,
          annualIncome: this.annual_income,
          qq: this.qq_number,
          education: this.education_level_txt.index,
          nationality: this.country_txt.index,
          health: this.health_txt.index,
          address: this.residential_address,
          location: this.user_positioning,
          workAddress: this.work_address,
          plateNumber: this.car_number,
        },
      })
        .then((res) => {
          Toast({
            message: "保存成功",
            position: "middle",
          });
          this.$router.go(-1);
        })
        .catch((err) => {});
    },
    getLocation() {
      var u = navigator.userAgent;
      //Android终端
      var isAndroid = u.indexOf("Android") > -1 || u.indexOf("Adr") > -1;
      //iOS终端
      var isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/);
      if (isAndroid) {
        let positionArr = window.android.getLocation().split(",");
        // let positionArr = [124.281873, 45.514322];
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
        // let positionArr = [124.281873, 45.514322];
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
        alert("");
      }
    },
    createMarker(position) {
      // debugger
      if (this.positionMarker) {
        this.map.removeOverlay(this.positionMarker);
      }
      this.positionMarker = new BMap.Marker(new BMap.Point(...position)); // 创建标注
      this.map.addOverlay(this.positionMarker); // 将标注添加到地图中
    },
  },
};
</script>
<style scoped>
.AddPotentialCustomers {
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
.local-marker {
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
}
</style>
