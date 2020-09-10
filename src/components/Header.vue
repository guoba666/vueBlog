<template>
    <div>
        <el-menu
            :default-active="1"
            class="nav"
            mode="horizontal"
            background-color="#545c64"
            text-color="white"
            menu-trigger="click"
            active-text-color="skyblue"
            >
            <!--
            <el-menu-item v-on:click="isClick=!isClick">
                <menu-icon v-bind:checked="isClick"></menu-icon>
            </el-menu-item>
            -->

            <el-submenu index="1" style="overflow: hidden" for="micon">
                <template slot="title">
                    <i class="el-icon-location"></i>
                    <span>头像</span>
                </template>
                <el-menu-item-group>
                    <el-menu-item index="1-1" @click="toEditor"><i class="el-icon-edit"></i>写文章</el-menu-item>
                    <el-menu-item index="1-2"><i class="el-icon-s-order"></i>草稿</el-menu-item>
                </el-menu-item-group>
                <el-menu-item-group>
                    <el-menu-item index="1-3"><i class="el-icon-user-solid"></i>我的主页</el-menu-item>
                    <el-menu-item index="1-4"><i class="el-icon-thumb"></i>我赞过的</el-menu-item>
                    <el-menu-item index="1-5"><i class="el-icon-star-on"></i>我的收藏集</el-menu-item>
                    <el-menu-item index="1-6"><i class="el-icon-shopping-cart-full"></i>已购</el-menu-item>
                    <el-menu-item index="1-7"><i class="el-icon-price-tag"></i>标签管理</el-menu-item>
                </el-menu-item-group>
                <el-menu-item-group>
                    <el-menu-item index="1-8"><i class="el-icon-setting"></i>设置</el-menu-item>
                    <el-menu-item index="1-9"><i class="el-icon-warning"></i>关于</el-menu-item>
                </el-menu-item-group>
                <el-menu-item-group>
                    <el-menu-item index="1-1"><i class="el-icon-switch-button"></i>登出</el-menu-item>
                </el-menu-item-group>
            </el-submenu>
            <el-menu-item index="2"><router-link to="/timeline">首页</router-link></el-menu-item>
            <el-menu-item index="3"><router-link to="/person">个人中心</router-link></el-menu-item>
            <el-menu-item index="4" @click="toLogin">发现</el-menu-item>
        </el-menu>
    </div>
</template>

<script>
    //import MenuIcon from "./MenuIcon";
    import store from "../store/index";
export default {
    name: 'header',
    components: {},
    data(){
        return{
            isClick:false,
            isCollapse:false,
        }
    },
    methods:{
        toLogin(){
            this.$router.push({
                path:'/login',
                query:{
                    userId:'guoba',
                }
            })
        },
        toUser(){

        },
        toEditor(){
            let route = this.$router.resolve({
                path:'/editor',
            });
            window.open(route.href,"_blank");
        }
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    .header{
        width:100%;
        position: fixed;
        top: 0;
        background: #2c3e50;
    }
    a{
        text-decoration: none;
    }
</style>
