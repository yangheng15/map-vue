import Vue from 'vue'
import VueRouter from 'vue-router'
Vue.use(VueRouter)

const Login = () => import('@/views/Login.vue');
const Home = () => import('@/views/Home/Home.vue');
const Remind = () => import('@/views/Home/Remind.vue');
const Task = () => import('@/views/Task/Task.vue');
const Grid = () => import('@/views/Grid/Grid.vue');
const ResourceSelection = () => import('@/views/Grid/ResourceSelection.vue');

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
        path: "/Home/Remind",
        name: "Remind",
        component: Remind
      },
    ]
  },
  {
    path: '/Task',
    name: 'Task',
    component: Task,
    children: [
      {
        path: "/Task/Remind",
        name: "Remind",
        component: Remind
      },
    ]
  },
  {
    path: '/Grid',
    name: 'Grid',
    component: Grid,
    children: [
      {
        path: "/grid/ResourceSelection",
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
