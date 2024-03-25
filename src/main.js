import Vue from "vue";
import App from "./App.vue";
import ElementUI from "element-ui";
import "element-ui/lib/theme-chalk/index.css";
import router from "./router";
import store from './store'
import "@wangeditor/editor/dist/css/style.css";
import VueLuckyCanvas from "@lucky-canvas/vue";


Vue.config.productionTip = false;
Vue.use(ElementUI);
Vue.use(VueLuckyCanvas);

new Vue({
  router,
  store,
  render: (h) => h(App),
  beforeCreate() {
    Vue.prototype.$bus = this;
  },
}).$mount("#app");

