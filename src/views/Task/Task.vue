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
          tag="div"
          :to="{ name: 'MissionDetails', query: { title: '任务详情' } }"
        >
          <div
            v-for="(thisItem, index) in new_task"
            :key="index"
            class="right_content"
          >
            <div class="new_task">
              <p style="font-weight: 550">{{ thisItem.name }}</p>
              <p :class="thisItem.status == 1 ? 'teshu' : 'teshu2'">
                {{ thisItem.targetNum }}万
              </p>
              <p>创建日期：{{ moment(thisItem.beginTime).format('YYYY-MM-DD') }}</p>
            </div>
            <div class="new_task">
              <p>{{ thisItem.productCode }}</p>
              <p :class="thisItem.sf_state == 1 ? 'teshu' : 'teshu2'">
                剩余{{ thisItem.remainingDays }}天
              </p>
              <p>截止日期：{{ thisItem.endTime }}</p>
            </div>
          </div>
        </router-link>
        <van-divider :style="{ borderColor: '#fff' }">已加载完毕</van-divider>
      </div>
      <div v-show="tabId === 1">
        <router-link
          tag="div"
          :to="{ name: 'MissionDetails', query: { title: '任务详情' } }"
        >
          <div
            v-for="(thisItem, index) in new_task1"
            :key="index"
            class="right_content success_failure"
          >
            <div class="new_task">
              <p style="font-weight: 550">{{ thisItem.company_source }}</p>
              <p style="text-align: center !important">{{ thisItem.menoy }}</p>
              <p>{{ thisItem.date_start }}</p>
            </div>
            <div class="new_task">
              <p>{{ thisItem.company_introduce }}</p>
              <p>{{ thisItem.date_end }}</p>
            </div>

            <div
              v-if="thisItem.success_failure"
              :class="thisItem.sf_state == 1 ? 'sf_state' : 'sf_states'"
            >
              {{ thisItem.success_failure }}
            </div>
          </div>
        </router-link>
        <van-divider :style="{ borderColor: '#fff' }">已加载完毕</van-divider>
      </div>
      <div v-show="tabId === 2">
        <router-link
          tag="div"
          :to="{ name: 'MissionDetails', query: { title: '任务详情' } }"
        >
          <div
            class="right_content"
            v-for="(thisItem, index) in new_task2"
            :key="index"
          >
            <div class="new_task">
              <p style="font-weight: 550">{{ thisItem.company_source }}</p>
              <p :class="thisItem.sf_state == 1 ? 'teshu' : 'teshu2'">
                {{ thisItem.menoy }}
              </p>
              <p>{{ thisItem.date_start }}</p>
            </div>
            <div class="new_task">
              <p>{{ thisItem.company_introduce }}</p>
              <p :class="thisItem.sf_state == 1 ? 'teshu' : 'teshu2'">
                {{ thisItem.be_overdue }}
              </p>
              <p>{{ thisItem.date_end }}</p>
            </div>
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
import moment from 'moment'; 
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
      new_task1: [
        {
          company_source: "产品营销",
          menoy: "30万/100万",
          company_introduce: "企业贷",
          date_start: "创建日期：2020-08-01",
          date_end: "截止日期：2020-09-30",
          date: "剩余20天",
          success_failure: "失败",
          be_overdue: "已过期",
          sf_state: 1,
        },
        {
          company_source: "资料采集",
          menoy: "30户/30户",
          company_introduce: "农户家庭",
          date_start: "创建日期：2020-08-01",
          date_end: "截止日期：2020-09-30",
          date: "剩余20天",
          success_failure: "成功",
        },
      ],
      new_task2: [
        {
          company_source: "产品营销",
          menoy: "30万/100万",
          company_introduce: "企业贷",
          date_start: "创建日期：2020-08-01",
          date_end: "截止日期：2020-09-30",
          date: "剩余20天",
          success_failure: "失败",
          be_overdue: "已过期",
          sf_state: 1,
        },
        {
          company_source: "资料采集",
          menoy: "30户/30户",
          company_introduce: "农户家庭",
          date_start: "创建日期：2020-08-01",
          date_end: "截止日期：2020-09-30",
          date: "剩余20天",
          success_failure: "成功",
        },
      ],
    };
  },
  created() {
    this.queryNewTask();
  },
  methods: {
    tab(ev) {
      this.tabId = ev;
      localStorage.setItem("indexTabId", this.tabId);
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
        console.log(res.data);
        this.new_task = res.data;
      });
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
.success_failure .sf_state {
  position: absolute;
  top: 10px;
  left: 36%;
  line-height: 69px;
  width: 64px;
  text-align: center;
  height: 69px;
  background: url("../../assets/task/fail.png") no-repeat;
  background-size: cover;
}
.success_failure .sf_states {
  position: absolute;
  top: 25px;
  color: transparent;
  left: 36%;
  width: 60px;
  height: 37px;
  background: url("../../assets/task/success.png") no-repeat;
  background-size: cover;
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
