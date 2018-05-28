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
// Vue.use(Mint);
//lazyload: 这里配置了懒加载(mint的懒加载源于vue-lazyload项目)
Vue.use(Mint, {
        lazyload: {
            preLoad: 1.3,
            error: 'http://h5.duia.com/xiaoke_wx/resources/xk-common/images/lazy-error.png',
            loading: 'http://h5.duia.com/xiaoke_wx/resources/xk-common/images/lazy-loading.png',
            attempt: 1,
            // the default is ['scroll', 'wheel', 'mousewheel', 'resize', 'animationend', 'transitionend']
            listenEvents: ['scroll']
        }
});
//MUI: 引入css
import './static/vendor/mui/dist/css/mui.css';

//VueAwesomeSwiper:引入轮播图
import VueAwesomeSwiper from 'vue-awesome-swiper';
import 'swiper/dist/css/swiper.css';
Vue.use(VueAwesomeSwiper)

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

//Moment:引入moment
import Moment from 'moment';
//------------------引入第三方包end------------------------------------

//---------------定义成全局过滤器start，大家都能使用----------------------
Vue.filter('formatTime',function(time) {
    return Moment(time).format('YYYY-MM-DD');
});

//---------------定义成全局过滤器end，大家都能使用----------------------


//------------------引入全局组件需要的组件对象start--------------------
import NavBar from './components/common/navBar.vue';
//------------------引入全局组件需要的组件对象end----------------------

//--------------------------定义全局组件start----------------------------
Vue.component('navBar',NavBar); //使用最好以nav-bar
//--------------------------定义全局组件end----------------------------


//------------------引入自己的vue文件start---------------------------------
import App from './app.vue';
import Home from './components/home/home.vue';
import Member from './components/member/member.vue';
import Shopcart from './components/shopcart/shopcart.vue';
import Search from './components/search/search.vue';
import NewsList from './components/news/newsList.vue';
import NewsDetail from './components/news/newsDetail.vue';
import PhotoShare from './components/photo/photoShare.vue';
//------------------引入自己的vue文件end---------------------------------


//VueRouter:创建路由对象并配置路由规则   2.导航!!!
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
        //首页
        {
            name: 'home',
            path: '/home',
            component: Home
        },
        //会员
        {
            name: 'member',
            path: '/member',
            component: Member
        },
        //购物车
        {
            name: 'shopcart',
            path: '/shopcart',
            component: Shopcart
        },
        //查找
        {
            name: 'search',
            path: '/search',
            component: Search
        },
        //新闻列表
        {
            name: 'news.list',
            path: '/news/list',
            component: NewsList
        },
        //新闻详情
        {
            name: 'news.detail',
            path: '/news/detail',
            component: NewsDetail
        },
        //图文分享
        {
            name: 'photo.share',
            path: '/photo/share',
            component: PhotoShare
        }
    ]
});
//创建vue实例
new Vue({
    el: '#app',
    router,
    render: c=>c(App)
})