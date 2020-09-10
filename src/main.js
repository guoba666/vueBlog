import Vue from 'vue'
import './plugins/axios'
import App from './App.vue'
import router from './router'
import axios from './plugins/axios'
import VueAxios from 'vue-cli-plugin-axios'
import elementUI from './plugins/ElementUI'   //引入插件
import store from './store/index'
Vue.config.productionTip = false
Vue.use(VueAxios,axios);

//全局注册tip函数
Vue.prototype.tip = function(message){
  const h = this.$createElement;
  this.$message({
    message: h('p', null, [
      h('span', null, message),
      //h('i', { style: 'color: teal' }, 'VNode')
    ])
  });
}
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

