import { post, get } from '@/utils/http'

const Api = {
    MapList: '/mapList'
}

const mapListApi = () => {
    return post(Api.MapList)
}

export { mapListApi }