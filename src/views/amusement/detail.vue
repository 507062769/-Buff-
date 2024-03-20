<template>
    <div id="detail">
        <div class="pc-openbox-content">
            <div class="openbox-show">
                <div class="openbox-title">{{ boxInfo.name }}</div>
                <div class="openbox-back">
                    <div class="openbox-back-pic" :style="{ backgroundImage: 'url(' + boxInfo.bgURL + ')' }">
                        <img :src="boxInfo.showURL" alt="" />
                    </div>
                </div>
                <div class="openbox-buyCount">
                    <ul>
                        <li>1</li>
                        <li>2</li>
                        <li>3</li>
                        <li>4</li>
                        <li>5</li>
                    </ul>
                </div>
                <div class="openbox-price">￥ {{ boxInfo.price }}</div>
                <div class="openbox-btn-box">开启</div>
            </div>
            <!-- 展示该盲盒中的所有物品 -->
            <div class="openbox-desc">
                <div class="column">
                    <div class="include">盒子包含</div>
                    <div class="tip">
                        温馨提示:饰品发货时出现任何问题,一定联系客服解决,切勿上头!
                    </div>
                </div>
                <div class="chance">
                    <div class="chance_main">
                        <div class="chance_item">
                            <img src="~@img/bg/chance1.png" alt="" />
                            <p>0%</p>
                        </div>
                        <div class="chance_item">
                            <img src="~@img/bg/chance2.png" alt="" />
                            <p>0%</p>
                        </div>
                        <div class="chance_item">
                            <img src="~@img/bg/chance3.png" alt="" />
                            <p>0%</p>
                        </div>
                        <div class="chance_item">
                            <img src="~@img/bg/chance4.png" alt="" />
                            <p>0%</p>
                        </div>
                        <div class="chance_item">
                            <img src="~@img/bg/chance5.png" alt="" />
                            <p>0%</p>
                        </div>
                        <div class="chance_item">
                            <img src="~@img/bg/chance6.png" alt="" />
                            <p>0%</p>
                        </div>
                        <div class="chance_item">
                            <img src="~@img/bg/chance7.png" alt="" />
                            <p>0%</p>
                        </div>
                    </div>
                </div>
                <div class="weaponListCpt">
                    <div class="weapon-item" v-for="b in boxKindList" :key="b.bkID">
                        <div class="weapon-item-price">￥{{ b.price }}</div>
                        <div class="weapon-item-pic">
                            <!-- <img src="~@img/pf/akblkzz.png" alt=""> -->
                            <img :src="b.img" alt="">
                        </div>
                        <div class="weapon-item-name" @click="toggleIsNameActive">
                            {{ b.name }}</div>
                        <div class="weapon-all-name" :class="{ 'nameActive': isNameActive }">{{ b.name }}</div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import axios from "axios";

export default {
    name: "detail",
    components: {},
    data() {
        return {
            isNameActive: false,
            boxInfo: {
                bgURL: ""
            },
            boxKindList: [],
        };
    },
    methods: {
        init() {
            // 获取是哪种盲盒
            axios.get("http://localhost:8081/box/getBoxByID", {
                params: {
                    ID: this.$route.params.bID
                }
            }).then(res => {
                this.boxInfo = res.data.data;
            })
            // 获取盲盒内的饰品
            axios.get("http://localhost:8081/box/getBoxItem", {
                params: {
                    ID: this.$route.params.bID
                }
            }).then(res => {
                this.boxKindList = res.data.data
            })
        },
        // 是否展示全名
        toggleIsNameActive() {
            this.isNameActive = !this.isNameActive
        }
    },
    mounted() {
        this.init()
    }
};
</script>

<style scoped lang="less">
#detail {
    width: 80%;
    height: fit-content;
    margin: 0 auto;

    .pc-openbox-content {
        .openbox-show {
            height: fit-content;
            width: 100%;

            .openbox-title {
                width: 240px;
                height: 35px;
                background: url(~@img/bg/box-title.png) center/contain no-repeat;
                color: #fff;
                font-size: 20px;
                font-weight: 1000;
                text-align: center;
                line-height: 34px;
                position: absolute;
                top: 180px;
                left: 50%;
                transform: translateX(-50%);
                z-index: 2;
            }

            .openbox-back {
                width: 500px;
                height: 500px;
                background: url("~@img/bg/box-back.png") center / contain no-repeat !important;
                margin: 0 auto;
                position: relative;

                .openbox-back-pic {
                    width: 300px;
                    height: 200px;
                    margin: 0 auto;
                    background: center/contain no-repeat;
                    position: absolute;
                    top: 220px;
                    left: 100px;

                    img {
                        width: 250px;
                        max-height: 100%;
                        background: center/contain no-repeat;
                        margin-left: 20px;
                    }
                }
            }

            .openbox-buyCount {
                height: 50px;
                width: 100%;

                ul {
                    display: flex;
                    justify-content: center;

                    li {
                        height: 50px;
                        width: 50px;
                        border-radius: 100%;
                        background-color: #37363b;
                        color: #fff;
                        border: 2px solid #fbfa02;
                        text-align: center;
                        font-size: 24px;
                        font-weight: 700;
                        line-height: 50px;
                        margin: 0 10px;
                    }

                    .onCount {
                        background-color: #fbfa02;
                        color: #37363b;
                    }
                }
            }

            .openbox-price {
                width: 100%;
                text-align: center;
                font-size: 24px;
                font-size: 700;
                color: #fbfa02;
                margin: 20px 0;
            }

            .openbox-btn-box {
                height: 60px;
                width: 250px;
                background-color: #fbfa02;
                font-size: 24px;
                font-weight: 700;
                line-height: 60px;
                text-align: center;
                margin: 0 auto;
            }
        }

        .openbox-desc {
            height: fit-content;
            width: 100%;

            .column {
                height: 50px;
                width: 100%;
                display: flex;
                margin-top: 50px;

                .include {
                    background-color: #fbfa02;
                    width: 15%;
                    height: 50px;
                    font-size: 20px;
                    font-weight: 700;
                    line-height: 50px;
                    text-align: center;
                }

                .tip {
                    width: 85%;
                    height: 50px;
                    border-bottom: 2px solid #fbfa02;
                    color: #fff;
                    font-size: 20px;
                    line-height: 50px;
                    padding: 0 10px;
                }
            }

            .chance {
                height: 40px;
                width: 100%;
                margin: 25px 0;

                .chance_main {
                    height: 40px;
                    width: 556px;
                    display: flex;
                    background: url(~@img/bg/chanceBg.png) center/contain no-repeat;
                    justify-content: space-around;
                    margin: 0 auto;

                    .chance_item {
                        display: flex;
                        align-items: center;
                        margin: 0 5px;
                        color: #fff;

                        img {
                            max-height: 18px;
                            max-width: 20px;
                            background: center/contain no-repeat;
                        }
                    }
                }
            }

            .weaponListCpt {
                height: fit-content;
                width: 100%;
                display: inline-grid;
                grid-template-columns: repeat(6, 1fr);
                column-gap: 20px;
                row-gap: 20px;

                .weapon-item {
                    box-sizing: border-box;
                    height: 288px;
                    width: 100%;
                    padding: 10px;
                    background-color: #fff;
                    background: url(~@img/bg/quality1.png)center/contain no-repeat;
                    background-size: cover;
                    position: relative;


                    .weapon-item-price {
                        height: 50px;
                        color: #fbfa02;
                        font-size: 20px;
                        font-weight: 700;
                        text-align: center;
                        line-height: 80px;
                    }

                    .weapon-item-pic {
                        width: 165px;
                        height: 165px;

                        img {
                            max-height: 100%;
                            max-width: 100%;
                            background: center/contain no-repeat;
                        }
                    }

                    .weapon-item-name {
                        height: 30px;
                        font-size: 16px;
                        color: #fff;
                    }

                    .weapon-all-name {
                        display: none;
                        position: absolute;
                        left: 0;
                        height: 50px;
                        width: 186px;
                        background-color: #353748;
                        color: #fff;
                        font-size: 14px;
                        padding: 5px 10px;
                        border-radius: 10px;
                    }

                    .nameActive {
                        display: inline-block;
                    }
                }



            }
        }
    }
}
</style>