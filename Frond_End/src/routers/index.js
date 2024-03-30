// router.js

import { createRouter, createWebHistory } from "vue-router";
import HomePageVue from "../pages/home/HomePage.vue";

import ArticleDetailsPageVue from "../pages/details/ArticleDetailsPage.vue";
import RegisterPageVue from "../pages/register/RegisterPage.vue";
import LoginVue from "../pages/login/Login.vue";
import AllBookVue from "../pages/allArticle/AllBook.vue";
import EditSachVue from "../pages/admin/EditSach.vue";
import ProfilePageVue from "../pages/profile/ProfilePage.vue";
import ManagerAdminVue from "../pages/admin/screen/ManagerAdmin.vue";
const routes = [
  {
    path: "/",
    name: "Home",
    component: HomePageVue,
  },
  {
    path: "/sach",
    name: "Sach",
    component: AllBookVue,
  },
  {
    path: "/admin/sach/edit/:id",
    name: "Chinh Sua Sach",
    component: EditSachVue,
  },
  {
    path: "/sach/:id",
    name: "Sach Chi Tiet",
    component: ArticleDetailsPageVue,
  },
  {
    path: "/profile",
    name: "Profile",
    component: ProfilePageVue,
  },
  {
    path: "/manager",
    name: "ManagerAdmin",
    component: ManagerAdminVue,
  },
  {
    path: "/register",
    name: "Dang Ky",
    component: RegisterPageVue,
  },
  {
    path: "/login",
    name: "Dang Nhap",
    component: LoginVue,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
