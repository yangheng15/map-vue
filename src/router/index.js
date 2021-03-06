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
// 地图地址展示
const MapAddressDisplay = () => import('@/views/WorkBench/MapAddressDisplay.vue');
//客户视图、农户
const CustomerView = () => import('@/views/WorkBench/CustomerView.vue');
//客户视图
const CustomerViewPresentation = () => import('@/views/WorkBench/CustomerViewPresentation/CustomerViewPresentation.vue');
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
// 商机发现
const BusinessOpportunityDiscovery = () => import('@/views/WorkBench/BusinessOpportunityDiscovery/BusinessOpportunityDiscovery.vue');
// 商机发现详情
const BusinessOpportunityDiscoveryDetails = () => import('@/views/WorkBench/BusinessOpportunityDiscovery/BusinessOpportunityDiscoveryDetails.vue');
// 主营产品
const MainProducts = () => import('@/views/WorkBench/BusinessOpportunityDiscovery/MainProducts.vue');
// 任务完成
const MissionAccomplished = () => import('@/views/WorkBench/MissionAccomplished.vue');
// 任务管理
const TaskManagement = () => import('@/views/WorkBench/TaskManagement/TaskManagement.vue');
// 潜在客户
const PotentialCustomers = () => import('@/views/WorkBench/PotentialCustomers/PotentialCustomers.vue');
// 我的客户
const MyClients = () => import('@/views/WorkBench/MyClients/MyClients.vue');
// 分享
const CorporateClientsShare = () => import('@/views/WorkBench/CorporateClientsShare/CorporateClientsShare.vue');
// 个人客户
const IndividualCustomers = () => import('@/views/WorkBench/IndividualCustomers/IndividualCustomers.vue');
// 个人客户建档
const IndividualCustomersRecord = () => import('@/views/WorkBench/IndividualCustomers/IndividualCustomersRecord.vue');
// 个人客户建档修改
const EditIndividualCustomersRecord = () => import('@/views/WorkBench/IndividualCustomers/EditIndividualCustomersRecord.vue');
// 个人客户添加营销记录
const IndividualAddMarketingRecord = () => import('@/views/WorkBench/IndividualCustomers/IndividualAddMarketingRecord.vue');
// 个人客户池详情
const IndividualCustomersDetails = () => import('@/views/WorkBench/IndividualCustomers/IndividualCustomersDetails.vue');
// 对公客户
const CorporateClients = () => import('@/views/WorkBench/CorporateClients/CorporateClients.vue');
// 对公客户资产详情
const AssetsLiabilitiesDetail1 = () => import('@/views/WorkBench/CorporateClients/AssetsLiabilitiesDetail1.vue');
// 对公客户资产添加
const AssetsLiabilitiesAdd = () => import('@/views/WorkBench/CorporateClients/AssetsLiabilitiesAdd.vue');
// 个人客户资产添加
const AssetsLiabilitiesAddIn = () => import('@/views/WorkBench/IndividualCustomers/AssetsLiabilitiesAddIn.vue');
//对公客户建档
const PublicCustomerRecord = () => import('@/views/WorkBench/CorporateClients/PublicCustomerRecord.vue');
//对公客户修改
const EditPublicCustomerRecord = () => import('@/views/WorkBench/CorporateClients/EditPublicCustomerRecord.vue');
//对公客户添加营销记录
const PublicAddMarketingRecord = () => import('@/views/WorkBench/CorporateClients/PublicAddMarketingRecord.vue');
//对公客户客户池详情
const CustomerPoolCustomerDetails = () => import('@/views/WorkBench/CorporateClients/CustomerPoolCustomerDetails.vue');
// 我的客户筛选
const ScreenMyCustomers = () => import('@/views/WorkBench/MyClients/ScreenMyCustomers.vue');
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
// 农户资产负债添加
const FarmersAssetsLiabilitiesAdd = () => import('@/views/WorkBench/PeasantHousehold/FarmersAssetsLiabilitiesAdd.vue');
// 农户成员详情
const FarmerMemberDetails = () => import('@/views/WorkBench/PeasantHousehold/FarmerMemberDetails.vue');
// 农户资产负债详情
const AssetsLiabilitiesDetail = () => import('@/views/WorkBench/PeasantHousehold/AssetsLiabilitiesDetail.vue');
// 农户添加营销记录
const AddMarketedRecord = () => import('@/views/WorkBench/PeasantHousehold/AddMarketedRecord.vue');
// 农户修改营销记录
const EditMarkedRecord = () => import('@/views/WorkBench/PeasantHousehold/EditMarkedRecord.vue');
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
    path: '/MapAddressDisplay',
    name: 'MapAddressDisplay',
    component: MapAddressDisplay,
  },
  {
    path: '/CustomerView',
    name: 'CustomerView',
    component: CustomerView,
  },
  {
    path: '/CustomerViewPresentation',
    name: 'CustomerViewPresentation',
    component: CustomerViewPresentation,
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
    path: '/BusinessOpportunityDiscovery',
    name: 'BusinessOpportunityDiscovery',
    component: BusinessOpportunityDiscovery,
  },
  {
    path: '/BusinessOpportunityDiscoveryDetails',
    name: 'BusinessOpportunityDiscoveryDetails',
    component: BusinessOpportunityDiscoveryDetails,
  },
  {
    path: '/MainProducts',
    name: 'MainProducts',
    component: MainProducts,
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
    path: '/CorporateClients',
    name: 'CorporateClients',
    component: CorporateClients,
  },
  {
    path: '/AssetsLiabilitiesDetail1',
    name: 'AssetsLiabilitiesDetail1',
    component: AssetsLiabilitiesDetail1,
  },
  {
    path: '/AssetsLiabilitiesAdd',
    name: 'AssetsLiabilitiesAdd',
    component: AssetsLiabilitiesAdd,
  },
  {
    path: '/AssetsLiabilitiesAddIn',
    name: 'AssetsLiabilitiesAddIn',
    component: AssetsLiabilitiesAddIn,
  },
  {
    path: '/PublicCustomerRecord',
    name: 'PublicCustomerRecord',
    component: PublicCustomerRecord,
  },
  {
    path: '/EditPublicCustomerRecord',
    name: 'EditPublicCustomerRecord',
    component: EditPublicCustomerRecord,
  },
  {
    path: '/PublicAddMarketingRecord',
    name: 'PublicAddMarketingRecord',
    component: PublicAddMarketingRecord,
  },
  {
    path: '/CustomerPoolCustomerDetails',
    name: 'CustomerPoolCustomerDetails',
    component: CustomerPoolCustomerDetails,
  },
  {
    path: '/CorporateClientsShare',
    name: 'CorporateClientsShare',
    component: CorporateClientsShare,
  },
  {
    path: '/IndividualCustomers',
    name: 'IndividualCustomers',
    component: IndividualCustomers,
  },
  {
    path: '/IndividualCustomersRecord',
    name: 'IndividualCustomersRecord',
    component: IndividualCustomersRecord,
  },
  {
    path: '/EditIndividualCustomersRecord',
    name: 'EditIndividualCustomersRecord',
    component: EditIndividualCustomersRecord,
  },
  {
    path: '/IndividualAddMarketingRecord',
    name: 'IndividualAddMarketingRecord',
    component: IndividualAddMarketingRecord,
  },
  {
    path: '/IndividualCustomersDetails',
    name: 'IndividualCustomersDetails',
    component: IndividualCustomersDetails,
  },
  {
    path: '/ScreenMyCustomers',
    name: 'ScreenMyCustomers',
    component: ScreenMyCustomers,
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
    path: '/FarmersAssetsLiabilitiesAdd',
    name: 'FarmersAssetsLiabilitiesAdd',
    component: FarmersAssetsLiabilitiesAdd,
  },
  {
    path: '/FarmerMemberDetails',
    name: 'FarmerMemberDetails',
    component: FarmerMemberDetails,
  },
  {
    path: '/AssetsLiabilitiesDetail',
    name: 'AssetsLiabilitiesDetail',
    component: AssetsLiabilitiesDetail,
  },
  {
    path: '/AddMarketedRecord',
    name: 'AddMarketedRecord',
    component: AddMarketedRecord,
  },
  {
    path: '/EditMarkedRecord',
    name: 'EditMarkedRecord',
    component: EditMarkedRecord,
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