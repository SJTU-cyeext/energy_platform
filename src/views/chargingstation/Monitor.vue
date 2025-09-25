<template>
    <el-card>
        <el-row :gutter="20">
            <el-col :span="6">
                <el-input v-model.trim="formParams.input" placeholder="请输入站点名称、ID" style="max-width: 600px;"
                    class="input-with-select">
                    <template #append>
                        <el-select v-model="select" placeholder="" style="width: 115px">
                            <el-option label="按名称查询" value="name" />
                            <el-option label="按ID查询" value="id" />
                        </el-select>
                    </template>
                </el-input>
            </el-col>
            <el-col :span="6">
                <el-select placeholder="充电站状态" v-model="formParams.value">
                    <el-option label="全部" :value="1"></el-option>
                    <el-option label="使用中" :value="2"></el-option>
                    <el-option label="空闲中" :value="3"></el-option>
                    <el-option label="维护中" :value="4"></el-option>
                    <el-option label="待维修" :value="5"></el-option>
                </el-select>
            </el-col>
            <el-col :span="6">
                <el-button type="primary" @click="loadData">查询</el-button>
                <el-button @click="handleReset">重置</el-button>
            </el-col>
        </el-row>
    </el-card>
    <el-card class="mt">
        <el-row>
            <el-col :span="6">
                <el-statistic title="累计充电量(度)" :value="268900" />
            </el-col>
            <el-col :span="6">
                <el-statistic title="累计充电次数(次)" :value="1389" />
            </el-col>
            <el-col :span="6">
                <el-statistic title="服务区域(个)" :value="88" />
            </el-col>
            <el-col :span="6">
                <el-statistic title="累计效益(元)" :value="5622178" />
            </el-col>
        </el-row>
    </el-card>

    <el-card class="mt">
        <el-button type="primary" icon="Plus" @click="handleAdd">新增充电站</el-button>
    </el-card>

    <el-card class="mt">
        <!-- v-loaidng通过绑定布尔值控制元素是否出现遮罩层和加载动画 -->
        <el-table :data="tableData" style="width: 100%" v-loading="loading">
            <el-table-column type="index" label="序号" width="80" />
            <el-table-column prop="name" label="站点名称" />
            <el-table-column prop="id" label="站点ID" />
            <el-table-column prop="city" label="所属城市" />
            <el-table-column prop="fast" label="快充数" />
            <el-table-column prop="slow" label="慢充数" />
            <el-table-column label="充电站状态" prop="status">
                <!-- scope可以拿到整行数据 -->
                <template #default="scope">
                    <el-tag v-if="scope.row.status === 2" type="primary">使用中</el-tag>
                    <el-tag v-if="scope.row.status === 3" type="success">空闲中</el-tag>
                    <el-tag v-if="scope.row.status === 4" type="warning">维护中</el-tag>
                    <el-tag v-if="scope.row.status === 5" type="danger">待维修</el-tag>
                </template>
            </el-table-column>
            <el-table-column prop="now" label="正在充电" />
            <el-table-column prop="fault" label="故障数" />
            <el-table-column prop="person" label="站点负责人" />
            <el-table-column prop="tel" label="负责人电话" />
            <el-table-column label="操作">
                <template #default="scope">
                    <el-button type="primary" size="small" @click="edit(scope.row)">编辑</el-button>
                    <el-button type="danger" size="small">删除</el-button>
                </template>
            </el-table-column>
        </el-table>

        <el-pagination class="fr mt mb" v-model:current-page="pageInfo.page" v-model:page-size="pageInfo.pageSize"
            :page-sizes="[10, 20, 30, 40]" background layout="total, sizes, prev, pager, next, jumper" :total="totals"
            @size-change="handleSizeChange" @current-change="handleCurrentChange" />
    </el-card>

    <!-- HTML中驼峰式命名的属性要变为横线连接 -->
    <StationForm :dialog-visible="visible" @close="visible = false" />
</template>

<script setup lang="ts">
    import { onMounted, reactive, ref } from 'vue';
    import { listApi } from '@/api/chargingstation';
    import StationForm from './components/StationForm.vue';
    import type { RowType } from '@/types/station'
    import { useStationStore } from '@/store/station';

    const select = ref("name")
    const formParams = reactive({
        input: "",
        value: 1
    })

    const tableData = ref([])
    const totals = ref<number>(0)
    const pageInfo = reactive({
        page: 1,
        pageSize: 10
    })

    const loading = ref<boolean>(false)

    const loadData = async () => {
        loading.value = true  // 请求开始，打开加载
        // 1. 利用扩展运算符解包旧对象创建新的对象
        // 2. [变量]解决属性名可能是id也可能是name的问题
        const { data: { list, total } } = await listApi({ ...pageInfo, ...{ status: formParams.value, [select.value]: formParams.input } })
        loading.value = false // 请求完成关闭加载
        tableData.value = list
        totals.value = total
        console.log(tableData.value)
    }

    onMounted(() => {
        loadData()
    })

    const handleSizeChange = (val: number) => {
        pageInfo.pageSize = val
        loadData()
    }
    const handleCurrentChange = (val: number) => {
        pageInfo.page = val
        loadData()
    }

    const handleReset = () => {
        pageInfo.page = 1
        pageInfo.pageSize = 10
        formParams.input = ''
        formParams.value = 1
        loadData()
    }

    const visible = ref<boolean>(false)

    const stationStore = useStationStore()
    const { setRowData, resetRowData } = stationStore

    const edit = (row: RowType) => {
        setRowData(row)
        visible.value = true
    }

    const handleAdd = () => {
        resetRowData()
        visible.value = true
    }

</script>

<style scoped></style>