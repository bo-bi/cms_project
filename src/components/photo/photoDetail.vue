<template>
    <div class="tmpl">
        <!--组件名: navBar-->
        <nav-bar :title="navTitle"></nav-bar>
        <!--组件名: navbar-->
        <!--使用 navbar-->
        <p class="image-title" v-text="imgInfo.title">图片标题</p>
        <div class="clearfloat baseInfo">
            <span class="fl" style="margin-left: 10px;">发起时间: {{imgInfo.add_time | formatTime}}</span>
            <span class="fl">{{imgInfo.click}}次浏览</span>
            <span class="fr">分类: 民主经济</span>
        </div>
        <!--<ul class="mui-table-view mui-grid-view">-->
            <!--<li v-for="(img,index) in imgs" :key="index" class="mui-table-view-cell mui-media mui-col-xs-4">-->
                <!--<img class="mui-media-object" :src="img.src" />-->

                <!--这是vue-preview以前的版本-->
                <!--<img class="preview-img" :src="img.src" height="100" @click="$preview.open(index,imgs)" />-->
            <!--</li>-->
        <!--</ul>-->
        <div class="photoDetail-preview">
            <!--现在的版本-->
            <vue-preview :slides="imgs" @close="handleClose"></vue-preview>
        </div>
        <div v-html="imgInfo.content"></div>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                navTitle: '图片详情',
                imgs: [],//缩略图
                imgInfo: {}//详情数据对象
            }
        },
        created() {
            //1:获取路由参数
            let pid = this.$route.params.id;
            //2:发送请求（2个)
            //图片详情
            this.$ajax.get('photo/photoDetailInfo.json')
            // this.$ajax.get('getimageInfo/'+pid)
            .then(res=>{
                if(res.data.status === 200) {
                    //一个id对应一个详情对象
                    this.imgInfo = res.data.message[0];
                }
            })
            .catch(err=>{
                console.log(err);
            })
            //缩略图
            this.$ajax.get('photo/photoDetailImg.json')
            // this.$ajax.get('getthumimages/'+pid)
            .then(res=>{
                if(res.data.status === 200) {
                    let imgs = res.data.message;

                    //est6的遍历
                    imgs.forEach((i)=>{
                        i.w = 300;
                        i.h = 200;//缩略图的高
                        i.msrc = i.src;//新版本必需
                    });

                    this.imgs = imgs;
                }
            })
            .catch(err=>{
                console.log(err);
            })
            //3:渲染数据到页面上
        },
        methods: {
            handleClose() {
                console.log('close event')
            }
        }
    }
</script>

<style scoped>
    .image-title {
        font-size: 18px;
        color: blue;
        margin: 0 0 0 10px;
    }
    .baseInfo span {
        font-size: 14px;
        margin-right: 10px;
    }
</style>