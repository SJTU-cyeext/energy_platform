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
    </div>
</template>

<script setup lang="ts">
    import formatNumberToThousands from '@/utils/toThousands';
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