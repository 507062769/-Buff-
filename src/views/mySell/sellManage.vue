<template>
    <div id="sellManage">
        <div class="header">
            <div class="left">
                <ul @click="toggleTab">
                    <li tabIndex="1" :class="tabIndex == 1 ? 'on' : ''">出售中</li>
                    <li tabIndex="2" :class="tabIndex == 2 ? 'on' : ''">等待发货(0)</li>
                </ul>
            </div>
            <div class="right">
                <el-checkbox v-model="isSelect" @change="allSelect">
                    全选(
                    {{ $store.state.checkedSellItem.length }}
                    /
                    {{ marketInfo.length }}
                    )
                </el-checkbox>
                <el-button type="info" @click="openChangePrice"
                    :disabled="$store.state.checkedSellItem.length == 0">改价</el-button>
                <el-button type="primary" @click="isRemove = true"
                    :disabled="$store.state.checkedSellItem.length == 0">下架</el-button>

                <el-dialog title="下架" :visible.sync="isRemove" width="20%" :before-close="handleClose">
                    <span>确定将选中的饰品下架？</span>
                    <span slot="footer" class="dialog-footer">
                        <el-button @click="isRemove = false">取 消</el-button>
                        <el-button type="primary" @click="delist">确 定</el-button>
                    </span>
                </el-dialog>
            </div>
            <div class="pupop_container" v-show="isChange">
                <div class="pupop_header">
                    <h3>
                        上架饰品
                        <span>(1件)</span>
                    </h3>
                    <span class="popup-close" @click="isChange = false; isShowBody = false;">x</span>
                </div>
                <div class="pupop_cont">
                    <el-table :data="sellData" style="width: 100%">
                        <el-table-column width="15"></el-table-column>
                        <el-table-column prop="name" label="饰品" width="335">
                            <template slot-scope="scope">
                                <div class="pic-cont">
                                    <img src="~@img/hdd.png" alt="" class="goodsImg" />
                                </div>
                                <div class="goodsName">
                                    {{ scope.row.name }}
                                </div>
                            </template>
                        </el-table-column>
                        <el-table-column prop="price" label="市场价" width="132">
                            <template slot-scope="scope">
                                <b style="color: #eea20e">￥{{ scope.row.price }}</b>
                            </template>
                        </el-table-column>
                        <el-table-column prop="price" label="买家支付金额" width="201">
                            <template slot-scope="scope">
                                <el-input type="number" v-model="scope.row.price" placeholder="买家支付金额"
                                    @blur="updateActualPrice(scope.row)"></el-input>
                            </template>
                        </el-table-column>
                        <el-table-column prop="actualPrice" label="实收金额" width="201">
                            <template slot-scope="scope">
                                <el-input type="number" v-model="scope.row.actualPrice" placeholder="实收金额"
                                    @blur="updateSellPrice(scope.row)"></el-input>
                            </template>
                        </el-table-column>
                        <el-table-column width="15"></el-table-column>
                    </el-table>
                </div>
                <div class="pupop_bottom">
                    <div class="bootom_left">
                        <p class="tip1">
                            预计收入|
                            <span> ￥{{ totalPrice }} </span>
                            <span> (已扣除 ¥ 0 手续费)</span>
                        </p>
                        <p class="tip2">
                            请在买家付款后12小时内发货，否则将下架该类饰品并取消出售权限。
                        </p>
                    </div>
                    <div class="bootom_right">
                        <el-button type="primary" @click="changPrice">确定改价</el-button>
                    </div>
                </div>
            </div>
            <div class="mask" v-show="isChange" @click="isChange = false; isShowBody = false;"></div>
        </div>
        <router-view :marketInfo="marketInfo"></router-view>
    </div>
</template>

<script>
import axios from "axios";
export default {
    name: "sellManage",
    components: {},
    props: ["marketInfo", "getSellInfo"],
    data() {
        return {
            isSelect: false,
            tabIndex: 1,
            isChange: false,
            sellData: [],
            isRemove: false,
            // 是否禁用body滚动条
            isShowBody: false,
        };
    },
    methods: {
        // 全选
        allSelect() {
            if (this.isSelect) {
                this.$store.dispatch("allSellSelect", this.marketInfo);
            } else {
                this.$store.dispatch("resetSellAll");
            }
        },
        // 判断单个商品是否选中
        isChecked(id) {
            this.$store.dispatch("toggleSellCheckedItem", id);
        },
        // 切换tab
        toggleTab({ target }) {
            if (target.tagName === "LI") {
                this.tabIndex = target.tabIndex;
            }
            switch (this.tabIndex) {
                case 1:
                    this.$router.push({
                        name: "OnSell",
                    });
                    break;
                case 2:
                    this.$router.push({
                        name: "WaitDelivery",
                    });
                    break;
            }
        },
        // 根据输入的值来调整金额
        updateActualPrice(row) {
            if (row.price) {
                row.actualPrice = row.price * 0.9;
                row.actualPrice = parseFloat(row.actualPrice).toFixed(2);
            } else {
                row.actualPrice = null;
            }
        },
        updateSellPrice(row) {
            if (row.actualPrice) {
                row.price = row.actualPrice / 0.9;
                row.price = parseFloat(row.price).toFixed(2);
            } else {
                row.price = null;
            }
        },
        // 点击改价前的准备
        openChangePrice() {
            this.isChange = true;
            this.isShowBody = !this.isShowBody;
            this.showBody()
            this.sellData = this.marketInfo.filter((item) =>
                this.$store.state.checkedSellItem.includes(item.gid)
            );
        },
        // 修改商品价格
        changPrice() {
            axios
                .post("http://localhost:8081/sell/changePrice", {
                    uID: this.$store.state.userInfo.uid,
                    data: this.sellData,
                })
                .then((res) => {
                    console.log("re", res);
                    this.$message({
                        message: "修改成功",
                        type: "success",
                    });
                    this.isChange = false;
                    this.isShowBody = !this.isShowBody
                    this.$store.commit("resetSellCheckedItem");
                });
        },
        // 下架商品
        delist() {
            axios
                .post("http://localhost:8081/sell/delist", {
                    uID: this.$store.state.userInfo.uid,
                    idList: this.$store.state.checkedSellItem,
                })
                .then((res) => {
                    this.$store.commit("resetSellCheckedItem");
                    this.getSellInfo();
                    this.isRemove = false;
                    this.$message({
                        message: "下架成功",
                        type: "success",
                    });
                });
        },
        // 点击取消时触发的事件
        handleClose(done) {
            this.$confirm("确认关闭？")
                .then((_) => {
                    done();
                })
                .catch((_) => { });
        },
        // 是否显示body的滚动条
        showBody() {
            this.isShowBody
                ? (document.body.style.overflow = "hidden")
                : (document.body.style.overflow = "auto");
        },
    },
    mounted() { },
    computed: {
        // 预计收入
        totalPrice() {
            return this.sellData.reduce((acc, item) => {
                const price = parseFloat(item.actualPrice);
                if (!isNaN(price)) {
                    return acc + price;
                } else {
                    return acc;
                }
            }, 0.0);
        },
    },
    watch: {
        isShowBody(newVal, oldVal) {
            this.showBody();
        },
    },
};
</script>

<style scoped lang="less">
#sellManage {
    height: 500px;
    width: 100%;
    background-color: white;

    .header {
        height: 50px;
        width: 100%;
        background-color: #1c202b;

        .left {
            height: 50px;
            width: 300px;
            float: left;

            li {
                display: inline-block;
                width: 150px;
                height: 50px;
                text-align: center;
                line-height: 50px;
                font-size: 16px;
                border-right: 1px solid rgba(255, 255, 255, 0.3);
                box-sizing: border-box;
                color: #999;
            }

            li:hover {
                background-image: url(~@img/icon.png);
                background-position: -320px -2px;
                color: #fff;
                cursor: pointer;
            }

            .on {
                color: #fff;
                background-image: url(~@img/icon.png);
                background-position: -308px -78px;
                pointer-events: none;
            }
        }

        .right {
            height: 100%;
            float: right;
            line-height: 50px;

            /deep/.el-checkbox {
                margin-right: 20px;
            }

            /deep/.el-checkbox__label {
                padding-left: 5px;
                color: #959595;
                font-size: 12px;
            }

            /deep/ .el-checkbox__label:hover {
                color: #ccc !important;
            }

            /deep/.el-checkbox__input.is-checked .el-checkbox__inner {
                background-color: #eea20e;
                border: none;
            }

            /deep/.el-checkbox__inner {
                border-color: #eea20e;
            }

            /deep/.el-button {
                width: 120px;
            }

            /deep/.el-button+.el-button {
                margin-left: 20px;
            }

            /deep/.el-dialog {
                margin-top: 30vh !important;
            }

            /deep/.el-dialog__header {
                padding-left: 20px !important;
            }

            /deep/.el-dialog__body {
                padding: 10px 20px 0 !important;
            }
        }

        .pupop_container {
            width: 900px;
            height: 480px;
            position: fixed;
            z-index: 10;
            left: 50%;
            top: 50%;
            transform: translate(-50%, -50%);
            background-color: #ccc;

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
                height: 340px;
                overflow: auto;

                .pic-cont {
                    height: 66px;
                    width: 88px;
                    background-image: url(~@img/bg/item_bg.png);
                    float: left;
                    background-size: cover;


                    .goodsImg {
                        height: 66px;
                        width: 88px;
                        object-fit: contain;
                    }
                }

                .goodsName {
                    display: inline-block;
                    height: 73px;
                    line-height: 73px;
                    margin-left: 10px;
                }

                /deep/.el-table__body-wrapper {
                    overflow-x: hidden !important;
                }
            }

            .pupop_bottom {
                height: 90px;
                width: 100%;
                background-color: #33363a;

                .bootom_left,
                .bootom_right {
                    display: inline-block;
                    height: 100%;
                }

                .bootom_left {
                    width: 80%;
                    box-sizing: border-box;
                    padding: 10px 20px;

                    .tip1 {
                        line-height: 40px;
                        color: #9a9b9e;
                    }

                    .tip1 :nth-child(1) {
                        color: #eea20e;
                        font-size: 24px;
                    }

                    .tip1 :nth-child(2) {
                        font-size: 12px;
                    }

                    .tip2 {
                        color: #eea20e;
                        font-size: 12px;
                    }
                }

                .bootom_right {
                    width: 20%;
                    float: right;

                    /deep/.el-button {
                        width: 120px;
                        margin: 25px 30px;
                    }

                    /deep/.el-button+.el-button {
                        margin-left: 20px;
                    }
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
    }
}
</style>