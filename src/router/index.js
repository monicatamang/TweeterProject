import Vue from "vue"
import VueRouter from "vue-router"
import Home from "../views/Home/Home.vue";
import CreateAccount from "../views/Home/CreateAccount.vue";
import Login from "../views/Home/Login.vue";
import Feed from "../views/Feed.vue";
import Profile from "../views/Profile/Profile.vue";
import EditProfile from "../views/Profile/EditProfile.vue";
import UserAccount from "../views/Account/UserAccount.vue";
import UpdateEmail from "../views/Account/UpdateEmail.vue";

Vue.use(VueRouter)

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home
  },
  {
    path: "/CreateAccount",
    name: "CreateAccount",
    component: CreateAccount
  },
  {
    path: "/Login",
    name: "Login",
    component: Login
  },
  {
    path: "/Feed",
    name: "Feed",
    component: Feed
  },
  {
    path: "/Profile/:username",
    name: "Profile",
    component: Profile,
    children: [
      {
        path: "Edit",
        name: "Edit",
        component: EditProfile
      }
    ]
  },
  // {
  //   path: "/EditProfile",
  //   name: "EditProfile",
  //   component: EditProfile
  // },
  {
    path: "/Account",
    name: "Account",
    component: UserAccount,
  },
  {
    path: "/UpdateEmail",
    name: "UpdateEmail",
    component: UpdateEmail
  }
]

const router = new VueRouter({
  routes
})

export default router
