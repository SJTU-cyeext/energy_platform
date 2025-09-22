<template>
    <el-tabs v-model="activeName" class="demo-tabs" @tab-click="handleClick" type="card" closable @tab-remove="remove">
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
    import { ref } from 'vue';
    import type { TabsPaneContext, TabPaneName } from 'element-plus'
    import { useTabStore } from '@/store/tabs';
    import { storeToRefs } from 'pinia';

    const tabStore = useTabStore()
    const { tabs } = storeToRefs(tabStore)
    const { addTab } = tabStore
    console.log(tabs.value)

    const activeName = ref('first')

    const handleClick = (tab: TabsPaneContext, event: Event) => {
        console.log(tab, event)
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