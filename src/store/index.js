import Vuex from "vuex";
import Vue from "vue";
import createPersistedState from "vuex-persistedstate";
import axios from "axios";

Vue.use(Vuex);

// 用于响应组件内的动作
const actions = {
  // 全选库存
  selectAllByInventory({ commit }, items) {
    commit("SelectAllByInventory", items);
  },
  // 全选我的出售
  selectAllBySell({ commit }, items) {
    commit("SelectAllBySell",items);
  },
  // 全不选
  resetSellAll({ commit }) {
    commit("resetSellCheckedItem");
  },
  // 点击单个item
  toggleSellCheckedItem(cont, id) {
    if (cont.state.isSell) {
      // 获取正在出售中的商品
      axios
        .get("http://localhost:8081/sell/getSellID", {
          params: {
            uID: cont.state.userInfo.uid,
          },
        })
        .then((res) => {
          let IDList = res.data.data;
          // 当点击的id未被出售时，才能触发点击
          if (!IDList.includes(id)) {
            cont.commit("toggleSellCheckedItem", id);
          }
        });
    } else {
      cont.commit("toggleSellCheckedItem", id);
    }
  },
};

// 用于操作数据（state）
const mutations = {
  // 全选库存
  SelectAllByInventory(state, items) {
    axios
      .get("http://localhost:8081/sell/getSellID", {
        params: {
          uID: state.userInfo.uid,
        },
      })
      .then((res) => {
        let IDList = res.data.data;
        items.forEach((item) => {
          if (
            !state.checkedSellItem.includes(item.iid) &&
            !IDList.includes(item.iid)
          ) {
            state.checkedSellItem.push(item.iid);
          }
        });
      });
  },
  // 全选我的出售
  SelectAllBySell(state, items) { 
    items.forEach((item) => {
      if (!state.checkedSellItem.includes(item.iid)) {
        state.checkedSellItem.push(item.iid);
      }
    });
  },
  // 全不选
  resetSellCheckedItem(state) {
    state.checkedSellItem = [];
  },
  // 点击单个item
  toggleSellCheckedItem(state, id) {
    const index = state.checkedSellItem.indexOf(id);
    if (index > -1) {
      state.checkedSellItem.splice(index, 1);
    } else {
      state.checkedSellItem.push(id);
    }
  },
  // 切换库存的排序方式(时间、价格、磨损)
  toggleInventorySortord(state, val) {
    state.inventorySortord = val;
  },
  // 切换出售的排序方式(时间、价格、磨损)
  toggleSellSortord(state, val) {
    state.sellSortord = val;
  },
  // 添加用户信息
  addUserInfo(state, info) {
    state.userInfo = info;
  },
  // 删除用户信息
  removeUserInfo(state) {
    state.userInfo = {};
  },
  // 修改用户余额
  updataUserPrice(state, val) {
    state.userInfo[val.payment] = val.price;
  },
  // 修改用户名
  updateUserNickName(state, val) {
    state.userInfo.nickName = val;
  },
  // 修改手机号
  updateUserAccount(state, val) {
    state.userInfo.account = val;
  },
  // 修改当前所在tab
  updateIsSell(state, val) {
    state.isSell=val
  }
};

// 用于存放数据
const state = {
  isSell: false, //是否为我的出售页，否为出售，真为库存
  checkedSellItem: [],
  inventorySortord: "gainTime desc",
  sellSortord: "sellingTime",
  group: "sell",
  userInfo: {},
};

const getters = {
  // 判断当前id是否存在checkedSellItem中
  isChecked: (state) => (id) => {
    return state.checkedSellItem.includes(id);
  },
};

export default new Vuex.Store({
  actions,
  mutations,
  state,
  getters,
  plugins: [
    createPersistedState({
      // 存储方式：localStorage、sessionStorage、cookies
      storage: window.localStorage,
      // 存储的 key 的key值
      key: "store",
      render(state) {
        // 要存储的数据：采用es6扩展运算符的方式存储了state中所有的数据
        return { ...state };
      },
    }),
  ],
});
