<template>
    <div>
        <div class="btn-group">
            <el-button type="primary" icon="el-icon-edit" circle></el-button>
        </div>
        <ul class="noteShowArea">
            <li v-for="item in noteArr" v-bind:key="item">
                <note-card>
                    <template v-slot:noteName>
                        {{item.noteName}}
                    </template>
                    <template v-slot:articleCount>
                        {{item.articleCount}}
                    </template>
                    <template v-slot:username>
                        {{item.username}}
                    </template>
                </note-card>
            </li>
        </ul>

    </div>
</template>

<script>
    import NoteCard from "../components/NoteCard";
    export default {
        name: "Blog",
        components: {NoteCard},
        data(){
            return{
                noteArr:[
                    {noteName:"Javascript",articleCount:"5",username:"锅巴"},
                    {noteName:"C++",articleCount: "1",username:"123"},
                    {noteName:"Vuejs",articleCount:"3",username:"abc"},
                ]
            }
        }
    }
</script>

<style scoped>
    ul.noteShowArea{
        list-style: none;
    }
    ul.noteShowArea li{
        display: inline-block;
        width:350px;
        height: 180px;
        margin-top: 50px;
    }
</style>