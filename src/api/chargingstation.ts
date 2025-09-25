import { post } from "@/utils/http";
import type { RowType } from "@/types/station";

const Api = {
    List: '/stationList',
    Edit: '/stationList/edit'
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

const EditApi = (data: RowType) => {
    return post(Api.Edit, data)
}

export { listApi, EditApi }