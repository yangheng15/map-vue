<template>
  <div class="public_nav">
    <van-nav-bar :title="title">
      <template #right>
        <img @click="$router.push('/remind')" src="../../assets/images/remind.svg" alt />
      </template>
    </van-nav-bar>
  </div>
</template>

<script>
export default {
  name: "CustomNav",
  props:['title'],
  data () {
    return{}
  }
};
</script>
<style scoped>
.van-nav-bar {
  background-color: rgb(61, 66, 94);
}
.van-nav-bar >>> .van-nav-bar__title {
  color: #ffffff !important;
  font-size: 16px;
  font-weight: 600;
}
</style>
