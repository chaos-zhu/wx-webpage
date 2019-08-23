import axios from 'axios'

console.log('Current envitonment: ' + process.env.NODE_ENV)
let env = process.env.NODE_ENV

let instance = axios.create({
    baseURL: env === 'development' ? '/api' : '/wx',
    timeout: 30000,
    headers: {} 
})

instance.interceptors.request.use((config) => {
    return config
})

instance.interceptors.response.use((res) => {
    return res
})

export default instance