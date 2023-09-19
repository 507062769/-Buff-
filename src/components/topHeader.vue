<template>
    <div id="root">
        <div class="PageCenter">
            <div class="logo">
                <img src="../assets/logo.png" alt="">
            </div>
            <div class="nav">
                <el-menu :default-active="activeIndex" background-color="rgba(0,0,0,0.0)" text-color="#fff"
                    active-text-color="#4886ff" class="el-menu-demo" mode="horizontal">
                    <el-menu-item index="1">首页</el-menu-item>
                    <el-menu-item index="2">饰品市场</el-menu-item>
                    <el-menu-item index="3">游戏资讯</el-menu-item>
                </el-menu>
            </div>
            <div class="login"></div>
        </div>
    </div>
</template>

<script>
export default {
    name: "topHeader",
    components: {},
    data() {
        return {
            activeIndex: '1',
        }
    },
    create() { },
    mounted() { },
    watch: {},
    computed: {},
    methods: {},
}
</script>

<style scoped lang="less">
#root {
    height: 60px;
    width: 100%;
    background-image: url("../assets/top-bg.png");

    .PageCenter {
        height: 100%;
        width: 80%;
        margin: 0 auto;
        display: flex;
        align-content: center;

        .logo {
            width: 77px;
            margin-top: 25px;
            // height: 100%;
            // margin: 28px 0 0 10px;
        }

        .nav {
            height: 100%;
            margin-left: 20px;
        }

        .login {}
    }
}
</style>