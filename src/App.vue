<template>
  <div id="app">
    <topHeader></topHeader>
    <!-- <router-view></router-view> -->
  </div>
</template>

<script>
import topHeader from './components/topHeader.vue'
export default {
  name: 'App',
  components: { topHeader }
}
</script>

<style>
* {
  margin: 0;
  padding: 0;
}
</style>
