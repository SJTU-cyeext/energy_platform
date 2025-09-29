import { post } from '@/utils/http'

const Api = {
    BatchDelete: '/batchDelete'
}

const batchDeleteApi = (order: string[]) => {
    return post(Api.BatchDelete, { order })
}

export { batchDeleteApi }