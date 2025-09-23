<template>
    <el-tabs v-model="currentTab.name" class="demo-tabs" @tab-click="handleClick" type="card" closable
        @tab-remove="remove">
        <el-tab-pane v-for="tab in tabs" :key="tab.name" :label="tab.name" :name="tab.name">
            <template #label>
                <span class="custom-tabs-label">
                    <el-icon>
                        <component :is="tab.icon"></component>
                    </el-icon>
                    <span>&nbsp; {{ tab.name }}</span>
                </span>
            </template>
        </el-tab-pane>
    </el-tabs>
    <RouterView></RouterView>
</template>

<script setup lang="ts">
    import type { TabPaneName } from 'element-plus'
    import { useTabStore } from '@/store/tabs';
    import { storeToRefs } from 'pinia';
    import { useRouter, useRoute } from 'vue-router'
    import type { MenuItem } from '@/types/auth';
    import useAuthStore from '@/store/auth';

    const authStore = useAuthStore()
    const { menu } = storeToRefs(authStore)
    const tabStore = useTabStore()
    const router = useRouter()
    const route = useRoute()

    const { tabs, currentTab } = storeToRefs(tabStore)
    const { addTab, setCurrentTab } = tabStore

    // 刷新后不会引起url变化, 据此可以根据url拿到当前选中的menu
    const findObjectByUrl = (arr: MenuItem[], url: string): (MenuItem | null) => {
        for (const item of arr) {
            if (item.url === url) {
                return item
            }
            if (item.children) {
                const found = findObjectByUrl(item.children, url)
                if (found) {
                    return found
                }
            }
        }
        return null
    }

    const item = findObjectByUrl(menu.value, route.path)

    if (item) {
        const { name, url, icon } = item
        addTab(name, url, icon)
        setCurrentTab(name, url)
    }



    const handleClick = ({ index }: { index: number }) => {
        const tab = tabs?.value[index]
        if (!tab) {
            return
        }
        router.push(tab.url)
        setCurrentTab(tab.name, tab.url)  // 设置当前高亮
    }

    const remove = (name: TabPaneName) => {
        console.log(name);
    }
</script>

<style lang="less" scoped>
    .demo-tabs {
        ::v-deep .is-active {
            background-color: rgb(34, 136, 255) !important;
            color: #fff;
        }
    }
</style>