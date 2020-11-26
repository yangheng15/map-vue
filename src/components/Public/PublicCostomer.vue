<template>
  <div class="public_nav">
    <van-nav-bar left-arrow @click-left="onClickLeft" :title="title">
      <template #right>
        <router-link
          class="share"
          :to="{ name: 'Remind', query: { title: '提醒' } }"
        >
          分享
        </router-link>
      </template>
    </van-nav-bar>
  </div>
</template>

<script>
export default {
  name: "PublicCostomer",
  props: ["title"],
  data() {
    return {};
  },
  methods: {
    onClickLeft() {
      this.$router.go(-1);
    },
  },
};
</script>
<style scoped>
.public_nav {
  position: fixed;
  width: 100%;
  top: 0;
  left: 0;
  z-index: 1000000;
}
.van-icon {
  font-size: 20px;
}
.van-nav-bar {
  background-color: rgb(61, 66, 94);
}
.van-nav-bar >>> .van-nav-bar__title {
  color: #ffffff !important;
  font-size: 16px;
  font-weight: 600;
}
.van-nav-bar__right img {
  width: 20px;
}
.share {
  color: #fff;
  font-weight: 600;
}
.van-nav-bar >>> .van-icon {
  color: #fff;
}
</style>
