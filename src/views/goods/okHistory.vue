<template>
    <div id="okHistory">
        <el-table :data="data" style="width: 100%">
            <el-table-column width="30"></el-table-column>
            <el-table-column label="饰品" width="445">
                <template slot-scope="scope">
                    <div class="pic-cont">
                        <img :src="scope.row.img" alt="" class="goodsImg">
                    </div>
                    <div class="goodsName">
                        {{ scope.row.name }}
                    </div>
                </template>
            </el-table-column>
            <el-table-column label="价格" width="350">
                <template slot-scope="scope">
                    <b style="color:#eea20e">￥{{ scope.row.price }}</b>
                </template>
            </el-table-column>

            <el-table-column prop="sellingTime" label="出售时间" width="360">
            </el-table-column>

            <el-table-column width="30"></el-table-column>
        </el-table>
    </div>
</template>

<script>
import axios from 'axios';
export default {
    name: "okHistory",
    components: {},
    props: ["goodsInfo"],
    data() {
        return {
            data: []
        }
    },
    methods: {
        init() {
            axios.get("http://localhost:8081/sell/getOkData", {
                params: {
                    gID: this.goodsInfo[0].gid
                }
            }).then(res => {
                console.log('', res)
                this.data = res.data.data
            })
        }
    },
    mounted() {
        this.init()
    }
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