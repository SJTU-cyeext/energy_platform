import { createRouter, createWebHistory } from "vue-router";
import routes from './basicRouteMap'



const router = createRouter({
    routes,
    history: createWebHistory()
})

export default router