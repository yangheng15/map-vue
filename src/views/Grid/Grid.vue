<template>
  <div class="grid">
    <my-nav title="网格"></my-nav>
    <van-search v-model="searchVal" placeholder="网格名称、客户名称" />
    <van-popup
      v-model="showPopup"
      position="middle"
      round
      :closeable="true"
      :style="{ width: '80%', marginLeft: '10%', borderRadius: '5%' }"
    >
      <resource-selection @resourceEmit="resourceEmit" />
    </van-popup>
    <van-popup v-model="introduce">
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
          <p>客户数量：{{ table.recordsNum }}</p>
          <p>人口数量(万人)：{{ table.population }}</p>
          <p>营销状态：{{ table.marketStatus }}</p>
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
    </van-popup>
    <baidu-map
      class="bm-view"
      @ready="mapReady"
      :center="mapCenter"
      :zoom="zoomNum"
      ak="vqUYjlHbtsD2ZGmYXYMuHVvve6SvtHX6"
    >
      <!-- 网格经理网格名称 -->
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

      <!-- 资源类型网格 -->
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
      <!-- <bm-marker
        :position="{ lng: 114.66083033789431, lat: 33.62595722378967 }"
        :dragging="true"
        animation="BMAP_ANIMATION_BOUNCE"
      > -->
      <!-- </bm-marker> -->
      <!-- 弹窗 -->
      <!-- <bm-overlay
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
      </bm-overlay> -->

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
        :zIndex="999"
        v-if="markerTure"
        @click="showPopupSign(markerPostion)"
        :dragging="true"
        :position="markerPostion"
        @dragend="markerDragend"
        :icon="{
          url: require('../../assets/grid/sign.svg'),
          size: { width: 30, height: 30 },
        }"
      ></bm-marker>
      <!-- ../../assets/grid/location_map.svg -->
      <!-- 🚩红旗 -->
      <template>
        <bm-marker
          v-for="(item, index) in redFlagPostionArr"
          :dragging="false"
          :position="item.postion"
          :key="index + 'flag'"
          :icon="{
            url: require('../../assets/grid/flag.svg'),
            size: { width: 30, height: 30 },
          }"
        >
          <bm-label
            :content="item.name"
            :labelStyle="{ color: 'red', fontSize: '14px' }"
            :offset="{ width: -35, height: 30 }"
          />
        </bm-marker>
      </template>

      <!-- 右下角定位的图标 -->
      <!-- <bm-geolocation
        anchor="BMAP_ANCHOR_BOTTOM_RIGHT"
        :showAddressBar="true"
        :autoLocation="true"
      ></bm-geolocation> -->
    </baidu-map>
    <!-- 搜索框 -->

    <!-- 右侧图标 -->
    <div class="resource map_marker">
      <p @click="showPopup = true">
        <img src="../../assets/grid/resource.svg" alt />
      </p>
      <p @click="showMarkerToast">
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
      <!-- <p>
        <img src="../../assets/grid/surroundingCustomers.svg" alt />
        <img
          v-show="false"
          src="../../assets/grid/surroundingCustomers.svg"
          alt
        />
      </p> -->
      <p @click="appMessage">
        <img src="../../assets/grid/current_location.svg" alt />
      </p>
    </div>

    <div v-show="isPopupVisibleSign" class="isPopupVisibleSign">
      <van-form class="isPopupVisibleSign_content" @submit="onSubmit">
        <p class="pop_title">地图标记</p>
        <van-field
          v-model="signData.sign_name"
          name="name"
          label="名称："
          placeholder="单行输入"
          :rules="[{ required: true, message: '请填写名称' }]"
        />
        <van-field
          v-model="signData.sign_phone"
          name="telphone"
          label="电话："
          placeholder="单行输入"
        />
        <van-field
          v-model="signData.sign_address"
          name="address"
          label="地址："
        />
        <van-field
          disabled
          v-model="signData.sign_position"
          name="position"
          label="位置："
          placeholder="单行输入"
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
        <!-- <van-field
          readonly
          clickable
          name="picker"
          :value="signData.marked_or_not_txt"
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
        </van-popup> -->
        <van-field
          v-model="signData.sign_remarks"
          rows="2"
          name="description"
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
import { Toast, Dialog } from "vant";
import resourceSelection from "./ResourceSelection";
export default {
  name: "Grid",
  components: {
    MyNav,
    MyOverlay,
    myTabbar,
    resourceSelection,
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
      signData: {
        sign_name: "",
        sign_phone: "",
        sign_address: "",
        marked_or_not_txt: "",
        sign_remarks: "",
        sign_position: "",
      },
      marked_or_not_list: ["是", "否"],
      marked_or_not: false,
      resource_type_txt: "",
      resource_type_list: [],
      resource_type: false,
      markerPostion: { lng: 114.655, lat: 33.63 },
      filterData: [],
      map: null,
      typeIds: "",
      specialSubject: "",
      pathIds: "",
      typeIdsData: [],
      typeIdsItem: {},
      typeIdsAlert: false,
      eyeMe: true,
      redFlagPostionArr: [],
      showPopup: false,
      markerArr: [],
      locationLng: "",
      locationLat: "",
      zoomNum: 15,
      positionMarker: null,
    };
  },
  created() {
    this.pathIds = this.$route.params.pathIds;
    if (this.pathIds) {
      this.pathIds.forEach((it) => {
        this.polylinePath.push({
          lng: it.location.split(",")[0],
          lat: it.location.split(",")[1],
        });
      });
    }
    this.specialSubject = this.$route.params.specialSubject;
    this.owner = this.$route.params.owner;
    // this.eyeTrueFalse()
    window.deleteBut = this.deleteBut;
    window.dic_grid_resource_type = this.dic_grid_resource_type;
  },
  methods: {
    createMarker(position) {
      if (this.positionMarker) {
        this.map.removeOverlay(this.positionMarker);
      }
      this.positionMarker = new BMap.Marker(new BMap.Point(...position)); // 创建标注
      this.map.addOverlay(this.positionMarker); // 将标注添加到地图中
    },
    appMessage() {
      var u = navigator.userAgent;
      //Android终端
      var isAndroid = u.indexOf("Android") > -1 || u.indexOf("Adr") > -1;
      //iOS终端
      var isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/);
      if (isAndroid) {
        if(window.android.getLocation() != false){
        let positionArr = window.android.getLocation().split(",");
        if(positionArr[0] === this.mapCenter.lng && positionArr[1] === this.mapCenter.lat) {// 如果当前的 中心点和之前的中心点一样
          this.mapCenter = { lng: positionArr[0], lat: positionArr[1]+0.001 }; //直接将中心点回传不生效，需要稍微改动一下中心点
          return
        }
        // let positionArr = [124.281873, 45.514322]
        this.mapCenter = { lng: positionArr[0], lat: positionArr[1] };
        this.zoomNum = 16;
        this.createMarker(positionArr);
        }
      }
      if (isiOS) {
        if (window.prompt("getLocation") != false) {
          let positionArr = window.prompt("getLocation").split(",");
          // let positionArr = [124.281873, 45.514322];
          // debugger
          if(positionArr[0] === this.mapCenter.lng && positionArr[1] === this.mapCenter.lat) {// 如果当前的 中心点和之前的中心点一样
            this.mapCenter = { lng: positionArr[0], lat: positionArr[1]+0.001 }; //直接将中心点回传不生效，需要稍微改动一下中心点
            return
          }
          this.mapCenter = { lng: positionArr[0], lat: positionArr[1] };
          // this.map.setCenter({ lng: positionArr[0], lat: positionArr[1] })
          this.zoomNum = 16;
          this.createMarker(positionArr);
        }
      }
      this.markerPostion = {...this.mapCenter};
    },
    resourceEmit(data) {
      this.typeIds = data.typeIds;
      if (this.typeIds) {
        this.map.clearOverlays();
        this.typeIdsData = [];
        this.queryResources();
      }
      this.showPopup = false;
    },
    mapPlaning() {
      this.$httpGet({
        url: "/api/mapPlaningByApp/query",
      }).then((res) => {
        this.map_data = res.data;
        this.map_data.forEach((it) => {
          it.mapPlaning = it.mapPlaning && JSON.parse(it.mapPlaning);
        });
        this.polygonDl.forEach((it) => {
          this.map.removeOverlay(it);
        });
        this.createPolygon(this.map);
      });
    },
    /**
     * 筛选资源数据
     */
    resource_selection(BMap, map) {
      var _username = localStorage.getItem("username");
      this.$httpGet({
        url: "/api/semGridding/selection",
        params: {
          owner: _username,
        },
      }).then((res) => {
        const arr = [
          {
            position: "114.67031644407975,33.6463360959123",
          },
          {
            position: "114.6535001649329,33.62836207529424",
          },
          {
            postion: "114.65069745174183,33.63046616699806",
          },
        ];
        this.polygonDl.forEach((it) => {
          this.map.removeOverlay(it);
        });
        res.data.forEach((it) => {
          it.mapPlaning = it.mapPlaning && JSON.parse(it.mapPlaning);
        });
        this.map_data = res.data;
        this.createPolygon(this.map);
      });
    },
    eyeTrueFalse() {
      if (this.eyeMe) {
        Toast({
          message: "当前展示我认领的网格",
          position: "middle",
        });
        this.resource_selection();
      } else {
        this.mapPlaning();
      }
      this.eyeMe = !this.eyeMe;
    },
    queryResources() {
      this.$httpGet({
        url: "/api/resourceType/query",
        params: {
          typeIds: this.typeIds,
        },
      }).then((res) => {
        this.typeIdsData = res.data;
        this.typeIdsData.forEach((it) => {
          it.mapPlaning = it.mapPlaning && JSON.parse(it.mapPlaning);
        });
        this.createPolygon(this.map);
        //创建infowindow
        this.createInfoWindow(this.map);
      });
    },
    createInfoWindow(map, data) {
      map.centerAndZoom(new BMap.Point(114.664477, 33.640232), 15);
      var data_info = data || this.typeIdsData;
      var opts = {
        width: 250, // 信息窗口宽度
        height: 80, // 信息窗口高度
        title: "信息窗口", // 信息窗口标题
        enableMessage: true, //设置允许信息窗发送短息
        offset: { width: -25, height: 30 },
      };
      for (var i = 0; i < data_info.length; i++) {
        var marker = new BMap.Marker(
          new BMap.Point(...data_info[i]["position"].split(","))
        ); // 创建标注
        const markerInstance = map.addOverlay(marker); // 将标注添加到地图中
        data || this.markerArr.push(marker); //data存在说明执行的是添加，并不是筛选后的操作不需要把实例添加到数组中
        const content = `
          <p style="margin-top: 0rem">名称：${data_info[i]["name"]}</p>
          <p>电话：${data_info[i]["telphone"]}</p>
          <p>地址：${data_info[i]["address"]}</p>
          <p>坐标：${data_info[i]["position"]}</p>
          <p>资源类型：${dic_grid_resource_type(data_info[i]["type"])}</p>
          <p>备注：${data_info[i]["description"]}</p>
          <p class="deleteBut" onclick="deleteBut('${i}')">删除</p>
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
    deleteBut(index) {
      Dialog.confirm({
        title: "你确定删除吗",
      })
        .then(() => {
          this.$httpDelete({
            url: "/api/semResource/delete",
            params: {
              ids: this.typeIdsData[index]["id"],
            },
          })
            .then((res) => {
              this.map.removeOverlay(this.markerArr[index]);
              this.typeIdsData.splice(index, 1);
              // this.map.removeOverlay(this.markerArr[index])
              this.map.closeInfoWindow();
              // this.map.clearOverlays();
              // Toast({
              //   message: "删除成功",
              //   position: "middle",
              // });
              // this.createInfoWindow(this.map);
              // this.queryResources();
            })
            .catch(() => {});
        })
        .catch(() => {});
    },
    dic_grid_resource_type(val) {
      const findWill = JSON.parse(localStorage.getItem("dicGridResource")).find(
        (it) => +it.key == val
      );
      return findWill ? findWill.value : "";
    },
    selfOverlayClick(data) {
      this.table = data;
      this.introduce = true;
    },
    showTypeIds(data) {
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
      this.map = map;
      //添加多边形覆盖物
      if (this.specialSubject || this.owner) {
        this.resource_selection(BMap, map);
      } else {
        this.mapPlaning(BMap, map);
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
                fillColor: line.fillColor,
              }
            )
          );
      });
      polygonArr.forEach((polygon) => map.addOverlay(polygon));
      this.polygonDl = polygonArr;
    },
    markerDragend({ point }) {
      this.markerPostion = point;
    },
    clickBack(item) {
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
    showMarkerToast() {
      Toast({
        message: "拖拽图标标记位置",
        position: "middle",
      });
      this.markerTure = true;
    },
    showPopupSign(point) {
      this.isPopupVisibleSign = true;
      this.signData.sign_position = `${point.lng},${point.lat}`;
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
      this.signData.marked_or_not_txt = value;
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
      //显示红旗
      this.markerTure = false;
      const posArr = this.signData.sign_position.split(",");
      this.redFlagPostionArr.push({
        ...values,
        postion: { lng: posArr[0], lat: posArr[1] },
      });
      this.createInfoWindow(this.map, [values]);

      const code = this.filterData.find(
        (it) => it.codeText === this.resource_type_txt
      )["code"];
      this.$httpPost({
        url: "/api/semResource/add",
        headers: {
          token: this.token,
        },
        data: {
          name: this.signData.sign_name,
          telphone: this.signData.sign_phone,
          address: this.signData.sign_address,
          // mark: this.signData.marked_or_not_txt,
          description: this.signData.sign_remarks,
          type: code,
          position: this.signData.sign_position,
        },
      }).then((res) => {
        this.isPopupVisibleSign = false;
        this.signData = {};
        this.markerPostion = { lng: 114.655, lat: 33.625 };
      });
    },
  },
  filters: {
    dic_grid_resource_type(val) {
      const findWill = JSON.parse(localStorage.getItem("dicGridResource")).find(
        (it) => +it.key == val
      );
      return findWill ? findWill.value : "";
    },
  },
};
</script>


<style scoped lang='scss'>
@import url("./Grid.scss");
</style>