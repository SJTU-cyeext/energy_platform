import type { Ref } from "vue"
import { onBeforeUnmount, onMounted, ref, markRaw } from 'vue'
import * as echarts from 'echarts'

const useChart = (chartRef: Ref<HTMLElement | null>, initialOptions: any) => {
    const chartInstance = ref<echarts.ECharts | null>(null)
    const chartOptions = ref(initialOptions)

    const initChart = () => {
        if (chartRef.value) {
            // Vue的响应式与echarts自带响应式冲突，取消Vue的响应式，否则resize窗口的时候会报错
            chartInstance.value = markRaw(echarts.init(chartRef.value))
            chartInstance.value.setOption(chartOptions.value)
        }
    }

    const resizeChart = () => {
        chartInstance.value?.resize()
    }

    onMounted(() => {
        initChart()
        window.addEventListener("resize", resizeChart)
    })

    onBeforeUnmount(() => {
        window.removeEventListener("resize", resizeChart)  // 卸载前移除resize事件监听，以防止内存泄露
        if (chartInstance.value) {
            chartInstance.value.dispose()  // 释放图表实例, echarts自带
        }
    })

}

export { useChart }