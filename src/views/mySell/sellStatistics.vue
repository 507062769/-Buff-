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
                    <li class="money">7028.67</li>
                    <li class="line"></li>
                    <li class="count">257件</li>
                </ul>
            </div>
        </div>
        <div class="count-chart">
            <div ref="lineChart" style="width: 400px; height: 400px;"></div>
        </div>
    </div>
</template>

<script>
import * as echarts from 'echarts/core';
import {
    LineChart
} from 'echarts/charts';
import {
    TitleComponent,
    TooltipComponent,
    GridComponent
} from 'echarts/components';
import {
    CanvasRenderer
} from 'echarts/renderers';
import {
    GridSimpleComponent
} from 'echarts/components';
import { VisualMapComponent } from 'echarts/components'

echarts.use([TitleComponent, TooltipComponent, GridComponent, LineChart, CanvasRenderer, GridSimpleComponent, VisualMapComponent]);

export default {
    name: "sellStatistics",
    components: {},
    data() {
        return {
            lineChart: null,
            datePoints: [],
            valueList: [1, 2, 3, 4, 5],
        }
    },
    methods: {
        renderLineChart() {
            const dateList = this.datePoints.map(item => item.date);
            const valueList = this.datePoints.map(item => item.amount);
            const option = {
                // Make gradient line here
                visualMap: [
                    {
                        show: false,
                        type: 'continuous',
                        seriesIndex: 0,
                        min: 0,
                        max: 400
                    }
                ],
                title: [
                    {
                        left: 'center',
                        text: ''
                    }
                ],
                tooltip: {
                    trigger: 'axis'
                },
                xAxis: [
                    {
                        data: dateList,
                        gridIndex: 1
                    }
                ],
                yAxis: [
                    {
                        gridIndex: 1
                    }
                ],
                grid: [
                    {
                        bottom: '60%'
                    },
                    {
                        top: '20%'
                    }
                ],
                series: [
                    {
                        type: 'line',
                        showSymbol: false,
                        data: valueList
                    }
                ]
            }
            this.lineChart.setOption(option); // 设置echarts实例的配置项和数据
        },
        renderData() {
            // 获取前一个月的日期
            const now = new Date();
            const year = now.getFullYear();
            const month = now.getMonth();
            const prevMonth = new Date(year, month - 1, 1); // 获取前一个月的第一天
            for (let i = 0; i < 30; i++) {
                const date = new Date(prevMonth);
                date.setDate(date.getDate() + i); // 逐日增加日期
                const amount = Math.floor(Math.random() * 1000);  // 生成随机金额
                this.datePoints.push({ date: `${date.getMonth() + 1}/${date.getDate()}`, amount: amount }); // 将日期格式化为月/日，并放入数组中
            }
        }

    },
    mounted() {
        this.renderData()
        this.lineChart = echarts.init(this.$refs.lineChart); // 初始化echarts实例
        this.renderLineChart(this.datePoints); // 渲染折线图，并传入日期数组
    },
}
</script>

<style scoped lang="less">
#sellStatistics {
    height: fit-content;
    width: 100%;
    background-color: #fff;

    .sold-count {
        height: 200px;
        width: 100%;
        background-color: red;
        display: flex;
        justify-content: center;

        .count-item {
            height: 150px;
            width: 280px;
            background-color: antiquewhite;
            margin: 25px;

            h5 {
                border-left: 10px solid #4773c8;
                font-size: 16px;
                padding-left: 10px;
                margin-top: 15px;
            }

            .money,
            .count {
                height: 70px;
                width: 138px;
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

}
</style>