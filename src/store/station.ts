import { defineStore } from 'pinia'
import type { RowType } from '@/types/station'
import { ref } from 'vue'

export const useStationStore = defineStore("station", () => {
    const rowData = ref<RowType>({
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

    const setRowData = (data: RowType) => {
        console.log('data', data);

        rowData.value = data
    }
    return { rowData, setRowData }
})