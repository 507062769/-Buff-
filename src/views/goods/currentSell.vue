<template>
    <div class="currentSell">
        <el-table :data="goodsInfo" style="width: 100%">
            <el-table-column width="30"></el-table-column>
            <el-table-column prop="GoodsName" label="饰品" width="180">
                <div class="pic-cont">
                    <img src="~@img/hdd.png" alt="" class="goodsImg">
                </div>
            </el-table-column>
            <el-table-column prop="wear" label="磨损度" width="380">
            </el-table-column>

            <el-table-column label="卖家" width="300">
                <template slot-scope="scope">
                    <el-avatar icon="el-icon-user-solid" :size="30"></el-avatar>
                    <span>{{ scope.row.nickName }}</span>
                </template>
            </el-table-column>

            <el-table-column prop="Price" label="价格" width="150">

                <template slot-scope="scope">
                    <b style="color:#eea20e">￥{{ scope.row.price }}</b>
                </template>
            </el-table-column>
            <el-table-column label="操作" width="145">

                <template slot-scope="scope">
                    <el-button @click.native.prevent="deleteRow(scope.$index, tableData)" type="primary" size="small">
                        购买
                    </el-button>
                </template>
            </el-table-column>
            <el-table-column width="30"></el-table-column>
        </el-table>
    </div>
</template>

<script>
import axios from 'axios'
export default {
    name: "currentSell",
    components: {},
    props: ["goodsInfo"],
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
.currentSell {
    height: fit-content;
    width: 100%;

    .pic-cont {
        height: 66px;
        width: 88px;
        background-image: url(~@img/bg/item_bg.png);
        background-size: cover;

        .goodsImg {
            height: 66px;
            width: 88px;
            object-fit: contain;
        }
    }

    /deep/ .cell {
        padding-left: 0;
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

    /deep/ .el-button {
        width: 90px;
        background-color: #4773c8;
    }


}
</style>