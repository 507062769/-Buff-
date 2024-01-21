import Vue from "vue";
import VueRouter from "vue-router";

const originalPush = VueRouter.prototype.push;
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch((err) => err);
};

Vue.use(VueRouter);

const routes = [
  {
    name: "Index",
    path: "/topHeader",
    component: () => import("../components/topHeader.vue"),
  },
  {
    name: "Home",
    path: "/home",
    component: () => import("../views/home/home.vue"),
  },
  {
    name: "Marketplace",
    path: "/marketplace",
    component: () => import("../views/market/market.vue"),
  },
  {
    name: "GameInfo",
    path: "/gameInfo",
    component: () => import("../views/gameInfo/gameInfo.vue"),
  },
  {
    name: "UserCenter",
    path: "/user-center",
    component: () => import("../views/user-center/user-center.vue"),
  },

  {
    name: "Defualt",
    path: "/",
    redirect: "/home",
  },
];

const router = new VueRouter({
  routes,
});

export default router;
