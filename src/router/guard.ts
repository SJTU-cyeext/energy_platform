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
        // 数组的some方法, 用于检测数组中是否至少有一个元素满足指定的测试函数
        // 数组的includes方法, 用于判断数组中是否存在指定的元素
        if (to.meta?.needAuth && !authStore.roles.some((role: string) => (to.meta.needAuth as string[]).includes(role))) {
            return '/'
        }
    }
})

/*
权限控制两种主流思路:
    1. 前端默认不创建完整路由表, 后端会给我们返回权限的名称, 前端路由表文件中的每个路由写明该路由需要的权限名称, addRoute动态创建路由
    2. 前段默认创建完整路由表, 后端会给我们返回权限的名称, 路由表文件中可以设置meta, 用来写明该页面是否需要权限访问，以及需要哪种权限

*/