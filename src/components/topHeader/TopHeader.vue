<template>
    <div class="header">
        <div class="personal">
            <el-badge :is-dot="info > 0" class="item">
                <el-icon>
                    <Bell />
                </el-icon>
            </el-badge>
            <el-avatar src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png" class="ml mr" />
            <el-dropdown @command="handleCommand">
                <span class="el-dropdown-link">
                    欢迎你，{{ username }}
                    <el-icon class="el-icon--right">
                        <arrow-down />
                    </el-icon>
                </span>
                <template #dropdown>
                    <el-dropdown-menu>
                        <el-dropdown-item icon="User" command="user">个人中心</el-dropdown-item>
                        <el-dropdown-item icon="SwitchButton" command="logout">退出登录</el-dropdown-item>
                    </el-dropdown-menu>
                </template>
            </el-dropdown>
        </div>
    </div>
</template>

<script setup lang="ts">
    import useAuthStore from '@/store/auth';
    import { storeToRefs } from 'pinia';
    import { ref } from 'vue';
    import { useRouter } from 'vue-router';

    const authStore = useAuthStore()
    const { username } = storeToRefs(authStore)  // 保持响应式
    const info = ref(5)
    const router = useRouter()
    const handleCommand = (command: string) => {
        if (command === 'user') {
            router.push('personal')
        } else {
            authStore.logout()
            router.push('/login')
        }

    }
</script>

<style scoped>
    .header {
        background-color: white;
        height: 60px;
        padding: 0 20px;

        .personal {
            float: right;
            display: flex;
            height: 60px;
            align-items: center;

            .item {
                margin-top: 10px;
            }
        }
    }
</style>