'use strict'


//------------------引入第三方包start------------------------------------
import Vue from 'vue';
//VueRouter: 引入路由对象
import VueRouter from 'vue-router';
//VueRouter: 安装插件
Vue.use(VueRouter);

//Mint: 引入mint-ui
import Mint from 'mint-ui';
//Mint: 引入css
import 'mint-ui/lib/style.css';
//Mint: 安装组件库
Vue.use(Mint);

//MUI: 引入css
import './static/vendor/mui/dist/css/mui.css';

//引入自己的css
//全局css
import './static/css/global.css';

//Axios: 引入axios
import Axios from 'axios';
//Axios: 挂载原型
Vue.prototype.$ajax = Axios;
//Axios: 默认配置
//配置公共路径
Axios.defaults.baseURL = 'http://172.20.31.213:9999/json/';
//------------------引入第三方包end------------------------------------



//------------------引入自己的vue文件start---------------------------------
import App from './app.vue';
import Home from './components/home/home.vue';
import Member from './components/member/member.vue';
import Shopcart from './components/shopcart/shopcart.vue';
import Search from './components/search/search.vue';

//------------------引入自己的vue文件end---------------------------------



//VueRouter:创建路由对象并配置路由规则
let router = new VueRouter({
    linkActiveClass: 'mui-active',//默认值 'router-link-active'
    routes: [
        //VueRouter: 配置路由规则
        {
            path: '/',//重定向
            redirect: {
                name: 'home'
            }
        },
        {
            name: 'home',
            path: '/home',
            component: Home
        },
        {
            name: 'member',
            path: '/member',
            component: Member
        },
        {
            name: 'shopcart',
            path: '/shopcart',
            component: Shopcart
        },
        {
            name: 'search',
            path: '/search',
            component: Search
        }
    ]
});
//创建vue实例
new Vue({
    el: '#app',
    router,
    render: c=>c(App)
})