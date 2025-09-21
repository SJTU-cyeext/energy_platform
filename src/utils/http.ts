import service from "./axios";

interface responseData {
    code: number,
    data: any,
    message: string
}

const get = (url: string, params?: any): Promise<responseData> => {
    return service.get(url, { params })
}

const post = (url: string, data?: any): Promise<responseData> => {
    return service.post(url, data)
}

export { get, post }