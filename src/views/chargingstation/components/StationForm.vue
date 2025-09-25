<template>
    <!-- 必须添加destroy-on-close以防出现编辑和新增切换时的弹窗错误信息残留的问题 -->
    <el-dialog :model-value="dialogVisible" :title="title" @close="handleClose" destroy-on-close>
        <el-form :model="ruleForm" :rules="rules" label-width="120px">

            <el-row>
                <el-col :span=12>
                    <el-form-item label="站点名称: " prop="name">
                        <el-input v-model="ruleForm.name"></el-input>
                    </el-form-item>
                    <el-form-item label="站点ID: " prop="id">
                        <el-input v-model="ruleForm.id" :disabled="disabled"></el-input>
                    </el-form-item>
                    <el-form-item label="所属城市: " prop="city">
                        <el-input v-model="ruleForm.city"></el-input>
                    </el-form-item>
                    <el-form-item label="站点负责人: " prop="person">
                        <el-input v-model="ruleForm.person"></el-input>
                    </el-form-item>
                    <el-form-item label="负责人电话: " prop="tel">
                        <el-input v-model="ruleForm.tel"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span=12>
                    <el-form-item label="快充数: " prop="fast">
                        <el-input v-model="ruleForm.fast"></el-input>
                    </el-form-item>
                    <el-form-item label="慢充数: " prop="slow">
                        <el-input v-model="ruleForm.slow"></el-input>
                    </el-form-item>
                    <el-form-item label="充电站状态: " prop="status">
                        <el-select v-model="ruleForm.status" :disabled="disabled">
                            <el-option label="全部" :value="1"></el-option>
                            <el-option label="使用中" :value="2"></el-option>
                            <el-option label="空闲中" :value="3"></el-option>
                            <el-option label="维护中" :value="4"></el-option>
                            <el-option label="待维修" :value="5"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="正在充电数: " prop="now">
                        <el-input v-model="ruleForm.now" :disabled="disabled"></el-input>
                    </el-form-item>
                    <el-form-item label="故障数: " prop="fault">
                        <el-input v-model="ruleForm.fault" :disabled="disabled"></el-input>
                    </el-form-item>
                </el-col>
            </el-row>
        </el-form>
        <template #footer>
            <div class="dialog-footer">
                <el-button @click="handleCancel">取消</el-button>
                <el-button type="primary">
                    确认
                </el-button>
            </div>
        </template>
    </el-dialog>
</template>

<script setup lang="ts">
    import { ref, watch } from 'vue'
    import type { RowType } from '@/types/station'
    import type { FormRules } from 'element-plus'
    import { useStationStore } from '@/store/station'
    import { storeToRefs } from 'pinia'

    const ruleForm = ref<RowType>({
        name: '',
        id: '',
        city: '',
        person: '',
        tel: '',
        fast: '',
        slow: '',
        status: 1,
        now: "",
        fault: ""
    })
    const rules = ref<FormRules<RowType>>({
        name: [
            { required: true, message: "站点名称不能为空", trigger: 'blur' }
        ],
        id: [
            { required: true, message: "站点ID不能为空", trigger: 'blur' }
        ],
        city: [
            { required: true, message: "所属城市不能为空", trigger: 'blur' }
        ],
        person: [
            { required: true, message: "站点负责人不能为空", trigger: 'blur' }
        ],
        tel: [
            { required: true, message: "负责人电话不能为空", trigger: 'blur' }
        ],
        fast: [
            { required: true, message: "快充数不能为空", trigger: 'blur' }
        ],
        slow: [
            { required: true, message: "慢充数不能为空", trigger: 'blur' }
        ],
        status: [
            { required: true, message: "充电站状态不能为空", trigger: 'blur' }
        ],
        now: [
            { required: true, message: "正在充电数不能为空", trigger: 'blur' }
        ],
        fault: [
            { required: true, message: "故障数不能为空", trigger: 'blur' }
        ],
    })

    const props = defineProps({
        dialogVisible: {
            // type: Boolean,
            required: true
        }
    })

    const emits = defineEmits(["close"])
    const handleCancel = () => {

        // props.dialogVisible = false  // 子组件无法直接更改父组件的数据
        emits("close")
    }

    // Dialog组件右上角自带的关闭按钮不会触发父组件的visible.value变为false, 会导致再次点击编辑不会弹出Dialog组件
    const handleClose = () => {
        emits("close")
    }

    const stationStore = useStationStore()
    const { rowData } = storeToRefs(stationStore)

    // 站点ID、充电状态、正在充电数和故障数都是不可编辑的
    const disabled = ref<boolean>(false)

    const title = ref<string>("")

    watch(() => props.dialogVisible, () => {  // 侦听弹窗, 一旦弹窗就出发修改ruleForm
        if (rowData.value.name) {  // 弹窗时有值表明是点了编辑
            title.value = "编辑充电站信息"
            disabled.value = true
        } else {
            title.value = "新增充电站信息"
            disabled.value = false
        }
        ruleForm.value = rowData.value
    })


</script>

<style scoped></style>