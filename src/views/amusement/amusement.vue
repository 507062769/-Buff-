<template>
    <div id="amusement">
        <div class="pc-home-wrap">
            <div class="pc-home-list">
                <div class="title">新手乐园</div>
                <div class="pc-tab-list">
                    <div class="pc-tab-item" v-for="box in boxKind" :key="box.bid" @click="goBoxDetail(box.bid)">
                        <div class="pc-hot">
                            <img src="~@img/bg/hot.png" alt="">
                        </div>
                        <div class="pc-item-pic">
                            <img src="/img/box/showURL.png" alt="">
                        </div>
                        <div class="pc-item-price">￥{{ box.price }}</div>
                        <div class="pc-item-name">{{ box.name }}</div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios'
export default {
    name: "amusement ",
    components: {},
    data() {
        return {
            boxKind: [],
        }
    },
    methods: {
        // 初始化
        init() {
            // 获取盲盒种类
            axios.get("http://localhost:8081/box/getBoxKind").then(res => {
                this.boxKind = res.data.data
            })
        },
        // 跳转购买页面
        goBoxDetail(id) {
            console.log('当前想要的是：', id)
            this.$router.push({
                name: "BoxDetatil",
                params: {
                    bID: id
                }
            });
        },
    },
    mounted() {
        this.init()
    }
}
</script>

<style scoped lang="less">
#amusement {
    width: 80%;
    height: fit-content;
    margin: 0 auto;

    .pc-home-wrap {
        width: 100%;
        height: 100%;

        .pc-home-list {
            width: 100%;
            height: fit-content;
            margin: 20px 0;

            .title {
                width: 240px;
                height: 35px;
                background: url(~@img/bg/box-title.png) center/contain no-repeat;
                color: #fff;
                font-size: 20px;
                font-weight: 1000;
                text-align: center;
                line-height: 34px;
                margin: 0 auto;
            }

            .pc-tab-list {
                width: 100%;
                height: fit-content;
                display: flex;
                justify-content: space-between;
                margin-top: 40px;
                cursor: pointer;

                .pc-tab-item {
                    flex: 1;
                    position: relative;

                    .pc-hot {
                        height: 40px;
                        width: 40px;
                        position: absolute;
                        top: -20px;
                        left: 160px;

                        img {
                            max-height: 40px;
                            max-width: 40px;
                        }
                    }

                    .pc-item-pic {
                        width: 190px;
                        height: 170px;
                        margin: 0 auto;
                        background: url('~@img/box/bgURL.png') center/contain no-repeat !important;

                        img {
                            max-width: 100%;
                            max-height: 100%;
                            background-position: center;
                            background-size: contain;
                            background-repeat: no-repeat;
                            margin-top: 10px;
                        }
                    }

                    .pc-item-price {
                        text-align: center;
                        font-size: 1.5rem;
                        font-weight: 700;
                        color: #eea20e;
                    }

                    .pc-item-name {
                        text-align: center;
                        font-size: 1rem;
                        font-weight: 700;
                        color: #fff;
                        margin: 10px 0;
                    }
                }
            }
        }
    }
}
</style>