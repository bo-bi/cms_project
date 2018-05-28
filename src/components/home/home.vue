<template>
    <div>
       <!--轮播图start-->

        <!--loop坑：轮播第二次开始后第一张图一闪而过-->
        <!--解决：作者给出的解释是由于vue特殊的渲染机制导致数据没有完全返回时swiper已经初始化了，
        现在解决的方法是加v-if=“data.length”,保证数据完全返回了才开始渲染swiper，-->
        <swiper v-if="imgs.length" :options="swiperOption" ref="mySwiper1">
            <!-- slides -->
            <swiper-slide v-for="(item,index) in imgs" :key="index">
                <a :href="item.url">
                    <img :src="item.img" />
                </a>
            </swiper-slide>
            <!-- Optional controls -->
            <div class="swiper-pagination"  slot="pagination"></div>
        </swiper>

        <!--轮播图end-->
        <!--九宫格start-->
        <div class="mui-content">
            <ul class="mui-table-view mui-grid-view mui-grid-9">
                <li class="mui-table-view-cell mui-media mui-col-xs-4">
                    <!-- 1.去哪里 -->
                    <router-link :to="{name:'news.list'}">
                        <span class="mui-icon mui-icon-home"></span>
                        <div class="mui-media-body">新闻资讯</div>
                    </router-link>
                </li>
                <li class="mui-table-view-cell mui-media mui-col-xs-4">
                    <router-link :to="{name:'photo.share'}">
                        <span class="mui-icon mui-icon-email"></span>
                        <div class="mui-media-body">图文分享</div>
                    </router-link>
                </li><li class="mui-table-view-cell mui-media mui-col-xs-4">
                <a href="#">
                    <span class="mui-icon mui-icon-chatbubble"></span>
                    <div class="mui-media-body">商品展示</div>
                </a>
            </li><li class="mui-table-view-cell mui-media mui-col-xs-4">
                <a href="#">
                    <span class="mui-icon mui-icon-location"></span>
                    <div class="mui-media-body">留言反馈</div>
                </a>
            </li><li class="mui-table-view-cell mui-media mui-col-xs-4">
                <a href="#">
                    <span class="mui-icon mui-icon-search"></span>
                    <div class="mui-media-body">搜索咨询</div>
                </a>
            </li><li class="mui-table-view-cell mui-media mui-col-xs-4">
                <a href="#">
                    <span class="mui-icon mui-icon-phone"></span>
                    <div class="mui-media-body">联系我们</div>
                </a>
            </li>
            </ul>
        </div>
        <!--九宫格end-->

    </div>
</template>

<script>
    //以组件方式引入
    // import 'swiper/dist/css/swiper.css'
    // import { swiper, swiperSlide } from 'vue-awesome-swiper'
    export default {
        data() {
            return {
                imgs: [],
                swiperOption: {
                    loop: true,
                    pagination: {
                        el:'.swiper-pagination',
                        clickable: true,
                        // bulletClass : 'my-bullet',//普通点的样式
                        // bulletActiveClass: 'my-bullet-active',//当前点的样式
                    },
                    direction:'horizontal',
                    autoplay:{
                        delay:1000,
                        disableOnInteraction : false,
                    },
                    speed:300,
                },
            }
        },
        //以组件方式引入
        // components: {
        //     swiper,
        //     swiperSlide
        // },
        created() {
            this.$ajax.get('home/banner.json')
                .then(res=>{
                    console.log(res,"res");
                    if(res.data.code === 200) {
                        this.imgs = res.data.data;
                    }
                })
                .catch(err=>{
                    console.log(err,"err");
                })
                .finally(()=>{
                    console.log("完成");
                })
        },
        mounted() {

        }
    }
</script>

<style scoped>
    /*九宫格start*/
    .mui-table-view.mui-grid-view.mui-grid-9 {
        background-color: #fff;
        border: none;
        margin-top: 0;
    }
    .mui-table-view.mui-grid-view.mui-grid-9 li {
        border: none;
    }
    /*清除字体图标*/
    .mui-icon-home:before,
    .mui-icon-email:before,
    .mui-icon-chatbubble:before,
    .mui-icon-location:before,
    .mui-icon-search:before,
    .mui-icon-phone:before {
        content: '';
        display: block;
        width: 50px;
        height: 50px;

    }
    /*设置图标*/
    .mui-icon-home:before {
        background: url(../../static/img/menu1.png);
        background-size: 50px 50px;
    }
    .mui-icon-email:before {
        background: url(../../static/img/menu2.png);
        background-size: 50px 50px;
    }
    .mui-icon-chatbubble:before {
        background: url(../../static/img/menu3.png);
        background-size: 50px 50px;
    }
    .mui-icon-location:before {
        background: url(../../static/img/menu4.png);
        background-size: 50px 50px;
    }
    .mui-icon-search:before {
        background: url(../../static/img/menu5.png);
        background-size: 50px 50px;
    }
    .mui-icon-phone:before {
        background: url(../../static/img/menu6.png);
        background-size: 50px 50px;
    }
    /*九宫格end*/
</style>