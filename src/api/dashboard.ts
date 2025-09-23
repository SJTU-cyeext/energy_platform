import { get } from '@/utils/http'

const Api = {
    ChartData: '/chartData'
}

const chartDataApi = () => get(Api.ChartData)

export { chartDataApi }