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
            <div ref="chartRef" style="width: 100%; height: 300px;"></div>
        </el-card>

        <el-card class="mt">
            <el-input v-model.trim="name" placeholder="请输入站点名称" style="max-width: 400px;">
                <template #append>
                    <el-button icon="Search" @click="loadData" />
                </template>
            </el-input>
            <el-table :data="tableData" style="width: 100%;" v-loading="loading">
                <el-table-column type="index" label="序号" width="80" />
                <el-table-column prop="name" label="站点名称" />
                <el-table-column prop="id" label="站点ID" />
                <el-table-column prop="city" label="所属城市" />
                <el-table-column prop="count" label="充电桩总数 (个)" />
                <el-table-column prop="day" label="单日总收入 (元)" sortable>
                    <template #default="scope">
                        <span class="mr">{{ scope.row.day }}</span>
                        <el-tag v-if="scope.row.percent > 0" type="danger">+{{ scope.row.percent }}%</el-tag>
                        <el-tag v-else type="success">{{ scope.row.percent }}%</el-tag>
                    </template>
                </el-table-column>
                <el-table-column prop="month" label="月度总收入 (万元)" sortable>
                    <template #default="scope">
                        <span class="mr">{{ scope.row.month }}</span>
                        <el-tag v-if="scope.row.mpercent > 0" type="danger">+{{ scope.row.mpercent }}%</el-tag>
                        <el-tag v-else type="success">{{ scope.row.mpercent }}%</el-tag>
                    </template>
                </el-table-column>
                <el-table-column prop="electricity" label="电费营收 (元)" />
                <el-table-column prop="parkingFee" label="停车费营收 (元)" />
                <el-table-column prop="serviceFee" label="服务费营收 (元)" />
                <el-table-column prop="member" label="会员储值金 (元)" />
            </el-table>
            <el-pagination class="fr mt mb" v-model:current-page="pageInfo.page" v-model:page-size="pageInfo.pageSize"
                :page-sizes="[10, 20, 30, 40]" background layout="total, sizes, prev, pager, next, jumper"
                :total="totals" @size-change="handleSizeChange" @current-change="handleCurrentChange" />
        </el-card>
    </div>
</template>

<script setup lang="ts">
    import formatNumberToThousands from '@/utils/toThousands';
    import { onMounted, reactive, ref } from 'vue';
    import { revenueChartApi, revenueListAPi } from '@/api/chargingstation';
    import { useChart } from '@/hooks/useChart.ts'
    import { usePagination } from '@/hooks/usePagination.ts'

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
        try {
            const res = await revenueChartApi()
            chartOptions.legend.data = res.data.list.map((item: any) => item.name)
            res.data.list.forEach((item: any, idx: number) => {
                chartOptions.series[idx].name = item.name
                chartOptions.series[idx].data = item.data
            });
        } catch (e) {
            console.error(e)
        }

        return chartOptions
    }
    useChart(chartRef, setChartData)

    const tableData = ref([])
    const loading = ref<boolean>(false)
    const name = ref('')

    const loadData = async () => {
        loading.value = true
        try {
            let { data: { list, total } } = await revenueListAPi({ ...pageInfo, name: name.value })
            list = list.map((item: any) => {
                return {
                    ...item,
                    day: item.electricity + item.parkingFee + item.serviceFee + item.member
                }
            })
            tableData.value = list
            setTotals(total)
            loading.value = false
        } catch (e) {
            console.log(e)
        }
    }
    onMounted(() => {
        loadData()
    })

    const { pageInfo, handleSizeChange, handleCurrentChange, totals, setTotals } = usePagination(loadData)


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