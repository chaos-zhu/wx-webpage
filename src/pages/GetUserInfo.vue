<template>
    <div>
        <group title="您的个人公开信息" label-width="5.5em" label-margin-right="2em" label-align="justify">
            <x-input title="微信昵称" :value="userInfo.nickname || 'null'"></x-input>
            <x-input title="您的性别" :value="userInfo.sex === 0 ? '未设置' : (userInfo.sex === 1 ? '男' : '女')"></x-input>
            <x-input title="使用语言" :value="userInfo.language || '未设置'"></x-input>
            <x-input title="所属城市" :value="userInfo.city || '未设置'"></x-input>
            <x-input title="所属省份" :value="userInfo.province || '未设置'"></x-input>
            <x-input title="所属国家" :value="userInfo.country || '未设置'"></x-input>
            <x-input title="微信头像"></x-input>
            <div style="text-align:center;">
                <img :src="userInfo.headimgurl" alt="获取失败" title="24K超帅~">
            </div>
        </group>
    </div>
</template>

<script>
import axios from 'axios';
import { Group, XInput } from 'vux'
export default {
		name: 'GetUserInfo',
		components: {
			Group,
			XInput
		},
    data() {
        return {
            href: '',
            code: '',
            userInfo: {}
        }
    },
    mounted() {
        this.code = sessionStorage.getItem('code')
        console.log(this.code)
        let url = `/getUserInfo?code=${this.code}`
        this.axios.get(url)
            .then(({data}) => {
                this.userInfo = data
            }).catch((err) => {
                alert(err)
            });
    },
    methods: {
    },
}
</script>

<style lang="less">
    
</style>
