<template>
    <div class="login">
        <div class="container" v-bind:class="{'log-in':login_in}">
            <div class="box"></div>
            <div class="container-forms">
                <div class="container-info">
                    <div class="info-item">
                        <div class="table">
                            <div class="table-cell">
                                <p>
                                    Have an account?
                                </p>
                                <div class="btn" @click="login_in=false">
                                    Log in
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="info-item">
                        <div class="table">
                            <div class="table-cell">
                                <p>
                                    Don't have an account?
                                </p>
                                <div class="btn" @click="login_in=true">
                                    Sign up
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="container-form">
                    <div class="form-item log-in">
                        <div class="table">
                            <div class="table-cell">
                                <input v-model="user.name" name="username" placeholder="Username" type="text" />
                                <input v-model="user.pwd" name="password" placeholder="Password" type="Password"  />
                                <div id="login-btn" class="btn" @click="loginSubmit">
                                    Log in
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="form-item sign-up">
                        <div class="table">
                            <div class="table-cell">
                                <input name="email" placeholder="Email" type="text" />
                                <input name="fullName" placeholder="Full Name" type="text" />
                                <input name="Username" placeholder="Username" type="text" />
                                <input name="Password" placeholder="Password" type="Password" />
                                <div class="btn">
                                    Sign up
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    </div>
</template>

<script>
    import {user} from '../request/api';
    import store from '../store/index';
    import {Message} from 'element-ui';
    export default {
        name: "Login",
        data(){
            return{
                login_in:false,
                user:{
                    name:'',
                    pwd:'',
                }
            }
        },
        mounted(){
        },
        methods:{
            loginSubmit(){
                user.login(this.user).then(result=>{
                    let data = result.data;
                    switch (data.code) {
                        case 1:
                            Message.success({
                                message:data.message,
                            })
                            store.state.token = data.token;//store存储token
                            localStorage.setItem('token',data.token);//localstorage存储token
                            this.$router.push({
                                path:'/timeline',
                            })
                            break;
                        case 0:
                            Message.error({
                                message:data.message,
                            })
                            break;
                        case -1:
                            Message.error({
                                message:data.message,
                            })
                            break;
                        default:
                            Message.warning({
                                message:'系统繁忙',
                            })
                            break;
                    }
                }).catch(err=>alert(err));
            },
            getMusic(){
                this.axios.get('/song/find',{
                    params:{
                        key:'周杰伦%2f稻香',
                    }
                }).then(function (response) {
                    alert("音乐返回成功");
                    //console.log(response.data.data.url);
                    console.log(response.data);
                }).catch(function(err){
                    alert(err);
                })
            }
        },

    }
</script>

<style scoped>
    .login {
        position: absolute;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
        font-family: "Roboto", sans-serif;
        background-color: #5356ad;
        overflow: hidden;

    }

    .table {
        display: table;
        width: 100%;
        height: 100%;
    }

    .table-cell {
        display: table-cell;
        vertical-align: middle;
        -moz-transition: all 0.5s;
        -o-transition: all 0.5s;
        -webkit-transition: all 0.5s;
        transition: all 0.5s;
    }

    .container {
        position: relative;
        width: 600px;
        margin: 30px auto 0;
        height: 320px;
        background-color: transparent;
        top:50%;
        margin-top: -160px;
        -moz-transition: all 0.5s;
        -o-transition: all 0.5s;
        -webkit-transition: all 0.5s;
        transition: all 0.5s;
    }
    .container .box {
        position: absolute;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
        overflow: hidden;
    }

    .container .box:before, .container .box:after {
        content: " ";
        position: absolute;
        left: 152px;
        top: 50px;
        background-color: #9297e0;
        transform: rotateX(52deg) rotateY(15deg) rotateZ(-38deg);
        width: 300px;
        height: 285px;
        -moz-transition: all 0.5s;
        -o-transition: all 0.5s;
        -webkit-transition: all 0.5s;
        transition: all 0.5s;

    }
    .container .box:after {
        background-color: #a5aae4;
        top: -10px;
        left: 80px;
        width: 320px;
        height: 180px;
    }
    .container .container-forms {
        position: relative;
    }
    .container .btn {
        cursor: pointer;
        text-align: center;
        margin: 0 auto;
        width: 60px;
        color: #fff;
        background-color: #ff73b3;
        opacity: 1;
        -moz-transition: all 0.5s;
        -o-transition: all 0.5s;
        -webkit-transition: all 0.5s;
        transition: all 0.5s;
    }
    .container .btn:hover {
        opacity: 0.7;
    }
    .container .btn, .container input {
        padding: 10px 15px;
    }
    .container input {
        margin: 0 auto 15px;
        display: block;
        width: 220px;
        -moz-transition: all 0.3s;
        -o-transition: all 0.3s;
        -webkit-transition: all 0.3s;
        transition: all 0.3s;
    }
    .container .container-forms .container-info {
        text-align: left;
        font-size: 0;
    }
    .container .container-forms .container-info .info-item {
        text-align: center;
        font-size: 16px;
        width: 300px;
        height: 320px;
        display: inline-block;
        vertical-align: top;
        color: #fff;
        opacity: 1;
        -moz-transition: all 0.3s;
        -o-transition: all 0.3s;
        -webkit-transition: all 0.3s;
        transition: all 0.3s;
    }
    .container .container-forms .container-info .info-item p {
        font-size: 20px;
        margin: 20px;
    }
    .container .container-forms .container-info .info-item .btn {
        background-color: transparent;
        border: 1px solid #fff;
    }
    .container .container-forms .container-info .info-item .table-cell {
        padding-right: 35px;
    }
    .container .container-forms .container-info .info-item:nth-child(2) .table-cell {
        padding-left: 35px;
        padding-right: 0;
    }
    .container .container-form {
        overflow: hidden;/*可以将sign-up框多余的部分隐藏*/
        position: absolute;
        left: 30px;
        top: -30px;
        width: 305px;
        height: 380px;
        background-color:white;
        box-shadow: 0 0 15px 0 rgba(0, 0, 0, 0.2);
        -moz-transition: all 0.5s;
        -o-transition: all 0.5s;
        -webkit-transition: all 0.5s;
        transition: all 0.5s;
    }
    .container .container-form:before {
        content: "✔";
        position: absolute;
        left: 160px;
        top: -50px;
        color: #5356ad;
        font-size: 130px;
        opacity: 0;
        -moz-transition: all 0.5s;
        -o-transition: all 0.5s;
        -webkit-transition: all 0.5s;
        transition: all 0.5s;
    }
    .container .container-form .btn {
        position: relative;
        box-shadow: 0 0 10px 1px #ff73b3;
        margin-top: 30px;
    }
    .container .form-item {
        position: absolute;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
        opacity: 1;
        -moz-transition: all 0.5s;
        -o-transition: all 0.5s;
        -webkit-transition: all 0.5s;
        transition: all 0.5s;
    }
    .container .form-item.sign-up {
        position: absolute;
        left: -100%;
        opacity: 0;
    }
    /*背景菱形动态变化*/
    .container.log-in .box:before {
        position: absolute;
        left: 180px;
        top: 62px;
        height: 265px;
    }
    .container.log-in .box:after {
        top: 22px;
        left: 192px;
        width: 324px;
        height: 220px;
    }
    /*log-in和sign-up跟随container-form框移动*/
    .container.log-in .container-form {
        left: 265px;
    }
    .container.log-in .container-form .form-item.sign-up {
        left: 0;
        opacity: 1;
    }
    .container.log-in .container-form .form-item.log-in {
        left: -100%;
        opacity: 0;
    }

    .container.active {
        width: 260px;
        height: 140px;
        margin-top: -70px;
    }
    .container.active .container-form {
        left: 30px;
        width: 200px;
        height: 200px;
    }
    .container.active .container-form:before {
        content: "✔";
        position: absolute;
        left: 51px;
        top: 5px;
        color: #5356ad;
        font-size: 130px;
        opacity: 1;
    }
    .container.active input, .container.active .btn, .container.active .info-item {
        display: none;
        opacity: 0;
        padding: 0px;
        margin: 0 auto;
        height: 0;
    }
    .container.active .form-item {
        height: 100%;
    }
    .container.active .container-forms .container-info .info-item {
        height: 0%;
        opacity: 0;
    }

    .rabbit {
        width: 50px;
        height: 50px;
        position: absolute;
        bottom: 20px;
        right: 20px;
        z-index: 3;
        fill: #fff;
    }

</style>