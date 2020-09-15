<template>
  <div class="home">
    <custom-nav :title="title"></custom-nav>
    <div class="page-content" style="padding-top: 44px;background-color: white">
      <dl class="data_img">
        <dt>
          <ul class="text_content">
            <li>
              <img class="img_content" src="../../assets/home/kehushu.svg" alt />
              <p style="margin:0;">客户数</p>
            </li>
            <li>
              <p style="font-size:1.1rem;margin-top:0.2rem;margin-bottom:0.6rem;color:#000">10</p>
              <p style="color:#3CC8AB;margin:0;">21万
                <img  style="width:1rem;margin-top:0.2rem;vertical-align: bottom;" src="../../assets/home/arrow-alt-up.svg" alt="">
              </p>
            </li>
          </ul>
        </dt>
        <dt>
          <ul class="text_content">
            <li>
              <img class="img_content" src="../../assets/home/cunkuane.svg" alt />
              <p style="margin:0;">客户数</p>
            </li>
            <li>
              <p style="font-size:1.1rem;margin-top:0.2rem;margin-bottom:0.6rem;color:#000">100</p>
              <p style="color:#3CC8AB;margin:0;">20万
                <img  style="width:1rem;margin-top:0.2rem;vertical-align: bottom;" src="../../assets/home/arrow-alt-up.svg" alt="">
              </p>
            </li>
          </ul>
        </dt>
        <dt>
          <ul class="text_content">
            <li>
              <img class="img_content" src="../../assets/home/daikuane.svg" alt />
              <p style="margin:0;">客户数</p>
            </li>
            <li>
              <p style="font-size:1.1rem;margin-top:0.2rem;margin-bottom:0.6rem;color:#000">10</p>
              <p style="color:#DF0F0F;margin:0;">21万
                <img  style="width:1rem;margin-top:0.2rem;vertical-align: bottom;" src="../../assets/home/arrow-alt-down.svg" alt="">
              </p>
            </li>
          </ul>
        </dt>
        <dt>
          <ul class="text_content">
            <li>
              <img class="img_content" src="../../assets/home/licaie.svg" alt />
              <p style="margin:0;">客户数</p>
            </li>
            <li>
              <p style="font-size:1.1rem;margin-top:0.2rem;margin-bottom:0.6rem;color:#000">100</p>
              <p style="color:#3CC8AB;margin:0;">20万
                <img  style="width:1rem;margin-top:0.2rem;vertical-align: bottom;" src="../../assets/home/arrow-alt-up.svg" alt="">
              </p>
            </li>
          </ul>
        </dt>
      </dl>
      <dl class="progress_content">
        <dt>本月任务执行</dt>
        <!-- <dd>
          <div class="progress">
            <div class="progress-done" data-done="68" style="width: 62%;">62%</div>
          </div>
        </dd> -->
      </dl>
      <ul class="data_display">
        <li>
          <p>执行中</p>
          <p class="data_num">10</p>
        </li>
        <li>
          <p>即将过期</p>
          <p class="data_num">10</p>
        </li>
        <li>
          <p>已经过期</p>
          <p class="data_num">10</p>
        </li>
        <li>
          <p>成功完成</p>
          <p class="data_num">6</p>
        </li>
        <li>
          <p>失败</p>
          <p class="data_num">20</p>
        </li>
      </ul>
      <div class="tabTitle">
        <ul class="tabList">
          <li @click="tab(0)" :class="tabId==0?'cur':''">最新任务</li>
          <li @click="tab(1)" :class="tabId==1?'cur':''">最近联系客户</li>
        </ul>
        <div v-show="tabId===0">
          <div
            v-for="(item,index) in latest_tasks"
            :key="index"
            class="latest_tasks"
            @click="$router.push('/ContentManage/ArticleViewBasicNew/'+item.id+'?title=任务详情')"
          >
            <ul>
              <li style="font-weight:600">{{item.name1}}</li>
              <li>{{item.menoy}}</li>
            </ul>
            <ul>
              <li>{{item.name2}}</li>
              <li>{{item.date}}</li>
            </ul>
          </div>
        </div>
        <div v-show="tabId===1">
          <div v-for="(item,index) in recent_contact" :key="index" class="latest_tasks">
            <ul>
              <li>{{item.name1}}</li>
              <li>
                {{item.telephone}}
                <img style="width:1.2rem" src="../../assets/home/md-phone.svg" alt />
              </li>
            </ul>
            <ul>
              <li>{{item.name2}}</li>
              <li>{{item.date}}</li>
            </ul>
          </div>
          <!-- <div
            style="text-align: center;padding: 30px;color: #aaaaaa;padding-top:0px;"
            @click="$router.push('/ContentManage/ArticleList4Notice/wttdfczs?title=待办事项')"
          >
            加载更多
            <i class="icon ion-ios-arrow-right"></i>
          </div>-->
        </div>
      </div>
    </div>
    <my-tabbar></my-tabbar>
  </div>
</template>

<script>
import CustomNav from "../../components/Public/CustomNav";
import MyTabbar from "../../components/Public/MyTabbar";
export default {
  name: "Home",
  data() {
    return {
      title: "首页",
      istrue: 0,
      tabId: 0,
      items: [],
      infiniteCount: 0,
      loginInfo: {
        token: "",
        isLgbWorker: 0,
      },
      isloaded: false,
      newsList: [],
      voluntaryURL: "",
      userId: "",
      imgList: [],
      PayList: [],
      newsLists: [],
      swiperList: [],
      noticeList: [],
      LGBActivityBadge: 0,
      customsNum: 0,
      swiperOption: {
        loop: true,
        pagination: {
          el: ".swiper-pagination",
          type: "bullets",
          clickable: true,
          dynamicBullets: true,
        },
        speed: 1000,
        autoplay: {
          delay: 1000,
          autoplayDisableOnInteraction: true,
          disableOnInteraction: false,
        },
        effect: "slide",
      },
      swiperNotice: {
        loop: true,
        direction: "vertical",
        pagination: {
          el: ".swiper-pagination",
          type: "bullets",
          clickable: true,
          dynamicBullets: true,
        },
        speed: 1000,
        autoplay: {
          delay: 2500,
          autoplayDisableOnInteraction: true,
          disableOnInteraction: false,
        },
        effect: "slide",
      },
      latest_tasks: [
        {
          name1: "产品营销",
          menoy: "30万/100万",
          name2: "企业贷",
          date: "2020-08-30日前",
          id: 1,
        },
        {
          name1: "资料采集",
          menoy: "10户/30户",
          name2: "农户家庭",
          date: "2020-08-30日前",
          id: 2,
        },
        {
          name1: "资料采集",
          menoy: "10户/30户",
          name2: "农户家庭",
          date: "2020-08-30日前",
          id: 3,
        },
      ],
      recent_contact: [
        {
          name1: "陈昱晓",
          telephone: "18612280988",
          name2: "企业贷",
          date: "1天前",
        },
        {
          name1: "李亚楠",
          telephone: "18612280988",
          name2: "理财",
          date: "2天前",
        },
        {
          name1: "吴宇迪",
          telephone: "18612280988",
          name2: "资料采集",
          date: "2天前",
        },
      ],
    };
  },
  components: {
    CustomNav,
    MyTabbar,
  },
  methods:{
    tab(ev) {
      this.tabId = ev;
      localStorage.setItem("indexTabId", this.tabId);
    },
  }
};
</script>
<style scoped>
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
  font-weight: 500;
  font-size: 0.9rem;
  position: relative;
}
.cur::after {
  position: absolute;
  content: "";
  top: 65%;
  left: 3%;
  width: 92%;
  height: 0.05rem;
  background: #df0f0f;
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
.page.has-tabbar .page-content {
  margin-bottom: 44px !important;
}
.page.has-tabbar .page-content {
  padding-top: 0px;
  margin-bottom: 44px !important;
}
.page.has-tabbar .page-content .schedule {
  background-color: #1abc9c;
  padding: 0.7rem 1rem;
  display: flex;
  flex-wrap: wrap;
}
.schedule .schedule_left {
  display: flex;
  width: 90%;
  margin-bottom: 0.2rem;
}
.schedule .schedule_left .schedule_name {
  color: #fff;
  font-size: 1.3rem;
  font-weight: 600;
}
.schedule .schedule_left .schedule_star {
  margin: 0 0.5rem 10px;
}
.schedule .schedule_left .schedule_star img {
  width: 1.2rem;
  vertical-align: middle;
}
.schedule .schedule_right {
  width: 10%;
}
.schedule .schedule_right a {
  color: #fff;
  font-size: 0.9rem;
  float: right;
  padding-top: 0.3rem;
  text-decoration: none;
}
.schedule .schedule_bottom {
  display: flex;
}
.schedule .schedule_bottom li {
  border: 0.1rem solid #fff;
  border-radius: 1rem;
  padding: 0rem 0.6rem 0rem 1.5rem;
  color: #fff;
  position: relative;
}
.schedule .schedule_bottom li:first-child {
  margin-right: 1rem;
}
.schedule .schedule_bottom li img {
  width: 1.6rem;
  position: absolute;
  top: -0.5rem;
  left: 0rem;
}
.page.has-tabbar .page-content .left_content {
  float: left;
  width: 10%;
}
.page.has-tabbar .page-content .left_content img {
  width: 30px;
  height: 30px;
}
.page.has-tabbar .page-content .right_content {
  float: right;
  width: 90%;
  font-size: 0.9rem;
}
.page.has-tabbar .page-content .right_content .company {
  color: #080a83;
  font-weight: 600;
}
.page.has-tabbar .page-content .right_content .time {
  float: right;
}
.page.has-tabbar .page-content .right_content .company_source {
  display: inline;
}
.page.has-tabbar .page-content .data_img {
  display: flex;
  flex-wrap: wrap;
  margin-bottom: 0.3rem;
}
.page.has-tabbar .page-content .data_img dt {
  width: 45%;
  /* height: 3.6rem; */
  margin: 2%;
  border: 1px solid #e1e1e1;
  background-color: #f2f2f2;
  display: flex;
  border-radius: 0.5rem;
}
.page.has-tabbar .page-content .data_img dt .img_content {
  width: 3rem;
  border-radius: 0.5rem;
}
.page.has-tabbar .page-content .data_img dt .text_content {
  /* width: calc(100% - 3.5rem); */
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  padding: 0.5rem;
}
.page.has-tabbar .page-content .data_img dt .text_content li {
  width: 50%;
  text-align: center;
  /* line-height: 1.2rem; */
  color: #8a8a8a;
}
.page.has-tabbar .page-content .progress_content {
  margin-left: 2%;
  color: #878787;
}
.page.has-tabbar .page-content .progress_content,
.page.has-tabbar .page-content .progress_content dt {
  margin-bottom: 0.5rem;
}
.progress {
  background-color: rgba(100, 100, 100, 0.2);
  position: relative;
  height: 1.3rem;
  width: 96%;
  border: 1px solid #cecece;
  border-radius: 0.5rem;
}
.progress-done {
  /* background: linear-gradient(to left, rgb(52, 204, 1), rgb(247, 247, 203)); */
  background: linear-gradient(to left, rgb(242, 112, 156), rgb(245, 212, 103));
  box-shadow: 0 3px 3px -5px rgb(242, 112, 156), 0 2px 5px rgb(242, 112, 156);
  border-radius: 0.5rem;
  height: 1.15rem;
  width: 0;
  transition: width 1s ease 0.3s;
  text-align: right;
  color: #fff;
  padding-right: 0.3rem;
  line-height: 1.05rem;
}
.data_display {
  width: 96%;
  margin-left: 2%;
  display: flex;
}
.data_display li:first-child {
  margin-left: 0;
}
.data_display li {
  width: 17.6%;
  height: 4rem;
  border-radius: 0.5rem;
  background-color: #f2f2f2;
  margin-left: 0.6rem;
}
.data_display li p {
  margin: 0;
  line-height: 2rem;
  text-align: center;
}
.data_num {
  color: #fa9049;
  font-size: 1rem;
}
.tabTitle {
  border-top: 0px;
  margin-top: 2.5rem;
}
.tabList {
  display: flex;
  height: 4rem;
  width: 100%;
  line-height: 4rem;
  background-color: #f2f2f2;
  justify-content: space-around;
}
.latest_tasks {
  margin: 0.5rem;
  border-bottom: 0.001rem solid #e8e8e8 !important;
}
.latest_tasks ul {
  display: flex;
  justify-content: space-between;
  margin: 0.5rem;
}
.remind {
  position: absolute;
  top: 0.6rem;
  right: 1rem;
  z-index: 100;
}
@media screen and (min-width: 320px) and (max-width: 374px) {
  .page.has-tabbar .page-content .data_img dt .img_content {
    width: 2.5rem;
  }
  .page.has-tabbar .page-content .data_img dt .text_content li {
    font-size: 0.7rem;
  }
  .page.has-tabbar .page-content .data_img dt {
    /* height: 3.2rem; */
  }
  .page.has-tabbar .page-content .progress_content dt {
    font-size: 0.8rem;
  }
  .progress {
    height: 1rem;
  }
  .progress-done {
    height: 1rem;
  }
  .data_display li p {
    font-size: 0.8rem;
  }
  .tabTitle {
    margin-top: 2rem;
  }
  .tabList {
    height: 3rem;
    font-size: 0.8rem;
    line-height: 3rem;
  }
  .cur {
    font-size: 0.8rem;
  }
  .cur::after {
    top: 70%;
  }
  .latest_tasks {
    font-size: 0.8rem;
  }
  .latest_tasks ul {
    margin: 0.3rem;
  }
  .remind img {
    width: 1.2rem;
  }
  .remind {
    top: 0.8rem;
  }
}
</style>


