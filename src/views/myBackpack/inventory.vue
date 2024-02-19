<template>
    <div id="inventory">
        <div class="header">
            <div class="left">
                <div class="group" @click="toggleTab">
                    <div data-sortord="gainTime" :class="$store.state.sortord === 'gainTime' ? 'on' : ''">
                        <span>时间</span>
                        <i class="el-icon-bottom"></i>
                    </div>
                    <div data-sortord="price" :class="$store.state.sortord === 'price' ? 'on' : ''">
                        <span>价格</span>
                        <i class="el-icon-bottom"></i>
                    </div>
                    <div data-sortord="wear" :class="$store.state.sortord === 'wear' ? 'on' : ''">
                        <span>磨损</span>
                        <i class="el-icon-bottom"></i>
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
                <el-button type="primary">上架</el-button>
            </div>
        </div>
        <div class="list" v-loading.lock="fullscreenLoading">
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
            sortord: "gainTime",
            isSelect: false,
            checkedItem: [],
            userInfo: {},
            fullscreenLoading: false,
        };
    },
    methods: {
        // 切换tab栏
        toggleTab({ target }) {
            if (target.tagName === "DIV") this.$store.commit("toggleSortord", target.dataset.sortord) //this.sortord = target.dataset.sortord;
            else this.$store.commit("toggleSortord", target.closest("div").dataset.sortord)//this.sortord = target.closest("div").dataset.sortord;
            this.getInventory(this.$store.state.sortord)
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
                this.getInventory(this.tabIndex);
            }, 1000);
        },
    },
    mounted() {
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
    }

    .list {
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