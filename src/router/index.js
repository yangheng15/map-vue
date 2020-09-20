import Vue from 'vue'
import VueRouter from 'vue-router'
Vue.use(VueRouter)

const Login = () => import('@/views/Login.vue');
const Home = () => import('@/views/Home/Home.vue');
const Remind = () => import('@/views/Home/Remind.vue');
const Task = () => import('@/views/Task/Task.vue');
const Grid = () => import('@/views/Grid/Grid.vue');
const ResourceSelection = () => import('@/views/Grid/ResourceSelection.vue');
const WorkBench = () => import('@/views/WorkBench/WorkBench.vue');
const WorkbenchBranch = () => import('@/views/WorkBench/WorkbenchBranch.vue');
const ArticleViewBasic = () => import('@/views/WorkBench/ArticleViewBasic.vue');
const PutRecord = () => import('@/views/WorkBench/PutRecord.vue');
const CustomerView = () => import('@/views/WorkBench/CustomerView.vue');
const User = () => import('@/views/User/User.vue');
const MyMedal = () => import('@/views/User/MyMedal.vue');
const UpdatePassword = () => import('@/views/User/UpdatePassword.vue');

const routes = [
  {
    path: '/',
    name: 'Login',
    component: Login
  },
  {
    path: '/Home',
    name: 'Home',
    component: Home,
    children: [
      {
        path: "/Remind",
        name: "Remind",
        component: Remind
      },
    ]
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
]

const router = new VueRouter({
  mode: 'hash',
  base: process.env.BASE_URL,
  routes
})

export default router
