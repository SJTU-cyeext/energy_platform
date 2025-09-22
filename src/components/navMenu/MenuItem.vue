<template>
    <el-sub-menu v-if="item.children" :index="item.url">
        <template #title>
            <el-icon>
                <!-- 根据图标组件的名称动态渲染图标组件 -->
                <component :is="item.icon"></component>
            </el-icon>
            <span>{{ item.name }}</span>
        </template>
        <my-menu v-for="child in item.children" :key="child.url" :item="child"></my-menu>
    </el-sub-menu>
    <!-- 订单详情不应该在侧边栏菜单中显示 -->
    <el-menu-item v-else :index="item.url" v-show="!(item.name == '订单详情')" @click="add(item.name, item.url, item.icon)">
        <el-icon>
            <component :is="item.icon"></component>
        </el-icon>
        <span>{{ item.name }}</span>
    </el-menu-item>
</template>

<script lang="ts">
    import { defineComponent } from 'vue';
    import type { MenuItem as MenuItemType } from '@/types/auth'
    import type { PropType } from 'vue'
    import { useTabStore } from '@/store/tabs.ts'
    import { storeToRefs } from 'pinia';

    export default defineComponent({
        name: "myMenu", // 组件递归调用自己时必须有name作为唯一标识
        props: {
            item: {
                type: Object as PropType<MenuItemType>,  // 参考官方文档/TS与组合式API/为组件的props标注类型
                required: true
            }
        },
        setup() {
            const tabStore = useTabStore()
            const { tabs } = storeToRefs(tabStore)
            const { addTab } = tabStore
            const add = (name: string, url: string, icon: string) => {
                addTab(name, url, icon)
            }
            return { add }
        }
    })
</script>

<style lang="less" scoped>
    .is-active {
        background-color: rgb(34, 136, 255);
        color: white !important;

        div {
            span {
                color: white
            }
        }
    }

    .el-menu-item:hover {
        background-color: rgb(34, 136, 255) !important;
        color: white !important;
    }

    ::v-deep .el-sub-menu__title:hover {
        background-color: rgb(34, 136, 255) !important;
        color: white !important;
    }
</style>