<template>
    <div>
        <div class="article-wrapper">
            <div class="sort">
                <ul>
                    <li>
                        <a @click="popularSort">热门</a>|
                    </li>
                    <li>
                        <a @click="newestSort">最新</a>|
                    </li>
                    <li>
                        <a >热榜</a>
                    </li>
                </ul>
            </div>
            <div class="article-wrapper__list">
                <ul>
                    <li v-for="item in articleList" v-bind:key="item" @click="getDetail(item.articleId)">
                        <div class="content-box">
                            <div class="meta-info">
                                <ul>
                                    <li>{{item.username}}</li>·
                                    <li>{{item.postTime | timeFilter}}</li>·
                                    <li>{{item.tagName}}</li>
                                </ul>
                            </div>
                            <div class="article-title">
                                <a>{{item.head}}</a>
                            </div>
                            <div class="action-list">
                                <a>
                                    <i class="el-icon-thumb"></i>
                                    <span>{{item.likeCount}}</span>
                                </a>
                                <a>
                                    <i class="el-icon-chat-dot-square"></i>
                                    <span>{{item.commentCount}}</span>
                                </a>
                            </div>
                        </div>
                        <div class="img-box">

                        </div>
                    </li>
                </ul>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "ArticleList",
        props:{
            'articleList':[],
        },
        data(){
            return{

            }
        },
        methods:{
            popularSort(){
                this.$router.push({
                    path:this.$router.path,
                    query:{
                        sort:'popular',
                    }
                })
                //alert(this.$route.query.sort);
            },
            newestSort(){
                this.$router.push({
                    path:this.$router.path,
                    query:{
                        sort:'newest',
                    }
                })
            },
            hotSort(){
                this.$router.push({
                    path:this.$router.path,
                    query:{
                        sort:'popular',
                    }
                })
            },
            getDetail(articleId){
                let path = '/detail/'+articleId;
                this.$router.push({
                    path:path,
                })
            }
        },
        filters:{
            //发布日期转换
            timeFilter(postTime){
                let postDate = new Date(postTime);//发布日期
                let now = new Date();  //当前日期
                let start = postDate.valueOf(); //转为时间戳
                let end = now.valueOf(); //转为时间戳
                let dis = end - start;
                let day = Math.floor(dis/(24*60*60*1000));   //相距天数
                let hours = Math.floor(dis/(60*60*1000));   //小时数
                let minutes = Math.floor(dis/(60*1000));  //分钟数
                let seconds = Math.floor(dis/1000); //秒数
                if(day>=1){
                    return day+"天前";
                }
                else if(hours>0 && hours<24){
                    return hours+"小时前";
                }
                else if(minutes>0 && minutes<60){
                    return minutes+"分钟前";
                }
                else if(seconds>0 && minutes<60){
                    return seconds+"秒前";
                }
            }
        }
    }
</script>

<style scoped>
    a{
        color:black;
    }
    a:hover{
        color:deepskyblue;
    }
    div.article-wrapper{
        width: 50vw;
        background-color: white;
    }
    div.sort{
        width: 100%;
    }
    div.sort a{
        cursor: pointer;
    }
    ul{
        list-style: none;
        margin:0px;
        text-align: left;
        padding:0px;
    }
    div.sort li,div.meta-info li{
        display: inline-block;
        color:#909090;
    }
    div.sort li a{
        padding: 8px;
        color:#909090;
    }
    div.sort li a:hover{
        color:deepskyblue;
    }
    div.content-box{
        width: 100%;
        border-bottom: 1px solid #909090;
        padding:10px 0 25px 10px;
    }
    div.article-wrapper__list{
        margin-top: 10px;
    }
    div.article-wrapper__list div.content-box{
        width: 100%;
    }
    div.meta-info{
        width: 100%;
    }
    div.meta-info li{
        font-size: 12px;
    }
    div.article-title{
        color:black;
        font-weight: bold;
        line-height: 45px;
    }
    div.action-list i,span{
        color:#909090;
    }
    div.action-list a{
        font-size: 15px;
        padding: 10px;
    }
</style>