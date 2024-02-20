import Vuex from "vuex";
import Vue from "vue";
import createPersistedState from "vuex-persistedstate";

Vue.use(Vuex);

// 用于响应组件内的动作
const actions = {
  // 全选
  allSellSelect({ commit }, items) {
    commit("addAllSellToCheckedItem", items);
  },
  // 全不选
  resetSellAll({ commit }) {
    commit("resetSellCheckedItem");
  },
  // 点击单个item
  toggleSellCheckedItem({ commit }, id) {
    commit("toggleSellCheckedItem", id); // 确保这里调用的是正确的 mutation 名称
  },
};

// 用于操作数据（state）
const mutations = {
  // 全选
  addAllSellToCheckedItem(state, items) {
    items.forEach((item) => {
      if (!state.checkedSellItem.includes(item.gid)) {
        state.checkedSellItem.push(item.gid);
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
  // 切换排序方式(时间、价格、磨损)
  toggleSortord(state, val) {
    state.sortord = val;
  },
  // 添加用户信息
  addUserInfo(state, info) {
    state.userInfo = info;
  },
  // 删除用户信息
  removeUserInfo(state) {
    state.userInfo={}
  },
};

// 用于存放数据
const state = {
  checkedSellItem: [],
  sortord: "gainTime",
  userInfo:{},
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
