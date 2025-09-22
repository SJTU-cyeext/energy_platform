<template>
    <el-menu>
        <menu-item v-for="item in menuItems" :item="item" :key="item.url"></menu-item>
    </el-menu>
</template>

<script setup lang="ts">
    import useAuthStore from '@/store/auth';
    import MenuItem from './MenuItem.vue';

    const authStore = useAuthStore()
    const menuItems = authStore.menu


</script>

<style scoped></style>