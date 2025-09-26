import { post, get } from "@/utils/http";
import type { RowType } from "@/types/station";

const Api = {
    List: '/stationList',
    Edit: '/stationList/edit',
    Delete: '/stationList/delete',
    Revenue: '/revenueChart',
    RevenueList: '/revenueList'
}

interface ListType {
    page: number
    pageSize: number
    name?: string
    id?: number
    status: number
}

interface RevenueListType {
    page: number,
    pageSize: number,
    name?: string
}

const listApi = (data: ListType) => {
    return post(Api.List, data)
}

const editApi = (data: RowType) => {
    return post(Api.Edit, data)
}

const deleteApi = (id: string) => {
    return post(Api.Delete, { id })
}

const revenueChartApi = () => {
    return get(Api.Revenue)
}

const revenueListAPi = (data: RevenueListType) => {
    return post(Api.RevenueList, data)
}

export { listApi, editApi, deleteApi, revenueChartApi, revenueListAPi }