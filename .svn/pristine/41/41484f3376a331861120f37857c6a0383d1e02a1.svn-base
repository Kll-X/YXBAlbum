import * as wxApi from '@lib/./API/wxApi';
import * as androidAppApi from '@lib/./API/androidAppApi';
import * as feixinApi from '@lib/API/hefeixinAPI'
import * as feixinFypApi from '@lib/API/hefeixinFypAPI'
import * as othersApi from '@lib/API/othersAPI'
import messageBus from "@src/components/messageBus";
const envs=['others','weixin','androidapp','hefeixin','hefeixinFyp'];
const env = getEnvInf();
let self = this;

//平台初始化
function init() {
    if(env === envs[1]){
        console.log("当前环境是微信")
        return wxApi.init(...arguments);
    }else if(env == envs[2]){
        console.log("当前环境是安卓app")
        return androidAppApi.init(...arguments);
    }else if(env == envs[3]){
        console.log("当前环境是和飞信公众号")
        return feixinApi.init(...arguments);
    }else if(env == envs[4]){
        console.log("当前环境是和飞信负一屏");
        return feixinFypApi.init(...arguments);
    }else if(env == envs[0]){
        console.log("当前环境是其他")
        return othersApi.init(...arguments);
    }
}
//获取token
function getToken(){
    return sessionStorage.getItem('token');
}
//存储token
function setToken(token){
    sessionStorage.setItem('token',token);
    messageBus.$emit('updateToken',token);//更新userinfo中的token
}
//获取账号id
function getOpenId(){
    if(env === envs[1]){
        // if(location.host.search('localhost:808') > -1){
        if(_DEV_){
            // return 'b0JONUh3TjFJTG1CZm9JMHVneXA1M1ptUEdnQQ' //zipeng
            return 'b0JONUh3QXRWclFzLWpNWC1tVlVJdVhDbkt0cw' //jiangpeng
        }else{
            let search = parseLocationSearch();
            return search.id;
        }
    } else if(env === envs[3]){
        if(_DEV_){
            return 'YTdmYWQwOWIxZjNmYWYzMTdiMDg4MTZlNGMzZDRkYzA=' //jiangpeng
        }else{
            let search = parseLocationSearch();
            return search.id;
        }
    }else{
        // return 'b0JONUh3TjFJTG1CZm9JMHVneXA1M1ptUEdnQQ' //zipeng
        return 'b0JONUh3QXRWclFzLWpNWC1tVlVJdVhDbkt0cw' //jiangpeng

        //todo 从某个对象上获取认证信息。
    }
}
//获取账号id
function getPhoneNum(){
    if(env === envs[1]){
        if(_DEV_){
            // return 'b0JONUh3TjFJTG1CZm9JMHVneXA1M1ptUEdnQQ' //zipeng
            return 'b0JONUh3QXRWclFzLWpNWC1tVlVJdVhDbkt0cw' //jiangpeng
        }else{
            let search = parseLocationSearch();
            return search.id;
        }
    } else {
        // return 'b0JONUh3TjFJTG1CZm9JMHVneXA1M1ptUEdnQQ' //zipeng
        return 'b0JONUh3QXRWclFzLWpNWC1tVlVJdVhDbkt0cw' //jiangpeng

        //todo 从某个对象上获取认证信息。
    }
}
//登录获取信息
function login(){
    if (env === envs[1]) {
        if (typeof getOpenId() === 'undefined') {

        } else if (getOpenId() === '') {
            messageBus.$emit("tipCoverShow", {
                status: 2,
                desc: ['未知错误', '请重新进入'],
                icon: 'times',
                style:{
                    tipDescPadding:'0 0.32rem 0.4rem'
                },
                callBack: function () {
                    self.tipInfo.status = 0;
                    wx.ready(function () {
                        wx.closeWindow();
                    });
                }
            })
        } else {

        }
    }else if(env === envs[2]){
        //token已经在init中获取过了
    } else {
        //todo 统一认证，把认证信息放到一个对象上。在getOpenId中从这个对象上取得认证信息。
        //要有一个loading过程，必须拿到统一认证信息才能继续下面的业务流程
    }
}
//选择图片
function chooseImgs() {
    if(env === envs[1]){
        return wxApi.chooseImgs(...arguments);
    }else if(env === envs[2]){
        return androidAppApi.chooseImgs(...arguments);
    }else if(env === envs[3]){
        return othersApi.chooseImgs(...arguments);
    }else if(env === envs[4]){
        return feixinFypApi.chooseImgs(...arguments);
    }else{
        return othersApi.chooseImgs(...arguments);
        console.log(env);
    }
}
//更换图片
function changeImage(){
    if(env === envs[1]){
        return wxApi.changeImage(...arguments);
    }else if(env === envs[2]){
        return androidAppApi.changeImages(...arguments);
    }else if(env === envs[3]){
        return othersApi.changeImages(...arguments);
    }else if(env === envs[4]){
        return othersApi.changeImages(...arguments);
    }else{
        return othersApi.changeImages(...arguments);
        console.log(env)
    }
}
//分享设置
function share(){
    if(env === envs[1]){
        return wxApi.share(...arguments);
    }else if(env === envs[4]){
        return feixinFypApi.share(...arguments);
    }else{
        console.log(env)
    }
}
//点击分享按钮
function shareBtnHandler(){
    if(env === envs[2]){
        androidAppApi.shareBtnHandler(...arguments);
    }else{
        console.log(env);
    }
}

function getEnvInf(){
    let ua = navigator.userAgent.toLowerCase();
    let env;
    if("micromessenger" == ua.match(/MicroMessenger/i)){
        env = envs[1];
    }else if("album-androidapp" == ua.match(/album-androidapp/i)){
        env = envs[2];
    }else if(location.href.search("platform=hfxFyp") >= 0){
        env = envs[4];
    }else if('hefeixin' == ua.match(/hefeixin/i)){
        env = envs[3];
    }else{
        env = envs[0];
    }
    return env;
}
function parseLocationSearch() {
    let search = {};
    location.search.slice(1).split('&').forEach(function (item) {
        // let array = item.split('=');
        // search[array[0]] = array[1];
        let array = item.match(/(\S{1,}?)=(\S{1,})/);
        if(array){
            search[array[1]] = array[2];
        }
    });
    return search;
}

function refreshToken() {
    if(env === envs[1]){
        return wxApi.refreshToken(...arguments);
    }else if(env == envs[2]){
        return androidAppApi.refreshToken(...arguments);
    }else if(env == envs[3]){
        return feixinApi.refreshToken(...arguments);
    }else if(env == envs[4]){
        return feixinFypApi.refreshToken(...arguments);
    }else if(env == envs[0]){
        return othersApi.refreshToken(...arguments);
    }
}

window.rcsOptimizeReady = function(){
    console.log('rcsOptimizeReady_func')
}

export {getOpenId,login,changeImage,chooseImgs,share,getEnvInf,init,shareBtnHandler,getToken,setToken,parseLocationSearch,refreshToken,env}