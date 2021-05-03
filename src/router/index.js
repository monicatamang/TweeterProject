import Vue from "vue"
import VueRouter from "vue-router"
import Home from "../views/Home/Home.vue";
import CreateAccount from "../views/Home/CreateAccount.vue";
import Login from "../views/Home/Login.vue";
import Feed from "../views/Feed.vue";
import OwnerProfile from "../views/Profile/OwnerProfile.vue";
import EditProfile from "../views/Profile/EditProfile.vue";
import OwnerAccount from "../views/Account/OwnerAccount.vue";
import UpdateEmail from "../views/Account/UpdateEmail.vue";
import UpdateUsername from "../views/Account/UpdateUsername.vue";
import UpdatePassword from "../views/Account/UpdatePassword.vue";
import DeleteAccount from "../views/Account/DeleteAccount.vue";
import UsersProfileDetails from "../views/Profile/UsersProfileDetails.vue";
import EditTweet from "../views/Tweet/EditTweet.vue";
import DeleteTweet from "../views/Tweet/DeleteTweet.vue";
import UsersTweet from "../views/Tweet/UsersTweet.vue";
import UpdateComments from "../views/Comments/UpdateComments.vue";
import DeleteComments from "../views/Comments/DeleteComments.vue";
import ReplyToComments from "../views/Comments/ReplyToComments.vue";
import OwnerFollowersList from "../views/Follows/OwnerFollowersList.vue";
import OwnerFollowingList from "../views/Follows/OwnerFollowingList.vue";

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
    name: "UsersProfileDetails",
    component: UsersProfileDetails
  },
  {
    path: "/Followers/:username",
    name: "OwnerFollowersList",
    component: OwnerFollowersList
  },
  {
    path: "/Following/:username",
    name: "OwnerFollowingList",
    component: OwnerFollowingList
  },
  {
    path: "/Tweet/:username",
    name: "UsersTweet",
    component: UsersTweet
  },
  {
    path: "/Comment/:username",
    name: "UpdateComments",
    component: UpdateComments
  },
  {
    path: "/Comment/:username",
    name: "DeleteComments",
    component: DeleteComments
  },
  {
    path: "/Comment/:username",
    name: "ReplyToComments",
    component: ReplyToComments
  },
  {
    path: "/Profile",
    name: "Profile",
    component: OwnerProfile,
  },
  {
    path: "/Profile/:username",
    name: "EditTweet",
    component: EditTweet
  },
  {
    path: "/Profile/:username",
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
]

const router = new VueRouter({
  routes
})

export default router
