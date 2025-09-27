<template>
    <el-card>
        <el-select filterable placeholder="请选择" style="width: 240px" v-model="value">
            <el-option v-for="item in options" :key="item.id" :label="item.name" :value="item.id" />
        </el-select>
    </el-card>
    <el-card class="mt">
        <el-radio-group size="large" v-model="radio" @change="handleChange">
            <el-radio-button :label="`全部(${dataList.length})`" :value="0" />
            <el-radio-button :label="`空闲中(${checkCount(1)})`" :value="1" />
            <el-radio-button :label="`充电中(${checkCount(2)})`" :value="2" />
            <el-radio-button :label="`连接中(${checkCount(3)})`" :value="3" />
            <el-radio-button :label="`排队中(${checkCount(4)})`" :value="4" />
            <el-radio-button :label="`已预约(${checkCount(5)})`" :value="5" />
            <el-radio-button :label="`故障/离线(${checkCount(6)})`" :value="6" />
        </el-radio-group>
    </el-card>
    <el-card class="mt">
        <el-row :gutter="20">
            <el-col :span="6" v-for="item in dataListCopy" :key="item.id">
                <div class="item">
                    <div class="pic">
                        <p v-if="item.status === 1">空闲中</p>
                        <p v-else-if="item.status === 2">充电中</p>
                        <p v-else-if="item.status === 3">连接中</p>
                        <p v-else-if="item.status === 4">排队中</p>
                        <p v-else-if="item.status === 5">已预约</p>
                        <p v-else-if="item.status === 6">故障/离线</p>
                        <img :src="(item.status === 1) ? free : ((item.status === 6) ? outline : ing)" width="100px">
                        <p v-if="item.status === 2">{{ item.percent }}</p>
                        <p v-else>0%</p>
                    </div>
                    <div class="info">
                        <h3>CD1002</h3>
                        <hr class="mb">
                        <p>电压: {{ item.voltage }}</p>
                        <p>电流: {{ item.current }}</p>
                        <p>功率: {{ item.power }}</p>
                        <p>温度: {{ item.tem }}</p>
                    </div>
                </div>
                <div class="btn">
                    <div class="divider"></div>
                    <div>
                        <p class="fl ml" style="font-size: 12px; color: #999;">暂无预计</p>
                        <div class="fr">
                            <el-button size="small">维保记录</el-button>
                            <el-button size="small" type="primary" class="mr">使用记录</el-button>
                        </div>
                    </div>
                </div>
            </el-col>
        </el-row>
    </el-card>
    <el-card class="mt">

    </el-card>
</template>

<script setup lang="ts">
    import free from '@/assets/free.png'
    import outline from '@/assets/outline.png'
    import ing from '@/assets/ing.png'

    import { pileListApi } from '@/api/chargingstation';
    import { onMounted } from 'vue';
    import { ref } from 'vue'

    const value = ref<string>('')  // 默认显示第一条充电站的名称

    const radio = ref<number>(0)  // 默认选择全部

    const options = ref<any>([])

    const dataList = ref<any>([])  // 服务端传来的原始数据
    const dataListCopy = ref<any>([])  // 用于筛选与页面渲染的数据

    const loadData = async () => {  // 默认展示第一条数据
        try {
            const { data } = await pileListApi()
            options.value = data
            value.value = data[0].id
            dataList.value = data[0].list
            dataListCopy.value = data[0].list
        } catch (e) {
            console.log(e)
        }
    }

    onMounted(() => {
        loadData()
    })


    const checkCount = (val: number) => {
        return dataList.value.filter((item: any) => item.status === val).length
    }

    const handleChange = () => {
        if (radio.value != 0) {
            dataListCopy.value = dataList.value.filter((item: any) => item.status === radio.value)
        }
    }
</script>

<style lang="less" scoped>
    .item {
        display: flex;
        justify-content: center;
        align-items: center;
        height: 200px;
        background-color: rgb(247, 251, 254);
        padding: 20px;
        border-radius: 10px 10px 0 0;
        margin-top: 20px;

        .pic {
            p {
                width: 76px;
                text-align: center;
                margin-bottom: 10px;
                color: rgb(61, 187, 146)
            }
        }

        .info {
            color: #999;
            margin-left: 30px;
            line-height: 26px;
            margin-top: -10px;
        }

    }

    .btn {
        width: 100%;
        height: 50px;
        line-height: 50px;
        background-color: #f7fbfe;

        .divider {
            background-color: #f4f4f4;
            height: 2px;
            width: 95%;
            margin: auto;
        }
    }
</style>