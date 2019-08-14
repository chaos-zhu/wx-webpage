<template>
    <div class="choose-image">
		<x-button style="margin-top:20px;" :gradients="['#1D62F0', '#19D5FD']" @click.native="chooseImage">选取图片</x-button>
        <img v-for="item in localIds" :key="item" :src="item" alt="filed">
    </div>
</template>

<script>
export default {
    name: 'ChooseImage',
    data() {
        return {
            localIds: []
        }
    },
    methods: {
        // 选择图片
        chooseImage() {
            wx.ready(() => {
                wx.chooseImage({
                count: 3, // 默认9
                sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
                sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
                success: (res) => {
                    this.localIds = res.localIds; // 返回选定照片的本地ID列表，localId可以作为img标签的src属性显示图片
                }
                })
            })
        }
    }
}
</script>

<style lang="less">
    .choose-image{
        margin-top: 15px;
        img{
            width: 100%;
        }
    }
</style>
