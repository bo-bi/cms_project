<template>
    <div>
        <!--<div class="home-banner">-->
            <!--<mt-swipe :auto="3000">-->
                <!--<mt-swipe-item v-for="(item,index) in imgs" :key="index">-->
                    <!--<a :href="item.url">-->
                        <!--<img :src="item.img" />-->
                    <!--</a>-->
                <!--</mt-swipe-item>-->
            <!--</mt-swipe>-->
        <!--</div>-->

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

    </div>
</template>

<script>
    import 'swiper/dist/css/swiper.css'
    import { swiper, swiperSlide } from 'vue-awesome-swiper'
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
        components: {
            swiper,
            swiperSlide
        },
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


</style>