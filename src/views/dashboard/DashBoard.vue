<template>
    <el-row>
        <el-col :span="18">
            <el-card>
                <div class="title">
                    <h3>今日设备运行状态</h3>
                    <p class="ml">更新时间: 2025年9月23日</p>
                    <el-icon color="#86909c" style="margin-left: 5px;">
                        <Refresh />
                    </el-icon>
                </div>
                <div class="equipment">
                    <div class="item">
                        <h4 class="mt mb">充电桩使用率</h4>
                        <img :src="flash" alt="" class="mt mb">
                        <h1 class="mb">2263/3398</h1>

                        <div class="statistic-card">
                            <el-statistic :value="9">
                                <template #title>
                                    <div style="display: inline-flex; align-items: center">
                                        异常设备
                                        <el-tooltip effect="dark" content="当前有9台设备异常，请尽快处理" placement="top">
                                            <el-icon style="margin-left: 4px" :size="12">
                                                <Warning />
                                            </el-icon>
                                        </el-tooltip>
                                    </div>
                                </template>
                            </el-statistic>
                            <div class="statistic-footer">
                                <div class="footer-item">
                                    <span>相较昨日</span>
                                    <span class="green">
                                        24%
                                        <el-icon color="red">
                                            <CaretTop />
                                        </el-icon>
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="item">
                        <h4 class="mt mb">充电柜使用率</h4>
                        <img :src="flash2" alt="" class="mt mb">
                        <h1 class="mb">665/1223</h1>
                        <div class="statistic-card">
                            <el-statistic :value="22">
                                <template #title>
                                    <div style="display: inline-flex; align-items: center">
                                        异常设备
                                        <el-tooltip effect="dark" content="当前有22台设备异常，请尽快处理" placement="top">
                                            <el-icon style="margin-left: 4px" :size="12">
                                                <Warning />
                                            </el-icon>
                                        </el-tooltip>
                                    </div>
                                </template>
                            </el-statistic>
                            <div class="statistic-footer">
                                <div class="footer-item">
                                    <span>相较昨日</span>
                                    <span class="green">
                                        24%
                                        <el-icon color="green">
                                            <CaretBottom />
                                        </el-icon>
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="item">
                        <h4 class="mt mb">充电站使用率</h4>
                        <img :src="flash3" alt="" class="mt mb">
                        <h1 class="mb">72/95</h1>
                        <div class="statistic-card">
                            <el-statistic :value="47">
                                <template #title>
                                    <div style="display: inline-flex; align-items: center">
                                        异常设备
                                        <el-tooltip effect="dark" content="当前有47台设备异常，请尽快处理" placement="top">
                                            <el-icon style="margin-left: 4px" :size="12">
                                                <Warning />
                                            </el-icon>
                                        </el-tooltip>
                                    </div>
                                </template>
                            </el-statistic>
                            <div class="statistic-footer">
                                <div class="footer-item">
                                    <span>相较昨日</span>
                                    <span class="green">
                                        14%
                                        <el-icon color="red">
                                            <CaretTop />
                                        </el-icon>
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </el-card>

            <el-card class="mt">
                <template #header>
                    <div class="card-header">
                        <span>常用功能</span>
                    </div>
                </template>

                <div class="quick mt mb">
                    <el-row>
                        <el-col :span="4">
                            <img :src="repair">
                            <p>设备维修</p>
                        </el-col>
                        <el-col :span="4">
                            <img :src="daily">
                            <p>每日日报</p>
                        </el-col>
                        <el-col :span="4">
                            <img :src="progress">
                            <p>任务进度</p>
                        </el-col>
                        <el-col :span="4">
                            <img :src="total">
                            <p>营收占比</p>
                        </el-col>
                        <el-col :span="4">
                            <img :src="money">
                            <p>营收统计</p>
                        </el-col>
                        <el-col :span="4">
                            <img :src="remain">
                            <p>代办事项</p>
                        </el-col>
                    </el-row>
                </div>
            </el-card>

            <el-card class="mt">
                <template #header>
                    <div class="card-header">
                        <span>能源统计</span>
                    </div>
                </template>
                <el-row>
                    <el-col :span="6">
                        <div ref="chartRef2" style="width: 100%; height: 400px;"></div>
                    </el-col>
                    <el-col :span="18">
                        <div ref="chartRef" style="width: 100%; height: 400px;"></div>
                    </el-col>
                </el-row>
            </el-card>
        </el-col>
        <el-col :span="6"></el-col>
    </el-row>
</template>

<script setup lang="ts">
    import flash from '@/assets/flash.png'
    import flash2 from '@/assets/flash2.png'
    import flash3 from '@/assets/flash3.png'

    import repair from "@/assets/repair.png"
    import progress from "@/assets/progress.png"
    import remain from "@/assets/remain.png"
    import total from "@/assets/total.png"
    import money from "@/assets/money.png"
    import daily from "@/assets/daily.png"
    import { CaretBottom } from '@element-plus/icons-vue';

    import * as echarts from 'echarts';
    import { ref, onMounted } from 'vue'

    const chartRef = ref(null)
    const chartRef2 = ref(null)

    onMounted(() => {

        // 基于准备好的dom，初始化echarts实例
        var myChart = echarts.init(chartRef.value);
        // 绘制图表
        myChart.setOption({
            xAxis: {
                type: 'category',
                data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
            },
            yAxis: {
                type: 'value'
            },
            series: [
                {
                    data: [150, 230, 224, 218, 135, 147, 260],
                    type: 'line',
                    smooth: true
                }
            ]
        });
    })

</script>

<style scoped>
    .title {
        display: flex;
        font-size: 20px;
        font-weight: bold;
        text-align: center;
        align-items: flex-end;
        margin-bottom: 20px;

        p {
            color: #86909c;
        }
    }

    .equipment {
        display: flex;
        justify-content: space-between;
        padding: 0 50px;

        .item {
            h1 {
                font-size: 36px;
            }

            ::v-deep .el-statistic__content {
                margin-top: 10px;
                margin-bottom: 10px;
            }
        }
    }

    .quick {
        margin-top: 30px;
        text-align: center;

        p {
            margin-top: 10px;
            color: #333;
        }
    }
</style>