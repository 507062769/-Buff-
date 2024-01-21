<template>
  <div id="userCenter">
    <UserNav></UserNav>
    <div></div>
  </div>
</template>

<script>
import UserNav from "./user-nav.vue";
export default {
  name: "",
  components: { UserNav },
  data() {
    return {};
  },
  create() {},
  mounted() {},
  watch: {},
  computed: {},
  methods: {},
};
</script>

<style scoped lang="less">
#userCenter {
  width: 80%;
  height: fit-content;
  margin: 0 auto;
}
</style>