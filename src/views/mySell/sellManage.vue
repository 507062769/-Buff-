<template>
    <div id="sellManage">
        <div class="header">
            <div class="left">
                <ul @click="toggleTab">
                    <li :tabIndex="1" :class="tabIndex == 1 ? 'on' : ''">出售中</li>
                    <li :tabIndex="2" :class="tabIndex == 2 ? 'on' : ''">等待发货(0)</li>
                </ul>
            </div>
            <div class="right">
                <el-checkbox v-model="isSelect" @change="allSelect">全选</el-checkbox>
                <el-button type="info">改价</el-button>
                <el-button type="primary">下架</el-button>
            </div>
        </div>
        <router-view></router-view>
    </div>
</template>

<script>
export default {
    name: "sellManage",
    components: {},
    data() {
        return {
            isSelect: false,
            tabIndex: 1,
            checkedItem: [],
        }
    },
    methods: {
        allSelect() {
            if (this.isSelect) {
                this.marketInfo.forEach(item => {
                    if (!this.checkedItem.includes(item.Id))
                        this.checkedItem.push(item.Id);
                });
            } else {
                this.checkedItem = []
            }
        },
        toggleTab({ target }) {
            if (target.tagName === "LI") {
                this.tabIndex = target.tabIndex;
            }
            switch (this.tabIndex) {
                case 1:
                    this.$router.push({
                        name: "OnSell"
                    })
                    break;
                case 2:
                    this.$router.push({
                        name: "WaitDelivery"
                    })
                    break;
            }
        }

    },
}
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
                border-right: 1px solid rgba(255, 255, 255, .3);
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
}
</style>