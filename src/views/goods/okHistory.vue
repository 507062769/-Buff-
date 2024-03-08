<template>
    <div id="okHistory">
        <el-table :data="okHistoryData" style="width: 100%">
            <el-table-column width="30"></el-table-column>
            <el-table-column prop="GoodsName" label="饰品" width="445">
                <template slot-scope="scope">
                    <div class="pic-cont">
                        <img src="~@img/pf/akhs.png" alt="" class="goodsImg">
                    </div>
                    <div class="goodsName">
                        {{ scope.row.GoodsName }}
                    </div>
                </template>
            </el-table-column>
            <el-table-column prop="Price" label="价格" width="350">

                <template slot-scope="scope">
                    <b style="color:#eea20e">￥{{ scope.row.Price }}</b>
                </template>
            </el-table-column>

            <el-table-column prop="Date" label="时间" width="360">
            </el-table-column>

            <el-table-column width="30"></el-table-column>
        </el-table>
    </div>
</template>

<script>
export default {
    name: "okHistory",
    components: {},
    data() {
        return {
            okHistoryData: [
                {
                    Id: 1,
                    GoodsName: '蝴蝶刀|虎牙(久经沙场)',
                    Img: '~@img/pf/akhs.png',
                    Price: 999.00,
                    Seller: '匿名用户2231',
                    Date: '2023-12-31 15:25:38',
                    Detail: "订单ID20231231152538",
                },
                {
                    Id: 2,
                    GoodsName: '蝴蝶刀|虎牙(久经沙场)',
                    Img: '~@img/pf/akhs.png',
                    Price: 999.00,
                    Seller: '匿名用户2231',
                    Date: '2023-12-31 15:25:38',
                    Detail: "订单ID20231231152538",
                },
                {
                    Id: 3,
                    GoodsName: '蝴蝶刀|虎牙(久经沙场)',
                    Img: '~@img/pf/akhs.png',
                    Price: 999.00,
                    Seller: '匿名用户2231',
                    Date: '2023-12-31 15:25:38',
                    Detail: "订单ID20231231152538",
                },
                {
                    Id: 4,
                    GoodsName: '蝴蝶刀|虎牙(久经沙场)',
                    Img: '~@img/pf/akhs.png',
                    Price: 999.00,
                    Seller: '匿名用户2231',
                    Date: '2023-12-31 15:25:38',
                    Detail: "订单ID20231231152538",
                },
                {
                    Id: 5,
                    GoodsName: '蝴蝶刀|虎牙(久经沙场)',
                    Img: '~@img/pf/akhs.png',
                    Price: 999.00,
                    Seller: '匿名用户2231',
                    Date: '2023-12-31 15:25:38',
                    Detail: "订单ID20231231152538",
                },
            ]
        }
    },
    methods: {},
}
</script>

<style scoped lang="less">
#okHistory {
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
        color: green;

        .icon {
            display: inline-block;
            height: 11px;
            width: 11px;

            background-image: url(~@img/icon.png);
            background-position: 615px -587px;

        }
    }
}
</style>