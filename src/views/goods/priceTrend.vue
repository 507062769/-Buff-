<template>
    <div id="priceTrend">
        <div ref="lineChart" style="width: 100%; height: 300px"></div>
    </div>
</template>

<script>
import * as echarts from 'echarts';
export default {
    name: "priceTrend",
    components: {},
    data() {
        return {
            lineChart: null,
            datePoints: [],
        }
    },
    methods: {
        renderLineChart() {
            const dateList = this.datePoints.map((item) => item.date);
            const valueList = this.datePoints.map((item) => item.amount);
            const option = {

                tooltip: {
                    trigger: "axis",
                    valueFormatter: value => '出售金额：￥' + value
                },
                xAxis: [
                    {
                        type: 'category',
                        data: dateList,
                        axisLabel: {
                            interval: 3, // 设置刻度间隔，0表示所有刻度都显示
                        },

                    },
                ],
                yAxis: [
                    {
                        type: 'value',
                        interval: 500,
                        axisLabel: {
                            formatter: '￥{value}',
                        },
                    },
                ],
                series: [
                    {
                        type: "line",
                        smooth: true,
                        showSymbol: false,
                        data: valueList,

                    },

                ],
            };
            this.lineChart.setOption(option); // 设置echarts实例的配置项和数据
        },
        renderData() {
            // 获取从今天算起的前30天日期
            const now = new Date();
            for (let i = 0; i < 30; i++) {
                const date = new Date(now);
                date.setDate(date.getDate() - i); // 逐日减少日期
                const amount = Math.floor(Math.random() * 1000); // 生成随机金额
                this.datePoints.unshift({
                    date: `${date.getMonth() + 1}/${date.getDate()}`,
                    amount: amount,
                });
            }
        }
    },
    mounted() {
        this.renderData();
        this.lineChart = echarts.init(this.$refs.lineChart); // 初始化echarts实例
        this.renderLineChart(this.datePoints); // 渲染折线图，并传入日期数组
    },
}
</script>

<style scoped lang="less">
#priceTrend {
    height: fit-content;
    width: 100%;
    background-color: #fff;
}
</style>