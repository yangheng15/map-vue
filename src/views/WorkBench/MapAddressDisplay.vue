<template>
  <div class="MapAddressDisplay">
    <child-nav :title="typeCN"></child-nav>
    <div v-if="typeCN=='地址'">
      <baidu-map class="map" :center="{lng:locationLng, lat: locationLat}" :zoom="14" ak="WjS3NqjeiRpXVIQiWp2WiHhFyEcYz90e">
       <bm-marker :position="{lng:locationLng, lat: locationLat}" :dragging="false" animation="BMAP_ANIMATION_BOUNCE">
      <bm-label :content="custName" :labelStyle="{color: 'red', fontSize : '15px',padding:'1px 10px'}" :offset="{width: -25, height: 30}"/>
    </bm-marker>
      </baidu-map>
    </div>
  </div>
</template>
<script>
import ChildNav from "../../components/Public/ChildNav";
export default {
  name: "MapAddressDisplay",
  components: {
    ChildNav,
  },
  data() {
    return {
      title: "",
      typeCN: "",
      locationLng:"",
      locationLat:"",
      custName:""
    }
  },
  created() {
    this.typeCN = this.$route.query.title;
    this.location = this.$route.query.location;
    this.custName = this.$route.query.custName;
    this.locationLng=this.location.split(",")[0]
    this.locationLat=this.location.split(",")[1]
  },
  updated() {},
  methods: {},
};
</script>
<style scoped>
.MapAddressDisplay {
  padding-top: 46px;
}
.map {
  width: calc(100%);
  height: 93vh;
}
</style>
