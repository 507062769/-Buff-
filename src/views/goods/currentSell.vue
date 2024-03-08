<template>
    <div class="currentSell">
        <el-empty description="暂无数据" v-if="goodsInfo.length == 0"></el-empty>
        <el-table :data="goodsInfo" style="width: 100%" v-else>
            <el-table-column width="30"></el-table-column>
            <el-table-column prop="GoodsName" label="饰品" width="180">
                <div class="pic-cont">
                    <img src="~@img/hdd.png" alt="" class="goodsImg">
                </div>
            </el-table-column>
            <el-table-column prop="wear" label="磨损度" width="380">
            </el-table-column>

            <el-table-column label="卖家" width="300">
                <template slot-scope="scope">
                    <el-avatar icon="el-icon-user-solid" :size="30"></el-avatar>
                    <span>{{ scope.row.nickName }}</span>
                </template>
            </el-table-column>

            <el-table-column prop="Price" label="价格" width="150">

                <template slot-scope="scope">
                    <b style="color:#eea20e">￥{{ scope.row.price }}</b>
                </template>
            </el-table-column>
            <el-table-column label="操作" width="145">

                <template slot-scope="scope">
                    <el-button @click="handleBuy(scope.row)" type="primary" size="small">
                        购买
                    </el-button>
                </template>
            </el-table-column>
            <el-table-column width="30"></el-table-column>
        </el-table>
        <div class="popup" v-show="isBuy">
            <div class="pupop_header">
                <h3>
                    确认支付
                </h3>
                <span class="popup-close" @click="isBuy = false; isShowBody = false; selectData = []">x</span>
            </div>
            <p class="popup-tip">购买后卖家在12小时内完成发货</p>
            <div class="pupop_cont">
                <h3>应付 <span>￥{{ selectData.price }}</span></h3>
                <p class="cont-tip">选择支付方式</p>
                <ul>
                    <li v-for="item in paymentMethod" :key="item.id">
                        <div class="pay_mode">
                            <img :src="item.img">
                            <div class="pay_mode_text">
                                <h5> {{ item.name }} <span style="color:#4d80e1">￥{{ getItemAmount(item.id) }} </span>
                                </h5>
                                <p style="color:#EEA20E" v-if="getItemAmount(item.id) < selectData.price">
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
        <div class="mask" v-show="isBuy" @click="isBuy = false; selectData = []"></div>

    </div>
</template>

<script>
import axios from 'axios'
export default {
    name: "currentSell",
    components: {},
    props: ["goodsInfo", "hidden"],
    data() {
        return {
            isBuy: false,
            selectedPayment: null,
            paymentMethod: [
                { id: 'amount_zfb', name: 'BUFF余额-支付宝', img: "/img/zfb.png" },
                { id: 'amount_yhk', name: 'BUFF余额-银行卡', img: "/img/yhk.png" }
            ],
            selectData: [],
            userInfo: {},
        }
    },
    methods: {
        // 初始化
        init() {
            this.userInfo = this.$store.state.userInfo
        },
        // 处理点击购买的事件
        handleBuy(row) {
            this.isBuy = true;
            this.selectData = row
        },
        //  获取账户支付宝、银行卡金额
        getItemAmount(id) {
            switch (id) {
                case 'amount_zfb':
                    return this.userInfo.amount_zfb || 0;
                case 'amount_yhk':
                    return this.userInfo.amount_yhk || 0;
                default:
                    return 0
            }
        },
        //确认付款   
        buy() {
            axios.put("http://localhost:8081/user/subPrice", {
                uID: this.userInfo.uid,
                payment: this.selectedPayment,
                price: this.userInfo[this.selectedPayment] - parseFloat(this.selectData.price),
            }).then(res => {
                this.isBuy = false;
                this.$store.commit("updataUserPrice", { payment: this.selectedPayment, price: this.userInfo[this.selectedPayment] - parseFloat(this.selectData.price) })

                this.$message({
                    message: "购买成功，等待卖家发货！",
                    type: "success",
                })

                this.hidden(this.selectData.sid)
            })
        },

    },
    mounted() {
        this.init()
    }
}
</script>

<style scoped lang="less">
.currentSell {
    height: fit-content;
    width: 100%;

    .pic-cont {
        height: 66px;
        width: 88px;
        background-image: url(~@img/bg/item_bg.png);
        background-size: cover;

        .goodsImg {
            height: 66px;
            width: 88px;
            object-fit: contain;
        }
    }

    .popup {
        width: 540px;
        height: 400px;
        position: fixed;
        z-index: 10;
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

        .popup-tip {
            display: inline-block;
            height: 40px;
            width: 100%;
            background-color: #F2F7F3;
            color: #508f50;
            text-align: center;
            line-height: 40px;
        }

        .pupop_cont {
            height: 310px;
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
                color: #959595
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
                transform: translate(-50%, 125px);
            }

        }
    }

    .mask {
        position: fixed;
        z-index: 1;
        left: 0;
        right: 0;
        bottom: 0;
        top: 0;
        background: rgba(0, 0, 0, 0.6);
    }

    /deep/ .cell {
        padding-left: 0;
    }

    /deep/.el-avatar {
        float: left;
    }

    .el-avatar+span {
        display: inline-block;
        height: 30px;
        line-height: 30px;
        margin-left: 5px;
    }

    /deep/ .el-button {
        width: 90px;
        background-color: #4773c8;
    }

    /deep/.el-empty {
        background-color: white
    }


}
</style>