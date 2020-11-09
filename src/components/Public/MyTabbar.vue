<template>
  <div style="padding-top:50px">
    <van-tabbar v-model="active" route active-color="rgb(61, 66, 94)">
      <van-tabbar-item replace to="/grid">
        <span>网络</span>
        <template #icon="props">
          <img :src="props.active ? grid.active : grid.inactive" />
        </template>
      </van-tabbar-item>
      <van-tabbar-item replace to="/task">
        <span>任务</span>
        <template #icon="props">
          <img :src="props.active ? tasks.active : tasks.inactive" />
        </template>
      </van-tabbar-item>
      <van-tabbar-item replace to="/home">
        <span>首页</span>
        <template #icon="props">
          <img :src="props.active ? home.active : home.inactive" />
        </template>
      </van-tabbar-item>
      <van-tabbar-item replace to="/workBench">
        <span>工作台</span>
        <template #icon="props">
          <img :src="props.active ? calendar.active : calendar.inactive" />
        </template>
      </van-tabbar-item>
      <van-tabbar-item replace to="/user">
        <span>我</span>
        <template #icon="props">
          <img :src="props.active ? user.active : user.inactive" />
        </template>
      </van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>
// import { Button } from 'vant';
import on_grid from "../../assets/images/on_grid.svg";
import on_tasks from "../../assets/images/on_tasks.svg";
import on_home from "../../assets/images/on_home.svg";
import on_calendar from "../../assets/images/on_calendar.svg";
import on_user from "../../assets/images/on_user.svg";
import grid from "../../assets/images/grid.svg";
import tasks from "../../assets/images/tasks.svg";
import home from "../../assets/images/home.svg";
import calendar from "../../assets/images/calendar.svg";
import user from "../../assets/images/user.svg";
export default {
  name: "MyTabbar",
  //   props:['title'],
  data() {
    return {
      active: 0,
      grid: {
        active: on_grid,
        inactive: grid,
      },
      tasks: {
        active: on_tasks,
        inactive: tasks,
      },
      home: {
        active: on_home,
        inactive: home,
      },
      calendar: {
        active: on_calendar,
        inactive: calendar,
      },
      user: {
        active: on_user,
        inactive: user,
      },
      index: 0,
      temp: Date.now(),
    };
  },
};
</script>
<style scoped>
.van-tabbar-item__icon img {
  height: 25px;
}
.van-tabbar {
  height: 55px;
  z-index: 100000000;
}
</style>
