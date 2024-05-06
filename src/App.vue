<template>
  <div id="app">
    <TopHeader></TopHeader>
    <div class="allBg" :class="$route.path !== '/home' ? 'padding20' : ''">
      <router-view></router-view>
    </div>
    <Footerr></Footerr>
  </div>
</template>

<script>
import TopHeader from "./components/topHeader.vue";
import Footerr from "./components/footer.vue";

export default {
  name: "App",
  components: { TopHeader, Footerr },
};
</script>

<style>
* {
  margin: 0;
  padding: 0;
  list-style: none;
  text-decoration: none;
  box-sizing: border-box;

}

.allBg {
  height: fit-content;
  background-image: url("../public/img/bg/header-bg_csgo.jpg");
  background-position: -204px -70px;
  background-repeat: no-repeat;
  background-color: #182033;
}

.padding20 {
  padding: 20px 0;
}
</style>
