<template>
    <div id="waitDelivery">
        <el-table :data="waitSellData" style="width: 100%">
            <el-table-column width="30"></el-table-column>
            <el-table-column label="饰品" width="445">
                <template slot-scope="scope">
                    <div class="pic-cont">
                        <img :src="scope.row.img" alt="" class="goodsImg" />
                    </div>
                    <div class="goodsName">
                        {{ scope.row.name }}
                    </div>
                </template>
            </el-table-column>
            <el-table-column label="价格" width="150">
                <template slot-scope="scope">
                    <b style="color: #eea20e">￥{{ scope.row.price }}</b>
                </template>
            </el-table-column>
            <el-table-column label="卖家" width="200">
                <template slot-scope="scope">
                    <el-avatar icon="el-icon-user-solid" :size="30"></el-avatar>
                    <span>{{ scope.row.nickName }}</span>
                </template>
            </el-table-column>
            <el-table-column prop="formattedTime" label="时间" width="180">
            </el-table-column>
            <el-table-column label="状态" align="center">
                <template slot-scope="scope">
                    <p class="detail-status"><i class="icon"></i> 等待您发货</p>
                    <el-popconfirm title="确定要取消发货吗？" icon="el-icon-info" icon-color="red" confirm-button-type="danger"
                        cancel-button-type="primary" @confirm="closeDeliverGoods(scope.row)">
                        <span slot="reference" class="closeDeliverGoods">取消发货</span>
                    </el-popconfirm>
                    <span class="DeliverGoods" @click.once="handleDeliverGoods(scope.row)">发货</span>
                </template>
            </el-table-column>
            <el-table-column width="30"></el-table-column>
        </el-table>
    </div>
</template>

<script>
import axios from "axios";

export default {
    name: "waitDelivery",
    components: {},
    props: ["waitSellData"],
    data() {
        return {};
    },
    methods: {
        // 取消发货
        closeDeliverGoods(row) {
            // 修改订单状态为取消发货
            axios.get("http://localhost:8081/order/updateOrderStatue", {
                params: {
                    statue: 3,
                    oID: row.oid,
                }
            }).then(res => {
                // 给买家退款
                axios.put("http://localhost:8081/user/addPrice", {
                    uID: row.buyerID,
                    paymentMethod: row.paymentMethod,
                    price: "price",
                    sID: row.sid,
                }).then(res => {
                    // 当成功添加价格后，重新获取等待发货的数据
                    this.$bus.$emit("getWaitSellData")

                    // 创建资金流水,给买家退款
                    axios.get("http://localhost:8081/fund/addFlow", {
                        params: {
                            uID: row.buyerID,
                            type: 3,
                            amount: row.price,
                            source: row.paymentMethod,
                        }
                    })

                })
            })

            this.$message({
                message: "取消成功！",
                type: "success",
            });
        },
        // 发货
        handleDeliverGoods(row) {
            axios.post("http://localhost:8081/tool/deliverGoods", {
                goods: row
            }).then(res => {
                this.$bus.$emit("getWaitSellData")
                this.$store.commit("updataUserPrice", { payment: row.paymentMethod, price: this.$store.state.userInfo[row.paymentMethod] + parseFloat(row.actualPrice) })

                // 创建资金流水,给卖家添加流水订单
                axios.get("http://localhost:8081/fund/addFlow", {
                    params: {
                        uID: row.sellerID,
                        type: 2,
                        amount: row.actualPrice,
                        source: row.paymentMethod,
                    }
                })
                this.$message({
                    message: "发货成功",
                    type: "success"
                })
            })
        },
    },
};
</script>

<style scoped lang="less">
#waitDelivery {
    width: 100%;
    height: fit-content;
    background-color: #fff;

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

    /deep/.el-avatar {
        float: left;
    }

    .el-avatar+span {
        display: inline-block;
        height: 30px;
        line-height: 30px;
        margin-left: 5px;
    }

    .detail-status {
        color: #eca10e;

        .icon {
            display: inline-block;
            height: 11px;
            width: 11px;

            background-image: url(~@img/icon.png);
            background-position: 602px -587px;
        }
    }

    .closeDeliverGoods,
    .DeliverGoods {
        color: #999;
        border-bottom: 1px solid #999;
        margin-right: 10px;
        cursor: pointer;
    }
}
</style>
