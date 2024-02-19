import Vuex from "vuex";
import Vue from "vue";

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
  }
  ,
};

// 用于存放数据
const state = {
  checkedSellItem: [],
  sortord: "gainTime",
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
});
