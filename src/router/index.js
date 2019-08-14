import Vue from 'vue'
import Router from 'vue-router'
import axios from '@/utils/axios'
// import Index from '@/pages/Index.vue'
// import GetUserInfo from '@/pages/GetUserInfo.vue'
// import ChooseImage from '@/pages/ChooseImage.vue'
// import Record from '@/pages/Record.vue'
// import GetLocation from '@/pages/GetLocation.vue'

const Index = () => import('@/pages/Index.vue')
const GetUserInfo = () => import('@/pages/GetUserInfo.vue')
const ChooseImage = () => import('@/pages/ChooseImage.vue')
const Record = () => import('@/pages/Record.vue')
const GetLocation = () => import('@/pages/GetLocation.vue')

Vue.use(Router)

let router = new Router({
  mode: 'hash',
  routes: [
    {
      path: '/',
      name: 'Index',
      component: Index
    },
    {
      path: '/chooseImage',
      name: 'chooseImage',
      component: ChooseImage
    },
    {
      path: '/record',
      name: 'record',
      component: Record
    },
    {
      path: '/getUserInfo',
      name: 'getUserInfo',
      component: GetUserInfo
    },
    {
      path: '/getLocation',
      name: 'getLocation',
      component: GetLocation
    }
  ]
})


router.beforeEach(async(to, from, next) => {
  console.log(location.href)
  let jsApiList = [
    'chooseImage',
    'updateTimelineShareData',
    'updateAppMessageShareData',
    'startRecord',
    'stopRecord',
    'playVoice',
    'stopVoice',
    'openLocation',
    'getLocation',
  ]
  let url = `/sign` // 获取wx签名的接口
  await axios.get(url, { params:{ url: location.href.split('#')[0] } })
    .then(({data: { data }}) => {
      let {appId, timestamp, nonceStr, signature} = data
      localStorage.setItem('appId', appId)
      wx.config({
          debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
          appId, // 必填，公众号的唯一标识
          timestamp, // 必填，生成签名的时间戳
          nonceStr, // 必填，生成签名的随机串
          signature,// 必填，签名
          jsApiList // 必填，需要使用的JS接口列表
      })
    })
    .catch((err) => {
      console.log('全局前置守卫获取签名失败' + err)
    })
  next()
})





export default router