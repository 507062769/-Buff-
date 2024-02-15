import Vuex from "vuex";
import Vue from "vue";

Vue.use(Vuex);

// 用于响应组件内的动作
const actions = {
  allSellSelect({ commit }, items) {
    commit("addAllSellToCheckedItem", items);
  },
  resetSellAll({ commit }) {
    commit("resetSellCheckedItem");
  },
  toggleSellCheckedItem({ commit }, id) {
    commit("toggleSellCheckedItem", id); // 确保这里调用的是正确的 mutation 名称
  },
};

// 用于操作数据（state）
const mutations = {
  // 注意这里应该是 'mutations' 而不是 'multations'
  addAllSellToCheckedItem(state, items) {
    items.forEach((item) => {
      if (!state.checkedSellItem.includes(item.Id)) {
        state.checkedSellItem.push(item.Id);
      }
    });
  },
  resetSellCheckedItem(state) {
    state.checkedSellItem = [];
  },
  toggleSellCheckedItem(state, id) {
    // 确保这里定义的 mutation 名称是正确的
    const index = state.checkedSellItem.indexOf(id);
    if (index > -1) {
      state.checkedSellItem.splice(index, 1);
    } else {
      state.checkedSellItem.push(id);
    }
  },
};

// 用于存放数据
const state = {
  checkedSellItem: [],
};

const getters = {
  isChecked: (state) => (id) => {
    return state.checkedSellItem.includes(id);
  },
};

export default new Vuex.Store({
  actions,
  mutations, // 确保这里使用的是 'mutations'
  state,
  getters,
});
