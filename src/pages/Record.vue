<template>
    <div class="choose-image">
		<x-button style="margin-top:20px;" :gradients="['#FF2719', '#FF61AD']" @click.native="startRecord">开始录音</x-button>
		<x-button style="margin-top:20px;" :gradients="['#FF2719', '#FF61AD']" @click.native="stopRecord">停止录音</x-button>
		<x-button style="margin-top:20px;" :gradients="['#FF2719', '#FF61AD']" @click.native="playRecord">播放录音</x-button>
		<x-button style="margin-top:20px;" :gradients="['#FF2719', '#FF61AD']" @click.native="stopVoice">停止播放</x-button>
    </div>
</template>

<script>
export default {
    name: 'Record',
    data() {
        return {
            localId: null
        }
    },
    methods: {
        startRecord() {
            wx.startRecord()
        },
        stopRecord() {
            console.log(111)
            wx.stopRecord({
                success: (res) => {
                    this.localId = res.localId
                },
                fail: (res) => {
                    console.log(res)
                }
            })
        },
        playRecord() {
            wx.playVoice({
                localId: this.localId // 需要播放的音频的本地ID，由stopRecord接口获得
            })
        },
        stopVoice() {
            wx.stopVoice({
                localId: this.localId // 需要播放的音频的本地ID，由stopRecord接口获得
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
