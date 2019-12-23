import Vue from 'vue'
import App from './components/App.vue'
import store from './store/index.js'
import routes from './routes.js'
import VueRouter from 'vue-router'
import AlloyFinger from 'alloyfinger';
import AlloyFingerPlugin from 'alloyfinger/vue/alloy_finger.vue';
import imgEdit from './directives/imgEdit.js';
import loadMore from './directives/loadMore.js';

Vue.use(VueRouter);
Vue.use(AlloyFingerPlugin, {
    AlloyFinger
});
Vue.use(imgEdit);
Vue.use(loadMore);

const router = new VueRouter({
    routes
});

router.beforeEach((to, from, next) => {
    if(from.name === "mine" && to.name === "edit") {
        next(false)
    }else if(store.state.currentPanel.length>0){
        next(false)
    }else {

        /* 根据路由变化修改页面title */
        if (to.meta.title) {
            document.title = to.meta.title
        }

        // console.log(to, from);
        next()
    }
});

const vm = new Vue({
    el: "#app",
    render: h => h(App),
    router,
    store
});
window.myvm = vm;
export {vm};
