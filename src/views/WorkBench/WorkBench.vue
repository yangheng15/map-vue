<template>
  <div class="WorkBench">
    <my-nav :title="title"></my-nav>
    <div>
      <h2 class="function_title">客户</h2>
      <div
        class="c-link-box"
        style="text-align: center; border-bottom: 1px dotted #e8e8e8"
      >
        <router-link
          tag="div"
          class="function_men"
          :to="{ name: 'CustomerPool', query: { title: '客户池' } }"
        >
          <span class="c-link-card" style="background: #d33e42">
            <img src="../../assets/WorkBench/kehuchi.svg" alt />
          </span>
          <p class="function_name">客户池</p>
        </router-link>
        <router-link
          tag="div"
          class="function_men"
          :to="{ name: 'PotentialCustomers', query: { title: '潜在客户' } }"
        >
          <span class="c-link-card" style="background: #e18d25">
            <img src="../../assets/WorkBench/qianzai.svg" alt />
          </span>
          <p class="function_name">潜在客户</p>
        </router-link>
        <router-link
          tag="div"
          class="function_men"
          :to="{ name: 'RecentContact', query: { title: '最近联系' } }"
        >
          <span class="c-link-card" style="background: #ecd14a">
            <img src="../../assets/WorkBench/zuijin.svg" alt />
            <!-- <span v-if="countsMap.grief>0">{{countsMap.grief}}</span> -->
          </span>
          <p class="function_name">最近联系</p>
        </router-link>
        <router-link
          tag="div"
          class="function_men"
          :to="{ name: 'PeasantHousehold', query: { title: '农户' } }"
        >
          <span class="c-link-card" style="background: #0fb38f">
            <img src="../../assets/WorkBench/nonghu.svg" alt />
            <!-- <span v-if="countsMap.grief>0">{{countsMap.grief}}</span> -->
          </span>
          <p class="function_name">农户</p>
        </router-link>
        <router-link
          tag="div"
          class="function_men"
          :to="{ name: 'MyClients', query: { title: '我的客户' } }"
        >
          <span class="c-link-card" style="background: #3d425e">
            <img src="../../assets/WorkBench/kehu.svg" alt />
            <!-- <span v-if="countsMap.grief>0">{{countsMap.grief}}</span> -->
          </span>
          <p class="function_name">我的客户</p>
        </router-link>
        <!-- <router-link
          tag="div"
          class="function_men"
          :to="{ name: 'CustomerCaim', query: { title: '客户认领' }}"
        >
          <span class="c-link-card" style="background:#1432E3">
            <img src="../../assets/WorkBench/renling.svg" alt />
          </span>
          <p class="function_name">客户认领</p>
        </router-link> -->
        <!-- <router-link
          tag="div"
          class="function_men"
          :to="{ name: 'BlackList', query: { title: '黑名单' } }"
        >
          <span class="c-link-card" style="background: #d90bb2">
            <img src="../../assets/WorkBench/heimingdan.svg" alt />
          </span>
          <p class="function_name">黑名单</p>
        </router-link> -->
      </div>
    </div>
    <div style="margin-top: 10px">
      <h2 class="function_title">查询统计</h2>
      <div
        class="c-link-box"
        style="text-align: center; border-bottom: 1px dotted #e8e8e8"
      >
        <router-link
          tag="div"
          class="function_men"
          :to="{ name: 'RankingList', query: { title: '排行榜' } }"
        >
          <span class="c-link-card" style="background: #d33e42">
            <img src="../../assets/WorkBench/paihangbang.svg" alt />
            <!-- <span v-if="countsMap.notice>0">{{countsMap.notice}}</span> -->
          </span>
          <p class="function_name">排行榜</p>
        </router-link>
        <router-link
          tag="div"
          class="function_men"
          :to="{ name: 'MissionAccomplished', query: { title: '任务完成' } }"
        >
          <span class="c-link-card" style="background: #e18d25">
            <img src="../../assets/WorkBench/renwuwancheng.svg" alt />
            <!-- <span v-if="countsMap.activityNotice>0">{{countsMap.activityNotice}}</span> -->
          </span>
          <p class="function_name">任务完成</p>
        </router-link>
        <!-- <router-link
          tag="div"
          class="function_men"
          :to="{ name: 'TaskManagement', query: { title: '任务管理' } }"
        >
          <span class="c-link-card" style="background: #df0f0f">
            <img src="../../assets/WorkBench/renwuguanli.svg" alt />
          </span>
          <p class="function_name">任务管理</p>
        </router-link> -->
      </div>
    </div>
    <div style="margin-top: 10px; margin-bottom: 30px">
      <h2 class="function_title">营销辅助</h2>
      <div
        class="c-link-box"
        style="text-align: center; border-bottom: 1px dotted #e8e8e8"
      >
        <router-link
          tag="div"
          class="function_men"
          :to="{ name: 'ProductCatalog', query: { title: '产品目录' } }"
        >
          <span class="c-link-card" style="background: #0fb38f">
            <img src="../../assets/WorkBench/mulu.svg" alt />
            <!-- <span v-if="countsMap.notice>0">{{countsMap.notice}}</span> -->
          </span>
          <p class="function_name">产品目录</p>
        </router-link>
        <router-link
          tag="div"
          class="function_men"
          :to="{ name: 'knowledgeBase', query: { title: '知识库' } }"
        >
          <span class="c-link-card" style="background: #91b0eb">
            <img src="../../assets/WorkBench/zhishiku.svg" alt />
            <!-- <span v-if="countsMap.notice>0">{{countsMap.notice}}</span> -->
          </span>
          <p class="function_name">知识库</p>
        </router-link>
        <!-- <router-link
          tag="div"
          class="function_men"
          :to="{ name: 'Calculator', query: { title: '计算器' } }"
        >
          <span class="c-link-card" style="background: #7e4a46">
            <img src="../../assets/WorkBench/jisuanqi.svg" alt />
          </span>
          <p class="function_name">计算器</p>
        </router-link> -->
        <router-link
          tag="div"
          class="function_men"
          :to="{ name: 'TelePhone', query: { title: '通讯录' } }"
        >
          <span class="c-link-card" style="background: #a4b59d">
            <img src="../../assets/WorkBench/tongxunlu.svg" alt />
            <!-- <span v-if="countsMap.grief>0">{{countsMap.grief}}</span> -->
          </span>
          <p class="function_name">通讯录</p>
        </router-link>
      </div>
    </div>
    <my-tabbar></my-tabbar>
  </div>
</template>
<script>
import MyNav from "../../components/Public/MyNav";
import MyTabbar from "../../components/Public/MyTabbar";
export default {
  name: "WorkBench",
  components: {
    MyNav,
    MyTabbar,
  },
  data() {
    return {
      title: "工作台",
    };
  },
  methods: {},
};
</script>
<style scoped>
.WorkBench {
  padding-top: 46px;
}
.c-link-box {
  display: flex;
  flex-wrap: wrap;
  padding: 10px 0px;
  margin-top: 0;
}
.function_name {
  margin: 10px;
}
.function_title {
  font-size: 14px;
  margin-left: 14px;
  color: #000;
}
.c-link-card {
  width: 30px;
  display: inline-block;
  height: 30px;
  max-width: 200px;
  position: relative;
  background-color: #3d425e;
  border-radius: 10px;
  padding: 12px;
}
.function_men {
  width: 25%;
}
.c-link-card span {
  position: absolute;
  top: -12px;
  right: -12px;
  display: inline-block;
  width: 25px;
  height: 25px;
  text-align: center;
  line-height: 25px;
  background: rgb(58, 114, 157);
  color: white;
  border-radius: 50%;
}
.c-link-card img {
  width: 100%;
}
@media screen and (min-width: 320px) and (max-width: 374px) {
  li,
  select,
  input,
  p,
  div {
    font-size: 13px;
  }
  .c-link-card {
    width: 28px;
    height: 28px;
  }
}
</style>
