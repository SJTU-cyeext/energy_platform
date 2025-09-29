import { ref, onMounted, unref, reactive } from 'vue'
import { post } from '@/utils/http'

const useSearchTable = <T>(url: string, initialParams: any) => {
    const loading = ref<boolean>(false)  // 加载状态
    const tableData = ref<T[]>([])  // 表格数据
    const totals = ref<number>(0)  // 数据总数
    const pageInfo = reactive({  // 分页信息
        page: 1,
        pageSize: 10
    })
    const loadData = async () => {
        try {
            loading.value = true  // 加载数据前打开加载状态
            // 将查询与分页信息发给服务器，获取表格数据和数据总数
            const { data: { list, total } } = await post(url, { ...unref(initialParams), ...pageInfo })
            totals.value = total
            tableData.value = list
        } catch (error) {
            console.log(error)
        } finally {
            loading.value = false  //无论是否拿到数据，都要关闭记载状态
        }
    }
    const handleSizeChange = (val: number) => {
        pageInfo.pageSize = val
        loadData()
    }
    const handleCurrentChange = (val: number) => {
        pageInfo.page = val
        loadData()
    }

    const resetPagination = () => {
        pageInfo.page = 1
        pageInfo.pageSize = 10
        loadData()
    }

    onMounted(() => {
        loadData()
    })

    return { tableData, loading, loadData, handleSizeChange, handleCurrentChange, resetPagination, pageInfo, totals }
}

export default useSearchTable