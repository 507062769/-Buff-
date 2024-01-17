<template>
  <div id="app">
    <TopHeader></TopHeader>
    <router-view></router-view>
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
}
</style>
