<template>
    <div id="priceTrend">
        <div ref="lineChart" style="width: 100%; height: 300px"></div>
    </div>
</template>

<script>
import axios from 'axios';

import * as echarts from 'echarts';
export default {
    name: "priceTrend",
    components: {},
    props: ["goodsInfo"],
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
            axios.get("http://localhost:8081/sell/getOkData", {
                params: {
                    gID: this.goodsInfo[0].gid
                }
            }).then(res => {
                // 将获取到的值赋给StatisicDate
                this.StatisicData = res.data.data
                console.log('', this.StatisicData)

                // x轴修改前存放的值，前30天的日期
                const dateList = [];
                // 获取前30天的日期
                const currentDate = new Date();
                for (let i = 0; i < 30; i++) {
                    const date = new Date(currentDate);
                    date.setDate(date.getDate() - i);
                    dateList.unshift(`0${date.getMonth() + 1}-${date.getDate()}`);
                }

                // 将对应的日期中的金额赋值，新的x轴
                const formattedData = dateList.map(date => {
                    const dataItem = this.StatisicData.find(item => {
                        return item.sellingTime.split(' ')[0].slice(-5) === date
                    });
                    return {
                        date: date,
                        amount: dataItem ? dataItem.price : 0
                    };
                });

                console.log('formattedData', formattedData)

                // 使用x轴的规则
                this.datePoints.unshift(...formattedData)
                this.renderLineChart() // 渲染折线图，并传入日期数组
            })
        }
    },
    mounted() {
        this.renderData();
        this.lineChart = echarts.init(this.$refs.lineChart); // 初始化echarts实例
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