<template>
    <div id="inventory">
        <div class="header">
            <div class="left">
                <div class="group" @click="toggleTab">
                    <div :tabindex="1" :class="tabIndex == 1 ? 'on' : ''">
                        <span>时间</span>
                        <i class="el-icon-bottom"></i>
                    </div>
                    <div :tabindex="2" :class="tabIndex == 2 ? 'on' : ''">
                        <span>价格</span>
                        <i class="el-icon-bottom"></i>
                    </div>
                    <div :tabindex="3" :class="tabIndex == 3 ? 'on' : ''">
                        <span>磨损</span>
                        <i class="el-icon-bottom"></i>
                    </div>
                </div>
                <span class="total">
                    已选
                    <b style="color:#eea20e">0</b>
                    /
                    <span>38</span>
                </span>
            </div>
            <div class="right">
                <el-checkbox v-model="isSelect" @change="allSelect">全选</el-checkbox>
                <el-button type="info">刷新</el-button>
                <el-button type="primary">上架</el-button>
            </div>
        </div>
        <div class="list">
            <Item v-for="item in marketInfo" :key="item.Id" :item="item"></Item>
        </div>
    </div>
</template>

<script>
import Item from "./inventoryItem.vue";
export default {
    name: "inventory",
    components: { Item },
    data() {
        return {
            tabIndex: 1,
            isSelect: false,
            checkedItem: [],
            marketInfo: [
                {
                    Id: 1,
                    Title: "蝴蝶刀（★） | 都市伪装",
                    Img: "img/hdd.png",
                    Price: 999.0,
                },
                {
                    Id: 2,
                    Title: "蝴蝶刀（★） | 森林",
                    Img: "img/hdd.png",
                    Price: 999.0,
                },
                {
                    Id: 3,
                    Title: "蝴蝶刀（★） | 虎牙",
                    Img: "img/hdd.png",
                    Price: 999.0,
                },
                {
                    Id: 4,
                    Title: "蝴蝶刀（★） | 多普勒",
                    Img: "img/hdd.png",
                    Price: 999.0,
                },
                {
                    Id: 5,
                    Title: "蝴蝶刀（★） | 外表生锈",
                    Img: "img/hdd.png",
                    Price: 999.0,
                },
                {
                    Id: 6,
                    Title: "蝴蝶刀（★） | 传说",
                    Img: "img/hdd.png",
                    Price: 999.0,
                },
                {
                    Id: 7,
                    Title: "蝴蝶刀（★） | 黑色层压板",
                    Img: "img/hdd.png",
                    Price: 999.0,
                },
                {
                    Id: 8,
                    Title: "蝴蝶刀（★） | 自由之手",
                    Img: "img/hdd.png",
                    Price: 999.0,
                },
                {
                    Id: 9,
                    Title: "蝴蝶刀（★） | 深红之网",
                    Img: "img/hdd.png",
                    Price: 999.0,
                },
                {
                    Id: 10,
                    Title: "蝴蝶刀（★） | 大马士革刚",
                    Img: "img/hdd.png",
                    Price: 999.0,
                },
                {
                    Id: 11,
                    Title: "蝴蝶刀（★） | 自由之手",
                    Img: "img/hdd.png",
                    Price: 999.0,
                },
                {
                    Id: 12,
                    Title: "蝴蝶刀（★） | 深红之网",
                    Img: "img/hdd.png",
                    Price: 999.0,
                },
                {
                    Id: 13,
                    Title: "蝴蝶刀（★） | 大马士革刚",
                    Img: "img/hdd.png",
                    Price: 999.0,
                },
            ],
        }
    },
    methods: {
        toggleTab({ target }) {
            if (target.tagName === "DIV") this.tabIndex = target.tabIndex
            else this.tabIndex = target.closest("div").tabIndex;
        },

        allSelect() {
            if (this.isSelect) {
                this.marketInfo.forEach(item => {
                    if (!this.checkedItem.includes(item.Id))
                        this.checkedItem.push(item.Id);
                });
            } else {
                this.checkedItem = []
            }

        }
    },
}
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
                    color: #63779B;
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