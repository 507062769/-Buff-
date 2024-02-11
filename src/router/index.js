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
    children: [
      {
        name: "myPurse",
        path: "myPurse",
        component: () => import("../views/user-center/myPurse.vue"),
        children: [
          {
            name: "recharge",
            path: "recharge",
            component: () => import("../views/user-center/recharge.vue"),
          },
          {
            name: "withdraw",
            path: "withdraw",
            component: () => import("../views/user-center/withdraw.vue"),
          },
          {
            name: "asset",
            path: "asset",
            component: () => import("../views/user-center/asset.vue"),
          },
        ],
      },
      {
        name: "profile",
        path: "profile",
        component: () => import("../views/user-center/profile.vue"),
      },
      {
        name: "message",
        path: "message",
        component: () => import("../views/user-center/message.vue"),
      },
    ],
  },
  {
    name: "MyBackpack",
    path: "/myBackpack",
    component: () => import("../views/myBackpack/myBackpack.vue"),
    children: [
      {
        name: "Inventory",
        path: "inventory",
        component: () => import("../views/myBackpack/inventory.vue"),
      },
      {
        name: "BuyHistory",
        path: "buyHistory",
        component: () => import("../views/myBackpack/buyHistory.vue"),
      },
      {
        name: "ToReceive",
        path: "toReceive",
        component: () => import("../views/myBackpack/toReceive.vue"),
      },
    ],
  },
  {
    name: "MySell",
    path: "/mySell",
    component: () => import("../views/mySell/mySell.vue"),
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
