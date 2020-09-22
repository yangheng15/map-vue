<template>
  <div class="remind">
    <child-nav :title="title"></child-nav>
    <van-dropdown-menu>
      <van-dropdown-item v-model="value1" :options="option1" />
      <van-dropdown-item v-model="value2" :options="option2" />
    </van-dropdown-menu>
    <div v-for="(item,index) in recent_contact" :key="index" class="latest_tasks">
      <ul>
        <li style="font-weight:550">{{item.name1}}</li>
        <li class="set_up">{{item.set_up}}</li>
        <li>{{item.date}}</li>
      </ul>
      <ul>
        <li>{{item.name2}}</li>
      </ul>
    </div>
    <van-divider :style="{ borderColor: '#fff' }">已加载完毕</van-divider>
  </div>
</template>
<script>
import ChildNav from "../../components/Public/ChildNav";
export default {
  name: "Remind",
  components: {
    ChildNav,
  },
  data() {
    return {
      title: "提醒",
      recent_contact: [
        {
          name1: "网格分配",
          set_up: "设为未读",
          name2: "有新的网格分配给您，网格名称：XXXXX",
          date: "2020-09-09 15:00",
        },
        {
          name1: "生日提醒",
          set_up: "设为未读",
          name2: "客户张三将于2020-09-15（10天后）过生日",
          date: "2020-09-09 15:00",
        },
      ],
      value1: 0,
      value2: "a",
      option1: [
        { text: "生日提醒", value: 0 },
        { text: "理财到期", value: 1 },
        { text: "网格分配", value: 2 },
        { text: "任务分配", value: 3 },
        { text: "工作提醒", value: 4 },
      ],
      option2: [
        { text: "已读", value: "a" },
        { text: "未读", value: "b" },
      ],
    };
  },
};
</script>
<style scoped>
.remind{
  padding-top: 46px;
}
.latest_tasks {
  margin: 0px;
  padding: 7px;
  background: #fff;
  border-bottom: 1px solid #e8e8e8;
}
.latest_tasks ul {
  display: flex;
  justify-content: space-between;
  margin: 7px;
}
.latest_tasks ul li {
  font-size: 14px;
}
.set_up {
  color: #1432e3;
}
.van-dropdown-menu >>> .van-dropdown-menu__bar{
  box-shadow:none;
  border-bottom: 1px solid #e8e8e8;
}
@media screen and (min-width: 320px) and (max-width: 374px) {
  .latest_tasks ul li {
    font-size: 13px;
  }
}
</style>
