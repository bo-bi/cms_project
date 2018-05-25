<template>
    <div class="tmpl">
        <nav-bar :title="navTitle"></nav-bar>
        <div class="newsDetail-conetent">
            <div class="news-title">
                <p v-text="newsDetail.title">新闻标题</p>
                <div class="clearfloat">
                    <span class="fl">{{newsDetail.click}}次点击</span>
                    <span class="fl">分类:民生经济</span>
                    <span class="fr" style="margin-right: 10px;">添加时间:{{newsDetail.add_time | formatTime}}</span>
                </div>
            </div>
            <div class="news-content" v-html="newsDetail.content">新闻明细</div>
        </div>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                navTitle: '新闻详情',
                newsDetail: {}//就是为了象征性的表示其数据类型
            }
        },
        methods: {

        },
        created() {
            //1:获取路由参数
           let id = this.$route.query.id;
            //2:拼接路由参数成为后台请求的URL 这里后台文档写为: getnew/:newsid
            // this.$ajax.get('/news/newsDetail/'+id)
            this.$ajax.get('/news/newsDetail.json')
                .then(res=>{
                    console.log(res);
                    this.newsDetail = res.data.message[0];//数组，就一个数据，所以直接取[0]
                })
                .catch(err=>{
                    console.log(err);
                })
                .finally(()=>{
                    console.log("完成");
                })
            //3.响应回来的数据渲染页面
        }
    }
</script>

<style scoped>
    .news-title p {
        color: #0a87f8;
        font-size: 20px;
        font-weight: 700;
    }
    .news-title {
        margin-top: 5px;
        border-bottom: 1px solid rgba(0,0,0,.2);
    }
    .news-title span {
        margin-right: 15px;
    }
    /*主题文章的左右距离*/
    .news-content {
        padding: 10px 5px;
    }
</style>