<template>
    <div id="Editor">
        <div class="header">
            <div class="header-container">
                <div class="draft">
                    <span style="color:gray;">文章将会自动保存至</span>
                    <el-button type="info">草稿</el-button>
                </div>
                <div class="cover-image" style="margin-right: 30px;">
                    <el-tooltip class="item" effect="dark" content="上传封面图" placement="bottom">
                        <el-button class="iconfont icon-tupian1" titile></el-button>

                    </el-tooltip>
                </div>
                <div class="post-btn">
                    <el-button @click="post" type="primary">发布<i :class="[postClicked?'el-icon-caret-top':'el-icon-caret-bottom']"></i></el-button>
                    <div class="tagSelector" v-show='postClicked'>
                        <el-radio-group v-model="selectTag.tagName" size="medium">
                            <el-radio-button v-for="item in tags" :key="item" :label="item.tagName"></el-radio-button>
                        </el-radio-group>
                        <div style="margin-top:20px;">
                            <el-button type="success" @click="correntPost">确定并发布</el-button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="edit-toolbar">
            <ul class="toolbar-list">
                <li>
                    <el-tooltip class="item" effect="dark" content="加粗" placement="bottom">
                        <el-button class="iconfont icon-bold" @click="bold" v-bind:class="{clicked:isClick.bold}"></el-button>
                    </el-tooltip>
                </li>
                <li>
                    <el-tooltip class="item" effect="dark" content="斜体" placement="bottom">
                        <el-button class="iconfont icon-i" @click="italic" v-bind:class="{clicked:isClick.italic}"></el-button>
                    </el-tooltip>
                </li>
                <li>
                    <el-tooltip class="item" effect="dark" content="下划线" placement="bottom">
                        <el-button class="iconfont icon-u" size="small" @click="underline" v-bind:class="{clicked:isClick.underline}"></el-button>
                    </el-tooltip>
                </li>
                <li>
                    <el-tooltip class="item" effect="dark" content="大标题" placement="bottom">
                        <el-button class="iconfont icon-dabiaoti" @click="bighead" v-bind:class="{clicked:isClick.bighead}"></el-button>
                    </el-tooltip>
                </li>
                <li>
                    <el-tooltip class="item" effect="dark" content="小标题" placement="bottom">
                        <el-button class="iconfont icon-xiaobiaoti" @click="smallhead" v-bind:class="{clicked:isClick.smallhead}"></el-button>
                    </el-tooltip>
                </li>
                <li>
                    <el-tooltip class="item" effect="dark" content="引用" placement="bottom">
                        <el-button class="iconfont icon-baojiaquotation2" @click="quote" v-bind:class="{clicked:isClick.quote}"></el-button>
                    </el-tooltip>
                </li>
                <li>
                    <el-tooltip class="item" effect="dark" content="代码块" placement="bottom">
                        <el-button class="iconfont icon-daimakuai" @click="codeblock" v-bind:class="{clicked:isClick.codeblokc}"></el-button>
                    </el-tooltip>
                </li>
                <li>
                    <el-tooltip class="item" effect="dark" content="有序列表" placement="bottom">
                        <el-button class="iconfont icon-youxuliebiao" @click="youxulist" v-bind:class="{clicked:isClick.youxulist}"></el-button>
                    </el-tooltip>
                </li>
                <li>
                    <el-tooltip class="item" effect="dark" content="无序列表" placement="bottom">
                        <el-button class="iconfont icon-wuxuliebiao"></el-button>
                    </el-tooltip>
                </li>
                <li>
                    <el-tooltip class="item" effect="dark" content="插入图片" placement="bottom">
                        <el-button class="iconfont icon-tupian"></el-button>
                    </el-tooltip>
                </li>
            </ul>
        </div>
        <div class="content-area">
            <input v-focus type="text" class="input-title" placeholder="请输入标题..." v-model="head" />
            <!--
            <h3>{{content}}</h3>
            -->
            <div id="rich-editor" class="input-content" contenteditable="true" placeholder="输入正文..."
                 @keyup.delete="adjustDelete" @input="listenInput($event)"
                 @keydown.enter="adjustEnter($event)"
            >
            </div>
        </div>

    </div>
</template>

<script>
    import focus from "../directives/focus";
    import tag from "../request/tag";
    import {article} from "../request/api";
    export default {
        name: "Editor",
        data(){
            return{
                isClick:{
                    bold:false,
                    italic:false,
                    underline:false,
                    bighead:false,
                    smallhead:false,
                    quote:false,
                    codeblokc:false,
                    youxulist:false,
                    wuxulist:false,
                    pic:false,
                },
                head:'',
                content:'',
                postClicked:false,
                tags:[],
                selectTag:{
                    tagName:'',
                    tagId:0,
                },
            }
        },
        mounted(){
            this.init();
            this.getTags();
        },
        methods:{
            //监听删除键，防止删除掉初始化的p标签
            adjustDelete(){
                let editArea = document.querySelector('#rich-editor');
                if(editArea.childNodes.length==0){
                    let pNode = document.createElement('p');
                    pNode.innerHTML = '<br>';
                    editArea.appendChild(pNode);
                }
            },
            //重写监听回车键
            adjustEnter(e){
                if(e.target.lastChild.nodeName==='P'){
                    e.preventDefault();
                    const selection = window.getSelection();
                    let range = new Range();
                    let pNodes = document.querySelectorAll('p');
                    range.setStart(pNodes[pNodes.length-1],0);
                    range.setEnd(pNodes[pNodes.length-1],0);
                    selection.removeAllRanges();
                    selection.addRange(range);
                    console.log(range);
                }
                /*
                let childNodes = e.target.childNodes;
                console.log(childNodes[childNodes.length-1])
                if(childNodes[childNodes.length-1].innerHTML.length!==4){
                    this.init();
                }
                */
            },
            //初始化添加p标签
            init(){
                let editArea = document.querySelector('#rich-editor');
                let pNode = document.createElement('p');
                pNode.innerHTML = '<br>';
                editArea.appendChild(pNode);
            },
            //监听input事件
            listenInput(event){
                //绑定
                this.content=event.target.innerHTML;
                //自动添加p标签(如果最后一个节点的innerHTML不为<br>标签，则添加一个p标签)
                if(event.target.lastChild.innerHTML!=='<br>'){
                    this.init();
                }
            },
            bold(){
                this.isClick.bold = !this.isClick.bold;
                document.execCommand("Bold",false,null);
            },
            italic(){
                this.isClick.italic = !this.isClick.italic;
                document.execCommand("italic",false,null);
            },
            underline(){
                this.isClick.underline = !this.isClick.underline;
                document.execCommand("underline",false,null);
            },
            bighead(){
                this.isClick.bighead = !this.isClick.bighead;
                document.execCommand("formatBlock",false,"<h2>");
            },
            smallhead(){
                this.isClick.smallhead = !this.isClick.smallhead;
                document.execCommand("formatBlock",false,"<h3>");
            },
            quote(){
                this.isClick.quote = !this.isClick.quote;
                document.execCommand("formatBlock",false,"<blockquote>");
            },
            codeblock(){
                this.isClick.codeblokc = !this.isClick.codeblokc;
                document.execCommand("formatBlock",false,"<pre>");
                document.execCommand("formatBlock",false,"<code>");
            },
            youxulist(){
                this.isClick.youxulist = !this.isClick.youxulist;
                document.execCommand("insertOrderedList",false,null);
            },
            post(){
                this.postClicked = !this.postClicked;
            },
            correntPost(){
                if(!this.selectTag){
                    alert('请选择标签');
                    return ;
                }
                this.tags.forEach(val=>{
                    if(val.tagName===this.selectTag.tagName){
                        this.selectTag.tagId = val.tagId;
                    }
                })
                let info = {
                    username:'gb',
                    head:this.head,
                    content:this.content,
                    tagId:this.selectTag.tagId,
                }
                article.articlePost(info).then(response=>{
                    if(response.data){
                        alert('发送成功');
                    }
                })

            },
            getTags(){
                tag.tagList().then(response=>{
                    this.tags = response.data;
                })
            },
        },
        computed:{

        },
        directives:{
            focus:focus,
        }
    }
</script>
<style scoped>
    .header{
        display: flex;
        justify-content: center;
        align-items: center;
    }
    .header-container{
        width: 70%;
        display: flex;
    }
    .draft{
        margin-right: 60%;
    }
    .tagSelector{
        width: 400px;
        position: absolute;
        border: 1px solid #ddd;
        right: 250px;
        top:65px;
        z-index: 2;
        padding:10px 5px 10px 5px;
    }
    .tagSelector:before{
        content:'';
        position: absolute;
        display: block;
        width: 1rem;
        height: 1rem;
        border-style: solid;
        border-color: #ddd;
        background-color: #fff;
        border-right: none;
        border-bottom: none;
        transform: rotate(45deg);
        top:-10px;
        right:120px;
    }
</style>
<style>
    #Editor{
        background-color: white;
    }
    @font-face {font-family: "iconfont";
        src: url('//at.alicdn.com/t/font_1932430_dce1k7wbg7f.eot?t=1594233612692'); /* IE9 */
        src: url('//at.alicdn.com/t/font_1932430_dce1k7wbg7f.eot?t=1594233612692#iefix') format('embedded-opentype'), /* IE6-IE8 */
        url('data:application/x-font-woff2;charset=utf-8;base64,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') format('woff2'),
        url('//at.alicdn.com/t/font_1932430_dce1k7wbg7f.woff?t=1594233612692') format('woff'),
        url('//at.alicdn.com/t/font_1932430_dce1k7wbg7f.ttf?t=1594233612692') format('truetype'), /* chrome, firefox, opera, Safari, Android, iOS 4.2+ */
        url('//at.alicdn.com/t/font_1932430_dce1k7wbg7f.svg?t=1594233612692#iconfont') format('svg'); /* iOS 4.1- */
    }

    .iconfont {
        font-family: "iconfont" !important;
        font-size: 16px;
        font-style: normal;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
    }

    .icon-baojiaquotation2:before {
        content: "\e63c";
    }

    .icon-daimakuai:before {
        content: "\e69f";
    }

    .icon-dabiaoti:before {
        content: "\e6e4";
    }

    .icon-wuxuliebiao:before {
        content: "\e6ec";
    }

    .icon-xiaobiaoti:before {
        content: "\e6ee";
    }

    .icon-youxuliebiao:before {
        content: "\e6f0";
    }

    .icon-lianjie:before {
        content: "\e60c";
    }

    .icon-tupian:before {
        content: "\e61a";
    }

    .icon-i:before {
        content: "\e616";
    }

    .icon-u:before {
        content: "\e607";
    }

    .icon-tupian1:before {
        content: "\e677";
    }

    .icon-bold:before {
        content: "\e64e";
    }
    .edit-toolbar{
        width:60vw;
        margin-left: auto;
        margin-right: auto;
    }
    ul{
        list-style: none;
    }
    ul.toolbar-list li{
        display: inline-block;
    }
    ul.toolbar-list li button{
        border: none;
        outline:none;
        cursor: pointer;
        opacity: 0.6;
    }
    ul.toolbar-list li button:hover{
        color: deepskyblue;
        opacity: 1;
    }
    ul.toolbar-list li button.clicked{
        color: deepskyblue;
        opacity: 1;
    }
    .content-area{
        width:100%;
    }
    .input-title{
        padding: 10px;
        width: 60vw;
        height: 8vh;
        font-size: 30px;
        font-weight: bold;
        border: none;
        outline: none;
    }
    .input-content{
        background-color: white;
        padding-top: 10px;
        padding-left: 10px;
        width: 60.6vw;
        height:80vh;
        border: none;
        outline: none;
        resize: none;
        font-size: 16px;
        margin-left: auto;
        margin-right: auto;
        text-align: left;
        font-family: sans-serif;
    }
    .input-content p{
        margin-top: 0px;
    }
    .input-content blockquote{
        margin: 1em 0;
        padding: 0 1em;
        color: #666;
        border-left: 4px solid #ddd;
    }
    .input-content pre{
        ont-family: Menlo,Monaco,Consolas,Courier New,monospace;
        font-size: .8em;
        color:white;
        border-radius: 2px;
        position: relative;
        padding: .5em 1em;
        background:#666666;
        overflow: auto;
    }
</style>