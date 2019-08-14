<template>
  <div id="app">
    <router-view/>
    <router-link to="/" class="close">☝</router-link>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style lang='less'>
// 项目的App.vue引入，组件内不需要再重复引入
@import '~vux/src/styles/1px.less'; // 1px方案，项目的App.vue引入，组件内不需要再重复引入
@import '~vux/src/styles/close.less'; // 关闭图标主要应用于弹窗(dialog)关闭按钮以及弹窗(popup)头部的关闭按钮。
@import '~vux/src/styles/reset.less'; // 使用vux自带的reset.css清除默认样式
#app {
  height: 100%;
  width: 100%;
  .close{
    font-size: 25px;
    position: fixed;
    bottom: 15px;
    left: 10px;
  }
}
</style>
