<template>
  <div id="app">
    <button @click="selectPic">选择图片</button>
    <span class="vux-close" style="color:red;"></span>
    <loading :show="show1" text="Loading"></loading>
    <alert v-model="show" :title="'你吃饭了吗？'"> {{ '还没啊~' }}</alert>
  </div>
</template>

<script>
import { Loading,Alert } from 'vux'
export default {
  name: 'App',
  components: {
    Loading,
    Alert
  },
  data() {
    return {
      show1: false,
      show: ''
    }
  },
  mounted() {
    let url = `https://zhulijun.club/wx/sign`
    this.axios(url, { params:{ url: location.href } })
      .then(({data: { data }}) => {
        let {appId, timestamp, nonceStr, signature} = data
        wx.config({
            debug: true, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
            appId, // 必填，公众号的唯一标识
            timestamp, // 必填，生成签名的时间戳
            nonceStr, // 必填，生成签名的随机串
            signature,// 必填，签名
            jsApiList: ['chooseImage'] // 必填，需要使用的JS接口列表
        })
      })
  },
  methods: {
    selectPic() {
      wx.ready(() => {
        wx.chooseImage({
        count: 1, // 默认9
        sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
        sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
        success: function (res) {
          var localIds = res.localIds; // 返回选定照片的本地ID列表，localId可以作为img标签的src属性显示图片
        }
        })
      })
    }
  },
}
</script>

<style lang='less'>
@import '~vux/src/styles/1px.less'; // 1px方案，项目的App.vue引入，组件内不需要再重复引入
@import '~vux/src/styles/close.less'; // 项目的App.vue引入，组件内不需要再重复引入
#app {
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
