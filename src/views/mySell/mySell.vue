<template>
    <div id="Mysell">
        <div class="header">
            <div class="cont-tab">
                <ul @click="toggleTab">
                    <li tabIndex="1" :class="tabIndex == 1 ? 'on' : ''">出售管理</li>
                    <li tabIndex="2" :class="tabIndex == 2 ? 'on' : ''">出售记录</li>
                    <li tabIndex="3" :class="tabIndex == 3 ? 'on' : ''">出售统计</li>
                </ul>
            </div>

            <div class="criteria">
                <div class="criteria-item">
                    <h5>{{ kindName }}</h5>
                    <ul @click="filter">
                        <li>
                            <h6 data-kID="0">不限</h6>
                        </li>
                        <li v-for="kind in Kind" :key="kind.kid">
                            <h6 :data-kID="kind.kid">{{ kind.name }}</h6>
                            <div>
                                <p v-for="kItem in kind.kindItem" :key="kItem.kiID" :data-kiID="kItem.kiID">
                                    {{ kItem.name }}
                                </p>
                            </div>
                        </li>
                    </ul>
                </div>
                <div class="criteria-item">
                    <h5>{{ qualityName }}</h5>
                    <ul @click="filter">
                        <li>
                            <h6 data-qualityID="0">不限品质</h6>
                        </li>
                        <li v-for="q in quality" :key="q.qid">
                            <h6 :data-qualityID="q.qid">
                                {{ q.name }}
                            </h6>
                        </li>
                    </ul>
                </div>
                <div class="criteria-item">
                    <h5>{{ wearName }}</h5>
                    <ul @click="filter">
                        <li>
                            <h6 :data-wearID="0">不限</h6>
                        </li>
                        <li v-for="w in wear" :key="w.wid">
                            <h6 :data-wearID="w.wid">
                                {{ w.name }}
                            </h6>
                        </li>
                    </ul>
                </div>
                <div class="criteria-search">
                    <el-input placeholder="请输入物品名称" v-model="searchName" clearable @change="getSellInfo">
                        <el-button slot="append" icon="el-icon-search" @click="getSellInfo">搜索</el-button>
                    </el-input>
                </div>
            </div>
        </div>

        <router-view :marketInfo="marketInfo" :getSellInfo="getSellInfo"
            :sellHistoryData="sellHistoryData"></router-view>
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
            kindName: "筛选",
            qualityName: "品质",
            wearName: "外观",
            Kind: [],
            kID: 0,
            kiID: 0,
            quality: [],
            qualityID: 0,
            wear: [],
            wearID: 0,
            searchName: "",
            sellHistoryData: [],
        };
    },
    methods: {
        // 初始化
        init() {
            // 获取种类、品质、外观的值
            axios.get("http://localhost:8081/tool/getKind").then((res) => {
                this.Kind = res.data.data;
            });
            axios.get("http://localhost:8081/tool/getQuality").then((res) => {
                this.quality = res.data.data;
            });
            axios.get("http://localhost:8081/tool/getWear").then((res) => {
                this.wear = res.data.data;
            });
            this.getSellInfo();
            this.$store.commit("updateIsSell", false)
        },
        // 获取筛选后的商品
        getSellInfo() {
            axios.get("http://localhost:8081/sell/getSell", {
                params: {
                    uID: this.$store.state.userInfo.uid,
                    kID: this.kID,
                    kiID: this.kiID,
                    qualityID: this.qualityID,
                    wearID: this.wearID,
                    searchName: this.searchName,
                }
            }).then(res => {
                this.marketInfo = res.data.data;
            })
        },
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
                    this.getSellOrder()
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
        // 过滤
        filter({ target }) {
            // 判断点击的是否为kid与kiID，
            if (target.dataset.kid || target.dataset.kiid) {
                // 若为真，将他们分别赋值
                this.kID = target.dataset.kid;
                this.kiID = target.dataset.kiid;
                this.kindName = target.innerText;
                // 在进行判断点击的具体是一级分类或是二级分类
                if (this.kID == undefined && this.kiID !== undefined) {
                    this.kID = 0;
                }
                else if (this.kID !== undefined && this.kiID == undefined) {
                    this.kiID = 0;
                }
                else {
                    this.kID = 0;
                    this.kiID = 0;
                }
            }
            // 若点击的为品质
            else if (target.dataset.qualityid) {
                // 将点击的品质id进行赋值
                this.qualityID = target.dataset.qualityid
                    ? target.dataset.qualityid
                    : this.qualityID;
                this.qualityName = this.qualityID ? target.innerText : this.qualityName;
            }
            // 若点击的为磨损
            else if (target.dataset.wearid) {
                this.wearID = target.dataset.wearid
                    ? target.dataset.wearid
                    : this.wearID;
                this.wearName = this.wearID ? target.innerText : this.wearName;
            }

            this.getSellInfo()
        },
        // 获取出售记录
        getSellOrder() {
            axios.get("http://localhost:8081/order/getSellOrder", {
                params: {
                    sellerID: this.$store.state.userInfo.uid,
                }
            }).then(res => {
                this.sellHistoryData = res.data.data
            })
        },


    },
    mounted() {
        this.init()
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
                        position: relative;

                        div {
                            display: none;
                            height: fit-content;
                            width: 70px;
                            position: absolute;
                            background-color: #3a455a;
                            left: 70px;
                            top: 0;
                        }
                    }

                    li:hover {
                        div {
                            display: block;
                        }
                    }
                }
            }

            .criteria-item:hover {
                ul {
                    display: inherit;
                    z-index: 100;
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
