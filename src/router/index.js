import Vue from 'vue'
import VueRouter from 'vue-router'
Vue.use(VueRouter)

const Login = () => import('@/views/Login.vue');
const Home = () => import('@/views/Home/Home.vue');
const Remind = () => import('@/views/Home/Remind.vue');
const Task = () => import('@/views/Task/Task.vue');
const Grid = () => import('@/views/Grid/Grid.vue');
const GridMap = () => import('@/views/Grid/GridMap.vue')
const ResourceSelection = () => import('@/views/Grid/ResourceSelection.vue');
const WorkBench = () => import('@/views/WorkBench/WorkBench.vue');
const User = () => import('@/views/User/User.vue');
const MyMedal = () => import('@/views/User/MyMedal.vue');


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
    path: '/User',
    name: 'User',
    component: User,
    children: [
      {
        path: "/MyMedal",
        name: "MyMedal",
        component: MyMedal
      },
    ]
  },
  {
    path: '/Grid',
    name: 'Grid',
    component: Grid,
    children: [
      {
        path: '/',
        name: 'GridMap',
        component: GridMap
      },
      {
        path: "/ResourceSelection",
        name: "ResourceSelection",
        component: ResourceSelection
      },
    ]
  }
]

const router = new VueRouter({
  mode: 'hash',
  base: process.env.BASE_URL,
  routes
})

export default router
