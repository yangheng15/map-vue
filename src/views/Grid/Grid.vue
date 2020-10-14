<template>
  <div class="grid">
    <my-nav title="网格"></my-nav>
    <van-search
      v-model="searchVal"
      placeholder="网格名称、客户名称、资源名称"
    />
    <baidu-map
      class="bm-view"
      @ready="mapReady"
      :center="mapCenter"
      :zoom="14"
      ak="YOUR_APP_KEY"
    >
      <template v-for="(item, index) in map_data">
        <!-- 网格经理网格名称 -->
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

      <template v-for="(item, index) in typeIdsData">
        <my-overlay
          :key="index + 'type'"
          :show="true"
          :position="item.position"
          :name="item.principalName"
          :address="item.name"
          :data-val="item"
          @touchEvent="showTypeIds(item)"
        ></my-overlay>
      </template>

      <!-- 弹窗 -->
      <bm-overlay
        v-if="introduce"
        pane="labelPane"
        :class="{ sampleAlert: true }"
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
            <p>认领日期：{{ table.allocateTime | transform }}</p>
            <p>客户数量：{{ table.customer_num }}</p>
            <!-- <p>人口数量：{{ table.population_num }}</p> -->
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

      <!-- <bm-info-window
          :position="typeIdsItem.position"
          :show='typeIdsAlert'
          @click="typeIdsAlert = false;"
        >
          <p style="padding-top: 1rem">姓名：卓越联腾企业贷客户拜访营销</p>
          <p>类型：产品营销</p>
          <p>产品：特色存款</p>
          <p>目标：10万</p>
          <p>剩余日期：30天</p>
        </bm-info-window> -->

      <!-- 下面是路径规划出来的图标-->
      <template v-if="$route.params.pathIds">
        <bm-label
          v-for="(item, index) in $route.params.pathIds"
          :key="index + 'sign'"
          :content="item.name"
          :position="{
            lng: item.location && item.location.split(',')[0],
            lat: item.location && item.location.split(',')[1],
          }"
          :labelStyle="{
            color: 'red',
            fontSize: '14px',
            width: '50px',
            height: '22px',
            lineHeight: '23px',
            textAlign: 'center',
          }"
          title="Hover me"
        />
      </template>

      <bm-polygon
        v-if="$route.params.pathIds"
        :path="polylinePath"
        stroke-color="#DF0F0F"
        fillColor="transparent"
        :stroke-opacity="1"
        :stroke-weight="4"
        @lineupdate="updatePolylinePath"
      ></bm-polygon>

      <!-- <bm-marker
        :position="{ lng: 114.66, lat: 33.605 }"
        :icon="{
          url: require('../../assets/grid/red_flag.png'),
          size: { width: 50, height: 50 },
        }"
        @click="showText = true"
      >
        <bm-info-window
          style="left: 1rem"
          :show="showText"
          @close="showText = false"
        >
          <p style="padding-top: 1rem">姓名：卓越联腾企业贷客户拜访营销</p>
          <p>类型：产品营销</p>
          <p>产品：特色存款</p>
          <p>目标：10万</p>
          <p>剩余日期：30天</p>
        </bm-info-window>
      </bm-marker> -->

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
      <!-- <router-link
        tag="p"
        :to="{ name: 'PathPlanning', query: { title: '路径规划' } }"
      >
        <img src="../../assets/grid/path_planning.svg" alt />
      </router-link> -->
      <!-- <router-link
        tag="p"
        :to="{ name: 'GridSelection', query: { title: '网格选择' } }"
      >
        <img src="../../assets/grid/eyeMine.svg" alt />
      </router-link> -->
      <p @click="eyeTrueFalse">
        <img v-show="eyeMe" src="../../assets/grid/eyeMine.svg" alt />
        <img v-show="!eyeMe" src="../../assets/grid/eyeNotMine.svg" alt />
      </p>
    </div>

    <div v-show="isPopupVisibleSign" class="isPopupVisibleSign">
      <van-form class="isPopupVisibleSign_content" @submit="onSubmit">
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
          <van-button round type="primary" @click="isPopupVisibleSign = false"
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
      table: {},
      mapCenter: { lng: 114.654102, lat: 33.623741 },
      polygonDl: [],
      map_data: [],
      map_data_position: {},
      introduce: false,
      showText: false,
      isPopupVisibleSign: false,
      markerTure: false,
      polylinePath: [],
      searchVal: "",
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
      typeIds: "",
      specialSubject: "",
      pathIds: "",
      typeIdsData: [],
      typeIdsItem: {},
      typeIdsAlert: false,
      eyeMe: true,
    };
  },
  created() {
    this.typeIds = this.$route.params.typeIds;
    this.pathIds = this.$route.params.pathIds;
    if (this.pathIds) {
      this.pathIds.forEach((it) => {
        this.polylinePath.push({
          lng: it.location.split(",")[0],
          lat: it.location.split(",")[1],
        });
      });
      console.log(this.polylinePath);
    }
    // console.log(this.pathIds);
    if (this.typeIds) {
      this.queryResources();
    }
    this.specialSubject = this.$route.params.specialSubject;
    this.owner = this.$route.params.owner;
    // this.eyeTrueFalse()
  },
  methods: {
    mapPlaning(BMap, map) {
      this.$httpGet({
        url: "/api/mapPlaningByApp/query",
      }).then((res) => {
        console.log(res.data);
        this.map_data = res.data;
        this.map_data.forEach((it) => {
          it.mapPlaning = it.mapPlaning && JSON.parse(it.mapPlaning);
        });
        map && this.createPolygon(map);
      });
    },
    /**
     * 筛选资源数据
     */
    resource_selection(BMap, map) {
      // if (this.owner) {
      var _username = localStorage.getItem("username");
      // } else {
      //   _username = [];
      // }
      this.$httpGet({
        url: "/api/semGridding/selection",
        params: {
          owner: _username,
          // specialSubject: this.specialSubject,
        },
      }).then((res) => {
        console.log(res.data);
        this.map_data = res.data;
        this.map_data.forEach((it) => {
          it.mapPlaning = it.mapPlaning && JSON.parse(it.mapPlaning);
        });
        map && this.createPolygon(map);
      });
    },
    eyeTrueFalse() {
      if (this.eyeMe) {
        this.resource_selection();
      } else {
        this.mapPlaning();
      }
      this.eyeMe = !this.eyeMe
    },
    queryResources(BMap, map) {
      this.$httpGet({
        url: "/api/resourceType/query",
        params: {
          typeIds: this.typeIds,
        },
      }).then((res) => {
        console.log(res.data);
        this.typeIdsData = res.data;
        this.typeIdsData.forEach((it) => {
          it.mapPlaning = it.mapPlaning && JSON.parse(it.mapPlaning);
        });
        map && this.createPolygon(map);
        //创建infowindow
        map && this.createInfoWindow(map);
      });
    },
    createInfoWindow(map) {
      console.log(this.typeIdsData);
      map.centerAndZoom(new BMap.Point(114.664477, 33.640232), 15);
      var data_info = this.typeIdsData;
      var opts = {
        width: 250, // 信息窗口宽度
        height: 80, // 信息窗口高度
        title: "信息窗口", // 信息窗口标题
        enableMessage: true, //设置允许信息窗发送短息
      };
      for (var i = 0; i < data_info.length; i++) {
        var marker = new BMap.Marker(
          new BMap.Point(...data_info[i]["position"].split(","))
        ); // 创建标注
        map.addOverlay(marker); // 将标注添加到地图中
        const content = `
          <p style="padding-top: 1rem">姓名：${data_info[i]["name"]}</p>
          <p>类型：产品营销</p>
          <p>产品：特色存款</p>
          <p>目标：10万</p>
          <p>剩余日期：30天</p>
        `;
        addClickHandler(content, marker);
      }
      function addClickHandler(content, marker) {
        marker.addEventListener("click", function (e) {
          openInfo(content, e);
        });
      }
      function openInfo(content, e) {
        var p = e.target;
        var point = new BMap.Point(p.getPosition().lng, p.getPosition().lat);
        var infoWindow = new BMap.InfoWindow(content); // 创建信息窗口对象
        map.openInfoWindow(infoWindow, point); //开启信息窗口
      }
    },
    selfOverlayClick(data) {
      this.table = data;
      this.introduce = true;
    },
    showTypeIds(data) {
      console.log(data);
      this.typeIdsItem = { ...data };
      const positionArr =
        this.typeIdsItem.position && this.typeIdsItem.position.split(",");
      this.typeIdsItem.position = { lng: positionArr[0], lat: positionArr[1] };
      this.typeIdsAlert = true;
    },
    overlayClose() {
      this.introduce = false;
    },
    mapReady({ BMap, map }) {
      //添加多边形覆盖物
      if (this.specialSubject || this.owner) {
        this.resource_selection(BMap, map);
      } else if (this.typeIds) {
        this.queryResources(BMap, map);
      } else {
        this.mapPlaning(BMap, map);
      }
    },
    createPolygon(map) {
      // console.log(BMap);
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
    clickBack(item) {
      console.log(item);
      // debugger
      let _username = localStorage.getItem("username");
      if (item.principal == _username) {
        this.$httpPut({
          url: "/api/semGridding/return",
          params: {
            userName: _username,
            ids: item.id,
          },
        }).then((res) => {
          this.mapPlaning();
          // const index = this.map_data.findIndex((it) => it === item);
          // console.log(index);
          // console.log(this.polygonArr);
          // this.map_data.splice(index, 1)
          // this.polygonDl[index].setStrokeColor("#0FB38F");
          // this.mapCenter = {
          //   ...this.mapCenter,
          //   lat: this.mapCenter.lat + 0.001,
          // };
          // this.map.reset();
          this.introduce = false; //关闭弹窗
        });
      } else {
        Toast({
          message: "只有当前负责人可以归还",
          position: "middle",
        });
      }
    },
    clickClaim(item) {
      console.log(item);
      if (item.principalName) {
        Toast({
          message: "已分配的网格不允许认领",
          position: "middle",
        });
        return;
      }
      let _username = localStorage.getItem("username");
      this.$httpPut({
        url: "/api/semGridding/claim",
        params: {
          userName: _username,
          id: item.id,
        },
      }).then((res) => {
        this.mapPlaning();
        // const index = this.map_data.findIndex((it) => it.info === item);
        // this.polygonDl[index].setStrokeColor("#0FB38F");
        // this.mapCenter = {
        //   ...this.mapCenter,
        //   lat: this.mapCenter.lat + 0.001,
        // };
        this.introduce = false; //关闭弹窗
      });
    },
    showPopupSign(point) {
      this.isPopupVisibleSign = true;
      this.sign_position = `${point.lng},${point.lat}`;
      this.obtainDic();
    },
    draw({ el, BMap, map }) {
      if (this.table && this.table.position) {
        const position = {
          lng: this.table.position.split(",")[0],
          lat: this.table.position.split(",")[1],
        };
        const pixel = map.pointToOverlayPixel(
          new BMap.Point(position.lng, position.lat)
        );
        el.style.left = pixel.x - 60 + "px";
        el.style.top = pixel.y - 20 + "px";
      }
    },
    updatePolylinePath(e) {
      this.polylinePath = e.target.getPath();
    },
    onMarked_or_not(value) {
      this.marked_or_not_txt = value;
      this.marked_or_not = false;
    },
    onResource_type(value) {
      this.resource_type_txt = value;
      this.resource_type = false;
    },
    obtainDic() {
      this.$httpGet({
        url: "/dic/type/dic_grid_resource_type",
      }).then((res) => {
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
        this.isPopupVisibleSign = false;
      });
    },
  },
};
</script>


<style scoped lang='scss'>
@import url("./Grid.scss");
</style>