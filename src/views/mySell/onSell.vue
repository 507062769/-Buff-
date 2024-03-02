<template>
    <div id="onSell">
        <template v-if="!marketInfo.length">
            <p class="tipImg"></p>
            <p class="tipText">你还没有在出售的饰品，快去库存中上架一些吧</p>
            <el-button type="primary" plain @click="gotoInventory">前往库存</el-button>
        </template>
        <div class="list" v-else>
            <Item v-for="item in marketInfo" :key="item.Id" :item="item"></Item>
        </div>
    </div>
</template>

<script>
import Item from '../myBackpack/inventoryItem.vue'
export default {
    name: "onSell",
    components: { Item },
    props: ["marketInfo"],
    data() {
        return {
        }
    },
    methods: {
        // 跳转到库存页
        gotoInventory() {
            this.$router.push({
                name: "Inventory",
            })
        },
    },
    mounted() {

    },
}
</script>

<style scoped lang="less">
#onSell {
    height: fit-content;
    width: 100%;

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