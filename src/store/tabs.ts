import { defineStore } from "pinia";
import { ref } from 'vue'
import type { MenuItem } from '@/types/auth'

export const useTabStore = defineStore('tabs', () => {
    const tabs = ref<MenuItem[]>([])
    const currentTab = ref<{ name: string, url: string }>({ name: '', url: '' })
    const addTab = (name: string, url: string, icon: string) => {
        if (!tabs.value.some((tab) => tab.url === url)) {
            tabs.value.push({ name, url, icon })
        }
    }

    const setCurrentTab = (name: string, url: string) => {
        currentTab.value = { name, url }
        console.log(currentTab.value)
    }

    const removeTab = (name: string) => {
        if (name === currentTab.value.name) {
            const currentIndex = tabs.value.findIndex(tab => tab.name === name)
            if (currentIndex === 0) {
                return
            }
            const prev = tabs.value[currentIndex - 1]
            if (prev) {
                currentTab.value = { name: prev.name, url: prev.url }
            }

        }
        tabs.value = tabs.value.filter(tab => tab.name !== name)
    }
    return { tabs, addTab, currentTab, setCurrentTab, removeTab }
})