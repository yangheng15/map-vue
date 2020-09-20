<template>
  <div class="task">
    <my-nav :title="title"></my-nav>
    <div class="tabTitle">
      <ul class="tabList">
        <li @click="tab(0)" :class="tabId==0?'cur':'ordinary'">新任务</li>
        <li @click="tab(1)" :class="tabId==1?'cur':'ordinary'">已结束</li>
        <li @click="tab(2)" :class="tabId==2?'cur':'ordinary'">待评价</li>
      </ul>
      <div v-show="tabId===0">
        <div
          v-for="(thisItem,index) in new_task"
          :key="index"
          @click="$router.push('/ContentManage/ArticleViewBasicNew/'+thisItem.id+'?title=任务详情')"
        >
          <!-- <div class="left_content">
                <img src="./iphone.png" />
          </div>-->
          <div class="right_content">
            <div class="new_task">
              <p style="font-weight:550">{{thisItem.company_source}}</p>
              <p :class="thisItem.sf_state==1?'teshu':'teshu2'">{{thisItem.menoy}}</p>
              <p>{{thisItem.date_start}}</p>
            </div>
            <div class="new_task">
              <p>{{thisItem.company_introduce}}</p>
              <p :class="thisItem.sf_state==1?'teshu':'teshu2'">{{thisItem.date}}</p>
              <p>{{thisItem.date_end}}</p>
            </div>
          </div>
        </div>
        <van-divider :style="{ borderColor: '#fff' }">已加载完毕</van-divider>
      </div>
      <div v-show="tabId===1">
        <div
          v-for="(thisItem,index) in new_task"
          :key="index"
          @click="$router.push('/ContentManage/ArticleViewBasicNew/'+thisItem.id+'?title=任务详情')"
        >
          <!-- <div class="left_content">
                <img src="./iphone.png" />
          </div>-->
          <div class="right_content success_failure">
            <div class="new_task">
              <p style="font-weight:550">{{thisItem.company_source}}</p>
              <p style="text-align:center!important;">{{thisItem.menoy}}</p>
              <p>{{thisItem.date_start}}</p>
            </div>
            <div class="new_task">
              <p>{{thisItem.company_introduce}}</p>
              <p>{{thisItem.date_end}}</p>
            </div>

            <div
              v-if="thisItem.success_failure"
              :class="thisItem.sf_state==1 ? 'sf_state' : 'sf_states'"
            >{{thisItem.success_failure}}</div>
          </div>
        </div>
        <van-divider :style="{ borderColor: '#fff' }">已加载完毕</van-divider>
      </div>
      <div v-show="tabId===2">
        <div
          v-for="(thisItem,index) in new_task"
          :key="index"
          @click="$router.push('/ContentManage/ArticleViewBasicNew/'+thisItem.id+'?title=任务详情')"
        >
          <!-- <div class="left_content">
                <img src="./iphone.png" />
          </div>-->
          <!-- be_overdue -->
          <div class="right_content">
            <div class="new_task">
              <p style="font-weight:550">{{thisItem.company_source}}</p>
              <p :class="thisItem.sf_state==1?'teshu':'teshu2'">{{thisItem.menoy}}</p>
              <p>{{thisItem.date_start}}</p>
            </div>
            <div class="new_task">
              <p>{{thisItem.company_introduce}}</p>
              <p :class="thisItem.sf_state==1?'teshu':'teshu2'">{{thisItem.be_overdue}}</p>
              <p>{{thisItem.date_end}}</p>
            </div>
          </div>
        </div>
        <van-divider :style="{ borderColor: '#fff' }">已加载完毕</van-divider>
      </div>
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
      new_task: [
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
  methods: {
    tab(ev) {
      this.tabId = ev;
      localStorage.setItem("indexTabId", this.tabId);
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
.divider {
  margin-top: 0.2rem;
  width: 100%;
  height: 0.2rem;
  background-color: lightgray;
}

.icon {
  margin-top: 0.5rem;
  height: 3.5rem;
  width: 3.5rem;
}

span {
  font-size: 15px;
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
  height: 0.05rem;
  background: #df0f0f;
}
.ordinary {
  color: #000;
}
.Carousel {
  height: 30%;
  position: relative;
}

.Carousel div {
  width: 1000px;
  position: absolute;
  /* float: left; */
}

.Carousel div:nth-child(2) {
  position: absolute;
  left: 100%;
}

.Carousel div:nth-child(3) {
  position: absolute;
  left: 200%;
}

.swiper-container {
  height: 170px;
}
.c-read {
  margin-left: 15px !important;
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
.swiper-wrapper {
  transition-timing-function: linear !important;
}

.c-icon-link {
  padding-top: 10px;
  padding-bottom: 10px;
  /* border-left:1px solid #f5f5f5; */
  /* border-top:1px solid #f5f5f5; */
}
.c-icon-link-bl {
  border-left: 0px;
}
.c-icon-link-bt {
  border-top: 0px;
}
.c-icon-link-br {
  border-right: 0px;
}
.c-icon-link-bb {
  border-bottom: 0px;
}
.c-icon-link-img {
  text-align: center;
}
.c-icon-link-img img {
  width: 40px;
  height: 40px;
}
.c-icon-link-text {
  color: #666666;
}
.schedule {
  background-color: #1abc9c;
  height: 2.5rem;
  display: flex;
  flex-direction: row-reverse;
  align-items: center;
}
.schedule a {
  display: inline-block;
  border: 1px solid #fff;
  padding: 0.1rem 0.2rem;
  color: #fff;
  margin-right: 0.5rem;
  text-decoration: none;
}
.schedule a i {
  margin-right: 0.4rem;
}

.left_content {
  float: left;
  width: 10%;
}
.left_content img {
  width: 30px;
  height: 30px;
}
.right_content {
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  font-size: 0.9rem;
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
.not_select .divInput ul {
  width: 33.3%;
  position: absolute;
  z-index: 6;
}
.not_select .divInput ul li {
  display: inline-block;
  list-style: none;
  width: 8.5rem;
  font-size: 0.8rem;
  border-top: 1px solid #fdfbfb;
  background-color: #ededed;
  padding: 0.4rem 1rem 0.4rem 0.6rem;
}
.not_select .divInput ul li:first-child {
  border: 0px;
}
.not_select .divInput .select_sort {
  width: 140px;
  height: 40px;
  line-height: 40px;
  padding-left: 10px;
  position: relative;
  background-color: #ededed;
}
.not_select .divInput .select_sort input {
  border: none;
  outline: none;
  width: 90%;
  height: 100%;
  color: #1a1818;
  background-color: #ededed;
}
.not_select .divInput .select_sort img {
  position: absolute;
  right: 34px;
  top: 30%;
  width: 13%;
}

input::-webkit-input-placeholder {
  color: #2d2d2d;
}
input::-moz-placeholder {
  /* Mozilla Firefox 19+ */
  color: #2d2d2d;
}
input:-moz-placeholder {
  /* Mozilla Firefox 4 to 18 */
  color: #2d2d2d;
}
input:-ms-input-placeholder {
  /* Internet Explorer 10-11 */
  color: #2d2d2d;
}
.end_line {
  margin: 1rem;
  text-align: center;
  color: #c1b9b9;
  font-size: 1rem;
}
.success_failure {
  position: relative;
}
.success_failure .sf_state {
  position: absolute;
  top: 0rem;
  left: 36%;
  line-height: 4.8rem;
  width: 4.5rem;
  text-align: center;
  height: 4rem;
  background: url("../../assets/task/fail.png") no-repeat;
  background-size: cover;
}
.success_failure .sf_states {
  position: absolute;
  top: 1rem;
  color: transparent;
  left: 36%;
  width: 4.3rem;
  height: 2.7rem;
  background: url("../../assets/task/success.png") no-repeat;
  background-size: cover;
}
@media screen and (min-width: 320px) and (max-width: 374px) {
  li,
  select,
  input,
  p,
  div {
    font-size: 0.8rem;
  }
  .tabList {
    height: 2.5rem !important;
    line-height: 2.5rem !important;
  }
  .latest_tasks ul li {
    font-size: 0.7rem;
  }
  .latest_tasks ul {
    margin: 0;
  }
  .end_line {
    font-size: 0.8rem;
  }
  .two_select select {
    height: 1.5rem;
  }
  .right_content {
    padding: 10px;
  }
  .success_failure .sf_state {
    top: -0.2rem;
    left: 36%;
    width: 4.3rem;
  }
  .success_failure .sf_states {
    width: 3.7rem;
    height: 2.3rem;
  }
}
</style>
