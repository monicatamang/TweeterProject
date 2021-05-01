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
import UpdateUsername from "../views/Account/UpdateUsername.vue";
import UpdatePassword from "../views/Account/UpdatePassword.vue";
import DeleteUserAccount from "../views/Account/DeleteUserAccount.vue";
import UserProfileDetails from "../views/Profile/UserProfileDetails.vue";
import EditTweet from "../views/EditTweet.vue";

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
    path: "/Feed/:username",
    name: "UserProfileDetails",
    component: UserProfileDetails
  },
  {
    path: "/Profile",
    name: "Profile",
    component: Profile,
  },
  {
    path: "/Profile/:tweetId",
    name: "EditTweet",
    component: EditTweet
  },
  {
    path: "/EditProfile",
    name: "EditProfile",
    component: EditProfile
  },
  {
    path: "/Account",
    name: "Account",
    component: UserAccount,
  },
  {
    path: "/UpdateEmail",
    name: "UpdateEmail",
    component: UpdateEmail
  },
  {
    path: "/UpdateUsername",
    name: "UpdateUsername",
    component: UpdateUsername
  },
  {
    path: "/UpdatePassword",
    name: "UpdatePassword",
    component: UpdatePassword
  },
  {
    path: "/DeleteAccount",
    name: "Delete",
    component: DeleteUserAccount
  },
]

const router = new VueRouter({
  routes
})

export default router
