<template>
  <div id="app">
    <TopHeader></TopHeader>
    <div class="allBg" :class="$route.path!=='/home'?'padding20':''">
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
  mounted() {
   
  }
};
</script>

<style>
* {
  margin: 0;
  padding: 0;
  list-style: none;
  text-decoration: none;
}

.allBg {
  background-image: url("../public/img/bg/header-bg_csgo.jpg");
  height: fit-content;
  background-position: -204px -70px;
}
.padding20{
  padding: 20px 0;
}
</style>
