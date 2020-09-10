<template>
    <div class="Login">
        <div class="red blue" style="width: 100px;height: 100px;">123</div>
        <div class="blue red">123</div>
        <div class="container">
            <div class="LoginBox">
                <h1>Hello!</h1>
                <h1>欢迎来到我的Blog</h1>
                <el-row>

                </el-row>
            </div>
        </div>



    </div>
</template>

<script>
    export default {
        name: "Login1",
        data(){
            return{
                username:"",
                password:"",
            }
        }
    }
</script>

<style scoped>
    .red {
        color: yellow;
    }

    .blue {
        color: blue
    }

    .Login{
        position: absolute;
        width:100%;
        height: 100%;
        top:0;
        left: 0;
        background:url("../assets/Images/loginBg.jpg") ;
        background-size:100%;
        overflow: hidden;
    }
    .container{
        position: relative;
        width: 100%;
        height: 100%;
    }
    h1{
        position: relative;
        font-family:sans-serif;
        color:white;
        font-size: 40px;
        text-align: center;
    }
    .LoginBox{
        position: absolute;
        width: 600px;
        height: 600px;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        margin: auto;
    }
</style>