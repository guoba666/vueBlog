<template>
  <div id="app">
      <Header v-show="!(path==='/editor')"></Header>
      <router-view/>
  </div>
</template>

<style>
#app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    background-color: #f4f5f5;
    padding-top: 0;
}

#nav {
  padding: 30px;
}
a{
    text-decoration: none;
}
#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
<script>
    import Header from "./components/Header";
    import store from './store/index';
    export default {
        components: {Header},
        data(){
            return{
                path:'aaa',
            }
        },
        mounted() {
            //初始化store中的token
            store.state.token = localStorage.getItem('token');
            this.path = this.$route.path;   //将当前path赋给this.path
        },
        methods:{

        },
        watch:{
            $route(to,from){
                this.path = to.path;
            }
        },
    }
</script>