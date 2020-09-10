import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../views/Login.vue'
import Login1 from '../views/Login1.vue'
import Index from '../views/Index'
import Blog from '../views/Blog'
import TimeLine from "../views/TimeLine"
import Editor from "../views/Editor";
import Detail from '../views/Detail';
import store from '../store/index';
Vue.use(VueRouter);

const routes = [
    {
        path: '',
        name: '',
        meta:{
            requireAuth:true,
        },
        component: TimeLine
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
        path: '/login1',
        name: 'login1',
        component: Login1
    },
    {
        path:'/index',
        name:'index',
        component: Index
    },
    {
        path:'/blog',
        name:'blog',
        component:Blog
    },
    {
        path:'/timeline/:tag?',
        name:'timeline',
        meta:{
            requireAuth:true,
        },
        component:TimeLine
    },
    {
        path:'/editor',
        name:'editor',
        component:Editor
    },
    /*
    {
        path:'/person',
        name:'detail',
        component:Detail
    },
     */
    {
        path:'/detail/:articleId?',
        name:'detail',
        component:Detail
    }


]
const router = new VueRouter({
    routes,
    mode:'history',

})

router.beforeEach((to, from, next) => {
    if (to.meta.requireAuth) {  // 判断该路由是否需要登录权限
        if (store.state.token) {  // 通过vuex state获取当前的token是否存在
            next();
        }
        else {
            next({
                path: '/login',
                query: {redirect: to.fullPath}  // 将跳转的路由path作为参数，登录成功后跳转到该路由
            })
        }
    }
    else {
        next();
    }
})
export default router
