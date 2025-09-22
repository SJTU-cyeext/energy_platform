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
    import { useRouter } from 'vue-router'

    const tabStore = useTabStore()
    const router = useRouter()
    const { tabs, currentTab } = storeToRefs(tabStore)
    const { setCurrentTab } = tabStore

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