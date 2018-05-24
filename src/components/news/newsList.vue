<template>
    <div class="tmpl">
        <nav-bar :title="navTitle"></nav-bar>
        <!--MUI图文列表-->
        <ul class="mui-table-view">
            <li class="mui-table-view-cell mui-media" v-for="news in newsList" :key="news.id">
                <a href="javascript:;">
                    <img class="mui-media-object mui-pull-left" :src="news.img_url">
                    <div class="mui-media-body">
                        <span class="text-overflow-dotted-1line" style="width: 300px;display: inline-block;" v-text="news.title"></span>
                        <div class='dews-desc clearfloat'>
                            <span class="fl">点击数:{{news.click}}</span>
                            <span class="fr">发表时间: {{news.add_time | formatTime}}</span>
                        </div>
                    </div>
                </a>
            </li>
        </ul>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                navTitle: '新闻列表',
                newsList: []//新闻列表数据
            }
        },
        methods: {

        },
        created() {
            //3.去了干嘛 发起请求
            this.$ajax.get('news/newsList.json')
                .then(res=>{
                    if(res.data.status === 200) {
                        this.newsList = res.data.message;
                    }
                })
                .catch(err=>{
                    console.log(err);
                })
                .finally(()=>{
                    console.log("完成")
                })
        }
    }
</script>

<style scoped>
    .dews-desc {
        font-size: 12px;
        color: blue;
    }
</style>