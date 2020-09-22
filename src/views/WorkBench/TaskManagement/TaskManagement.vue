<template>
  <div class="TaskManagement">
    <child-nav :title="typeCN"></child-nav>
    <div v-if="typeCN=='任务管理'">
      <div class="screen_content">
        <van-search v-model="search_txt" show-action placeholder="客户名称" @search="onSearch">
          <template #action>
            <div @click="onSearch">高级</div>
          </template>
        </van-search>
      </div>
      <div class="customer_list success">
        <router-link
          tag="div"
          :to="{ name: 'MissionDetails', query: { title: '任务详情' }}"
          style="padding:0.5rem;"
        >
          <div v-for="(thisItem,index) in new_task" :key="index" class="success_failure">
            <div class="new_task">
              <p style="font-weight:550">{{thisItem.company_source}}</p>
              <p style="text-align:center!important;">{{thisItem.menoy}}</p>
              <p>{{thisItem.date_start}}</p>
            </div>
            <div class="new_task">
              <p>{{thisItem.company_introduce}}</p>
              <p style="text-align:center!important;">{{thisItem.name}}</p>
              <p>{{thisItem.date_end}}</p>
            </div>

            <div
              v-if="thisItem.success_failure"
              :class="thisItem.sf_state==1 ? 'sf_state' : 'sf_states'"
            >{{thisItem.success_failure}}</div>
          </div>
        </router-link>
        <van-divider :style="{ borderColor: '#fff' }">已加载完毕</van-divider>
      </div>
    </div>
  </div>
</template>
<script>
import ChildNav from "../../../components/Public/ChildNav";
export default {
  name: "TaskManagement",
  components: {
    ChildNav,
  },
  data() {
    return {
      title: "",
      typeCN: "",
      value: 1,
      radio: "1",
      search_txt: "",
      new_task: [
        {
          company_source: "产品营销",
          menoy: "30万/100万",
          company_introduce: "企业贷",
          date_start: "创建日期：2020-08-01",
          date_end: "截止日期：2020-09-30",
          date: "剩余20天",
          success_failure: "失败",
          name: "张男",
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
          name: "张男",
          success_failure: "成功",
        },
      ],
    };
  },
  created() {
    this.typeCN = this.$route.query.title;
  },
  methods: {
    onSearch(val) {
      Toast(val);
    },
  },
  mounted() {},
};
</script>
<style scoped>
* {
  font-size: 14px;
}

.van-search {
  width: 100%;
}
.TaskManagement {
  padding-top: 46px;
}
.new_task {
  width: 100%;
  display: flex;
  justify-content: space-between;
}
.new_task p {
  margin: 0.5rem 0;
}
.success_failure {
  position: relative;
  border-bottom: 1px solid #e8e8e8;
}
.success_failure .sf_state {
  position: absolute;
  top: -0.5rem;
  left: 35%;
  line-height: 4.8rem;
  width: 4.5rem;
  text-align: center;
  height: 4rem;
  background: url("../../../assets/WorkBench/fail.png") no-repeat;
  background-size: cover;
}
.success_failure .sf_states {
  position: absolute;
  top: 0.3rem;
  color: transparent;
  left: 35%;
  width: 4.3rem;
  height: 2.7rem;
  background: url("../../../assets/WorkBench/success.png") no-repeat;
  background-size: cover;
}

.screen_content {
  display: flex;
  position: relative;
}
.screen_content input {
  width: 83%;
  height: 44px;
  margin: 4px;
  line-height: 20px;
  padding: 0rem 1rem 0rem 2.3rem;
  text-align: left;
  border-radius: 2px 2px 2px 2px;
  background-color: #fafafa;
  text-align: center;
  box-shadow: 0px 2px 2px 0px rgba(0, 0, 0, 0.24);
  border: 1px solid rgba(255, 0, 0, 0);
}
.screen_content img {
  position: absolute;
  width: 14px;
  height: 14px;
  top: 40%;
  left: 5%;
  z-index: 100;
  opacity: 0.5;
}
.screen_content input::-webkit-input-placeholder {
  text-align: left;
  font-size: 14px;
}
.screen_content input::-moz-placeholder {
  /* Mozilla Firefox 19+ */
  text-align: left;
  font-size: 14px;
}
.screen_content input:-moz-placeholder {
  /* Mozilla Firefox 4 to 18 */
  text-align: left;
  font-size: 14px;
}
.screen_content input:-ms-input-placeholder {
  /* Internet Explorer 10-11 */
  text-align: left;
  font-size: 14px;
}
.screen_content button {
  border: none;
  background: none;
}
.customer_list ul {
  background: #fff;
  /* margin-top: 10px; */
}
.customer_list ul li {
  display: flex;
  flex-wrap: wrap;
  padding: 0.5rem 0.5rem;
  border-bottom: 0.001rem solid #e8e8e8 !important;
}
.customer_list ul li p {
  width: 60%;
  margin: 5px 0px;
}
.customer_list ul li p:nth-child(even) {
  text-align: right;
  width: 40%;
}
.customer_list .schedule_star img {
  width: 1.2rem;
  vertical-align: middle;
}
.success {
  position: relative;
}

@media screen and (min-width: 320px) and (max-width: 374px) {
  * {
    font-size: 13px;
  }
  .customer_list ul li p {
    width: 57%;
  }
  .customer_list ul li p:nth-child(even) {
    width: 43%;
  }
}
</style>
