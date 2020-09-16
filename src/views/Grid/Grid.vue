<template>
  <div class="grid">
    <my-nav :title="title"></my-nav>
    <van-search v-model="value" placeholder="网格名称、客户名称、资源名称" />
    <div class="amap-page-container">
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
            <!-- <b>Hello {{ count }} times</b>
            <button @click="onClick">Add</button>-->
          </div>
        </el-amap-marker>
      </el-amap>
    </div>
    <my-tabbar></my-tabbar>
    <router-view />
  </div>
</template>

<script>
import MyNav from "../../components/Public/MyNav";
import MyTabbar from "../../components/Public/MyTabbar";
import men_heard from "../../assets/grid/men1.png";
import user_men from "../../assets/grid/user_men.svg";
export default {
  name: "Grid",
  components: {
    MyNav,
    MyTabbar,
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
  },
};
</script>


<style lang='scss'>
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

</style>