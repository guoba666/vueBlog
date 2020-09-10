<template>
    <div id="detail">
        <div class="container">
            <div class="article-container">
                <div class="article__head">
                    <div class="article__head__info">
                        <a>
                            <user-head :size="60" :src="url"></user-head>
                        </a>
                        <div class="article__head__info__meta">
                            <span class="author-name">{{author}}</span>
                            <time class="post-time">2018年08月07日 阅读 141393</time>
                        </div>
                        <div class="article__head__info__followbtn">
                            <follow-btn></follow-btn>
                        </div>
                    </div>
                    <div class="article__head__title">
                        <h1>{{head}}</h1>
                    </div>
                </div>
                <div class="article__body" id="contentDiv" v-html="content">
                    <!--
                    <h2>一、axios的封装</h2>
                    <p>在vue项目中，和后台交互获取数据这块，我们通常使用的是axios库，它是基于promise的http库，可运行在浏览器端和node.js中。他有很多优秀的特性，例如拦截请求和响应、取消请求、转换json、客户端防御XSRF等。所以我们的尤大大也是果断放弃了对其官方库vue-resource的维护，直接推荐我们使用axios库。
                    </p>
                    <h3>安装</h3>
                    <code>npm install axios; // 安装axios</code>
                    <h3>引入</h3>
                    <p>一般我会在项目的src目录中，新建一个request文件夹，然后在里面新建一个http.js和一个api.js文件。http.js文件用来封装我们的axios，api.js用来统一管理我们的接口。
                    </p>
                    <code>
                        // 在http.js中引入axios
                        import axios from 'axios'; // 引入axios
                        import QS from 'qs'; // 引入qs模块，用来序列化post类型的数据，后面会提到
                        // vant的toast提示框组件，大家可根据自己的ui组件更改。
                        import { Toast } from 'vant';
                    </code>
                    <h3>环境的切换</h3>
                    <p>我们的项目环境可能有开发环境、测试环境和生产环境。我们通过node的环境变量来匹配我们的默认的接口url前缀。axios.defaults.baseURL可以设置axios的默认请求地址就不多说了。
                    </p>
                    <code>
                        // 环境的切换
                        if (process.env.NODE_ENV == 'development') {
                        axios.defaults.baseURL = 'https://www.baidu.com';}
                        else if (process.env.NODE_ENV == 'debug') {
                        axios.defaults.baseURL = 'https://www.ceshi.com';
                        }
                        else if (process.env.NODE_ENV == 'production') {
                        axios.defaults.baseURL = 'https://www.production.com';
                        }
                    </code>
                    <h3>设置请求超时</h3>
                    <p>通过axios.defaults.timeout设置默认的请求超时时间。例如超过了10s，就会告知用户当前请求超时，请刷新等。
                    </p>
                    <code>
                        axios.defaults.timeout = 10000;
                    </code>
                    <h3>post请求头的设置</h3>
                    <p>这里说一下token，一般是在登录完成之后，将用户的token通过localStorage或者cookie存在本地，然后用户每次在进入页面的时候（即在main.js中），会首先从本地存储中读取token，如果token存在说明用户已经登陆过，则更新vuex中的token状态。然后，在每次请求接口的时候，都会在请求的header中携带token，后台人员就可以根据你携带的token来判断你的登录是否过期，如果没有携带，则说明没有登录过。这时候或许有些小伙伴会有疑问了，就是每个请求都携带token，那么要是一个页面不需要用户登录就可以访问的怎么办呢？其实，你前端的请求可以携带token，但是后台可以选择不接收啊！

                        作者：愣锤
                        链接：https://juejin.im/post/6844903652881072141
                        来源：掘金
                        著作权归作者所有。商业转载请联系作者获得授权，非商业转载请注明出处。
                    </p>
                    <h2>二、axios的封装基本就完成了，下面再简单说下api的统一管理。</h2>
                    <p>整齐的api就像电路板一样，即使再复杂也能很清晰整个线路。上面说了，我们会新建一个api.js,然后在这个文件中存放我们所有的api接口。
                    </p>
                    -->
                </div>
                <div class="article__foot">

                </div>
            </div>
            <div class="right-container">
                <div class="user-container">
                    <h4>关于作者</h4>
                </div>
                <div class="catalog-container">
                    <h3>目录</h3>
                    <div class="catalog-li catalog-li-cative" id="catalogDiv">

                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import UserHead from "../components/UserHead";
    import FollowBtn from "../components/FollowBtn";
    import katelog from "katelog";
    import article from "../request/article";
    export default {
        name: "Detail",
        components:{
            FollowBtn,
            UserHead,
        },
        mounted(){
            this.getDetail(this.$route.params.articleId);

        },
        updated(){
            //获取目录
            new katelog({
                contentEl: 'contentDiv',
                catelogEl: 'catalogDiv',
                selector: ['h2','h3'],
                linkClass: 'catalog-li',
                linkActiveClass:'catalog-li-cative',
            })
        },
        data(){
            return{
                url:'/UserHead/default.jpg',
                author:'',
                head:'',
                content:'',

            }
        },
        methods:{
            getDetail(articleId){
                article.articleDetail(articleId).then(result=>{
                    let detail = result.data[0];
                    this.author = detail.username;
                    this.content = detail.content;
                    this.head = detail.head;
                    console.log(result.data);
                })
            }
        }
    }
</script>

<style scoped>
    #detail{
        width: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
    }
    div.container{
        width: 75%;
        display: flex;
        justify-content: center;
        align-items: center;
        background-color: white;
    }
    div.article-container{
        width: 75%;
        text-align: left;
        padding: 8px 25px 8px;
    }
    div.right-container{
        width:25%;
        align-self: stretch;
    }
    div.user-container{
        width:100%;
        align-self: stretch;
    }
    div.catalogue-container{
        width: 100%;
        align-self: stretch;
    }
    div.article__body{
        line-height: 2.27rem;
        margin-top: 22px;
        margin-bottom: 22px;
        font-size: 18px;
    }
    div.article__body code{
        display: block;
        width:100%;
        font-size: 16px;
        padding:15px 10px 10px;
        margin-right: 20px;
        background: #f8f8f8;
        color: black;
        font-family: Menlo,Monaco,Consolas,Courier New,monospace;
    }
    div.article__head__info__meta{
        display: flex;
        flex-direction: column;
    }
    div.article__head__info{
        display: flex;
        align-items: stretch;
    }
    div.article__head__info__meta{
        width: 75%;
    }
    span.author-name{
        margin:10px 0px 10px 10px;
        font-weight: bold;
        font-size: 18px;
    }
    time.post-time{
        margin-left: 10px;
        color:#909090;
    }
    div.article__head__info__followbtn{
        margin:20px 10px 15px 0px;
    }
    div.catalog-container{
        text-align: left;
    }

</style>
<style>
    .catalog-li{
        cursor: pointer;
        margin-bottom: 15px;
        padding:0px 5px 10px 5px;
    }
    div[class^='catalog-li k-catelog-level']:hover{
        background-color: #f4f5f5;
    }
    .catalog-li.k-catelog-level-2{
        font-size: 21px;
        font-weight: bold;
    }
    .catalog-li.k-catelog-level-3:before{
        content:'';
        position: absolute;
        margin-top:8px;
        margin-left:-15px;
        width:6px;
        height: 6px;
        border-radius: 50%;
        background-color: black;
    }
    .catalog-li.k-catelog-level-3{

    }
    .catalog-li-active{
        color:deepskyblue;
        background-color:yellow;
    }
</style>