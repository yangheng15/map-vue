<template>
  <div class="task">
    <my-nav :title="title"></my-nav>
    <div class="tabTitle">
      <ul class="tabList">
        <li @click="tab(0)" :class="tabId == 0 ? 'cur' : 'ordinary'">新任务</li>
        <li @click="tab(1)" :class="tabId == 1 ? 'cur' : 'ordinary'">已结束</li>
        <li @click="tab(2)" :class="tabId == 2 ? 'cur' : 'ordinary'">待评价</li>
      </ul>
      <van-list
        v-model="loadEnd"
        :finished="finishEnd"
        :offset="offset"
        finished-text="已加载完毕"
        @load="onLoadList"
        v-show="tabId === 0"
      >
        <router-link
          v-for="(thisItem, index) in new_task"
          :key="index"
          class="right_content"
          tag="div"
          :to="{
            name: 'MissionDetails',
            query: {
              title: '任务详情',
              id: thisItem.id,
              productName: thisItem.productName,
              productCode: thisItem.productCode,
            },
          }"
        >
          <div class="new_task">
            <p
              style="
                font-weight: 550;
                width: 100%;
                overflow: hidden;
                text-overflow: ellipsis;
                white-space: nowrap;
              "
            >
              {{ thisItem.name }}
            </p>
          </div>
          <div class="new_task">
            <p :class="thisItem.status == 1 ? 'teshu' : 'teshu2'">
              目标：{{ thisItem.targetNum | NumFormat }}
            </p>
            <p :class="thisItem.sf_state == 1 ? 'teshu' : 'teshu2'">
              剩余{{ thisItem.remainingDays }}天
            </p>
          </div>
          <div class="new_task">
            <!-- <p>{{ thisItem.productName }}</p> -->
            <p>创建日期：{{ thisItem.beginTime | transform }}</p>
            <p>截止日期：{{ thisItem.endTime | transform }}</p>
          </div>
        </router-link>
      </van-list>
      <van-list
        v-model="loadEnd1"
        :finished="finishEnd1"
        :offset="offset"
        finished-text="已加载完毕"
        @load="onLoadList1"
        v-show="tabId === 1"
      >
        <router-link
          v-for="(thisItem, index) in new_task1"
          :key="index"
          class="right_content success_failure"
          tag="div"
          :to="{
            name: 'MissionDetails',
            query: {
              title: '任务详情',
              id: thisItem.id,
              productName: thisItem.productName,
              productCode: thisItem.productCode,
            },
          }"
        >
          <div class="new_task">
            <p
              style="
                font-weight: 550;
                width: 100%;
                overflow: hidden;
                text-overflow: ellipsis;
                white-space: nowrap;
              "
            >
              {{ thisItem.name }}
            </p>
          </div>
          <div class="new_task">
            <p style="text-align: center !important">
              目标：{{ thisItem.targetNum | NumFormat }}
            </p>
            <p style="text-align: center !important">
              完成：{{ thisItem.taskAmount | NumFormat }}
            </p>
          </div>
          <div class="new_task">
            <!-- <p>{{ thisItem.productName }}</p> -->
            <p>创建日期：{{ thisItem.beginTime | transform }}</p>
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
          <van-tag
            v-if="thisItem.status == 0"
            class="status_success"
            color="#201F25"
            plain
            size="large"
            >已过期</van-tag
          >
        </router-link>
      </van-list>
      <van-list
        v-model="loadEnd2"
        :finished="finishEnd2"
        :offset="offset"
        finished-text="已加载完毕"
        @load="onLoadList2"
        v-show="tabId === 2"
      >
        <router-link
          v-for="(thisItem, index) in new_task2"
          :key="index"
          tag="div"
          :to="{
            name: 'MissionDetails',
            query: {
              title: '任务详情',
              id: thisItem.id,
              productName: thisItem.productName,
              productCode: thisItem.productCode,
            },
          }"
          class="right_content"
        >
          <div class="new_task">
            <p
              style="
                font-weight: 550;
                width: 100%;
                overflow: hidden;
                text-overflow: ellipsis;
                white-space: nowrap;
              "
            >
              {{ thisItem.name }}
            </p>
          </div>
          <div class="new_task">
            <p style="text-align: center !important">
              目标：{{ thisItem.targetNum | NumFormat }}
            </p>
            <p style="text-align: center !important">
              完成：{{ thisItem.taskAmount | NumFormat }}
            </p>
          </div>
          <div class="new_task">
            <!-- <p>{{ thisItem.productName }}</p> -->
            <p>创建日期：{{ thisItem.beginTime | transform }}</p>
            <p>截止日期：{{ thisItem.endTime | transform }}</p>
          </div>
        </router-link>
      </van-list>
    </div>
    <my-tabbar></my-tabbar>
  </div>
</template>
<script>
import MyNav from "../../components/Public/MyNav";
import MyTabbar from "../../components/Public/MyTabbar";
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
      offset: 5, //滚动条与底部距离小于 offset 时触发load事件，默认300
      loadEnd: false, // 滚动加载中
      finishEnd: false, // 滚动加载完成
      currentPage: 1,
      pageSize: 10,
      dataTotal: "",
      loadEnd1: false, // 滚动加载中
      finishEnd1: false, // 滚动加载完成
      currentPage1: 1,
      pageSize1: 10,
      dataTotal1: "",
      loadEnd2: false, // 滚动加载中
      finishEnd2: false, // 滚动加载完成
      currentPage2: 1,
      pageSize2: 10,
      dataTotal2: "",
    };
  },
  created() {},
  methods: {
    onLoadList() {
      this.queryNewTask();
    },
    queryNewTask() {
      let _username = localStorage.getItem("username");
      this.$httpGet({
        url: "/api/semTasks/appNewTask",
        params: {
          userName: _username,
          page: this.currentPage, //页数
          limit: this.pageSize, //每页个数
        },
      }).then((res) => {
        this.dataTotal = res.count;
        //进行判断
        if (this.dataTotal <= this.pageSize) {
          this.new_task = res.data;
        } else {
          this.currentPage++;
          let arr = res.data;
          this.new_task = this.new_task.concat(arr);
        }
        // 加载状态结束
        this.loadEnd = false;
        // 数据全部加载完成
        if (this.new_task.length >= this.dataTotal) {
          this.finishEnd = true; //结束，显示我也是有底线的
        }
      });
    },
    onLoadList1() {
      this.queryEndTask();
    },
    queryEndTask() {
      let _username = localStorage.getItem("username");
      this.$httpGet({
        url: "/api/semTasks/appEndTask",
        params: {
          userName: _username,
          page: this.currentPage1, //页数
          limit: this.pageSize1, //每页个数
        },
      }).then((res) => {
        this.dataTotal1 = res.count;
        //进行判断
        if (this.dataTotal1 <= this.pageSize1) {
          this.new_task1 = res.data;
        } else {
          this.currentPage1++;
          let arr = res.data;
          this.new_task1 = this.new_task1.concat(arr);
        }
        // 加载状态结束
        this.loadEnd1 = false;
        // 数据全部加载完成
        if (this.new_task1.length >= this.dataTotal1) {
          this.finishEnd1 = true; //结束，显示我也是有底线的
        }
      });
    },
    onLoadList2() {
      this.queryEvaluateTask();
    },
    queryEvaluateTask() {
      let _username = localStorage.getItem("username");
      this.$httpGet({
        url: "/api/semTasks/appValuateTasks",
        params: {
          userName: _username,
          page: this.currentPage2, //页数
          limit: this.pageSize2, //每页个数
        },
      }).then((res) => {
        this.dataTotal2 = res.count;
        //进行判断
        if (this.dataTotal2 <= this.pageSize2) {
          this.new_task2 = res.data;
        } else {
          this.currentPage2++;
          let arr = res.data;
          this.new_task2 = this.new_task2.concat(arr);
        }
        // 加载状态结束
        this.loadEnd2 = false;
        // 数据全部加载完成
        if (this.new_task2.length >= this.dataTotal2) {
          this.finishEnd2 = true; //结束，显示我也是有底线的
        }
      });
    },
    tab(ev) {
      this.tabId = ev;
      if (ev == 1) {
        this.onLoadList1();
      }
      if (ev == 2) {
        this.onLoadList2();
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
  top: 37%;
  left: 46%;
  transform: rotate(-15deg);
  -ms-transform: rotate(-15deg); /* IE 9 */
  -moz-transform: rotate(-15deg); /* Firefox */
  -webkit-transform: rotate(-15deg); /* Safari 和 Chrome */
  -o-transform: rotate(-15deg); /* Opera */
}
.success_failure .status_success.van-tag--large {
  padding: 4px 10px;
  font-size: 14px;
  border-radius: 0;
}
@media screen and (max-width: 359px) {
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
