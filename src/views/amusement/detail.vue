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
                    <ul @click="toggleBuyCount">
                        <li v-for="buyCount in [1, 2, 3, 4, 5]" :key="buyCount" :data-count="buyCount"
                            :class="{ onCount: isActive(buyCount) }">
                            {{ buyCount }}
                        </li>
                    </ul>
                </div>
                <div class="openbox-price">￥ {{ price }}</div>
                <p class="openbox-havaCount">
                    可开启:<b> {{ count }}</b> 个，
                    <span v-if="count != 0">快去开启吧！</span>
                    <span v-else>快去购买吧！</span>
                </p>
                <div class="openbox-box">
                    <div class="openbox-btn-box" @click="isBuy = true">购买</div>
                    <div class="openbox-btn-box" @click="startCj" :class="{ isOpen: isOpen }">开启</div>
                </div>

                <div class="popup" v-show="isBuy">
                    <div class="pupop_header">
                        <h3>确认支付</h3>
                        <span class="popup-close" @click="
                            isBuy = false;
                        isShowBody = false;
                        ">x</span>
                    </div>
                    <div class="pupop_cont">
                        <h3>
                            应付 <span>￥{{ price }}</span>
                        </h3>
                        <p class="cont-tip">选择支付方式</p>
                        <ul>
                            <li v-for="item in paymentMethod" :key="item.id">
                                <div class="pay_mode">
                                    <img :src="item.img" />
                                    <div class="pay_mode_text">
                                        <h5>
                                            {{ item.name }}
                                            <span style="color: #4d80e1">￥{{ getItemAmount(item.id) }}
                                            </span>
                                        </h5>
                                        <p style="color: #eea20e" v-if="getItemAmount(item.id) < price">
                                            余额不足，请充值
                                        </p>
                                    </div>
                                    <el-radio v-model="selectedPayment" :label="item.id">&nbsp;</el-radio>
                                </div>
                            </li>
                        </ul>
                        <el-button type="primary" @click="buy">确认付款</el-button>
                        <!-- <el-button type="primary">前往充值</el-button> -->
                    </div>
                </div>
                <div class="mask" v-show="isBuy" @click="isBuy = false"></div>
            </div>

            <!-- 展示该盲盒中的所有物品 -->
            <div class="openbox-desc">
                <div class="column">
                    <div class="include">盒子包含</div>
                    <div class="tip" ref="tip">
                        <span :style="{ transform: `translateX(${scrollPosition}px)` }">
                            {{ text }}
                        </span>
                    </div>
                </div>
                <div class="chance">
                    <div class="chance_main">
                        <div class="chance_item">
                            <img src="~@img/bg/chance2.png" alt="" />
                            <p>{{ boxInfo.q1 }} %</p>
                        </div>
                        <div class="chance_item">
                            <img src="~@img/bg/chance3.png" alt="" />
                            <p>{{ boxInfo.q2 }} %</p>
                        </div>
                        <div class="chance_item">
                            <img src="~@img/bg/chance4.png" alt="" />
                            <p>{{ boxInfo.q3 }} %</p>
                        </div>
                        <div class="chance_item">
                            <img src="~@img/bg/chance5.png" alt="" />
                            <p>{{ boxInfo.q4 }} %</p>
                        </div>
                        <div class="chance_item">
                            <img src="~@img/bg/chance6.png" alt="" />
                            <p>{{ boxInfo.q5 }} %</p>
                        </div>
                        <div class="chance_item">
                            <img src="~@img/bg/chance7.png" alt="" />
                            <p>{{ boxInfo.q6 }} %</p>
                        </div>
                    </div>
                </div>
                <div class="weaponListCpt">
                    <div class="weapon-item" v-for="(b, index) in boxKindList" :key="index">
                        <div class="weapon-item-price">￥{{ b.price }}</div>
                        <div class="weapon-item-pic">
                            <img :src="b.img" alt="" />
                        </div>
                        <div class="weapon-item-name" @click="toggleIsNameActive(index)">
                            {{ shortenedName(b.name) }}
                        </div>
                        <div class="weapon-all-name" :class="{ nameActive: isNameActive[index] }">
                            {{ b.name }}
                        </div>
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
            isNameActive: {}, //是否展示全名
            boxInfo: {
                bgURL: "",
            }, //盲盒信息
            boxKindList: [
                {
                    img: "",
                },
            ], //盲盒所含道具
            buyCount: 1, //默认盲盒购买个数
            count: 0, //可开启的盲盒个数
            isBuy: false, //是否展示购买页面
            paymentMethod: [
                { id: "amount_zfb", name: "BUFF余额-支付宝", img: "/img/zfb.png" },
                { id: "amount_yhk", name: "BUFF余额-银行卡", img: "/img/yhk.png" },
            ], //可选的支付方式
            selectedPayment: null, //我的支付方式

            // 温馨提示所需属性
            text: "温馨提示:饰品发货时出现任何问题,一定联系客服解决,切勿上头!",
            scrollPosition: 1016, // 初始位置设置在容器右侧外
            containerWidth: 0, //容器宽度
            textWidth: 0, //文本宽度
            intervalId: null, //定时器ID

        };
    },
    methods: {
        init() {
            // 获取是哪种盲盒
            axios.get("http://localhost:8081/box/getBoxByID", {
                params: {
                    ID: this.$route.params.bID,
                },
            })
                .then((res) => {
                    this.boxInfo = res.data.data;
                });
            // 获取盲盒内的饰品
            axios
                .get("http://localhost:8081/box/getBoxItem", {
                    params: {
                        ID: this.$route.params.bID,
                    },
                })
                .then((res) => {
                    this.boxKindList = res.data.data.map((e) => {
                        return {
                            ...e,
                            price: e.price === 0 ? "暂无定价" : e.price,
                        };
                    });
                    this.prizeList = this.boxKindList;
                });
            // 获取用户所拥有的盲盒个数
            axios
                .get("http://localhost:8081/box/getBoxCount", {
                    params: {
                        uID: this.$store.state.userInfo.uid,
                        bID: this.$route.params.bID,
                    },
                })
                .then((res) => {
                    this.count = res.data.data;
                });

            // 设置温馨提示滚动开始的地方与开始滚动
            this.containerWidth = this.$refs.tip.offsetWidth;
            this.textWidth = this.$refs.tip.querySelector('span').scrollWidth;
            this.startScrolling();
        },
        // 是否展示全名
        toggleIsNameActive(index) {
            // 若当前名称已点击
            if (this.isNameActive[index]) {
                // 将他隐藏
                this.$set(this.isNameActive, index, false);
            } else {
                // 否则，关闭所有其他条目的详细信息并展开当前条目  
                Object.keys(this.isNameActive).forEach(key => {
                    this.$set(this.isNameActive, key, false);
                });
                this.$set(this.isNameActive, index, true);
            }
        },
        // 切换购买个数
        toggleBuyCount({ target }) {
            if (target.tagName === "LI") {
                this.buyCount = parseInt(target.dataset.count, 10);
            }
        },
        // 为购买个数添加class
        isActive(count) {
            return count <= this.buyCount;
        },
        //  获取账户支付宝、银行卡金额
        getItemAmount(id) {
            switch (id) {
                case "amount_zfb":
                    return this.$store.state.userInfo.amount_zfb || 0;
                case "amount_yhk":
                    return this.$store.state.userInfo.amount_yhk || 0;
                default:
                    return 0;
            }
        },
        // 点击付款的逻辑
        buy() {
            // 修改用户余额
            axios
                .put("http://localhost:8081/user/subPrice", {
                    uID: this.$store.state.userInfo.uid,
                    payment: this.selectedPayment,
                    price:
                        this.$store.state.userInfo[this.selectedPayment] -
                        parseFloat(this.price),
                })
                .then(() => {
                    this.isBuy = false;
                    this.$store.commit("updataUserPrice", {
                        payment: this.selectedPayment,
                        price:
                            this.$store.state.userInfo[this.selectedPayment] -
                            parseFloat(this.price),
                    });
                    this.$message({
                        message: "购买成功！",
                        type: "success",
                    });

                    // 创建资金流水
                    axios.get("http://localhost:8081/fund/addFlow", {
                        params: {
                            uID: this.$store.state.userInfo.uid,
                            type: 1,
                            amount: this.price,
                            source: this.selectedPayment,
                        },
                    });

                    // 创建通知消息
                    axios.get("http://localhost:8081/tool/addMessage", {
                        params: {
                            type: 5,
                            context: this.boxInfo.name,
                        },
                    });

                    axios
                        .get("http://localhost:8081/box/updateBoxCount", {
                            params: {
                                uID: this.$store.state.userInfo.uid,
                                bID: this.boxInfo.bid,
                                count: this.count + this.buyCount,
                            },
                        })
                        .then(() => {
                            this.count = this.count + this.buyCount;
                        });
                });
        },
        // 开始滚动温馨提示
        startScrolling() {
            this.intervalId = setInterval(() => {
                this.scrollPosition -= 2; // 控制滚动速度
                // 当前滚动位置小于文本位置时，重置滚动
                if (this.scrollPosition < -this.textWidth) {
                    this.scrollPosition = this.containerWidth;
                }
            }, 20); // 控制滚动频率
        },
        // 停止滚动
        stopScrolling() {
            clearInterval(this.intervalId);
        },
        // 开启抽奖
        startCj() {
            if (this.count > 0) {
                // 修改已拥有盲盒个数
                axios.get("http://localhost:8081/box/updateBoxCount", {
                    params: {
                        uID: this.$store.state.userInfo.uid,
                        bID: this.boxInfo.bid,
                        count: this.count--,
                    },
                })
                    .then(() => {
                        this.count = this.count--;

                        // 抽奖逻辑
                        axios.get("http://localhost:8081/box/lottery", {
                            params: {
                                bID: this.boxInfo.bid
                            }
                        }).then(res => {
                            this.$alert(`奖品为：${res.data.data.name}，已为您发入库存中`, '恭喜您中奖啦！', {
                                confirmButtonText: '确定',
                            });

                            axios.get("http://localhost:8081/inventory/addInventory", {
                                params: {
                                    uID: this.$store.state.userInfo.uid,
                                    gID: res.data.data.gid,
                                    name: res.data.data.name,
                                    wID: res.data.data.wid,
                                }
                            })
                        })
                    });
            }
        },

    },
    computed: {
        price() {
            return this.buyCount * this.boxInfo.price;
        },
        shortenedName() {
            return function (name) {
                if (name && name.length > 13) {
                    return name.substring(0, 13) + '...'; // 截取并添加省略号  
                }
                return name;
            };
        },
        isOpen() {
            return this.count <= 0;
        },

    },
    mounted() {
        this.init();
    },
    beforeDestroy() {
        this.stopScrolling();
    },
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
                        cursor: pointer;
                    }

                    .onCount {
                        background-color: #fbfa02;
                        color: #37363b;
                    }
                }
            }

            .openbox-havaCount {
                font-size: 14px;
                text-align: center;
                color: #fff;
                margin: 10px 0 5px;
                letter-spacing: 4px;

                b {
                    color: #fbfa02;
                    font-weight: 700;
                    font-size: 16px;
                    letter-spacing: 0;
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

            .openbox-box {
                box-sizing: border-box;
                width: fit-content;
                margin: 0 auto;

                .openbox-btn-box {
                    display: inline-block;
                    height: 60px;
                    width: 250px;
                    background-color: #fbfa02;
                    font-size: 24px;
                    font-weight: 700;
                    line-height: 60px;
                    text-align: center;
                    margin: 0 20px;
                    cursor: pointer;
                }

                .isOpen {
                    /* 禁用状态的样式 */
                    cursor: not-allowed;
                    /* 显示禁止的光标 */
                    opacity: 0.6;
                    /* 降低透明度 */
                }
            }

            .popup {
                width: 540px;
                height: fit-content;
                position: fixed;
                z-index: 15;
                left: 50%;
                top: 50%;
                box-sizing: border-box;
                transform: translate(-50%, -50%);
                background-color: #fff;

                .pupop_header {
                    height: 50px;
                    width: 100%;
                    background-color: white;
                    position: relative;

                    h3 {
                        height: 50px;
                        text-align: center;
                        font-size: 18px;
                        color: #515151;
                        line-height: 50px;

                        span {
                            font-size: 12px;
                            letter-spacing: 2px;
                            color: #959595;
                        }
                    }

                    .popup-close {
                        display: inline-block;
                        height: 20px;
                        width: 20px;
                        text-align: center;
                        line-height: 15px;
                        font-size: 18px;
                        position: absolute;
                        top: 50%;
                        right: 10px;
                        transform: translate(0, -50%);
                        cursor: pointer;
                    }
                }

                .pupop_cont {
                    height: 290px;
                    padding: 0 40px;

                    h3 {
                        height: 50px;
                        text-align: center;
                        line-height: 50px;
                        font-size: 16px;
                        color: #959595;

                        span {
                            font-size: 24px;
                            color: #eea20e;
                        }
                    }

                    .cont-tip {
                        font-size: 14px;
                        color: #959595;
                    }

                    .pay_mode {
                        height: 70px;
                        display: flex;
                        border-bottom: 1px solid #e5e5e5;

                        img {
                            height: 40px;
                            width: 40px;
                            background-repeat: no-repeat;
                            background-size: 100% 100%;
                            transform: translate(0, 15px);
                        }

                        .pay_mode_text {
                            width: 100%;
                            padding-left: 20px;
                            display: flex;
                            flex-direction: column;
                            justify-content: center;

                            h5 {
                                font-weight: 500;
                                font-size: 16px;
                            }

                            p {
                                font-size: 12px;
                            }
                        }

                        /deep/ .el-radio {
                            transform: translate(0, 27px);
                        }
                    }

                    .pay_mode:hover {
                        background-color: #f5f5f5;
                    }

                    /deep/.el-button {
                        height: 40px;
                        width: 100px;
                        font-size: 16px;
                        position: fixed;
                        left: 50%;
                        top: 50%;
                        transform: translate(-50%, 110px);
                    }
                }
            }

            .mask {
                position: fixed;
                z-index: 10;
                left: 0;
                right: 0;
                bottom: 0;
                top: 0;
                background: rgba(0, 0, 0, 0.6);
            }
        }

        .openBox-cj {
            width: 100%;
            height: 200px;
            margin-top: 40px;
            overflow: hidden;

            .openBox-main {
                height: 100%;
                width: 100%;
                display: flex;
                flex-wrap: nowrap;
                justify-content: flex-start;

                .main-item {
                    width: 202px;
                    height: 100px;
                    flex-shrink: 0;
                    flex-basis: 202px;
                    background: url("~@img/bg/boxCj1.png") center / contain no-repeat;
                    text-align: center;
                    color: #fff;
                    line-height: 100px;

                    img {
                        max-width: 100%;
                        height: 100px;
                        background: center / contain no-repeat;
                    }
                }

                .scroll {
                    animation: scrollAnimation 10s linear infinite;
                }
            }
        }

        .openbox-desc {
            height: fit-content;
            width: 100%;

            .column {
                height: 50px;
                width: 100%;
                display: flex;
                margin-top: 30px;
                border-bottom: 2px solid #fbfa02;

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
                    box-sizing: border-box;
                    width: 1030px;
                    height: 50px;

                    color: #fff;
                    font-size: 20px;
                    line-height: 50px;
                    margin: 0 10px;
                    overflow: hidden;

                    span {
                        display: inline-block;
                        white-space: nowrap;
                        transition: transform linear;
                    }
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

                        p {
                            margin-left: 5px;
                            font-size: 14px;
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
                    background: url(~@img/bg/quality1.png) center/contain no-repeat;
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
                        cursor: pointer;
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
