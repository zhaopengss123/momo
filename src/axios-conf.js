/**
 * @module Axios 配置信息
 */

import axios from 'axios';
import VueAxios from 'vue-axios';
import Qs from 'qs';

export default (Vue , Store) => {
    axios.interceptors.request.use(res => {
        /* ------------ 序列化参数 ------------- */
        // if (res.method === 'post') res.data = Qs.stringify(res.data);
        res.timeout = 15000;
        return res;
    });

    /* ----------------- 返回结果拦截, 如未登录直接跳转到登录页 ----------------- */
    axios.interceptors.response.use(res => {
        return res;
    }, err => {
        //alert('网络错误，请联系客服~');
        return err;
    })

    /* ------------------------- 默认请求格式, 和全局请求地址 ------------------------- */
    axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
    //const Env = process.env.NODE_ENV === 'production' ? 'build' : 'dev';
    // const Domain = require('../config')[Env].env.domain.replace(/"/g, '');
    // axios.defaults.baseURL = Domain;

    Vue.use(VueAxios, axios);
}
