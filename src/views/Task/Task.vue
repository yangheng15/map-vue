<template>
  <div class="task">
    <my-nav :title="title"></my-nav>
    <div class="tabTitle">
      <ul class="tabList">
        <li @click="tab(0)" :class="tabId == 0 ? 'cur' : 'ordinary'">新任务</li>
        <li @click="tab(1)" :class="tabId == 1 ? 'cur' : 'ordinary'">已结束</li>
        <li @click="tab(2)" :class="tabId == 2 ? 'cur' : 'ordinary'">待评价</li>
      </ul>
      <div v-show="tabId === 0">
        <router-link
          v-for="(thisItem, index) in new_task"
          :key="index"
          class="right_content"
          tag="div"
          :to="{
            name: 'MissionDetails',
            query: { title: '任务详情', id: thisItem.id },
          }"
        >
          <div class="new_task">
            <p style="font-weight: 550">{{ thisItem.name }}</p>
            <p :class="thisItem.status == 1 ? 'teshu' : 'teshu2'">
              {{ thisItem.targetNum }}万
            </p>
            <p>创建日期：{{ thisItem.beginTime | transform }}</p>
          </div>
          <div class="new_task">
            <p>{{ thisItem.productCode }}</p>
            <p :class="thisItem.sf_state == 1 ? 'teshu' : 'teshu2'">
              剩余{{ thisItem.remainingDays }}天
            </p>
            <p>截止日期：{{ thisItem.endTime | transform }}</p>
          </div>
        </router-link>
        <van-divider :style="{ borderColor: '#fff' }">已加载完毕</van-divider>
      </div>
      <div v-show="tabId === 1">
        <router-link
          v-for="(thisItem, index) in new_task1"
          :key="index"
          class="right_content success_failure"
          tag="div"
          :to="{
            name: 'MissionDetails',
            query: { title: '任务详情', id: thisItem.id },
          }"
        >
          <div class="new_task">
            <p style="font-weight: 550">{{ thisItem.name }}</p>
            <p style="text-align: center !important">
              {{ thisItem.targetNum }}万
            </p>
            <p>创建日期：{{ thisItem.beginTime | transform }}</p>
          </div>
          <div class="new_task">
            <p>{{ thisItem.productCode }}</p>
            <p>截止日期：{{ thisItem.endTime | transform }}</p>
          </div>
          <van-tag
            v-if="thisItem.status == 1"
            class="status_success"
            color="#DF0F0F"
            plain
            size="large"
            >完成</van-tag
          >
          <van-tag
            v-if="thisItem.status == 2"
            class="status_success"
            color="#201F25"
            plain
            size="large"
            >失败</van-tag
          >
        </router-link>
        <van-divider :style="{ borderColor: '#fff' }">已加载完毕</van-divider>
      </div>
      <div v-show="tabId === 2">
        <router-link
          v-for="(thisItem, index) in new_task2"
          :key="index"
          tag="div"
          :to="{
            name: 'MissionDetails',
            query: { title: '任务详情', id: thisItem.id },
          }"
          class="right_content"
        >
          <div class="new_task">
            <p style="font-weight: 550">{{ thisItem.name }}</p>
            <p :class="thisItem.sf_state == 1 ? 'teshu' : 'teshu2'">
              {{ thisItem.targetNum }}万
            </p>
            <p>创建日期：{{ thisItem.beginTime | transform }}</p>
          </div>
          <div class="new_task">
            <p>{{ thisItem.productCode }}</p>
            <p :class="thisItem.sf_state == 1 ? 'teshu' : 'teshu2'">已过期</p>
            <p>截止日期：{{ thisItem.endTime | transform }}</p>
          </div>
        </router-link>
        <van-divider :style="{ borderColor: '#fff' }">已加载完毕</van-divider>
      </div>
    </div>
    <my-tabbar></my-tabbar>
  </div>
</template>
<script>
import MyNav from "../../components/Public/MyNav";
import MyTabbar from "../../components/Public/MyTabbar";
import moment from "moment";

export default {
  name: "Task",
  components: {
    MyNav,
    MyTabbar,
  },
  data() {
    return {
      title: "任务",
      tabId: 0,
      show1: false,
      show2: false,
      show3: false,
      value1: "",
      value2: "",
      value3: "",
      new_task: [],
      new_task1: [],
      new_task2: [],
    };
  },
  created() {
    this.queryNewTask();
  },
  methods: {
    tab(ev) {
      this.tabId = ev;
      localStorage.setItem("indexTabId", this.tabId);
      if (ev == 1) {
        let _username = localStorage.getItem("username");
        this.$httpGet({
          url: "/api/semTasks/appEndTask",
          params: {
            userName: _username,
            limit: 10,
            page: 1,
          },
        }).then((res) => {
          // console.log(res.data);
          this.new_task1 = res.data;
        });
      }
      if (ev == 2) {
        let _username = localStorage.getItem("username");
        this.$httpGet({
          url: "/api/semTasks/appValuateTasks",
          params: {
            userName: _username,
            limit: 10,
            page: 1,
          },
        }).then((res) => {
          // console.log(res.data);
          this.new_task2 = res.data;
        });
      }
    },
    queryNewTask() {
      let _username = localStorage.getItem("username");
      this.$httpGet({
        url: "/api/semTasks/appNewTask",
        params: {
          userName: _username,
          limit: 10,
          page: 1,
        },
      }).then((res) => {
        // console.log(res.data);
        this.new_task = res.data;
      });
    },
  },
  filters: {
    transform(val) {
      if (val) {
        return moment(val).format("YYYY-MM-DD");
      }
    },
  },
};
</script>
<style scoped>
.tabTitle {
  width: 100%;
}
.tabList {
  display: flex;
  padding: 0px 15px;
  justify-content: space-between;
  height: 50px;
  width: calc(100% - 30px);
  line-height: 50px;
  background: #fff;
  border-bottom: 1px solid #e8e8e8;
  font-size: 14px;
}
.task {
  padding-top: 46px;
}
.teshu {
  text-align: center !important;
  width: 33% !important;
  color: #df0f0f !important;
}
.teshu2 {
  text-align: center !important;
  width: 33% !important;
  color: #0fb38f !important;
}
.list {
  margin-bottom: 0;
}
.cur {
  color: #df0f0f;
  position: relative;
}
.cur::after {
  position: absolute;
  top: 80%;
  content: "";
  left: 0%;
  width: 97%;
  height: 1px;
  background: #df0f0f;
}
.ordinary {
  color: #000;
}
.one:last-child {
  display: none;
}
.t::after {
  display: inline;
  content: "...";
  font-size: 25px;
  line-height: 30px;
}
.c-icon-link {
  padding-top: 10px;
  padding-bottom: 10px;
}
.right_content {
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  font-size: 14px;
  color: #000;
  padding: 15px;
  border-bottom: 1px solid #e8e8e8;
}
.right_content p {
  color: #000;
  margin: 5px 0px;
}
.new_task {
  width: 100%;
  display: flex;
  justify-content: space-between;
}
.right_content p:nth-child(even) {
  text-align: right;
}
.not_select .divInput {
  width: 33.3%;
}
.success_failure {
  position: relative;
}
.success_failure .status_success {
  position: absolute;
  top: 38%;
  left: 36%;
  transform: rotate(-15deg);
  -ms-transform: rotate(-15deg); /* IE 9 */
  -moz-transform: rotate(-15deg); /* Firefox */
  -webkit-transform: rotate(-15deg); /* Safari 和 Chrome */
  -o-transform: rotate(-15deg); /* Opera */
}
.success_failure .status_success.van-tag--large {
  padding: 6px 12px;
  font-size: 16px;
  border-radius: 0;
}
@media screen and (min-width: 320px) and (max-width: 374px) {
  li,
  select,
  input,
  p,
  div {
    font-size: 13px;
  }
  .tabList {
    height: 40px !important;
    line-height: 40px !important;
  }
  .right_content {
    padding: 10px;
  }
  .success_failure .sf_state {
    top: 0;
  }
}
</style>
