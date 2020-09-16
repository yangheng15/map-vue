import Vue from 'vue'
import VueRouter from 'vue-router'
Vue.use(VueRouter)

const Login = () => import('@/views/Login.vue');
const Home = () => import('@/views/Home/Home.vue');
const Grid = () => import('@/views/Grid/Grid.vue');
const GridMap = () => import('@/views/Grid/GridMap.vue')
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
    component: Home
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
