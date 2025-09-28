<template>
    <el-row :gutter="20">
        <el-col :span="18">
            <el-card>
                <MapContainer></MapContainer>
            </el-card>
        </el-col>
    </el-row>
</template>

<script setup lang="ts">
    import MapContainer from '@/components/map/MapContainer.vue';
</script>

<style scoped></style>