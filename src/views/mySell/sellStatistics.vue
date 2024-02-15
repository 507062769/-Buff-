<template>
    <div id="sellStatistics">
        <div class="sold-count">
            <div class="count-item">
                <h5>今日出售统计</h5>
                <ul>
                    <li class="money moneyColor">￥0</li>
                    <li class="line"></li>
                    <li class="count countColor">0件</li>
                </ul>
            </div>
            <div class="count-item">
                <h5>昨日出售统计</h5>
                <ul>
                    <li class="money">￥0</li>
                    <li class="line"></li>
                    <li class="count">0件</li>
                </ul>
            </div>
            <div class="count-item">
                <h5>累计出售统计</h5>
                <ul>
                    <li class="money">￥7028.67</li>
                    <li class="line"></li>
                    <li class="count">257件</li>
                </ul>
            </div>
        </div>
        <div class="count-chart">
            <div class="chart">
                <h5>30天统计图</h5>
                <div ref="lineChart" style="width: 100%; height: 300px"></div>

            </div>
        </div>
    </div>
</template>

<script>
import * as echarts from "echarts/core";
import { LineChart } from "echarts/charts";
import {
    TitleComponent,
    TooltipComponent,
    GridComponent,
} from "echarts/components";
import { CanvasRenderer } from "echarts/renderers";
import { GridSimpleComponent } from "echarts/components";
import { VisualMapComponent } from "echarts/components";

echarts.use([
    TitleComponent,
    TooltipComponent,
    GridComponent,
    LineChart,
    CanvasRenderer,
    GridSimpleComponent,
    VisualMapComponent,
]);

export default {
    name: "sellStatistics",
    components: {},
    data() {
        return {
            lineChart: null,
            datePoints: [],
        };
    },
    methods: {
        renderLineChart() {
            const dateList = this.datePoints.map((item) => item.date);
            const valueList = this.datePoints.map((item) => item.amount);
            const option = {
                visualMap: [
                    {
                        show: false,
                        type: "continuous",
                        seriesIndex: 0,
                        min: 0,
                        max: 1000,
                    },
                ],
                tooltip: {
                    trigger: "axis",
                    valueFormatter: value => '出售金额：￥' + value
                },
                xAxis: [
                    {
                        data: dateList,
                        gridIndex: 1,
                        axisLabel: {
                            interval: 0, // 设置刻度间隔，0表示所有刻度都显示
                            rotate: 45, // 设置刻度文字旋转角度
                        },
                    },
                ],
                yAxis: [
                    {
                        gridIndex: 1,
                        axisLabel: {
                            formatter: '￥{value}',
                        }
                    },
                ],
                grid: [
                    {
                        bottom: "20%",
                    },
                    {
                        top: "15%",
                    },
                ],
                series: [
                    {
                        type: "line",
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
};
</script>

<style scoped lang="less">
#sellStatistics {
    height: fit-content;
    width: 100%;
    background-color: #fff;

    .sold-count {
        height: 200px;
        width: 100%;
        display: flex;
        justify-content: center;

        .count-item {
            height: 150px;
            width: 300px;
            border: 1px solid #e4e4e4;
            margin: 25px 16px;
            background-color: #fff;

            h5 {
                border-left: 10px solid #4773c8;
                font-size: 16px;
                padding-left: 10px;
                margin-top: 15px;
            }

            .money,
            .count {
                height: 70px;
                width: 149px;
                display: inline-block;
                font-size: 24px;
                text-align: center;
                line-height: 70px;
            }

            .moneyColor {
                color: #eea20e;
            }

            .countColor {
                color: #4d80e1;
            }

            .line {
                height: 30px;
                width: 1px;
                background-color: #bfbfbf;
                display: inline-block;
                margin-top: 30px;
            }
        }
    }

    .count-chart {
        height: fit-content;
        width: 100%;
        padding-bottom: 10px;

        .chart {
            height: fit-content;
            width: 80%;
            margin: 25px auto;
            padding-top: 15px;
            box-sizing: border-box;
            border: 1px solid #e4e4e4;

            h5 {
                border-left: 10px solid #4773c8;
                font-size: 16px;
                padding-left: 10px;
            }
        }
    }
}
</style>
