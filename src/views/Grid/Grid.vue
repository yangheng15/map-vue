<template>
  <div class="grid">
    <my-nav :title="title"></my-nav>
    <van-search v-model="value" placeholder="网格名称、客户名称、资源名称" />
    <baidu-map
      class="bm-view"
      @ready="mapReady"
      :center="mapCenter"
      :zoom="14"
      ak="YOUR_APP_KEY"
    >
      <template v-for="(item, index) in map_data">
        <my-overlay
          :key="index"
          :show="item.status"
          :position="item.position"
          :name="item.principalName"
          :address="item.name"
          :data-val="item"
          @touchEvent="selfOverlayClick(item)"
        ></my-overlay>
      </template>
      <!-- @touchEvent="selfOverlayClick(item)" -->
      <!-- :data-val="JSON.stringify(item)" -->
      <!-- 弹出的介绍 -->

      <bm-overlay
        v-show="introduce"
        pane="labelPane"
        :class="{ sample: true, active }"
        @mouseover.native="active = true"
        @mouseleave.native="active = false"
        @draw="draw"
      >
        <div class="Popup_introduce">
          <p class="pop_title">
            网格信息
            <img
              src="../../assets/grid/pop_close.svg"
              @touchstart="overlayClose()"
            />
          </p>
          <div class="pop_content">
            <p>所属机构：{{ table.branchCode }}</p>
            <p>网格经理：{{ table.men }}</p>
            <p>认领日期：{{ table.time }}</p>
            <p>客户数量：{{ table.customer_num }}</p>
            <p>人口数量：{{ table.population_num }}</p>
            <p>营销状态：{{ table.state }}</p>
          </div>
          <div style="margin-top: 1.5rem" class="save">
            <van-button
              style="
                margin-right: 1rem;
                border-radius: 0.3rem;
                background: #df0f0f;
              "
              :disabled="Boolean(table.img)"
              type="primary"
              @touchstart="clickClaim()"
              >认领</van-button
            >
            <van-button
              style="border-radius: 0.3rem; background: #0fb38f"
              :disabled="!Boolean(table.img)"
              ref="goback"
              type="primary"
              @touchstart="clickBack(table)"
              >归还</van-button
            >
          </div>
        </div>
      </bm-overlay>

      <!-- 下面是路径规划出来的图标-->
      <template v-for="(item, index) in label_line">
        <bm-label
          :key="index"
          v-if="$route.query.routePlan"
          :content="item.content"
          :position="item.position"
          :labelStyle="item.labelStyle"
          title="Hover me"
        />
      </template>
      <bm-polygon
        v-if="$route.query.routePlan"
        :path="polylinePath"
        stroke-color="#DF0F0F"
        fillColor="transparent"
        :stroke-opacity="1"
        :stroke-weight="4"
        @lineupdate="updatePolylinePath"
      ></bm-polygon>
      <bm-marker
        v-if="$route.query.taskChoice"
        :position="{ lng: 114.625, lat: 33.625 }"
        :icon="{
          url: require('../../assets/grid/red_flag1.png'),
          size: { width: 50, height: 50 },
        }"
        @click="infoWindowOpen1"
      >
        <bm-info-window
          :show="showText1"
          @close="infoWindowClose1"
          @open="infoWindowOpen1"
        >
          <p style="padding-top: 1rem">姓名：卓越联腾企业贷客户拜访营销</p>
          <p>地址：学校</p>
          <p>备注：要去的学校</p>
        </bm-info-window>
      </bm-marker>
      <bm-marker
        v-if="$route.query.taskChoice"
        :position="{ lng: 114.66, lat: 33.605 }"
        :icon="{
          url: require('../../assets/grid/red_flag.png'),
          size: { width: 50, height: 50 },
        }"
        @click="infoWindowOpen"
      >
        <bm-info-window
          style="left: 1rem"
          :show="showText"
          @close="infoWindowClose"
          @open="infoWindowOpen"
        >
          <p style="padding-top: 1rem">姓名：卓越联腾企业贷客户拜访营销</p>
          <p>类型：产品营销</p>
          <p>产品：特色存款</p>
          <p>目标：10万</p>
          <p>剩余日期：30天</p>
        </bm-info-window>
      </bm-marker>
      <bm-marker
        v-if="$route.query.taskChoice"
        :position="{ lng: 114.59, lat: 33.645 }"
        :icon="{
          url: require('../../assets/grid/red_flag2.png'),
          size: { width: 50, height: 50 },
        }"
        @click="infoWindowOpen2"
      >
        <bm-info-window
          style="left: 1rem"
          :show="showText2"
          @close="infoWindowClose2"
          @open="infoWindowOpen2"
        >
          <p style="padding-top: 1rem">姓名：卓越联腾企业贷客户拜访营销</p>
          <p>地址：小区</p>
          <p>备注：要去的小区</p>
        </bm-info-window>
      </bm-marker>
      <!-- 点击出现的标记 -->
      <bm-marker
        v-if="markerTure"
        @click="showPopupSign(markerPostion)"
        :dragging="true"
        :position="markerPostion"
        @dragend="markerDragend"
        :icon="{
          url: require('../../assets/grid/location_map.svg'),
          size: { width: 60, height: 60 },
        }"
      ></bm-marker>
      <!-- 右下角定位的图标 -->
      <bm-geolocation
        anchor="BMAP_ANCHOR_BOTTOM_RIGHT"
        :showAddressBar="true"
        :autoLocation="true"
      ></bm-geolocation>
    </baidu-map>
    <!-- 搜索框 -->

    <!-- 右侧图标 -->
    <div class="resource map_marker">
      <router-link
        tag="p"
        :to="{ name: 'ResourceSelection', query: { title: '资源选择' } }"
      >
        <img src="../../assets/grid/resource.svg" alt />
      </router-link>
      <p @click="markerTure = true">
        <img src="../../assets/grid/sign.svg" alt />
      </p>
      <router-link
        tag="p"
        :to="{ name: 'ResourceSelection', query: { title: '路径规划' } }"
      >
        <img src="../../assets/grid/path_planning.svg" alt />
      </router-link>
      <router-link
        tag="p"
        :to="{ name: 'GridSelection', query: { title: '网格选择' } }"
      >
        <img src="../../assets/grid/grid_filtering.svg" alt />
      </router-link>
    </div>
    <div v-show="isPopupVisibleSign" class="isPopupVisibleSign">
      <van-form
        class="isPopupVisibleSign_content"
        @failed="onFailed"
        @submit="onSubmit"
      >
        <p class="pop_title">地图标记</p>
        <van-field
          v-model="sign_name"
          name="名称："
          label="名称："
          placeholder="单行输入"
          :rules="[{ required: true, message: '请填写名称' }]"
        />
        <van-field
          v-model="sign_phone"
          name="电话："
          label="电话："
          placeholder="单行输入"
          :rules="[{ required: true, message: '请填写电话' }]"
        />
        <van-field
          v-model="sign_address"
          name="地址："
          label="地址："
          placeholder="单行输入"
          :rules="[{ required: true, message: '请填写地址' }]"
        />
        <van-field
          v-model="sign_position"
          name="位置："
          label="位置："
          placeholder="单行输入"
          :rules="[{ required: true, message: '请填写位置' }]"
        />
        <van-field
          readonly
          clickable
          name="picker"
          :value="resource_type_txt"
          label="资源类型："
          placeholder="点击选择资源类型"
          @click="resource_type = true"
        />
        <van-popup v-model="resource_type" position="bottom">
          <van-picker
            show-toolbar
            :columns="resource_type_list"
            @confirm="onResource_type"
            @cancel="resource_type = false"
          />
        </van-popup>
        <van-field
          readonly
          clickable
          name="picker"
          :value="marked_or_not_txt"
          label="标记："
          placeholder="点击选择是否标记"
          @click="marked_or_not = true"
        />
        <van-popup v-model="marked_or_not" position="bottom">
          <van-picker
            show-toolbar
            :columns="marked_or_not_list"
            @confirm="onMarked_or_not"
            @cancel="marked_or_not = false"
          />
        </van-popup>
        <van-field
          v-model="sign_remarks"
          rows="2"
          autosize
          label="备注"
          type="textarea"
          maxlength="50"
          placeholder="请输入备注"
          show-word-limit
        />
        <div style="margin: 10px 0px" class="save">
          <van-button style="margin-right: 10px" round native-type="submit"
            >保存</van-button
          >
          <van-button round type="primary" @click="closePopupSign()"
            >取消</van-button
          >
        </div>
      </van-form>
    </div>
    <my-tabbar></my-tabbar>
  </div>
</template>

<script>
import MyOverlay from "./MyOverlay";
import MyNav from "../../components/Public/MyNav";
import myTabbar from "../../components/Public/MyTabbar";
export default {
  name: "Grid",
  components: {
    MyNav,
    MyOverlay,
    myTabbar,
  },
  data() {
    return {
      title: "网格",
      zoom: 10,
      center: [114.65, 33.37],
      markers: [],
      count: 0,
      lalal: {},
      table: {},
      mapCenter: { lng: 114.654102, lat: 33.623741 },
      polygonDl: [],
      map_data: [],
      map_data_position: {},
      // map_data: [
      //   {
      //     userId: 0,
      //     polylinePath: [
      //       { lng: 114.65062558730104, lat: 33.63371252899103 },
      //       { lng: 114.74, lat: 33.38 },
      //       { lng: 114.7, lat: 33.34 },
      //       { lng: 114.66, lat: 33.365 },
      //       { lng: 114.68, lat: 33.41 },
      //     ],
      //     info: {
      //       img: require("../../assets/grid/men1.png"),
      //       name: "李晓燕",
      //       address: "金融街",
      //       position: { lng: 114.715, lat: 33.395 },
      //       grid_name: "金融街",
      //       branch: "金融街支行",
      //       men: "李晓燕",
      //       time: "2020-08-01",
      //       customer_num: "100",
      //       population_num: "10000",
      //       state: "3日内无营销",
      //       show: true,
      //     },
      //     claim: true,
      //   },
      //   {
      //     userId: 1,
      //     polylinePath: [
      //       { lng: 114.65, lat: 33.41 },
      //       { lng: 114.58, lat: 33.35 },
      //       { lng: 114.54, lat: 33.39 },
      //       { lng: 114.6, lat: 33.43 },
      //     ],
      //     info: {
      //       img: require("../../assets/grid/user_men.svg"),
      //       name: "张松",
      //       address: "世纪广场",
      //       position: { lng: 114.6, lat: 33.403 },
      //       grid_name: "世纪广场",
      //       branch: "世纪广场支行",
      //       men: "张松",
      //       time: "2020-08-01",
      //       customer_num: "100",
      //       population_num: "10000",
      //       state: "6日内无营销",
      //       show: true,
      //     },
      //     claim: true,
      //   },
      //   {
      //     userId: 2,
      //     polylinePath: [
      //       { lng: 114.67, lat: 33.28 },
      //       { lng: 114.6, lat: 33.26 },
      //       { lng: 114.56, lat: 33.28 },
      //       { lng: 114.62, lat: 33.33 },
      //       { lng: 114.66, lat: 33.32 },
      //     ],
      //     info: {
      //       address: "和平家园",
      //       position: { lng: 114.64, lat: 33.3 },
      //       grid_name: "和平家园",
      //       branch: "和平家园支行",
      //       men: "无",
      //       time: "2020-08-01",
      //       customer_num: "100",
      //       population_num: "10000",
      //       state: "6日内无营销",
      //       show: true,
      //     },
      //     claim: false,
      //   },
      // ],
      overlay_content: [],
      label_line: [
        {
          content: "1",
          position: { lng: 114.705, lat: 33.615 },
          labelStyle: {
            color: "red",
            fontSize: "1rem",
            width: "1.5rem",
            height: "1.5rem",
            lineHeight: "1.5rem",
            textAlign: "center",
            borderRadius: "100%",
          },
        },
        {
          content: "2",
          position: { lng: 114.635, lat: 33.585 },
          labelStyle: {
            color: "red",
            fontSize: "1rem",
            width: "1.5rem",
            height: "1.5rem",
            lineHeight: "1.5rem",
            textAlign: "center",
            borderRadius: "100%",
          },
        },
        {
          content: "3",
          position: { lng: 114.685, lat: 33.525 },
          labelStyle: {
            color: "red",
            fontSize: "1rem",
            width: "1.5rem",
            height: "1.5rem",
            lineHeight: "1.5rem",
            textAlign: "center",
            borderRadius: "100%",
          },
        },
        {
          content: "4",
          position: { lng: 114.595, lat: 33.57 },
          labelStyle: {
            color: "red",
            fontSize: "1rem",
            width: "1.5rem",
            height: "1.5rem",
            lineHeight: "1.5rem",
            textAlign: "center",
            borderRadius: "100%",
          },
        },
        {
          content: "5",
          position: { lng: 114.645, lat: 33.635 },
          labelStyle: {
            color: "red",
            fontSize: "1rem",
            width: "1.5rem",
            height: "1.5rem",
            lineHeight: "1.5rem",
            textAlign: "center",
            borderRadius: "100%",
          },
        },
        {
          content: "赵四",
          position: { lng: 114.678, lat: 33.622 },
          labelStyle: {
            color: "red",
            fontSize: "0.8rem",
            width: "3rem",
            height: "1.5rem",
            lineHeight: "1.5rem",
            textAlign: "center",
          },
        },
        {
          content: "张红",
          position: { lng: 114.608, lat: 33.593 },
          labelStyle: {
            color: "red",
            fontSize: "0.8rem",
            width: "3rem",
            height: "1.5rem",
            lineHeight: "1.5rem",
            textAlign: "center",
          },
        },
        {
          content: "王强",
          position: { lng: 114.658, lat: 33.533 },
          labelStyle: {
            color: "red",
            fontSize: "0.8rem",
            width: "3rem",
            height: "1.5rem",
            lineHeight: "1.5rem",
            textAlign: "center",
          },
        },
        {
          content: "慕容",
          position: { lng: 114.568, lat: 33.579 },
          labelStyle: {
            color: "red",
            fontSize: "0.8rem",
            width: "3rem",
            height: "1.5rem",
            lineHeight: "1.5rem",
            textAlign: "center",
          },
        },
        {
          content: "李四",
          position: { lng: 114.618, lat: 33.643 },
          labelStyle: {
            color: "red",
            fontSize: "0.8rem",
            width: "3rem",
            height: "1.5rem",
            lineHeight: "1.5rem",
            textAlign: "center",
          },
        },
      ],
      introduce: false,
      isActive: 0,
      showText: false,
      showText1: false,
      showText2: false,
      radio: "1",
      active: false,
      circlePath: {
        center: {
          lng: 114.65,
          lat: 33.67,
        },
        radius: 5000,
      },
      isPopupVisibleSign: false,
      markerTure: false,
      isPopupVisible: false,
      customer_pool_pop: [
        {
          name: "1000001",
          text: "张南",
          id: 1,
        },
        {
          name: "1000001",
          text: "张南",
          id: 2,
        },
        {
          name: "1000001",
          text: "张南",
          id: 3,
        },
        {
          name: "1000001",
          text: "张南",
          id: 4,
        },
      ],

      polylinePath: [
        { lng: 114.71, lat: 33.61 },
        { lng: 114.64, lat: 33.58 },
        { lng: 114.69, lat: 33.52 },
        { lng: 114.6, lat: 33.565 },
        { lng: 114.65, lat: 33.63 },
      ],
      value: "",
      sign_name: "",
      sign_phone: "",
      sign_address: "",
      marked_or_not_txt: "",
      marked_or_not_list: ["是", "否"],
      marked_or_not: false,
      resource_type_txt: "",
      resource_type_list: [],
      resource_type: false,
      sign_remarks: "",
      sign_position: "",
      markerPostion: { lng: 114.655, lat: 33.625 },
      filterData: []
    };
  },
  created() {
    this.typeIds = this.$route.params.typeIds;
    if (this.typeIds) {
    }
    this.specialSubject = this.$route.params.specialSubject;
    this.owner = this.$route.params.owner;
    if (this.specialSubject || this.owner) {
      this.resource_selection();
    }
    this.mapPlaning();
  },
  methods: {
    handler({ BMap, map }) {
      console.log(BMap, map);
      this.center.lng = 116.404;
      this.center.lat = 39.915;
      this.zoom = 15;
    },
    mapPlaning() {
      this.$httpGet({
        url: "/api/mapPlaning/query",
      }).then((res) => {
        console.log(res.data);
        this.map_data = res.data;
        this.map_data.forEach((it) => {
          it.mapPlaning = it.mapPlaning && JSON.parse(it.mapPlaning);
        });
      });
    },
    resource_selection() {
      if (!this.owner) {
        var _username = localStorage.getItem("username");
        console.log(_username);
      } else {
        _username = [];
      }
      this.$httpGet({
        url: "/api/semGridding/selection",
        params: {
          owner: _username,
          specialSubject: this.specialSubject,
        },
      }).then((res) => {
        console.log(res.data);
        this.map_data = res.data;
        this.map_data.forEach((it) => {
          it.mapPlaning = it.mapPlaning && JSON.parse(it.mapPlaning);
        });
      });
    },
    onClick() {
      this.count += 1;
    },
    selfOverlayClick(data) {
      this.table = data;
      this.introduce = true;
    },
    overlayClose() {
      this.introduce = false;
    },
    chuxian(item) {
      setTimeout(() => {
        this.mapReady();
      }, 0);

      this.introduce = true;
    },
    mapReady({ BMap, map }) {
      //添加多边形覆盖物
      const userId = this.$route.query.userId;
      map.clearOverlays();
      if (userId) {
        const index = this.map_data.findIndex((it) => it.id === +id);
        this.map_data = this.map_data.filter((it) => it.id === +id);
        console.log(this.map_data);
        this.createPolygon(map);
      } else {
        this.createPolygon(map);
      }
    },
    createPolygon(map) {
      let polygonArr = [];
      this.map_data.forEach((line) => {
        line.mapPlaning &&
          polygonArr.push(
            new BMap.Polygon(
              line.mapPlaning.map((position) => {
                return new BMap.Point(position.lng, position.lat);
              }),
              {
                strokeColor: line.claim ? "#DF0F0F" : "#0FB38F",
                strokeWeight: 2,
                strokeOpacity: 1,
                strokeStyle: "dashed",
                fillOpacity: "0.2",
                fillColor: "line.fillColor ",
              }
            )
          );
      });
      polygonArr.forEach((polygon) => map.addOverlay(polygon));
      // console.log(polygonArr);
      this.polygonDl = polygonArr;
    },
    markerDragend({ point }) {
      // console.log(point);
      this.markerPostion = point;
    },
    clear() {
      this.infoWindow.contents = "";
    },
    showPopup() {
      this.isPopupVisible = true;
    },
    handleClick(item) {
      this.introduce = true;
    },
    clickBack(item) {
      item.show = false;
      const index = this.map_data.findIndex((it) => it.info === item);
      this.polygonDl[index].setStrokeColor("#0FB38F");
      this.mapCenter = { ...this.mapCenter, lat: this.mapCenter.lat + 0.001 };

      this.introduce = false; //关闭弹窗
    },
    clickClaim() {
      this.introduce = false;
    },
    closePopup() {
      this.isPopupVisible = false;
    },
    showPopupSign(point) {
      // console.log(point);
      this.isPopupVisibleSign = true;
      this.sign_position = `${point.lng},${point.lat}`;
      this.obtainDic();
    },
    closePopupSign() {
      this.isPopupVisibleSign = false;
    },
    selectItem(thisItem) {
      if (typeof thisItem.checked == "undefined") {
        this.$set(thisItem, "checked", true);
      } else {
        thisItem.checked = !thisItem.checked;
      }
    },
    updateCirclePath(e) {
      this.circlePath.center = e.target.getCenter();
      this.circlePath.radius = e.target.getRadius();
    },
    draw({ el, BMap, map }) {
      // debugger
      const pixel = map.pointToOverlayPixel(new BMap.Point(114.65, 33.35));
      el.style.left = pixel.x - 60 + "px";
      el.style.top = pixel.y - 20 + "px";
    },
    updatePolylinePath(e) {
      this.polylinePath = e.target.getPath();
    },
    addPolylinePoint() {
      this.polylinePath.push({ lng: 116.404, lat: 39.915 });
    },
    infoWindowClose() {
      this.showText = false;
    },
    infoWindowOpen(item) {
      this.lalal = item;
      this.showText = true;
    },
    infoWindowClose1() {
      this.showText1 = false;
    },
    infoWindowOpen1() {
      this.showText1 = true;
    },
    infoWindowClose2() {
      this.showText2 = false;
    },
    infoWindowOpen2() {
      this.showText2 = true;
    },
    changeValue(index) {
      this.isActive = index;
    },
    onMarked_or_not(value) {
      this.marked_or_not_txt = value;
      this.marked_or_not = false;
    },
    onResource_type(value) {
      console.log(value);
      this.resource_type_txt = value;
      this.resource_type = false;
    },
    onFailed(errorInfo) {
      console.log("failed", errorInfo);
    },
    obtainDic() {
      this.$httpGet({
        url: "/dic/type/dic_grid_resource_type",
        headers: {
          token: this.token,
        },
      }).then((res) => {
        console.log(res);
        res.data = res.data.filter(function (item, index) {
          return item.parentId != null;
        });
        this.filterData = res.data;
        for (var item = 0; item < res.data.length; item++) {
          this.resource_type_list[item] = res.data[item].codeText;
        }
      });
    },
    async onSubmit(values) {
      // console.log("submit", values);
      const code = this.filterData.find(it => it.codeText === this.resource_type_txt)['code']
      this.$httpPost({
        url: "/api/semResource/add",
        headers: {
          token: this.token,
        },
        data: {
          name: this.sign_name,
          telphone: this.sign_phone,
          address: this.sign_address,
          mark: this.marked_or_not_txt,
          description: this.sign_remarks,
          type: code,
          position: this.sign_position,
        },
      }).then((res) => {
        if (res.access_token) {
          localStorage.setItem("_token", res.access_token);
        }
        this.closePopupSign();
      });
    },
  },
};
</script>


<style scoped lang='scss'>
.grid {
  padding-top: 46px;
}
.amap-page-container {
  .amap-demo {
    height: 77vh;
  }
}
.introduce_body {
  text-align: center;
  width: 60px;
  height: 75px;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
  .introduce_img {
    width: 26px;
    border-radius: 100%;
  }
  .introduce_name {
    color: #fff;
    font-size: 12px;
    font-weight: 600;
    height: 24px;
    line-height: 24px;
    background: #df0f0f;
    text-align: center;
    border: none;
    margin: 0px;
    width: 100%;
  }
  .introduce_address {
    color: #df0f0f;
    font-size: 12px;
    font-weight: 600;
    height: 22px;
    line-height: 22px;
    text-align: center;
    background: transparent;
    border: 1px solid #df0f0f;
    width: 100%;
    margin: 0px;
  }
  .introduce_address_lv {
    color: #0fb38f;
    font-size: 12px;
    font-weight: 600;
    height: 22px;
    line-height: 22px;
    background: #fff;
    width: 100%;
    text-align: center;
    border: 1px solid #0fb38f;
  }
}
.van-search {
  padding: 6px;
}
.van-search >>> .van-cell {
  padding: 0px 8px 0px 0;
}
.introduce_body {
  text-align: center;
  width: 4rem;
}
/* 下面是弹窗 */
.isPopupVisibleSign {
  position: fixed;
  z-index: 100;
  top: 0px;
  left: 0rem;
  width: 100%;
  height: 100vh;
  padding: 0.5rem 0.5rem;
  background: rgba(193, 185, 185, 0.7);
}
.Popup_introduce {
  position: absolute;
  top: -153rem;
  left: -4rem;
  width: 16rem;
  background: rgb(255, 255, 255);
  border-radius: 0.5rem;
}
.isPopupVisibleSign_content {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 77%;
  background: rgb(255, 255, 255);
  border-radius: 0.5rem;
}
.pop_content {
  padding: 1rem 1rem 1rem 1rem;
}
.pop_title {
  text-align: center;
  background: rgb(61, 66, 94);
  color: #fff;
  font-size: 1rem;
  height: 2.5em;
  line-height: 2.5rem;
  border-top-left-radius: 0.5rem;
  border-top-right-radius: 0.5rem;
  margin: 0rem;
  position: relative;
}
.pop_title img {
  position: absolute;
  right: 3%;
  top: 25%;
  width: 1.3rem;
}
/* 上面是弹窗 */
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
.map_marker p {
  margin: 1rem 0rem;
}
.map_marker p img {
  width: 1.8rem;
}
.active_sample_square {
  background: #fd7522 !important;
  border: 1rem solid red;
}
.van-radio__label {
  display: inline-block !important;
  width: 100%;
}
.sample {
  position: absolute;
}
.labelStyle_name {
  color: #fff;
  font-size: 0.8rem;
  font-weight: 600;
  width: 4rem;
  height: 1.5rem;
  line-height: 1.5rem;
  background: #df0f0f;
  text-align: center;
  border: none;
  margin: 0rem;
}
.labelStyle_address {
  color: #df0f0f;
  font-size: 0.8rem;
  font-weight: 600;
  width: 4rem;
  height: 1.5rem;
  line-height: 1.5rem;
  text-align: center;
  background: transparent;
  border: 0.01rem solid #df0f0f;
  margin: 0rem;
}
.labelStyle_img {
  width: 1.8rem;
  border-radius: 100%;
}
.sample.active {
  background: rgba(0, 0, 0, 0.75);
  color: #fff;
}
.sample_circular {
  width: 13rem;
  height: 13rem;
  background: rgba(63, 172, 245, 0.6);
  overflow: hidden;
  color: #fff;
  text-align: center;
  padding: 1rem 1.5rem;
  font-size: 1.1rem;
  font-weight: 600;
  border-radius: 100%;
  margin-bottom: 1rem;
  flex-wrap: wrap;
  display: flex;
  align-items: center;
}
.sample_circular p {
  margin: 0;
  margin-top: 1rem;
  width: 100%;
}
.sample_circular img {
  border-radius: 100%;
  margin-right: 0.5rem;
  display: inline-block;
  width: 2.5rem;
  vertical-align: middle;
}
.sample_square {
  width: 13rem;
  background: rgba(145, 176, 235, 0.5);
  overflow: hidden;
  color: #fff;
  text-align: center;
  padding: 1rem 1.5rem;
  font-size: 1.1rem;
  font-weight: 600;
}
.sample_square p {
  margin: 0;
  margin-top: 1rem;
  display: inline-flex;
}
.bm-view {
  width: 100%;
  height: 83vh;
}
.fixed_menu {
  position: fixed;
  bottom: 2.7rem;
  left: 0rem;
  width: 100%;
  padding-top: 0.5rem;
  background: #fff;
}
.fixed_menu ul {
  width: 100%;
  font-size: 0;
}
.fixed_menu ul li {
  display: inline-block;
  text-align: center;
  width: 25%;
  font-size: 1rem;
}
.fixed_menu ul li p {
  margin-top: 0.5rem;
}
.resource {
  position: fixed;
  top: 8rem;
  right: 1rem;
}
.checked::before {
  position: absolute;
  content: "";
  width: 0.8rem;
  height: 0.8rem;
  top: 0.1rem;
  background: #0078d7;
  left: 0.1rem;
  border-radius: 100%;
}
.checked {
  position: relative;
  background: #fff;
  border: 0.001rem solid #0078d7 !important;
  border-radius: 100%;
}
.screen_content {
  position: fixed;
  z-index: 100;
  top: 3rem;
  left: 0rem;
  width: 100%;
}

.screen_content input {
  width: calc(100% - 1rem);
  height: 44px;
  margin: 1rem 0.5rem;
  line-height: 20px;
  padding: 0rem 1rem 0rem 3rem;
  text-align: left;
  border-radius: 2px 2px 2px 2px;
  background-color: #fafafa;
  text-align: center;
  box-shadow: 0px 2px 2px 0px rgba(0, 0, 0, 0.24);
  border: 1px solid rgba(255, 0, 0, 0);
}
.screen_content img {
  position: absolute;
  width: 1.2rem;
  top: 40%;
  left: 5%;
  z-index: 100;
  opacity: 0.5;
}
.screen_content input::-webkit-input-placeholder {
  text-align: left;
  font-size: 14px;
}
.screen_content input::-moz-placeholder {
  /* Mozilla Firefox 19+ */
  text-align: left;
  font-size: 14px;
}
.screen_content input:-moz-placeholder {
  /* Mozilla Firefox 4 to 18 */
  text-align: left;
  font-size: 14px;
}
.screen_content input:-ms-input-placeholder {
  /* Internet Explorer 10-11 */
  text-align: left;
  font-size: 14px;
}
.pop_content p .pop_content_left {
  display: inline-block;
  width: 25%;
  line-height: 2rem;
}
.pop_content p .pop_content_right {
  border: 0.05rem solid #bbb;
  width: 75%;
  padding: 0rem 0.5rem;
  border-radius: 0.3rem;
}
/* 圆形覆盖物 */
.circular_covering {
  position: absolute;
  top: 3rem;
  left: 2rem;
}
.circular_covering1 {
  position: absolute;
  top: 3rem;
  left: 2rem;
}
.circular_covering_num {
  width: 1.2rem;
  height: 1.2rem;
  background: #fff;
  border: 0.01rem solid #df0f0f;
  border-radius: 100%;
  text-align: center;
  line-height: 1.2rem;
}
.circular_covering_text {
  width: 3.5rem;
  height: 1.6rem;
  background: #fff;
  border: 0.01rem solid #df0f0f;
  line-height: 1.6rem;
  text-align: center;
}
.circular_covering1 .circular_covering_num {
  position: absolute;
  position: absolute;
  top: 1.2rem;
  left: -0.5rem;
}
.circular_covering1 .circular_covering_text {
  position: absolute;
  top: -0.3rem;
  left: -3.8rem;
}
.circular_covering2 .circular_covering_num {
  position: absolute;
  top: -7.2rem;
  left: 5.4rem;
}
.circular_covering2 .circular_covering_text {
  position: absolute;
  top: -8.6rem;
  left: 2rem;
}
.circular_covering3 .circular_covering_num {
  position: absolute;
  top: -4.2rem;
  left: 12.2rem;
}
.circular_covering3 .circular_covering_text {
  position: absolute;
  top: -5.7rem;
  left: 9rem;
}
.circular_covering4 .circular_covering_num {
  position: absolute;
  top: -0.2rem;
  left: 4.2rem;
}
.circular_covering4 .circular_covering_text {
  position: absolute;
  top: -1.6rem;
  left: 0.8rem;
}
.circular_covering5 .circular_covering_num {
  position: absolute;
  top: 7.5rem;
  left: 9.7rem;
}
.circular_covering5 .circular_covering_text {
  position: absolute;
  top: 6.1rem;
  left: 6.4rem;
}

/*  */
@media screen and (min-width: 320px) and (max-width: 374px) {
  li,
  select,
  input,
  p,
  div {
    font-size: 0.8rem;
  }
  .latest_tasks ul li {
    font-size: 0.7rem;
  }
  .latest_tasks ul {
    margin: 0;
  }
  .end_line {
    font-size: 0.8rem;
  }
  .two_select select {
    height: 1.5rem;
  }
  .pop_title {
    height: 2em;
    line-height: 2rem;
  }
  .pop_content {
    padding: 0.5rem;
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
  .van-radio__icon {
    height: 1.2rem !important;
  }
  .save button {
    height: 1.7rem;
    width: 5rem;
    font-size: 0.8rem;
  }
  .pop_content p .pop_content_right {
    height: 1.5rem;
  }
  .map_marker p img {
    width: 1.5rem;
  }
}
</style>