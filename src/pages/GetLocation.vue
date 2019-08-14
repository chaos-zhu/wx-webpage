<template>
    <div class="location">
		<x-button :gradients="['#c46156', '#56b9c4']" @click.native="openMap">微信内置地图</x-button>
		<x-button :gradients="['#c46156', '#56b9c4']" @click.native="getLocation">获取地理位置</x-button>
        <alert v-model="show" :title="'Tips'">
            <span style="color:red;"> <br><br>该功能依赖腾讯地图提供的api接口定位，可能存在定位差异<br><br><hr> </span> 
        </alert>
    </div>
</template>

<script>
export default {
    name: 'GetLocation',
    data() {
        return {
            localId: null,
            show: true
        }
    },
    methods: {
        openMap() {
            wx.openLocation({
                latitude: 39.9, // 纬度，浮点数，范围为90 ~ -90
                longitude: 116.4, // 经度，浮点数，范围为180 ~ -180。
                name: '北京市（可填写为公司名称）', // 位置名
                address: '北京市（可填写为公司地址，引导用户导航）', // 地址详情说明
                scale: 5, // 地图缩放级别,整形值,范围从1~28。默认为最大
                infoUrl: 'https://baidu.com' // 在查看位置界面底部显示的超链接,可点击跳转
            })
        },
        getLocation() {
            wx.getLocation({
                type: 'wgs84', // 默认为wgs84的gps坐标，如果要返回直接给openLocation用的火星坐标，可传入'gcj02'
                success: function (res) {
                    let latitude = res.latitude // 纬度，浮点数，范围为90 ~ -90
                    let longitude = res.longitude // 经度，浮点数，范围为180 ~ -180。
                    let speed = res.speed // 速度，以米/每秒计
                    let accuracy = res.accuracy // 位置精度
                    console.log(latitude,longitude,speed,accuracy)
                    let geocoder = new qq.maps.Geocoder({
                        complete: function(result){
                            alert('您的位置：'+result.detail.address);
                        }
                    })
                    var coord=new qq.maps.LatLng(latitude, longitude);
                    geocoder.getAddress(coord)
                }
            })
        }
    }
}
</script>

<style lang="less" scoped>
    .location{
        margin-top: 20px;
    }
</style>