<template>
    <div class="tmpl">
        <nav-bar :title="navTitle"></nav-bar>
        <swiper v-if="categorys.length" :options="swiperOption">
            <!-- slides -->
            <swiper-slide v-for="category in categorys" :key="category.id">
                <span @click="loadImg(category.id)">{{category.title}}</span>
            </swiper-slide>
        </swiper>
        <div class="photo-list">
            <ul>
                <router-link :to="{name:'photo.detail',params:{id:img.content_id}}" v-for="img in imgs" :key="img.content_id" tag="li">
                    <a>
                        <!--<img :src="img.img_url" />-->
                        <!--懒加载-->
                        <img v-lazy="img.img_url" />
                        <p>
                            <span v-text="img.title"></span>
                            <br/>
                            <span>{{img.forward}}</span>
                        </p>
                    </a>
                </router-link>
            </ul>
        </div>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                navTitle: '图文分享',
                swiperOption: {
                    freeMode: true, //设置为true则变为free模式，slide会根据惯性滑动且不会贴合
                    freeModeMomentumVelocityRatio: 1, //free模式动量值（移动惯量）。设置的值越大，当释放slide时的滑动距离越大
                    freeModeMomentumBounce: false, //动量反弹。false时禁用free模式下的动量反弹，slides通过惯性滑动到边缘时，无法反弹
                    slidesPerView: 4,
                    //slidesPerGroup: 10,
                    //spaceBetween: 30,  //slide之间的距离（单位px）
                    resistance: true, //边缘抵抗就是拖离边界时的抵抗力。值为false时禁用，将slide拖离边缘时完全没有抗力
                    resistanceRatio: true, //当swiper已经处于第一个或最后一个slide时，继续拖动Swiper会离开边界，释放后弹回(false禁用)
                    //touchMoveStopPropagation : true,//true时阻止touchmove冒泡事件。
                    // centeredSlides : true//true为居中
                },
                categorys: [],//分类
                imgs: []
            }
        },
        created() {
            //发起请求获取导航栏数据（获取分类）
            this.$ajax.get('photo/photoShare.json')
            .then(res=>{
                console.log(res);
                if(res.data.status === 200) {
                    this.categorys = res.data.message;
                    //将全部添加到第一个 unshift
                    this.categorys.unshift({
                        title: '全部',
                        id: 4000
                    });
                }
            })
            .catch(err=>{
                console.log(err);
            })
            .finally(()=>{
                console.log('完成');
            })


            //当页面加载就默认传递0
            this.loadImg(4000);   //该代码替换了下面的请求的代码，做了函数封装

            //将0作为参数，获取全部图片数据

            // this.$ajax.get('http://v3.wufazhuce.com:8000/api/onelist/'+3528+'/0?channel=wdj&version=4.0.2&uuid=ffffffff-a90e-706a-63f7-ccf973aae5ee&platform=android')
            // .then(res=>{
            //     console.log(res,"全部");
            //     this.imgs = res.data.data.content_list;
            // })
            // .catch(err=>{
            //     console.log(err);
            // })
        },
        methods: {
            loadImg(id) {
                console.log(id);
                this.$ajax.get('http://v3.wufazhuce.com:8000/api/onelist/'+id+'/0?channel=wdj&version=4.0.2&uuid=ffffffff-a90e-706a-63f7-ccf973aae5ee&platform=android')
                .then(res=>{
                    console.log(res,"全部");
                    this.imgs = res.data.data.content_list;
                })
                .catch(err=>{
                    console.log(err);
                })
            }
        }
    }
</script>

<style scoped>
    * {
        padding: 0;
    }
    .swiper-slide {
        font-size: 15px;
    }
    .photo-list ul {
        margin: 0;
    }
    .photo-list li {
        position: relative;
        height: 180px;
    }
    .photo-list img {
        width: 100%;
        height: 100%;
    }
    .photo-list p {
        position: absolute;
        left: 0;
        bottom: -13px;
        background: rgba(0,0,0,.3);
        color: #fff;
    }
    /*图片懒加载的样式*/
    /*image[lazy=loading] {*/
        /*width: 100%;*/
        /*height: 100%;*/
        /*margin: auto;*/
    /*}*/
</style>