import { defineStore } from "pinia";

const useAuthStore = defineStore("auth", {
    state: () => ({
        token: null,
        roles: [],
        username: "",
        menu: [],
    }),
    actions: {
        
    }
})

export default useAuthStore