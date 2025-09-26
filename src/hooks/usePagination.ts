import { reactive, ref } from 'vue'
const usePagination = (loadData: () => Promise<any>) => {
    const pageInfo = reactive({
        page: 1,
        pageSize: 10
    })
    const totals = ref(0)
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
        loadData()
    }

    const setTotals = (val: number) => {
        totals.value = val
    }

    return { pageInfo, handleSizeChange, handleCurrentChange, handleReset, totals, setTotals }
}

export { usePagination }