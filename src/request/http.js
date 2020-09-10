import axios from 'axios';
import store from '../store/index';
import router from '../router/index';
import {Message} from 'element-ui';
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8';
/**
 * 跳转登录页
 * 携带当前页面路由，以期在登录页面完成登录后返回当前页面
 */
const toLogin = () => {
    router.replace({
        path: '/login',
        query: {
            redirect: router.currentRoute.fullPath
        }
    });
}

var instance = axios.create({timeout:1000*12});
//请求拦截器
instance.interceptors.request.use(
    config=>{
        const token = store.state.token;
        token && (config.headers.authorization = token);
        return config;
    },
    error=>Promise.error(error)
)

//响应拦截器
instance.interceptors.response.use(
    response=>{
        return response;
    },
    error=>{
       if(error.response){
            switch (error.response.status) {
                case 403:
                    Message({
                        message:'登陆已过期,请重新登陆',
                        type:'error',
                    })
                    toLogin();
                    break;
            }
       }
    }
)

export default instance;