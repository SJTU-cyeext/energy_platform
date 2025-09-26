import { post, get } from "@/utils/http";
import type { RowType } from "@/types/station";

const Api = {
    List: '/stationList',
    Edit: '/stationList/edit',
    Delete: '/stationList/delete',
    Revenue: '/revenueChart'
}

interface ListType {
    page: number
    pageSize: number
    name?: string
    id?: number
    status: number
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

const RevenueApi = () => {
    return get(Api.Revenue)
}

export { listApi, editApi, deleteApi, RevenueApi }