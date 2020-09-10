<template>
    <div>
        <div class="card_container">
            <div class="card_content">
                <h4><slot name="noteName"></slot></h4>
                <ul class="card_noteIntroduct">
                    <li><slot name="username"></slot></li>
                    <li><slot name="articleCount"></slot>篇文章</li>
                </ul>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "NoteCard",
        data(){
            return{
                noteName:"aa",
                articleCount:5,
                username:"锅巴",
            }
        }
    }
</script>

<style scoped>
    div.card_container{
        position: absolute;
        width: 320px;
        height: 160px;
        background: url("../assets/Images/5.jpg") no-repeat;
        background-size: 100%;
        border:4px solid black;
        border-radius: 8px;
        cursor: pointer;
    }
    div.card_content h4{
        display: inline-block;
        width: 100%;
        color: white;
        font-weight: bold;
        position: relative;
        top:60px;
        text-align: left;
        padding:0 15px;
    }
    div.card_container:hover{
        opacity: 0.8;
    }
    ul.card_noteIntroduct{
        text-decoration: none;
        position: relative;
        top:40px;
        width: 100%;
        text-align: left;
        margin-left: -25px;
    }
    ul.card_noteIntroduct li{
        text-decoration: none;
        color:white;
        display: inline-block;
        text-align: left;
    }
    ul.card_noteIntroduct li+li:before{
        content: ".";
        font-weight: bold;
        position: relative;
        top:-5px;
        margin:0 5px;
    }
</style>