<template>
    <div>
        <el-row :gutter="20">
            <el-col :span="4">
                <el-card>
                    <div class="title">
                        <div class="round">
                            <el-icon>
                                <Document />
                            </el-icon>
                        </div>
                        <h4>今日总收入（元）</h4>
                    </div>
                    <div class="total">
                        <h1>{{ formatNumberToThousands(341243.43) }}</h1>
                        <div class="percent" style="color: green;">
                            -17%
                        </div>
                    </div>
                </el-card>
            </el-col>
            <el-col :span="4">
                <el-card>
                    <div class="title">
                        <div class="round">
                            <el-icon>
                                <Document />
                            </el-icon>
                        </div>
                        <h4>本月总收入（万元）</h4>
                    </div>
                    <div class="total">
                        <h1>{{ 2924.00 }}</h1>
                        <div class="percent" style="color: green;">
                            -21%
                        </div>
                    </div>
                </el-card>
            </el-col>
            <el-col :span="4">
                <el-card>
                    <div class="title">
                        <div class="round">
                            <el-icon>
                                <Document />
                            </el-icon>
                        </div>
                        <h4>会员卡储值金额（元）</h4>
                    </div>
                    <div class="total">
                        <h1>239824</h1>
                        <div class="percent" style="color: green;">
                            -21%
                        </div>
                    </div>
                </el-card>
            </el-col>
            <el-col :span="4">
                <el-card>
                    <div class="title">
                        <div class="round">
                            <el-icon>
                                <Document />
                            </el-icon>
                        </div>
                        <h4>服务费总金额（元）</h4>
                    </div>
                    <div class="total mt">
                        <h1>{{ formatNumberToThousands(132492.34) }}</h1>
                        <div class="percent" style="color: green;">
                            -8%
                        </div>
                    </div>
                </el-card>
            </el-col>
            <el-col :span="4">
                <el-card>
                    <div class="title">
                        <div class="round">
                            <el-icon>
                                <Document />
                            </el-icon>
                        </div>
                        <h4>停车费总金额（元）</h4>
                    </div>
                    <div class="total">
                        <h1>{{ 43290.20 }}</h1>
                        <div class="percent" style="color: green;">
                            -4%
                        </div>
                    </div>
                </el-card>
            </el-col>
            <el-col :span="4">
                <el-card>
                    <div class="title">
                        <div class="round">
                            <el-icon>
                                <Document />
                            </el-icon>
                        </div>
                        <h4>电费总金额（元）</h4>
                    </div>
                    <div class="total">
                        <h1>{{ 4134953.78 }}</h1>
                        <div class="percent" style="color: green;">
                            -16%
                        </div>
                    </div>
                </el-card>
            </el-col>
        </el-row>
        <el-card class="mt">
            <div ref="chartRef" style="width: 100%; height: 300px;">

            </div>
        </el-card>
    </div>
</template>

<script setup lang="ts">
    import formatNumberToThousands from '@/utils/toThousands';
    import { reactive, ref } from 'vue';
    import { RevenueApi } from '@/api/chargingstation';
    import { useChart } from '@/hooks/useChart.ts'

    const chartRef = ref(null)
    const setChartData = async () => {
        const chartOptions = reactive({
            tooltip: {
                trigger: 'axis'
            },
            legend: {
                data: []
            },
            xAxis: {
                type: 'category',
                data: ['一月', '二月', '三月', '四月', '五月', '六月', '七月']
            },
            yAxis: [
                {
                    type: 'value',
                    name: '销售',
                    position: 'left'
                },
                {
                    type: 'value',
                    name: '访问量',
                    position: 'right'
                }
            ],
            series: [
                {
                    name: '',
                    type: 'bar',
                    data: [],
                    yAxisIndex: 0,
                    itemStyle: {
                        color: '#409eff'
                    }
                },
                {
                    name: '',
                    type: 'line',
                    data: [],
                    yAxisIndex: 1,
                    itemStyle: {
                        color: '#409eff'
                    },
                    smooth: true
                }
            ]
        })
        const res = await RevenueApi()
        chartOptions.legend.data = res.data.list.map((item: any) => item.name)
        for (let i = 0; i < res.data.list.length; i++) {
            chartOptions.series[i].name = res.data.list[i].name
            chartOptions.series[i].data = res.data.list[i].data
        }
        return chartOptions
    }
    useChart(chartRef, setChartData)



</script>

<style lang=less scoped>
    .title {
        display: flex;
        align-items: center;

        .round {
            width: 30px;
            height: 30px;
            border-radius: 50%;
            background-color: rgb(235, 236, 245);
            text-align: center;
            line-height: 30px;
            margin-right: 20px;
        }

        h4 {
            color: #666
        }
    }

    .total {
        display: flex;
        align-items: center;
        margin-top: 20px;

        h1 {
            font-size: 30px;
            margin-right: 20px;
        }

        .percent {
            display: inline-block;
            padding: 3px 5px;
            height: 20px;
            font-size: 12px;
            background-color: rgb(235, 247, 239);
            border-radius: 2px;
            line-height: 20px;
        }
    }
</style>