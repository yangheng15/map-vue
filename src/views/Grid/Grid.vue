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
          :show="true"
          :position="item.position"
          :name="item.principalName"
          :address="item.name"
          :data-val="item"
          @touchEvent="selfOverlayClick(item)"
        ></my-overlay>
      </template>

      <!-- 弹窗 -->
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
            <p>所属机构：{{ table.orgName }}</p>
            <p>网格经理：{{ table.principalName }}</p>
            <p>认领日期：{{ table.allocateTime }}</p>
            <p>客户数量：{{ table.customer_num }}</p>
            <p>人口数量：{{ table.population_num }}</p>
            <p>营销状态：{{ table.status }}</p>
          </div>
          <div style="margin-top: 1.5rem" class="save">
            <van-button
              style="
                margin-right: 1rem;
                border-radius: 0.3rem;
                background: #df0f0f;
              "
              :disabled="Boolean(table.principalName)"
              type="primary"
              @touchstart="clickClaim(table)"
              >认领</van-button
            >
            <van-button
              style="border-radius: 0.3rem; background: #0fb38f"
              :disabled="!Boolean(table.principalName)"
              ref="goback"
              type="primary"
              @touchstart="clickBack(table)"
              >归还</van-button
            >
          </div>
        </div>
      </bm-overlay>

      <!-- 下面是路径规划出来的图标-->
      <template v-for="item in label_line">
        <bm-label
          :key="item.id"
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
        :position="{ lng: 114.645, lat: 33.62 }"
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
        :to="{ name: 'PathPlanning', query: { title: '路径规划' } }"
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
import { Toast } from "vant";
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
      filterData: [],
      map: null,
    };
  },
  created() {
    this.typeIds = this.$route.params.typeIds;
    if (this.typeIds) {
      this.queryResources();
    }
    this.specialSubject = this.$route.params.specialSubject;
    this.owner = this.$route.params.owner;
    if (this.specialSubject || this.owner) {
      this.resource_selection();
    }
  },
  methods: {
    mapPlaning(BMap, map) {
      this.$httpGet({
        url: "/api/mapPlaning/query",
      }).then((res) => {
        // console.log(res.data);
        this.map_data = res.data;
        this.map_data.forEach((it) => {
          it.mapPlaning = it.mapPlaning && JSON.parse(it.mapPlaning);
        });
        this.createPolygon(map);
      });
    },
    resource_selection() {
      if (!this.owner) {
        var _username = localStorage.getItem("username");
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
    queryResources() {
      this.$httpGet({
        url: "/api/resourceType/query",
        params: {
          typeIds: this.typeIds,
        },
      }).then((res) => {
        console.log(res.data);
        this.map_data = res.data;
        this.map_data.forEach((it) => {
          it.mapPlaning = it.mapPlaning && JSON.parse(it.mapPlaning);
        });
      });
    },
    selfOverlayClick(data) {
      this.table = data;
      this.introduce = true;
    },
    overlayClose() {
      this.introduce = false;
    },
    mapReady({ BMap, map }) {
      this.map = map;
      //添加多边形覆盖物
      this.mapPlaning(BMap, map);
    },
    createPolygon(map) {
      console.log(BMap);
      let polygonArr = [];
      // console.log(this.map_data);
      this.map_data.forEach((line) => {
        // console.log(line.mapPlaning);
        // console.log(this.BMap === BMap);
        line.mapPlaning &&
          polygonArr.push(
            new BMap.Polygon(
              line.mapPlaning.map((position) => {
                // console.log(BMap === this.BMap);
                return new BMap.Point(position.lng, position.lat);
              }),
              {
                strokeColor: line.claim ? "#DF0F0F" : "#0FB38F",
                strokeWeight: 2,
                strokeOpacity: 1,
                strokeStyle: "dashed",
                fillOpacity: "0.2",
                fillColor: line.fillColor,
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
    tipsWarn() {
      Toast({
        message: "只有当前负责人可以归还",
        position: "top",
      });
    },
    clickBack(item) {
      console.log(item);
      let _username = localStorage.getItem("username");
      if (item.principalName == _username) {
        this.$httpPut({
          url: "/api/semGridding/return",
          params: {
            userName: _username,
            ids: item.id,
          },
        }).then((res) => {
          item.show = false;
          const index = this.map_data.findIndex((it) => it.info === item);
          // this.polygonDl[index].setStrokeColor("#0FB38F");需要刷新网格
          this.mapCenter = {
            ...this.mapCenter,
            lat: this.mapCenter.lat + 0.001,
          };
          this.map.reset();
          this.introduce = false; //关闭弹窗
        });
      } else {
        this.tipsWarn();
      }
    },
    clickClaim(item) {
      console.log(item);
      let _username = localStorage.getItem("username");
      this.$httpPut({
        url: "/api/semGridding/claim",
        params: {
          userName: _username,
          id: item.id,
        },
      }).then((res) => {
        item.show = false;
        const index = this.map_data.findIndex((it) => it.info === item);
        // this.polygonDl[index].setStrokeColor("#0FB38F");需要刷新网格
        this.mapCenter = {
          ...this.mapCenter,
          lat: this.mapCenter.lat + 0.001,
        };
        // location.reload();
        this.$router.go(0);
        this.introduce = false; //关闭弹窗
      });
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
      const code = this.filterData.find(
        (it) => it.codeText === this.resource_type_txt
      )["code"];
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
@import url("./Grid.scss");
</style>