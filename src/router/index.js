import Vue from "vue"
import VueRouter from "vue-router"
import Home from "../views/Home.vue";
import CreateAccount from "../views/CreateAccount.vue";
import Login from "../views/Login.vue";
import Feed from "../views/Feed.vue";
import OwnerProfile from "../views/Profile/OwnerProfile.vue";
import EditProfile from "../views/Profile/EditProfile.vue";
import OwnerAccount from "../views/Account/OwnerAccount.vue";
import UpdateEmail from "../views/Account/UpdateEmail.vue";
import UpdateUsername from "../views/Account/UpdateUsername.vue";
import UpdatePassword from "../views/Account/UpdatePassword.vue";
import DeleteAccount from "../views/Account/DeleteAccount.vue";
import UsersProfiles from "../views/Profile/UsersProfiles.vue";
import EditTweet from "../views/Tweet/EditTweet.vue";
import DeleteTweet from "../views/Tweet/DeleteTweet.vue";
import UsersTweet from "../views/Tweet/UsersTweet.vue";
import UpdateComments from "../views/Comments/UpdateComments.vue";
import DeleteComments from "../views/Comments/DeleteComments.vue";
import Discover from "../views/Discover.vue";

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
    path: "/Profile/:userId",
    name: "UsersProfiles",
    component: UsersProfiles
  },
  {
    path: "/Tweet/:tweetId",
    name: "UsersTweet",
    component: UsersTweet
  },
  {
    path: "/Comment/:commentId",
    name: "UpdateComments",
    component: UpdateComments
  },
  {
    path: "/Comment/:tweetId",
    name: "DeleteComments",
    component: DeleteComments
  },
  {
    path: "/Profile",
    name: "Profile",
    component: OwnerProfile,
  },
  {
    path: "/EditTweet/:tweetId",
    name: "EditTweet",
    component: EditTweet
  },
  {
    path: "/DeleteTweet/:tweetId",
    name: "DeleteTweet",
    component: DeleteTweet
  },
  {
    path: "/EditProfile",
    name: "EditProfile",
    component: EditProfile
  },
  {
    path: "/Account",
    name: "Account",
    component: OwnerAccount,
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
    component: DeleteAccount
  },
  {
    path: "/Discover",
    name: "Discover",
    component: Discover
  },
]

const router = new VueRouter({
  routes
})

export default router
