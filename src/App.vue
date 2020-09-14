<template>
  <div id="app">
    <div class="amap-page-container">
      <el-amap vid="amapDemo3" :center="center" :zoom="zoom" class="amap-demo">
        <el-amap-marker v-for="(marker, index) in markers" :key="index" :position="marker.position" :vid="index">
          <div :style="slotStyle">
            <b>Hello {{ count }} times</b>
            <button @click="onClick">Add</button>
          </div>
        </el-amap-marker>
      </el-amap>
    </div>
    <router-view />
  </div>
</template>


<script>
export default {
  data() {
    return {
      center: { lng: 0, lat: 0 },
      zoom: 3,
    };
  },
  methods: {
    handler({ BMap, map }) {
      console.log(BMap, map);
      this.center.lng = 116.404;
      this.center.lat = 39.915;
      this.zoom = 15;
    },
  },
  data: function () {
    let self = this;
    const center = [121.59996, 31.197646];

    return {
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
    };
  },

  methods: {
    onClick() {
      this.count += 1;
    },
  },

  created() {
    let self = this;
    let markers = [];
    let index = 0;

    let basePosition = [121.59996, 31.197646];
    let num = 10;

    for (let i = 0; i < num; i++) {
      markers.push({
        position: [basePosition[0], basePosition[1] + i * 0.03],
      });
    }
    this.markers = markers;
  },
};
</script>


<style lang='scss'>
.amap-page-container {
  .amap-demo {
    height: 500px;
  }
}
</style>