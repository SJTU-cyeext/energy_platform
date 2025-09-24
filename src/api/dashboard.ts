import { get } from '@/utils/http'

const Api = {
    ChartData: '/chartData',
    ChartData2: '/chartData2',
    ChartData3: '/chartData3',
}

const chartDataApi = () => get(Api.ChartData)

const chartDataApi2 = () => get(Api.ChartData2)

const chartDataApi3 = () => get(Api.ChartData3)
export { chartDataApi, chartDataApi2, chartDataApi3 }