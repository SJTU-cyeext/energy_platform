import { post } from "@/utils/http";
import type { RowType } from "@/types/station";

const Api = {
    List: '/stationList',
    Edit: '/stationList/edit',
    Delete: '/stationList/delete'
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

export { listApi, editApi, deleteApi }