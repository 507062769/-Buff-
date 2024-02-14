<template>
    <div id="onSell">
        <template v-if="1 === 0">
            <p class="tipImg"></p>
            <p class="tipText">你还没有在出售的饰品，快去库存中上架一些吧</p>
            <el-button type="primary" plain @click="gotoInventory">前往库存</el-button>
        </template>
        <template>
            <Item :marketInfo="marketInfo" :checkedItem="checkedItem"></Item>
        </template>
    </div>
</template>

<script>
import Item from '../myBackpack/inventoryItem.vue'
export default {
    name: "onSell",
    components: { Item },
    data() {
        return {
            marketInfo: [
                {
                    Id: 1,
                    Title: "Tec-9 | 叛逆（久经沙场）",
                    Img: "img/hdd.png",
                    Price: 2.0,
                },
                {
                    Id: 2,
                    Title: "蝴蝶刀（★） | 森林",
                    Img: "img/hdd.png",
                    Price: 999.0,
                },
            ],
            checkedItem: [],
        }
    },
    methods: {
        gotoInventory() {
            this.$router.push({
                name: "Inventory",
            })
        },
    },
}
</script>

<style scoped lang="less">
#onSell {
    height: fit-content;
    width: 100%;
    padding: 0 30px;

    .tipImg {
        height: 110px;
        width: 530px;
        background-image: url(~@img/tip/data-tip-manual.png);
        margin: 70px auto;

    }

    .tipText {
        text-align: center;
        color: #999;
    }

    /deep/ .el-button {
        margin: 20px 555px;
    }
}
</style>