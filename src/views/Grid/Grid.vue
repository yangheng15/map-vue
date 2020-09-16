<template>
  <div class="grid">
    <my-nav :title="title"></my-nav>
    <van-search v-model="value" placeholder="网格名称、客户名称、资源名称" />
    <!-- <div class="amap-page-container">
      <el-amap vid="amapDemo3" :center="center" :zoom="zoom" class="amap-demo">
        <el-amap-polygon
          v-for="(polygon, index) in polygons"
          :key="index"
          :vid="index"
          :ref="`polygon_${index}`"
          fillOpacity="0"
          strokeStyle="dashed"
          strokeWeight="1"
          :strokeColor="polygon.strokeColor"
          :path="polygon.path"
          :events="polygon.events"
        ></el-amap-polygon>
        <el-amap-marker
          v-for="(marker, index) in markers_content"
          :key="index"
          :position="marker.position"
          :vid="index"
        >
          <div class="introduce_body">
            <img class="introduce_img" :src="marker.img" alt />
            <p v-if="marker.name" class="introduce_name">{{marker.name}}</p>
            <p :class="marker.name?'introduce_address':'introduce_address_lv'">{{marker.address}}</p>
          </div>
        </el-amap-marker>
      </el-amap>
    </div> -->
    <baidu-map
        class="bm-view"
        @ready="mapReady"
        :center="{lng:114.65, lat: 33.37}"
        :zoom="12"
        ak="YOUR_APP_KEY"
      >
        <!-- v-if="!this.$route.query.userId" -->
        <!-- 下面是右上线 -->
        <div>
          <bm-polygon
            v-for="(item,index) in polygon_line"
            :key="index"
            :path="item.polylinePath"
            :stroke-color="item.strokeColor"
            fillColor="transparent"
            strokeStyle="dashed"
            :stroke-weight="2"
            @lineupdate="updatePolylinePath"
          ></bm-polygon>
        </div>
        <template v-for="(item, index) in overlay_content1">
          <my-overlay
            :key="index"
            :show="item.show"
            :position="item.position"
            :data-val="JSON.stringify(item)"
            :name="item.name"
            :address="item.address"
            :img="item.img"
            ref="clickTouch"
            @touch="clickTouch(item)"
          ></my-overlay>
        </template>

        <!-- 弹出的介绍 -->
        <bm-overlay
          v-if="introduce"
          pane="labelPane"
          :class="{sample: true, active}"
          @mouseover.native="active = true"
          @mouseleave.native="active = false"
          @draw="draw"
        >
          <div class="Popup_introduce">
            <p class="pop_title">
              网格信息
              <img src="../../assets/grid/pop_close.svg" ref="imgCloseRef" @touch="overlayClick()" alt />
            </p>
            <div class="pop_content">
              <p>所属机构：{{table.branch}}</p>
              <p>网格经理：{{table.men}}</p>
              <p>认领日期：{{table.time}}</p>
              <p>客户数量：{{table.customer_num}}</p>
              <p>人口数量：{{table.population_num}}</p>
              <p>营销状态：{{table.state}}</p>
            </div>
            <div style="margin-top:1.5rem" class="save">
              <van-button
                style="margin-right:1rem;border-radius: 0.3rem;background:#DF0F0F"
                :data-id="table.id"
                :disabled="table.img"
                ref="claim"
                type="primary"
              >认领</van-button>
              <van-button
                style="border-radius: 0.3rem;background:#0FB38F"
                :data-id="table.id"
                :disabled="!table.img"
                ref="goback"
                type="primary"
              >归还</van-button>
            </div>
          </div>
        </bm-overlay>

        <!-- 下面是路径规划出来的图标-->
        <template v-for="(item,index) in label_line">
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
        <!-- 点击资源选择出现的图标 -->
        <!-- <template v-for="(item,index) in resources_img">
          <bm-marker
            :key="index"
            v-if="$route.query.taskChoice"
            :position="item.position"
            :icon="{url: item.img, size: {width: 50, height:50}}"
            @click="infoWindowOpen(item)"
          >
            <bm-info-window
              :show="showText"
              @close="infoWindowClose"
              @open="infoWindowOpen"
            >
              <p style="padding-top:1rem">姓名：{{item.name}}</p>
              <p>地址：{{item.address}}</p>
              <p>备注：{{item.remarks}}</p>
            </bm-info-window>
          </bm-marker>
        </template>-->
        <bm-marker
          v-if="$route.query.taskChoice"
          :position="{ lng: 114.625, lat: 33.4 }"
          :icon="{url: con3, size: {width: 50, height:50}}"
          @click="infoWindowOpen1"
        >
          <bm-info-window :show="showText1" @close="infoWindowClose1" @open="infoWindowOpen1">
            <p style="padding-top:1rem">姓名：卓越联腾企业贷客户拜访营销</p>
            <p>地址：学校</p>
            <p>备注：要去的学校</p>
          </bm-info-window>
        </bm-marker>
        <bm-marker
          v-if="$route.query.taskChoice"
          :position="{lng:114.66, lat: 33.305}"
          :icon="{url: con1, size: {width: 50, height: 50}}"
          @click="infoWindowOpen"
        >
          <bm-info-window
            style="left:1rem"
            :show="showText"
            @close="infoWindowClose"
            @open="infoWindowOpen"
          >
            <p style="padding-top:1rem">姓名：卓越联腾企业贷客户拜访营销</p>
            <p>类型：产品营销</p>
            <p>产品：特色存款</p>
            <p>目标：10万</p>
            <p>剩余日期：30天</p>
          </bm-info-window>
        </bm-marker>
        <bm-marker
          v-if="$route.query.taskChoice"
          :position="{lng:114.59, lat: 33.3}"
          :icon="{url: con4, size: {width: 50, height: 50}}"
          @click="infoWindowOpen2"
        >
          <bm-info-window
            style="left:1rem"
            :show="showText2"
            @close="infoWindowClose2"
            @open="infoWindowOpen2"
          >
            <p style="padding-top:1rem">姓名：卓越联腾企业贷客户拜访营销</p>
            <p>地址：小区</p>
            <p>备注：要去的小区</p>
          </bm-info-window>
        </bm-marker>
        <!-- 点击出现的标记 -->
        <bm-marker
          v-if="markerTure"
          @click="showPopupSign()"
          :dragging="true"
          :position="{lng:114.67, lat: 33.4}"
          :icon="{url: con2, size: {width: 60, height: 60}}"
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
        <p @click="$router.push('/grid/ResourceSelection/?title=资源选择')">
          <img src="../../assets/grid/resource.svg" alt />
        </p>
        <p @click="showMarker()">
          <img src="../../assets/grid/sign.svg" alt />
        </p>
        <!-- <p @click="showPopup()">
          <img src="../../assets/grid/distribution.svg" alt />
        </p>-->
        <p @click="$router.push('/grid/ResourceSelection/?title=路径规划')">
          <img src="../../assets/grid/path_planning.svg" alt />
        </p>
        <p @click="$router.push('/grid/ResourceSelection/?title=网格选择')">
          <img src="../../assets/grid/grid_filtering.svg" alt />
        </p>
      </div>
      <div v-show="isPopupVisibleSign" class="isPopupVisibleSign">
        <div class="isPopupVisibleSign_content">
          <p class="pop_title">地图标记</p>
          <div class="pop_content">
            <p style="display:flex;align-items: center;">
              <span class="pop_content_left" style>名称：</span>
              <input class="pop_content_right" style type="text" placeholder="单行输入" />
            </p>
            <p style="display:flex;align-items: center;">
              <span class="pop_content_left">电话：</span>
              <input class="pop_content_right" type="text" placeholder="单行输入" />
            </p>
            <p style="display:flex;align-items: center;">
              <span class="pop_content_left">地址：</span>
              <input class="pop_content_right" type="text" placeholder="单行输入" />
            </p>
            <p style="display:flex;align-items: center;">
              <span class="pop_content_left">标记：</span>
              <select
                style="border:0.05rem solid #bbb;width:75%;padding:0.3rem 0.5rem;background:#fff;border-radius:0.3rem;margin-top:0.5rem"
                name
                id
              >
                <option value="是">是</option>
                <option value="否">否</option>
              </select>
            </p>
            <p>
              <span style="display: block;line-height: 2rem;">备注：</span>
              <textarea
                name
                id
                cols="30"
                rows="10"
                style="border:0.05rem solid #bbb;width:98%;padding:0.3rem 0.5rem;height:4rem;border-radius:0.3rem"
                placeholder="单行输入"
              ></textarea>
            </p>
            <div style="margin-top:2rem" class="save">
              <button style="margin-right:1rem;border-radius: 0.3rem;" @click="closePopupSign()">保存</button>
              <button style="border-radius: 0.3rem;" @click="closePopupSign()">取消</button>
            </div>
          </div>
        </div>
      </div>
      <div v-show="isPopupVisible" class="isPopupVisibleSign">
        <div class="isPopupVisibleSign_content">
          <p class="pop_title">选择负责人</p>
          <div class="pop_content">
            <p style="position: relative;">
              <input
                style="border:0.05rem solid #bbb;width:100%;padding:0rem 2.5rem 0rem 0.5rem;border-radius: 0.3rem;"
                type="text"
                value="张南"
                placeholder="员工姓名"
              />
              <img
                style="position: absolute;right: 1rem;top: 18%;width: 1.3rem;"
                src="../../assets/grid/search.svg"
                alt
              />
            </p>
            <select
              style="border:0.05rem solid #bbb;width:100%;padding:0.3rem 0.5rem;background:#fff;border-radius:0.3rem;margin-top:0.5rem"
              name
              id
            >
              <option value="XXX支行">XXX支行</option>
              <option value="XXX支行">XXX支行</option>
            </select>
            <dl>
              <dt
                style="display: flex;background:#E6E3E3;border:0.05rem solid #bbb;justify-content: space-around;line-height:2rem;margin-top:1rem"
              >
                <p style="margin:0rem">员工号</p>
                <p style="margin:0rem">姓名</p>
              </dt>
              <dd
                style="display: flex;flex-flow: row;position: relative;align-items: center;height: 2rem;margin-top: 0.3rem;"
                v-for="(thisItem,index) in customer_pool_pop"
                :key="index"
              >
                <van-radio-group v-model="radio" style="height:1.5rem">
                  <van-radio :name="thisItem.id" style="width:100%;height:1.5rem">
                    <li
                      style="width:12rem;list-style-type:none;display: flex;justify-content: space-around;align-items: flex-end;"
                    >
                      <p style="margin:0rem;width:55%">{{thisItem.name}}</p>
                      <p style="margin:0rem;width:20%">{{thisItem.text}}</p>
                    </li>
                  </van-radio>
                </van-radio-group>
              </dd>
            </dl>
            <div style="margin-top:2rem" class="save">
              <button style="margin-right:1rem;border-radius: 0.3rem;" @click="closePopup()">确定</button>
              <button style="border-radius: 0.3rem;" @click="closePopup()">取消</button>
            </div>
          </div>
        </div>
      </div>
    <my-tabbar></my-tabbar>
    <router-view />
  </div>
</template>

<script>
import MyNav from "../../components/Public/MyNav";
import MyTabbar from "../../components/Public/MyTabbar";
import MyOverlay from "./MyOverlay";
import con from "../../assets/grid/red_flag.png";
import con_map1 from "../../assets/grid/red_flag1.png";
import con_map2 from "../../assets/grid/red_flag2.png";
import location_con from "../../assets/grid/location_map.svg";
import men_heard from "../../assets/grid/men1.png";
import user_men from "../../assets/grid/user_men.svg";
import pop_close from "../../assets/grid/pop_close.svg";
export default {
  name: "Grid",
  components: {
    MyNav,
    MyTabbar,
    MyOverlay,
  },
  data() {
    let self = this;
    const center = [114.65, 33.37];
    return {
      title: "网格",
      zoom: 12,
      center,
      markers: [],
      count: 0,
      slotStyle: {
        padding: "2px 8px",
        background: "#eee",
        color: "#333",
        border: "1px solid #aaa",
      },
      markers_content: [
        {
          id: 0,
          img: men_heard,
          name: "李晓燕",
          address: "金融街",
          position: [114.69, 33.39],
          grid_name: "金融街",
          branch: "金融街支行",
          men: "李晓燕",
          time: "2020-08-01",
          customer_num: "100",
          population_num: "10000",
          state: "3日内无营销",
          show: true,
        },
        {
          id: 1,
          img: user_men,
          name: "张松",
          address: "世纪广场",
          position: [114.58, 33.405],
          grid_name: "世纪广场",
          branch: "世纪广场支行",
          men: "张松",
          time: "2020-08-01",
          customer_num: "100",
          population_num: "10000",
          state: "6日内无营销",
          show: true,
        },
        {
          id: 2,
          address: "和平家园",
          position: [114.61, 33.3],
          grid_name: "和平家园",
          branch: "和平家园支行",
          men: "无",
          time: "2020-08-01",
          customer_num: "100",
          population_num: "10000",
          state: "6日内无营销",
          show: true,
        },
      ],
      polygons: [
        {
          path: [
            [114.73, 33.41],
            [114.74, 33.38],
            [114.7, 33.34],
            [114.66, 33.365],
            [114.68, 33.41],
          ],
          strokeColor: "#DF0F0F",
          events: {
            click: () => {
              alert("click polygon");
              //   console.log(amapManager.getComponent(0));
              console.log(this.$refs.map.$$getCenter());
              console.log(this.$refs.polygon_0[0].$$getPath());
            },
          },
        },
        {
          path: [
            [114.65, 33.41],
            [114.58, 33.35],
            [114.54, 33.39],
            [114.6, 33.43],
          ],
          strokeColor: "#DF0F0F",
          events: {
            click: () => {
              alert("click polygon");
              //   console.log(amapManager.getComponent(0));
              console.log(this.$refs.map.$$getCenter());
              console.log(this.$refs.polygon_0[0].$$getPath());
            },
          },
        },
        {
          path: [
            [114.67, 33.28],
            [114.6, 33.26],
            [114.56, 33.28],
            [114.62, 33.33],
            [114.66, 33.32],
          ],
          strokeColor: "#0FB38F",
          events: {
            click: () => {
              alert("click polygon");
              //   console.log(amapManager.getComponent(0));
              console.log(this.$refs.map.$$getCenter());
              console.log(this.$refs.polygon_0[0].$$getPath());
            },
          },
        },
      ],
      lalal: {},
      resources_img: [
        {
          position: { lng: 114.65, lat: 33.4 },
          img: con_map1,
          name: "卓越联腾企业贷客户拜访营销",
          address: "学校",
          remarks: "要去的学校",
        },
        {
          position: { lng: 114.66, lat: 33.305 },
          img: con,
          name: "卓越联腾企业贷客户拜访营销",
          address: "产品营销",
          remarks: "特色存款",
        },
        {
          position: { lng: 114.59, lat: 33.3 },
          img: con_map2,
          name: "卓越联腾企业贷客户拜访营销",
          address: "小区",
          remarks: "要去的小区",
        },
      ],
      table: {},
      polygon_line: [
        {
          polylinePath: [
            { lng: 114.73, lat: 33.41 },
            { lng: 114.74, lat: 33.38 },
            { lng: 114.7, lat: 33.34 },
            { lng: 114.66, lat: 33.365 },
            { lng: 114.68, lat: 33.41 },
          ],
          strokeColor: "#DF0F0F",
          bianxiaoshi: true,
        },
        {
          polylinePath: [
            { lng: 114.65, lat: 33.41 },
            { lng: 114.58, lat: 33.35 },
            { lng: 114.54, lat: 33.39 },
            { lng: 114.6, lat: 33.43 },
          ],
          strokeColor: "#DF0F0F",
          bianxiaoshi: true,
        },
        {
          polylinePath: [
            { lng: 114.67, lat: 33.28 },
            { lng: 114.6, lat: 33.26 },
            { lng: 114.56, lat: 33.28 },
            { lng: 114.62, lat: 33.33 },
            { lng: 114.66, lat: 33.32 },
          ],
          strokeColor: "#0FB38F",
          bianxiaoshi: true,
        },
      ],
      overlay_content1: [
        {
          id: 0,
          img: men_heard,
          name: "李晓燕",
          address: "金融街",
          position: { lng: 114.715, lat: 33.395 },
          grid_name: "金融街",
          branch: "金融街支行",
          men: "李晓燕",
          time: "2020-08-01",
          customer_num: "100",
          population_num: "10000",
          state: "3日内无营销",
          show: true,
        },
        {
          id: 1,
          img: user_men,
          name: "张松",
          address: "世纪广场",
          position: { lng: 114.6, lat: 33.403 },
          grid_name: "世纪广场",
          branch: "世纪广场支行",
          men: "张松",
          time: "2020-08-01",
          customer_num: "100",
          population_num: "10000",
          state: "6日内无营销",
          show: true,
        },
        {
          id: 2,
          address: "和平家园",
          position: { lng: 114.64, lat: 33.3 },
          grid_name: "和平家园",
          branch: "和平家园支行",
          men: "无",
          time: "2020-08-01",
          customer_num: "100",
          population_num: "10000",
          state: "6日内无营销",
          show: true,
        },
      ],
      label_line: [
        {
          content: "1",
          position: { lng: 114.705, lat: 33.415 },
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
          position: { lng: 114.635, lat: 33.385 },
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
          position: { lng: 114.685, lat: 33.325 },
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
          position: { lng: 114.595, lat: 33.37 },
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
          position: { lng: 114.645, lat: 33.435 },
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
          position: { lng: 114.678, lat: 33.422 },
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
          position: { lng: 114.608, lat: 33.393 },
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
          position: { lng: 114.658, lat: 33.333 },
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
          position: { lng: 114.568, lat: 33.379 },
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
          position: { lng: 114.618, lat: 33.443 },
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
      bianxiaoshi: true,
      showText: false,
      showText1: false,
      showText2: false,
      con1: con,
      con2: location_con,
      con3: con_map1,
      con4: con_map2,
      men: men_heard,
      men_user: user_men,
      close: pop_close,
      radio: "1",
      active: false,
      circlePath: {
        center: {
          lng: 114.65,
          lat: 33.37,
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
        { lng: 114.71, lat: 33.41 },
        { lng: 114.64, lat: 33.38 },
        { lng: 114.69, lat: 33.32 },
        { lng: 114.6, lat: 33.365 },
        { lng: 114.65, lat: 33.43 },
      ],
    };
  },
  created() {
    let self = this;
    let markers = [];
    let index = 0;
    let basePosition = [114.65, 33.37];
    let num = 10;

    for (let i = 0; i < num; i++) {
      markers.push({
        position: [basePosition[0], basePosition[1] + i * 0.03],
      });
    }
    this.markers = markers;
  },
  methods: {
    handler({ BMap, map }) {
      console.log(BMap, map);
      this.center.lng = 116.404;
      this.center.lat = 39.915;
      this.zoom = 15;
    },
    onClick() {
      this.count += 1;
    },
        clickTouch(item) {
      console.log(item);
      this.table = item;
      this.introduce = true;
      setTimeout(() => {
        if (this.$refs.imgCloseRef) {
          this.$refs.imgCloseRef.addEventListener("touchend", () => {
            this.overlayClick();
          });
          this.$refs.claim.addEventListener("touchend", () => {
            this.clickClaim();
          });
          this.$refs.goback.addEventListener("touchend", () => {
            this.clickBack(this.$refs.goback);
          });
        }
      }, 0);
    },
    overlayClick() {
      this.introduce = false;
    },
    chuxian(item) {
      setTimeout(() => {
        this.mapReady();
      }, 0);

      this.introduce = true;
    },
    mapReady() {
      // 解决移动端点击事件不生效问题
      let obj = {};
      if (this.$refs.clickTouch.length > 0) {
        this.$refs.clickTouch.forEach((el) => {
          el.$el.addEventListener("touchend", () => {
            this.clickTouch(JSON.parse(el.$el.getAttribute("data-val")));
          });
        });
      }
    },
    initialize({ el, BMap, map }) {
      map.addEventListener("click", (e) => {
        // 提前绑定事件: polygon.customClickHandler_ = function() {...}
        if (e.overlay && e.overlay.customClickHandler_) {
          e.overlay.customClickHandler_.call(e.overlay, e);
        }
      });
    },
    // infoWindowClose(e) {
    //   this.infoWindow.show = false;
    // },
    // infoWindowOpen(e) {
    //   this.infoWindow.show = true;
    // },
    clear() {
      this.infoWindow.contents = "";
    },
    showPopup() {
      this.isPopupVisible = true;
    },
    handleClick(item) {
      this.introduce = true;
    },
    clickBack(dom) {
      console.log(dom.getAttribute("data-id"));
      const id = dom.getAttribute("data-id");
      // const index = this.overlay_content1.findIndex(it => it.id === id)
      // console.log(index);
      this.overlay_content1[id].show = false;
      // this.polygon_line[id].strokeColor = '#DF0F0F'
      this.$set(this.polygon_line[id], "strokeColor", "#DF0F0F");
      console.log(this.polygon_line);
      // var keyMap = {
      //   name: "newName",
      //   img: "newImg",
      // };
      // for (var i = 0; i < this.overlay_content1.length; i++) {
      //   var obj = this.overlay_content1[i];
      //   for (var key in obj) {
      //     var newKey = keyMap[key];
      //     if (newKey) {
      //       obj[newKey] = obj[key];
      //       delete obj[key];
      //     }
      //   }
      // }
      // console.log(this.overlay_content1);
      this.introduce = false;
    },
    clickClaim() {
      this.introduce = false;
    },
    closePopup() {
      this.isPopupVisible = false;
    },
    showPopupSign() {
      this.isPopupVisibleSign = true;
    },
    closePopupSign() {
      this.isPopupVisibleSign = false;
    },
    showMarker() {
      this.markerTure = true;
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
      const pixel = map.pointToOverlayPixel(new BMap.Point(114.65, 33.35));
      el.style.left = pixel.x - 60 + "px";
      el.style.top = pixel.y - 20 + "px";
    },
    draw2(position) {
      const pixel = map.pointToOverlayPixel(new BMap.Point(114.75, 33.9));
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
  },
};
</script>


<style scoped lang='scss'>
.grid{
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
  top: -11rem;
  left: -5rem;
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
  text-align: center;
  padding-bottom: 2rem;
}
.save button {
  border: 0.05rem solid #bbb;
  background: rgb(61, 66, 94);
  color: #fff;
  width: 6rem;
  height: 2rem;
  border-radius: 0.3rem;
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