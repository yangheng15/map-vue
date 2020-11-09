<template>
  <div class="TelePhone">
    <child-nav :title="typeCN"></child-nav>
    <div v-if="typeCN=='通讯录'">
      <van-search v-model="value" placeholder="请输入搜索人名" />
      <van-cell center v-for="(telephone,index) in telephoneList" :key="index">
        <template #title>
          <van-icon name="friends" size="20" />
          <span class="custom-title">{{telephone.name}}</span>
        </template>
        <template #right-icon>
          <a class="call" :href="'tel:' + telephone.telephoneNum">
            <van-icon name="phone" size="20" />
          </a>
        </template>
      </van-cell>
    </div>
  </div>
</template>
<script>
import ChildNav from "../../components/Public/ChildNav";
export default {
  components: {
    ChildNav,
  },
  data() {
    return {
      typeCN: "",
      value: "",
      telephoneList: [
        {
          name: "白凯南",
          telephoneNum: "18611278765",
        },
        {
          name: "班晓丽",
          telephoneNum: "18611458765",
        },
        {
          name: "波涛",
          telephoneNum: "18611987765",
        },
        {
          name: "车美娜",
          telephoneNum: "18611278765",
        },
        {
          name: "陈涛",
          telephoneNum: "18612578765",
        },
        {
          name: "崔佳佳",
          telephoneNum: "18611278985",
        },
        {
          name: "丁鑫",
          telephoneNum: "18611278765",
        },
        {
          name: "董璐",
          telephoneNum: "18612578765",
        },
        {
          name: "付讫",
          telephoneNum: "18611278985",
        },
        {
          name: "冯雪松",
          telephoneNum: "18611278985",
        },
        {
          name: "李飒",
          telephoneNum: "18612578765",
        },
        {
          name: "郝爽",
          telephoneNum: "18611278985",
        },
        {
          name: "张柳",
          telephoneNum: "18611278985",
        },
      ],
    };
  },
  created() {
    this.typeCN = this.$route.query.title;
  },

  methods: {},
};
</script>
<style scoped>
* {
  font-size: 14px;
}
.TelePhone {
  padding-top: 46px;
}
.van-icon-friends {
  vertical-align: middle;
  margin-right: 5px;
}
.custom-title {
  vertical-align: middle;
}
.call {
  color: #323233;
  display: flex;
}
@media screen and (min-width: 320px) and (max-width: 374px) {
  * {
    font-size: 13px;
  }
}
</style>
