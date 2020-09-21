<template>
  <div class="ResourceSelection">
    <child-nav :title="typeCN"></child-nav>
    <div v-if="typeCN=='资源选择'">
      <van-search v-model="value" placeholder="网格名称、客户名称、资源名称" />
      <!-- <div class="resource_selection">
        <p>任务</p>
        <ul v-for="(thisItem,index) in resource_selection1" :key="index" class="cartItem">
          <van-checkbox v-model="thisItem.id" shape="square">{{thisItem.name}}</van-checkbox>
        </ul>
        <van-pagination
          v-model="currentPage"
          :total-items="125"
          :show-page-size="3"
          force-ellipses
        />
      </div>
      <div class="resource_selection new_selection_two">
        <p>客户</p>
        <ul v-for="(thisItem,index) in resource_selection2" :key="index" class="cartItem">
          <van-checkbox v-model="thisItem.id" shape="square">{{thisItem.name}}</van-checkbox>
        </ul>
      </div> -->
      <div class="resource_selection new_selection_three">
        <p>资源</p>
        <ul v-for="(thisItem,index) in resource_selection3" :key="index" class="cartItem">
          <van-checkbox v-model="thisItem.id" shape="square">{{thisItem.name}}</van-checkbox>
        </ul>
      </div>
      <div class="save" @click="$router.push({path:'/grid/',query:{taskChoice:'2'}})">
        <button>确认</button>
      </div>
    </div>
    <div v-if="typeCN=='网格选择'">
      <div class="resource_selection">
        <ul v-for="(thisItem,index) in grid_selection1" :key="index" class="cartItem">
           <van-checkbox v-model="thisItem.id" shape="square">{{thisItem.name}}</van-checkbox>
        </ul>
      </div>
      <div class="resource_selection" style="margin-top:0.5rem">
        <p>基础网格</p>
        <ul v-for="(thisItem,index) in grid_selection2" :key="index" class="cartItem">
           <van-checkbox v-model="thisItem.id" shape="square">{{thisItem.name}}</van-checkbox>
        </ul>
      </div>
      <div class="resource_selection" style="margin-top:0.5rem">
        <p>专题网格</p>
        <ul v-for="(thisItem,index) in grid_selection3" :key="index" class="cartItem">
           <van-checkbox v-model="thisItem.id" shape="square">{{thisItem.name}}</van-checkbox>
        </ul>
      </div>
      <!-- @click="$router.push({path:'/index/grid/',query:{userId:'718346'}})" -->
      <!-- @click="$router.push('/index/grid/')" -->
      <div class="save" @click="$router.push({path:'/grid/',query:{userId:'0'}})">
        <button>确认</button>
      </div>
    </div>
    <div v-if="typeCN=='路径规划'">
      <van-search v-model="value" placeholder="请输入客户名称" />
      <div class="choice_people" style="border-bottom:1px solid #e8e8e8">
        <p>
          已选择
          <span style="color:#ed3632;font-size:1.2rem">{{path_planning.length}}</span>
          人
        </p>
        <ul v-for="(thisItem,index) in path_planning" :key="index">
          <li>
            <span>
              <img style="width: 3rem;border-radius: 100%" src="../../assets/grid/men1.jpg" alt />
              <img
                class="chahao"
                style="width: 1rem;"
                src="../../assets/grid/chahao.jpg"
                @click="remotePlanning(thisItem)"
                alt
              />
            </span>
            <p>{{thisItem.name}}</p>
          </li>
        </ul>
      </div>
      <div class="resource_selection selection_people">
        <ul v-for="(thisItem,index) in path_planning_list" :key="index" class="cartItem" style="border-bottom:1px solid #e8e8e8">
          <li>
            <p>
              <img style=" width: 3rem;border-radius: 100%" src="../../assets/grid/men1.jpg" alt />
            </p>
            <div>
              <p>{{thisItem.name}}</p>
              <p>{{thisItem.grade}}</p>
            </div>
          </li>
          <van-checkbox v-model="thisItem.check" @click="selectCheck(thisItem)" shape="square"></van-checkbox>
        </ul>
        <div class="save" @click="$router.push({path:'/grid/',query:{routePlan:'5'}})">
          <button>确认</button>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import ChildNav from "../../components/Public/ChildNav";
export default {
  name: "ResourceSelection",
  components: {
    ChildNav,
  },
  data() {
    return {
      checkAllFlag: false,
      typeCN: "",
      checked: true,
      currentPage: 1,
      value: "",
      resource_selection1: [
        {
          name: "卓越联腾企业贷客户拜访营销",
          id: 1,
        },
        {
          name: "某某企业电话营销",
          id: 2,
        },
        {
          name: "某某客户理财营销",
          id: 3,
        },
      ],
      resource_selection2: [
        {
          name: "个人",
          id: 1,
        },
        {
          name: "企业",
          id: 2,
        },
      ],
      resource_selection3: [
        {
          name: "小区",
          id: 1,
        },
        {
          name: "园区",
          id: 2,
        },
        {
          name: "医院",
          id: 3,
        },
        {
          name: "学校",
          id: 4,
        },
        {
          name: "商超",
          id: 5,
        },
        {
          name: "餐饮娱乐",
          id: 6,
        },
        {
          name: "酒店",
          id: 7,
        },
        {
          name: "社会团体",
          id: 8,
        },
        {
          name: "政府机构",
          id: 9,
        },
        {
          name: "汽车销售",
          id: 10,
        },
        {
          name: "汽车服务",
          id: 11,
        },
        {
          name: "建筑装修",
          id: 12,
        },
      ],
      grid_selection1: [
        {
          name: "只看我的",
        },
      ],
      grid_selection2: [
        {
          name: "行政区划",
        },
        {
          name: "机构权属",
        },
      ],
      grid_selection3: [
        {
          name: "手机银行推广",
        },
        {
          name: "特色存款专题",
        },
        {
          name: "ETC办理专题",
        },
        {
          name: "我的身边专题",
        },
      ],
      path_planning: [],
      path_planning_list: [
        {
          name: "曾小贤",
          grade: "客户等级：一级",
          check: false,
        },
        {
          name: "曾小贤",
          grade: "客户等级：一级",
          check: false,
        },
        {
          name: "曾小贤",
          grade: "客户等级：一级",
          check: false,
        },
        {
          name: "曾小贤",
          grade: "客户等级：一级",
          check: false,
        },
      ],
    };
  },
  created() {
    this.typeCN = this.$route.query.title;
  },
  methods: {
    remotePlanning(row) {
      row.check = false;
      this.path_planning.splice(
        this.path_planning.findIndex((it) => it === row),
        1
      );
    },
    selectCheck(row) {
      console.log(row);
      if (row.check) {
        this.path_planning.push(row);
      } else {
        this.path_planning.splice(this.path_planning.indexOf(row), 1);
      }
    },
    selectItem(thisItem) {
      console.log(thisItem);
      if (typeof thisItem.checked == "undefined") {
        this.$set(thisItem, "checked", true);
      } else {
        thisItem.checked = !thisItem.checked;
      }
    },
  },
  mounted() {},
};
</script>

<style scoped>
.ResourceSelection{
  padding-top: 46px;;
}
.van-pagination {
  margin-top: 20px;
}
.choice_people li .chahao {
  position: absolute;
  background-color: #ff5f72;
  border-radius: 100%;
  z-index: 20;
  top: -2rem;
  right: -0.3rem;
  width: 1rem;
  height: 1rem;
}
.cartItem {
  display: flex;
  flex-flow: row;
  position: relative;
  margin-top: 0.2rem;
  font-size: 0.9rem;
}
.selctBtn {
  width: 1rem;
  height: 1rem;
  border: 1px solid #000;
  /* margin: 1rem 0rem 0rem 1.2rem; */
  cursor: pointer;
}
.checked::before {
  position: absolute;
  content: "";
  font-size: 0.9rem;
  top: 50%;
  position: absolute;
  left: 50%;
  width: 1rem;
  height: 0.5rem;
  border: 0.1rem solid #fff;
  border-top: 0;
  border-right: 0rem;
  transform: rotate(-50deg) translate(0%, -125%);
}
.checked {
  position: relative;
  background: rgb(61, 66, 94);
  border: 1px solid rgb(61, 66, 94);
  color: #fff;
}
.cartItem li {
  width: 76%;
  margin-left: 0.5rem;
}
.screen_content {
  display: flex;
  position: relative;
}

.screen_content input {
  width: calc(100% - 1rem);
  height: 44px;
  margin: 1rem 0.5rem;
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
.path_search input {
  padding: 0rem 2.3rem 0rem 1rem;
}
.path_search img {
  left: auto;
  right: 5%;
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
.resource_selection {
  background: #fff;
  padding: 1rem;
  border-bottom: 0.001rem solid #e8e8e8;
}
.new_selection_two,
.new_selection_three {
  margin-top: 0.5rem;
  display: flex;
  flex-wrap: wrap;
}
.new_selection_two ul {
  width: 50%;
}
.new_selection_three ul {
  width: 33.3%;
}
.resource_selection p {
  width: 100%;
  margin: 0px 0px 10px 0px;
}
.choice_people {
  display: flex;
  background: #fff;
  flex-wrap: wrap;
  padding: 0.5rem;
  border-bottom: 1px solid #e8e8e8!important;
}
.choice_people p {
  width: 100%;
}
.choice_people li {
  margin-right: 1.5rem;
}
.choice_people li span {
  position: relative;
}
.selection_people {
  padding: 0.5rem;
}
.selection_people ul {
  border-bottom: 1px solid #e8e8e8!important;
  padding: 0.5rem 0rem;
  align-items: center;
}
.selection_people ul li {
  display: flex;
  justify-content: flex-start;
}
.selection_people ul li p {
  width: auto;
}
.selection_people ul li div {
  margin-left: 0.5rem;
}
.save {
  margin-top: 3rem;
  text-align: center;
  padding-bottom: 3rem;
}
.save button {
  border: 0.05rem solid #bbb;
  background: rgb(61, 66, 94);
  color: #fff;
  width: 6rem;
  height: 2rem;
  border-radius: 0.3rem;
}
.van-checkbox {
  height: 2rem;
}
@media screen and (min-width: 320px) and (max-width: 374px) {
  li,
  select,
  input,
  p,
  div {
    font-size: 0.8rem;
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
  .pop_title {
    height: 2em;
    line-height: 2rem;
  }
  .pop_content {
    padding: 0.5rem;
  }
  /*placeholder样式-开始*/
  input::-webkit-input-placeholder {
    font-size: 0.8rem !important;
  }
  input::-moz-placeholder {
    /* Mozilla Firefox 19+ */
    font-size: 0.8rem !important;
  }
  input:-moz-placeholder {
    /* Mozilla Firefox 4 to 18 */
    font-size: 0.8rem !important;
  }
  input:-ms-input-placeholder {
    /* Internet Explorer 10-11 */
    font-size: 0.8rem !important;
  }
  .van-radio__icon {
    height: 1.2rem !important;
  }
  .save button {
    height: 1.7rem;
    width: 5rem;
    font-size: 0.8rem;
  }
  .pop_content p .pop_content_right {
    height: 1.5rem;
  }
  .map_marker p img {
    width: 1.5rem;
  }
  .screen_content input {
    height: 2.5rem;
    margin: 0.5rem 0.5rem;
  }
  .selection_people ul {
    padding: 0rem;
  }
}
</style>
