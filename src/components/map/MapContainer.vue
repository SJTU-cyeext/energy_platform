<template>
    <div id="container">

    </div>
</template>

<script setup lang="ts">
    import AMapLoader from '@amap/amap-jsapi-loader';
    import { onMounted } from 'vue';

    let map = null  // 初始化地图实例

    onMounted(() => {
        AMapLoader.load({
            key: "0d2c05aa023c47015fbf4f288463d977", // 申请好的Web端开发者Key，首次调用 load 时必填
            version: "1.4.15", // 指定要加载的 JSAPI 的版本，缺省时默认为 1.4.15
            plugins: [], //需要使用的的插件列表，如比例尺'AMap.Scale'，支持添加多个如：['...','...']
        }).then((AMap) => {
            map = new AMap.Map("container", {
                // 设置地图容器id
                viewMode: "3D", // 是否为3D地图模式
                zoom: 5, // 初始化地图缩放级别
                center: [116.397428, 39.90923], // 初始化地图中心点位置
            });
        }).catch((e) => {
            console.log(e);
        });
    })
</script>

<style lang="less" scoped>
    #container {
        width: 100%;
        height: 80vh;
    }
</style>