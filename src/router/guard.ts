import useAuthStore from "@/store/auth";
import router from ".";
router.beforeEach((to) => {
    const authStore = useAuthStore()
    const isLogin = authStore.token
    if (!isLogin) {
        // 未登录
        if (to.path != '/login') {
            return { path: '/login' }
        }
    } else {
        if (to.path === '/login') {
            return { path: '/' }
        }
    }
})