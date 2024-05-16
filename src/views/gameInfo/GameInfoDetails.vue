<template>
    <div id="GameInfodetails">
        <p class="title">{{ gameInfo.title }}</p>
        <p class="subhead">
            <span class="source">{{ gameInfo.source }}</span>
            <span>作者：{{ gameInfo.author }}</span>
            <span>来源：buff</span>
            <span> <i class="el-icon-time"></i> {{ gameInfo.time }}</span>
        </p>
        <p v-html="gameInfo.context" class="content"></p>
    </div>
</template>

<script>
import axios from 'axios'
export default {
    name: "GameInfodetails",
    components: {},
    data() {
        return {
            gameInfo: [],
        }
    },
    methods: {
        init() {
            axios.get("http://localhost:8081/gameInfo/getGameInfoByID", {
                params: {
                    ID: this.$route.params.gID
                }
            }).then(res => {
                this.gameInfo = res.data.data
            })
        },
    },
    mounted() {
        this.init()
    }
}
</script>

<style scoped lang="less">
#GameInfodetails {
    width: 80%;
    height: fit-content;
    min-height: 400px;
    margin: 0 auto;
    background-color: #fff;
    padding: 20px 40px;

    .title {
        font-size: 20px;
        font-weight: 700;
        color: #515151;
        line-height: 26px;
        margin-bottom: 20px;
    }

    .subhead {
        font-size: 14px;
        color: #959595;

        .source {
            font-weight: 700;
            display: inline-block;
            background-color: #eea20e;
            color: #fff;
            height: 20px;
            width: 40px;
            line-height: 20px;
            text-align: center;
            margin-bottom: 20px;
        }

        span {
            margin-right: 30px;
        }
    }
}
</style>