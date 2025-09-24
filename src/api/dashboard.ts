import { get } from '@/utils/http'

const Api = {
    ChartData: '/chartData',
    ChartData2: '/chartData2',
}

const chartDataApi = () => get(Api.ChartData)

const chartDataApi2 = () => get(Api.ChartData2)
export { chartDataApi, chartDataApi2 }