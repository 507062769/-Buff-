<template>
    <div id="inventory">
        <div class="header">
            <div class="left">
                <div class="group" @click="toggleTab">
                    <div data-inventorySortord="gainTime" :class="startsWith($store.state.inventorySortord, 'gainTime') ? 'on' : ''
                    ">
                        <span>时间</span>
                        <i class="el-icon-bottom" v-if="sortOptions['gainTime'] === 'desc'"></i>
                        <i class="el-icon-top" v-else></i>
                    </div>
                    <div data-inventorySortord="price" :class="startsWith($store.state.inventorySortord, 'price') ? 'on' : ''
                    ">
                        <span>价格</span>
                        <i class="el-icon-bottom" v-if="sortOptions['price'] === 'desc'"></i>
                        <i class="el-icon-top" v-else></i>
                    </div>
                    <div data-inventorySortord="wear" :class="startsWith($store.state.inventorySortord, 'wear') ? 'on' : ''
                    ">
                        <span>磨损</span>
                        <i class="el-icon-bottom" v-if="sortOptions['wear'] === 'desc'"></i>
                        <i class="el-icon-top" v-else></i>
                    </div>
                </div>
                <span class="total">
                    已选
                    <b style="color: #eea20e">{{
                    $store.state.checkedSellItem.length
                }}</b>
                    /
                    <span>{{ marketInfo.length }}</span>
                </span>
            </div>
            <div class="right">
                <el-checkbox v-model="isSelect" @change="allSelect">全选</el-checkbox>
                <el-button type="info" @click="openFullScreen">刷新</el-button>
                <el-button type="primary" @click="openGoSell"
                    :disabled="$store.state.checkedSellItem.length == 0">上架</el-button>
            </div>
            <div class="pupop_container" v-show="isGoSell">
                <div class="pupop_header">
                    <h3>
                        上架饰品
                        <span>(1件)</span>
                    </h3>
                    <span class="popup-close" @click="
                    isGoSell = false;
                isShowBody = false;
                ">x</span>
                </div>
                <div class="pupop_cont">
                    <el-table :data="sellData" style="width: 100%">
                        <el-table-column width="15"></el-table-column>
                        <el-table-column prop="name" label="饰品" width="335">
                            <template slot-scope="scope">
                                <div class="pic-cont">
                                    <img src="~@img/pf/akhs.png" alt="" class="goodsImg" />
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
                        <el-table-column prop="sellPrice" label="买家支付金额" width="201">

                            <template slot-scope="scope">
                                <el-input type="number" v-model="scope.row.sellPrice" placeholder="买家支付金额"
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
                        <el-button type="primary" @click="goSell">上架</el-button>
                    </div>
                </div>
            </div>
            <div class="mask" v-show="isGoSell" @click="
                    isGoSell = false;
                isShowBody = false;
                "></div>
        </div>

        <el-empty description="暂无数据" v-if="marketInfo.length == 0"></el-empty>
        <div class="list" v-loading.lock="fullscreenLoading" v-else>
            <Item v-for="item in marketInfo" :key="item.Id" :item="item"></Item>
        </div>
    </div>
</template>

<script>
import axios from "axios";
import Item from "./inventoryItem.vue";
export default {
    name: "inventory",
    components: { Item },
    props: ["marketInfo", "getInventory"],
    data() {
        return {
            // 是否全选
            isSelect: false,
            // 加载动画
            fullscreenLoading: false,
            // 是否打开要出售商品的页面
            isGoSell: false,
            // 需要出售的商品
            sellData: [],
            // 正在出售中的商品
            sellingData: [],
            // 是否禁用body滚动条
            isShowBody: false,
            sortOptions: {
                gainTime: "desc", // 初始设置为降序
                price: "desc", // 初始设置为降序
                wear: "desc", // 初始设置为降序
            },
        };
    },
    methods: {
        // 切换tab栏
        toggleTab({ target }) {
            if (target.tagName === "DIV") {
                const sortKey = target.dataset.inventorysortord;
                this.sortOptions[sortKey] =
                    this.sortOptions[sortKey] === "desc" ? "asc" : "desc";
                this.$store.commit(
                    "toggleInventorySortord",
                    sortKey + " " + this.sortOptions[sortKey]
                );
            } else {
                const sortKey = target.closest("div").dataset.inventorysortord;
                this.sortOptions[sortKey] =
                    this.sortOptions[sortKey] === "desc" ? "asc" : "desc";
                this.$store.commit(
                    "toggleInventorySortord",
                    sortKey + " " + this.sortOptions[sortKey]
                );
            }
            this.getInventory();
        },
        startsWith(str, prefix) {
            return str.startsWith(prefix);
        },
        // 全选
        allSelect() {
            this.isSelect
                ? this.$store.dispatch("allSellSelect", this.marketInfo)
                : this.$store.commit("resetSellCheckedItem");
        },
        // 刷新
        openFullScreen() {
            this.fullscreenLoading = true;
            setTimeout(() => {
                this.fullscreenLoading = false;
                this.getInventory();
            }, 1000);
        },
        // 打开上架前的准备页面，并设置金额
        openGoSell() {
            this.isGoSell = true;
            this.isShowBody = !this.isShowBody;
            this.showBody();
            axios
                .post("http://localhost:8081/inventory/getInventoryByItemList", {
                    uID: this.$store.state.userInfo.uid,
                    itemIDList: this.$store.state.checkedSellItem,
                })
                .then((res) => {
                    res.data.data.forEach((e) => {
                        (e.sellPrice = null), (e.actualPrice = null);
                    });
                    this.sellData = res.data.data;
                });
        },
        // 提交数据到我的出售表
        goSell() {
            this.isShowBody = !this.isShowBody;
            axios
                .post("http://localhost:8081/sell/addSellInfo", {
                    infoList: this.sellData,
                    uID: this.$store.state.userInfo.uid,
                })
                .then((res) => {
                    if (res.data.status === "200") {
                        this.$message({
                            message: "上传成功",
                            type: "success",
                        });
                        this.isGoSell = false;
                        this.$store.commit("resetSellCheckedItem");
                    }
                });
        },
        // 根据输入的值来调整金额
        updateActualPrice(row) {
            if (row.sellPrice) {
                row.actualPrice = row.sellPrice * 0.9;
                row.actualPrice = parseFloat(row.actualPrice).toFixed(2);
            } else {
                row.actualPrice = null;
            }
        },
        updateSellPrice(row) {
            if (row.actualPrice) {
                row.sellPrice = row.actualPrice / 0.9;
                row.sellPrice = parseFloat(row.sellPrice).toFixed(2);
            } else {
                row.sellPrice = null;
            }
        },
        // 是否显示body的滚动条
        showBody() {
            this.isShowBody
                ? (document.body.style.overflow = "hidden")
                : (document.body.style.overflow = "auto");
        },
    },
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
    mounted() { },
    watch: {
        isShowBody(newVal, oldVal) {
            this.showBody();
        },
    },
};
</script>

<style scoped lang="less">
#inventory {
    height: fit-content;
    width: 100%;
    background-color: #fff;

    .header {
        box-sizing: border-box;
        height: 50px;
        width: 100%;
        background-color: #1c202b;
        padding: 0 30px;
        position: relative;

        .left {
            height: 100%;
            float: left;
            line-height: 47px;

            .group {
                display: inline-block;

                div {
                    display: inline-block;
                    width: 80px;
                    height: 30px;
                    border: 1px solid #45536c;
                    color: #63779b;
                    font-size: 12px;
                    text-align: center;
                    line-height: 30px;
                    cursor: pointer;
                }
            }

            .on {
                background-color: #45536c;
                color: white !important;
            }

            .total {
                color: #9a9b9e;
                font-size: 12px;
                margin-left: 20px;
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

    .list {
        width: 1155px;
        margin: 20px 30px;
        height: fit-content;
        box-sizing: border-box;
        display: inline-grid;
        grid-template-columns: 1fr 1fr 1fr 1fr 1fr;
        column-gap: 20px;
        row-gap: 20px;
    }
}
</style>
