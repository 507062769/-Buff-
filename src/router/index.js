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
    name: "Contribute",
    path: "/contribute",
    component: () => import("../views/gameInfo/contribute.vue"),
  },
  {
    name: "GameInfoDetails",
    path: "/gameInfo/:gID",
    component: () => import("../views/gameInfo/GameInfoDetails.vue"),
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
          {
            name: "ewm",
            path: "ewm",
            component: () => import("../views/user-center/ewm.vue"),
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
    ],
  },
  {
    name: "MySell",
    path: "/mySell",
    component: () => import("../views/mySell/mySell.vue"),
    children: [
      {
        name: "SellManage",
        path: "sellManage",
        component: () => import("../views/mySell/sellManage.vue"),
        children: [
          {
            name: "OnSell",
            path: "onSell",
            component: () => import("../views/mySell/onSell.vue"),
          },
          {
            name: "WaitDelivery",
            path: "waitDelivery",
            component: () => import("../views/mySell/waitDelivery.vue"),
          },
        ],
      },
      {
        name: "SellHistory",
        path: "sellHistory",
        component: () => import("../views/mySell/sellHistory.vue"),
      },
      {
        name: "SellStatistics",
        path: "sellStatistics",
        component: () => import("../views/mySell/sellStatistics.vue"),
      },
    ],
  },
  {
    name: "Goods",
    path: "/goods/:goodsID",
    component: () => import("../views/goods/goodsDetail.vue"),
    children: [
      {
        name: "CurrentSell",
        path: "currentSell",
        component: () => import("../views/goods/currentSell.vue"),
      },
      {
        name: "OkHistory",
        path: "okHistory",
        component: () => import("../views/goods/okHistory.vue"),
      },
      {
        name: "PriceTrend",
        path: "priceTrend",
        component: () => import("../views/goods/priceTrend.vue"),
      },
    ],
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
