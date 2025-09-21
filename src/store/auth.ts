import { defineStore } from "pinia";
import { loginApi } from "@/api/auth";

interface loginParams {
    username: string,
    password: string
}
const useAuthStore = defineStore("auth", {
    state: () => ({
        token: sessionStorage.getItem("token") || '',
        roles: sessionStorage.getItem("roles") ? JSON.parse(sessionStorage.getItem("roles")!) : [],// 非空断言
        username: sessionStorage.getItem("username") || '',
        menu: sessionStorage.getItem("menu") ? JSON.parse(sessionStorage.getItem("menu")!) : []
    }),
    actions: {
        async login(data: loginParams, router: any) {
            try {
                const { data: { token, user: { username, roles }, menulist } } = await loginApi(data)
                this.token = token
                this.roles = roles
                this.username = username
                this.menu = menulist
                sessionStorage.setItem("token", token)
                sessionStorage.setItem("roles", JSON.stringify(roles))
                sessionStorage.setItem("username", username)
                sessionStorage.setItem("menu", JSON.stringify(menulist))
                router.push('/')
            } catch (error) {
                console.log(error);
            }
        }
    }
})

export default useAuthStore