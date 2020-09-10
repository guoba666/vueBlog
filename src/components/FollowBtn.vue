<template>
    <div id="FollowBtn">
        <el-button id="follow-btn" v-bind:class="{'followed':isFollow}" @click="follow">{{msg}}</el-button>
    </div>
</template>

<script>
    export default {
        name: "FollowBtn",
        mounted(){
            if(this.isFollow){
                this.msg = '已关注';
            }else{
                this.msg = '关注';
            }
        },
        data(){
            return{
                isFollow:false,
                msg:'',
            }
        },
        methods:{
            follow(){
                //后端处理
                this.isFollow = !this.isFollow;
            }
        },
        watch:{
            isFollow:function(newVal){
                if(newVal){
                    this.msg = '已关注';
                }else{
                    this.msg = '关注';
                }
            }
        }
    }
</script>

<style scoped>
    #FollowBtn{
        display: inline-block;
    }
    #follow-btn{
        border-width: 1px;
        border-color: limegreen;
    }
    #follow-btn:hover{
        background-color: limegreen;
        color: white;
    }
    #follow-btn.followed{
        background-color: green;
        color:white;
    }
</style>