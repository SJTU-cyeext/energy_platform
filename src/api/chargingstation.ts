import { post } from "@/utils/http";

const Api = {
    List: '/stationList'
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

export { listApi }