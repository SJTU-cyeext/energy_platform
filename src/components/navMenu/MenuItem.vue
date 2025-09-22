<template>
    <el-sub-menu v-if="item.children" :index="item.url">
        <template #title>
            <el-icon>
                <location />
            </el-icon>
            <span>{{ item.name }}</span>
        </template>
        <my-menu v-for="child in item.children" :key="child.url" :item="child"></my-menu>
    </el-sub-menu>
    <el-menu-item v-else :index="item.url">
        <el-icon>
            <document />
        </el-icon>
        <span>{{ item.name }}</span>
    </el-menu-item>
</template>

<script lang="ts">
    import { defineComponent } from 'vue';
    import type { MenuItem as MenuItemType } from '@/types/auth'
    import type { PropType } from 'vue'

    export default defineComponent({
        name: "myMenu", // 组件递归调用自己时必须有name作为唯一标识
        props: {
            item: {
                type: Object as PropType<MenuItemType>,  // 参考官方文档/TS与组合式API/为组件的props标注类型
                required: true
            }
        }
    })
</script>
