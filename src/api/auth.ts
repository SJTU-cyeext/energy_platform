import { post } from "@/utils/http";

const Api = {
    Login: "/login"
}

interface loginParams {
    username: string,
    password: string
}

const loginApi = (data: loginParams): Promise<any> => {
    return post(Api.Login, data)
}

export { loginApi }