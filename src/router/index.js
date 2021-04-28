import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue';
import CreateAccount from "../views/CreateAccount.vue";
import Login from "../views/Login.vue";
import MyProfile from "../views/MyProfile.vue";

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/CreateAccount',
    name: 'CreateAccount',
    component: CreateAccount
  },
  {
    path: '/Login',
    name: 'Login',
    component: Login
  },
  {
    path: '/MyProfile',
    name: 'MyProfile',
    component: MyProfile
  }
]

const router = new VueRouter({
  routes
})

export default router
