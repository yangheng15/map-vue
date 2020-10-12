<template>
  <bm-overlay v-if="position" ref="customOverlay" :class="{sample: true, active}" pane="labelPane" @draw="draw">
    <div class="introduce_content" @touchstart="registerEvent">
      <!-- <img v-if="show" class="introduce_img" :src="img" alt /> -->
      <p :class="name ?'introduce_address':'introduce_address_lv'">{{address}}</p>
      <p v-if="name" class="introduce_name">{{name}}</p>
    </div>
    <!-- <div v-text="text" @click="handleClick"></div> -->
  </bm-overlay>
</template>

<script>
export default {
  props: ["position", "active", "name", "address", "img", "show", "touchEvent"],
  methods: {
    registerEvent() {
      this.$emit('touchEvent');
    },
    draw({ el, BMap, map }) {
      if(!this.position) {
        return;
      }
      const { lng, lat } = {lng: this.position.split(',')[0], lat: this.position.split(',')[1]};
      const pixel = map.pointToOverlayPixel(new BMap.Point(lng, lat));
      el.style.left = pixel.x - 60 + "px";
      el.style.top = pixel.y - 20 + "px";
    },
  },
};
</script>

<style>
.sample {
  position: absolute;
}
.sample.active {
  background: rgba(0, 0, 0, 0.75);
  color: #fff;
}
.introduce_content {
  text-align: center;
  width: 6rem;
  /* height: 5rem; */
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
}
.introduce_content .introduce_img {
  width: 1.8rem;
  border-radius: 100%;
  /* width: 100%; */
}
.introduce_content .introduce_name {
  color: #fff;
  font-size: 0.8rem;
  font-weight: 600;
  width: 95px;
  height: 1.5rem;
  line-height: 1.5rem;
  background: #df0f0f;
  text-align: center;
  border: none;
  margin: 0rem;
  /* width: 100%; */
}
.introduce_content .introduce_address {
  box-sizing: border-box;
  color: #df0f0f;
  font-size: 0.8rem;
  font-weight: 600;
  width: 95px;
  height: 1.5rem;
  line-height: 1.5rem;
  text-align: center;
  background: transparent;
  border:2px solid #df0f0f;
  /* width: 100%; */
  margin: 0rem;
}
.introduce_content .introduce_address_lv {
  color: #0FB38F;
  font-size: 0.8rem;
  font-weight: 600;
  /* width: 4rem; */
  height: 1.5rem;
  line-height: 1.5rem;
  background: #fff;
  /* width: 100%; */
  text-align: center;
  border: 0.01rem solid #0FB38F;
}
</style>