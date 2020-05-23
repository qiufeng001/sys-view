
import baseUrl from '../../api/baseUrl';
import qs from 'qs';
import axios from 'axios';

// 先声明axios实例
const service = axios.create({
    baseURL: baseUrl.serverUrl.server,
    timeout: 3000
})
// 响应拦截器
service.interceptors.response.use((res) => {
    // loading.close() // loading关闭
    return res
}, (err) => {
    this.$message({
        message: '请求失败',
        type: 'error'
    });
    return Promise.reject(err);
})

// 请求拦截器
service.interceptors.request.use((config) => {
    // loading() // loading 加载相关
    if(config.methods === 'POST'){
        config.data = qs.stringify(config.params);
    }else{
        config.params = config.params;
    } 
    return config;
}, (err) => {
    this.$message({
        message: '请求失败',
        type: 'error'
    })
    return Promise.reject(err);
});

export default service;