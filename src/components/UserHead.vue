<template>
    <div id="UserHead">
        <el-avatar shape="circle" :size="size" fit="fill">
            <img :src="src">
        </el-avatar>
    </div>
</template>

<script>
    export default {
        name: "UserHead",
        props:{
            'src':String,   //资源路径
            'size':String,  //头像大小
        },

    }
</script>

<style scoped>
    #UserHead{
        display: inline-block;
    }
</style>