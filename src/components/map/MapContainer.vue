<template>
    <div id="container">

    </div>
</template>

<script setup lang="ts">
    import AMapLoader from '@amap/amap-jsapi-loader';
    import { onMounted, ref, onUnmounted } from 'vue';
    import { mapListApi } from '@/api/map';
    import icon from '@/assets/flashIcon.png'
    import station from '@/assets/station.jpg'

    let map: any = null  // 初始化地图实例
    const markersData = ref<any>([])

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
            })

            // 添加信息窗体
            const infoWindow = new AMap.InfoWindow({
                offset: new AMap.Pixel(16, -45)
            })

            // 添加自定义标记
            mapListApi().then(({ data }) => { // 解构赋值拿出res里的data
                markersData.value = data
                markersData.value.forEach((markerData: any) => {
                    const marker = new AMap.Marker({
                        position: markerData.position,
                        icon: icon, //添加 icon 图标 URL
                        // title: "北京",
                    })
                    // 为marker添加点击事件
                    marker.on("click", () => {
                        infoWindow.setContent(`
                            <div di style="display: flex; align-items: center";>
                                <div>
                                    <img src="${station}" width="200px" />
                                </div>        
                                <div style="width:180px; line-height:30px; margin-left: 20px;">
                                    <h3>${markerData.title}</h3>
                                    <p>充电桩数量: ${markerData.count}</p>
                                    <p>充电站桩体: <span style="color: blue">${(markerData.status === 1) ? "使用中" : "维护中"}</span></p>
                                </div>        
                            </div>
                        `)
                        infoWindow.open(map, marker.getPosition())  
                    })
                    map.add(marker)
                })
            })

        }).catch((e) => {
            console.log(e);
        });
    })

    onUnmounted(() => {
        map?.destroy()  // 卸载时销毁地图
    })

</script>

<style lang="less" scoped>
    #container {
        width: 100%;
        height: 80vh;
    }
</style>