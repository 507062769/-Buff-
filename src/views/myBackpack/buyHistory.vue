<template>
    <div id="buyHistory">
        <el-table :data="buyHistoryData" style="width: 100%">
            <el-table-column width="30"></el-table-column>
            <el-table-column prop="GoodsName" label="饰品" width="445">
                <template slot-scope="scope">
                    <div class="pic-cont">
                        <img :src="scope.row.img" alt="" class="goodsImg">
                    </div>
                    <div class="goodsName">
                        {{ scope.row.name }}
                    </div>
                </template>
            </el-table-column>
            <el-table-column label="价格" width="150">
                <template slot-scope="scope">
                    <b style="color:#eea20e">￥{{ scope.row.price }}</b>
                </template>
            </el-table-column>
            <el-table-column prop="Seller" label="卖家" width="200">
                <template slot-scope="scope">
                    <el-avatar icon="el-icon-user-solid" :size="30"></el-avatar>
                    <span>{{ scope.row.nickName }}</span>
                </template>
            </el-table-column>
            <el-table-column prop="formattedTime" label="时间" width="180">
            </el-table-column>
            <el-table-column prop="Detail" label="详情">
                <template slot-scope="scope">
                    <p class="detail-status s1" v-if="scope.row.statue == 1"><i class="icon"></i> 等待卖家发货</p>
                    <p class="detail-status s2" v-else-if="scope.row.statue == 2"><i class="icon"></i> 购买成功</p>
                    <p class="detail-status s3" v-else><i class="icon"></i> 购买失败</p>

                    <span>订单ID：{{ scope.row.oid }}</span>
                </template>
            </el-table-column>
            <el-table-column width="30"></el-table-column>
        </el-table>
    </div>
</template>

<script>
import axios from "axios";

export default {
    name: "buyHistory",
    components: {},
    props: ["buyHistoryData"],
    data() {
        return {

        }
    },
    methods: {
    },
    mounted() {

    }
}
</script>

<style scoped lang="less">
#buyHistory {
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

        .icon {
            display: inline-block;
            height: 11px;
            width: 11px;

            background-image: url(~@img/icon.png);
            background-position: 615px -587px;

        }
    }

    .s1 {
        color: #fda92b;

        .icon {
            background-position: 602px -587px;
        }
    }

    .s2 {
        color: green;

    }

    .s3 {
        color: red;

        .icon {
            background-position: 249px -448px;
        }
    }
}
</style>