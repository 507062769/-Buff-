<template>
    <div id="goodsDetail">
        <div class="detail-header">
            <div class="detail-pic">
                <img src="~@img/hdd.png" alt="" />
            </div>
            <div class="detail-cont">
                <h1 class="title">{{ $route.params.item.name }}</h1>
                <p class="desc">
                    <span>
                        <b>品质 |</b>
                        {{ qualityName }}
                    </span>
                    <span>
                        <b>类型 |</b>
                        {{ kindName }}
                    </span>
                </p>
                <div class="line"></div>
                <div class="price">
                    <span>
                        <b>参考价格 |</b>
                        {{ actualPrice }}
                    </span>
                    <div class="sell">我要出售</div>
                </div>
            </div>
        </div>
        <div class="relative-goods">
            <ul @click="toggleWearTab">
                <li :dataWIndex="w.wid" v-for="w in wear" :key="w.wid" :class="wearIndex === w.wid ? 'on' : ''">
                    <span :dataWIndex="w.wid">{{ w.name }}</span>
                    <span :dataWIndex="w.wid">￥3.68</span>
                </li>
            </ul>
        </div>

        <div class="market-header">
            <div class="cont-tab">
                <ul @click="toggleTab">
                    <li :tabIndex="1" :class="tabIndex == 1 ? 'on' : ''">当前在售</li>
                    <li :tabIndex="2" :class="tabIndex == 2 ? 'on' : ''">成交记录</li>
                    <li :tabIndex="3" :class="tabIndex == 3 ? 'on' : ''">价格趋势</li>
                </ul>
            </div>
            <div class="criteria">
                <div class="criteria-item">
                    <h5>磨损区间</h5>
                    <ul>
                        <li>不限</li>
                        <li>0.15-0.18</li>
                        <li>0.18-0.21</li>
                        <li>0.21-0.24</li>
                    </ul>
                </div>

                <div class="criteria-item right" style="margin-right: 0">
                    <h5>排序</h5>
                    <ul>
                        <li>默认</li>
                        <li>价格↑</li>
                        <li>价格↓</li>
                        <li>受限</li>
                    </ul>
                </div>

                <div class="right">
                    <div class="counter">
                        ￥
                        <el-input v-model.number="minPrice" placeholder="最低价"></el-input>
                        -￥
                        <el-input v-model.number="maxPrice" placeholder="最高价"></el-input>
                    </div>
                    <div class="counter-submit"></div>
                </div>
            </div>
        </div>

        <router-view :goodsInfo="goodsInfo"></router-view>

    </div>
</template>

<script>
import axios from "axios";

export default {
    name: "goodsDetail",
    components: {},
    data() {
        return {
            marketName: "",
            minPrice: "",
            maxPrice: "",
            tabIndex: 1,
            wearIndex: 1,
            wear: [],
            kind: [],
            quality: [],
            goodsInfo: [],
            // goods: {},
        };
    },
    methods: {
        // 初始化
        init() {
            // 获取种类、品质、磨损的值
            axios.get("http://localhost:8081/tool/getKind").then((res) => {
                this.kind = res.data.data;
            });
            axios.get("http://localhost:8081/tool/getQuality").then((res) => {
                this.quality = res.data.data;
            });
            axios.get("http://localhost:8081/tool/getWear").then((res) => {
                this.wear = res.data.data;
            });

            // 将点击的饰品的磨损id赋值
            this.wearIndex = this.$route.params.item.wID
            // 获取当前名称+磨损的饰品list
            axios.get("http://localhost:8081/sell/toggleGoodsWear", {
                params: {
                    goodsName: this.$route.params.item.name.replace(/\(.*?\)/, ''),
                    wearIndex: this.$route.params.item.wID
                }
            }).then(res => {
                this.goodsInfo = res.data.data;
                // 遍历饰品添加nickName项
                this.goodsInfo.forEach(g => {
                    axios.get("http://localhost:8081/user/getNameByID", {
                        params: {
                            uID: g.uid
                        }
                    }).then(res => {
                        g.nickName = res.data.data
                        // 跳转到当前在售页
                        this.$router.push({
                            name: "CurrentSell",
                            params: {
                                item: this.$route.params.item
                            }
                        });
                    })
                });
            })

        },
        // 切换当前在售、成交记录、价格趋势的tab
        toggleTab({ target }) {
            if (target.tagName === "LI") {
                this.tabIndex = target.tabIndex;
                switch (this.tabIndex) {
                    case 1:
                        this.$router.push({
                            name: "CurrentSell",
                            params: {
                                item: this.$route.params.item
                            }
                        });
                        break;
                    case 2:
                        this.$router.push({
                            name: "OkHistory",
                            params: {
                                item: this.$route.params.item
                            }
                        });
                        break;
                    case 3:
                        this.$router.push({
                            name: "PriceTrend",
                            params: {
                                item: this.$route.params.item
                            }
                        });
                        break;
                }
            }
        },
        // 切换磨损的tab
        toggleWearTab({ target }) {
            // 获取点击的饰品的磨损id
            this.wearIndex = parseInt(target.getAttribute("dataWIndex"));
            // 将当前饰品的名字与点击的饰品的磨损id传到后台去查询有多少该类型的数据
            axios.get("http://localhost:8081/sell/toggleGoodsWear", {
                params: {
                    goodsName: this.$route.params.item.name.replace(/\(.*?\)/, ''),
                    wearIndex: this.wearIndex
                }
            }).then(res => {
                // 将查询到的数据赋值
                this.goodsInfo = res.data.data
                // 遍历查询到的值，并给他添加新项-nickname 
                this.goodsInfo.forEach(g => {
                    axios.get("http://localhost:8081/user/getNameByID", {
                        params: {
                            uID: g.uid
                        }
                    }).then(res => {
                        g.nickName = res.data.data

                        // 跳转到当前在售页
                        this.$router.push({
                            name: "CurrentSell",
                            params: {
                                goodsID: this.goodsInfo[0].sid,
                                item: this.goodsInfo[0]
                            }
                        });
                    })
                });
            })
        },
    },
    computed: {
        // 展示商品的品质
        qualityName() {
            const q = this.quality.find((q) => q.qid === this.$route.params.item.qID);
            return q ? q.name : null;
        },
        // 展示商品的类型
        kindName() {
            const kind = this.kind.find((k) => {
                const subItem = k.kindItem[this.$route.params.item.kiID];
                return subItem ? k : null;
            });
            return kind ? kind.name : null;
        },
        actualPrice() {
            // return this.goodsInfo.reduce((cheapest, item) => {
            //     return (cheapest < item.price) ? cheapest : item;
            // }).price
            return 1
        }
    },
    beforeMount() {
        this.init();
    },
};
</script>

<style scoped lang="less">
#goodsDetail {
    height: fit-content;
    width: 80%;
    margin: 0 auto;

    .detail-header {
        width: 100%;
        height: 195px;
        background-image: url(~@img/bg/detail-header-bg.jpg);
        display: flex;

        .detail-pic {
            width: 278px;
            height: 100%;
            background-image: url(~@img/bg/goods_detail_bg.png);
            text-align: center;

            img {
                max-height: 70%;
                max-width: auto;
                margin: 29px 0;
                box-sizing: border-box;
            }
        }

        .detail-cont {
            width: 75%;
            height: 100%;
            padding: 15px 25px;
            box-sizing: border-box;

            .title {
                font-size: 24px;
                color: white;
                margin-top: 10px;
            }

            .desc {
                margin-top: 10px;
            }

            span {
                color: #c6cad0;
                margin-right: 24px;
                font-size: 14px;
                line-height: 100%;

                b {
                    font-size: 14px;
                    margin-right: 4px;
                    color: #90969c;
                }
            }

            .line {
                height: 1px;
                width: 350px;
                background-image: linear-gradient(-270deg,
                        rgba(238, 162, 14, 0.4) 0,
                        rgba(238, 162, 14, 0.4) 2%,
                        #16171c 100%);
                margin: 20px 0;
            }

            .price {
                display: flex;
                justify-content: space-between;

                span {
                    color: #eea20e;
                    font-size: 18px;
                    line-height: 30px;
                }

                .sell {
                    width: 100px;
                    height: 30px;
                    background-color: #45536c;
                    line-height: 30px;
                    text-align: center;
                    color: #fff;
                    cursor: pointer;
                }

                .sell:hover {
                    background: #536380 url(~@img/bg/btn-bg-sub.png) no-repeat center bottom;
                }
            }
        }
    }

    .relative-goods {
        height: 60px;
        width: 100%;
        border-top: 1px solid #2a3c5a;
        background-color: #1e2329;
        box-sizing: border-box;
        padding: 0 20px;

        ul {
            display: flex;
            justify-content: flex-start;
        }

        li {
            height: 35px;
            width: 110px;
            border: 1px solid #2a3c5a;
            margin: 12px 10px;
            text-align: center;
            line-height: 35px;
            font-size: 12px;
            color: #495b7e;
            cursor: pointer;
        }

        li:hover {
            color: #899ab9;
            background-color: #495b7e;
        }

        .on {
            color: #fff;
            background-color: #495b7e;
        }
    }

    .market-header {
        height: 120px;
        width: 100%;
        margin: 20px 0;
        background-color: #11151c;
        background: url(~@img/bg/marcket-header-bg.png) no-repeat;
        background-size: 100%;

        .cont-tab {
            width: 100%;
            height: 55%;
            padding-top: 20px;
            padding-left: 30px;

            ul {
                display: flex;
                justify-content: flex-start;

                li {
                    width: fit-content;
                    height: 40px;
                    // background-color: #4773c8;
                    line-height: 40px;
                    margin-right: 40px;
                    color: #90969c;
                    font-size: 700;
                    cursor: pointer;
                }

                li:hover {
                    color: #fff;
                }

                .on {
                    color: white;
                }
            }
        }

        .criteria {
            height: 45%;
            width: 95%;
            margin: 0 auto;
            border-top: 2px solid #4773c8;
            box-sizing: border-box;

            .criteria-item {
                height: 30px;
                width: 90px;
                float: left;
                margin: 12px 20px 12px 0;
                background-color: #2d2f3e;

                h5 {
                    color: #8e9593;
                    height: 100%;
                    line-height: 30px;
                    font-size: 14px;
                    padding-left: 10px;
                    cursor: pointer;
                }

                h5:hover {
                    background-color: #3a455a;
                    color: #d7dcdb;
                }

                ul {
                    display: none;
                    position: relative;

                    li {
                        height: 30px;
                        width: 90px;
                        font-size: 12px;
                        line-height: 30px;
                        background-color: #2d2f3e;
                        padding: 0 10px;
                        border-top: solid #36394b 1px;
                        color: #fff;
                        cursor: pointer;
                    }
                }
            }

            .criteria-item:hover {
                ul {
                    display: inherit;
                }
            }

            .right {
                float: right;
            }

            .counter {
                width: 215px;
                color: #888d94;
                margin: 12px 20px 12px 0;

                /deep/ .el-input,
                /deep/ .el-input__inner {
                    width: 80px;
                    height: 30px;
                    background-color: #2d2f3e;
                }
            }
        }
    }
}
</style>