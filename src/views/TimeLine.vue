<template>
    <div id="timeLine">
        <el-button @click="check">开始</el-button>
        <div class="container">
            <div class="tag-list">
                <ul>
                    <li v-for="item in tagList" v-bind:key="item">
                        <a @click="queryByTag(item.tagName,item.tagId)">{{item.tagName}}</a>
                    </li>
                </ul>
            </div>
            <article-list v-bind:articleList="articleList" id="articleList"></article-list>
        </div>
    </div>
</template>

<script>
    import ArticleList from "../components/ArticleList";
    import {article,tag} from "../request/api";
    export default {
        name: "TimeLine",
        components: {ArticleList},
        data(){
            return{
                tagList:[],
                articleList:[],
                tag:0,
                sort:'popular',
            }
        },
        mounted() {
            this.getTag();
            this.getArticle(this.tag,this.sort);
        },
        methods:{
            getArticle(tag,sort){
                article.articleList(tag,sort).then(response=>{
                    this.articleList = response.data;
                    //console.log(this.articleList);
                })
            },
            getTag(){
                tag.tagList().then(response=>{
                    this.tagList = response.data;
                })
            },
            queryByTag(tagName,tagId){
                this.tag = tagId;
                this.$router.push({
                    path:this.$router.path,
                    params:{
                        tag:tagName,
                    }
                })
            },
            check(){
                console.log(this.articleList);
            }
        },
        watch:{
            //监听路由变化（根据url来查询）
            $route(to,from){
                let tag = this.$route.params.tag; //判断当前url中是否有tag
                this.sort = this.$route.query.sort;
                if(this.tag!=0 && tag!==undefined){
                    if(this.sort!==undefined){
                        console.log('ok');
                    }else{
                        this.getArticle(this.tag);
                    }
                }else{
                    this.getArticle(0);
                }
            },
        }
    }
</script>

<style scoped>
    .container{
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
    }
    .tag-list{
        width: 100%;
        background-color: white;
    }
    .tag-list li{
        display: inline-block;
        padding: 5px 20px 5px 20px;
    }
    .tag-list a{
        cursor: pointer;
    }
    .tag-list a:hover{
        color:deepskyblue;
    }
    #articleList{
    }
</style>