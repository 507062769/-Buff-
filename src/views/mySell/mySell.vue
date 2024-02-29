<template>
    <div id="Mysell">
        <div class="header">
            <div class="cont-tab">
                <ul @click="toggleTab">
                    <li tabIndex="1" :class="tabIndex == 1 ? 'on' : ''">出售管理</li>
                    <li tabIndex="2" :class="tabIndex == 2 ? 'on' : ''">出售记录</li>
                    <li tabIndex="3" :class="tabIndex == 3 ? 'on' : ''">出售统计</li>
                </ul>
                <span class="right">件数 : <span style="color: #eea20e">48 </span> 估值 :
                    <span style="color: #eea20e">￥88</span></span>
            </div>

            <div class="criteria">
                <div class="criteria-item">
                    <h5>筛选</h5>
                    <ul>
                        <li>不限</li>
                        <li>匕首</li>
                        <li>手套</li>
                        <li>步枪</li>
                    </ul>
                </div>
                <div class="criteria-item">
                    <h5>品质</h5>
                    <ul>
                        <li>不限品质</li>
                        <li>违禁</li>
                        <li>保密</li>
                        <li>受限</li>
                    </ul>
                </div>
                <div class="criteria-item">
                    <h5>外观</h5>
                    <ul>
                        <li>不限</li>
                        <li>崭新出厂</li>
                        <li>略有磨损</li>
                        <li>久经沙场</li>
                    </ul>
                </div>
                <div class="criteria-search">
                    <el-input placeholder="请输入物品名称" v-model="marketName" clearable>
                        <el-button slot="append" icon="el-icon-search">搜索</el-button>
                    </el-input>
                </div>
            </div>
        </div>

        <router-view :marketInfo="marketInfo"></router-view>
    </div>
</template>

<script>
import axios from 'axios'

export default {
    name: "Mysell",
    components: {},
    data() {
        return {
            tabIndex: 1,
            marketName: "",
            marketInfo: [],
        };
    },
    methods: {
        // 切换tab
        toggleTab({ target }) {
            this.tabIndex = target.tabIndex;
            switch (this.tabIndex) {
                case 1:
                    this.$router.push({
                        name: "OnSell",
                    });
                    break;
                case 2:
                    this.$router.push({
                        name: "SellHistory",
                    });
                    break;
                case 3:
                    this.$router.push({
                        name: "SellStatistics",
                    });
                    break;
            }
        },
        getSellInfo() {
            axios.get("http://localhost:8081/sell/getSell", {
                params: {
                    uID: this.$store.state.userInfo.uid,
                }
            }).then(res => {
                this.marketInfo = res.data.data;
            })
        },
    },
    mounted() {
        this.getSellInfo()
    }
};
</script>

<style scoped lang="less">
#Mysell {
    height: fit-content;
    width: 80%;
    margin: 0 auto;

    .header {
        height: 105px;
        width: 100%;
        background-image: url(~@img/bg/marcket-header-bg.png);
        background-size: 100%;
        box-sizing: border-box;
        padding: 10px 30px 5px;
        margin-bottom: 20px;

        .cont-tab {
            height: 50%;
            width: 100%;
            color: #999;
            border-bottom: 2px solid #4773c8;

            li {
                float: left;
                width: fit-content;
                height: 45px;
                margin-right: 30px;
                cursor: pointer;
                font-size: 16px;
                line-height: 40px;
            }

            .right {
                float: right;
                line-height: 40px;
                font-size: 12px;
            }

            .on {
                background-image: url(~@img/up.png);
                background-repeat: no-repeat;
                background-position: 25px 37px;
                color: white;
            }

            li:hover {
                color: white;
            }
        }

        .criteria {
            height: 50%;
            width: 100%;
            margin: 0 auto;
            border-top: solid #2c2f38 1px;

            .criteria-item {
                height: 30px;
                width: 90px;
                float: left;
                margin: 7px 20px 0 0;
                background-color: #2d2f3e;

                h5 {
                    color: #8e9593;
                    height: 100%;
                    line-height: 30px;
                    font-size: 12px;
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
                        width: 70px;
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
                    z-index: 10;
                }
            }

            .criteria-search {
                height: 30px;
                width: 280px;
                float: right;
                margin: 7px 8px 0 0;

                /deep/ .el-input__inner {
                    background-color: rgba(72, 134, 255, 0.16);
                    border-color: #3f5d97;
                    width: 200px;
                    height: 30px;
                    font-size: 14px;
                }

                /deep/ .el-input-group__append:hover {
                    background-color: #4773c8;
                }

                /deep/ .el-input-group__append {
                    background-color: #3f5d97;
                    color: #fff;
                    width: 50px;
                    height: 30px;
                    border: none;
                }

                /deep/ .el-input__suffix {
                    transform: translate(-90px, -4px) !important;
                }
            }

            .counter {
                width: 215px;
                color: #888d94;
                margin: 13px 0 13px 0;

                /deep/ .el-input,
                /deep/ .el-input__inner {
                    width: 80px;
                    height: 35px;
                    background-color: #2d2f3e;
                }
            }
        }
    }
}
</style>
