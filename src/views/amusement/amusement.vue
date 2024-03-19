<template>
    <div id="amusement">
        <div class="pc-home-wrap">
            <div class="pc-home-list">
                <div class="title">新手乐园</div>
                <div class="pc-tab-list">
                    <div class="pc-tab-item">
                        <div class="pc-hot">
                            <img src="~@img/bg/hot.png" alt="">
                        </div>
                        <div class="pc-item-pic"
                            style="background: url('/img/box/bgURL.png') center/contain no-repeat;">
                            <img src="/img/box/showURL.png" alt="">
                        </div>
                        <div class="pc-item-price">{{ boxKind.price }}</div>
                        <div class="pc-item-name">{{ boxKind.name }}</div>
                    </div>
                    <div class="pc-tab-item">
                        <div class="pc-hot">
                            <img src="~@img/bg/hot.png" alt="">
                        </div>
                        <div class="pc-item-pic"
                            style="background: url('/img/box/bgURL.png') center/contain no-repeat;">
                            <img src="/img/box/showURL.png" alt="">
                        </div>
                        <div class="pc-item-price">{{ boxKind.price }}</div>
                        <div class="pc-item-name">{{ boxKind.name }}</div>
                    </div>
                    <div class="pc-tab-item">
                        <div class="pc-hot">
                            <img src="~@img/bg/hot.png" alt="">
                        </div>
                        <div class="pc-item-pic"
                            style="background: url('/img/box/bgURL.png') center/contain no-repeat;">
                            <img src="/img/box/showURL.png" alt="">
                        </div>
                        <div class="pc-item-price">{{ boxKind.price }}</div>
                        <div class="pc-item-name">{{ boxKind.name }}</div>
                    </div>
                    <div class="pc-tab-item">
                        <div class="pc-hot">
                            <img src="~@img/bg/hot.png" alt="">
                        </div>
                        <div class="pc-item-pic"
                            style="background: url('/img/box/bgURL.png') center/contain no-repeat;">
                            <img src="/img/box/showURL.png" alt="">
                        </div>
                        <div class="pc-item-price">{{ boxKind.price }}</div>
                        <div class="pc-item-name">{{ boxKind.name }}</div>
                    </div>
                    <div class="pc-tab-item">
                        <div class="pc-hot">
                            <img src="~@img/bg/hot.png" alt="">
                        </div>
                        <div class="pc-item-pic"
                            style="background: url('/img/box/bgURL.png') center/contain no-repeat;">
                            <img src="/img/box/showURL.png" alt="">
                        </div>
                        <div class="pc-item-price">{{ boxKind.price }}</div>
                        <div class="pc-item-name">{{ boxKind.name }}</div>
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
        init() {
            axios.get("http://localhost:8081/box/getBoxKind").then(res => {
                this.boxKind = res.data.data
            })
        }
    },
    mounted() {
        this.init()
    }
}
</script>

<style scoped lang="less">
#amusement {
    width: 80%;
    height: 500px;
    background-color: #fff;
    margin: 0 auto;

    .pc-home-wrap {
        width: 100%;
        height: 100%;

        .pc-home-list {
            width: 100%;
            height: 300px;
            background-color: red;

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
                height: 265px;
                display: flex;
                justify-content: space-between;
                background-color: aqua;

                .pc-tab-item {
                    flex: 1;

                    .pc-hot {
                        height: 40px;
                        width: 40px;
                    }

                    .pc-item-pic {
                        width: 170px;
                        height: 190px;
                        margin: 0 auto;

                        img {
                            max-width: 100%;
                            max-height: 100%;
                            background-position: center;
                            background-size: contain;
                            background-repeat: no-repeat;
                            margin-top: 20px;
                        }
                    }
                }
            }
        }
    }
}
</style>