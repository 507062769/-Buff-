<template>
    <div id="sellStatistics">
        <div class="sold-count">
            <div class="count-item">
                <h5>今日出售统计</h5>
                <ul>
                    <li class="money moneyColor">￥{{ todayPrice }}</li>
                    <li class="line"></li>
                    <li class="count countColor"> {{ todayCount }} 件</li>
                </ul>
            </div>
            <div class="count-item">
                <h5>昨日出售统计</h5>
                <ul>
                    <li class="money">￥{{ yesterdayPrice }}</li>
                    <li class="line"></li>
                    <li class="count"> {{ yesterdayCount }}件</li>
                </ul>
            </div>
            <div class="count-item">
                <h5>累计出售统计</h5>
                <ul>
                    <li class="money">￥{{ totalPrice }}</li>
                    <li class="line"></li>
                    <li class="count">{{ totalCount }} 件</li>
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
import axios from 'axios'

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
            statisticData: [],
            todayPrice: 0,
            todayCount: 0,
            totalPrice: 0,
            totalCount: 0,
            yesterdayPrice: 0,
            yesterdayCount: 0,

        };
    },
    methods: {
        init() {
            // 获取所有的价格与件数
            axios.get("http://localhost:8081/order/getTotalPrice", {
                params: {
                    uID: this.$store.state.userInfo.uid,
                    statue: 2,
                }
            }).then(res => {
                this.totalPrice = res.data.data || 0
            })
            axios.get("http://localhost:8081/order/getTotalCount", {
                params: {
                    uID: this.$store.state.userInfo.uid,
                    statue: 2,
                }
            }).then(res => {
                this.totalCount = res.data.data || 0
            })

            // 获取今日的价格与件数
            axios.get("http://localhost:8081/order/getTodayPrice", {
                params: {
                    uID: this.$store.state.userInfo.uid,
                    statue: 2,
                }
            }).then(res => {
                this.todayPrice = res.data.data || 0
            })
            axios.get("http://localhost:8081/order/getTodayCount", {
                params: {
                    uID: this.$store.state.userInfo.uid,
                    statue: 2,
                }
            }).then(res => {
                this.todayCount = res.data.data || 0
            })

            axios.get("http://localhost:8081/order/getYesterdayPrice", {
                params: {
                    uID: this.$store.state.userInfo.uid,
                    statue: 2,
                }
            }).then(res => {
                console.log('res:', res)
                this.yesterdayPrice = res.data.data || 0
            })

            axios.get("http://localhost:8081/order/getYesterdayCount", {
                params: {
                    uID: this.$store.state.userInfo.uid,
                    statue: 2,
                }
            }).then(res => {
                this.yesterdayCount = res.data.data || 0
            })
        },
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
                            interval: 3, // 设置刻度间隔，0表示所有刻度都显示
                            rotate: 0, // 设置刻度文字旋转角度
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
                        bottom: "10%",
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
            axios.get("http://localhost:8081/order/getStatistics").then(res => {
                // 将获取到的值赋给StatisicDate
                this.StatisicData = res.data.data

                // x轴修改前存放的值，前30天的日期
                const dateList = [];
                // 获取前30天的日期
                const currentDate = new Date();
                for (let i = 0; i < 30; i++) {
                    const date = new Date(currentDate);
                    date.setDate(date.getDate() - i);
                    dateList.unshift(`0${date.getMonth() + 1}/${date.getDate()}`);
                }

                // 将对应的日期中的金额赋值，新的x轴
                const formattedData = dateList.map(date => {
                    const dataItem = this.StatisicData.find(item => {
                        return item.formattedTime === date
                    });
                    return {
                        date: date,
                        amount: dataItem ? dataItem.price : 0
                    };
                });

                // 使用x轴的规则
                this.datePoints.unshift(...formattedData)
                this.renderLineChart() // 渲染折线图，并传入日期数组
            })
        }
    },
    mounted() {
        this.init()
        this.renderData();
        this.lineChart = echarts.init(this.$refs.lineChart); // 初始化echarts实例
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
                width: 148px;
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
