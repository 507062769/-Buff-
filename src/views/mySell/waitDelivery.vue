<template>
    <div id="waitDelivery">
        <el-table :data="waitData" style="width: 100%">
            <el-table-column prop="goods" label="饰品" width="310" align="center">
            </el-table-column>
            <el-table-column prop="price" label="售价" width="120" align="center">
            </el-table-column>
            <el-table-column prop="buyer" label="买家" width="130" align="center">
            </el-table-column>
            <el-table-column prop="date" label="购买时间" width="480" align="center">
            </el-table-column>
            <el-table-column prop="status" label="状态" align="center">
            </el-table-column>
        </el-table>
    </div>
</template>

<script>
export default {
    name: "waitDelivery",
    components: {},
    data() {
        return {
            waitData: [
                {
                    id: 1,
                    goods: "爪子刀 | 虎牙(崭新出厂)",
                    price: 1988.0,
                    buyer: "小王吧",
                    date: "2023-12-21 14:24:53",
                    status: '待发货'
                },
                {
                    id: 2,
                    goods: "爪子刀 | 虎牙(崭新出厂)",
                    price: 1988.0,
                    buyer: "小王吧",
                    date: "2023-12-21 14:24:53",
                    status: '待发货'
                },
                {
                    id: 3,
                    goods: "爪子刀 | 虎牙(崭新出厂)",
                    price: 1988.0,
                    buyer: "小王吧",
                    date: "2023-12-21 14:24:53",
                    status: '待发货'
                },
            ]
        }
    },
    methods: {},
}
</script>

<style scoped lang="less"></style>