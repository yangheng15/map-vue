import Vue from 'vue'
import VueRouter from 'vue-router'
Vue.use(VueRouter)

const Login = () => import('@/views/Login.vue');
const Home = () => import('@/views/Home/Home.vue');
const Remind = () => import('@/views/Home/Remind.vue');
const Task = () => import('@/views/Task/Task.vue');
const Grid = () => import('@/views/Grid/Grid.vue');
// 资源选择
const ResourceSelection = () => import('@/views/Grid/ResourceSelection.vue');
// 网格选择
const GridSelection = () => import('@/views/Grid/GridSelection.vue');
// 路径规划
const PathPlanning = () => import('@/views/Grid/PathPlanning.vue');
//工作台
const WorkBench = () => import('@/views/WorkBench/WorkBench.vue');
//我的客户不要了
const WorkbenchBranch = () => import('@/views/WorkBench/WorkbenchBranch.vue');
//任务详情
const ArticleViewBasic = () => import('@/views/WorkBench/ArticleViewBasic.vue');
const PutRecord = () => import('@/views/WorkBench/PutRecord.vue');
//客户视图、农户
const CustomerView = () => import('@/views/WorkBench/CustomerView.vue');
//任务详情
const MissionDetails = () => import('@/views/WorkBench/MissionDetails.vue');
//营销客户详情
const MarketingDetails = () => import('@/views/WorkBench/MarketingDetails.vue');
//添加营销记录
const AddMarketingRecord = () => import('@/views/WorkBench/AddMarketingRecord.vue');
//营销记录详情
const EditMarketingRecord = () => import('@/views/WorkBench/EditMarketingRecord.vue');
//产品介绍
const ProductIntroduction = () => import('@/views/WorkBench/ProductIntroduction.vue');
//产品目录
const ProductCatalog = () => import('@/views/WorkBench/ProductCatalog.vue');
//产品目录详情
const ProductCatalogDetail = () => import('@/views/WorkBench/ProductCatalogDetail.vue');
//知识库
const knowledgeBase = () => import('@/views/WorkBench/knowledgeBase.vue');
//知识库详情
const knowledgeBaseDetail = () => import('@/views/WorkBench/knowledgeBaseDetail.vue');
// 通讯录
const TelePhone = () => import('@/views/WorkBench/TelePhone.vue');
// 黑名单
const BlackList = () => import('@/views/WorkBench/BlackList.vue');
// 客户认领
const CustomerCaim = () => import('@/views/WorkBench/CustomerCaim.vue');
// 计算器
const Calculator = () => import('@/views/WorkBench/Calculator.vue');
// 排行榜
const RankingList = () => import('@/views/WorkBench/RankingList.vue');
// 最近联系
const RecentContact = () => import('@/views/WorkBench/RecentContact.vue');
// 任务完成
const MissionAccomplished = () => import('@/views/WorkBench/MissionAccomplished.vue');
// 任务管理
const TaskManagement = () => import('@/views/WorkBench/TaskManagement/TaskManagement.vue');
// 潜在客户
const PotentialCustomers = () => import('@/views/WorkBench/PotentialCustomers/PotentialCustomers.vue');
// 潜在客户
const MyClients = () => import('@/views/WorkBench/MyClients/MyClients.vue');
// 添加潜在客户
const AddPotentialCustomers = () => import('@/views/WorkBench/PotentialCustomers/AddPotentialCustomers.vue');
// 修改潜在客户
const EditPotentialCustomers = () => import('@/views/WorkBench/PotentialCustomers/EditPotentialCustomers.vue');
// 客户池
const CustomerPool = () => import('@/views/WorkBench/CustomerPool/CustomerPool.vue');
// 客户池筛选
const ScreenCustomerPool = () => import('@/views/WorkBench/CustomerPool/ScreenCustomerPool.vue');
// 农户
const PeasantHousehold = () => import('@/views/WorkBench/PeasantHousehold/PeasantHousehold.vue');
// 农户信息
const FarmersInformation = () => import('@/views/WorkBench/PeasantHousehold/FarmersInformation.vue');
// 农户成员详情
const FarmerMemberDetails = () => import('@/views/WorkBench/PeasantHousehold/FarmerMemberDetails.vue');
const User = () => import('@/views/User/User.vue');
const MyMedal = () => import('@/views/User/MyMedal.vue');
const UpdatePassword = () => import('@/views/User/UpdatePassword.vue');


// router.beforeEach((to, from, next) => {
//   // const token = localStorage.getItem('_token');
//   // if(!token) {
//   //   console.log(to);
//   //   if(to.path === '/login') {
//   //     next();
//   //   }else {
//   //     next('/login')
//   //   }
//   // }else {
//   //   next();
//   // }
// })


const routes = [{
    path: '/',
    redirect: '/login',
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/Home',
    name: 'Home',
    component: Home,
  },
  {
    path: '/Remind',
    name: 'Remind',
    component: Remind,
  },
  {
    path: '/Task',
    name: 'Task',
    component: Task,
  },
  {
    path: '/WorkBench',
    name: 'WorkBench',
    component: WorkBench,
  },
  {
    path: '/WorkbenchBranch',
    name: 'WorkbenchBranch',
    component: WorkbenchBranch,
  },
  {
    path: '/ArticleViewBasic',
    name: 'ArticleViewBasic',
    component: ArticleViewBasic,
  },
  {
    path: '/PutRecord',
    name: 'PutRecord',
    component: PutRecord,
  },
  {
    path: '/CustomerView',
    name: 'CustomerView',
    component: CustomerView,
  },
  {
    path: '/MissionDetails',
    name: 'MissionDetails',
    component: MissionDetails,
  },
  {
    path: '/MarketingDetails',
    name: 'MarketingDetails',
    component: MarketingDetails,
  },
  {
    path: '/AddMarketingRecord',
    name: 'AddMarketingRecord',
    component: AddMarketingRecord,
  },
  {
    path: '/EditMarketingRecord',
    name: 'EditMarketingRecord',
    component: EditMarketingRecord,
  },
  {
    path: '/ProductIntroduction',
    name: 'ProductIntroduction',
    component: ProductIntroduction,
  },
  {
    path: '/ProductCatalog',
    name: 'ProductCatalog',
    component: ProductCatalog,
  },
  {
    path: '/ProductCatalogDetail',
    name: 'ProductCatalogDetail',
    component: ProductCatalogDetail,
  },
  {
    path: '/knowledgeBase',
    name: 'knowledgeBase',
    component: knowledgeBase,
  },
  {
    path: '/knowledgeBaseDetail',
    name: 'knowledgeBaseDetail',
    component: knowledgeBaseDetail,
  },
  {
    path: '/TelePhone',
    name: 'TelePhone',
    component: TelePhone,
  },
  {
    path: '/BlackList',
    name: 'BlackList',
    component: BlackList,
  },
  {
    path: '/CustomerCaim',
    name: 'CustomerCaim',
    component: CustomerCaim,
  },
  {
    path: '/Calculator',
    name: 'Calculator',
    component: Calculator,
  },
  {
    path: '/RankingList',
    name: 'RankingList',
    component: RankingList,
  },
  {
    path: '/RecentContact',
    name: 'RecentContact',
    component: RecentContact,
  },
  {
    path: '/MissionAccomplished',
    name: 'MissionAccomplished',
    component: MissionAccomplished,
  },
  {
    path: '/TaskManagement',
    name: 'TaskManagement',
    component: TaskManagement,
  },
  {
    path: '/PotentialCustomers',
    name: 'PotentialCustomers',
    component: PotentialCustomers,
  },
  {
    path: '/AddPotentialCustomers',
    name: 'AddPotentialCustomers',
    component: AddPotentialCustomers,
  },
  {
    path: '/EditPotentialCustomers',
    name: 'EditPotentialCustomers',
    component: EditPotentialCustomers,
  },
  {
    path: '/MyClients',
    name: 'MyClients',
    component: MyClients,
  },
  {
    path: '/CustomerPool',
    name: 'CustomerPool',
    component: CustomerPool,
  },
  {
    path: '/ScreenCustomerPool',
    name: 'ScreenCustomerPool',
    component: ScreenCustomerPool,
  },
  {
    path: '/PeasantHousehold',
    name: 'PeasantHousehold',
    component: PeasantHousehold,
  },
  {
    path: '/FarmersInformation',
    name: 'FarmersInformation',
    component: FarmersInformation,
  },
  {
    path: '/FarmerMemberDetails',
    name: 'FarmerMemberDetails',
    component: FarmerMemberDetails,
  },
  {
    path: '/User',
    name: 'User',
    component: User,
  },
  {
    path: "/User/MyMedal",
    name: "MyMedal",
    component: MyMedal
  },
  {
    path: "/User/UpdatePassword",
    name: "UpdatePassword",
    component: UpdatePassword
  },
  {
    path: '/Grid',
    name: 'Grid',
    component: Grid,
  },
  {
    path: "/Grid/ResourceSelection",
    name: "ResourceSelection",
    component: ResourceSelection
  },
  {
    path: "/Grid/GridSelection",
    name: "GridSelection",
    component: GridSelection
  },
  {
    path: "/Grid/PathPlanning",
    name: "PathPlanning",
    component: PathPlanning
  },
]
const router = new VueRouter({
  mode: 'hash',
  base: process.env.BASE_URL,
  routes
})


export default router